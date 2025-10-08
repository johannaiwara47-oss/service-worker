'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';

interface Category {
  id: string;
  name: string;
}

interface Provider {
  id: string;
  username: string;
  business_name: string | null;
  category_name: string;
  average_rating: number;
  distance_km: number;
  whatsapp_number: string | null;
  phone_number: string | null;
  profile_image_url: string | null;
}

export default function SearchPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
    getUserLocation();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    if (data) setCategories(data);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation({ lat: 6.5244, lon: 3.3792 });
        }
      );
    } else {
      setUserLocation({ lat: 6.5244, lon: 3.3792 });
    }
  };

  const handleSearch = async () => {
    if (!selectedCategory || !userLocation) {
      setError('Please select a category and enable location');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/search?categoryId=${selectedCategory}&lat=${userLocation.lat}&lon=${userLocation.lon}`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setProviders(data.providers || []);
      }
    } catch (err) {
      setError('Failed to search providers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Find Service Providers</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="">Select a service</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading || !selectedCategory || !userLocation}
                className="w-full bg-primary-blue text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {!userLocation && (
            <div className="text-sm text-gray-600">
              📍 Requesting location access...
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {providers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {provider.business_name || provider.username}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{provider.category_name}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">{provider.average_rating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {provider.distance_km.toFixed(1)} km away
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {provider.whatsapp_number && (
                      <a
                        href={`https://wa.me/${provider.whatsapp_number}?text=Hello%20I%20found%20you%20on%20ServiceWorker`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary-green text-white py-2 px-4 rounded text-center text-sm font-medium hover:opacity-90"
                      >
                        WhatsApp
                      </a>
                    )}
                    {provider.phone_number && (
                      <a
                        href={`tel:${provider.phone_number}`}
                        className="flex-1 bg-primary-blue text-white py-2 px-4 rounded text-center text-sm font-medium hover:opacity-90"
                      >
                        Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="text-center text-gray-600 py-12">
            Searching for providers...
          </div>
        ) : providers.length === 0 && selectedCategory ? (
          <div className="text-center text-gray-600 py-12">
            No providers found within 50km
          </div>
        ) : null}
      </div>
    </div>
  );
}
