import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet><title>Page Not Found - Next Era Group</title></Helmet>
      <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-lg">
          <h1 className="text-9xl font-extrabold text-primary/20 tracking-tighter mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline" className="h-12 px-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
            </Button>
            <Button onClick={() => navigate('/')} className="h-12 px-6">
              <Home className="w-4 h-4 mr-2" /> Go Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}