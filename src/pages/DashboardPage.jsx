import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/hooks/useAuth.js';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Dashboard - Next Era Global</title>
      </Helmet>
      <Header />
      <main className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name || 'Investor'}</h1>
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <p className="text-muted-foreground">Your investment dashboard is currently being set up. Check back soon for portfolio analytics and new opportunities.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}