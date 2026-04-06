import React, { useState, useEffect } from 'react';
import AssociateLayout from '@/components/AssociateLayout';
import StatsCard from '@/components/StatsCard';
import DataTable from '@/components/DataTable';
import { CardSkeleton, TableSkeleton } from '@/components/SkeletonUI';
import { Users, UserCheck, DollarSign, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/apiClient';
import { copyToClipboard, formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { toast } from 'sonner';

export default function ReferralPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mocking API calls
      setTimeout(() => {
        setData({
          referralLink: 'https://example.com/ref/REF12345',
          stats: { total: 156, active: 89, earnings: 4500 },
          history: Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            joinDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            status: Math.random() > 0.3 ? 'Active' : 'Inactive',
            earnings: Math.floor(Math.random() * 500)
          }))
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error('Failed to load referral data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AssociateLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <TableSkeleton />
      </AssociateLayout>
    );
  }

  return (
    <AssociateLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Referral System</h1>
        <p className="text-muted-foreground">Manage your network and track referral earnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
          <div className="flex gap-3 mb-6">
            <Input value={data?.referralLink} readOnly className="bg-muted/50" />
            <Button onClick={() => copyToClipboard(data?.referralLink)} className="shrink-0">
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> WhatsApp</Button>
            <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> Twitter</Button>
            <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> Facebook</Button>
          </div>
        </div>
        <StatsCard title="Referral Earnings" value={formatCurrency(data?.stats.earnings)} icon={DollarSign} className="bg-primary text-primary-foreground" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatsCard title="Total Referrals" value={data?.stats.total} icon={Users} />
        <StatsCard title="Active Referrals" value={data?.stats.active} icon={UserCheck} />
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Referral History</h3>
        <DataTable 
          columns={[
            { header: 'Name', accessorKey: 'name' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Join Date', accessorKey: 'joinDate', cell: (row) => formatDate(row.joinDate) },
            { 
              header: 'Status', 
              accessorKey: 'status',
              cell: (row) => <span className={`status-badge ${getStatusColor(row.status)}`}>{row.status}</span>
            },
            { header: 'Earnings', accessorKey: 'earnings', cell: (row) => formatCurrency(row.earnings) },
          ]} 
          data={data?.history || []} 
          searchable={true}
          exportable={true}
        />
      </div>
    </AssociateLayout>
  );
}