import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminOverviewPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
          <p className="text-3xl font-bold mt-2">892</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
          <p className="text-3xl font-bold mt-2">$45,678</p>
        </div>
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Pending Deposits</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>
    </DashboardLayout>
  );
}