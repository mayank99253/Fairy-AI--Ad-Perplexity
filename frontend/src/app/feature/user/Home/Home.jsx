import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Library,
  Swords,
  Plus,
  MessageSquare,
  Sparkles,
  User,
  Settings,
  MoreHorizontal,
  Flame,
  SearchIcon,
  NotebookPen,
  Trash2
} from 'lucide-react';
import { useChat } from '../chat/hook/useChat';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const { handleGetChat, handleDeleteChat } = useChat(); // Added handleDeleteChat from hook (if available)
  const { chats } = useSelector((s) => s.chat);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    handleGetChat();
  }, [handleGetChat]);

  const [activeChatId, setActiveChatId] = useState();

  // Context Menu State
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    chatId: null
  });

  // Handle Right Click on Chat Item
  const handleContextMenu = (e, chatId) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      chatId
    });
  };

  // Close context menu on outside click or scroll
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClickOutside();
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu.visible]);

  // Handle Chat Deletion Trigger
  const onDeleteClick = (chatId) => {
    if (handleDeleteChat) {
      handleDeleteChat(chatId);
    } else {
      console.log('Delete chat triggered for ID:', chatId);
    }
    setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
  };

  const navItems = [
    { path: '/', label: 'New Chat', icon: Plus, end: true },
    { path: 'search', label: 'Search Chats', icon: SearchIcon },
    { path: 'projects', label: 'Projects', icon: NotebookPen },
    { path: 'library', label: 'Library', icon: Library },
  ];

  const chatNumber = chats.length === 0 ? "" : chats.length;

  return (
    <div className="flex h-screen w-full bg-[#090C10] text-slate-100 font-sans antialiased selection:bg-pink-500 selection:text-white">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 h-full bg-[#0D1117] border-r border-slate-800/60 flex flex-col justify-between shrink-0">
        <div className="flex flex-col h-full overflow-hidden">

          {/* App Header & Branding */}
          <div className="p-4 flex items-center justify-between border-b border-slate-800/50">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/20">
                <div className="h-full w-full bg-[#0D1117] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-base bg-gradient-to-r from-pink-400 via-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Fairy
                </h1>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">MOON RISE</span>
              </div>
            </div>

            <button className="p-2 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Navigation Buttons */}
          <div className="p-2 space-y-1">
            <nav className="p-2 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group duration-200 ${isActive
                        ? ' bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 font-semibold border-purple-500/20 text-white hover:border-purple-500/40 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4 h-4 transition-colors group-hover:rotate-12 ${isActive ? 'text-pink-400' : 'text-white/40'}`} />
                        <span className="text-white/40 bg-clip-text text-transparent">
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <Link to='/battle-arena' className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-white font-medium text-sm group hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3">
                <Swords className="w-4 h-4 text-pink-400 group-hover:rotate-12 transition-transform" />
                <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  AI Battle Areana
                </span>
              </div>
              <span className="text-[10px] bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" /> Live
              </span>
            </Link>

          </div>

          {/* All Chats Section Header */}
          <div className="px-4 py-2 flex items-center justify-between text-xs font-semibold text-slate-400 camelcase tracking-wider border-t border-slate-800/40 mt-1">
            <span>Recent</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
              {chatNumber}
            </span>
          </div>

          {/* Chat History List */}
          {chats.length === 0 ? (
            <div className="flex-1 px-2 space-y-1 custom-scrollbar">
              <h1 className='text-xs font-medium truncate text-white'> No conversatio Avaiable </h1>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
              {chats.toReversed().map((chat) => {
                const isActive = chat._id === activeChatId;
                return (
                  <Link
                    to={`/${chat._id}`}
                    key={chat._id}
                    onClick={() => setActiveChatId(chat._id)}
                    onContextMenu={(e) => handleContextMenu(e, chat._id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex flex-col gap-1 relative group ${isActive
                      ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/30'
                      : 'hover:bg-slate-800/40 border border-transparent'
                      }`}
                  >
                    {/* Active Rainbow Glow Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 shadow-sm shadow-purple-500/50" />
                    )}

                    <div className="flex items-center gap-2 pl-1">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                      <span className={`text-xs font-medium truncate ${isActive ? 'text-white font-semibold' : 'text-slate-300'}`}>
                        {chat.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pl-6 text-[10px] text-slate-500">
                      <span>{new Date(chat.createdAt).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', hour12: true
                      })}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* User Profile Footer */}
          <div className="p-3 border-t border-slate-800/60 bg-[#0A0D12]">
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/40 transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 p-[1.5px]">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{user?.username}</p>
                  <p className="text-[10px] text-slate-500">{user?.plan?.length === 0 ? user?.plan : 'Free Plan'}</p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </div>
          </div>

        </div>
      </aside>

      {/* ================= RIGHT MAIN CHAT AREA ================= */}
      <main className="flex-1 flex flex-col h-full bg-[#090C10] relative overflow-y-auto">
        <Outlet />
      </main>

      {/* ================= RIGHT-CLICK CONTEXT MENU ================= */}
      {contextMenu.visible && (
        <div
          className="fixed z-50 min-w-[140px] bg-[#0D1117]/95 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md p-1 animate-in fade-in zoom-in-95 duration-100"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <button
            onClick={() => onDeleteClick(contextMenu.chatId)}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Chat</span>
          </button>
        </div>
      )}

    </div>
  );
}