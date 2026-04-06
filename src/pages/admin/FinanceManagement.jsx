import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import ConfirmationPopup from '@/components/ConfirmationPopup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function FinanceManagement() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const mockData = [
    { id: 'TX001', user: 'John Doe', amount: 1000, status: 'Pending', date: '2026-04-03', method: 'Bank Transfer' },
    { id: 'TX002', user: 'Jane Smith', amount: 500, status: 'Approved', date: '2026-04-02', method: 'Crypto' },
  ];

  const handleAction = (action, row) => {
    setSelectedAction({ action, row });
    setConfirmOpen(true);
  };

  const executeAction = () => {
    toast.success(`Successfully ${selectedAction.action}d transaction ${selectedAction.row.id}`);
    setConfirmOpen(false);
  };

  const columns = [
    { header: 'Transaction ID', accessorKey: 'id' },
    { header: 'User', accessorKey: 'user' },
    { header: 'Amount', accessorKey: 'amount', cell: (row) => `$${row.amount}` },
    { header: 'Method', accessorKey: 'method' },
    { header: 'Date', accessorKey: 'date' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row) => (
        <span className={`status-badge ${
          row.status === 'Approved' ? 'status-active' : 
          row.status === 'Rejected' ? 'status-inactive' : 'status-pending'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => row.status === 'Pending' ? (
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleAction('approve', row)}>Approve</Button>
          <Button size="sm" variant="destructive" onClick={() => handleAction('reject', row)}>Reject</Button>
        </div>
      ) : (
        <Button size="sm" variant="outline">View</Button>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Finance Management</h1>
        <p className="text-muted-foreground">Manage deposits, withdrawals, and view all transactions.</p>
      </div>

      <Tabs defaultValue="deposits" className="w-full">
        <TabsList className="mb-6 bg-card border">
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="deposits">
          <DataTable columns={columns} data={mockData} exportable />
        </TabsContent>
        <TabsContent value="withdrawals">
          <DataTable columns={columns} data={mockData.map(d => ({...d, id: d.id.replace('TX', 'WD')}))} exportable />
        </TabsContent>
        <TabsContent value="transactions">
          <DataTable columns={columns} data={mockData} exportable />
        </TabsContent>
      </Tabs>

      <ConfirmationPopup 
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={executeAction}
        title={`Confirm ${selectedAction?.action === 'approve' ? 'Approval' : 'Rejection'}`}
        description={`Are you sure you want to ${selectedAction?.action} this transaction for $${selectedAction?.row?.amount}?`}
        variant={selectedAction?.action === 'reject' ? 'destructive' : 'default'}
      />
    </AdminLayout>
  );
}