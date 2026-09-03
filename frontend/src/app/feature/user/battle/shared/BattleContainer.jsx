import React, { useEffect, useRef } from 'react';
import { Bot, Copy, Sparkles, Swords, Trophy, User } from 'lucide-react';
import { useSelector } from 'react-redux';

const ModelBadge = ({ name, score, isWinner }) => (
  <div
    className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-semibold ${
      isWinner
        ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 ring-1 ring-amber-500/40'
        : 'bg-slate-800/60 text-slate-300'
    }`}
  >
    <span className="flex items-center gap-1.5">
      {isWinner && <Trophy className="h-3.5 w-3.5" />}
      {name}
    </span>
    <span className="tabular-nums">{score}/10</span>
  </div>
);

const BattleContainer = () => {
  const { battleMessages } = useSelector((s) => s.battle); 
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [battleMessages]);

  return (
    /* Changed h-full to h-0 min-h-full to constrain overflow boundaries properly */
    <div className="custom-scrollbar h-0 min-h-full w-full flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col space-y-8">
        {battleMessages.length === 0 ? (
          <div className="my-auto flex h-full min-h-[50vh] flex-col items-center justify-center space-y-4 py-20 text-center text-slate-500">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090C10]">
                <Swords className="h-8 w-8 bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">Battle Arena</h3>
              <p className="mt-1 text-xs text-slate-400">Ask something — Gemini and Mistral will compete, Cohere judges.</p>
            </div>
          </div>
        ) : (
          battleMessages.map((msg) => (
            <div key={msg._id} className="flex flex-col space-y-4 min-w-0">
              {/* User Query */}
              <div className="flex justify-end gap-3 min-w-0">
                <div className="flex max-w-[85%] flex-col items-end sm:max-w-[75%] min-w-0">
                  <div className="mb-1 flex items-center gap-2 px-1 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">You</span>
                  </div>
                  <div className="rounded-2xl rounded-tr-none bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-indigo-600/90 px-4 py-3 text-sm leading-relaxed break-words overflow-hidden text-white shadow-lg shadow-purple-900/20">
                    <p className="whitespace-pre-line break-all">{msg.content}</p>
                  </div>
                </div>
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800">
                  <User className="h-4 w-4 text-slate-300" />
                </div>
              </div>

              {/* Gemini vs Mistral side by side */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-w-0">
                {/* Gemini */}
                <div
                  className={`flex flex-col min-w-0 rounded-2xl border bg-slate-900/90 p-4 shadow-md ${
                    msg.judgeResult?.winner === 'gemini'
                      ? 'border-amber-500/50'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-cyan-300">
                    <Bot className="h-3.5 w-3.5" />
                    Gemini
                  </div>
                  <p className="whitespace-pre-line break-words text-sm leading-relaxed text-slate-200">
                    {msg.geminiResponse}
                  </p>
                  {msg.judgeResult && (
                    <div className="mt-auto border-t border-slate-800 pt-3">
                      <ModelBadge
                        name="Score"
                        score={msg.judgeResult.geminiScore}
                        isWinner={msg.judgeResult.winner === 'gemini'}
                      />
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 break-words">
                        {msg.judgeResult.geminiReasoning}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mistral */}
                <div
                  className={`flex flex-col min-w-0 rounded-2xl border bg-slate-900/90 p-4 shadow-md ${
                    msg.judgeResult?.winner === 'mistral'
                      ? 'border-amber-500/50'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-orange-300">
                    <Bot className="h-3.5 w-3.5" />
                    Mistral
                  </div>
                  <p className="whitespace-pre-line break-words text-sm leading-relaxed text-slate-200">
                    {msg.mistralResponse}
                  </p>
                  {msg.judgeResult && (
                    <div className="mt-auto border-t border-slate-800 pt-3">
                      <ModelBadge
                        name="Score"
                        score={msg.judgeResult.mistralScore}
                        isWinner={msg.judgeResult.winner === 'mistral'}
                      />
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 break-words">
                        {msg.judgeResult.mistralReasoning}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Judge Verdict */}
              {msg.judgeResult && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent px-4 py-3 min-w-0">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-amber-300">
                      Cohere's Verdict —{' '}
                      {msg.judgeResult.winner === 'tie'
                        ? "It's a tie"
                        : `${msg.judgeResult.winner === 'gemini' ? 'Gemini' : 'Mistral'} wins`}
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400 break-words">
                      {msg.judgeResult.verdict}
                    </p>
                  </div>
                  <button className="ml-auto shrink-0 rounded p-1 text-slate-500 transition-colors hover:text-slate-300">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default BattleContainer;