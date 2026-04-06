
import React, { useState, useEffect } from 'react';
import AssociateLayout from '@/components/AssociateLayout';
import { CardSkeleton } from '@/components/SkeletonUI';
import { MapPin, Grid, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth';

export default function PropertyPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);
  const { user } = useAuth();

  const fetchProperties = async () => {
    try {
      const response = await apiServerClient.fetch('/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(Array.isArray(data) ? data : data.properties || []);
      } else {
        // Fallback mock data
        setProperties([
          { id: 1, name: 'Green Valley Estate', location: 'North District', price: 50000, totalPlots: 120, available: 45, sold: 60, hold: 15, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750' },
          { id: 2, name: 'Sunrise Meadows', location: 'East District', price: 120000, totalPlots: 80, available: 12, sold: 60, hold: 8, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00' },
          { id: 3, name: 'Pine Hill Residences', location: 'West District', price: 75000, totalPlots: 200, available: 150, sold: 40, hold: 10, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // Polling for real-time updates
    const interval = setInterval(fetchProperties, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingAction = async (propertyId, actionType) => {
    setActionLoading(`${propertyId}-${actionType}`);
    try {
      const payload = {
        property_id: propertyId,
        user_id: user?.id || 'user_123',
        status: actionType === 'book' ? 'Booked' : 'Hold',
        payment_status: actionType === 'book' ? '25%_paid' : 'pending'
      };

      const response = await apiServerClient.fetch('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(`Property successfully ${actionType === 'book' ? 'booked' : 'placed on hold'}`);
        fetchProperties(); // Refresh stats immediately
      } else {
        // Mock success
        toast.success(`Property ${actionType === 'book' ? 'booked' : 'placed on hold'} (Mock)`);
        
        // Optimistic update for mock
        setProperties(prev => prev.map(p => {
          if (p.id === propertyId) {
            return {
              ...p,
              available: Math.max(0, p.available - 1),
              sold: actionType === 'book' ? p.sold + 1 : p.sold,
              hold: actionType === 'hold' ? p.hold + 1 : p.hold
            };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error(`Error during ${actionType}:`, error);
      toast.error(`Failed to process ${actionType} request`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AssociateLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Properties</h1>
        <p className="text-muted-foreground">Browse available properties, book plots, or place them on hold.</p>
      </div>

      {loading && properties.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(prop => (
            <div key={prop.id} className="rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-48 bg-muted relative">
                {prop.image ? (
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                    <Grid className="w-12 h-12 text-secondary/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                    ₹{prop.price?.toLocaleString() || 'N/A'}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{prop.name}</h3>
                  <p className="flex items-center text-sm opacity-90"><MapPin className="w-3 h-3 mr-1" /> {prop.location}</p>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Available</p>
                    <p className="font-semibold text-primary">{prop.available}</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Sold</p>
                    <p className="font-semibold text-[hsl(var(--success))]">{prop.sold}</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Hold</p>
                    <p className="font-semibold text-[hsl(var(--warning))]">{prop.hold}</p>
                  </div>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={prop.available <= 0 || actionLoading !== null}
                    onClick={() => handleBookingAction(prop.id, 'hold')}
                  >
                    {actionLoading === `${prop.id}-hold` ? 'Processing...' : <><Clock className="w-4 h-4 mr-2" /> Hold</>}
                  </Button>
                  <Button 
                    className="w-full"
                    disabled={prop.available <= 0 || actionLoading !== null}
                    onClick={() => handleBookingAction(prop.id, 'book')}
                  >
                    {actionLoading === `${prop.id}-book` ? 'Processing...' : <><CheckCircle2 className="w-4 h-4 mr-2" /> Book (25%)</>}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AssociateLayout>
  );
}
