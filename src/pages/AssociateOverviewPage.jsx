import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function AssociateOverviewPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Associate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Wallet Balance</h3>
          <p className="text-3xl font-bold mt-2">$1,234</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
          <p className="text-3xl font-bold mt-2">$5,678</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Team Size</h3>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Active Package</h3>
          <p className="text-3xl font-bold mt-2">Gold</p>
        </div>
      </div>
    </DashboardLayout>
  );
}