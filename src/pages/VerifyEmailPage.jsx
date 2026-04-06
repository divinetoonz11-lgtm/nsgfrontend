
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from '@/components/Logo.jsx';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');
  
  const [status, setStatus] = useState(tokenFromUrl ? 'verifying' : 'idle');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenFromUrl) {
      handleVerify(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleVerify = async (tokenToVerify) => {
    setStatus('verifying');
    const result = await verifyEmail(tokenToVerify);
    
    if (result.success) {
      setStatus('success');
      setMessage('Email verified successfully!');
      toast.success('Email verified successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setStatus('error');
      setMessage(result.message || 'Verification link is invalid or expired');
      toast.error(result.message || 'Verification failed');
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email to resend the verification link');
      return;
    }
    setIsResending(true);
    const result = await resendVerificationEmail(email);
    if (result.success) {
      toast.success('Verification email sent. Check your inbox.');
      setEmail('');
    } else {
      toast.error(result.message);
    }
    setIsResending(false);
  };

  return (
    <>
      <Helmet><title>Verify Email - Next Erra Group</title></Helmet>
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
          
          {status === 'verifying' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Verifying your email...</h2>
              <p className="text-muted-foreground">Please wait while we confirm your token.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{message}</h2>
              <p className="text-muted-foreground mb-8">Redirecting to login...</p>
              <Button onClick={() => navigate('/login')} className="w-full h-12 rounded-xl">
                Go to Login Now
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-6">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-destructive">Verification Failed</h2>
              <p className="text-muted-foreground mb-8">{message}</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/signup')} className="flex-1 h-11 rounded-xl">
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/login')} className="flex-1 h-11 rounded-xl">
                  Login
                </Button>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <>
              <h1 className="text-2xl font-bold text-center mb-2">Verify Your Email</h1>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                No verification token provided in the URL.
              </p>
            </>
          )}

          {(status === 'idle' || status === 'error') && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-medium mb-4 text-center">Need a new verification link?</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10 h-11 bg-background text-foreground placeholder:text-muted-foreground focus:bg-background transition-all duration-200 rounded-xl"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={handleResend}
                  disabled={isResending} 
                  className="w-full h-11 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </Button>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <div className="mt-8 text-center">
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
