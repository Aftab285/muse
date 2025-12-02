import React, { useState, useEffect, useRef } from 'react';
import { MOCK_MESSAGES, MOCK_INFLUENCERS } from '../constants';
import { Message, UserRole } from '../types';
import { Card, Button, Input } from '../components/UIComponents';
import { Send, Paperclip, MoreVertical, Sparkles } from 'lucide-react';
import { getChatReplySuggestion } from '../services/geminiService';

export const ChatPage: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [suggestion, setSuggestion] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate active chat partner
  const partner = MOCK_INFLUENCERS[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate suggestion when the last message is from the other person
    const lastMsg = messages[messages.length - 1];
    const myId = userRole === 'brand' ? 'b_1' : 'inf_1'; 
    
    if (lastMsg && lastMsg.senderId !== myId) {
        getChatReplySuggestion(lastMsg.content, userRole).then(setSuggestion);
    } else {
        setSuggestion('');
    }
  }, [messages, userRole]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: userRole === 'brand' ? 'b_1' : 'inf_1',
      receiverId: partner.id,
      content: newMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, msg]);
    setNewMessage('');
    setSuggestion('');
  };

  const useSuggestion = () => {
      setNewMessage(suggestion);
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] max-w-5xl mx-auto flex gap-6">
      {/* Sidebar List (Hidden on mobile for prototype simplicity) */}
      <div className="w-80 hidden md:flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden h-full">
         <div className="p-4 border-b border-slate-100">
            <h2 className="font-bold text-lg text-slate-900">Messages</h2>
         </div>
         <div className="flex-1 overflow-y-auto">
            <div className="p-3 bg-indigo-50 border-l-4 border-indigo-500 cursor-pointer">
                <div className="flex gap-3">
                    <img src={partner.avatar} className="w-10 h-10 rounded-full object-cover" alt="Avatar"/>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{partner.name}</p>
                        <p className="text-xs text-slate-500 truncate w-40">{messages[messages.length-1].content}</p>
                    </div>
                </div>
            </div>
            {/* Mock other chats */}
            {[2, 3].map(i => (
                <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                     <div className="flex gap-3 opacity-60">
                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Inactive User</p>
                            <p className="text-xs text-slate-500">Click to load chat...</p>
                        </div>
                    </div>
                </div>
            ))}
         </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
            <div className="flex items-center gap-3">
                <img src={partner.avatar} className="w-10 h-10 rounded-full object-cover" alt="Avatar"/>
                <div>
                    <h3 className="font-bold text-slate-900">{partner.name}</h3>
                    <p className="text-xs text-emerald-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span> Online
                    </p>
                </div>
            </div>
            <Button variant="ghost" size="sm" icon={MoreVertical} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
                const isMe = (userRole === 'brand' && msg.senderId === 'b_1') || (userRole === 'influencer' && msg.senderId === 'inf_1');
                return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                            {msg.content}
                            <p className={`text-[10px] mt-1 ${isMe ? 'text-slate-400' : 'text-slate-400'} text-right`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        {/* Suggestion AI */}
        {suggestion && (
             <div className="px-4 py-2 bg-indigo-50 border-t border-indigo-100 flex items-center justify-between animate-in slide-in-from-bottom-2">
                <div className="flex items-center text-xs text-indigo-700">
                    <Sparkles className="w-3 h-3 mr-2" />
                    <span className="font-medium mr-2">Suggestion:</span> 
                    <span className="italic truncate max-w-md">"{suggestion}"</span>
                </div>
                <button onClick={useSuggestion} className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline">
                    Use this
                </button>
             </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
                <Button variant="ghost" size="md" className="px-2 text-slate-400">
                    <Paperclip className="w-5 h-5" />
                </Button>
                <input 
                    className="flex-1 bg-slate-50 border-none rounded-lg px-4 focus:ring-2 focus:ring-slate-200 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button 
                    variant={newMessage ? 'primary' : 'ghost'} 
                    onClick={handleSend}
                    disabled={!newMessage}
                    className={!newMessage ? 'bg-slate-100 text-slate-400' : ''}
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
      </Card>
    </div>
  );
};