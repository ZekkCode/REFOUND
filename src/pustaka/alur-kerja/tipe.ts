export type PeranPengguna = 'mahasiswa' | 'admin_lab';

export type TipeLaporan = 'kehilangan' | 'penemuan';

export type StatusLaporan =
  | 'diajukan'
  | 'menunggu_validasi'
  | 'aktif'
  | 'potensi_cocok'
  | 'diklaim'
  | 'dikembalikan'
  | 'ditolak'
  | 'kedaluwarsa';

export type StatusKlaim =
  | 'diajukan'
  | 'menunggu_jawaban'
  | 'ditinjau_admin'
  | 'disetujui'
  | 'diambil'
  | 'ditolak'
  | 'dibatalkan';

export interface ProfilPengguna {
  id: string;
  nama: string;
  nim: string;
  program_studi: 'Teknik Informatika' | 'Sistem Informasi';
  nomor_telepon?: string;
  avatar_url?: string;
  dibuat_pada?: string;
}

export interface AdminLab {
  id: string;
  nama: string;
  nip_atau_kode_petugas: string;
  ruang_lab: string;
  nomor_telepon?: string;
  avatar_url?: string;
  level_akses: string;
  dibuat_pada?: string;
}

export interface ZonaGedung {
  id: string;
  nama: string;
  deskripsi: string;
}

export interface ItemLaporan {
  id: string;
  user_id: string;
  tipe: TipeLaporan;
  kategori: string;
  deskripsi_publik: string;
  id_zona: string;
  waktu_kejadian: string;
  status: StatusLaporan;
  url_foto?: string;
  created_at?: string;
  nama_zona?: string;
  id_pencocokan_kandidat?: string;
}

export interface SecretPenitipan {
  id_laporan: string;
  catatan_rahasia: string;
  kode_penitipan: string;
  pertanyaan_verifikasi?: string;
  id_admin_penerima?: string;
  dibuat_pada?: string;
}

export interface FotoLaporan {
  id: string;
  id_laporan: string;
  url_foto: string;
  keterangan?: string;
  urutan: number;
  dibuat_pada?: string;
}

export interface NotifikasiPengguna {
  id: string;
  id_pengguna: string;
  judul: string;
  pesan: string;
  tipe: 'kecocokan_ditemukan' | 'klaim_disetujui' | 'klaim_ditolak' | 'barang_disimpan' | 'barang_diserahkan' | 'sistem';
  sudah_dibaca: boolean;
  tautan?: string;
  dibuat_pada?: string;
}

export interface MatchKandidat {
  id: string;
  lost_report_id: string;
  found_report_id: string;
  skor_teks: number;
  skor_visual: number;
  skor_lokasi: number;
  skor_waktu: number;
  skor_akhir: number;
  status: 'pending' | 'ditinjau' | 'disetujui' | 'ditolak';
  created_at?: string;
  found_report?: ItemLaporan;
  lost_report?: ItemLaporan;
  alasan_kecocokan?: string[];
}

export interface KlaimMahasiswa {
  id: string;
  id_kecocokan: string;
  id_pemohon: string;
  jawaban?: string;
  skor_semantik_ai?: number;
  status: StatusKlaim;
  id_admin?: string;
  alasan_keputusan_admin?: string;
  kode_pengambilan?: string;
  kadaluwarsa_kode_pengambilan?: string;
  sudah_diambil_pada?: string;
  dibuat_pada?: string;
  kecocokan?: MatchKandidat;
  profil_pemohon?: ProfilPengguna;
}

export interface AuditingStatus {
  id: string;
  entity_type: 'reports' | 'claims' | 'found_secrets';
  entity_id: string;
  from_status: string;
  to_status: string;
  actor_id: string;
  created_at: string;
}

export interface DataLaporanBaruDTO {
  tipe: TipeLaporan;
  kategori: string;
  deskripsi_publik: string;
  id_zona: string;
  waktu_kejadian: string;
  url_foto?: string;
}

export interface DataValidasiPenitipanDTO {
  id_laporan: string;
  catatan_rahasia: string;
  kode_penitipan: string;
  pertanyaan_verifikasi?: string;
}

export interface DataPengajuanKlaimDTO {
  id_pencocokan: string;
  jawaban_rahasia: string;
}

export interface DataKeputusanAdminDTO {
  id_klaim: string;
  setujui: boolean;
  alasan: string;
}

export interface DataPenyerahanAdminDTO {
  id_klaim: string;
  kode_pengambilan: string;
}
