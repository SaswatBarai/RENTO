const Feature = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-[#0a1627] to-[#101e36]">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            What Sets Us Apart
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Experience a rental service designed with you in mind. Our core values
            ensure unmatched quality and satisfaction.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
          {[
            {
              icon: "fas fa-star",
              title: "Unmatched Service",
              description:
                "Personalized support to make your rental experience smooth and stress-free.",
            },
            {
              icon: "fas fa-rocket",
              title: "Cutting-Edge Solutions",
              description:
                "Innovative technology for fast, reliable, and user-friendly rentals.",
            },
            {
              icon: "fas fa-shield-alt",
              title: "Trusted Quality",
              description:
                "Every rental is rigorously checked to meet our high standards.",
            },
            {
              icon: "fas fa-heart",
              title: "Customer First",
              description:
                "Your satisfaction is our priority, with care in every detail.",
            },
            {
              icon: "fas fa-map-marked-alt",
              title: "Worldwide Access",
              description:
                "Seamless rental services available in multiple locations globally.",
            },
            {
              icon: "fas fa-headset",
              title: "Always Available",
              description:
                "Round-the-clock support to assist you anytime, anywhere.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative p-8 bg-[#16213a]/80 backdrop-blur-sm shadow-lg rounded-2xl border border-blue-900/20 hover:shadow-2xl transition-all duration-500 group overflow-hidden hover:bg-[#1c2847]/90"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Subtle Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <i
                  className={`${feature.icon} text-5xl text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-300`}
                  aria-hidden="true"
                ></i>
              </div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-blue-200 mb-4 text-center group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-200 text-base leading-relaxed text-center group-hover:text-white transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-blue-700/30 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 animate-fade-in-up">
          <a
            href="#"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1627]"
          >
            Discover Our Services
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s both;
        }

        .bg-grid-pattern {
          background-image: radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
};

export { Feature };
