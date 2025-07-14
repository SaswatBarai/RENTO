import React from 'react'
import { showNav } from '../state/navHideSlice'
import { Hero } from "../components/Hero.jsx"
import { Feature } from "../components/feature42.jsx"
import { Testimonials } from '../components/Testimonial.jsx';
import { Services } from '../components/Services.jsx';

function Home() {
  showNav();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050e1a] via-[#0a1627] to-[#101e36] overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Hero/>
        {/* Decorative elements */}
        <div className="absolute top-10 left-5 w-24 h-24 bg-blue-600 rounded-full opacity-20 animate-pulse-slow blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full opacity-15 animate-float blur-lg"></div>
      </div>

      {/* Feature Section */}
      <div className="relative">
        <Feature/>
        {/* Section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent"></div>
      </div>

      {/* Services Section */}
      <div className="relative bg-gradient-to-br from-[#0a1627] to-[#050e1a]">
        <Services/>
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-grid-pattern"></div>
      </div>

      {/* Testimonials Section */}
      <div className="relative">
        <Testimonials/>
      </div>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of satisfied customers who trust us for their mobility needs. 
              Experience the future of transportation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-800">
                Book Your Ride Now
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-800 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-800">
                Explore Our Fleet
              </button>
            </div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-12 left-12 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-12 right-12 w-28 h-28 border-2 border-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 left-16 w-12 h-12 bg-white/15 rounded-full animate-ping-slow"></div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Our team is here to assist you 24/7. Get in touch for personalized support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <span className="font-semibold">24/7 Support</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-semibold">Instant Booking</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="font-semibold">Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0);
          background-size: 24px 24px;
        }

        .bg-grid-white {
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0);
          background-size: 32px 32px;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes ping-slow {
          0% { transform: scale(0.5); opacity: 0.3; }
          80%, 100% { transform: scale(2); opacity: 0; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default Home