import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { verifikasiAdminLab } from '@/pustaka/supabase/auth';

const fallbackAdminAntrean = [
  {
    id: 'lap-temuan-202',
    type: 'found',
    category: 'Elektronik',
    description: 'Flashdisk Sandisk 32GB warna merah ditemukan di koridor',
    zone: 'Koridor Gedung Lab',
    date: '10 Okt 2024, 11:30 WIB',
    status: 'menunggu_validasi',
    reporter: 'Rian Pratama (13519012)',
  },
  {
    id: 'lap-temuan-203',
    type: 'found',
    category: 'Wadah (Tumbler)',
    description: 'Tumbler Corkcicle hitam 750ml tertinggal di lab komputer',
    zone: 'Lab TIF',
    date: '12 Okt 2024, 10:00 WIB',
    status: 'aktif',
    custody_code: 'RAK-B-04',
    reporter: 'Siti Rahma (13519045)',
  },
];

export async function GET(request: Request) {
  // 1. Verifikasi Hak Akses Role Admin Lab (RBAC Guard)
  const cekAdmin = await verifikasiAdminLab(request);
  if (!cekAdmin.terverifikasi) {
    return NextResponse.json(
      { sukses: false, error: cekAdmin.pesanError || 'Akses ditolak: Hanya Admin Lab yang diizinkan.' },
      { status: 403 }
    );
  }

  try {
    // 2. Query data antrean temuan dari Supabase
    const { data: dbData, error } = await supabaseKlien
      .from('laporan')
      .select('*, profil:id_pengguna(nama, nim), zona:id_zona(nama), rahasia_temuan(kode_penitipan)')
      .eq('tipe', 'penemuan')
      .order('dibuat_pada', { ascending: false });

    if (!error && dbData && dbData.length > 0) {
      const dataTerformat = dbData.map((item: any) => ({
        id: item.id,
        type: 'found',
        category: item.kategori,
        description: item.deskripsi_publik,
        zone: item.zona?.nama || item.id_zona,
        date: new Date(item.waktu_kejadian || item.dibuat_pada).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB',
        status: item.status,
        custody_code: item.rahasia_temuan?.kode_penitipan || null,
        reporter: item.profil?.nama ? `${item.profil.nama} (${item.profil.nim})` : 'Mahasiswa Pengguna',
      }));

      return NextResponse.json({
        sukses: true,
        sumber_data: 'supabase_live',
        data: dataTerformat,
      });
    }
  } catch (err) {
    console.warn('Admin antrean laporan Supabase query fallback:', err);
  }

  return NextResponse.json({
    sukses: true,
    sumber_data: 'fallback_lokal',
    data: fallbackAdminAntrean,
  });
}
