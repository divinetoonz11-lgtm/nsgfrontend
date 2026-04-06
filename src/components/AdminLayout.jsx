
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, DollarSign, CreditCard, Wallet, 
  Network, ShieldCheck, LifeBuoy, FileText, Settings, 
  LogOut, Menu, Bell, User as UserIcon, Building
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from '@/components/Logo.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'User Management', path: '/admin/users', icon: Users },
  { title: 'Property Management', path: '/admin/properties', icon: Building },
  { title: 'Income', path: '/admin/income', icon: DollarSign },
  { title: 'Finance', path: '/admin/finance', icon: CreditCard },
  { title: 'Wallet', path: '/admin/wallet', icon: Wallet },
  { title: 'Network', path: '/admin/network', icon: Network },
  { title: 'Admin Management', path: '/admin/admins', icon: ShieldCheck },
  { title: 'Support', path: '/admin/support', icon: LifeBuoy },
  { title: 'Reports', path: '/admin/reports', icon: FileText },
  { title: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <Logo className="w-[100px]" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              title={!isSidebarOpen ? item.title : undefined}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
              {isSidebarOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-destructive hover:bg-destructive/10 transition-colors ${!isSidebarOpen && 'justify-center'}`}
          title={!isSidebarOpen ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="hidden md:block bg-card border-r border-border/50 z-20 relative"
      >
        <SidebarContent />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 bg-card border border-border rounded-full p-1.5 shadow-sm hover:bg-muted transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[260px] bg-card border-r border-border/50 z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-card/50 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold hidden sm:block capitalize">
              {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium leading-none">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/admin/settings">Profile Settings</Link></DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronRight(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
