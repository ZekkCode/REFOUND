import { NextResponse } from 'next/server';

const mockDetailTemuan: Record<string, {
  id: string;
  title: string;
  zona: string;
  id_zona: string;
  kategori: string;
  deskripsi: string;
  tags: string[];
  image: string;
  hasImage: boolean;
  status: string;
  waktu_penemuan: string;
  pertanyaan_verifikasi: string;
}> = {
  'item-1': {
    id: 'item-1',
    title: 'Laptop Hitam',
    zona: 'Lab Komputer A',
    id_zona: 'lab_tif',
    kategori: 'Elektronik',
    deskripsi: 'Laptop hitam tergeletak di meja Lab Komputer A.',
    tags: ['Elektronik', 'Hitam'],
    image: '/laptop_dark_cafe.png',
    hasImage: true,
    status: 'disimpan_admin',
    waktu_penemuan: '9 Agu 2026, 14:00 WIB',
    pertanyaan_verifikasi: 'Sebutkan merk laptop, warna stiker pada bodi, atau ciri khas lainnya.',
  },
  'item-2': {
    id: 'item-2',
    title: 'Map Dokumen Biru',
    zona: 'Lobi Gedung B',
    id_zona: 'lobi',
    kategori: 'Dokumen',
    deskripsi: 'Map dokumen biru berisi lembar praktikum.',
    tags: ['Dokumen', 'Biru'],
    image: '',
    hasImage: false,
    status: 'disimpan_admin',
    waktu_penemuan: '10 Agu 2026, 09:15 WIB',
    pertanyaan_verifikasi: 'Sebutkan nama lengkap pemilik atau NIM yang tertera di dokumen.',
  },
  'item-3': {
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
    pertanyaan_verifikasi: 'Sebutkan merk mobil atau gantungan kunci yang terpasang.',
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = mockDetailTemuan[id];

  if (!item) {
    return NextResponse.json(
      { sukses: false, error: `Barang temuan dengan ID ${id} tidak ditemukan.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    sukses: true,
    data: item,
  });
}
