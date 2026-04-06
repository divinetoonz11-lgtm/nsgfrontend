
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, ExternalLink } from 'lucide-react';
import MobileMenu from './MobileMenu.jsx';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from './Logo.jsx';
import NotificationBell from './NotificationBell.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const auth = useAuth() || {};
  const { user = null, logout = () => {}, isAuthenticated = false, isAdmin = false } = auth;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (typeof logout === 'function') {
      logout();
    }
    navigate('/login');
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { 
      label: 'Property Listing Platform', 
      path: 'https://www.divineacres.in',
      external: true 
    },
    { label: 'Contact us', path: '/contact' }
  ];

  if (isAdmin) {
    menuItems.push({ label: 'Admin Dashboard', path: '/admin/dashboard' });
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B1F3A]/95 backdrop-blur-md shadow-md border-b border-white/10 py-2'
            : 'bg-[#0B1F3A] py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Logo className="text-white" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                item.external ? (
                  <a
                    key={item.label}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-secondary transition-colors duration-200"
                  >
                    {item.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 relative ${
                      location.pathname === item.path
                        ? 'text-secondary'
                        : 'text-white/90 hover:text-secondary'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                    )}
                  </Link>
                )
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <NotificationBell />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hidden lg:flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-colors outline-none">
                      <User className="w-4 h-4" />
                      <span>{user?.name || 'Account'}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to={isAdmin ? "/admin/dashboard" : (user?.role === 'customer' ? "/customer/dashboard" : "/dashboard")} className="cursor-pointer w-full">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-white hover:text-secondary transition-colors px-4 py-2 bg-transparent border border-transparent hover:border-white/20 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98] shadow-sm"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Header;
