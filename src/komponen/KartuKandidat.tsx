import Link from 'next/link';
import BilahKecocokan from './BilahKecocokan';
import { MatchKandidat } from '@/pustaka/alur-kerja/tipe';
import { hitungSkorPencocokan } from '@/pustaka/ai/pencocokan';

interface PropsKartuKandidat {
  match: MatchKandidat;
}

export default function KartuKandidat({ match }: PropsKartuKandidat) {
  const skorObj = hitungSkorPencocokan(
    match.skor_teks,
    match.skor_visual,
    match.skor_lokasi === 1,
    (1 - match.skor_waktu) * 72
  );

  const foundItem = match.found_report;

  return (
    <div className="kartu-refound p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#12A99A]">
            {foundItem?.kategori || 'Barang Temuan'}
          </span>
          <h3 className="text-lg font-semibold text-[#0B1633] dark:text-white mt-0.5">
            {foundItem?.deskripsi_publik || 'Deskripsi barang temuan'}
          </h3>
        </div>
        <span className="text-xs font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full font-medium">
          Disimpan Admin Lab
        </span>
      </div>

      {/* Visualisasi Skor */}
      <BilahKecocokan skor={skorObj} />

      {/* Alasan Chips */}
      {skorObj.alasanRingkas.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {skorObj.alasanRingkas.map((alasan, idx) => (
            <span
              key={idx}
              className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700"
            >
              &check; {alasan}
            </span>
          ))}
        </div>
      )}

      {/* Metadata & Action */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500">
        <div>
          <p>
            <strong className="text-zinc-700 dark:text-zinc-300">Lokasi:</strong>{' '}
            {foundItem?.nama_zona || foundItem?.id_zona || 'Lab TIF'}
          </p>
          <p>
            <strong className="text-zinc-700 dark:text-zinc-300">Waktu Ditemukan:</strong>{' '}
            {foundItem?.waktu_kejadian || '9 Agu 2026, 09:30 WIB'}
          </p>
        </div>

        <Link
          href={`/klaim/${match.id}`}
          className="w-full sm:w-auto text-center px-5 py-2.5 bg-[#0B1633] hover:bg-[#152754] text-white dark:bg-[#12A99A] dark:hover:bg-[#0f9184] rounded-xl font-semibold transition-all shadow-sm"
        >
          Ajukan Klaim Sekarang &rarr;
        </Link>
      </div>
    </div>
  );
}
