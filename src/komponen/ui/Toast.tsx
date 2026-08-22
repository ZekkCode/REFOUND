import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export default function Toast({ message, onClose, type = 'success', duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  const bgColors = {
    success: 'bg-teal-50 border-teal-200 text-[#12A99A]',
    error: 'bg-rose-50 border-rose-200 text-rose-600',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  };

  const icons = {
    success: (
      <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
    error: (
      <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 border rounded-2xl flex items-center space-x-2.5 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200 ${bgColors[type]}`}>
      {icons[type]}
      <span className="text-xs font-semibold">{message}</span>
    </div>
  );
}
