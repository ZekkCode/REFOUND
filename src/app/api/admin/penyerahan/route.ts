import { NextResponse } from 'next/server';
import { DataPenyerahanAdminDTO } from '@/pustaka/alur-kerja/tipe';

export async function POST(request: Request) {
  try {
    const body: DataPenyerahanAdminDTO = await request.json();

    if (!body.id_klaim || !body.kode_pengambilan) {
      return NextResponse.json(
        { sukses: false, error: 'Field id_klaim dan kode_pengambilan wajib diisi.' },
        { status: 400 }
      );
    }

    // Mock verifikasi kode single-use
    if (body.kode_pengambilan.toUpperCase().includes('AMBIL') || body.kode_pengambilan.toUpperCase().includes('PICK')) {
      return NextResponse.json({
        sukses: true,
        pesan: `Verifikasi kode ${body.kode_pengambilan} BERHASIL! Barang telah diserahkan kepada pemilik resmi dan status kasus telah DITUTUP (Dikembalikan).`,
        data: {
          id_klaim: body.id_klaim,
          status: 'diambil',
          timestamp: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json(
      { sukses: false, error: 'Kode pengambilan tidak valid atau sudah pernah digunakan!' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
