import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET() {
  try {
    // 1. Fetch counts from database
    const { count: totalInventory } = await supabaseKlien
      .from('laporan')
      .select('*', { count: 'exact', head: true });

    const { count: pendingClaims } = await supabaseKlien
      .from('klaim')
      .select('*', { count: 'exact', head: true })
      .in('status', ['diajukan', 'ditinjau_admin']);

    const { count: successfulReturns } = await supabaseKlien
      .from('klaim')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'diambil');

    // 2. Fetch verification queue (claims that need admin review)
    const { data: dbClaims } = await supabaseKlien
      .from('klaim')
      .select(`
        id,
        status,
        jawaban,
        dibuat_pada,
        kecocokan:id_kecocokan (
          laporan_penemuan:id_laporan_penemuan (
            id,
            kategori,
            deskripsi_publik
          )
        ),
        pemohon:id_pemohon (
          id,
          nama,
          nim,
          program_studi
        )
      `)
      .in('status', ['diajukan', 'ditinjau_admin'])
      .order('dibuat_pada', { ascending: false })
      .limit(5);

    // 3. Fetch recent reports
    const { data: dbReports } = await supabaseKlien
      .from('laporan')
      .select('*')
      .order('waktu_kejadian', { ascending: false })
      .limit(5);

    // 4. Fetch handover queue (approved claims awaiting pickup)
    const { data: dbHandovers } = await supabaseKlien
      .from('klaim')
      .select(`
        id,
        status,
        kode_pengambilan,
        kecocokan:id_kecocokan (
          laporan_penemuan:id_laporan_penemuan (
            id,
            kategori,
            deskripsi_publik
          )
        ),
        pemohon:id_pemohon (
          id,
          nama,
          nim
        )
      `)
      .eq('status', 'disetujui')
      .limit(5);

    const stats = {
      total_inventory: totalInventory || 0,
      pending_claims: pendingClaims || 0,
      successful_returns: successfulReturns || 0,
    };

    const formattedQueue = dbClaims ? dbClaims.map((item: any) => {
      const lap = item.kecocokan?.laporan_penemuan;
      return {
        id: item.id,
        item_name: lap?.deskripsi_publik?.split('\n')[0].replace('Nama Barang: ', '') || lap?.kategori || 'Barang Hilang',
        claim_id: item.id.slice(0, 6).toUpperCase(),
        status: item.status,
        claimed_by: `${item.pemohon?.nama || 'Mahasiswa'} (${item.pemohon?.program_studi || 'UTM'})`,
      };
    }) : [];

    const formattedReports = dbReports ? dbReports.map((item: any) => ({
      id: item.id,
      title: item.deskripsi_publik?.split('\n')[0].replace('Nama Barang: ', '') || item.kategori,
      tipe: item.tipe,
      waktu: item.waktu_kejadian,
    })) : [];

    const formattedHandovers = dbHandovers ? dbHandovers.map((item: any) => {
      const lap = item.kecocokan?.laporan_penemuan;
      return {
        id: item.id,
        item_name: lap?.deskripsi_publik?.split('\n')[0].replace('Nama Barang: ', '') || lap?.kategori || 'Barang Hilang',
        claimed_by: item.pemohon?.nama || 'Mahasiswa',
        otp: item.kode_pengambilan || 'XXXX',
      };
    }) : [];

    const activityLog = [
      {
        id: 'act-1',
        tipe: 'item_returned',
        judul: 'Barang Dikembalikan',
        deskripsi: 'Botol air minum diserahkan kembali ke pemilik.',
        waktu: '10 menit yang lalu',
        pelaku: 'Admin Lab',
      },
      {
        id: 'act-2',
        tipe: 'new_item',
        judul: 'Barang Baru Tercatat',
        deskripsi: 'Payung hitam temuan di Lab B dimasukkan ke loker penyimpanan.',
        waktu: '45 menit yang lalu',
        pelaku: 'Staf Lab',
      },
      {
        id: 'act-3',
        tipe: 'system_sync',
        judul: 'Sinkronisasi Sistem',
        deskripsi: 'Sinkronisasi otomatis inventaris selesai dilakukan.',
        waktu: '2 jam yang lalu',
        pelaku: 'Sistem',
      }
    ];

    if (totalInventory !== null && totalInventory > 0) {
      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        data: {
          stats,
          verificationQueue: formattedQueue,
          recentReports: formattedReports,
          handoverQueue: formattedHandovers,
          activityLog,
        },
      });
    }
  } catch (e) {
    console.warn('Dashboard admin API query Supabase fallback:', e);
  }

  // Fallback demo admin data (Indonesian)
  const fallbackData = {
    stats: {
      total_inventory: 142,
      pending_claims: 18,
      successful_returns: 45,
    },
    verificationQueue: [
      {
        id: 'cl-089',
        item_name: 'Charger MacBook Pro',
        claim_id: 'CL-089',
        status: 'awaiting_verif',
        claimed_by: 'Budi S. (Teknik Informatika)',
      },
      {
        id: 'cl-092',
        item_name: 'Buku Kalkulus Lanjut',
        claim_id: 'CL-092',
        status: 'awaiting_verif',
        claimed_by: 'Ani K. (Sistem Informasi)',
      },
    ],
    recentReports: [
      {
        id: 'lap-1',
        title: 'Charger MacBook Pro',
        tipe: 'penemuan',
        waktu: '12 Okt 2024',
      },
      {
        id: 'lap-2',
        title: 'Buku Kalkulus Lanjut',
        tipe: 'kehilangan',
        waktu: '11 Okt 2024',
      }
    ],
    handoverQueue: [
      {
        id: 'ho-1',
        item_name: 'Charger MacBook Pro',
        claimed_by: 'Budi S.',
        otp: '8821',
      }
    ],
    activityLog: [
      {
        id: 'act-1',
        tipe: 'item_returned',
        judul: 'Barang Dikembalikan',
        deskripsi: 'Botol air minum diserahkan kembali ke pemilik.',
        waktu: '10 menit yang lalu',
        pelaku: 'Admin Lab',
      },
      {
        id: 'act-2',
        tipe: 'new_item',
        judul: 'Barang Baru Tercatat',
        deskripsi: 'Payung hitam temuan di Lab B dimasukkan ke loker penyimpanan.',
        waktu: '45 menit yang lalu',
        pelaku: 'Staf Lab',
      },
      {
        id: 'act-3',
        tipe: 'sinkronisasi_sistem',
        judul: 'Sinkronisasi Sistem',
        deskripsi: 'Sinkronisasi otomatis inventaris selesai dilakukan.',
        waktu: '2 jam yang lalu',
        pelaku: 'Sistem',
      },
    ],
  };

  return NextResponse.json({
    sukses: true,
    sumber_data: 'fallback_lokal',
    data: fallbackData,
  });
}
