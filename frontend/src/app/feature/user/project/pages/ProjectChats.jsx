import React, { useEffect, useState } from 'react';
import { useProject } from '../hook/useProject';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  ArrowLeft, 
  MessageSquarePlus, 
  Search, 
  Sparkles, 
  ChevronRight,
  Clock
} from 'lucide-react';

const ProjectChats = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    handleGetAllProjectChat,
    handleAddChatToProject
  } = useProject();

  const { selectProject, allChats } = useSelector((s) => s.project);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleGetAllProjectChat(projectId);
  }, [handleGetAllProjectChat, projectId]);

  const handleChatClick = (chatId) => {
    navigate(`/${chatId}`);
  };

  const filteredChats = allChats?.filter((chat) =>
    chat?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2.5 bg-slate-800 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 rounded-xl transition-all duration-300 text-slate-300 hover:text-white"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Project Workspace
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                {selectProject?.title || 'Project Chats'}
              </h1>
            </div>
          </div>

          <button 
            // onClick={() => handleAddChatToProject(projectId)}
            className="px-4 py-2.5 rounded-xl font-medium bg-slate-800 border border-slate-700 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Add New Chat</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search chats in this project..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Total Chats: <span className="text-white font-bold">{allChats?.length || 0}</span>
          </div>
        </div>

        {/* Chat Row Cards */}
        <div className="space-y-3">
          {filteredChats && filteredChats.length > 0 ? (
            filteredChats.map((chat) => {
              const chatId = chat._id || chat.id;
              return (
                <div 
                  key={chatId}
                  onClick={() => handleChatClick(chatId)}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 transition-all duration-300 cursor-pointer group shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 min-w-0 pr-4">
                    <div className="p-3 bg-slate-800 group-hover:bg-white/20 rounded-xl transition shrink-0">
                      <MessageSquare className="w-6 h-6 text-pink-400 group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base md:text-lg text-white group-hover:text-white truncate">
                        {chat.title || 'Untitled Chat'}
                      </h3>
                      <p className="text-xs text-slate-400 group-hover:text-white/80 line-clamp-1 mt-0.5">
                        {chat.lastMessage || 'Click to view full conversation...'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0">
                    <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-500 group-hover:text-white/70">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{chat.updatedAt || 'Recent'}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 font-medium">No chats found for this project.</p>
              <button 
                onClick={() => handleAddChatToProject(projectId)}
                className="text-xs text-cyan-400 hover:underline inline-block font-semibold"
              >
                Start a new conversation
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectChats;