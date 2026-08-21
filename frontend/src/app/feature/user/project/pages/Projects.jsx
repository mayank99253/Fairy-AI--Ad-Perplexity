import React, { useState, useEffect } from 'react';
import { useProject } from '../hook/useProject';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FolderPlus, 
  MessageSquare, 
  Folder, 
  ArrowLeft, 
  Plus, 
  Search, 
  MessageSquarePlus, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const Projects = () => {
  const { 
    handleAddChatToProject, 
    handleCreateProject, 
    handleGetAllProjects, 
  } = useProject();

  const { selectProject, allChats, allProject } = useSelector((s) => s.project);
  
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [newProjectName, setNewProjectName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleGetAllProjects();
  }, [handleGetAllProjects]);


  const handleProjectClick = (projectId) => {
    navigate(`/${projectId}/chats`);
  };

  const onCreateProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    handleCreateProject({ name: newProjectName });
    setNewProjectName('');
    setIsModalOpen(false);
  };

  const currentProject = allProject?.find(p => (p._id || p.id) === projectId) || selectProject;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Route View: /:projectId/:chats */}
        {projectId ? (
          <div className="space-y-6">
            {/* Header & Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/')}
                  className="p-2.5 bg-slate-800 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 rounded-xl transition-all duration-300 text-slate-300 hover:text-white"
                  title="Back to Projects"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Workspace</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                    {currentProject?.name || 'Project Details'}
                  </h1>
                </div>
              </div>

              <button 
                onClick={() => handleAddChatToProject(projectId)}
                className="px-4 py-2.5 rounded-xl font-medium bg-slate-800 border border-slate-700 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Add Chat</span>
              </button>
            </div>

            {/* Chats Container */}
            <div>
              <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Chats ({allChats?.length || 0})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allChats && allChats.length > 0 ? (
                  allChats.map((chat) => (
                    <div 
                      key={chat._id || chat.id} 
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 transition-all duration-300 group shadow-lg flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="p-2 bg-slate-800 group-hover:bg-white/20 rounded-lg w-fit transition">
                          <MessageSquare className="w-5 h-5 text-pink-400 group-hover:text-white" />
                        </div>
                        <h3 className="font-bold text-base text-slate-200 group-hover:text-white line-clamp-1">
                          {chat.title || 'Untitled Conversation'}
                        </h3>
                        <p className="text-sm text-slate-400 group-hover:text-white/80 line-clamp-2">
                          {chat.lastMessage || 'No preview message available.'}
                        </p>
                      </div>
                      <span className="text-xs text-slate-500 group-hover:text-white/60 mt-4 text-right block">
                        {chat.updatedAt || 'Recently updated'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
                    <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-400 font-medium">No chats found in this project.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Route View: All Projects List */
          <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-slate-800 rounded-xl">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">All Projects</h1>
                  <p className="text-xs text-slate-400">Select a project row to view its attached chats</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 bg-slate-800 border border-slate-700 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm font-semibold shadow-md whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {/* Project Row Cards */}
            <div className="space-y-3">
              {allProject && allProject.length > 0 ? (
                allProject
                  .filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((project) => (
                    <div 
                      key={project._id || project.id}
                      onClick={() => handleProjectClick(project._id || project.id)}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 transition-all duration-300 cursor-pointer group shadow-lg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-slate-800 group-hover:bg-white/20 rounded-xl transition">
                          <Folder className="w-6 h-6 text-cyan-400 group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-white">
                            {project.title || 'Untitled Project'}
                          </h3>
                          <p className="text-xs text-slate-400 group-hover:text-white/80">
                            ID: {project._id || project.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs bg-slate-800 group-hover:bg-white/20 text-slate-300 group-hover:text-white px-3 py-1.5 rounded-full border border-slate-700 group-hover:border-white/30 transition">
                          View Chats
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="py-20 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
                  <FolderPlus className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No projects available.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Create New Project</h3>
            <form onSubmit={onCreateProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Project Title
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Moon Web App" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 text-white font-bold text-sm border border-slate-700 transition duration-300"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;