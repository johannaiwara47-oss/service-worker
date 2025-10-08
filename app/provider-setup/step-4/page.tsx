'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase-client';
import { motion } from 'framer-motion';

export default function Step4Page() {
  const router = useRouter();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setImages(files);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setUploading(true);
    setError('');

    try {
      const step1 = JSON.parse(localStorage.getItem('provider_setup_step1') || '{}');
      const step2 = JSON.parse(localStorage.getItem('provider_setup_step2') || '{}');
      const step3 = JSON.parse(localStorage.getItem('provider_setup_step3') || '{}');

      const imageUrls: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('provider-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('provider-images')
          .getPublicUrl(fileName);

        imageUrls.push(fileName);
      }

      const { error: insertError } = await (supabase as any)
        .from('service_providers')
        .insert({
          user_id: user.id,
          provider_type: step1.provider_type,
          business_name: step1.business_name,
          category_id: step2.category_id,
          contact_number: step2.contact_number,
          latitude: step3.latitude,
          longitude: step3.longitude,
          location_text: step3.location_text,
          work_image_1: imageUrls[0] || null,
          work_image_2: imageUrls[1] || null,
          work_image_3: imageUrls[2] || null,
        });

      if (insertError) throw insertError;

      const { error: updateError } = await (supabase as any)
        .from('users')
        .update({
          phone_number: step2.contact_number,
          whatsapp_number: step2.whatsapp_number,
          latitude: step3.latitude,
          longitude: step3.longitude,
          location_text: step3.location_text,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      localStorage.removeItem('provider_setup_step1');
      localStorage.removeItem('provider_setup_step2');
      localStorage.removeItem('provider_setup_step3');

      router.push('/dashboard/provider');
    } catch (err: any) {
      setError(err.message || 'Failed to complete setup');
    } finally {
      setUploading(false);
    }
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
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center">✓</div>
            <div className="flex-1 h-1 bg-primary-green"></div>
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center">✓</div>
            <div className="flex-1 h-1 bg-primary-green"></div>
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center font-bold">4</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Work Images</h1>
          <p className="text-gray-600 mb-8">Upload up to 3 images of your work</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images (Max 3)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                {images.length} image(s) selected
              </p>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => router.back()}
                disabled={uploading}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="flex-1 bg-primary-green text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {uploading ? 'Setting up...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
