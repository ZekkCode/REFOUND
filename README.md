# REFOUND - Lost & Found Digital Komunitas Gedung Lab

**REFOUND** adalah sistem *Lost & Found* tertutup berbasis **AI Vector Matching & Semantic Verification** untuk komunitas dua program studi (Teknik Informatika & Sistem Informasi) yang berada dalam satu gedung laboratorium di **Universitas Trunodjoyo Madura**. 

Dikembangkan khusus untuk kompetisi **Trunodjoyo Creative Competition (TCC Vibe Code 2026)**.

---

## 🌟 Fitur Utama & Keunggulan

1. **AI Match Score Fusion Engine**:
   - Menghitung kecocokan barang menggunakan formula:
     $$\text{MatchScore} = 0.45 \times \text{Teks} + 0.30 \times \text{Visual} + 0.15 \times \text{Lokasi} + 0.10 \times \text{Waktu}$$
   - Memberikan transparansi skor & breakdown alasan kecocokan (seperti kemiripan deskripsi, zona lokasi, dan rentang waktu).

2. **Privasi & Keamanan Terjaga (*Privacy by Interface*)**:
   - Tidak ada pengungkapan nomor kontak, NIM, atau foto sensitif secara publik.
   - Ciri rahasia barang temuan tersimpan aman (*Admin Custody*) dan dilindungi oleh Supabase Row Level Security (RLS).

3. **Verifikasi Kepemilikan Dua Langkah (*Two-Step Claim Verification*)**:
   - Pemohon menjawab pertanyaan rahasia yang disusun oleh Admin Lab.
   - Evaluasi semantik LLM membantu Admin menilai keakuratan jawaban tanpa membocorkan ciri fisik barang ke publik.
   - Klaim disetujui menghasilkan **Kode Pengambilan Single-Use** untuk verifikasi penyerahan fisik di Ruang Admin Lab.

4. **Desain Visual & Aksesibilitas Modern**:
   - Palet warna sistem: Deep Navy (`#0B1633`), Teal (`#12A99A`), Coral (`#FF765F`), dan Off-white (`#F5F7FA`).
   - Responsif penuh untuk perangkat seluler dan desktop.

---

## 🚀 Panduan Setup & Pengembangan Lokal

### 1. Prasyarat
- Node.js versi 18+ atau 20+
- Akun Supabase (untuk database PostgreSQL + pgvector)

### 2. Langkah Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/ZekkCode/REFOUND.git
cd REFOUND/refound-app

# 2. Install dependensi
npm install

# 3. Salin environment variables
cp .env.example .env.local

# 4. Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🗄️ Setup Database Supabase

1. Buka [Supabase Dashboard](https://database.new) dan buat project baru.
2. Buka tab **SQL Editor**.
3. Jalankan seluruh isi skrip [supabase/schema.sql](file:///e:/Hackhaton/TCC2026/refound-app/supabase/schema.sql) untuk membuat ekstensi `vector`, tipe enum, tabel master zona, laporan, ciri rahasia, match, klaim, serta aturan Row Level Security (RLS).

---

## ☁️ Panduan Auto-Deploy di Vercel

Aplikasi ini telah siap untuk **Auto-Deploy di Vercel** setiap kali ada commit baru di branch `main` repositori GitHub [ZekkCode/REFOUND](https://github.com/ZekkCode/REFOUND).

### Langkah-langkah Deployment di Vercel:

1. Buka [Vercel Dashboard](https://vercel.com/new) dan login dengan akun GitHub Anda.
2. Pilih repositori **`ZekkCode/REFOUND`** dan klik **Import**.
3. Pada bagian **Framework Preset**, pastikan memilih **Next.js**.
4. Buka bagian **Environment Variables** dan masukkan variabel dari [.env.example](file:///e:/Hackhaton/TCC2026/refound-app/.env.example):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_PROVIDER` (Set `mock` untuk demo atau `openai` / `gemini`)
   - `OPENAI_API_KEY` atau `GEMINI_API_KEY`
5. Klik **Deploy**. Vercel akan otomatis memproses build (`npm run build`) dan menerbitkan aplikasi secara publik.

---

## 🛠️ Struktur Direktori

```text
refound-app/
├── public/                 # Aset statis & logo Vercel/Next
├── src/
│   ├── app/                # App Router Next.js (Rute Bahasa Indonesia)
│   │   ├── admin/          # Portal Admin Lab (Penitipan, Klaim, Penyerahan)
│   │   ├── api/            # Route Handlers API (Laporan, Match, Klaim, Admin)
│   │   ├── barang-temuan/  # Katalog Publik Barang Temuan
│   │   ├── dashboard/      # Dashboard Mahasiswa
│   │   ├── kecocokan/      # AI Match Candidate Ranking & Side-by-Side
│   │   ├── klaim/          # Form Pengajuan Klaim Mahasiswa
│   │   ├── lapor/          # Form Lapor Kehilangan & Penemuan
│   │   ├── globals.css     # Styling Design System & Tailwind CSS v4
│   │   └── page.tsx        # Beranda / Landing Page Utama
│   ├── komponen/           # Komponen UI Modular Bahasa Indonesia
│   └── pustaka/            # Modul AI Match, Workflow Tipe, Katalog, & Supabase
├── supabase/
│   └── schema.sql          # Migrasi Schema Supabase PostgreSQL + pgvector
├── .env.example            # Blueprint Variabel Lingkungan
├── vercel.json             # Konfigurasi Auto-Deploy Vercel
└── README.md               # Dokumentasi Proyek
```

---

## 📄 Lisensi & Kredit

Dikembangkan oleh **Tim REFOUND** untuk kompetisi **TCC Vibe Code 2026** di **Universitas Trunodjoyo Madura**.
