import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import BinaryTree from '@/components/BinaryTree';

export default function Network() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">My Network</h1>
      <BinaryTree data={{}} onNodeClick={() => {}} />
    </DashboardLayout>
  );
}