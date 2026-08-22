import React from 'react';

interface HandoverCardProps {
  itemName: string;
  claimedBy: string;
  otpCode: string;
  onVerify: () => void;
}

export default function HandoverCard({
  itemName,
  claimedBy,
  otpCode,
  onVerify,
}: HandoverCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
      <div className="space-y-1 text-center sm:text-left">
        <span className="text-[10px] font-semibold text-[#12A99A] uppercase tracking-wider block">
          Penyerahan Aktif
        </span>
        <h4 className="text-sm font-bold text-[#0B1633] leading-tight">
          {itemName}
        </h4>
        <p className="text-slate-400 text-xs font-normal">
          Penerima: <strong className="text-slate-600">{claimedBy}</strong>
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <span className="block text-[8px] font-semibold text-slate-400 uppercase tracking-widest leading-none">OTP</span>
          <span className="text-sm font-black text-[#0B1633] font-mono leading-none tracking-wide">{otpCode}</span>
        </div>
        <button
          onClick={onVerify}
          className="px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Proses Serah Terima &rarr;
        </button>
      </div>
    </div>
  );
}
