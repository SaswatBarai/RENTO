const Testimonials = () => {
  const testimonials = [
    {
      name: "Ravi Kumar",
      feedback: "The rental process was seamless and the car was in excellent condition. Highly recommend!",
      avatar: "https://via.placeholder.com/150",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      feedback: "Amazing service! The support team was very helpful and responsive.",
      avatar: "https://via.placeholder.com/150",
      rating: 5,
    },
    {
      name: "Arjun Mehta",
      feedback: "Great experience! The booking process was quick and easy.",
      avatar: "https://via.placeholder.com/150",
      rating: 4,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'} transition-transform duration-300 group-hover:scale-110`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#101e36] via-[#0a1627] to-[#101e36] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#0a1627,rgba(10,22,39,0.7))] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover why thousands of customers trust us for their rental needs
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 bg-[#16213a]/80 backdrop-blur-sm shadow-xl rounded-2xl border border-blue-900/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 hover:bg-[#1c2847]/90"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-blue-700 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Avatar with animated border */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-r from-blue-500 to-blue-700 animate-gradient group-hover:animate-none">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#0a1627] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Star rating */}
              <div className="flex justify-center mb-4 space-x-1">
                {renderStars(testimonial.rating)}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-blue-200 mb-4 group-hover:text-white transition-colors duration-300">
                {testimonial.name}
              </h3>

              {/* Feedback */}
              <p className="text-gray-200 leading-relaxed italic group-hover:text-white transition-colors duration-300">
                "{testimonial.feedback}"
              </p>

              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 animate-fade-in-up">
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Join thousands of satisfied customers today!
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1627]">
            Get Started Now
          </button>
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

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.5s both;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='m0 .5h32m-32 8h32m-32 8h32m-32 8h32'/%3e%3cpath d='m.5 0v32m8-32v32m8-32v32m8-32v32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export { Testimonials };