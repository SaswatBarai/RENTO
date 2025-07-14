import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl mx-auto bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-2xl rounded-2xl p-8 animate-fadeInUp">
        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">Privacy Policy</h1>
        <p className="text-slate-200 mb-6 text-center">Last updated: July 14, 2025</p>
        <div className="space-y-6 text-slate-100 text-base">
          <p>
            At RENTO (<b>"we," "our,"</b> or <b>"us"</b>), we are committed to protecting the privacy of our users (<b>"you," "your"</b>). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our vehicle rental services.
          </p>
          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">1. Information We Collect</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2"><b>Personal Information:</b>
              <ul className="list-disc ml-6">
                <li>Name</li>
                <li>Contact information (email, phone number, address)</li>
                <li>Payment details (when required)</li>
                <li>Identification documents (driver's license, etc.)</li>
              </ul>
            </li>
            <li className="mb-2"><b>Non-Personal Information:</b>
              <ul className="list-disc ml-6">
                <li>Browser type and version</li>
                <li>IP address</li>
                <li>Pages visited on our website</li>
                <li>Referring websites or search engines</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </li>
            <li><b>Information from Third Parties:</b> Information shared by vendors, partners, or external authentication services (e.g., Google login).</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li>Providing and improving our vehicle rental services</li>
            <li>Processing transactions and bookings</li>
            <li>Verifying user identity and ensuring platform security</li>
            <li>Personalizing user experience and marketing communications</li>
            <li>Responding to customer support inquiries</li>
            <li>Managing vehicle reservations and availability</li>
          </ul>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies, web beacons, and similar technologies to enhance website functionality, monitor performance, and analyze visitor behavior. You can control cookies via your browser settings. Disabling cookies may limit website functionality.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">4. Sharing of Information</h2>
          <ul className="list-disc ml-6">
            <li>With vehicle partners and service providers to fulfill rental requests</li>
            <li>For legal purposes, such as complying with regulations or court orders</li>
            <li>During business transfers (e.g., mergers or acquisitions)</li>
          </ul>
          <p>We do not sell or share your personal information with third parties for their direct marketing purposes.</p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. We encourage you to take precautions to protect your personal information.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">6. Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc ml-6">
            <li>Access your personal information</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p>To exercise your rights, contact us at <a href="mailto:saswatbarai611@gmail.com" className="text-blue-400 underline">saswatbarai611@gmail.com</a>.</p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external websites.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">8. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be effective immediately upon posting on this page.
          </p>

          <h2 className="text-blue-300 font-semibold text-xl mt-6 mb-2">9. Contact Us</h2>
          <div className="ml-2">
            <p className="mb-1">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="mb-1"><b>RENTO</b></p>
            <p className="mb-1">Email: <a href="mailto:saswatbarai611@gmail.com" className="text-blue-400 underline">saswatbarai611@gmail.com</a></p>
            <p className="mb-1">Phone: <a href="tel:7978826224" className="text-blue-400 underline">7978826224</a></p>
            <p className="mb-1">Address: ITER, Bhubaneswar, Odisha, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
