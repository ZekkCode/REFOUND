import Link from 'next/link';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import TabelAntreanAdmin from '@/komponen/TabelAntreanAdmin';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';

export default function AdminOverviewDashboardPage() {
  const antreanLaporan: ItemLaporan[] = [
    {
      id: 'lap-temuan-202',
      user_id: 'usr-mhs-02',
      tipe: 'penemuan',
      kategori: 'Elektronik',
      deskripsi_publik: 'Flashdisk Sandisk 32GB warna merah ditemukan di koridor',
      id_zona: 'koridor',
      nama_zona: 'Koridor Gedung Lab',
      waktu_kejadian: '9 Agu 2026, 11:30 WIB',
      status: 'menunggu_validasi',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Portal Pengelolaan Operasional
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
              Dashboard Admin Lab
            </h1>
          </div>

          <div className="flex items-center gap-2 font-bold text-xs">
            <Link
              href="/admin/laporan"
              className="px-3.5 py-2 bg-[#0B1633] text-white rounded-xl hover:bg-[#152754] transition-all"
            >
              1. Penitipan Barang & Custody
            </Link>
            <Link
              href="/admin/klaim"
              className="px-3.5 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition-all"
            >
              2. Tinjau Klaim
            </Link>
            <Link
              href="/admin/penyerahan"
              className="px-3.5 py-2 bg-[#12A99A] text-white rounded-xl hover:bg-[#0f9184] transition-all"
            >
              3. Eksekusi Penyerahan
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="kartu-refound p-5 space-y-1 border-amber-300 dark:border-amber-800">
            <span className="text-xs font-bold uppercase text-amber-600">Menunggu Penitipan</span>
            <p className="text-3xl font-black font-mono text-[#0B1633] dark:text-white">1</p>
            <p className="text-xs text-zinc-500">Barang temuan belum diserah-terimakan ke Admin</p>
          </div>

          <div className="kartu-refound p-5 space-y-1 border-purple-300 dark:border-purple-800">
            <span className="text-xs font-bold uppercase text-purple-600">Klaim Perlu Ditinjau</span>
            <p className="text-3xl font-black font-mono text-[#0B1633] dark:text-white">1</p>
            <p className="text-xs text-zinc-500">Jawaban rahasia mahasiswa siap diverifikasi</p>
          </div>

          <div className="kartu-refound p-5 space-y-1 border-teal-300 dark:border-teal-800">
            <span className="text-xs font-bold uppercase text-[#12A99A]">Siap Pengambilan</span>
            <p className="text-3xl font-black font-mono text-[#0B1633] dark:text-white">1</p>
            <p className="text-xs text-zinc-500">Klaim disetujui, menunggu kode pengambilan</p>
          </div>
        </div>

        {/* Antrean Tindakan Admin */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0B1633] dark:text-white">
            Antrean Penitipan Barang Physical Check
          </h2>
          <TabelAntreanAdmin daftarLaporan={antreanLaporan} />
        </section>
      </main>
    </div>
  );
}
