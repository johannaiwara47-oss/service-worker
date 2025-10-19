import Link from 'next/link';

export default function HomePage() {
  const popularServices = [
    'Plumbing', 'Electrical Work', 'Carpentry', 'Painting', 'Cleaning Services',
    'Catering', 'Photography', 'Web Development', 'Graphic Design', 'Tutoring'
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-green to-primary-blue bg-clip-text text-transparent">
            ServiceWorker
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/search" className="text-gray-700 hover:text-primary-blue transition">
              Find Services
            </Link>
            <Link href="/signup" className="text-gray-700 hover:text-primary-green transition">
              Become a Provider
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 border-2 border-primary-blue text-primary-blue rounded-lg font-medium hover:bg-primary-blue hover:text-white transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-primary-blue/5 via-white to-primary-green/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Hire Trusted Service Providers <span className="bg-gradient-to-r from-primary-green to-primary-blue bg-clip-text text-transparent">Near You</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with verified professionals within 50km. From home repairs to creative services, find the perfect match for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/search"
                className="px-8 py-4 bg-primary-green text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition transform"
              >
                Find Services Now
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-primary-blue border-2 border-primary-blue rounded-lg font-semibold text-lg hover:bg-primary-blue hover:text-white transition"
              >
                Start Earning as Provider
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {popularServices.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-primary-blue hover:text-primary-blue transition cursor-pointer"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How ServiceWorker Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-blue/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">1. Search & Discover</h3>
              <p className="text-gray-600">Browse 50+ service categories and find providers within 50km of your location with real-time distance tracking.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-primary-green/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">2. Review & Choose</h3>
              <p className="text-gray-600">Check ratings, reviews, and work samples. See verified badges and contact information before you decide.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">3. Connect Instantly</h3>
              <p className="text-gray-600">Contact providers directly via WhatsApp or phone. No middleman, no delays. Get your work done fast.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-green/5 to-primary-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ServiceWorker?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Location-Based Matching</h3>
                    <p className="text-gray-600">Only see providers within 50km. Save time and money with nearby professionals who can reach you quickly.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Verified Providers</h3>
                    <p className="text-gray-600">All providers are reviewed. Verified badges help you identify trusted professionals with proven track records.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Real Reviews & Ratings</h3>
                    <p className="text-gray-600">Read honest feedback from customers. Rate providers after service to help others make informed decisions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Direct Communication</h3>
                    <p className="text-gray-600">No platform fees or commissions. Contact providers directly and negotiate terms that work for both parties.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Safe & Secure</h3>
                    <p className="text-gray-600">Report system and admin moderation ensure bad actors are removed. Your safety is our priority.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Mobile-Friendly</h3>
                    <p className="text-gray-600">Access from any device. Responsive design ensures a seamless experience on mobile, tablet, or desktop.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-green to-primary-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Earn as a Service Provider?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals growing their business on ServiceWorker. Set your own rates, manage your schedule, and connect with customers in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-primary-green rounded-lg font-semibold text-lg hover:shadow-xl transition inline-block"
              >
                Register as Provider
              </Link>
              <Link
                href="/search"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-blue transition inline-block"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Service Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: 'Plumbing', icon: '🔧' },
                { name: 'Electrical', icon: '⚡' },
                { name: 'Carpentry', icon: '🪚' },
                { name: 'Painting', icon: '🎨' },
                { name: 'Cleaning', icon: '🧹' },
                { name: 'Catering', icon: '🍽️' },
                { name: 'Photography', icon: '📸' },
                { name: 'IT Support', icon: '💻' },
                { name: 'Tutoring', icon: '📚' },
                { name: 'Beauty', icon: '💄' },
                { name: 'Auto Repair', icon: '🚗' },
                { name: 'Landscaping', icon: '🌱' },
                { name: 'Security', icon: '🛡️' },
                { name: 'Delivery', icon: '📦' },
                { name: 'Legal', icon: '⚖️' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href="/search"
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary-blue hover:shadow-md transition text-center group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition transform">{category.icon}</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-primary-blue">{category.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-green to-primary-blue bg-clip-text text-transparent">
                ServiceWorker
              </h3>
              <p className="text-sm">
                Connecting service providers with customers across Nigeria. Find trusted professionals near you.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Customers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/search" className="hover:text-primary-blue transition">Find Services</Link></li>
                <li><Link href="/signup" className="hover:text-primary-blue transition">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-primary-blue transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">For Providers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/signup" className="hover:text-primary-green transition">Become a Provider</Link></li>
                <li><Link href="/login" className="hover:text-primary-green transition">Provider Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-primary-blue transition">Help Center</Link></li>
                <li><Link href="/" className="hover:text-primary-blue transition">Safety</Link></li>
                <li><Link href="/" className="hover:text-primary-blue transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 ServiceWorker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
