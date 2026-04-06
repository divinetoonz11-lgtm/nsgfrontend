import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/lib/utils';

export default function NotificationModal({ notification, isOpen, onClose, onMarkRead }) {
  if (!notification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] z-modal">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant={notification.type === 'Alert' ? 'destructive' : 'default'}>
              {notification.type}
            </Badge>
            <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
          </div>
          <DialogTitle className="text-xl">{notification.title}</DialogTitle>
          <DialogDescription className="pt-4 text-base text-foreground">
            {notification.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          {!notification.isRead && (
            <Button onClick={() => onMarkRead(notification.id)} variant="outline">
              Mark as Read
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}