import React from "react";

export default function TermAndCondition() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl mx-auto bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-2xl rounded-2xl p-8 animate-fadeInUp">
        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">Consumer Policy</h1>
        <p className="text-slate-200 mb-6 text-center">Last updated: July 14, 2025</p>
        <div className="space-y-6 text-slate-100 text-base">
          <p>
            At Evotto, we prioritize transparency, affordability, and customer satisfaction. Our consumer policy outlines the principles and commitments we adhere to, ensuring a seamless experience for all our users:
          </p>
          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">1. Transparency</h2>
          <ul className="list-disc ml-6">
            <li>Clear pricing with no hidden charges.</li>
            <li>Comprehensive information about services, vehicle specifications, and terms of use.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">2. Affordability</h2>
          <ul className="list-disc ml-6">
            <li>Cost-effective rental and automobile-related solutions.</li>
            <li>Competitive pricing to make our services accessible to everyone.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">3. Consumer Safety</h2>
          <ul className="list-disc ml-6">
            <li>Regular vehicle maintenance and quality checks to ensure safety.</li>
            <li>Comprehensive insurance and support for unforeseen incidents.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">4. Flexibility and Accessibility</h2>
          <ul className="list-disc ml-6">
            <li>Easy booking and cancellation policies.</li>
            <li>Wide range of vehicles and services to suit diverse needs.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">5. Customer Support</h2>
          <ul className="list-disc ml-6">
            <li>Dedicated 24/7 customer service to address queries and issues promptly.</li>
            <li>Feedback-driven approach to improve our services.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">6. Environmental Responsibility</h2>
          <ul className="list-disc ml-6">
            <li>Promoting eco-friendly transportation options.</li>
            <li>Encouraging sustainable practices through solar-integrated solutions.</li>
          </ul>

          <p>
            This policy reflects our commitment to delivering top-notch services while fostering trust and reliability among our consumers.
          </p>
        </div>
      </div>
    </div>
  );
}