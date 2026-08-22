'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MatchCardProps {
  id: string | number;
  title: string;
  category: string;
  description: string;
  score: number; // e.g. 0.864
  location: string;
  time: string;
  reasons: string[];
  image: string;
  onIgnore: (id: any) => void;
}

export default function MatchCard({
  id,
  title,
  category,
  description,
  score,
  location,
  time,
  reasons,
  image,
  onIgnore,
}: MatchCardProps) {
  const percentage = Math.round(score * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-5 items-start">
        
        {/* Left Side: Thumbnail / Status */}
        <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 192px"
          />
          <span className="absolute bottom-2 left-2 bg-[#0B1633]/90 text-white px-2 py-0.5 rounded-full font-medium text-[9px] backdrop-blur-xs">
            Disimpan Admin Lab
          </span>
        </div>

        {/* Center: Details */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold text-[#12A99A] uppercase tracking-wider block">
                {category}
              </span>
              <h3 className="text-base font-bold text-[#0B1633] leading-snug">
                {title}
              </h3>
              <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
            
            {/* AI Match Score Badge */}
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full shrink-0 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1.5 animate-pulse" />
              {percentage}% Cocok AI
            </span>
          </div>

          {/* Reason Chips / Matching Attributes */}
          {reasons && reasons.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {reasons.map((reason, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg"
                >
                  <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {reason}
                </span>
              ))}
              <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Zona: {location}
              </span>
            </div>
          )}
          
          <div className="text-[10px] text-slate-400 font-medium">
            Waktu Temu: {time}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <Link
          href={`/klaim/${id}`}
          className="flex-1 w-full text-center px-4 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white font-medium text-xs rounded-xl shadow-xs transition-all duration-150"
        >
          Ini Barang Saya (Ajukan Klaim) &rarr;
        </Link>
        <button
          type="button"
          onClick={() => onIgnore(id)}
          className="flex-1 w-full px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs rounded-xl transition-all cursor-pointer"
        >
          Bukan Barang Saya
        </button>
      </div>
    </div>
  );
}
