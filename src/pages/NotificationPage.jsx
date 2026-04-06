import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AssociateLayout from '@/components/AssociateLayout';
import DataTable from '@/components/DataTable';
import { TableSkeleton } from '@/components/SkeletonUI';
import NotificationModal from '@/components/NotificationModal';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, CheckCircle } from 'lucide-react';

export default function NotificationPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotifications = async () => {
    if (!user?.id) return;
    try {
      const res = await apiServerClient.fetch(`/notifications/user/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  const handleMarkRead = async (id) => {
    try {
      await apiServerClient.fetch(`/notifications/${id}/read`, {
        method: 'PUT',
        body: JSON.stringify({ isRead: true, userId: user.id })
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      if (selectedNotif?.id === id) setSelectedNotif(prev => ({ ...prev, isRead: true }));
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiServerClient.fetch(`/notifications/${id}`, { method: 'DELETE' });
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const columns = [
    { header: 'Title', accessorKey: 'title', cell: (row) => <span className={row.isRead ? 'font-normal' : 'font-bold'}>{row.title}</span> },
    { header: 'Type', accessorKey: 'type', cell: (row) => <Badge variant={row.type === 'Alert' ? 'destructive' : 'secondary'}>{row.type}</Badge> },
    { header: 'Date', accessorKey: 'date', cell: (row) => formatDate(row.date) },
    { header: 'Status', accessorKey: 'isRead', cell: (row) => <Badge variant={row.isRead ? 'outline' : 'default'}>{row.isRead ? 'Read' : 'Unread'}</Badge> },
    { 
      header: 'Actions', 
      accessorKey: 'actions',
      cell: (row) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {!row.isRead && (
            <Button variant="ghost" size="icon" onClick={() => handleMarkRead(row.id)} title="Mark as read">
              <CheckCircle className="w-4 h-4 text-success" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.id)} title="Delete">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <AssociateLayout>
      <Helmet><title>Notifications - Next Era Group</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications</h1>
        <p className="text-muted-foreground">View and manage your alerts and updates.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {loading ? <TableSkeleton /> : (
          <DataTable 
            columns={columns} 
            data={notifications} 
            searchable 
            onRowClick={(row) => {
              setSelectedNotif(row);
              setIsModalOpen(true);
              if (!row.isRead) handleMarkRead(row.id);
            }}
          />
        )}
      </div>

      <NotificationModal 
        notification={selectedNotif}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMarkRead={handleMarkRead}
      />
    </AssociateLayout>
  );
}