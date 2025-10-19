'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Step3Page() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [useGPS, setUseGPS] = useState(false);

  const handleGetLocation = () => {
    setUseGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
          setUseGPS(false);
        }
      );
    }
  };

  const handleNext = () => {
    if (!coordinates && !location) {
      alert('Please set your location');
      return;
    }

    const setupData = {
      latitude: coordinates?.lat || 6.5244,
      longitude: coordinates?.lon || 3.3792,
      location_text: location,
    };
    localStorage.setItem('provider_setup_step3', JSON.stringify(setupData));
    router.push('/provider-setup/step-4');
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
            <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">4</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Your Location</h1>
          <p className="text-gray-600 mb-8">Where do you provide your services?</p>

          <div className="space-y-6">
            <div>
              <button
                onClick={handleGetLocation}
                disabled={useGPS && !!coordinates}
                className="w-full bg-primary-blue text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {coordinates ? '✓ Location Obtained' : '📍 Use My Current Location'}
              </button>
            </div>

            <div className="text-center text-gray-500 text-sm">OR</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Location Manually
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Lekki, Lagos"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>

            {coordinates && (
              <div className="bg-green-50 text-green-800 p-3 rounded-lg text-sm">
                ✓ Location set: {location}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-primary-green text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
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
