import { NextResponse } from 'next/server';
import { evaluasiJawabanKlaim } from '@/pustaka/ai/pencocokan';
import { DataPengajuanKlaimDTO } from '@/pustaka/alur-kerja/tipe';

export async function POST(request: Request) {
  try {
    const body: DataPengajuanKlaimDTO = await request.json();

    if (!body.id_pencocokan || !body.jawaban_rahasia) {
      return NextResponse.json(
        { sukses: false, error: 'Field id_pencocokan dan jawaban_rahasia wajib diisi.' },
        { status: 400 }
      );
    }

    // Evaluasi AI Semantik
    const catatanRahasiaAdmin = 'Stiker logo Mac warna putih di bagian samping dekat dasar tumbler';
    const hasilEvaluasi = await evaluasiJawabanKlaim(catatanRahasiaAdmin, body.jawaban_rahasia);

    const klaimBaru = {
      id: `claim-${Date.now().toString().slice(-4)}`,
      match_id: body.id_pencocokan,
      claimant_id: 'usr-mhs-current',
      jawaban: body.jawaban_rahasia,
      skor_semantik_ai: hasilEvaluasi.skorSemantik,
      alasan_analisis_ai: hasilEvaluasi.alasanAnalisis,
      status: 'ditinjau_admin',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        sukses: true,
        pesan: 'Jawaban klaim berhasil dikirim! Admin Lab akan meninjau jawaban dan menentukan kepemilikan.',
        data: klaimBaru,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
