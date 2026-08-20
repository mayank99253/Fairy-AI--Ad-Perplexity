import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFeature } from '../hook/useFeature';
import {
  Search,
  Sparkles,
  Download,
  Copy,
  Check,
  Heart,
  Eye,
  X,
  SlidersHorizontal,
  Calendar,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

const Library = () => {
  const { genImages, genImagesError, genImagesLoading } = useSelector((s) => s.feature);
  const { handleGetAllGenImages } = useFeature();

  // Local UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'favorites'
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  console.log(genImages, genImagesError)

  useEffect(() => {
    handleGetAllGenImages();
  }, [handleGetAllGenImages]);

  // Copy prompt helper
  const handleCopyPrompt = (e, text, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-indigo-400" />
              Image Library
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Browse, search, and manage your AI-generated artwork.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300 font-medium">
              Total Images: <span className="text-indigo-400 font-bold">{genImages?.length || 0}</span>
            </span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {genImagesLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 animate-pulse">
                <div className="aspect-square bg-slate-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!genImagesLoading && genImages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 text-slate-500">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">No images found</h3>
            <p className="text-slate-400 text-sm max-w-sm mt-1">
              {searchTerm || filter === 'favorites'
                ? "Try adjusting your search terms or filters."
                : "You haven't generated any images yet. Start creating!"}
            </p>
          </div>
        )}

        {/* Image Grid */}
        {!genImagesLoading && genImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {genImages.map((img) => (
              <div
                key={img._id}
                onClick={() => setSelectedImage(img)}
                className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col"
              >
                {/* Image & Overlay */}
                <div classsName="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={img.imageUrl}
                    alt={img.prompt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={img.imageUrl}
                        download
                        onClick={(e) => e.stopPropagation()}
                        title="Download"
                        className="p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 rounded-lg backdrop-blur border border-slate-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                   
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>{img.createdAt ? new Date(img.createdAt).toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Preview Container */}
              <div className="md:w-1/2 bg-slate-950 flex items-center justify-center p-4 relative min-h-[300px]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.prompt}
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </div>

              {/* Image Metadata Panel */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                      Prompt
                    </h2>
                    <p className="text-slate-200 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 select-all">
                      {selectedImage.prompt}
                    </p>
                  </div>

                  {selectedImage.negativePrompt && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
                        Negative Prompt
                      </h3>
                      <p className="text-slate-400 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800 select-all">
                        {selectedImage.negativePrompt}
                      </p>
                    </div>
                  )}

                  {/* Tech Specs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
                      <Layers className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-slate-500 text-[10px]">Model</p>
                        <p className="text-slate-300 font-medium truncate">{selectedImage.model || 'Standard'}</p>
                      </div>
                    </div>
                    <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-slate-500 text-[10px]">Created</p>
                        <p className="text-slate-300 font-medium">
                          {selectedImage.createdAt ? new Date(selectedImage.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={(e) => handleCopyPrompt(e, selectedImage.prompt, selectedImage.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-xl text-sm transition-colors border border-slate-700"
                  >
                    {copiedId === selectedImage.id ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                  <a
                    href={selectedImage.url}
                    download
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Library;