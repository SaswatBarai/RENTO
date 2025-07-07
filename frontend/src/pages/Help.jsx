import React from 'react'
import { showNav } from '../state/navHideSlice'



function Help() {
  showNav();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Help & Support</h1>
      <p className="mb-8 text-lg max-w-xl text-center text-gray-200">
        Welcome to the RENTO Help Center! Here you can find answers to common questions and get support for your rental experience.
      </p>
      <div className="w-full max-w-2xl bg-[#181e29] rounded-lg shadow p-6 mb-8 border border-[#1e293b]">
        <h2 className="text-xl font-semibold mb-2 text-blue-400">Frequently Asked Questions</h2>
        <ul className="list-disc pl-6 space-y-2 text-base text-gray-100">
          <li><b className="text-white">How do I book a vehicle?</b> <br />Go to the Rentals page, select your vehicle, and follow the booking instructions.</li>
          <li><b className="text-white">How do I contact support?</b> <br />Use the contact form on the Contact page or email us at <a href="mailto:support@rento.com" className="text-blue-400 underline">support@rento.com</a>.</li>
          <li><b className="text-white">Can I cancel my booking?</b> <br />Yes, you can cancel from your profile page before the rental period starts.</li>
          <li><b className="text-white">What payment methods are accepted?</b> <br />We accept credit/debit cards, PayPal, and select digital wallets.</li>
          <li><b className="text-white">Is my personal information safe?</b> <br />Yes, we use industry-standard encryption to protect your data.</li>
          <li><b className="text-white">What if my vehicle has an issue?</b> <br />Contact support immediately. We will assist you and arrange a replacement if needed.</li>
          <li><b className="text-white">How do I extend my rental?</b> <br />Go to your profile, select your booking, and choose the extend option if available.</li>
        </ul>
      </div>
      <div className="w-full max-w-2xl bg-[#10151c] rounded-lg shadow p-6 border border-blue-900 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-400">Need More Help?</h2>
        <p className="mb-2 text-gray-200">If you can't find your answer here, please reach out to our support team. We're here to help you 24/7!</p>
        <a href="/contact" className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold">Contact Support</a>
      </div>
      <div className="w-full max-w-2xl bg-[#181e29] rounded-lg shadow p-6 border border-[#1e293b]">
        <h2 className="text-xl font-semibold mb-2 text-blue-400">Tips for a Smooth Rental Experience</h2>
        <ul className="list-disc pl-6 space-y-2 text-base text-gray-100">
          <li>Double-check your booking details before confirming.</li>
          <li>Arrive on time for pick-up and drop-off to avoid extra charges.</li>
          <li>Inspect the vehicle for any damage before starting your rental.</li>
          <li>Contact support if you have any questions or concerns during your rental.</li>
          <li>Leave a review to help other users and improve our service!</li>
        </ul>
      </div>
    </div>
  );
}

export default Help