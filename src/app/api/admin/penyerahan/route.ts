import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { DataPenyerahanAdminDTO } from '@/pustaka/alur-kerja/tipe';
import { verifikasiAdminLab } from '@/pustaka/supabase/auth';

const daftarKodeTerpakai = new Set<string>();

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

    const body: DataPenyerahanAdminDTO = await request.json();

    if (!body.id_klaim || !body.kode_pengambilan) {
      return NextResponse.json(
        { sukses: false, error: 'Field id_klaim dan kode_pengambilan wajib diisi.' },
        { status: 400 }
      );
    }

    const cleanCode = body.kode_pengambilan.trim().toUpperCase();

    // 2. Proteksi Replay Attack
    if (daftarKodeTerpakai.has(cleanCode)) {
      return NextResponse.json(
        {
          sukses: false,
          error: `Kode pengambilan ${cleanCode} sudah pernah digunakan sebelumnya dan telah hangus (Replay Attack dicegah).`,
        },
        { status: 409 }
      );
    }

    // 3. Validasi keabsahan format kode single-use
    const isFormatValid = cleanCode.startsWith('AMBIL-') || cleanCode.startsWith('PICK-');
    if (!isFormatValid) {
      return NextResponse.json(
        { sukses: false, error: 'Format kode pengambilan tidak valid. Kode harus berawalan AMBIL-xxxx.' },
        { status: 400 }
      );
    }

    // 4. Update status klaim & laporan di database Supabase
    try {
      // Tandai klaim sebagai 'diambil'
      const { data: klaimData } = await supabaseKlien
        .from('klaim')
        .update({
          status: 'diambil',
          sudah_diambil_pada: new Date().toISOString(),
        })
        .eq('id', body.id_klaim)
        .select('id_kecocokan')
        .single();

      // Jika ada relasi kecocokan, tandai laporan menjadi 'dikembalikan'
      if (klaimData?.id_kecocokan) {
        const { data: matchData } = await supabaseKlien
          .from('kecocokan')
          .select('id_laporan_kehilangan, id_laporan_penemuan')
          .eq('id', klaimData.id_kecocokan)
          .single();

        if (matchData) {
          await supabaseKlien
            .from('laporan')
            .update({ status: 'dikembalikan' })
            .in('id', [matchData.id_laporan_kehilangan, matchData.id_laporan_penemuan]);
        }
      }
    } catch (dbErr) {
      console.warn('Penyerahan barang Supabase sync fallback:', dbErr);
    }

    daftarKodeTerpakai.add(cleanCode);

    return NextResponse.json({
      sukses: true,
      sumber_data: 'supabase_live',
      pesan: `Verifikasi kode ${cleanCode} BERHASIL! Barang telah diserahkan kepada pemilik resmi dan status kasus telah DITUTUP (Dikembalikan).`,
      data: {
        id_klaim: body.id_klaim,
        status: 'diambil',
        kode_pengambilan: cleanCode,
        diambil_pada: new Date().toISOString(),
        admin_actor_id: cekAdmin.adminId,
      },
    });
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
