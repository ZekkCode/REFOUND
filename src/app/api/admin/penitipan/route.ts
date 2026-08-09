import { NextResponse } from 'next/server';
import { DataValidasiPenitipanDTO } from '@/pustaka/alur-kerja/tipe';

export async function POST(request: Request) {
  try {
    const body: DataValidasiPenitipanDTO = await request.json();

    if (!body.id_laporan || !body.catatan_rahasia || !body.kode_penitipan) {
      return NextResponse.json(
        { sukses: false, error: 'Field id_laporan, catatan_rahasia, dan kode_penitipan wajib diisi.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      sukses: true,
      pesan: `Barang temuan ${body.id_laporan} telah berhasil divalidasi dan disimpan di tempat ${body.kode_penitipan}. Status barang menjadi Disimpan Admin Lab.`,
      data: {
        id_laporan: body.id_laporan,
        kode_penitipan: body.kode_penitipan,
        status: 'aktif',
      },
    });
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
