import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminManagement() {
  const mockAdmins = [
    { id: 1, name: 'Super Admin', email: 'admin@erragroup.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Finance Manager', email: 'finance@erragroup.com', role: 'Sub Admin', status: 'Active' },
  ];

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
    {
      header: 'Actions',
      sortable: false,
      cell: () => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="destructive">Delete</Button>
        </div>
      )
    }
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    toast.success('Admin role created successfully');
    e.target.reset();
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Admin Management</h1>
        <p className="text-muted-foreground">Manage system administrators and their permissions.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-card border">
          <TabsTrigger value="all">All Admins</TabsTrigger>
          <TabsTrigger value="sub">Sub Admins</TabsTrigger>
          <TabsTrigger value="create">Create Admin Role</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DataTable columns={columns} data={mockAdmins} />
        </TabsContent>
        
        <TabsContent value="sub">
          <DataTable columns={columns} data={mockAdmins.filter(a => a.role === 'Sub Admin')} />
        </TabsContent>

        <TabsContent value="create">
          <div className="admin-card p-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-6">Create New Administrator</h3>
            <form onSubmit={handleCreate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" required placeholder="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" required placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="sub">Sub Admin</option>
                    <option value="finance">Finance Admin</option>
                    <option value="support">Support Admin</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base">Permissions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['User Management', 'Finance Management', 'Network View', 'Reports Access', 'Settings Edit'].map(perm => (
                    <label key={perm} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                      <span className="text-sm">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto">Create Administrator</Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}