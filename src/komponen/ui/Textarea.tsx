import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all ${
          error ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] text-rose-500 font-semibold">{error}</p>}
    </div>
  );
}
