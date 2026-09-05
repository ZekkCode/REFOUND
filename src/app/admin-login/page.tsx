'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export default function AdminLoginPage() {
  const router = useRouter();
  const [kodePetugas, setKodePetugas] = useState('');
  const [pinAkses, setPinAkses] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // 1. Cari email berdasarkan NIP/Kode Petugas
      const resLookup = await fetch('/api/auth/lookup-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nim: kodePetugas }),
      });
      const dataLookup = await resLookup.json();

      if (!resLookup.ok || !dataLookup.sukses) {
        setErrorMsg(dataLookup.error || 'NIP/Kode Petugas tidak terdaftar.');
        setLoading(false);
        return;
      }

      const email = dataLookup.email;

      // 2. Sign in dengan email & password menggunakan Supabase Auth
      const { data: authData, error: authError } = await supabaseKlien.auth.signInWithPassword({
        email,
        password: pinAkses,
      });

      if (authError) {
        setErrorMsg(authError.message === 'Invalid login credentials' ? 'PIN Akses/kata sandi salah.' : authError.message);
        setLoading(false);
        return;
      }

      if (!authData?.user) {
        setErrorMsg('Gagal melakukan autentikasi.');
        setLoading(false);
        return;
      }

      // 3. Verifikasi apakah user terdaftar di tabel admin_lab
      const { data: adminRecord, error: dbError } = await supabaseKlien
        .from('admin_lab')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (dbError || !adminRecord) {
        // Sign out karena bukan admin
        await supabaseKlien.auth.signOut();
        setErrorMsg('Akun Anda tidak memiliki hak akses Petugas Admin Lab.');
        setLoading(false);
        return;
      }

      // 4. Sukses, set cookie & redirect
      document.cookie = 'refound_admin_token=admin_lab_active; path=/; max-age=86400';
      router.push('/admin');
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan koneksi database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070E22] text-white selection:bg-[#0D9488]/30 font-sans relative overflow-x-hidden">
      
      {/* Glow decorator */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-white/5 py-3.5 px-6 md:px-12 flex items-center justify-between z-20 shrink-0">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" alt="REFOUND Logo" width={120} height={36} className="object-contain h-8 w-auto brightness-0 invert" priority />
        </Link>
        <Link href="/" className="text-slate-400 hover:text-white text-xs font-semibold transition-colors">
          Beranda
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-8">
        <div data-aos="zoom-in" className="max-w-md w-full glass-card-dark p-8 sm:p-10 rounded-3xl space-y-6 shadow-2xl">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-semibold uppercase tracking-widest text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Admin Lab</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Masuk Admin
            </h1>
            <p className="text-slate-400 text-xs font-normal leading-relaxed">
              Pengelolaan penitipan dan verifikasi klaim barang lab.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-2xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginAdmin} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1.5 tracking-wider">
                NIP / Kode Petugas
              </label>
              <input
                type="text"
                required
                placeholder="NIP atau Kode Petugas"
                value={kodePetugas}
                onChange={(e) => setKodePetugas(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1.5 tracking-wider">
                PIN Akses / Kata Sandi
              </label>
              <input
                type="password"
                required
                placeholder="••••••"
                value={pinAkses}
                onChange={(e) => setPinAkses(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0D9488] hover:bg-[#0D9488]/90 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg transition-all mt-2 cursor-pointer"
            >
              {loading ? 'Memproses...' : 'Masuk Admin'}
            </button>
          </form>

          <div className="text-center pt-3 border-t border-white/5">
            <Link href="/login" className="text-[11px] font-semibold text-slate-400 hover:text-teal-400 transition-colors">
              Bukan Petugas? Masuk sebagai Mahasiswa
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-slate-500 border-t border-white/5">
        © 2026 REFOUND - Sistem Manajemen Laboratorium
      </footer>

    </div>
  );
}
