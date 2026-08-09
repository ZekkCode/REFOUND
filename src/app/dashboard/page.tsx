import Link from 'next/link';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import KartuLaporan from '@/komponen/KartuLaporan';
import AlurWaktuStatus from '@/komponen/AlurWaktuStatus';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';

export default function DashboardMahasiswaPage() {
  const laporanSaya: ItemLaporan[] = [
    {
      id: 'lap-hilang-101',
      user_id: 'usr-mhs-current',
      tipe: 'kehilangan',
      kategori: 'Wadah (Tumbler)',
      deskripsi_publik: 'Tumbler Corkcicle hitam 750ml ketinggalan di lab komputer TIF',
      id_zona: 'lab_tif',
      nama_zona: 'Lab TIF',
      waktu_kejadian: '9 Agu 2026, 10:00 WIB',
      status: 'potensi_cocok',
      id_pencocokan_kandidat: 'match-8821',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#12A99A]">
              Dashboard Pengguna
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
              Laporan & Aktivitas Saya
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/lapor/kehilangan"
              className="px-4 py-2 bg-[#12A99A] text-white text-xs font-bold rounded-xl hover:bg-[#0f9184] transition-all"
            >
              + Buat Laporan Kehilangan
            </Link>
          </div>
        </div>

        {/* Status Timeline Card */}
        <div className="kartu-refound p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0B1633] dark:text-white">
              Status Terkini Laporan #lap-hilang-101
            </h3>
            <span className="text-xs font-mono text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-full font-bold">
              Potensi Cocok AI
            </span>
          </div>

          <AlurWaktuStatus statusAktif="potensi_cocok" />

          <div className="p-4 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-purple-900 dark:text-purple-200">
                1 Kandidat Barang Temuan Cocok Ditemukan!
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                AI memberikan Skor Kemiripan 86/100 (Potensi Tinggi).
              </p>
            </div>
            <Link
              href="/kecocokan/match-8821"
              className="px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-lg hover:bg-purple-800 transition-colors whitespace-nowrap"
            >
              Buka & Ajukan Klaim &rarr;
            </Link>
          </div>
        </div>

        {/* Daftar Laporan Aktif */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0B1633] dark:text-white">
            Riwayat Laporan Saya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laporanSaya.map((item) => (
              <KartuLaporan key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
