import { NextResponse } from 'next/server';
import { DataLaporanBaruDTO, ItemLaporan } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB } from '@/pustaka/alur-kerja/katalog';

// Mock in-memory DB untuk demo cepat & tes fungsional
const mockLaporanDB: ItemLaporan[] = [
  {
    id: 'lap-hilang-101',
    user_id: 'usr-mhs-001',
    tipe: 'kehilangan',
    kategori: 'Wadah (Tumbler)',
    deskripsi_publik: 'Tumbler Corkcicle hitam 750ml ketinggalan di lab komputer TIF',
    id_zona: 'lab_tif',
    nama_zona: 'Lab TIF',
    waktu_kejadian: '9 Agu 2026, 10:00 WIB',
    status: 'potensi_cocok',
    id_pencocokan_kandidat: 'match-8821',
  },
  {
    id: 'lap-temuan-202',
    user_id: 'usr-mhs-002',
    tipe: 'penemuan',
    kategori: 'Elektronik',
    deskripsi_publik: 'Flashdisk Sandisk 32GB warna merah ditemukan di koridor',
    id_zona: 'koridor',
    nama_zona: 'Koridor Gedung Lab',
    waktu_kejadian: '9 Agu 2026, 11:30 WIB',
    status: 'aktif',
  },
];

export async function GET() {
  return NextResponse.json({
    sukses: true,
    data: mockLaporanDB,
  });
}

export async function POST(request: Request) {
  try {
    const body: DataLaporanBaruDTO = await request.json();

    if (!body.kategori || !body.deskripsi_publik || !body.id_zona || !body.waktu_kejadian) {
      return NextResponse.json(
        { sukses: false, error: 'Semua field wajib diisi (kategori, deskripsi_publik, id_zona, waktu_kejadian).' },
        { status: 400 }
      );
    }

    const zonaObj = DAFTAR_ZONA_LAB.find((z) => z.id === body.id_zona);
    const idBaru = `lap-${body.tipe}-${Date.now().toString().slice(-4)}`;

    const laporanBaru: ItemLaporan = {
      id: idBaru,
      user_id: 'usr-mhs-current',
      tipe: body.tipe,
      kategori: body.kategori,
      deskripsi_publik: body.deskripsi_publik,
      id_zona: body.id_zona,
      nama_zona: zonaObj?.nama || body.id_zona,
      waktu_kejadian: body.waktu_kejadian,
      status: body.tipe === 'penemuan' ? 'menunggu_validasi' : 'aktif',
      url_foto: body.url_foto,
      created_at: new Date().toISOString(),
    };

    mockLaporanDB.unshift(laporanBaru);

    return NextResponse.json(
      {
        sukses: true,
        pesan: body.tipe === 'penemuan'
          ? 'Laporan penemuan berhasil disimpan! Silakan serahkan barang fisik ke Admin Lab.'
          : 'Laporan kehilangan berhasil dibuat dan sedang diproses oleh AI Matching Engine.',
        data: laporanBaru,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
