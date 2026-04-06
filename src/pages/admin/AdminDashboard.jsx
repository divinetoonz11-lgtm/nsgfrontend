
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import StatsCard from '@/components/StatsCard';
import { LineChart, BarChart } from '@/components/Chart';
import DataTable from '@/components/DataTable';
import { CardSkeleton, TableSkeleton } from '@/components/SkeletonUI';
import { Users, Activity, DollarSign, ArrowDownRight, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import RewardPopup from '@/components/RewardPopup';
import ChatButton from '@/components/ChatButton';
import railwayApiClient from '@/lib/railwayApiClient.js';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const res = await railwayApiClient.get('/dashboard/admin');
      setStats(res.data);
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to load dashboard data';
      toast.error(message);
      
      // Fallback data if endpoint is not fully ready
      setStats({
        totalUsers: 12450,
        activeUsers: 8920,
        totalIncome: 456780,
        totalWithdrawals: 125000,
        walletBalance: 850000,
        chartData: Array.from({ length: 30 }).map((_, i) => ({
          name: `Day ${i+1}`,
          income: Math.floor(Math.random() * 5000) + 1000,
          users: Math.floor(Math.random() * 50) + 10,
          binary: Math.floor(Math.random() * 2000) + 500,
        })),
        recentUsers: [
          { id: 1, name: 'John Doe', email: 'john@example.com', date: '2026-04-03' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2026-04-02' },
        ],
        recentTransactions: [
          { id: 'TX123', user: 'John Doe', type: 'Deposit', amount: '$500', date: '2026-04-03' },
          { id: 'TX124', user: 'Jane Smith', type: 'Withdrawal', amount: '$200', date: '2026-04-02' },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return (
      <AdminLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="admin-card p-6 h-[400px]"><TableSkeleton rows={0} /></div>
          <div className="admin-card p-6 h-[400px]"><TableSkeleton rows={0} /></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <RewardPopup />
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatsCard title="Total Users" value={stats?.totalUsers?.toLocaleString() || 0} icon={Users} trend={12.5} trendLabel="vs last month" />
        <StatsCard title="Active Users" value={stats?.activeUsers?.toLocaleString() || 0} icon={Activity} trend={5.2} trendLabel="vs last month" />
        <StatsCard title="Total Income" value={`$${stats?.totalIncome?.toLocaleString() || 0}`} icon={DollarSign} trend={18.2} trendLabel="vs last month" />
        <StatsCard title="Withdrawals" value={`$${stats?.totalWithdrawals?.toLocaleString() || 0}`} icon={ArrowDownRight} trend={-2.4} trendLabel="vs last month" />
        <StatsCard title="System Wallet" value={`$${stats?.walletBalance?.toLocaleString() || 0}`} icon={Wallet} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="admin-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Income Growth (30 Days)</h3>
          <LineChart data={stats?.chartData || []} xKey="name" yKeys={['income']} height={300} />
        </div>
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-6">User Registrations</h3>
          <BarChart data={stats?.chartData || []} xKey="name" yKeys={['users']} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Registrations</h3>
          <DataTable 
            columns={[
              { header: 'Name', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' },
              { header: 'Date', accessorKey: 'date' },
            ]} 
            data={stats?.recentUsers || []} 
            searchable={false}
          />
        </div>
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
          <DataTable 
            columns={[
              { header: 'User', accessorKey: 'user' },
              { header: 'Type', accessorKey: 'type' },
              { header: 'Amount', accessorKey: 'amount' },
              { header: 'Date', accessorKey: 'date' },
            ]} 
            data={stats?.recentTransactions || []} 
            searchable={false}
          />
        </div>
      </div>
      <ChatButton />
    </AdminLayout>
  );
}
