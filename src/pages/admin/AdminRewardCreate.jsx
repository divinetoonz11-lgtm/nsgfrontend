import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient';

export default function AdminRewardCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Special',
    targetType: 'all',
    targetValue: '',
    amount: '',
    rewardDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiServerClient.fetch('/rewards/create', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Reward created and distributed successfully');
        setFormData({ title: '', description: '', type: 'Special', targetType: 'all', targetValue: '', amount: '', rewardDate: '' });
      } else {
        toast.error('Failed to create reward');
      }
    } catch (error) {
      toast.error('Error creating reward');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <Helmet><title>Create Reward - Admin</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Reward</h1>
        <p className="text-muted-foreground">Distribute bonuses and rewards to users.</p>
      </div>

      <div className="max-w-2xl rounded-2xl border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Reward Title</Label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g., Monthly Top Performer" />
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Details about the reward..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <select className="premium-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="Special">Special</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Amount (Optional)</Label>
              <Input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <select className="premium-input" value={formData.targetType} onChange={e => setFormData({...formData, targetType: e.target.value})}>
                <option value="all">All Users</option>
                <option value="role">By Role</option>
                <option value="specific">Specific User ID</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Reward Date</Label>
              <Input type="date" required value={formData.rewardDate} onChange={e => setFormData({...formData, rewardDate: e.target.value})} />
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
            {isSubmitting ? 'Processing...' : 'Save & Publish Reward'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}