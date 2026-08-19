import { ZonaGedung, StatusLaporan, StatusKlaim } from './tipe';

export const DAFTAR_ZONA_LAB: ZonaGedung[] = [
  { id: 'lab_tif', nama: 'Lab TIF', deskripsi: 'Laboratorium Teknik Informatika' },
  { id: 'lab_si', nama: 'Lab SI', deskripsi: 'Laboratorium Sistem Informasi' },
  { id: 'koridor', nama: 'Koridor Gedung Lab', deskripsi: 'Koridor utama lantai gedung' },
  { id: 'tangga', nama: 'Area Tangga', deskripsi: 'Tangga antar lantai gedung' },
  { id: 'lobi', nama: 'Lobi Utama Lab', deskripsi: 'Lobi pintu masuk gedung lab' },
  { id: 'ruang_admin', nama: 'Ruang Admin Lab', deskripsi: 'Ruang pengelolaan & penitipan barang' },
];

export const KATEGORI_BARANG = [
  'Elektronik (Laptop, Flashdisk, Charger, TWS, HP)',
  'Aksesoris (Kacamata, Jam Tangan, Perhiasan, Topi)',
  'Dokumen (KTM, KTP, STNK, Buku Catatan, Map)',
  'Wadah (Tumbler, Tas, Dompet, Jaket, Pouch)',
  'Lainnya',
];

/**
 * Palet Warna Status Sesuai Standar AGENTS.md:
 * - Gray #9CA3AF → Diajukan / Kedaluwarsa
 * - Amber #F59E0B → Menunggu Validasi / Penyerahan
 * - Blue #3B82F6 → Aktif / Sedang Dianalisis
 * - Indigo #6366F1 → Potensi Cocok / Klaim Ditinjau
 * - Green #10B981 → Disimpan Admin / Disetujui / Dikembalikan
 * - Red #EF4444 → Ditolak
 */

export const LABEL_STATUS_LAPORAN: Record<StatusLaporan, { label: string; kelasWarna: string }> = {
  diajukan: { 
    label: 'Diajukan', 
    kelasWarna: 'bg-gray-100 text-[#4B5563] border border-[#9CA3AF]/40' 
  },
  menunggu_validasi: { 
    label: 'Menunggu Validasi Admin', 
    kelasWarna: 'bg-amber-50 text-[#B45309] border border-[#F59E0B]/40' 
  },
  aktif: { 
    label: 'Aktif Diproses AI', 
    kelasWarna: 'bg-blue-50 text-[#1D4ED8] border border-[#3B82F6]/40' 
  },
  potensi_cocok: { 
    label: 'Potensi Cocok AI', 
    kelasWarna: 'bg-indigo-50 text-[#4338CA] border border-[#6366F1]/40' 
  },
  diklaim: { 
    label: 'Proses Klaim', 
    kelasWarna: 'bg-indigo-50 text-[#4338CA] border border-[#6366F1]/40' 
  },
  dikembalikan: { 
    label: 'Dikembalikan ke Pemilik', 
    kelasWarna: 'bg-emerald-50 text-[#047857] border border-[#10B981]/40' 
  },
  ditolak: { 
    label: 'Ditolak', 
    kelasWarna: 'bg-rose-50 text-[#B91C1C] border border-[#EF4444]/40' 
  },
  kedaluwarsa: { 
    label: 'Kedaluwarsa', 
    kelasWarna: 'bg-gray-100 text-[#4B5563] border border-[#9CA3AF]/40' 
  },
};

export const LABEL_STATUS_KLAIM: Record<StatusKlaim, { label: string; kelasWarna: string }> = {
  diajukan: { 
    label: 'Klaim Diajukan', 
    kelasWarna: 'bg-gray-100 text-[#4B5563] border border-[#9CA3AF]/40' 
  },
  menunggu_jawaban: { 
    label: 'Menunggu Jawaban Verifikasi', 
    kelasWarna: 'bg-amber-50 text-[#B45309] border border-[#F59E0B]/40' 
  },
  ditinjau_admin: { 
    label: 'Klaim Ditinjau Admin', 
    kelasWarna: 'bg-indigo-50 text-[#4338CA] border border-[#6366F1]/40' 
  },
  disetujui: { 
    label: 'Klaim Disetujui (Siap Ambil)', 
    kelasWarna: 'bg-emerald-50 text-[#047857] border border-[#10B981]/40' 
  },
  diambil: { 
    label: 'Barang Sudah Diambil', 
    kelasWarna: 'bg-emerald-50 text-[#047857] border border-[#10B981]/40' 
  },
  ditolak: { 
    label: 'Klaim Ditolak', 
    kelasWarna: 'bg-rose-50 text-[#B91C1C] border border-[#EF4444]/40' 
  },
  dibatalkan: { 
    label: 'Klaim Dibatalkan', 
    kelasWarna: 'bg-gray-100 text-[#4B5563] border border-[#9CA3AF]/40' 
  },
};
