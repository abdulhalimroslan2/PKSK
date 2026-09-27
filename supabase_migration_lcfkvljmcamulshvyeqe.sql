-- ============================================================================
-- PKSK SUITES PRO 2026: SUPABASE DATABASE MIGRATION SCRIPT
-- PROJEK SASARAN: lcfkvljmcamulshvyeqe (https://lcfkvljmcamulshvyeqe.supabase.co)
-- ============================================================================
-- Berpandukan skill: /firebase-to-supabase-migration
-- KAWALAN KESELAMATAN DATA MUTLAK (STRICT ZERO-DATA-LOSS CONTROLS):
-- [✓] TIADA DROP TABLE, TIADA TRUNCATE, TIADA CASCADE
-- [✓] SEMUA DDL MENGGUNAKAN 'IF NOT EXISTS'
-- [✓] IDEMPOTENT & SELAMAT DIJALANKAN BERULANG KALI
-- ============================================================================

-- 1. PENGURUSAN JADUAL: pksk_users (Pengguna Berdaftar Melalui Google Auth / Gmail)
CREATE TABLE IF NOT EXISTS public.pksk_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    provider TEXT DEFAULT 'google',
    role TEXT DEFAULT 'student',
    status TEXT DEFAULT 'ACTIVE',
    last_sign_in_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indeks carian pantas untuk emel & auth_id
CREATE INDEX IF NOT EXISTS idx_pksk_users_email ON public.pksk_users(email);
CREATE INDEX IF NOT EXISTS idx_pksk_users_auth_id ON public.pksk_users(auth_id);


-- 2. PENGURUSAN JADUAL: pksk_licenses (500 Kunci Lesen Komersial PKSK)
CREATE TABLE IF NOT EXISTS public.pksk_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_key TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, USED, BLOCKED, EXPIRED
    tier TEXT DEFAULT 'PREMIUM_6_MONTHS',
    device_id TEXT, -- Menyimpan Device ID / Hardware Fingerprint (Maks 2 peranti)
    max_devices INT DEFAULT 2,
    activated_by_name TEXT,
    activated_by_ic TEXT,
    activated_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indeks carian pantas untuk license_key & status
CREATE INDEX IF NOT EXISTS idx_pksk_licenses_key ON public.pksk_licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_pksk_licenses_status ON public.pksk_licenses(status);


-- 3. PENGURUSAN JADUAL: pksk_results (Keputusan & Laporan Ujian Calon)
CREATE TABLE IF NOT EXISTS public.pksk_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    candidate_name TEXT,
    candidate_ic TEXT,
    mode TEXT,
    bahagian_a_score NUMERIC,
    bahagian_b_score NUMERIC,
    bahagian_c_score NUMERIC,
    total_percentage NUMERIC,
    essay_topic TEXT,
    essay_score NUMERIC,
    essay_assessment JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pksk_results_email ON public.pksk_results(user_email);


-- 4. KESELAMATAN & POLISI ROW LEVEL SECURITY (RLS)
ALTER TABLE public.pksk_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pksk_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pksk_results ENABLE ROW LEVEL SECURITY;

-- Polisi Selamat untuk pksk_users (Baca & Tulis)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'pksk_users' AND policyname = 'Akses Penuh Pengguna PKSK'
    ) THEN
        CREATE POLICY "Akses Penuh Pengguna PKSK" ON public.pksk_users
            FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Polisi Selamat untuk pksk_licenses (Baca & Validasi Lesen)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'pksk_licenses' AND policyname = 'Akses Awam Semakan Lesen'
    ) THEN
        CREATE POLICY "Akses Awam Semakan Lesen" ON public.pksk_licenses
            FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Polisi Selamat untuk pksk_results
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'pksk_results' AND policyname = 'Akses Awam Keputusan PKSK'
    ) THEN
        CREATE POLICY "Akses Awam Keputusan PKSK" ON public.pksk_results
            FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;


-- 5. SIARAN LANGSUNG MASA NYATA (SUPABASE REALTIME)
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.pksk_users;
    EXCEPTION WHEN duplicate_object THEN
        NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.pksk_licenses;
    EXCEPTION WHEN duplicate_object THEN
        NULL;
    END;
END $$;
