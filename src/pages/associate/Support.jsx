import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AssociateLayout from '@/components/AssociateLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton } from '@/components/SkeletonUI';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getStatusColor } from '@/lib/utils';

export default function SupportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'create';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, [currentTab]);

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Support ticket created successfully");
    e.target.reset();
  };

  return (
    <AssociateLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Support</h1>
        <p className="text-muted-foreground">Get help and manage your support tickets.</p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="create" className="rounded-lg">Create Ticket</TabsTrigger>
          <TabsTrigger value="view" className="rounded-lg">View Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <div className="max-w-2xl rounded-2xl border bg-card p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input required placeholder="Brief description of the issue" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option>Technical</option>
                  <option>Billing</option>
                  <option>General</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea required placeholder="Provide detailed information..." className="min-h-[150px]" />
              </div>
              <Button type="submit">Submit Ticket</Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="view">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            {loading ? <TableSkeleton /> : (
              <DataTable 
                columns={[
                  { header: 'ID', accessorKey: 'id' },
                  { header: 'Subject', accessorKey: 'subject' },
                  { header: 'Category', accessorKey: 'category' },
                  { 
                    header: 'Status', 
                    accessorKey: 'status',
                    cell: (row) => <span className={`status-badge ${getStatusColor(row.status)}`}>{row.status}</span>
                  },
                  { header: 'Date', accessorKey: 'date' },
                ]} 
                data={[
                  { id: 'TKT-001', subject: 'Payment not reflecting', category: 'Billing', status: 'Open', date: '2026-04-01' },
                  { id: 'TKT-002', subject: 'How to upgrade plan', category: 'General', status: 'Closed', date: '2026-03-28' },
                ]} 
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </AssociateLayout>
  );
}