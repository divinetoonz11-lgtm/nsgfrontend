import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from '@/components/Logo.jsx';

export default function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await login(formData);

    if (result.success) {
      toast.success('Admin login successful');
      navigate('/admin-dashboard');
    } else {
      setError(result.message);
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet><title>Admin Login - Next Erra Group</title></Helmet>
      <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-background z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-card text-card-foreground rounded-2xl p-8 shadow-xl border border-destructive/20 relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-center mb-8 text-sm">
            Secure access for administrators only
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl text-base font-medium"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Return to User Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}