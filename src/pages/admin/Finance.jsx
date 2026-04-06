import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function Finance() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Finance Management</h1>
      <div className="bg-card p-6 rounded-lg border">
        <p className="text-muted-foreground">Finance modules will be implemented here.</p>
      </div>
    </DashboardLayout>
  );
}