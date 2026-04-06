
import React, { useState, useEffect } from 'react';
import AssociateLayout from '@/components/AssociateLayout';
import StatsCard from '@/components/StatsCard';
import { LineChart, BarChart } from '@/components/Chart';
import DataTable from '@/components/DataTable';
import { CardSkeleton, TableSkeleton } from '@/components/SkeletonUI';
import { DollarSign, Wallet, Users, UserCheck, Copy, AlertTriangle } from 'lucide-react';
import railwayApiClient from '@/lib/railwayApiClient.js';
import { toast } from 'sonner';
import RewardPopup from '@/components/RewardPopup';
import ChatButton from '@/components/ChatButton';
import { useAuth } from '@/hooks/useAuth.js';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BinaryTree from '@/components/BinaryTree.jsx';

export default function AssociateDashboard() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardRes, treeRes] = await Promise.all([
          railwayApiClient.get('/dashboard/associate').catch((err) => {
            const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to load dashboard';
            toast.error(msg);
            return { data: null };
          }),
          railwayApiClient.get('/associate/tree').catch(() => ({ data: null }))
        ]);
        
        setData(dashboardRes.data || {
          totalIncome: 0,
          walletBalance: 0,
          totalTeam: 0,
          activeTeam: 0,
          incomeData: [],
          teamData: [],
          transactions: [],
          recentJoins: []
        });

        if (treeRes.data) {
          setTreeData(treeRes.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyReferral = () => {
    const link = `https://www.nexteraglobal.co.in/signup?referrer=${user?.referral_id || ''}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  if (loading && !data) {
    return (
      <AssociateLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border bg-card p-6 h-[400px]"><TableSkeleton rows={0} /></div>
          <div className="rounded-2xl border bg-card p-6 h-[400px]"><TableSkeleton rows={0} /></div>
        </div>
      </AssociateLayout>
    );
  }

  return (
    <AssociateLayout>
      <RewardPopup />

      {user?.activation_status === 'inactive' && (
        <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Your account is pending activation. Contact support.</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user?.name || 'Associate'}!</h1>
          <p className="text-muted-foreground">Here's an overview of your business and network.</p>
        </div>
        <Button variant="outline" onClick={logout} className="md:w-auto w-full">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Full Name</p>
              <p className="font-medium">{user?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email Address</p>
              <p className="font-medium">{user?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="font-medium">{user?.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Address</p>
              <p className="font-medium">{user?.address || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Account Status</h3>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={user?.activation_status === 'active' ? 'default' : 'secondary'} className={user?.activation_status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}>
                {user?.activation_status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Referral ID</span>
              <span className="font-medium">{user?.referral_id || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Sponsor</span>
              <span className="font-medium">{user?.sponsor_name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Placement</span>
              <span className="font-medium capitalize">{user?.placement || 'N/A'}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t">
            <Button onClick={handleCopyReferral} className="w-full" variant="secondary">
              <Copy className="w-4 h-4 mr-2" /> Copy Referral Link
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Income" value={`$${data?.totalIncome?.toLocaleString() || 0}`} icon={DollarSign} trend={12.5} />
        <StatsCard title="Wallet Balance" value={`$${data?.walletBalance?.toLocaleString() || 0}`} icon={Wallet} />
        <StatsCard title="Total Team" value={data?.totalTeam || 0} icon={Users} trend={5.2} />
        <StatsCard title="Active Team" value={data?.activeTeam || 0} icon={UserCheck} />
      </div>

      {treeData && (
        <div className="mb-8 bg-card rounded-2xl border shadow-sm p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-6">Network Tree</h3>
          <div className="min-w-[800px]">
            <BinaryTree data={treeData} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Income Growth (30 Days)</h3>
          <LineChart data={data?.incomeData || []} xKey="name" yKeys={['val']} height={300} />
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Team Growth (30 Days)</h3>
          <BarChart data={data?.teamData || []} xKey="name" yKeys={['val']} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
          <DataTable 
            columns={[
              { header: 'Type', accessorKey: 'type' },
              { header: 'Amount', accessorKey: 'amount' },
              { header: 'Date', accessorKey: 'date' },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (row) => <span className={`status-badge status-${row.status?.toLowerCase() || 'pending'}`}>{row.status}</span>
              },
            ]} 
            data={data?.transactions || []} 
            searchable={false}
          />
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">New Team Members</h3>
          <DataTable 
            columns={[
              { header: 'Name', accessorKey: 'name' },
              { header: 'Join Date', accessorKey: 'date' },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (row) => <span className={`status-badge status-${row.status?.toLowerCase() || 'inactive'}`}>{row.status}</span>
              },
            ]} 
            data={data?.recentJoins || []} 
            searchable={false}
          />
        </div>
      </div>
      <ChatButton />
    </AssociateLayout>
  );
}
