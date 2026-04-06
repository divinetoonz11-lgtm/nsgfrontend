import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className, size = 24 }) {
  return (
    <Loader2 
      className={cn("animate-spin text-primary", className)} 
      size={size} 
    />
  );
}