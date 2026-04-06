import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AssociateLayout from '@/components/AssociateLayout';
import DataTable from '@/components/DataTable';
import { TableSkeleton } from '@/components/SkeletonUI';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

export default function RewardPage() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRewards = async () => {
    if (!user?.id) return;
    try {
      const res = await apiServerClient.fetch(`/rewards/user/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setRewards(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error('Failed to load rewards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, [user?.id]);

  const handleClaim = async (id) => {
    try {
      await apiServerClient.fetch(`/rewards/${id}/claim`, {
        method: 'PUT',
        body: JSON.stringify({ userId: user.id })
      });
      setRewards(prev => prev.map(r => r.id === id ? { ...r, isClaimed: true } : r));
      toast.success('Reward claimed successfully!');
    } catch (error) {
      toast.error('Failed to claim reward');
    }
  };

  const columns = [
    { header: 'Reward', accessorKey: 'title', cell: (row) => <div className="flex items-center gap-2"><Gift className="w-4 h-4 text-accent" /> <span className="font-medium">{row.title}</span></div> },
    { header: 'Type', accessorKey: 'type', cell: (row) => <Badge variant="outline">{row.type}</Badge> },
    { header: 'Date', accessorKey: 'date', cell: (row) => formatDate(row.date) },
    { header: 'Status', accessorKey: 'isClaimed', cell: (row) => <Badge variant={row.isClaimed ? 'default' : 'secondary'}>{row.isClaimed ? 'Claimed' : 'Available'}</Badge> },
    { 
      header: 'Action', 
      accessorKey: 'actions',
      cell: (row) => (
        !row.isClaimed && (
          <Button size="sm" onClick={() => handleClaim(row.id)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Claim Now
          </Button>
        )
      )
    }
  ];

  return (
    <AssociateLayout>
      <Helmet><title>My Rewards - Next Era Group</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Rewards</h1>
        <p className="text-muted-foreground">Track and claim your earned bonuses and rewards.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {loading ? <TableSkeleton /> : (
          <DataTable columns={columns} data={rewards} searchable />
        )}
      </div>
    </AssociateLayout>
  );
}