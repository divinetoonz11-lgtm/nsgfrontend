import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CustomerSupport() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Support</h1>
      <div className="bg-card p-6 rounded-lg border">
        <p className="text-muted-foreground">Support modules will be implemented here.</p>
      </div>
    </DashboardLayout>
  );
}