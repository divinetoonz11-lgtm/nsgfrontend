
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Network, DollarSign, Building, 
  FileText, LifeBuoy, Settings, LogOut, Menu, Bell, User as UserIcon,
  ChevronDown
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
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Referral', path: '/referral', icon: Users },
  { title: 'Network', path: '/network', icon: Network },
  { 
    title: 'Finance', 
    path: '/finance', 
    icon: DollarSign,
    subItems: [
      { title: 'Wallet', path: '/finance?tab=wallet' },
      { title: 'Deposit', path: '/finance?tab=deposit' },
      { title: 'Withdrawal', path: '/finance?tab=withdrawal' },
      { title: 'Transactions', path: '/finance?tab=transactions' },
    ]
  },
  { title: 'Property Management', path: '/property', icon: Building },
  { 
    title: 'Reports', 
    path: '/reports', 
    icon: FileText,
    subItems: [
      { title: 'Income Report', path: '/reports?tab=income' },
      { title: 'Team Report', path: '/reports?tab=team' },
    ]
  },
  { 
    title: 'Support', 
    path: '/support', 
    icon: LifeBuoy,
    subItems: [
      { title: 'Create Ticket', path: '/support?tab=create' },
      { title: 'View Tickets', path: '/support?tab=view' },
    ]
  },
  { title: 'Settings', path: '/settings', icon: Settings },
];

export default function AssociateLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = (title) => {
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Logo className="w-[100px]" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const isExpanded = expandedMenus[item.title];
          
          return (
            <div key={item.path}>
              <Link
                to={item.subItems ? '#' : item.path}
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                    toggleMenu(item.title);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  isActive && !item.subItems ? "bg-primary text-primary-foreground font-medium shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && !item.subItems ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  <span>{item.title}</span>
                </div>
                {item.subItems && (
                  <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                )}
              </Link>
              
              {item.subItems && isExpanded && (
                <div className="ml-9 mt-1 space-y-1">
                  {item.subItems.map(sub => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        location.search === sub.path.split('?')[1] ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border/50 z-20">
        <SidebarContent />
      </aside>

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
              className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border/50 z-50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 glass-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold hidden sm:block capitalize">
              {location.pathname.split('/')[1] || 'Dashboard'}
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
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium leading-none">{user?.name || 'Associate'}</p>
                    <p className="text-xs text-muted-foreground mt-1">ID: {user?.referralId || 'REF123'}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/settings">Profile Settings</Link></DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
