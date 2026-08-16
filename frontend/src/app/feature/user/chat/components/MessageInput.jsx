import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChat } from '../hook/useChat';

const MessageInput = () => {
    const [inputMessage, setInputMessage] = useState('');
    const { chatId } = useParams();
    const { handleSendMessage } = useChat();
    const navigate = useNavigate()

    const onSend = async (e) => {
        e?.preventDefault();
        if (!inputMessage.trim()) return;

        const userText = inputMessage;
        setInputMessage('');

        const result = await handleSendMessage(userText, chatId);
        if(!result) return setInputMessage(userText)
        if(!chatId && result?.chat) {
          navigate(`/${result?.chat}`)
        }

        }
    };

    return (
        <div className="p-4 z-10 max-w-4xl w-full mx-auto">
          <form onSubmit={onSend} className="relative">
            <div className="relative rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-xl shadow-purple-950/40">
              <div className="bg-[#0D1117] rounded-[15px] flex gap-2">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSend();
                    }
                  }}
                  placeholder="Send a message to Rainbow AI..."
                  className="w-full bg-transparent text-sm p-4 text-slate-100 placeholder-slate-500 px-3 focus:outline-none resize-none custom-scrollbar"
                />
                <div className="flex items-center justify-between px-2 border-t border-slate-800/50">
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className={`p-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                      inputMessage.trim()
                        ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-md shadow-purple-500/20 hover:opacity-90 active:scale-95'
                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </form>
          <p className="text-[11px] text-center text-slate-500 mt-2">
            Fairy AI can make mistakes. Verify important information.
          </p>
        </div>
    )
}

export default MessageInput