import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/AdminLayout';
import DataTable from '@/components/DataTable';
import { TableSkeleton } from '@/components/SkeletonUI';
import apiServerClient from '@/lib/apiServerClient';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function AdminChatLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await apiServerClient.fetch('/chat/logs');
        if (res.ok) {
          const data = await res.json();
          setLogs(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        toast.error('Failed to load chat logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const columns = [
    { header: 'User ID', accessorKey: 'userId' },
    { header: 'Message', accessorKey: 'message', cell: (row) => <span className="line-clamp-1 max-w-[200px]">{row.message}</span> },
    { header: 'Response', accessorKey: 'response', cell: (row) => <span className="line-clamp-1 max-w-[200px] text-muted-foreground">{row.response}</span> },
    { header: 'Date', accessorKey: 'timestamp', cell: (row) => formatDate(row.timestamp) },
    { header: 'Sender', accessorKey: 'isUser', cell: (row) => <Badge variant={row.isUser ? 'default' : 'secondary'}>{row.isUser ? 'User' : 'AI'}</Badge> }
  ];

  return (
    <AdminLayout>
      <Helmet><title>Chat Logs - Admin</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Chat Logs</h1>
        <p className="text-muted-foreground">Monitor AI and user chat interactions.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {loading ? <TableSkeleton /> : (
          <DataTable columns={columns} data={logs} searchable />
        )}
      </div>
    </AdminLayout>
  );
}