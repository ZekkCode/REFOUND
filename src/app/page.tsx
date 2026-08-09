import Link from 'next/link';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import KartuLaporan from '@/komponen/KartuLaporan';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';

export default function Home() {
  const daftarLaporanPublik: ItemLaporan[] = [
    {
      id: 'lap-hilang-101',
      user_id: 'usr-mhs-01',
      tipe: 'kehilangan',
      kategori: 'Wadah (Tumbler)',
      deskripsi_publik: 'Tumbler Corkcicle hitam 750ml ketinggalan di meja lab komputer TIF',
      id_zona: 'lab_tif',
      nama_zona: 'Lab TIF',
      waktu_kejadian: '9 Agu 2026, 10:00 WIB',
      status: 'potensi_cocok',
      id_pencocokan_kandidat: 'match-8821',
    },
    {
      id: 'lap-temuan-202',
      user_id: 'usr-mhs-02',
      tipe: 'penemuan',
      kategori: 'Elektronik',
      deskripsi_publik: 'Flashdisk Sandisk 32GB warna merah ditemukan di meja koridor utama',
      id_zona: 'koridor',
      nama_zona: 'Koridor Gedung Lab',
      waktu_kejadian: '9 Agu 2026, 11:30 WIB',
      status: 'aktif',
    },
    {
      id: 'lap-hilang-103',
      user_id: 'usr-mhs-03',
      tipe: 'kehilangan',
      kategori: 'Dokumen',
      deskripsi_publik: 'KTM atas nama Mahasiswa TIF angkatan 2024 terselip di area tangga',
      id_zona: 'tangga',
      nama_zona: 'Area Tangga',
      waktu_kejadian: '8 Agu 2026, 15:45 WIB',
      status: 'aktif',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        {/* Hero Banner Section */}
        <section className="kartu-refound p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-[#0B1633] via-[#10234f] to-[#0B1633] text-white">
          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#12A99A]/20 text-[#12A99A] border border-[#12A99A]/30 px-3 py-1 rounded-full">
              Sistem Tertutup Komunitas Gedung Lab
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Reconnecting Found Items with Their Owners Digitally
            </h1>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
              Platform berbasis AI untuk mempertemukan laporan kehilangan & penemuan barang secara otomatis di lingkungan laboratorium Teknik Informatika dan Sistem Informasi.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/lapor/kehilangan"
                className="px-6 py-3.5 bg-[#12A99A] hover:bg-[#0f9184] text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                + Laporkan Kehilangan
              </Link>
              <Link
                href="/lapor/penemuan"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all"
              >
                + Laporkan Penemuan
              </Link>
            </div>
          </div>
        </section>

        {/* Informasion Box AI Engine */}
        <section className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-purple-500/10 border border-[#12A99A]/30 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12A99A] animate-pulse" />
              <h2 className="text-sm font-bold text-[#0B1633] dark:text-teal-300">
                Mesin AI Match Engine Aktif (Vector Similarity + Fusion Ranking)
              </h2>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Perhitungan Skor Kemiripan: Teks (45%) &bull; Visual (30%) &bull; Lokasi (15%) &bull; Waktu (10%). Kerahasiaan ciri & privasi dijamin oleh RLS & Admin Custody.
            </p>
          </div>
          <Link
            href="/kecocokan"
            className="text-xs font-bold text-[#12A99A] bg-[#12A99A]/10 hover:bg-[#12A99A]/20 px-4 py-2 rounded-xl border border-[#12A99A]/30 whitespace-nowrap transition-colors"
          >
            Lihat Kandidat Match &rarr;
          </Link>
        </section>

        {/* 3-Step Process Flow */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#12A99A]">
              Cara Kerja REFOUND
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
              3 Langkah Aman Mengembalikan Barang
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="kartu-refound p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1633] text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-[#0B1633] dark:text-white">1. Laporkan Barang</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Isi form laporan kehilangan atau penemuan. Foto barang temuan langsung dititipkan ke Admin Lab agar aman.
              </p>
            </div>

            <div className="kartu-refound p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#12A99A] text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-[#0B1633] dark:text-white">2. AI Matching & Klaim</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                AI menghitung skor kecocokan. Jika menemukan kandidat, jawab pertanyaan verifikasi ciri rahasia dari Admin.
              </p>
            </div>

            <div className="kartu-refound p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF765F] text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-[#0B1633] dark:text-white">3. Ambil di Ruang Admin</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Klaim disetujui menghasilkan Kode Pengambilan single-use. Tunjukkan kode ke Admin Lab untuk mengambil barang.
              </p>
            </div>
          </div>
        </section>

        {/* Feed Laporan Aktif Komunitas */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#0B1633] dark:text-white">
                Laporan Aktif Komunitas Gedung Lab
              </h2>
              <p className="text-xs text-zinc-500">
                Memodelkan aktivitas terbaru dari mahasiswa Teknik Informatika & Sistem Informasi
              </p>
            </div>
            <Link
              href="/barang-temuan"
              className="text-xs font-bold text-[#12A99A] hover:underline"
            >
              Lihat Semua Barang Temuan &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {daftarLaporanPublik.map((item) => (
              <KartuLaporan key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-[#0B1633]/50 py-8 text-center text-xs text-zinc-500 mt-auto">
        <p>&copy; 2026 REFOUND — Trunodjoyo Creative Competition (TCC Vibe Code 2026)</p>
      </footer>
    </div>
  );
}
