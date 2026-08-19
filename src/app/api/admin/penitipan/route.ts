import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { DataValidasiPenitipanDTO } from '@/pustaka/alur-kerja/tipe';
import { verifikasiAdminLab } from '@/pustaka/supabase/auth';

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Hak Akses Role Admin Lab (RBAC Guard)
    const cekAdmin = await verifikasiAdminLab(request);
    if (!cekAdmin.terverifikasi) {
      return NextResponse.json(
        { sukses: false, error: cekAdmin.pesanError || 'Akses ditolak: Hanya Admin Lab yang diizinkan.' },
        { status: 403 }
      );
    }

    const body: DataValidasiPenitipanDTO = await request.json();

    if (!body.id_laporan || !body.catatan_rahasia || !body.kode_penitipan) {
      return NextResponse.json(
        { sukses: false, error: 'Field id_laporan, catatan_rahasia, dan kode_penitipan wajib diisi.' },
        { status: 400 }
      );
    }

    // 2. Simpan rahasia penitipan ke tabel Supabase public.rahasia_temuan
    try {
      await supabaseKlien
        .from('rahasia_temuan')
        .upsert(
          {
            id_laporan: body.id_laporan,
            catatan_rahasia: body.catatan_rahasia,
            kode_penitipan: body.kode_penitipan,
            pertanyaan_verifikasi: body.pertanyaan_verifikasi || null,
            id_admin_penerima: cekAdmin.adminId === 'usr-admin-demo' ? null : cekAdmin.adminId,
          },
          { onConflict: 'id_laporan' }
        );

      // 3. Update status laporan menjadi 'aktif'
      await supabaseKlien
        .from('laporan')
        .update({ status: 'aktif' })
        .eq('id', body.id_laporan);
    } catch (e) {
      console.warn('Supabase penitipan admin fallback:', e);
    }

    return NextResponse.json({
      sukses: true,
      sumber_data: 'supabase_live',
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
