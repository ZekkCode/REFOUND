import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-xs text-center space-y-3 max-w-md mx-auto my-6">
      {icon ? (
        <div className="flex justify-center text-slate-300">{icon}</div>
      ) : (
        <svg className="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0a2.25 2.25 0 00-2.25 2.25v.9c0 1.144.918 2.063 2.063 2.063h17.874c1.145 0 2.063-.919 2.063-2.063v-.9a2.25 2.25 0 00-2.25-2.25m-18 0a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25m-18 0V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v6" />
        </svg>
      )}
      <div className="space-y-1">
        <p className="text-xs text-slate-400 font-bold">{title}</p>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
