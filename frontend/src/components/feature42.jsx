// const Feature = () => {
//   return (
//     <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-4xl font-extrabold text-blue-700 mb-8 lg:text-5xl">
//           Why Choose Us
//         </h2>
//         <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
//           Discover the values that make our rental service stand out. We are
//           committed to providing exceptional experiences for our customers.
//         </p>
//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-8">
//           <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
//             <div className="mb-4 text-blue-600">
//               <i className="fas fa-users text-4xl"></i>
//             </div>
//             <h3 className="mb-2 text-2xl font-semibold text-blue-600">
//               Customer Focus
//             </h3>
//             <p className="text-gray-600">
//               We prioritize your needs, ensuring a seamless and enjoyable rental
//               experience every time.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
//             <div className="mb-4 text-blue-600">
//               <i className="fas fa-lightbulb text-4xl"></i>
//             </div>
//             <h3 className="mb-2 text-2xl font-semibold text-blue-600">
//               Innovation
//             </h3>
//             <p className="text-gray-600">
//               Leveraging technology to provide modern, efficient, and user-friendly
//               rental solutions.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
//             <div className="mb-4 text-blue-600">
//               <i className="fas fa-check-circle text-4xl"></i>
//             </div>
//             <h3 className="mb-2 text-2xl font-semibold text-blue-600">
//               Quality Assurance
//             </h3>
//             <p className="text-gray-600">
//               Our rentals are thoroughly inspected and maintained to meet the
//               highest standards.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
//             <div className="mb-4 text-blue-600">
//               <i className="fas fa-handshake text-4xl"></i>
//             </div>
//             <h3 className="mb-2 text-2xl font-semibold text-blue-600">
//               Trust & Integrity
//             </h3>
//             <p className="text-gray-600">
//               Building long-term relationships with transparency and honesty at
//               the core of our service.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
//             <div className="mb-4 text-blue-600">
//               <i className="fas fa-globe text-4xl"></i>
//             </div>
//             <h3 className="mb-2 text-2xl font-semibold text-blue-600">
//               Global Reach
//             </h3>
//             <p className="text-gray-600">
//               Offering rental services across multiple locations to cater to your
//               diverse needs.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
//             <div className="mb-4 text-blue-600">
//               <i className="fas fa-clock text-4xl"></i>
//             </div>
//             <h3 className="mb-2 text-2xl font-semibold text-blue-600">
//               24/7 Support
//             </h3>
//             <p className="text-gray-600">
//               Our dedicated team is available around the clock to assist you with
//               any queries or issues.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export { Feature };


const Feature = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a1627] to-[#101e36]">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What Sets Us Apart
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
              className="relative p-8 bg-[#16213a] shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 group overflow-hidden hover:bg-[#1c2847]"
            >
              {/* Subtle Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <i
                  className={`${feature.icon} text-5xl text-blue-400 transition-transform duration-300 group-hover:scale-110`}
                  aria-hidden="true"
                ></i>
              </div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-3 text-center group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed text-center group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-blue-900/50 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a1627]"
          >
            Discover Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature };