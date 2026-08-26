## VERSI SINGKAT (kalau cuma mau cek cepat progress FE kamu sendiri)

```
Audit semua halaman di src/app/ pada project Next.js saya. Untuk tiap halaman,
tentukan apakah:
1. Sudah fetch data dari API/Supabase, atau masih hardcoded/dummy
2. Sudah punya loading state, empty state, dan error state, atau belum
3. Semua tombol/interactive element sudah punya handler yang berfungsi

Buat tabel ringkas: Halaman | Data-driven? | States lengkap? | Tombol berfungsi? | Prioritas perbaikan (Tinggi/Sedang/Rendah)
```


## VERSI KOMPREHENSIF (untuk audit lengkapFE+BE+AI+DB)

```
Saya sedang mengerjakan proyek REFOUND untuk kompetisi TCC Vibe Code 2026.
Tolong audit menyeluruh seluruh codebase saya (Next.js + Supabase) dan buatkan
laporan progress yang jelas.

KONTEKS PROYEK:
REFOUND adalah sistem lost & found tertutup untuk komunitas dua prodi (Teknik Informatika & Sistem Informasi) dalam satu gedung lab. AI mempertemukan
laporan kehilangan/penemuan; Admin Lab menjaga barang fisik dan memutuskan klaim.

Struktur folder yang ada:
- src/app/ - App Router Next.js (routes)
  - admin/ - Portal Admin Lab
  - api/ - Route Handlers (Laporan, Match, Klaim, Admin)
  - barang-temuan/ - Katalog publik barang temuan
  - dashboard/ - Dashboard mahasiswa
  - kecocokan/ - AI Match Candidate Ranking
  - klaim/ - Form pengajuan klaim
  - lapor/ - Form lapor kehilangan & penemuan
- src/komponen/ - Komponen UI
- src/pustaka/ - Modul AI adapter, fallback engine, Supabase
- supabase/schema.sql - Skema database

AI matching pakai formula: MatchScore = 0.45×Teks + 0.30×Visual + 0.15×Lokasi + 0.10×Waktu,
dengan fallback otomatis ke local keyword matching kalau API key AI kosong/timeout/kuota habis.

TOLONG BUATKAN LAPORAN DENGAN STRUKTUR BERIKUT:

## 1. Status Per Halaman (Frontend)
Buat tabel: Halaman | Status (Selesai/Sebagian/Belum Ada) | Data-driven atau masih hardcoded? | Catatan
Cek untuk: Landing, Login, Dashboard mahasiswa, Lapor Kehilangan, Lapor Penemuan,
Barang Temuan, Detail laporan, Kecocokan (list & detail), Form Klaim, Admin overview,
Admin Laporan Masuk, Admin Klaim, Admin Penyerahan, Profile.

## 2. Status Backend/API
Buat tabel: Endpoint | Ada/Tidak | Terhubung ke database asli / masih mock? | Catatan
Cek endpoint yang seharusnya ada: laporan (CRUD), matching/kecocokan, klaim,
admin/dashboard, admin/verifikasi, admin/penyerahan, auth.

## 3. Status Fitur AI
- Apakah AI Vector Similarity & Score Fusion Engine sudah berfungsi dengan data asli?
- Apakah LLM Semantic Verification Engine (untuk klaim) sudah terhubung?
- Apakah LLM Admin Verification Question Suggester sudah jalan?
- Apakah fallback engine (local keyword matching) sudah teruji saat API key kosong?

## 4. Status Database
- Apakah schema.sql sudah lengkap sesuai kebutuhan (tabel laporan, ciri rahasia,
  match, klaim, zona, RLS policies)?
- Apakah pgvector extension sudah aktif dan dipakai dengan benar?
- Apakah Row Level Security (RLS) sudah diterapkan untuk melindungi data sensitif
  (ciri rahasia, kontak, dsb)?

## 5. Kesenjangan dengan Requirement Lomba (Guide Book TCC Vibe Code 2026)
Cocokkan progress dengan syarat wajib berikut, tandai mana yang sudah/belum:
- [ ] Website berupa functional prototype yang bisa dijalankan
- [ ] Bahasa utama Bahasa Indonesia (termasuk sisi admin, cek konsistensi)
- [ ] Mencantumkan logo UKM Triple-C / TCC / Jack 2026
- [ ] AI benar-benar dipakai dalam proses pengembangan/fitur (bukan sekadar tempelan)
- [ ] Tidak memakai template website yang sudah ada
- [ ] Menawarkan solusi untuk permasalahan nyata di lingkungan yang ditentukan

## 6. Ringkasan & Prioritas
- Berapa persen kira-kira progress keseluruhan (FE, BE, AI, DB)?
- Apa 5 hal paling kritis yang harus diselesaikan dulu sebelum bisa didemokan
  end-to-end (alur: lapor -> AI matching -> klaim -> verifikasi admin -> penyerahan)?
- Apa yang aman ditunda karena bukan bagian dari happy path demo?

Format laporan dengan bahasa Indonesia, jelas, dan mudah dibaca dalam bentuk
tabel dan checklist.
```
