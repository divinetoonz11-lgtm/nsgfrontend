import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from '@/components/DataTable';
import StatsCard from '@/components/StatsCard';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

export default function NetworkManagement() {
  const mockDownline = [
    { level: 1, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', business: '$5,000' },
    { level: 2, name: 'Bob White', email: 'bob@example.com', status: 'Inactive', business: '$0' },
  ];

  const columns = [
    { header: 'Level', accessorKey: 'level' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row) => (
        <span className={`status-badge ${row.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Total Business', accessorKey: 'business' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Network Management</h1>
        <p className="text-muted-foreground">Visualize and manage the binary tree and downline structures.</p>
      </div>

      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="mb-6 bg-card border">
          <TabsTrigger value="tree">Binary Tree</TabsTrigger>
          <TabsTrigger value="downline">Downline List</TabsTrigger>
          <TabsTrigger value="analytics">Team Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tree">
          <div className="admin-card p-8 min-h-[500px] flex flex-col items-center justify-center bg-muted/10">
            {/* Placeholder for complex tree visualization */}
            <div className="text-center max-w-md">
              <NetworkIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Binary Tree Visualization</h3>
              <p className="text-muted-foreground text-sm">
                Interactive tree layout will render here. Nodes will be color-coded (Green=Active, Red=Inactive, Gray=Empty).
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="downline">
          <DataTable columns={columns} data={mockDownline} exportable />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Team" value="1,245" icon={Users} />
            <StatsCard title="Active Members" value="892" icon={UserCheck} />
            <StatsCard title="Inactive Members" value="353" icon={UserX} />
            <StatsCard title="Growth Rate" value="15.2%" icon={TrendingUp} trend={15.2} />
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

function NetworkIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>;
}