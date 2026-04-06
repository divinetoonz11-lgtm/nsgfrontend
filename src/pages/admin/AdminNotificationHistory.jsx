import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import { TableSkeleton } from '@/components/SkeletonUI';
import apiServerClient from '@/lib/apiServerClient';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AdminNotificationHistory() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await apiServerClient.fetch('/notifications/admin/history');
        if (res.ok) {
          const data = await res.json();
          setNotifications(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        toast.error('Failed to load notification history');
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
    { header: 'Date', accessorKey: 'date', cell: (row) => formatDate(row.date) },
    { header: 'Status', accessorKey: 'status', cell: (row) => <Badge variant="secondary">{row.status || 'Sent'}</Badge> }
  ];

  return (
    <AdminLayout>
      <Helmet><title>Notification History - Admin</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Notification History</h1>
        <p className="text-muted-foreground">View all sent notifications.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {loading ? <TableSkeleton /> : (
          <DataTable columns={columns} data={notifications} searchable />
        )}
      </div>
    </AdminLayout>
  );
}