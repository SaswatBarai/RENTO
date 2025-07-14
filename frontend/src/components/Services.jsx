const Services = () => {
  const services = [
    {
      title: "Automobile Rental",
      description: "Rent vehicles for personal or business use effortlessly.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100"
    },
    {
      title: "Second-Hand Cars",
      description: "Explore and buy verified, affordable pre-owned cars.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 2.19L9.75 8.26 4.81 9.02 8.4 12.46 7.45 17.4 12 15.1l4.55 2.3-.95-4.94 3.59-3.44-4.94-.76L12 4.19z"/>
        </svg>
      ),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100"
    },
    {
      title: "Vehicle Servicing",
      description: "Schedule services, repairs, or maintenance with trusted vendors.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100"
    },
    {
      title: "Drivers",
      description: "Hire professional drivers for personal or business needs, available on-demand.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100"
    },
    {
      title: "Rental Gears",
      description: "Rent essential travel and safety gear to complement your journey.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
        </svg>
      ),
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100"
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-[#0a1627] via-[#101e36] to-[#0a1627] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions for all your transportation and mobility needs
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 bg-[#16213a]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-900/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 hover:bg-[#1c2847]/90"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Icon container */}
              <div className="relative mb-6 w-20 h-20 bg-[#101e36]/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className={`text-white bg-gradient-to-br ${service.color} p-4 rounded-xl group-hover:rotate-12 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-transparent rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-transparent rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Choose from our comprehensive range of services and experience the convenience of modern mobility solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1627]">
              Browse All Services
            </button>
            <button className="px-10 py-4 border-2 border-blue-400 text-blue-200 font-semibold rounded-full hover:bg-blue-500/20 hover:text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1627]">
              Contact Us
            </button>
          </div>
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
          animation: fade-in-up 0.8s ease-out 0.5s both;
        }

        .bg-grid-pattern {
          background-image: radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
};

export { Services };