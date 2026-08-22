import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/70 shadow-xs p-5 sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
