import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export async function GET() {
  try {
    const { data: notifDb } = await supabaseKlien
      .from('notifikasi')
      .select('*')
      .order('dibuat_pada', { ascending: false })
      .limit(10);

    if (notifDb && notifDb.length > 0) {
      const belumDibaca = notifDb.filter((n) => !n.sudah_dibaca).length;
      return NextResponse.json({
        sukses: true,
        data: notifDb,
        jumlah_belum_dibaca: belumDibaca,
      });
    }
  } catch (e) {
    console.warn('Fallback notifikasi lokal:', e);
  }

  // Mock initial notifications
  const mockNotifikasi = [
    {
      id: 'notif-1',
      judul: 'Potensi Cocok Ditemukan (86%)',
      pesan: 'AI menemukan MacBook Pro 14" mirip dengan laporan kehilangan Anda di Lab TIF.',
      tipe: 'match_ditemukan',
      sudah_dibaca: false,
      dibuat_pada: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      tautan: '/kecocokan',
    },
    {
      id: 'notif-2',
      judul: 'Laporan Diterima Petugas Lab',
      pesan: 'Laporan barang temuan Anda (Flashdisk SanDisk 32GB) telah diamankan di Loker Admin.',
      tipe: 'status_diperbarui',
      sudah_dibaca: false,
      dibuat_pada: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      tautan: '/dashboard',
    },
    {
      id: 'notif-3',
      judul: 'Sistem Keamanan Aktif',
      pesan: 'Verifikasi kepemilikan 2-langkah siap digunakan untuk mengamankan klaim.',
      tipe: 'info',
      sudah_dibaca: true,
      dibuat_pada: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      tautan: '/profil',
    },
  ];

  return NextResponse.json({
    sukses: true,
    data: mockNotifikasi,
    jumlah_belum_dibaca: 2,
  });
}

export async function PATCH() {
  return NextResponse.json({
    sukses: true,
    pesan: 'Semua notifikasi telah ditandai sebagai dibaca.',
  });
}
