import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CustomerTransactions() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="bg-card p-6 rounded-lg border">
        <p className="text-muted-foreground">Transaction modules will be implemented here.</p>
      </div>
    </DashboardLayout>
  );
}