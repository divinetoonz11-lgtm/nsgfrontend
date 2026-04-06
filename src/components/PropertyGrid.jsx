import React from 'react';
import StatusBadge from './StatusBadge';

export default function PropertyGrid({ plots, onAction }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {plots.map((plot, i) => (
        <div 
          key={i} 
          className="border rounded-lg p-4 flex flex-col items-center justify-center text-center bg-card hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onAction && onAction(plot)}
        >
          <span className="text-lg font-bold mb-2">{plot.id}</span>
          <StatusBadge status={plot.status} />
          {plot.owner && <span className="text-xs text-muted-foreground mt-2">{plot.owner}</span>}
        </div>
      ))}
    </div>
  );
}