-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Enums
CREATE TYPE user_role AS ENUM ('user', 'admin_lab');
CREATE TYPE report_type AS ENUM ('lost', 'found');
CREATE TYPE report_status AS ENUM ('diajukan', 'menunggu_validasi', 'aktif', 'potensi_cocok', 'diklaim', 'dikembalikan', 'ditolak', 'kedaluwarsa');
CREATE TYPE claim_status AS ENUM ('diajukan', 'menunggu_jawaban', 'ditinjau_admin', 'disetujui', 'diambil', 'ditolak', 'dibatalkan');

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  nim TEXT UNIQUE NOT NULL,
  study_program TEXT NOT NULL CHECK (study_program IN ('Teknik Informatika', 'Sistem Informasi')),
  role user_role DEFAULT 'user' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Master Zones Table
CREATE TABLE IF NOT EXISTS public.zones (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

INSERT INTO public.zones (id, name, description) VALUES
  ('lab_tif', 'Lab TIF', 'Laboratorium Teknik Informatika'),
  ('lab_si', 'Lab SI', 'Laboratorium Sistem Informasi'),
  ('koridor', 'Koridor Gedung Lab', 'Koridor utama lantai gedung'),
  ('tangga', 'Area Tangga', 'Tangga antar lantai'),
  ('lobi', 'Lobi Utama Lab', 'Lobi pintu masuk gedung lab'),
  ('ruang_admin', 'Ruang Admin Lab', 'Ruang pengelolaan & penitipan barang')
ON CONFLICT (id) DO NOTHING;

-- 3. Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type report_type NOT NULL,
  category TEXT NOT NULL,
  public_description TEXT NOT NULL,
  zone_id TEXT NOT NULL REFERENCES public.zones(id),
  occurred_at TIMESTAMPTZ NOT NULL,
  status report_status DEFAULT 'diajukan' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Found Secrets Table (Admin Custody & Verification Question)
CREATE TABLE IF NOT EXISTS public.found_secrets (
  report_id UUID PRIMARY KEY REFERENCES public.reports(id) ON DELETE CASCADE,
  secret_notes TEXT NOT NULL,
  custody_code TEXT UNIQUE NOT NULL,
  verification_question TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Embeddings Table (pgvector)
CREATE TABLE IF NOT EXISTS public.embeddings (
  report_id UUID PRIMARY KEY REFERENCES public.reports(id) ON DELETE CASCADE,
  text_vector vector(1536),
  model_version TEXT DEFAULT 'text-embedding-3-small' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Matches Table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lost_report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  found_report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  text_score NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  visual_score NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  location_score NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  time_score NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  final_score NUMERIC(5, 4) DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(lost_report_id, found_report_id)
);

-- 7. Claims Table
CREATE TABLE IF NOT EXISTS public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  claimant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  answer TEXT,
  ai_semantic_score NUMERIC(5, 4),
  status claim_status DEFAULT 'diajukan' NOT NULL,
  admin_decision_reason TEXT,
  pickup_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. Status History Audit Log
CREATE TABLE IF NOT EXISTS public.status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  from_status TEXT NOT NULL,
  to_status TEXT NOT NULL,
  actor_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.found_secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Profiles Policy
CREATE POLICY "Users read own profile, Admins read all" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin_lab'));

-- Reports Policy
CREATE POLICY "Public read active reports" ON public.reports
  FOR SELECT USING (status IN ('aktif', 'potensi_cocok') OR user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin_lab'));

CREATE POLICY "Users insert own report" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Found Secrets Policy (Strict Admin Only)
CREATE POLICY "Admin only secret access" ON public.found_secrets
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin_lab'));
