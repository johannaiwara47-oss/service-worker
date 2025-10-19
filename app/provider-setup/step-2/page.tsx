'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
}

export default function Step2Page() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');
    if (data) setCategories(data);
  };

  const handleNext = () => {
    if (!selectedCategory || !contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const setupData = {
      category_id: selectedCategory,
      contact_number: contactNumber,
      whatsapp_number: whatsappNumber || contactNumber,
    };
    localStorage.setItem('provider_setup_step2', JSON.stringify(setupData));
    router.push('/provider-setup/step-3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/10 to-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center">✓</div>
            <div className="flex-1 h-1 bg-primary-green"></div>
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">3</div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">4</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Service Details</h1>
          <p className="text-gray-600 mb-8">What service do you provide?</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Category *
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+234..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number (optional)
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+234... (defaults to contact number)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 bg-primary-green text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
