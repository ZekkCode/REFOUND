import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET() {
  try {
    // 1. Hitung agregat langsung dari tabel Supabase
    const { count: totalLaporan } = await supabaseKlien
      .from('laporan')
      .select('*', { count: 'exact', head: true });

    const { count: laporanHilang } = await supabaseKlien
      .from('laporan')
      .select('*', { count: 'exact', head: true })
      .eq('tipe', 'kehilangan')
      .in('status', ['diajukan', 'aktif', 'potensi_cocok']);

    const { count: laporanTemuan } = await supabaseKlien
      .from('laporan')
      .select('*', { count: 'exact', head: true })
      .eq('tipe', 'penemuan')
      .in('status', ['diajukan', 'menunggu_validasi', 'aktif']);

    const { count: matchKandidat } = await supabaseKlien
      .from('kecocokan')
      .select('*', { count: 'exact', head: true });

    const { count: klaimProses } = await supabaseKlien
      .from('klaim')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ditinjau_admin');

    const { count: klaimSelesai } = await supabaseKlien
      .from('klaim')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'diambil');

    if (totalLaporan !== null && totalLaporan > 0) {
      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        data: {
          total_laporan: totalLaporan || 0,
          laporan_kehilangan_aktif: laporanHilang || 0,
          laporan_penemuan_aktif: laporanTemuan || 0,
          total_kandidat_cocok: matchKandidat || 0,
          klaim_diproses: klaimProses || 0,
          klaim_selesai: klaimSelesai || 0,
          status_ai: 'live_ready',
          ringkasan_aktivitas: [
            {
              id: 'act-1',
              tipe: 'match_found',
              judul: 'Potensi Cocok AI Ditemukan',
              deskripsi: 'Sistem menemukan kecocokan atribut laporan.',
              waktu: 'Baru saja',
            },
          ],
        },
      });
    }
  } catch (e) {
    console.warn('Dashboard stats query Supabase fallback:', e);
  }

  // Fallback demo stats
  const stats = {
    total_laporan: 2,
    laporan_kehilangan_aktif: 1,
    laporan_penemuan_aktif: 1,
    total_kandidat_cocok: 1,
    klaim_diproses: 1,
    klaim_selesai: 1,
    status_ai: 'live_ready',
    ringkasan_aktivitas: [
      {
        id: 'act-1',
        tipe: 'match_found',
        judul: 'Potensi Cocok AI Ditemukan (86%)',
        deskripsi: 'MacBook Pro 14" cocok dengan temuan di Lab TIF.',
        waktu: '10 menit yang lalu',
      },
      {
        id: 'act-2',
        tipe: 'report_created',
        judul: 'Laporan Kehilangan Dibuat',
        deskripsi: 'Laporan kehilangan MacBook Pro 14" (Space Grey).',
        waktu: '1 jam yang lalu',
      },
    ],
  };

  return NextResponse.json({
    sukses: true,
    sumber_data: 'fallback_lokal',
    data: stats,
  });
}
