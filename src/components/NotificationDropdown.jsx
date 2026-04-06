import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Check, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function NotificationDropdown({ notifications, onMarkRead, onDelete, onOpenModal, children }) {
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const displayNotifications = notifications.slice(0, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 z-dropdown">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-[300px] overflow-y-auto">
          {displayNotifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            displayNotifications.map((notif) => (
              <DropdownMenuItem 
                key={notif.id} 
                className={`flex flex-col items-start p-3 cursor-pointer ${notif.isRead ? 'opacity-70' : 'bg-muted/50'}`}
                onClick={() => onOpenModal(notif)}
              >
                <div className="flex justify-between w-full mb-1">
                  <span className="font-medium text-sm truncate pr-2">{notif.title}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(notif.date)}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 w-full">{notif.message}</p>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center text-primary font-medium">
          <Link to="/notifications">View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}