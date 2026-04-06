
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, UserCircle, Briefcase, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from '@/components/Logo.jsx';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginType, setLoginType] = useState('associate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resendVerificationEmail } = useAuth();

  const from = location.state?.from?.pathname;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setShowResend(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setShowResend(false);

    try {
      const result = await login(formData);
      
      if (result.success) {
        const userRole = result.user?.role;

        if (userRole === 'admin') {
          setError('Admin login not allowed here. Please use the admin login page.');
          toast.error('Admin login not allowed here');
          setIsSubmitting(false);
          return;
        }

        toast.success('Welcome back');
        if (userRole === 'associate') {
          navigate(from || '/associate-dashboard');
        } else if (userRole === 'customer') {
          navigate(from || '/customer-dashboard');
        } else {
          navigate('/');
        }
      } else {
        if (result.isUnverified) {
          setError('Please verify your email before logging in.');
          setShowResend(true);
        } else {
          setError(result.message || 'Invalid email or password');
        }
        toast.error(result.message || 'Login failed');
        setIsSubmitting(false);
      }
    } catch (error) {
      setError('An error occurred during login');
      toast.error('An error occurred during login');
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) return;
    setIsResending(true);
    const result = await resendVerificationEmail(formData.email);
    if (result.success) {
      toast.success('Verification email sent. Check your inbox.');
      setShowResend(false);
      setError('Verification email sent. Please check your inbox.');
    } else {
      toast.error(result.message || 'Failed to resend verification email');
    }
    setIsResending(false);
  };

  return (
    <>
      <Helmet><title>Login - Next Erra Group</title></Helmet>
      <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-card text-card-foreground rounded-2xl p-8 shadow-xl border border-border/50 relative z-10"
        >
          <div className="flex justify-center mb-8">
            <Link to="/" className="transition-transform hover:scale-105 duration-200">
              <Logo size="md" />
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-6 text-sm">Sign in to your account</p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex flex-col gap-2">
                <span>{error}</span>
                {showResend && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="w-fit mt-1 bg-background text-foreground hover:bg-muted"
                  >
                    {isResending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Resend Verification Email
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex p-1 bg-muted rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setLoginType('associate')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                loginType === 'associate' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Associate
            </button>
            <button
              type="button"
              onClick={() => setLoginType('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                loginType === 'customer' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              Customer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground focus:bg-background transition-all duration-200 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-primary hover:underline font-medium transition-all duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground focus:bg-background transition-all duration-200 rounded-xl"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full h-12 rounded-xl text-base font-medium mt-4 transition-all duration-200 active:scale-[0.98]"
            >
              {isSubmitting ? 'Authenticating...' : `Sign In as ${loginType === 'associate' ? 'Associate' : 'Customer'}`}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline transition-all duration-200">Sign up</Link>
          </div>

          <div className="mt-4 text-center">
            <Link 
              to="/admin/login" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Admin Login
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
