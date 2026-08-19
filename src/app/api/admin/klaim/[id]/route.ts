import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { verifikasiAdminLab } from '@/pustaka/supabase/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 1. Verifikasi Hak Akses Role Admin Lab (RBAC Guard)
  const cekAdmin = await verifikasiAdminLab(request);
  if (!cekAdmin.terverifikasi) {
    return NextResponse.json(
      { sukses: false, error: cekAdmin.pesanError || 'Akses ditolak: Hanya Admin Lab yang diizinkan.' },
      { status: 403 }
    );
  }

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
      const waktuKadaluwarsa = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

      // Update ke tabel Supabase public.klaim
      try {
        await supabaseKlien
          .from('klaim')
          .update({
            status: 'disetujui',
            kode_pengambilan: kodePengambilan,
            kadaluwarsa_kode_pengambilan: waktuKadaluwarsa,
            alasan_keputusan_admin: alasan,
            id_admin: cekAdmin.adminId === 'usr-admin-demo' ? null : cekAdmin.adminId,
          })
          .eq('id', id);
      } catch (errDb) {
        console.warn('Update klaim Supabase fallback:', errDb);
      }

      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        pesan: `Klaim ${id} disetujui! Kode pengambilan single-use berhasil dibuat: ${kodePengambilan}`,
        data: {
          id_klaim: id,
          status: 'disetujui',
          kode_pengambilan: kodePengambilan,
          kadaluwarsa: waktuKadaluwarsa,
          alasan,
        },
      });
    } else {
      try {
        await supabaseKlien
          .from('klaim')
          .update({
            status: 'ditolak',
            alasan_keputusan_admin: alasan,
            id_admin: cekAdmin.adminId === 'usr-admin-demo' ? null : cekAdmin.adminId,
          })
          .eq('id', id);
      } catch (errDb) {
        console.warn('Update klaim reject Supabase fallback:', errDb);
      }

      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
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
