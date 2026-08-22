import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'primary' | 'secondary';
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon,
  badgeText,
  badgeVariant = 'secondary',
  loading = false,
}: StatCardProps) {
  const badgeColors = {
    success: 'text-[#12A99A] bg-teal-50 border-teal-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    primary: 'text-[#0B1633] bg-teal-50 border-teal-100',
    secondary: 'text-zinc-500 bg-zinc-50 border-zinc-200',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] flex flex-col justify-between space-y-4 min-h-[140px]">
      <div className="flex items-center justify-between">
        {icon && (
          <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-600 shrink-0">
            {icon}
          </div>
        )}
        {badgeText && (
          <span className={`px-2.5 py-1 text-[9px] font-semibold rounded-full border ${badgeColors[badgeVariant]}`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="space-y-1">
        {loading ? (
          <div className="h-9 w-20 bg-slate-100 rounded-lg animate-pulse" />
        ) : (
          <h3 className="text-4xl font-bold text-[#0B1633] font-mono leading-none">
            {value}
          </h3>
        )}
        <p className="text-zinc-400 text-xs font-medium">
          {title}
        </p>
      </div>
    </div>
  );
}
