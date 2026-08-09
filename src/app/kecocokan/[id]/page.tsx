import { use } from 'react';
import Link from 'next/link';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import BilahKecocokan from '@/komponen/BilahKecocokan';
import { hitungSkorPencocokan } from '@/pustaka/ai/pencocokan';

export default function HalamanDetailKecocokan({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const mockMatch = {
    id,
    lost: {
      id: 'lap-hilang-101',
      kategori: 'Wadah (Tumbler)',
      deskripsi_publik: 'Tumbler Corkcicle hitam 750ml ketinggalan di lab komputer TIF',
      zona: 'Lab TIF',
      waktu: '9 Agu 2026, 10:00 WIB',
    },
    found: {
      id: 'lap-temuan-205',
      kategori: 'Wadah (Tumbler)',
      deskripsi_publik: 'Tumbler Corkcicle warna hitam 750ml ditemukan di meja lab komputer 3.',
      zona: 'Lab TIF',
      waktu: '9 Agu 2026, 09:30 WIB',
      custody_status: 'Disimpan Admin Lab (RAK-A2-05)',
    },
    skor: hitungSkorPencocokan(0.88, 0.75, true, 0.5),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Perbandingan Side-by-Side
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
              Detail AI Match #{id}
            </h1>
          </div>
          <Link
            href="/kecocokan"
            className="text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            &larr; Kembali
          </Link>
        </div>

        <BilahKecocokan skor={mockMatch.skor} />

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Laporan Kehilangan Saya */}
          <div className="kartu-refound p-6 space-y-3">
            <span className="text-xs font-extrabold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-1 rounded-full uppercase">
              Laporan Kehilangan Anda
            </span>
            <h3 className="font-bold text-base text-[#0B1633] dark:text-white">
              {mockMatch.lost.kategori}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {mockMatch.lost.deskripsi_publik}
            </p>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 space-y-1">
              <p><strong>Zona:</strong> {mockMatch.lost.zona}</p>
              <p><strong>Waktu Kejadian:</strong> {mockMatch.lost.waktu}</p>
            </div>
          </div>

          {/* Barang Temuan Admin */}
          <div className="kartu-refound p-6 space-y-3 border-teal-300 dark:border-teal-800">
            <span className="text-xs font-extrabold text-teal-700 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-full uppercase">
              Kandidat Barang Temuan
            </span>
            <h3 className="font-bold text-base text-[#0B1633] dark:text-white">
              {mockMatch.found.kategori}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {mockMatch.found.deskripsi_publik}
            </p>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 space-y-1">
              <p><strong>Zona Penemuan:</strong> {mockMatch.found.zona}</p>
              <p><strong>Waktu Ditemukan:</strong> {mockMatch.found.waktu}</p>
              <p><strong className="text-[#12A99A]">Status Custody:</strong> {mockMatch.found.custody_status}</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href={`/klaim/${id}`}
            className="inline-block px-8 py-3.5 bg-[#12A99A] hover:bg-[#0f9184] text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            Lanjut Ajukan Klaim Verifikasi Kepemilikan &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
