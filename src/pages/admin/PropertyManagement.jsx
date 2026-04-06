
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Building, MapPin, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiServerClient from '@/lib/apiServerClient';

export default function PropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Residential',
    totalPlots: '',
    price: '',
    available: '',
    sold: '0',
    hold: '0'
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await apiServerClient.fetch('/properties');
      if (response.ok) {
        const data = await response.json();
        // Assuming data is an array or has a properties field
        setProperties(Array.isArray(data) ? data : data.properties || []);
      } else {
        // Fallback to mock data if endpoint doesn't exist yet
        setProperties([
          { id: 1, name: 'Green Valley Estate', location: 'North District', type: 'Residential', totalPlots: 120, available: 45, sold: 60, hold: 15, price: 50000 },
          { id: 2, name: 'Sunrise Meadows', location: 'East District', type: 'Commercial', totalPlots: 80, available: 12, sold: 60, hold: 8, price: 120000 },
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

  const handleOpenModal = (property = null) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        name: property.name,
        location: property.location,
        type: property.type || 'Residential',
        totalPlots: property.totalPlots.toString(),
        price: property.price?.toString() || '',
        available: property.available.toString(),
        sold: property.sold.toString(),
        hold: property.hold.toString()
      });
    } else {
      setEditingProperty(null);
      setFormData({
        name: '',
        location: '',
        type: 'Residential',
        totalPlots: '',
        price: '',
        available: '',
        sold: '0',
        hold: '0'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        totalPlots: parseInt(formData.totalPlots),
        price: parseFloat(formData.price),
        available: parseInt(formData.available || formData.totalPlots),
        sold: parseInt(formData.sold),
        hold: parseInt(formData.hold)
      };

      const url = editingProperty ? `/properties/${editingProperty.id}` : '/properties';
      const method = editingProperty ? 'PUT' : 'POST';

      const response = await apiServerClient.fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(`Property ${editingProperty ? 'updated' : 'created'} successfully`);
        setIsModalOpen(false);
        fetchProperties();
      } else {
        // Mock success if endpoint fails
        toast.success(`Property ${editingProperty ? 'updated' : 'created'} (Mock)`);
        setIsModalOpen(false);
        fetchProperties();
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const response = await apiServerClient.fetch(`/properties/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Property deleted successfully');
        fetchProperties();
      } else {
        toast.success('Property deleted (Mock)');
        setProperties(properties.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const stats = {
    total: properties.length,
    available: properties.reduce((sum, p) => sum + (p.available || 0), 0),
    sold: properties.reduce((sum, p) => sum + (p.sold || 0), 0),
    hold: properties.reduce((sum, p) => sum + (p.hold || 0), 0),
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Property Management</h1>
          <p className="text-muted-foreground">Manage your real estate portfolio and inventory.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" /> Add New Property
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Total Properties</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Total Available</p>
          <p className="text-3xl font-bold text-primary">{stats.available}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Total Sold</p>
          <p className="text-3xl font-bold text-[hsl(var(--success))]">{stats.sold}</p>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Total on Hold</p>
          <p className="text-3xl font-bold text-[hsl(var(--warning))]">{stats.hold}</p>
        </div>
      </div>

      {/* Property List */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Total Plots</TableHead>
              <TableHead className="text-right">Available</TableHead>
              <TableHead className="text-right">Sold</TableHead>
              <TableHead className="text-right">Hold</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Loading properties...
                </TableCell>
              </TableRow>
            ) : properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No properties found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" /> {property.location}
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{property.type}</Badge></TableCell>
                  <TableCell className="text-right">{property.totalPlots}</TableCell>
                  <TableCell className="text-right font-medium text-primary">{property.available}</TableCell>
                  <TableCell className="text-right text-[hsl(var(--success))]">{property.sold}</TableCell>
                  <TableCell className="text-right text-[hsl(var(--warning))]">{property.hold}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(property)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(property.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={formData.location} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Base Price</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPlots">Total Plots/Units</Label>
                <Input 
                  id="totalPlots" 
                  type="number" 
                  value={formData.totalPlots} 
                  onChange={(e) => setFormData({...formData, totalPlots: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="available">Available</Label>
                <Input 
                  id="available" 
                  type="number" 
                  value={formData.available} 
                  onChange={(e) => setFormData({...formData, available: e.target.value})} 
                />
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <Label className="mb-2 block">Media & Maps</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <ImageIcon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload Images</span>
                </div>
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Embed Map</span>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit">{editingProperty ? 'Save Changes' : 'Create Property'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
