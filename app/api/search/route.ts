import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const userLat = parseFloat(searchParams.get('lat') || '0');
    const userLon = parseFloat(searchParams.get('lon') || '0');

    if (!categoryId || !userLat || !userLon) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const { data, error } = await (supabase as any).rpc('search_nearby_providers', {
      p_category_id: categoryId,
      p_user_lat: userLat,
      p_user_lon: userLon,
      p_max_distance_km: 50,
    });

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Failed to search providers' },
        { status: 500 }
      );
    }

    return NextResponse.json({ providers: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
