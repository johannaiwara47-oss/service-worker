import { createClient } from 'npm:@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface BlockedProvider {
  id: string;
  user_id: string;
  work_image_1: string | null;
  work_image_2: string | null;
  work_image_3: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find providers blocked for more than 24 hours
    const { data: blockedProviders, error: queryError } = await supabase
      .from('service_providers')
      .select('id, user_id, work_image_1, work_image_2, work_image_3')
      .eq('is_blocked', true)
      .lt('blocked_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (queryError) {
      throw new Error(`Query error: ${queryError.message}`);
    }

    if (!blockedProviders || blockedProviders.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No providers to delete', count: 0 }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const deletedCount = blockedProviders.length;
    const errors: string[] = [];

    // Process each blocked provider
    for (const provider of blockedProviders as BlockedProvider[]) {
      try {
        // Delete storage images
        const imagesToDelete: string[] = [];
        if (provider.work_image_1) imagesToDelete.push(provider.work_image_1);
        if (provider.work_image_2) imagesToDelete.push(provider.work_image_2);
        if (provider.work_image_3) imagesToDelete.push(provider.work_image_3);

        if (imagesToDelete.length > 0) {
          const { error: storageError } = await supabase.storage
            .from('provider-images')
            .remove(imagesToDelete);

          if (storageError) {
            console.error(`Storage deletion error for provider ${provider.id}:`, storageError);
          }
        }

        // Delete provider record (cascade will handle related records)
        const { error: deleteError } = await supabase
          .from('service_providers')
          .delete()
          .eq('id', provider.id);

        if (deleteError) {
          errors.push(`Failed to delete provider ${provider.id}: ${deleteError.message}`);
          continue;
        }

        // Create admin notification
        const { data: admins } = await supabase
          .from('users')
          .select('id')
          .eq('role', 'admin');

        if (admins && admins.length > 0) {
          for (const admin of admins) {
            await supabase.from('notifications').insert({
              user_id: admin.id,
              title: 'Provider Deleted',
              message: `Blocked provider ${provider.id} has been permanently deleted after 24 hours.`,
              type: 'admin',
            });
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        errors.push(`Error processing provider ${provider.id}: ${errorMsg}`);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Cleanup completed',
        deleted: deletedCount,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Edge function error:', errorMsg);

    return new Response(
      JSON.stringify({ error: errorMsg }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
