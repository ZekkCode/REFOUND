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
        <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full font-medium border border-emerald-200">
          Disimpan di Lab
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
              className="text-xs bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
            >
              {alasan}
            </span>
          ))}
        </div>
      )}

      {/* Metadata & Action */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          <p>
            <strong className="text-slate-700">Lokasi:</strong>{' '}
            {foundItem?.nama_zona || foundItem?.id_zona || 'Lab TIF'}
          </p>
          <p>
            <strong className="text-slate-700">Waktu:</strong>{' '}
            {foundItem?.waktu_kejadian || '9 Agu 2026, 09:30 WIB'}
          </p>
        </div>

        <Link
          href={`/klaim/${match.id}`}
          className="w-full sm:w-auto text-center px-5 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white rounded-xl font-semibold transition-all shadow-xs"
        >
          Klaim Barang
        </Link>
      </div>
    </div>
  );
}
