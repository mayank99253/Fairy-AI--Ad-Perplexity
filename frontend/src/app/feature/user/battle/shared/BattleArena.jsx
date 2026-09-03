import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Swords, Send, Loader2 } from 'lucide-react';
import BattleContainer from './BattleContainer'; 
import MessageInput from '../../chat/components/MessageInput';

const BattleArena = () => {
  const path = useLocation()

  return (
    <div className="flex flex-col h-full w-full bg-[#090C10] text-slate-100 overflow-hidden">
      
      {/* HEADER SECTION */}
      <header className="flex-none px-6 py-4 border-b border-slate-800/80 bg-[#090C10]/80 backdrop-blur-md z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 border border-amber-500/30 text-amber-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
              Battle Arena
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Gemini vs Mistral — judged by Cohere
            </p>
          </div>
        </div>
      </header>

      {/* MESSAGES LIST SECTION */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <BattleContainer />
      </main>

      {/* INPUT FORM SECTION */}
      <MessageInput pathname={path.pathname}/>

    </div>
  );
};

export default BattleArena;