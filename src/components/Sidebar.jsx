import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  Wallet, 
  Building, 
  FileText, 
  LifeBuoy, 
  Settings, 
  LogOut,
  Share2,
  History
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Network Management', path: '/admin/network', icon: Network },
    { name: 'Finance', path: '/admin/finance', icon: Wallet },
    { name: 'Property Management', path: '/admin/properties', icon: Building },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
  ];

  const associateLinks = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Referral System', path: '/referral', icon: Share2 },
    { name: 'Network/Binary Tree', path: '/network', icon: Network },
    { name: 'Finance', path: '/finance', icon: Wallet },
    { name: 'Property', path: '/property', icon: Building },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const customerLinks = [
    { name: 'Dashboard Overview', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'Property', path: '/customer/property', icon: Building },
    { name: 'Transactions', path: '/customer/transactions', icon: History },
    { name: 'Support', path: '/customer/support', icon: LifeBuoy },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'associate' ? associateLinks : customerLinks;

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}>
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-xl font-bold text-primary">NSG Dashboard</span>
      </div>
      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {link.name}
            </Link>
          );
        })}
        <div className="pt-4 mt-4 border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-destructive rounded-md hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}