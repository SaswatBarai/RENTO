import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl mx-auto bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-2xl rounded-2xl p-8 animate-fadeInUp">
        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">Return Policy</h1>
        <p className="text-slate-200 mb-6 text-center">Last updated: July 14, 2025</p>
        <div className="space-y-6 text-slate-100 text-base">
          <p>
            At Evotto Rentals, we prioritize customer satisfaction and strive to ensure a hassle-free experience. Our return policy is designed to provide clarity and fairness to all parties involved.
          </p>
          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">1. Eligibility for Returns</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2">Vehicles must be returned in the same condition as they were rented, with no significant damage or modifications.</li>
            <li>All accessories and documents provided during the rental must be returned.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">2. Return Timeframe</h2>
          <p>
            Vehicles must be returned by the agreed-upon time. Late returns may incur additional charges as per our late fee policy.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">3. Inspection Process</h2>
          <p>
            Upon return, the vehicle will undergo a thorough inspection. Any damages or missing components will be documented, and repair or replacement costs will be charged accordingly.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">4. Cancellation and Refund Policy</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2">If you cancel your booking before the scheduled pickup time, a partial refund may be issued depending on the cancellation policy.</li>
            <li>Refunds for security deposits will be processed within 7 working days after the vehicle is inspected and cleared.</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">5. Special Circumstances</h2>
          <p>
            In case of unavoidable circumstances such as accidents or breakdowns, please notify us immediately. Support will be provided, and additional terms may apply.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">6. Contact Us</h2>
          <div className="ml-2">
            <p className="mb-1">For assistance or queries regarding the return process, please contact our customer service team.</p>
            <p className="mb-1"><b>Evotto Rentals</b></p>
            <p className="mb-1">Email: <a href="mailto:saswatbarai611@gmail.com" className="text-blue-400 underline">saswatbarai611@gmail.com</a></p>
            <p className="mb-1">Phone: <a href="tel:7978826224" className="text-blue-400 underline">7978826224</a></p>
            <p className="mb-1">Address: ITER, Bhubaneswar, Odisha, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}