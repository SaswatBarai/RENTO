import React from 'react'

import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-16 bg-[#0a1627] border-t border-blue-900/30">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 tracking-tight">
              About RENTO
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              We deliver exceptional vehicle rental services focused on quality, trust,
              and customer satisfaction. Your perfect ride awaits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/home" },
                { name: "Rentals", href: "/rentals" },
                { name: "Bookings", href: "/bookings" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Return Policy", href: "/return-policy" },
                { name: "Consumer Policy", href: "/term-and-condition" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 tracking-tight">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-300 text-base">
              <li>
                <i className="fas fa-envelope mr-2 text-blue-400"></i>
                saswatbarai611@gmail.com
              </li>
              <li>
                <i className="fas fa-phone mr-2 text-blue-400"></i>
                +91 7978826224
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2 text-blue-400"></i>
                ITER, Bhubaneswar, Odisha, India
              </li>
            </ul>
          </div>

          {/* Social Media & CTA */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4 tracking-tight">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-6">
              {[
                { icon: "fab fa-twitter", href: "#" },
                { icon: "fab fa-facebook", href: "#" },
                { icon: "fab fa-instagram", href: "#" },
                { icon: "fab fa-linkedin", href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-blue-400 hover:text-blue-300 transition-transform duration-200 transform hover:scale-110"
                  aria-label={`Follow us on ${social.icon.split(" ")[1]}`}
                >
                  <i className={`${social.icon} text-2xl`}></i>
                </a>
              ))}
            </div>
            <Button
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 transition-colors duration-200"
            >
              <a href="/rentals">Find Your Ride</a>
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-900/30 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} RENTO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;