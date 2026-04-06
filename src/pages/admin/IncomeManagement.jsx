import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import StatsCard from '@/components/StatsCard';
import { PieChart, LineChart } from '@/components/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableSkeleton, CardSkeleton } from '@/components/SkeletonUI';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default function IncomeManagement() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const mockData = [
    { id: 1, user: 'John Doe', type: 'Direct', amount: 500, date: '2026-04-03', status: 'Paid' },
    { id: 2, user: 'Jane Smith', type: 'Binary', amount: 250, date: '2026-04-02', status: 'Pending' },
    { id: 3, user: 'Mike Johnson', type: 'ROI', amount: 50, date: '2026-04-01', status: 'Paid' },
  ];

  const columns = [
    { header: 'User', accessorKey: 'user' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Amount', accessorKey: 'amount', cell: (row) => `$${row.amount}` },
    { header: 'Date', accessorKey: 'date' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (row) => (
        <span className={`status-badge ${row.status === 'Paid' ? 'status-active' : 'status-pending'}`}>
          {row.status}
        </span>
      )
    },
  ];

  const pieData = [
    { name: 'Direct', value: 45000 },
    { name: 'Binary', value: 30000 },
    { name: 'Level', value: 15000 },
    { name: 'ROI', value: 10000 },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Income Management</h1>
        <p className="text-muted-foreground">Track and manage all system payouts and commissions.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Income Distributed" value="$1,245,000" icon={DollarSign} />
          <StatsCard title="Today's Payout" value="$12,450" icon={TrendingUp} />
          <StatsCard title="This Month" value="$345,000" icon={Calendar} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="admin-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Daily Income Trend</h3>
          <LineChart data={[{name:'1', val:400}, {name:'2', val:300}, {name:'3', val:500}]} xKey="name" yKeys={['val']} height={300} />
        </div>
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-6">Income Breakdown</h3>
          <PieChart data={pieData} nameKey="name" dataKey="value" height={300} />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-card border flex-wrap h-auto">
          <TabsTrigger value="all">All Income</TabsTrigger>
          <TabsTrigger value="direct">Direct</TabsTrigger>
          <TabsTrigger value="binary">Binary</TabsTrigger>
          <TabsTrigger value="level">Level</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
          <TabsTrigger value="royalty">Royalty</TabsTrigger>
        </TabsList>

        <div className="admin-card p-0 border-none shadow-none bg-transparent">
          {loading ? <TableSkeleton /> : <DataTable columns={columns} data={mockData} exportable />}
        </div>
      </Tabs>
    </AdminLayout>
  );
}