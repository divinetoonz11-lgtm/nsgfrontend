import React from 'react';

export default function DashboardCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
      </div>
      <div className="flex items-baseline space-x-2">
        <p className="text-3xl font-bold">{value}</p>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
  );
}