import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import { useAuth } from '@/hooks/useAuth.js';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Next Era Global</title>
      </Helmet>
      <Header />
      <main className="pt-32 pb-20 min-h-screen bg-slate-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Admin Control Panel</h1>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <p className="text-slate-600">Welcome to the secure admin area, {user?.name}. System metrics and user management tools will appear here.</p>
          </div>
        </div>
      </main>
    </>
  );
}