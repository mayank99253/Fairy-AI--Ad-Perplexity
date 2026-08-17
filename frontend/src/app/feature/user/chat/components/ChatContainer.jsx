import React, { useEffect, useRef } from 'react';
import { Bot, Copy, RotateCcw, Sparkles, ThumbsUp, User } from 'lucide-react';
import { useSelector } from 'react-redux';

const ChatContainer = () => {
  const { messages } = useSelector((s) => s.chat);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="custom-scrollbar h-full w-full flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col space-y-6">
        {messages.length === 0 ? (
          <div className="my-auto flex h-full min-h-[50vh] flex-col items-center justify-center space-y-4 py-20 text-center text-slate-500">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090C10]">
                <Sparkles className="h-8 w-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">How can I help you today?</h3>
              <p className="mt-1 text-xs text-slate-400">Type a message, or try Battle Mode.</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {msg.role === 'ai' && (
                <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#0D1117]">
                    <Bot className="h-4 w-4 text-cyan-300" />
                  </div>
                </div>
              )}

              {/* Message Content Container */}
              <div className={`flex max-w-[85%] flex-col sm:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Sender Name & Model info */}
                <div className="mb-1 flex items-center gap-2 px-1 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {msg.role === 'user' ? 'You' : msg.model || 'Fairy AI'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'rounded-tr-none bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-indigo-600/90 text-white shadow-lg shadow-purple-900/20'
                      : 'rounded-tl-none border border-slate-800 bg-slate-900/90 text-slate-200 shadow-md'
                  }`}
                >
                  {/* Image Rendering */}
                  {msg.imageUrl && (
                    <div className="mb-3 overflow-hidden rounded-lg border border-slate-800/80">
                      <img 
                        src={msg.imageUrl} 
                        alt="Generated content" 
                        className="h-auto max-w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Text Content Rendering */}
                  {msg.content && (
                    <p className="whitespace-pre-line">{msg.content}</p>
                  )}
                </div>

                {/* AI Response Footer Actions */}
                {msg.role === 'ai' && (
                  <div className="mt-2 flex items-center gap-1 px-1 text-slate-500">
                    <button className="rounded p-1 transition-colors hover:text-slate-300">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded p-1 transition-colors hover:text-slate-300">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded p-1 transition-colors hover:text-slate-300">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800">
                  <User className="h-4 w-4 text-slate-300" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;