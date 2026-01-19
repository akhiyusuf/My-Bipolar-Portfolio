import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from './PortfolioContext';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  // User messages use 'text'
  text?: string;
  // Model messages use 'content' with both personas
  content?: {
    honest: string;
    professional: string;
  };
}

const AIAssistant: React.FC = () => {
  const { mode } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // NOTE: Removed the useEffect that cleared messages on mode change 
  // to preserve history across persona switches.

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    
    // Optimistically add user message
    const newHistory: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `You are a dual-personality AI assistant for a developer portfolio.
      You must ALWAYS respond with a JSON object containing two keys: "honest" and "professional".
      
      1. "honest": You are the digital alter-ego of a cynical, burnt-out senior developer. You are sarcastic, slightly condescending, and brutally honest. You think this portfolio is a bit pretentious. You hate buzzwords. Keep answers short and punchy.
      2. "professional": You are a professional AI assistant representing a highly skilled Senior Full Stack Engineer. You are polite, enthusiastic, and technical. You focus on value delivery, scalable architecture, and clean code.

      The user can switch between these personas at any time, so your response must generate BOTH versions simultaneously to maintain the conversation context in both "realities".
      
      Return ONLY valid JSON.
      Example: { "honest": "I hate this.", "professional": "This is great." }`;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: 'application/json',
        },
        history: newHistory.map(m => ({
          role: m.role,
          parts: [{ 
            // If it's a user, send text. If it's model, send the previous JSON blob 
            // so it knows what it said in both voices.
            text: m.role === 'user' 
              ? m.text 
              : JSON.stringify(m.content) 
          }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;
      
      let parsedContent = { honest: "Error parsing response.", professional: "I apologize, I encountered an error." };
      
      if (responseText) {
        try {
          parsedContent = JSON.parse(responseText);
        } catch (e) {
          console.error("Failed to parse JSON", e);
          parsedContent = { 
            honest: responseText, 
            professional: responseText 
          };
        }
      }

      setMessages(prev => [...prev, { role: 'model', content: parsedContent }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: { 
          honest: "My brain broke. Too much hypocrisy.", 
          professional: "I am currently experiencing high traffic. Please try again." 
        } 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get text based on current mode
  const getMessageText = (msg: Message) => {
    if (msg.role === 'user') return msg.text;
    // Default to honest if mode is null for some reason, though App wrapper prevents this
    const currentMode = mode || 'honest';
    return msg.content ? msg.content[currentMode] : '...';
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-accent text-bg rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] z-50 flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        title="Open AI Assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:animate-pulse">
            <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            <path d="M12 16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" />
            <path d="M2 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
            <path d="M16 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-96 h-[500px] bg-card border border-accent flex flex-col shadow-2xl z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-4 border-b border-border bg-headerBg backdrop-blur flex justify-between items-center transition-colors duration-300">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              {mode === 'honest' ? 'SYSTEM_OVERRIDE // V2' : 'VIRTUAL ASSISTANT'}
            </span>
            <div className={`w-2 h-2 rounded-full bg-accent ${isLoading ? 'animate-ping' : 'animate-pulse'}`} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-paper/40 text-center mt-10 italic transition-all duration-300">
                {mode === 'honest' 
                  ? "Go ahead. Ask me something stupid." 
                  : "Hello! How can I assist you with this portfolio today?"}
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 border transition-all duration-300 ${
                    msg.role === 'user'
                      ? 'bg-accent text-bg border-accent'
                      : 'bg-paper/5 text-paper border-border'
                  }`}
                >
                  {getMessageText(msg)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-paper/5 text-paper border border-border p-3">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'honest' ? "Type something..." : "Send a message..."}
                className="flex-1 bg-bg border border-border p-2 text-sm focus:outline-none focus:border-accent text-paper placeholder:text-paper/30 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 bg-paper text-bg font-bold uppercase text-xs hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;