import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { TableSkeleton } from '@/components/SkeletonUI';
import { toast } from 'sonner';
import axiosClient from '@/lib/axiosClient';

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosClient.get('/admin/users'); // backend endpoint
        setUsers(res.data); // real users from DB
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row) => (
        <span className={`status-badge ${row.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Referral ID', accessorKey: 'referralId' },
    { header: 'Sponsor ID', accessorKey: 'sponsorId' },
    { header: 'Join Date', accessorKey: 'joinDate' },
    { header: 'Wallet', accessorKey: 'wallet', cell: (row) => `$${row.wallet.toLocaleString()}` },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="ghost" size="sm" className={row.status === 'Active' ? 'text-destructive' : 'text-success'}>
            {row.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">User Management</h1>
          <p className="text-muted-foreground">Manage all registered users, associates, and customers.</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-card border">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="new">New Registrations</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="admin-card p-6"><TableSkeleton /></div>
        ) : (
          <>
            <TabsContent value="all">
              <DataTable columns={columns} data={users} exportable />
            </TabsContent>
            <TabsContent value="active">
              <DataTable columns={columns} data={users.filter(u => u.status === 'Active')} exportable />
            </TabsContent>
            <TabsContent value="inactive">
              <DataTable columns={columns} data={users.filter(u => u.status === 'Inactive')} exportable />
            </TabsContent>
            <TabsContent value="new">
              <DataTable columns={columns} data={users.filter(u => new Date(u.joinDate) > new Date('2026-03-01'))} exportable />
            </TabsContent>
          </>
        )}
      </Tabs>
    </AdminLayout>
  );
}