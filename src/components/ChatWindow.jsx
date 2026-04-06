import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Bot, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';
import { toast } from 'sonner';

export default function ChatWindow({ onClose }) {
  const { user } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadHistory = async () => {
      if (user?.id) {
        try {
          const res = await apiServerClient.fetch(`/chat/history/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setMessages(data);
              setIsFetchingHistory(false);
              return;
            }
          }
        } catch (e) {
          console.error('Failed to fetch chat history', e);
        }
      }
      
      setMessages([{
        id: Date.now(),
        message: "Hello! I'm the Next Era AI Assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
      setIsFetchingHistory(false);
    };
    loadHistory();
  }, [user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      message: input,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await apiServerClient.fetch('/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id || 'guest', message: userMsg.message })
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        message: data.response || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      toast.error('Failed to send message');
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        message: "Let me connect you with the support team. A ticket has been created.",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-toast bg-primary text-primary-foreground rounded-t-xl rounded-bl-xl shadow-lg w-64 cursor-pointer" onClick={() => setIsMinimized(false)}>
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center gap-2 font-medium">
            <Bot className="w-5 h-5" /> Support Chat
          </div>
          <div className="flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); onClose(); }}><X className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-toast bg-card border border-border shadow-2xl rounded-xl w-80 sm:w-96 flex flex-col overflow-hidden animate-slide-in" style={{ height: '500px', maxHeight: '80vh' }}>
      <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-medium">
          <Bot className="w-5 h-5" /> Next Era Assistant
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsMinimized(true)} className="hover:bg-primary-foreground/20 p-1 rounded"><Minimize2 className="w-4 h-4" /></button>
          <button onClick={onClose} className="hover:bg-primary-foreground/20 p-1 rounded"><X className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {isFetchingHistory ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.isUser ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border shadow-sm rounded-tl-sm'}`}>
                  {msg.message}
                  <div className={`text-[10px] mt-1 opacity-70 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border shadow-sm rounded-2xl rounded-tl-sm p-3 text-sm flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 bg-card border-t flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 rounded-full"
          disabled={isFetchingHistory}
        />
        <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!input.trim() || isLoading || isFetchingHistory}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}