import { SkorPencocokan } from '@/pustaka/ai/pencocokan';

interface PropsBilah {
  skor: SkorPencocokan;
}

export default function BilahKecocokan({ skor }: PropsBilah) {
  const persen = Math.round(skor.skorAkhir * 100);

  let warnaBilah = 'bg-rose-500';
  let warnaTeks = 'text-rose-700 dark:text-rose-300';
  if (persen >= 80) {
    warnaBilah = 'bg-[#12A99A]';
    warnaTeks = 'text-[#12A99A] dark:text-teal-300';
  } else if (persen >= 60) {
    warnaBilah = 'bg-purple-500';
    warnaTeks = 'text-purple-700 dark:text-purple-300';
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm font-extrabold ${warnaTeks}`}>
            {persen}/100 - {skor.labelPotensi}
          </span>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Dihitung dari kombinasi Teks (45%), Visual (30%), Lokasi (15%), dan Waktu (10%)
          </p>
        </div>
        <span className="text-lg font-black font-mono text-[#0B1633] dark:text-white">
          {persen}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${warnaBilah} transition-all duration-500 rounded-full`}
          style={{ width: `${persen}%` }}
        />
      </div>

      {/* Breakdown Component Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
        <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700">
          <span className="text-zinc-400 block">Teks (45%)</span>
          <strong className="text-zinc-800 dark:text-zinc-200">
            {Math.round(skor.skorTeks * 100)}%
          </strong>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700">
          <span className="text-zinc-400 block">Visual (30%)</span>
          <strong className="text-zinc-800 dark:text-zinc-200">
            {Math.round(skor.skorVisual * 100)}%
          </strong>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700">
          <span className="text-zinc-400 block">Lokasi (15%)</span>
          <strong className="text-zinc-800 dark:text-zinc-200">
            {Math.round(skor.skorLokasi * 100)}%
          </strong>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-100 dark:border-zinc-700">
          <span className="text-zinc-400 block">Waktu (10%)</span>
          <strong className="text-zinc-800 dark:text-zinc-200">
            {Math.round(skor.skorWaktu * 100)}%
          </strong>
        </div>
      </div>
    </div>
  );
}
