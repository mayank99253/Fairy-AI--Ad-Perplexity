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
  Trash2,
  Menu,
  X
} from 'lucide-react';
import { useChat } from '../chat/hook/useChat';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const { handleGetChat, handleDeleteChat } = useChat();
  const { chats = [] } = useSelector((s) => s.chat || {});
  const { user } = useSelector((s) => s.auth || {});

  useEffect(() => {
    handleGetChat();
  }, [handleGetChat]);

  const [activeChatId, setActiveChatId] = useState();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  // Close context menu & mobile sidebar on outside click/escape
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClickOutside();
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu.visible]);

  // Handle Chat Deletion
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

  const chatNumber = chats.length === 0 ? '' : chats.length;

  return (
    <div className="flex h-screen w-full bg-[#090C10] text-slate-100 font-sans antialiased selection:bg-pink-500 selection:text-white overflow-hidden">
      
      {/* Scrollbar Custom Styles Injector */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1e293b transparent;
        }
      `}</style>

      {/* ================= MOBILE OVERLAY BACKDROP ================= */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* ================= LEFT SIDEBAR ================= */}
      <aside 
        className={`fixed md:relative z-50 h-full w-64 bg-[#0D1117] border-r border-slate-800/60 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
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

            <div className="flex items-center gap-1">
              <Link 
                to="/setting" 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-2 space-y-1">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 font-semibold border border-purple-500/20 text-white shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-4 h-4 transition-transform group-hover:rotate-12 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                        <span className={isActive ? 'text-white' : 'text-slate-300'}>
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <Link 
              to="/battle-arena" 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 mt-2 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-white font-medium text-sm group hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <Swords className="w-4 h-4 text-pink-400 group-hover:rotate-12 transition-transform" />
                <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  AI Battle Arena
                </span>
              </div>
              <span className="text-[10px] bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" /> Live
              </span>
            </Link>
          </div>

          {/* All Chats Section Header */}
          <div className="px-4 py-2 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider border-t border-slate-800/40 mt-1">
            <span>Recent</span>
            {chatNumber && (
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                {chatNumber}
              </span>
            )}
          </div>

          {/* Chat History List */}
          {chats.length === 0 ? (
            <div className="flex-1 px-4 py-3 custom-scrollbar overflow-y-auto">
              <p className="text-xs font-medium text-slate-400">No conversation available</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
              {chats.slice().reverse().map((chat) => {
                const isActive = chat._id === activeChatId;
                return (
                  <Link
                    to={`/${chat._id}`}
                    key={chat._id}
                    onClick={() => {
                      setActiveChatId(chat._id);
                      setIsMobileSidebarOpen(false);
                    }}
                    onContextMenu={(e) => handleContextMenu(e, chat._id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 flex flex-col gap-1 relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/30'
                        : 'hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    {/* Active Rainbow Indicator */}
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
                      <span>
                        {new Date(chat.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
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
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-200 truncate">{user?.username || 'Guest'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.plan?.length > 0 ? user.plan : 'Free Plan'}</p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
            </div>
          </div>

        </div>
      </aside>

      {/* ================= RIGHT MAIN CHAT AREA ================= */}
      <main className="flex-1 flex flex-col h-full bg-[#090C10] relative overflow-hidden">
        
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800/60 bg-[#0D1117] shrink-0">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="font-bold text-sm bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Fairy
            </span>
          </div>

          <Link to="/setting" className="p-2 -mr-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors">
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* Content Outlet with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* ================= RIGHT-CLICK CONTEXT MENU ================= */}
      {contextMenu.visible && (
        <div
          className="fixed z-50 min-w-[140px] bg-[#0D1117]/95 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md p-1 animate-in fade-in zoom-in-95 duration-100"
          style={{ 
            top: `${Math.min(contextMenu.y, window.innerHeight - 60)}px`, 
            left: `${Math.min(contextMenu.x, window.innerWidth - 150)}px` 
          }}
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