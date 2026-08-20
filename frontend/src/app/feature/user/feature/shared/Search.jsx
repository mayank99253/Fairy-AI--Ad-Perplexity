import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MessageSquare, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useFeature } from "../hook/useFeature";

const ChatList = () => {

  const { allChats } = useSelector((s) => s.feature);
  const { handleAllChats } = useFeature();

  useEffect(() => {
    handleAllChats()
  }, [handleAllChats])


  const [searchQuery, setSearchQuery] = useState("");

  // Filter chats dynamically based on search input
  const filteredChats = allChats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex justify-center items-center flex-col mx-auto p-4 bg-[#090C10] text-slate-100 rounded-xl shadow-lg border border-slate-800">
      {/* Search Bar */}
      <div className="relative mb-4 w-full px-36">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[#090C10] border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Chat List Display */}
      <div className="space-y-2 w-full px-36">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <Link
              key={chat._id}
              to={`/${chat._id}`}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-[#090C10] hover:bg-[#090C10] border border-slate-700/50 hover:border-slate-600 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 bg-pink-600/10 text-pink-400 rounded-lg group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm text-pink-200 truncate">
                  {chat.title.replace(/^"|"$/g, "")}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-pink-500 group-hover:text-pink-300 transition-colors flex-shrink-0" />
            </Link>
          ))
        ) : (
          <div className="text-center py-6 text-pink-500 text-sm">
              No chats found
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;