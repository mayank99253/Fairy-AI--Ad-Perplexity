import React from 'react';

const BattleSkeletonLoader = () => {
  return (
    <div className="h-full w-full flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-5xl animate-pulse flex-col space-y-8">
        
        {/* User Query Skeleton */}
        <div className="flex justify-end gap-3">
          <div className="flex max-w-[85%] flex-col items-end sm:max-w-[75%]">
            <div className="mb-1 flex items-center gap-2 px-1">
              <div className="h-3 w-8 rounded bg-slate-800" />
            </div>
            <div className="h-12 w-56 rounded-2xl rounded-tr-none bg-slate-800/80" />
          </div>
          <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-slate-800" />
        </div>

        {/* Gemini vs Mistral Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Gemini Card */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded bg-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-slate-800" />
              <div className="h-3.5 w-5/6 rounded bg-slate-800" />
              <div className="h-3.5 w-3/4 rounded bg-slate-800" />
            </div>
            <div className="mt-4 border-t border-slate-800/80 pt-3 space-y-2">
              <div className="h-6 w-full rounded-lg bg-slate-800/60" />
              <div className="h-2.5 w-4/5 rounded bg-slate-800" />
            </div>
          </div>

          {/* Mistral Card */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded bg-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-slate-800" />
              <div className="h-3.5 w-4/5 rounded bg-slate-800" />
              <div className="h-3.5 w-2/3 rounded bg-slate-800" />
            </div>
            <div className="mt-4 border-t border-slate-800/80 pt-3 space-y-2">
              <div className="h-6 w-full rounded-lg bg-slate-800/60" />
              <div className="h-2.5 w-4/5 rounded bg-slate-800" />
            </div>
          </div>
        </div>

        {/* Judge Verdict Skeleton */}
        <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3">
          <div className="mt-0.5 h-4 w-4 shrink-0 rounded bg-slate-800" />
          <div className="w-full space-y-2">
            <div className="h-3.5 w-48 rounded bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-800" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BattleSkeletonLoader;