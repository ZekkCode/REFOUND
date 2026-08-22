import React from 'react';
import Link from 'next/link';

interface ClaimCardProps {
  id: string;
  itemName: string;
  claimedBy: string;
  date: string;
  status: string;
  statusText: string;
}

export default function ClaimCard({
  id,
  itemName,
  claimedBy,
  date,
  status,
  statusText,
}: ClaimCardProps) {
  const isAwaiting = status === 'diajukan' || status === 'ditinjau_admin' || status === 'awaiting_verif' || status === 'awaiting';

  return (
    <div className="flex items-center justify-between gap-4 p-4 border border-zinc-100 hover:border-zinc-200 rounded-2xl transition-all bg-white w-full">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-sm text-[#0B1633] leading-tight">
            {itemName}
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-zinc-400 font-medium">
              ID Klaim: #{id}
            </span>
            <span className={`px-2 py-0.5 text-[8px] font-semibold uppercase rounded-full ${
              isAwaiting ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'
            }`}>
              {statusText}
            </span>
          </div>
          <p className="text-zinc-400 text-[10px] font-medium">
            Klaim oleh: {claimedBy} &bull; {date}
          </p>
        </div>
      </div>
      <Link
        href="/admin/klaim"
        className="px-4 py-2 bg-white border border-[#006F69] hover:bg-[#006F69]/5 text-[#006F69] font-semibold text-xs rounded-xl transition-all shrink-0"
      >
        Tinjau
      </Link>
    </div>
  );
}
