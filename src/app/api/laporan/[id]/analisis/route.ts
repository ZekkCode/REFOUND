import { NextResponse } from 'next/server';
import { hitungSkorPencocokan } from '@/pustaka/ai/pencocokan';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulasi pencocokan AI
  const hasilMatch = hitungSkorPencocokan(0.88, 0.75, true, 4);

  return NextResponse.json({
    sukses: true,
    id_laporan: id,
    analisis_ai: hasilMatch,
    pesan: 'Analisis AI Vector Similarity berhasil dihitung.',
  });
}
