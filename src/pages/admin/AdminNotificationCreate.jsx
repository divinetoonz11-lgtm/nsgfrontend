import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient';

export default function AdminNotificationCreate() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'General',
    targetType: 'all',
    targetValue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiServerClient.fetch('/notifications/create', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Notification sent successfully');
        setFormData({ title: '', message: '', type: 'General', targetType: 'all', targetValue: '' });
      } else {
        toast.error('Failed to send notification');
      }
    } catch (error) {
      toast.error('Error sending notification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <Helmet><title>Create Notification - Admin</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Notification</h1>
        <p className="text-muted-foreground">Send alerts and updates to users.</p>
      </div>

      <div className="max-w-2xl rounded-2xl border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Notification title" />
          </div>
          
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Detailed message content..." className="min-h-[120px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <select className="premium-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="General">General</option>
                <option value="Alert">Alert</option>
                <option value="Reward">Reward</option>
                <option value="Update">Update</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <select className="premium-input" value={formData.targetType} onChange={e => setFormData({...formData, targetType: e.target.value})}>
                <option value="all">All Users</option>
                <option value="role">By Role</option>
                <option value="specific">Specific User ID</option>
              </select>
            </div>
          </div>

          {formData.targetType === 'role' && (
            <div className="space-y-2">
              <Label>Select Role</Label>
              <select className="premium-input" value={formData.targetValue} onChange={e => setFormData({...formData, targetValue: e.target.value})}>
                <option value="">Select...</option>
                <option value="associate">Associates</option>
                <option value="customer">Customers</option>
              </select>
            </div>
          )}

          {formData.targetType === 'specific' && (
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input required value={formData.targetValue} onChange={e => setFormData({...formData, targetValue: e.target.value})} placeholder="Enter User ID" />
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Sending...' : 'Send Notification'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}