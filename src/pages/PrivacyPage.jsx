import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Helmet><title>Privacy Policy - Next Era Group</title></Helmet>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {currentDate}</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Next Era Group Pvt Ltd respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Data Collection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect personal information that you voluntarily provide to us when registering on the platform. This includes your name, email address, phone number, and physical address. This information is necessary for the core functionality of our platform and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Usage</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information we collect is used for platform functionality, facilitating transactions, communicating with you regarding your account or our services, and performing internal analytics to improve our offerings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard encryption and secure storage measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform uses "cookies" to enhance user experience and provide core functionality. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. However, doing so may cause some parts of the platform to function improperly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. User Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You may request the deletion of your account and associated data by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for the privacy practices or the content of those third-party sites. We encourage you to read the privacy policies of any website you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Policy Changes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Next Era Group Pvt Ltd has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}