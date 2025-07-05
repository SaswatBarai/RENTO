import React from 'react'
import { showNav } from '../state/navHideSlice'
import {Hero} from "../components/Hero.jsx"
import {Feature} from "../components/feature42.jsx"
import { Testimonials } from '../components/Testimonial.jsx';
import { Services } from '../components/Services.jsx';

function Home() {
  showNav();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050e1a] via-[#0a1627] to-[#101e36]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Hero/>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-bounce"></div>
      </div>

      {/* Feature Section */}
      <div className="relative">
        <Feature/>
        {/* Section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent"></div>
      </div>

      {/* Services Section */}
      <div className="relative bg-gradient-to-br from-[#0a1627] to-[#050e1a]">
        <Services/>
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative">
        <Testimonials/>
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of satisfied customers who trust us for their mobility needs. 
              Experience the future of transportation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Book Your Ride Now
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
                Explore Our Fleet
              </button>
            </div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Need Help Getting Started?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to assist you 24/7. Get in touch for personalized support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <span className="font-semibold">24/7 Support</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-semibold">Instant Booking</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600">
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
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-grid-white {
          background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Home