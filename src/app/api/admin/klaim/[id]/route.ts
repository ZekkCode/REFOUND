import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { setujui, alasan } = body;

    if (setujui === undefined || !alasan) {
      return NextResponse.json(
        { sukses: false, error: 'Keputusan (setujui: boolean) dan alasan wajib diisi.' },
        { status: 400 }
      );
    }

    if (setujui) {
      const kodePengambilan = `AMBIL-${Math.floor(1000 + Math.random() * 9000)}`;
      return NextResponse.json({
        sukses: true,
        pesan: `Klaim ${id} disetujui! Kode pengambilan single-use berhasil dibuat: ${kodePengambilan}`,
        data: {
          id_klaim: id,
          status: 'disetujui',
          kode_pengambilan: kodePengambilan,
          alasan,
        },
      });
    } else {
      return NextResponse.json({
        sukses: true,
        pesan: `Klaim ${id} telah ditolak dengan alasan: "${alasan}"`,
        data: {
          id_klaim: id,
          status: 'ditolak',
          alasan,
        },
      });
    }
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
