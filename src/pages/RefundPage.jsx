import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function RefundPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Helmet><title>Refund Policy - Next Era Group</title></Helmet>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
            <p className="text-muted-foreground">Last updated: {currentDate}</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                Refund requests are only eligible if submitted within 7 days of the initial transaction. No refunds will be provided after account activation or usage of platform services. All refund requests are subject to verification by our financial team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Refund Process</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, you must contact our support team with your transaction details, account information, and a valid reason for the request. You may be required to submit additional documentation to verify your identity and the transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Refund Timeline</h2>
              <p className="text-muted-foreground leading-relaxed">
                Once a refund is approved, it will be processed within 5-7 working days. The funds will be returned to the original payment method used during the transaction. Processing times may vary depending on your bank or financial institution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Company Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Next Era Group Pvt Ltd reserves the right to approve or reject any refund request at its sole discretion. We may request additional information or documentation before processing any refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Exceptions</h2>
              <p className="text-muted-foreground leading-relaxed">
                No refunds will be issued in cases of account suspension due to fraud, misuse of the platform, violation of our Terms and Conditions, or any illegal activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our Refund Policy, please contact us at info@nexterraglobal.co.in.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}