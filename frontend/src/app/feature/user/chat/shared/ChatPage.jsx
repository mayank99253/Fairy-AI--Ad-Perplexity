import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import MessageInput from '../components/MessageInput';
import ChatContainer from '../components/ChatContainer';
import { useChat } from '../hook/useChat';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BattleContainer from '../../battle/shared/BattleContainer';

const ChatPage = () => {
  const { chatId } = useParams();
  const { handleGetChatMessage } = useChat();
  const {currentChat} = useSelector((s)=> s.chat)

  useEffect(() => {
    if (chatId) handleGetChatMessage(chatId);
  }, [handleGetChatMessage, chatId]);

  const [selectedModel, setSelectedModel] = useState('Gemini-3.5-Flash-Lite');

  return (
    // Fixed viewport container (h-screen, overflow-hidden)
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#090C10] text-slate-100">

      {/* 1. Header (shrink-0 prevents shrinking) */}
      <header className="z-10 flex h-12 shrink-0 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Model Selector Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-pink-500 to-cyan-400" />
              <span>{selectedModel}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Messages Viewport (Scrollable middle area) */}
      <div className="flex h-full flex-col">
        {currentChat?.mode === 'battle' ? <BattleContainer /> : <ChatContainer />}
      </div>

      {/* 3. Bottom Input Bar (shrink-0 stays fixed at bottom) */}
      <div className="w-full shrink-0 border-t border-slate-800/30 bg-[#090C10] px-3 pb-3 pt-2 sm:px-6">
        <MessageInput />
      </div>

    </div>
  );
};

export default ChatPage;