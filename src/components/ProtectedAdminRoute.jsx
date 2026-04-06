
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';
import { Loader2 } from 'lucide-react';

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    if (user?.role === 'associate') return <Navigate to="/associate-dashboard" replace />;
    if (user?.role === 'customer') return <Navigate to="/customer-dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
