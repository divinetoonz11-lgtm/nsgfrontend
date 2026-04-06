import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, requireRole }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    if (user?.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
    if (user?.role === 'associate') return <Navigate to="/associate-dashboard" replace />;
    if (user?.role === 'customer') return <Navigate to="/customer-dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}