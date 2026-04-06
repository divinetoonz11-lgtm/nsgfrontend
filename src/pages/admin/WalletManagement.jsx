import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient';
import { TableSkeleton } from '@/components/SkeletonUI';

export default function WalletManagement() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const res = await apiServerClient.fetch('/users');
      if (res.ok) {
        const data = await res.json();
        // Map users to include mock balance if not provided by API
        setUsers(data.map(u => ({ ...u, balance: u.balance || Math.floor(Math.random() * 5000), lastUpdated: new Date().toISOString() })));
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      toast.error('Failed to load wallet data');
      setUsers([
        { id: 'USR001', name: 'John Doe', balance: 1500, lastUpdated: new Date().toISOString() },
        { id: 'USR002', name: 'Jane Smith', balance: 3200, lastUpdated: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleAdjust = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const type = e.target.actionType.value;
    
    try {
      // Mocking the adjustment API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`Wallet balance updated successfully for ${selectedUser.name}`);
      setModalOpen(false);
      fetchWallets();
    } catch (error) {
      toast.error('Failed to adjust balance');
    }
  };

  const columns = [
    { header: 'User ID', accessorKey: 'id' },
    { header: 'User Name', accessorKey: 'name' },
    { header: 'Current Balance', accessorKey: 'balance', cell: (row) => <span className="font-semibold text-lg">${row.balance.toLocaleString()}</span> },
    { header: 'Last Updated', accessorKey: 'lastUpdated', cell: (row) => new Date(row.lastUpdated).toLocaleDateString() },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <Button size="sm" onClick={() => { setSelectedUser(row); setModalOpen(true); }}>
          Adjust Balance
        </Button>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Wallet Management</h1>
        <p className="text-muted-foreground">View and adjust user wallet balances.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {loading ? <TableSkeleton /> : <DataTable columns={columns} data={users} exportable searchable />}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Adjust Wallet Balance">
        {selectedUser && (
          <form onSubmit={handleAdjust} className="space-y-4">
            <div className="p-4 bg-muted rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">Current Balance for {selectedUser.name}</p>
              <p className="text-3xl font-bold">${selectedUser.balance.toLocaleString()}</p>
            </div>
            
            <div className="space-y-2">
              <Label>Action Type</Label>
              <select name="actionType" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option value="add">Add Funds (+)</option>
                <option value="deduct">Deduct Funds (-)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input name="amount" type="number" min="1" required placeholder="Enter amount" />
            </div>

            <div className="space-y-2">
              <Label>Reason / Remarks</Label>
              <Input required placeholder="e.g., Manual adjustment, Bonus, Correction" />
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit">Confirm Adjustment</Button>
            </div>
          </form>
        )}
      </Modal>
    </AdminLayout>
  );
}