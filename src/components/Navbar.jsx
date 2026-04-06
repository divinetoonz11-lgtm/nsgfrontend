import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 mr-4 text-muted-foreground rounded-md md:hidden hover:bg-accent">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-muted-foreground rounded-full hover:bg-accent">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}