import React from 'react';

const ChatSkeletonLoader = () => {
  return (
    <div className="custom-scrollbar h-full w-full flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-4xl animate-pulse flex-col space-y-6">
        
        {/* User Message Skeleton */}
        <div className="flex justify-end gap-3 sm:gap-4">
          <div className="flex max-w-[85%] flex-col items-end sm:max-w-[75%]">
            <div className="mb-1 flex items-center gap-2 px-1 text-[11px]">
              <div className="h-3 w-10 rounded bg-slate-800" />
              <div className="h-2 w-2 rounded-full bg-slate-800" />
              <div className="h-3 w-12 rounded bg-slate-800" />
            </div>
            <div className="h-14 w-64 rounded-2xl rounded-tr-none bg-slate-800/80" />
          </div>
          <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-slate-800" />
        </div>

        {/* AI Message Skeleton */}
        <div className="flex justify-start gap-3 sm:gap-4">
          <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-slate-800" />
          <div className="flex max-w-[85%] flex-col items-start sm:max-w-[75%]">
            <div className="mb-1 flex items-center gap-2 px-1 text-[11px]">
              <div className="h-3 w-14 rounded bg-slate-800" />
              <div className="h-2 w-2 rounded-full bg-slate-800" />
              <div className="h-3 w-12 rounded bg-slate-800" />
            </div>
            <div className="space-y-2 rounded-2xl rounded-tl-none border border-slate-800/60 bg-slate-900/60 p-4 shadow-md w-72 sm:w-96">
              <div className="h-3.5 w-full rounded bg-slate-800" />
              <div className="h-3.5 w-4/5 rounded bg-slate-800" />
              <div className="h-3.5 w-2/3 rounded bg-slate-800" />
            </div>
            <div className="mt-2 flex items-center gap-2 px-1">
              <div className="h-3.5 w-3.5 rounded bg-slate-800" />
              <div className="h-3.5 w-3.5 rounded bg-slate-800" />
              <div className="h-3.5 w-3.5 rounded bg-slate-800" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatSkeletonLoader;