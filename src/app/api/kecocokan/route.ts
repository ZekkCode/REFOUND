import { NextResponse } from 'next/server';

const mockMatchKandidat = [
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
      kategori: 'Wadah (Tumbler)',
      deskripsi_publik: 'Tumbler Corkcicle warna hitam 750ml ditemukan di meja lab komputer 3.',
      id_zona: 'lab_tif',
      nama_zona: 'Lab TIF',
      waktu_kejadian: '9 Agu 2026, 09:30 WIB',
      status: 'potensi_cocok',
    },
  },
];

export async function GET() {
  return NextResponse.json({
    sukses: true,
    data: mockMatchKandidat,
  });
}
