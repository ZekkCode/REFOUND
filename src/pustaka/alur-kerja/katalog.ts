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

export const LABEL_STATUS_LAPORAN: Record<StatusLaporan, { label: string; kelasWarna: string }> = {
  diajukan: { label: 'Diajukan', kelasWarna: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200' },
  menunggu_validasi: { label: 'Menunggu Penitipan Admin', kelasWarna: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200' },
  aktif: { label: 'Aktif Diproses', kelasWarna: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200' },
  potensi_cocok: { label: 'Potensi Cocok AI', kelasWarna: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200' },
  diklaim: { label: 'Proses Klaim', kelasWarna: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200' },
  dikembalikan: { label: 'Dikembalikan ke Pemilik', kelasWarna: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200' },
  ditolak: { label: 'Ditolak', kelasWarna: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' },
  kedaluwarsa: { label: 'Kedaluwarsa', kelasWarna: 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
};

export const LABEL_STATUS_KLAIM: Record<StatusKlaim, { label: string; kelasWarna: string }> = {
  diajukan: { label: 'Klaim Diajukan', kelasWarna: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200' },
  menunggu_jawaban: { label: 'Menunggu Jawaban Verifikasi', kelasWarna: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200' },
  ditinjau_admin: { label: 'Ditinjau Admin Lab', kelasWarna: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200' },
  disetujui: { label: 'Klaim Disetujui (Siap Ambil)', kelasWarna: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200' },
  diambil: { label: 'Barang Sudah Diambil', kelasWarna: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' },
  ditolak: { label: 'Klaim Ditolak', kelasWarna: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' },
  dibatalkan: { label: 'Klaim Dibatalkan', kelasWarna: 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
};
