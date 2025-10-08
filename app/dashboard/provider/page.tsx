'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase-client';

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadProvider();
    }
  }, [user, authLoading, router]);

  const loadProvider = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('service_providers')
      .select('*, categories(name)')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!data) {
      router.push('/provider-setup/step-1');
    } else {
      setProvider(data);
    }
    setLoading(false);
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <button
            onClick={signOut}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {provider ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {provider.business_name || 'Your Profile'}
                    </h2>
                    <p className="text-gray-600">
                      {provider.categories?.name || 'Service Provider'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-green">
                      {provider.average_rating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                </div>

                {provider.is_verified && (
                  <div className="inline-block bg-verification-badge text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    ✓ Verified Provider
                  </div>
                )}

                {provider.is_blocked && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                    <strong>Your account has been blocked.</strong>
                    <br />
                    It will be permanently deleted in 24 hours if not resolved.
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-2">Your Ratings</h3>
                  <p className="text-gray-600 text-sm">
                    View customer feedback and ratings
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
                  <p className="text-gray-600 text-sm">
                    Update your contact info and work images
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
              <p className="text-gray-600 mb-6">
                Set up your provider profile to start receiving customers.
              </p>
              <button
                onClick={() => router.push('/provider-setup/step-1')}
                className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
