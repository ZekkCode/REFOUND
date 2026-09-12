-- ==============================================================================
-- SKEMA DATABASE REFOUND (LENGKAP - 100% BAHASA INDONESIA)
-- Sistem Lost & Found Tertutup Komunitas Laboratorium TIF & SI
-- Universitas Trunojoyo Madura (UTM)
-- PostgreSQL + pgvector + Row Level Security (RLS) + Storage + Notifikasi
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Bersihkan Tabel, Fungsi, Trigger & Enum Lama (DROP CASCADE)
-- ------------------------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.tangani_pengguna_baru() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.adalah_admin_lab(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.cari_laporan_mirip_vektor(vector, float, int, tipe_laporan) CASCADE;

DROP TABLE IF EXISTS public.notifikasi CASCADE;
DROP TABLE IF EXISTS public.foto_laporan CASCADE;
DROP TABLE IF EXISTS public.riwayat_status CASCADE;
DROP TABLE IF EXISTS public.klaim CASCADE;
DROP TABLE IF EXISTS public.kecocokan CASCADE;
DROP TABLE IF EXISTS public.vektor_embedding CASCADE;
DROP TABLE IF EXISTS public.rahasia_temuan CASCADE;
DROP TABLE IF EXISTS public.laporan CASCADE;
DROP TABLE IF EXISTS public.zona CASCADE;
DROP TABLE IF EXISTS public.admin_lab CASCADE;
DROP TABLE IF EXISTS public.profil CASCADE;

-- Bersihkan sisa tabel bahasa Inggris jika masih ada
DROP TABLE IF EXISTS public.status_history CASCADE;
DROP TABLE IF EXISTS public.claims CASCADE;
DROP TABLE IF EXISTS public.matches CASCADE;
DROP TABLE IF EXISTS public.embeddings CASCADE;
DROP TABLE IF EXISTS public.found_secrets CASCADE;
DROP TABLE IF EXISTS public.reports CASCADE;
DROP TABLE IF EXISTS public.zones CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS peran_pengguna CASCADE;
DROP TYPE IF EXISTS tipe_laporan CASCADE;
DROP TYPE IF EXISTS status_laporan CASCADE;
DROP TYPE IF EXISTS status_klaim CASCADE;
DROP TYPE IF EXISTS tipe_notifikasi CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS report_type CASCADE;
DROP TYPE IF EXISTS report_status CASCADE;
DROP TYPE IF EXISTS claim_status CASCADE;

-- ------------------------------------------------------------------------------
-- 2. Aktifkan Ekstensi yang Dibutuhkan
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------------------------
-- 3. Tipe Data Enum (Bahasa Indonesia)
-- ------------------------------------------------------------------------------
CREATE TYPE tipe_laporan AS ENUM ('kehilangan', 'penemuan');
CREATE TYPE status_laporan AS ENUM (
  'diajukan',
  'menunggu_validasi',
  'aktif',
  'potensi_cocok',
  'diklaim',
  'dikembalikan',
  'ditolak',
  'kedaluwarsa'
);
CREATE TYPE status_klaim AS ENUM (
  'diajukan',
  'menunggu_jawaban',
  'ditinjau_admin',
  'disetujui',
  'diambil',
  'ditolak',
  'dibatalkan'
);
CREATE TYPE tipe_notifikasi AS ENUM (
  'kecocokan_ditemukan',
  'klaim_disetujui',
  'klaim_ditolak',
  'barang_disimpan',
  'barang_diserahkan',
  'sistem'
);

-- ------------------------------------------------------------------------------
-- 4. Tabel Master & Entitas Utama
-- ------------------------------------------------------------------------------

-- A. Tabel Profil Mahasiswa & Pengguna Umum
CREATE TABLE public.profil (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama TEXT NOT NULL,
  nim TEXT UNIQUE NOT NULL,
  program_studi TEXT NOT NULL CHECK (program_studi IN ('Teknik Informatika', 'Sistem Informasi', 'Petugas Lab / Tata Usaha')),
  nomor_telepon TEXT,
  avatar_url TEXT,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- B. Tabel Khusus Admin Lab (Terpisah untuk Hak Akses Petugas)
CREATE TABLE public.admin_lab (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama TEXT NOT NULL,
  nip_atau_kode_petugas TEXT UNIQUE NOT NULL,
  ruang_lab TEXT DEFAULT 'Tata Usaha / Lab Center TIF-SI' NOT NULL,
  nomor_telepon TEXT,
  avatar_url TEXT,
  level_akses TEXT DEFAULT 'operator_lab' NOT NULL,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- C. Tabel Master Zona Laboratorium
CREATE TABLE public.zona (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT
);

-- Data Awal Master Zona Laboratorium Gedung TIF-SI UTM
INSERT INTO public.zona (id, nama, deskripsi) VALUES
  ('lab_tif', 'Lab TIF', 'Laboratorium Teknik Informatika'),
  ('lab_si', 'Lab SI', 'Laboratorium Sistem Informasi'),
  ('koridor', 'Koridor Gedung Lab', 'Koridor utama lantai gedung laboratorium'),
  ('tangga', 'Area Tangga', 'Tangga penghubung antar lantai gedung laboratorium'),
  ('lobi', 'Lobi Utama Lab', 'Lobi pintu masuk gedung laboratorium'),
  ('ruang_admin', 'Ruang Admin Lab', 'Ruang pengelolaan & penitipan fisik barang temuan')
ON CONFLICT (id) DO NOTHING;

-- D. Tabel Laporan (Kehilangan & Penemuan)
CREATE TABLE public.laporan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_pengguna UUID NOT NULL REFERENCES public.profil(id) ON DELETE CASCADE,
  tipe tipe_laporan NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi_publik TEXT NOT NULL,
  id_zona TEXT NOT NULL REFERENCES public.zona(id),
  waktu_kejadian TIMESTAMPTZ NOT NULL,
  status status_laporan DEFAULT 'diajukan' NOT NULL,
  url_foto_utama TEXT,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- E. Tabel Foto Laporan (Multi-Foto per Laporan)
CREATE TABLE public.foto_laporan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_laporan UUID NOT NULL REFERENCES public.laporan(id) ON DELETE CASCADE,
  url_foto TEXT NOT NULL,
  keterangan TEXT,
  urutan INT DEFAULT 1 NOT NULL,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- F. Tabel Rahasia Temuan (Ciri Fisik Khusus & Lokasi Penitipan Admin Lab)
CREATE TABLE public.rahasia_temuan (
  id_laporan UUID PRIMARY KEY REFERENCES public.laporan(id) ON DELETE CASCADE,
  catatan_rahasia TEXT NOT NULL,
  kode_penitipan TEXT UNIQUE NOT NULL,
  pertanyaan_verifikasi TEXT,
  id_admin_penerima UUID REFERENCES public.admin_lab(id),
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- G. Tabel Vektor Embedding AI (pgvector 768 Dimensi untuk text-embedding-004)
CREATE TABLE public.vektor_embedding (
  id_laporan UUID PRIMARY KEY REFERENCES public.laporan(id) ON DELETE CASCADE,
  vektor_teks vector(768),
  versi_model TEXT DEFAULT 'text-embedding-004' NOT NULL,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- H. Tabel Kecocokan AI (Kandidat Match Antara Kehilangan & Penemuan)
CREATE TABLE public.kecocokan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_laporan_kehilangan UUID NOT NULL REFERENCES public.laporan(id) ON DELETE CASCADE,
  id_laporan_penemuan UUID NOT NULL REFERENCES public.laporan(id) ON DELETE CASCADE,
  skor_teks NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  skor_visual NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  skor_lokasi NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  skor_waktu NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  skor_akhir NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(id_laporan_kehilangan, id_laporan_penemuan)
);

-- I. Tabel Klaim Mahasiswa
CREATE TABLE public.klaim (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_kecocokan UUID NOT NULL REFERENCES public.kecocokan(id) ON DELETE CASCADE,
  id_pemohon UUID NOT NULL REFERENCES public.profil(id) ON DELETE CASCADE,
  jawaban TEXT,
  skor_semantik_ai NUMERIC(5, 4),
  status status_klaim DEFAULT 'diajukan' NOT NULL,
  
  -- Relasi Admin dari tabel public.admin_lab
  id_admin UUID REFERENCES public.admin_lab(id),
  alasan_keputusan_admin TEXT,
  
  -- Kode Pengambilan Single-Use + Batas Waktu
  kode_pengambilan TEXT,
  kadaluwarsa_kode_pengambilan TIMESTAMPTZ,
  sudah_diambil_pada TIMESTAMPTZ,
  
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- J. Tabel Notifikasi Pengguna
CREATE TABLE public.notifikasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_pengguna UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  judul TEXT NOT NULL,
  pesan TEXT NOT NULL,
  tipe tipe_notifikasi DEFAULT 'sistem' NOT NULL,
  sudah_dibaca BOOLEAN DEFAULT FALSE NOT NULL,
  tautan TEXT,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- K. Tabel Riwayat Status (Audit Trail Log)
CREATE TABLE public.riwayat_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipe_entitas TEXT NOT NULL,
  id_entitas UUID NOT NULL,
  status_awal TEXT NOT NULL,
  status_tujuan TEXT NOT NULL,
  id_pelaku UUID NOT NULL REFERENCES auth.users(id),
  keterangan TEXT,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. Indeks Performa & Vektor HNSW
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_laporan_tipe_status ON public.laporan(tipe, status);
CREATE INDEX IF NOT EXISTS idx_laporan_id_pengguna ON public.laporan(id_pengguna);
CREATE INDEX IF NOT EXISTS idx_laporan_id_zona ON public.laporan(id_zona);
CREATE INDEX IF NOT EXISTS idx_kecocokan_laporan ON public.kecocokan(id_laporan_kehilangan, id_laporan_penemuan);
CREATE INDEX IF NOT EXISTS idx_klaim_status ON public.klaim(status);
CREATE INDEX IF NOT EXISTS idx_klaim_pemohon ON public.klaim(id_pemohon);

-- Indeks HNSW untuk pencarian kemiripan kosinus embedding AI
CREATE INDEX IF NOT EXISTS idx_vektor_embedding_hnsw 
  ON public.vektor_embedding USING hnsw (vektor_teks vector_cosine_ops);

-- ------------------------------------------------------------------------------
-- 6. Helper Functions
-- ------------------------------------------------------------------------------

-- Helper Cek Apakah Pengguna Adalah Admin Lab
CREATE OR REPLACE FUNCTION public.adalah_admin_lab(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (SELECT 1 FROM public.admin_lab WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper Function Pencarian Kemiripan Vektor Cosine (pgvector)
CREATE OR REPLACE FUNCTION public.cari_laporan_mirip_vektor(
  vektor_kueri vector(768),
  ambang_kemiripan float DEFAULT 0.5,
  batas_jumlah int DEFAULT 10,
  tipe_sasaran tipe_laporan DEFAULT 'penemuan'
)
RETURNS TABLE (
  id_laporan UUID,
  skor_kemiripan float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ve.id_laporan,
    (1 - (ve.vektor_teks <=> vektor_kueri))::float AS skor_kemiripan
  FROM public.vektor_embedding ve
  JOIN public.laporan l ON l.id = ve.id_laporan
  WHERE l.tipe = tipe_sasaran
    AND (1 - (ve.vektor_teks <=> vektor_kueri)) >= ambang_kemiripan
  ORDER BY ve.vektor_teks <=> vektor_kueri ASC
  LIMIT batas_jumlah;
END;
$$;

-- ------------------------------------------------------------------------------
-- 7. Row Level Security (RLS) Policies Lengkap
-- ------------------------------------------------------------------------------

ALTER TABLE public.profil ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_lab ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zona ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laporan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foto_laporan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rahasia_temuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vektor_embedding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kecocokan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.klaim ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifikasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.riwayat_status ENABLE ROW LEVEL SECURITY;

-- Profil: Baca profil sendiri atau admin baca semua; Tambah/perbarui sendiri
CREATE POLICY "Pengguna baca profil sendiri atau admin" ON public.profil
  FOR SELECT USING (auth.uid() = id OR public.adalah_admin_lab(auth.uid()));

CREATE POLICY "Pengguna buat profil sendiri" ON public.profil
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Pengguna perbarui profil sendiri" ON public.profil
  FOR UPDATE USING (auth.uid() = id);

-- Admin Lab: Terbaca untuk semua (publik cek info loker/lab), update hanya oleh admin terkait
CREATE POLICY "Akses publik baca tabel admin lab" ON public.admin_lab
  FOR SELECT USING (TRUE);

CREATE POLICY "Admin perbarui profil admin sendiri" ON public.admin_lab
  FOR UPDATE USING (auth.uid() = id);

-- Zona: Terbaca publik
CREATE POLICY "Publik dapat membaca daftar zona" ON public.zona
  FOR SELECT USING (TRUE);

-- Laporan: Publik baca laporan aktif/potensi_cocok, Pelapor baca miliknya, Admin kelola semua
CREATE POLICY "Publik membaca laporan aktif" ON public.laporan
  FOR SELECT USING (status IN ('aktif', 'potensi_cocok') OR id_pengguna = auth.uid() OR public.adalah_admin_lab(auth.uid()));

CREATE POLICY "Pengguna buat laporan sendiri" ON public.laporan
  FOR INSERT WITH CHECK (auth.uid() = id_pengguna);

CREATE POLICY "Pengguna dan admin perbarui laporan" ON public.laporan
  FOR UPDATE USING (id_pengguna = auth.uid() OR public.adalah_admin_lab(auth.uid()));

-- Foto Laporan: Publik membaca foto laporan aktif
CREATE POLICY "Publik membaca foto laporan" ON public.foto_laporan
  FOR SELECT USING (TRUE);

CREATE POLICY "Pengguna upload foto laporan sendiri" ON public.foto_laporan
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.laporan WHERE id = foto_laporan.id_laporan AND id_pengguna = auth.uid()));

-- Rahasia Temuan: Ketat Hanya Admin Lab yang Dapat Akses
CREATE POLICY "Akses rahasia khusus Admin Lab" ON public.rahasia_temuan
  FOR ALL USING (public.adalah_admin_lab(auth.uid()));

-- Vektor Embedding: Akses baca & tulis internal sistem
CREATE POLICY "Akses baca vektor embedding" ON public.vektor_embedding
  FOR SELECT USING (TRUE);

CREATE POLICY "Pengguna terautentikasi kelola vektor embedding" ON public.vektor_embedding
  FOR ALL USING (auth.role() = 'authenticated' OR public.adalah_admin_lab(auth.uid()));

-- Kecocokan AI: Akses baca publik/terautentikasi untuk melihat ranking match
CREATE POLICY "Publik dapat membaca data kecocokan" ON public.kecocokan
  FOR SELECT USING (TRUE);

CREATE POLICY "Pengguna terautentikasi kelola kecocokan" ON public.kecocokan
  FOR ALL USING (auth.role() = 'authenticated' OR public.adalah_admin_lab(auth.uid()));

-- Klaim: Pemohon baca klaim miliknya, Admin kelola semua
CREATE POLICY "Pemohon baca klaim sendiri, Admin kelola semua" ON public.klaim
  FOR SELECT USING (id_pemohon = auth.uid() OR public.adalah_admin_lab(auth.uid()));

CREATE POLICY "Pemohon buat klaim sendiri" ON public.klaim
  FOR INSERT WITH CHECK (id_pemohon = auth.uid() OR public.adalah_admin_lab(auth.uid()));

CREATE POLICY "Admin dan pemohon perbarui klaim" ON public.klaim
  FOR UPDATE USING (id_pemohon = auth.uid() OR public.adalah_admin_lab(auth.uid()));

-- Notifikasi: Pengguna membaca & update notifikasi miliknya sendiri
CREATE POLICY "Pengguna baca notifikasi sendiri" ON public.notifikasi
  FOR SELECT USING (id_pengguna = auth.uid());

CREATE POLICY "Pengguna tandai baca notifikasi sendiri" ON public.notifikasi
  FOR UPDATE USING (id_pengguna = auth.uid());

-- Riwayat Status (Audit Trail): Terbaca untuk semua, tambah oleh user/admin
CREATE POLICY "Pengguna dan admin baca riwayat status" ON public.riwayat_status
  FOR SELECT USING (TRUE);

CREATE POLICY "Pengguna terautentikasi buat riwayat status" ON public.riwayat_status
  FOR INSERT WITH CHECK (auth.uid() = id_pelaku OR public.adalah_admin_lab(auth.uid()));

-- ------------------------------------------------------------------------------
-- 8. Trigger Otomatis Pembuatan Profil saat Registrasi / Google OAuth Masuk
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.tangani_pengguna_baru()
RETURNS TRIGGER AS $$
DECLARE
  extracted_nim TEXT;
  extracted_name TEXT;
  user_email_prefix TEXT;
  is_admin_user BOOLEAN;
BEGIN
  user_email_prefix := split_part(NEW.email, '@', 1);
  is_admin_user := (NEW.raw_user_meta_data->>'role' = 'admin_lab' OR NEW.email LIKE '%admin%');

  -- Cek validasi domain kampus Universitas Trunojoyo Madura (@trunojoyo.ac.id / @student.trunojoyo.ac.id)
  IF NOT is_admin_user AND NOT (NEW.email ILIKE '%@trunojoyo.ac.id' OR NEW.email ILIKE '%@%.trunojoyo.ac.id') THEN
    RAISE EXCEPTION 'Registrasi ditolak: Akun wajib menggunakan domain resmi kampus Universitas Trunojoyo Madura (@trunojoyo.ac.id atau @student.trunojoyo.ac.id).';
  END IF;

  -- Ekstraksi nama tampilan
  extracted_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    REPLACE(INITCAP(REPLACE(user_email_prefix, '.', ' ')), '_', ' ')
  );

  -- Ekstraksi NIM: jika username email adalah deretan angka (NIM mahasiswa UTM murni), gunakan langsung
  IF (NEW.raw_user_meta_data->>'nim' IS NOT NULL AND NEW.raw_user_meta_data->>'nim' <> '') THEN
    extracted_nim := NEW.raw_user_meta_data->>'nim';
  ELSIF (user_email_prefix ~ '^[0-9]{8,14}$') THEN
    extracted_nim := user_email_prefix;
  ELSE
    extracted_nim := 'NIM-' || SUBSTRING(REPLACE(NEW.id::text, '-', ''), 1, 8);
  END IF;

  -- 1. Selalu buat / perbarui record di public.profil agar relasi FK (laporan, klaim) selalu valid
  INSERT INTO public.profil (id, nama, nim, program_studi)
  VALUES (
    NEW.id,
    extracted_name,
    extracted_nim,
    CASE 
      WHEN is_admin_user THEN 'Petugas Lab / Tata Usaha'
      ELSE COALESCE(NEW.raw_user_meta_data->>'prodi', 'Teknik Informatika')
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    nama = EXCLUDED.nama,
    program_studi = COALESCE(EXCLUDED.program_studi, public.profil.program_studi);

  -- 2. Jika merupakan admin lab, daftarkan juga ke tabel public.admin_lab
  IF is_admin_user THEN
    INSERT INTO public.admin_lab (id, nama, nip_atau_kode_petugas, ruang_lab)
    VALUES (
      NEW.id,
      extracted_name,
      COALESCE(NEW.raw_user_meta_data->>'nip', extracted_nim, 'ADM-' || SUBSTRING(REPLACE(NEW.id::text, '-', ''), 1, 6)),
      'Tata Usaha / Lab Center TIF-SI'
    )
    ON CONFLICT (id) DO UPDATE SET
      nama = EXCLUDED.nama,
      nip_atau_kode_petugas = EXCLUDED.nip_atau_kode_petugas;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.tangani_pengguna_baru();

-- ------------------------------------------------------------------------------
-- 9. Inisialisasi Storage Bucket Supabase (foto-laporan)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('foto-laporan', 'foto-laporan', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Publik dapat melihat foto laporan" ON storage.objects;
DROP POLICY IF EXISTS "Pengguna dapat mengunggah foto laporan" ON storage.objects;
DROP POLICY IF EXISTS "Pengguna kelola foto laporan sendiri" ON storage.objects;

CREATE POLICY "Publik dapat melihat foto laporan" ON storage.objects
  FOR SELECT USING (bucket_id = 'foto-laporan');

CREATE POLICY "Pengguna dapat mengunggah foto laporan" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'foto-laporan');

CREATE POLICY "Pengguna kelola foto laporan sendiri" ON storage.objects
  FOR ALL USING (bucket_id = 'foto-laporan');

-- ------------------------------------------------------------------------------
-- 10. Seeding Aman Akun Demo & Data Awal UTM (Idempotent)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  -- Akun Demo Mahasiswa UTM
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001') THEN
    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000001',
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'budi.santoso@student.trunojoyo.ac.id',
      extensions.crypt('password123', extensions.gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Budi Santoso","nim":"210411100001","prodi":"Teknik Informatika"}'::jsonb,
      NOW(),
      NOW()
    );
  END IF;

  -- Akun Demo Admin Lab TIF-SI
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000002') THEN
    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000002',
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'admin@refound.id',
      extensions.crypt('123456', extensions.gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Admin Laboratorium TIF-SI","nip":"ADM-TIF-01","role":"admin_lab"}'::jsonb,
      NOW(),
      NOW()
    );
  END IF;

  -- Sample Barang Temuan di Lab TIF
  IF NOT EXISTS (SELECT 1 FROM public.laporan WHERE id = '00000000-0000-0000-0000-000000000011') THEN
    INSERT INTO public.laporan (
      id, id_pengguna, tipe, kategori, deskripsi_publik, id_zona, waktu_kejadian, status, url_foto_utama
    ) VALUES (
      '00000000-0000-0000-0000-000000000011',
      '00000000-0000-0000-0000-000000000001',
      'penemuan',
      'Laptop & Komputer',
      'MacBook Air 13" M1 Silver ditemukan tertinggal di meja baca Lab Komputer TIF.',
      'lab_tif',
      NOW() - INTERVAL '2 hours',
      'aktif',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
    );

    INSERT INTO public.rahasia_temuan (
      id_laporan, catatan_rahasia, kode_penitipan, pertanyaan_verifikasi
    ) VALUES (
      '00000000-0000-0000-0000-000000000011',
      'Ada stiker GitHub Octocat hitam di sudut kanan casing dan stiker React di sebelah trackpad',
      'LOKER-TIF-01',
      'Sebutkan stiker apa saja yang menempel pada casing atau sekitar keyboard laptop?'
    ) ON CONFLICT (id_laporan) DO NOTHING;
  END IF;

  -- Sample Barang Hilang di Lab TIF
  IF NOT EXISTS (SELECT 1 FROM public.laporan WHERE id = '00000000-0000-0000-0000-000000000012') THEN
    INSERT INTO public.laporan (
      id, id_pengguna, tipe, kategori, deskripsi_publik, id_zona, waktu_kejadian, status
    ) VALUES (
      '00000000-0000-0000-0000-000000000012',
      '00000000-0000-0000-0000-000000000001',
      'kehilangan',
      'Laptop & Komputer',
      'MacBook Air M1 warna abu-abu silver hilang saat praktikum pemrograman di Lab TIF.',
      'lab_tif',
      NOW() - INTERVAL '3 hours',
      'potensi_cocok'
    );
  END IF;

  -- Sample Rekomendasi Kecocokan AI
  IF NOT EXISTS (SELECT 1 FROM public.kecocokan WHERE id = '00000000-0000-0000-0000-000000000021') THEN
    INSERT INTO public.kecocokan (
      id, id_laporan_kehilangan, id_laporan_penemuan, skor_teks, skor_visual, skor_lokasi, skor_waktu, skor_akhir, status
    ) VALUES (
      '00000000-0000-0000-0000-000000000021',
      '00000000-0000-0000-0000-000000000012',
      '00000000-0000-0000-0000-000000000011',
      0.8800,
      0.8000,
      1.0000,
      0.9500,
      0.8750,
      'pending'
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Seeding data awal opsional dilewati: %', SQLERRM;
END $$;
