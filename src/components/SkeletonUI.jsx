import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px] rounded-lg" />
        <Skeleton className="h-10 w-[100px] rounded-lg" />
      </div>
      <div className="rounded-xl border overflow-hidden">
        <div className="flex gap-4 p-4 border-b bg-muted/30">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`h-${i}`} className="h-6 flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={`r-${i}`} className="flex gap-4 p-4 border-b">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={`c-${i}-${j}`} className="h-5 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-[120px]" />
      <Skeleton className="h-4 w-[80px]" />
    </div>
  );
}