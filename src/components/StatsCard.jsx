import React from 'react';
import { cn } from '@/lib/utils';

export default function StatsCard({ title, value, icon: Icon, trend, trendLabel, className }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-4">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        {trend && (
          <span className={cn("text-sm font-medium", trend > 0 ? "text-[hsl(var(--success))]" : "text-[hsl(var(--destructive))]")}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      {trendLabel && <p className="mt-1 text-xs text-muted-foreground">{trendLabel}</p>}
    </div>
  );
}