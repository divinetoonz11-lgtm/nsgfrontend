import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth.js';
import Logo from '@/components/Logo.jsx';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // fixed
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('No reset token provided');
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      toast.error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    const result = await resetPassword(token, formData.newPassword);

    if (!result.success) {
      setStatus('error');
      setErrorMessage(result.message || 'Reset link is invalid or expired');
      toast.error(result.message || 'Reset failed');
    } else {
      setStatus('success');
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 3000);
    }

    setIsSubmitting(false);
  };

  if (!token) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl p-8 shadow-xl border border-border/50 text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-destructive">Invalid Request</h2>
          <p className="text-muted-foreground mb-8">No reset token provided in the URL.</p>
          <Button onClick={() => navigate('/forgot-password')} className="w-full h-11 rounded-xl">
            Go to Forgot Password
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Set New Password - Next Erra Group</title></Helmet>
      <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-card text-card-foreground rounded-2xl p-8 shadow-xl border border-border/50"
        >
          <div className="flex justify-center mb-8">
            <Link to="/"><Logo size="md" /></Link>
          </div>

          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Password Reset Successfully!</h2>
              <p className="text-muted-foreground mb-8">Redirecting to login...</p>
              <Button onClick={() => navigate('/login')} className="w-full h-11 rounded-xl">Go to Login Now</Button>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-6">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2 text-destructive">Reset Failed</h2>
              <p className="text-muted-foreground mb-8">{errorMessage}</p>
              <Button onClick={() => navigate('/forgot-password')} className="w-full h-11 rounded-xl">
                Request New Reset Link
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center mb-2">Set New Password</h1>
              <p className="text-muted-foreground text-center mb-8 text-sm">Create a strong password for your account</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base font-medium mt-4">
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}