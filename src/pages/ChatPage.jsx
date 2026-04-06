import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AssociateLayout from '@/components/AssociateLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
              return;
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      const localHistory = localStorage.getItem('chat_history');
      if (localHistory) {
        setMessages(JSON.parse(localHistory));
      } else {
        setMessages([{
          id: Date.now(),
          message: "Hello! I'm the Next Era AI Assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date().toISOString()
        }]);
      }
    };
    loadHistory();
  }, [user?.id]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_history', JSON.stringify(messages));
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), message: input, isUser: true, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await apiServerClient.fetch('/chat/message', {
        method: 'POST',
        body: JSON.stringify({ userId: user?.id || 'guest', message: userMsg.message })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        message: data.response || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
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

  return (
    <AssociateLayout>
      <Helmet><title>Support Chat - Next Era Group</title></Helmet>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Support Chat</h1>
        <p className="text-muted-foreground">Chat with our AI assistant or support team.</p>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm flex flex-col h-[600px] max-h-[70vh]">
        <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center gap-2 font-medium">
          <Bot className="w-6 h-6" /> Next Era Assistant
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl p-4 text-base ${msg.isUser ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-card border shadow-sm rounded-tl-sm'}`}>
                {msg.message}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border shadow-sm rounded-2xl rounded-tl-sm p-4 flex gap-2">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-card border-t rounded-b-2xl flex gap-3">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your message here..." 
            className="flex-1 h-12 rounded-full px-6"
          />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-full shrink-0" disabled={!input.trim() || isLoading}>
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </AssociateLayout>
  );
}