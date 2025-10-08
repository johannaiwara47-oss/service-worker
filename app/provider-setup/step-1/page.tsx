'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase-client';
import { motion } from 'framer-motion';

export default function Step1Page() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [providerType, setProviderType] = useState<'individual' | 'business'>('individual');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleNext = async () => {
    if (providerType === 'business' && !businessName.trim()) {
      alert('Please enter your business name');
      return;
    }

    setLoading(true);
    const setupData = {
      provider_type: providerType,
      business_name: providerType === 'business' ? businessName : null,
    };
    localStorage.setItem('provider_setup_step1', JSON.stringify(setupData));
    router.push('/provider-setup/step-2');
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/10 to-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">2</div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">3</div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">4</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Provider Type</h1>
          <p className="text-gray-600 mb-8">Tell us about your service business</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Are you an individual or a business?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProviderType('individual')}
                  className={`p-6 border-2 rounded-lg text-center transition ${
                    providerType === 'individual'
                      ? 'border-primary-green bg-primary-green/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">👤</div>
                  <div className="font-semibold">Individual</div>
                </button>
                <button
                  type="button"
                  onClick={() => setProviderType('business')}
                  className={`p-6 border-2 rounded-lg text-center transition ${
                    providerType === 'business'
                      ? 'border-primary-green bg-primary-green/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🏢</div>
                  <div className="font-semibold">Business</div>
                </button>
              </div>
            </div>

            {providerType === 'business' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </motion.div>
            )}

            <button
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-primary-green text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              Next Step
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
