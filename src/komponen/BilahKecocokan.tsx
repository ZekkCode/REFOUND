import { SkorPencocokan } from '@/pustaka/ai/pencocokan';

interface PropsBilah {
  skor: SkorPencocokan;
}

export default function BilahKecocokan({ skor }: PropsBilah) {
  const persen = Math.round(skor.skorAkhir * 100);

  let warnaBilah = 'bg-[#EF4444]';
  let warnaTeks = 'text-[#EF4444]';
  if (persen >= 80) {
    warnaBilah = 'bg-[#10B981]';
    warnaTeks = 'text-[#047857]';
  } else if (persen >= 60) {
    warnaBilah = 'bg-[#6366F1]';
    warnaTeks = 'text-[#4338CA]';
  }

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm font-semibold ${warnaTeks}`}>
            {persen}% — {skor.labelPotensi}
          </span>
          <p className="text-xs text-slate-400 font-normal mt-0.5">
            Kombinasi teks, visual, lokasi, dan waktu
          </p>
        </div>
        <span className="text-xl font-bold text-[#0B1633]">
          {persen}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${warnaBilah} transition-all duration-500 rounded-full`}
          style={{ width: `${persen}%` }}
        />
      </div>

      {/* Breakdown Component Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-medium">
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Teks</span>
          <strong className="text-slate-800 font-semibold">
            {Math.round(skor.skorTeks * 100)}%
          </strong>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Visual</span>
          <strong className="text-slate-800 font-semibold">
            {Math.round(skor.skorVisual * 100)}%
          </strong>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Lokasi</span>
          <strong className="text-slate-800 font-semibold">
            {Math.round(skor.skorLokasi * 100)}%
          </strong>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
          <span className="text-slate-400 block text-[10px] uppercase font-medium">Waktu</span>
          <strong className="text-slate-800 font-semibold">
            {Math.round(skor.skorWaktu * 100)}%
          </strong>
        </div>
      </div>
    </div>
  );
}
