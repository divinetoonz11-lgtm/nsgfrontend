import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function MobileMenu({ isOpen, onClose }) {
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact us', path: '/contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-xl font-bold text-primary">Next Era Global</span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-all duration-200 font-medium"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-border">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;