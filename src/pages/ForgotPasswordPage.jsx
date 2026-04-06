
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from '@/components/Logo.jsx';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await forgotPassword(email);
    if (result.success) {
      setIsSuccess(true);
      toast.success('Reset link sent to your email. Check your inbox.');
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } else {
      toast.error(result.message || 'Failed to send reset link');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet><title>Forgot Password - Next Erra Group</title></Helmet>
      <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-card text-card-foreground rounded-2xl p-8 shadow-xl border border-border/50 relative z-10"
        >
          <div className="flex justify-center mb-8">
            <Link to="/"><Logo size="md" /></Link>
          </div>

          {!isSuccess ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
              <p className="text-muted-foreground text-center mb-8 text-sm">Enter your email to receive a reset link</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground focus:bg-background transition-all duration-200 rounded-xl"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base font-medium mt-4 transition-all duration-200 active:scale-[0.98]">
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
              <p className="text-muted-foreground mb-6">Click the link in the email to reset your password.</p>
              <Button onClick={() => navigate('/login')} variant="outline" className="w-full h-11 rounded-xl">
                Back to Login
              </Button>
            </div>
          )}

          {!isSuccess && (
            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
