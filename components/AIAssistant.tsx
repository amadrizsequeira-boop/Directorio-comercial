import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Globe } from 'lucide-react';
import { askGeminiLocalGuide } from '../services/geminiService';
import { AIResponse } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string, sources?: any[]}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response: AIResponse = await askGeminiLocalGuide(userMsg);

    setMessages(prev => [...prev, { 
      role: 'ai', 
      content: response.text, 
      sources: response.sources 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl w-[90vw] md:w-[400px] h-[500px] flex flex-col border border-slate-100 overflow-hidden transition-all animate-fade-in-up">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-300" />
              <h3 className="font-semibold">Guía IA Local</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 mt-10">
                <p className="mb-2">¡Hola! Soy tu asistente inteligente.</p>
                <p className="text-sm">Pregúntame sobre tendencias, consejos para tu negocio o busca información en la web.</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border shadow-sm rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                        <Globe size={10} /> Fuentes de Google:
                      </p>
                      <ul className="space-y-1">
                        {msg.sources.map((src, i) => (
                          <li key={i}>
                            <a href={src.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline truncate block max-w-[200px]">
                              {src.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t">
            <div className="flex gap-2">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Pregunta algo..."
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button 
                onClick={handleSearch}
                disabled={isLoading || !query.trim()}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-medium whitespace-nowrap">
          Asistente IA
        </span>
      </button>
    </div>
  );
};