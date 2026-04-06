import React, { useState, useEffect } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown.jsx';
import NotificationModal from './NotificationModal.jsx';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';
import { toast } from 'sonner';

export default function NotificationBell() {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async (showLoader = false) => {
    if (!user?.id) return;
    if (showLoader) setLoading(true);
    try {
      const response = await apiServerClient.fetch(`/notifications/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications(true);
      const interval = setInterval(() => fetchNotifications(false), 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user?.id]);

  const handleMarkRead = async (id) => {
    try {
      await apiServerClient.fetch(`/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true, userId: user.id })
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      if (selectedNotification?.id === id) {
        setSelectedNotification(prev => ({ ...prev, isRead: true }));
      }
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiServerClient.fetch(`/notifications/${id}`, { method: 'DELETE' });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const handleOpenModal = (notif) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
    if (!notif.isRead) {
      handleMarkRead(notif.id);
    }
  };

  if (!isAuthenticated) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <NotificationDropdown 
        notifications={notifications}
        onMarkRead={handleMarkRead}
        onDelete={handleDelete}
        onOpenModal={handleOpenModal}
      >
        <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors outline-none">
          {loading && notifications.length === 0 ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Bell className="w-5 h-5" />
          )}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background notification-new"></span>
          )}
        </button>
      </NotificationDropdown>

      <NotificationModal 
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMarkRead={handleMarkRead}
      />
    </>
  );
}