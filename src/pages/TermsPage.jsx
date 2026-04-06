import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Helmet><title>Terms and Conditions - Next Era Group</title></Helmet>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: {currentDate}</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Next Era Group Pvt Ltd. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Our platform is performance-based, and there is no guaranteed income. Users must provide correct and accurate information during registration. The company reserves the right to modify plans, terms, and conditions at any time. Any misuse of the platform will lead to immediate suspension of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information during the registration process.</li>
                <li>Maintain the security and confidentiality of your account credentials.</li>
                <li>Comply with all applicable laws, rules, and regulations while using the platform.</li>
                <li>Promptly update your account information if any changes occur.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Platform Usage</h2>
              <p className="text-muted-foreground leading-relaxed">
                The platform is provided for your personal and business use in connection with Next Era Group's services. You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality on the platform, including but not limited to text, graphics, logos, and software, are the exclusive property of Next Era Group Pvt Ltd and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising out of or relating to these Terms and Conditions or your use of the platform shall be subject to the exclusive jurisdiction of the Mumbai High Court only. The governing law shall be the laws of India, with jurisdiction specifically in Mumbai, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Next Era Group Pvt Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                By continuing to use this platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}