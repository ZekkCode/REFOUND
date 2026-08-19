import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

const fallbackMatchKandidat = [
  {
    id: 'match-8821',
    lost_report_id: 'lap-hilang-101',
    found_report_id: 'lap-temuan-202',
    skor_teks: 0.88,
    skor_visual: 0.75,
    skor_lokasi: 1.0,
    skor_waktu: 0.9,
    skor_akhir: 0.864,
    status: 'pending',
    found_report: {
      id: 'lap-temuan-202',
      tipe: 'penemuan',
      kategori: 'Laptop & Komputer',
      deskripsi_publik: 'Laptop Silver/Grey (Apple) ditemukan di meja baca Utara Lab TIF.',
      id_zona: 'lab_tif',
      nama_zona: 'Lab TIF',
      waktu_kejadian: '12 Okt 2024, 15:00 WIB',
      status: 'potensi_cocok',
    },
  },
];

export async function GET() {
  try {
    // 1. Query langsung dari tabel Supabase public.kecocokan
    const { data: dbData, error } = await supabaseKlien
      .from('kecocokan')
      .select('*, lost_report:id_laporan_kehilangan(*), found_report:id_laporan_penemuan(*)')
      .order('skor_akhir', { ascending: false });

    if (!error && dbData && dbData.length > 0) {
      const dataTerformat = dbData.map((item: any) => ({
        id: item.id,
        lost_report_id: item.id_laporan_kehilangan,
        found_report_id: item.id_laporan_penemuan,
        skor_teks: item.skor_teks,
        skor_visual: item.skor_visual,
        skor_lokasi: item.skor_lokasi,
        skor_waktu: item.skor_waktu,
        skor_akhir: item.skor_akhir,
        status: item.status,
        found_report: item.found_report,
        lost_report: item.lost_report,
      }));

      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        data: dataTerformat,
      });
    }
  } catch (err) {
    console.error('Supabase query kecocokan error:', err);
  }

  // Fallback demo data jika belum ada kecocokan di Supabase
  return NextResponse.json({
    sukses: true,
    sumber_data: 'fallback_lokal',
    data: fallbackMatchKandidat,
  });
}
