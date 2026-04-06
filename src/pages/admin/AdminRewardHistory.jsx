import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import { TableSkeleton } from '@/components/SkeletonUI';
import apiServerClient from '@/lib/apiServerClient';
import { toast } from 'sonner';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AdminRewardHistory() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await apiServerClient.fetch('/rewards/admin/history');
        if (res.ok) {
          const data = await res.json();
          setRewards(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        toast.error('Failed to load reward history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const columns = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Type', accessorKey: 'type', cell: (row) => <Badge variant="outline">{row.type}</Badge> },
    { header: 'Target', accessorKey: 'targetType', cell: (row) => <span className="capitalize">{row.targetType} {row.targetValue ? `(${row.targetValue})` : ''}</span> },
    { header: 'Amount', accessorKey: 'amount', cell: (row) => row.amount ? formatCurrency(row.amount) : '-' },
    { header: 'Date', accessorKey: 'date', cell: (row) => formatDate(row.date) }
  ];

  return (
    <AdminLayout>
      <Helmet><title>Reward History - Admin</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reward History</h1>
        <p className="text-muted-foreground">View all distributed rewards.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {loading ? <TableSkeleton /> : (
          <DataTable columns={columns} data={rewards} searchable />
        )}
      </div>
    </AdminLayout>
  );
}