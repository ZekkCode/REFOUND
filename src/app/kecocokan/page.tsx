import NavigasiUtama from '@/komponen/NavigasiUtama';
import KartuKandidat from '@/komponen/KartuKandidat';
import { MatchKandidat } from '@/pustaka/alur-kerja/tipe';

export default function HalamanPencocokanAI() {
  const daftarKandidat: MatchKandidat[] = [
    {
      id: 'match-8821',
      lost_report_id: 'lap-hilang-101',
      found_report_id: 'lap-temuan-205',
      skor_teks: 0.88,
      skor_visual: 0.75,
      skor_lokasi: 1.0,
      skor_waktu: 0.9,
      skor_akhir: 0.864,
      status: 'pending',
      found_report: {
        id: 'lap-temuan-205',
        user_id: 'usr-mhs-04',
        tipe: 'penemuan',
        kategori: 'Wadah (Tumbler)',
        deskripsi_publik: 'Tumbler Corkcicle warna hitam 750ml ditemukan di meja lab komputer 3.',
        id_zona: 'lab_tif',
        nama_zona: 'Lab TIF',
        waktu_kejadian: '9 Agu 2026, 09:30 WIB',
        status: 'potensi_cocok',
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Hasil AI Vector Match Engine
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Rekomendasi Kecocokan Laporan
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Berikut adalah daftar kandidat barang temuan yang memiliki potensi kemiripan tinggi dengan laporan kehilangan Anda.
          </p>
        </div>

        <div className="space-y-6">
          {daftarKandidat.map((match) => (
            <KartuKandidat key={match.id} match={match} />
          ))}
        </div>
      </main>
    </div>
  );
}
