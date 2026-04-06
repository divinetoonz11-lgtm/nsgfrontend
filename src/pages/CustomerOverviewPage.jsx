import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function CustomerOverviewPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Investment</h3>
          <p className="text-3xl font-bold mt-2">$10,000</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Properties Owned</h3>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">KYC Status</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">Verified</p>
        </div>
      </div>
    </DashboardLayout>
  );
}