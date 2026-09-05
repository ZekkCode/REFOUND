import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  category?: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export default function PageHeader({
  category,
  title,
  description,
  backHref,
  backLabel = 'Kembali',
}: PageHeaderProps) {
  return (
    <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
      {backHref && (
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 mb-1.5">
          <Link href={backHref} className="hover:text-[#12A99A] transition-colors">
            {backLabel}
          </Link>
        </div>
      )}
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wider text-[#12A99A]">
          {category}
        </span>
      )}
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
        {title}
      </h1>
      <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}
