
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardCard from '@/components/DashboardCard';
import { Building, Wallet, Clock, CheckCircle, Copy, AlertTriangle } from 'lucide-react';
import RewardPopup from '@/components/RewardPopup';
import ChatButton from '@/components/ChatButton';
import railwayApiClient from '@/lib/railwayApiClient.js';
import { CardSkeleton } from '@/components/SkeletonUI';
import { useAuth } from '@/hooks/useAuth.js';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await railwayApiClient.get('/dashboard/customer');
        setData(res.data);
      } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || error.response?.data?.error || 'Failed to load dashboard';
        toast.error(msg);
        
        // Fallback if endpoint doesn't exist yet
        setData({
          totalInvestment: 0,
          propertiesOwned: 0,
          activeBookings: 0,
          pendingTransactions: 0
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleCopyReferral = () => {
    const link = `https://www.nexteraglobal.co.in/signup?referrer=${user?.referral_id || ''}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  if (loading && !data) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <RewardPopup />
      
      {user?.activation_status === 'inactive' && (
        <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Your account is pending activation. Contact support.</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {user?.name || 'Customer'}!</h1>
          <p className="text-muted-foreground">Manage your properties and investments.</p>
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
            {data?.package && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Package</span>
                <span className="font-medium">{data.package}</span>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t">
            <Button onClick={handleCopyReferral} className="w-full" variant="secondary">
              <Copy className="w-4 h-4 mr-2" /> Copy Referral Link
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Investment" value={`$${data?.totalInvestment?.toLocaleString() || 0}`} icon={Wallet} />
        <DashboardCard title="Properties Owned" value={data?.propertiesOwned || 0} icon={Building} />
        <DashboardCard title="Active Bookings" value={data?.activeBookings || 0} icon={CheckCircle} />
        <DashboardCard title="Pending Transactions" value={data?.pendingTransactions || 0} icon={Clock} />
      </div>
      <ChatButton />
    </DashboardLayout>
  );
}
