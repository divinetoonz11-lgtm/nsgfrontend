import React from 'react';

export default function StatusBadge({ status }) {
  const getStatusStyles = (s) => {
    switch (s?.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive':
      case 'rejected':
      case 'booked':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
      case 'hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
}