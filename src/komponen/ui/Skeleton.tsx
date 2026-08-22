import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export default function Skeleton({ className = '', variant = 'rect' }: SkeletonProps) {
  const base = 'bg-slate-200 animate-pulse';
  
  const shapes = {
    text: 'h-4 rounded w-3/4',
    rect: 'rounded-xl',
    circle: 'rounded-full',
  };

  return (
    <div className={`${base} ${shapes[variant]} ${className}`} />
  );
}
