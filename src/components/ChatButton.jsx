import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatWindow from './ChatWindow.jsx';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-toast bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 hover:scale-105 transition-all duration-200"
          aria-label="Open chat support"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}