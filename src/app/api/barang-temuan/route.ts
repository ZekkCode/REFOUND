import { NextRequest, NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export interface ItemBarangTemuanPublik {
  id: string;
  title: string;
  zona: string;
  id_zona: string;
  kategori: string;
  deskripsi: string;
  tags: string[];
  image: string;
  hasImage: boolean;
  status: 'disimpan_admin' | 'aktif' | 'potensi_cocok';
  waktu_penemuan: string;
}

const mockKatalogTemuan: ItemBarangTemuanPublik[] = [
  {
    id: 'item-1',
    title: 'Laptop Hitam',
    zona: 'Lab Komputer A',
    id_zona: 'lab_tif',
    kategori: 'Elektronik',
    deskripsi: 'Laptop hitam tergeletak di meja Lab Komputer A dekat stopkontak dinding.',
    tags: ['Elektronik', 'Hitam'],
    image: '/laptop_dark_cafe.png',
    hasImage: true,
    status: 'disimpan_admin',
    waktu_penemuan: '9 Agu 2026, 14:00 WIB',
  },
  {
    id: 'item-2',
    title: 'Map Dokumen Biru',
    zona: 'Lobi Gedung B',
    id_zona: 'lobi',
    kategori: 'Dokumen',
    deskripsi: 'Map dokumen biru berisi berkas tugas dan lembar praktikum.',
    tags: ['Dokumen', 'Biru'],
    image: '',
    hasImage: false,
    status: 'disimpan_admin',
    waktu_penemuan: '10 Agu 2026, 09:15 WIB',
  },
  {
    id: 'item-3',
    title: 'Kunci Mobil',
    zona: 'Area Parkir C',
    id_zona: 'koridor',
    kategori: 'Lainnya',
    deskripsi: 'Gantungan kunci mobil dengan remote alarm hitam.',
    tags: ['Lainnya'],
    image: '/kunci_mobil.png',
    hasImage: true,
    status: 'disimpan_admin',
    waktu_penemuan: '11 Agu 2026, 16:45 WIB',
  },
  {
    id: 'item-4',
    title: 'Flashdisk Sandisk 32GB',
    zona: 'Lab SI',
    id_zona: 'lab_si',
    kategori: 'Elektronik',
    deskripsi: 'Flashdisk warna merah hitam tertancap di CPU PC 08.',
    tags: ['Elektronik', 'Merah'],
    image: '',
    hasImage: false,
    status: 'disimpan_admin',
    waktu_penemuan: '12 Agu 2026, 11:20 WIB',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  const kategori = searchParams.get('kategori') || 'Semua';
  const zona = searchParams.get('zona') || 'Semua';

  try {
    // Query ke tabel Supabase public.laporan dengan tipe = 'penemuan'
    let query = supabaseKlien
      .from('laporan')
      .select('*, zona:id_zona(nama)')
      .eq('tipe', 'penemuan')
      .order('dibuat_pada', { ascending: false });

    if (kategori && kategori !== 'Semua') {
      query = query.ilike('kategori', `%${kategori}%`);
    }

    const { data: dbData, error } = await query;

    if (!error && dbData && dbData.length > 0) {
      let hasilSupabase: ItemBarangTemuanPublik[] = dbData.map((item: any) => {
        const lines = (item.deskripsi_publik || '').split('\n');
        const namaBaris = lines.find((l: string) => l.startsWith('Nama Barang: '))?.replace('Nama Barang: ', '') || item.kategori;
        return {
          id: item.id,
          title: namaBaris,
          zona: item.zona?.nama || item.id_zona || 'Lab Kampus',
          id_zona: item.id_zona,
          kategori: item.kategori,
          deskripsi: item.deskripsi_publik,
          tags: [item.kategori, item.zona?.nama || 'Lab'],
          image: item.url_foto_utama || '',
          hasImage: Boolean(item.url_foto_utama),
          status: item.status === 'aktif' ? 'aktif' : 'disimpan_admin',
          waktu_penemuan: new Date(item.waktu_kejadian || item.dibuat_pada).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' WIB',
        };
      });

      if (q) {
        hasilSupabase = hasilSupabase.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.deskripsi.toLowerCase().includes(q) ||
            item.zona.toLowerCase().includes(q) ||
            item.kategori.toLowerCase().includes(q)
        );
      }

      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        total: hasilSupabase.length,
        data: hasilSupabase,
      });
    }
  } catch (err) {
    console.error('Supabase fetch barang-temuan error, menggunakan fallback:', err);
  }

  // Fallback lokal jika tabel database masih kosong
  let hasil = [...mockKatalogTemuan];

  if (q) {
    hasil = hasil.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q) ||
        item.zona.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q)
    );
  }

  if (kategori && kategori !== 'Semua') {
    hasil = hasil.filter((item) => item.kategori.toLowerCase() === kategori.toLowerCase());
  }

  if (zona && zona !== 'Semua') {
    hasil = hasil.filter((item) => item.id_zona === zona || item.zona.toLowerCase().includes(zona.toLowerCase()));
  }

  return NextResponse.json({
    sukses: true,
    sumber_data: 'fallback_lokal',
    total: hasil.length,
    data: hasil,
  });
}
