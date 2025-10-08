import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/10 to-primary-blue/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            ServiceWorker
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Connect with trusted service providers within 50km of your location
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/search"
              className="px-8 py-3 bg-primary-blue text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Find Services
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-lg font-semibold mb-2">Location-Based</h3>
              <p className="text-gray-600">Find providers within 50km of your location</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">Read ratings and reviews from real customers</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">Direct Contact</h3>
              <p className="text-gray-600">Connect via WhatsApp or phone instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
