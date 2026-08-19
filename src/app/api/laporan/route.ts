import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { DataLaporanBaruDTO, ItemLaporan } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB } from '@/pustaka/alur-kerja/katalog';

// Fallback seed data jika Supabase belum diisi
const fallbackLaporanDB: ItemLaporan[] = [
  {
    id: 'lap-hilang-101',
    user_id: 'usr-mhs-001',
    tipe: 'kehilangan',
    kategori: 'Laptop & Komputer',
    deskripsi_publik: 'MacBook Pro 14" (Space Grey) hilang di Lab TIF.',
    id_zona: 'lab_tif',
    nama_zona: 'Lab TIF',
    waktu_kejadian: '12 Okt 2024, 14:30 WIB',
    status: 'potensi_cocok',
    id_pencocokan_kandidat: 'match-8821',
  },
  {
    id: 'lap-temuan-202',
    user_id: 'usr-mhs-002',
    tipe: 'penemuan',
    kategori: 'Elektronik',
    deskripsi_publik: 'Flashdisk SanDisk Cruzer 32GB warna merah hitam ditemukan di koridor.',
    id_zona: 'koridor',
    nama_zona: 'Koridor Gedung Lab',
    waktu_kejadian: '10 Okt 2024, 11:30 WIB',
    status: 'aktif',
  },
];

export async function GET() {
  try {
    // 1. Ambil data langsung dari tabel Supabase: public.laporan
    const { data, error } = await supabaseKlien
      .from('laporan')
      .select('*, profil:id_pengguna(nama, nim), zona:id_zona(nama)')
      .order('dibuat_pada', { ascending: false });

    if (!error && data && data.length > 0) {
      const dataTerformat: ItemLaporan[] = data.map((item: any) => ({
        id: item.id,
        user_id: item.id_pengguna,
        tipe: item.tipe,
        kategori: item.kategori,
        deskripsi_publik: item.deskripsi_publik,
        id_zona: item.id_zona,
        nama_zona: item.zona?.nama || item.id_zona,
        waktu_kejadian: item.waktu_kejadian,
        status: item.status,
        url_foto: item.url_foto_utama,
        created_at: item.dibuat_pada,
      }));

      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        data: dataTerformat,
      });
    }

    // Fallback jika database remote masih kosong
    return NextResponse.json({
      sukses: true,
      sumber_data: 'fallback_lokal',
      data: fallbackLaporanDB,
    });
  } catch (err) {
    console.error('Supabase query laporan error:', err);
    return NextResponse.json({
      sukses: true,
      sumber_data: 'fallback_lokal',
      data: fallbackLaporanDB,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body: DataLaporanBaruDTO = await request.json();

    if (!body.kategori || !body.deskripsi_publik || !body.id_zona || !body.waktu_kejadian) {
      return NextResponse.json(
        { sukses: false, error: 'Semua kolom wajib diisi (kategori, deskripsi_publik, id_zona, waktu_kejadian).' },
        { status: 400 }
      );
    }

    const zonaObj = DAFTAR_ZONA_LAB.find((z) => z.id === body.id_zona);
    const statusAwal = body.tipe === 'penemuan' ? 'menunggu_validasi' : 'aktif';

    // Dapatkan sesi user jika ada
    const { data: authData } = await supabaseKlien.auth.getUser();
    const userId = authData?.user?.id || '00000000-0000-0000-0000-000000000001';

    // 1. Simpan ke tabel Supabase public.laporan
    const { data: dbResult, error: dbError } = await supabaseKlien
      .from('laporan')
      .insert({
        id_pengguna: userId,
        tipe: body.tipe,
        kategori: body.kategori,
        deskripsi_publik: body.deskripsi_publik,
        id_zona: body.id_zona,
        waktu_kejadian: body.waktu_kejadian,
        status: statusAwal,
        url_foto_utama: body.url_foto || null,
      })
      .select()
      .single();

    if (!dbError && dbResult) {
      return NextResponse.json(
        {
          sukses: true,
          sumber_data: 'supabase_live',
          pesan: body.tipe === 'penemuan'
            ? 'Laporan penemuan berhasil disimpan di Supabase! Silakan serahkan barang fisik ke Admin Lab.'
            : 'Laporan kehilangan berhasil disimpan di Supabase dan sedang diproses oleh AI Matching Engine.',
          data: dbResult,
        },
        { status: 201 }
      );
    }

    // Fallback in-memory
    const idBaru = `lap-${body.tipe}-${Date.now().toString().slice(-4)}`;
    const laporanBaru: ItemLaporan = {
      id: idBaru,
      user_id: userId,
      tipe: body.tipe,
      kategori: body.kategori,
      deskripsi_publik: body.deskripsi_publik,
      id_zona: body.id_zona,
      nama_zona: zonaObj?.nama || body.id_zona,
      waktu_kejadian: body.waktu_kejadian,
      status: statusAwal,
      url_foto: body.url_foto,
      created_at: new Date().toISOString(),
    };

    fallbackLaporanDB.unshift(laporanBaru);

    return NextResponse.json(
      {
        sukses: true,
        sumber_data: 'fallback_lokal',
        pesan: body.tipe === 'penemuan'
          ? 'Laporan penemuan berhasil disimpan! Silakan serahkan barang fisik ke Admin Lab.'
          : 'Laporan kehilangan berhasil dibuat dan sedang diproses oleh AI Matching Engine.',
        data: laporanBaru,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error saat menyimpan laporan ke Supabase:', err);
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
