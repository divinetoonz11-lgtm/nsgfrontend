import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function DisclaimerPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Helmet><title>Disclaimer - Next Era Group</title></Helmet>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: {currentDate}</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. No Guaranteed Income</h2>
              <p className="text-muted-foreground leading-relaxed">
                Next Era Group Pvt Ltd does not guarantee any specific level of income or returns. Earnings and returns depend entirely on individual activity, market conditions, and project performance. Past performance is not indicative of future results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Platform Nature</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform facilitates real estate participation and related services. It is not a traditional investment scheme or guaranteed return program. Users must understand the inherent risks associated with real estate and market-linked activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for your own decisions and actions on the platform. We strongly advise all users to conduct their own research, due diligence, and consult with independent financial advisors before making any commitments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Liability Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Next Era Group Pvt Ltd shall not be held liable for any financial losses, damages, or negative outcomes resulting from user decisions, market fluctuations, or unforeseen economic conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Risk Acknowledgment</h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our platform, you explicitly acknowledge that you understand the risks involved in real estate and business participation. You agree to use the platform and its services entirely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. No Professional Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                The information provided on this platform does not constitute financial, legal, or tax advice. All content is for informational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Accuracy of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to keep the information on our platform accurate and up-to-date, we make no warranties or representations regarding the completeness, reliability, or accuracy of any content provided.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}