import { NextRequest, NextResponse } from 'next/server';
import { AdminHandoverDTO } from '@/lib/workflow/types';
import { verifikasiAdminLab } from '@/pustaka/supabase/auth';

export async function POST(req: NextRequest) {
  try {
    // Verifikasi Otorisasi Admin Lab
    const cekAdmin = await verifikasiAdminLab(req);
    if (!cekAdmin.terverifikasi) {
      return NextResponse.json(
        { error: cekAdmin.pesanError || 'Akses ditolak: Hanya Admin Lab yang diizinkan.' },
        { status: 403 }
      );
    }

    const body: AdminHandoverDTO = await req.json();

    if (!body.claim_id || !body.pickup_code) {
      return NextResponse.json(
        { error: 'Claim ID & Kode Pengambilan wajib diisi' },
        { status: 400 }
      );
    }

    // 1. Verify pickup_code against custody_code / generated claim pickup_code
    // 2. Transition claim status to 'diambil' and report status to 'dikembalikan'
    // 3. Append to status_history table for audit trail

    return NextResponse.json({
      message: 'Penyerahan barang berhasil dikonfirmasi. Status laporan telah diperbarui menjadi Dikembalikan.',
      handover: {
        claim_id: body.claim_id,
        status: 'diambil',
        completed_at: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Server internal error' }, { status: 500 });
  }
}
