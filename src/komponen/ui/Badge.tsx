import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border shrink-0';
  
  const variants = {
    primary: 'bg-[#0B1633] text-white border-transparent',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200/80',
    success: 'bg-emerald-50 text-[#10B981] border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-600 border-amber-200/60',
    danger: 'bg-rose-50 text-rose-600 border-rose-200/60',
    info: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
