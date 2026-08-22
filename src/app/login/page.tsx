'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { masukDenganGoogle } from '@/pustaka/supabase/auth';

export default function UserLoginPage() {
  const router = useRouter();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Form states
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [prodi, setProdi] = useState('Teknik Informatika');
  const [email, setEmail] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLoginGoogle = async () => {
    setErrorMsg(null);
    setLoadingGoogle(true);
    try {
      await masukDenganGoogle('/dashboard');
    } catch (err: unknown) {
      const pesan = err instanceof Error ? err.message : 'Gagal menghubungi server Google';
      setErrorMsg(`Masuk dengan Google gagal: ${pesan}`);
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (isRegisterMode) {
      if (!nama || !nim || !email || !password || !konfirmasiPassword) {
        setErrorMsg('Mohon lengkapi seluruh kolom pendaftaran.');
        return;
      }
      if (password !== konfirmasiPassword) {
        setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok.');
        return;
      }
      setLoading(true);
      
      const { data, error } = await supabaseKlien.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: nama,
            nim: nim,
            prodi: prodi,
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        const { error: profileError } = await supabaseKlien.from('profil').upsert({
          id: data.user.id,
          nama: nama,
          nim: nim,
          program_studi: prodi
        });
        if (profileError) {
          console.warn('DB profile upsert failed:', profileError);
        }
      }

      setLoading(false);
      setSuccessMsg('Pendaftaran akun berhasil! Silakan masuk menggunakan NIM atau Email Kampus Anda.');
      setIsRegisterMode(false);
      setNama('');
      setKonfirmasiPassword('');
    } else {
      if (!nim || !password) {
        setErrorMsg('Mohon isi NIM dan Kata Sandi Anda.');
        return;
      }
      setLoading(true);

      let targetEmail = nim;

      // NIM lookup if input is not an email
      if (!nim.includes('@')) {
        try {
          const lookupRes = await fetch('/api/auth/lookup-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nim }),
          });
          const lookupJson = await lookupRes.json();
          if (lookupJson.sukses && lookupJson.email) {
            targetEmail = lookupJson.email;
          } else {
            setErrorMsg(lookupJson.error || 'NIM tidak terdaftar.');
            setLoading(false);
            return;
          }
        } catch {
          setErrorMsg('Koneksi internet gagal untuk verifikasi NIM.');
          setLoading(false);
          return;
        }
      }

      const { error } = await supabaseKlien.auth.signInWithPassword({
        email: targetEmail,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0D9488]/20 font-sans relative overflow-x-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-gradient pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Header bar */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 py-3.5 px-6 md:px-12 flex items-center justify-between z-20 shrink-0">
        <div>
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="REFOUND Logo" width={120} height={36} className="object-contain h-8 w-auto" priority />
          </Link>
        </div>
        <div>
          <Link href="/" className="text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors">
            &larr; Beranda
          </Link>
        </div>
      </header>

      {/* Main Gate Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-8 my-6">
        <div data-aos="zoom-in" className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-[0_15px_45px_rgba(15,23,42,0.06)] space-y-6">
          
          {/* Logo & Welcome */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isRegisterMode ? 'Daftar Akun Mahasiswa' : 'Portal Masuk Mahasiswa'}
            </h1>
            <p className="text-slate-500 text-xs font-normal leading-relaxed">
              {isRegisterMode 
                ? 'Lengkapi form untuk mendaftarkan akun komunitas laboratorium.' 
                : 'Masuk dengan akun universitas atau Google OAuth untuk melapor dan klaim.'}
            </p>
          </div>

          {successMsg && (
            <div className="p-3.5 bg-teal-50 border border-teal-200 text-[#0D9488] text-xs font-semibold rounded-2xl flex items-center space-x-2">
              <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-2xl flex items-center space-x-2">
              <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tombol Google OAuth */}
          <div>
            <button
              type="button"
              onClick={handleLoginGoogle}
              disabled={loading || loadingGoogle}
              className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>{loadingGoogle ? 'Mengarahkan ke Google...' : 'Masuk dengan Akun Google'}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-semibold">
              <span className="bg-white px-2 text-slate-400">Atau masuk dengan NIM / Email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Program Studi</label>
                  <select
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900"
                  >
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Email Mahasiswa</label>
                  <input
                    type="email"
                    placeholder="budi@student.trunojoyo.ac.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">
                {isRegisterMode ? 'NIM (Nomor Induk Mahasiswa)' : 'NIM atau Email Kampus'}
              </label>
              <input
                type="text"
                placeholder={isRegisterMode ? "Contoh: 13519099" : "Contoh: 13519099 atau budi@student.trunojoyo.ac.id"}
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Kata Sandi</label>
              <input
                type="password"
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900"
              />
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  placeholder="Ulangi kata sandi..."
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] outline-none rounded-xl p-3 text-xs font-semibold text-slate-900"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || loadingGoogle}
              className="w-full py-3 bg-[#0F172A] hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md transition-all mt-2 cursor-pointer"
            >
              {loading 
                ? (isRegisterMode ? 'Memproses Pendaftaran...' : 'Memproses Masuk...') 
                : (isRegisterMode ? 'Daftar Akun Mahasiswa' : 'Masuk dengan NIM')}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs font-semibold text-[#0D9488] hover:underline focus:outline-none cursor-pointer"
            >
              {isRegisterMode ? 'Sudah punya akun? Masuk Sekarang' : 'Belum punya akun? Daftar Sekarang'}
            </button>
          </div>

          {/* Admin link */}
          <div className="text-center pt-3 border-t border-slate-100">
            <span className="text-[11px] font-medium text-slate-400">
              Petugas Laboratorium?{' '}
              <Link href="/admin-login" className="text-[#0D9488] hover:underline font-semibold">
                Masuk Gerbang Admin
              </Link>
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-6 border-t border-slate-800 shrink-0 text-center text-xs font-medium text-slate-400">
        © 2026 REFOUND University Laboratory System. All rights reserved.
      </footer>

    </div>
  );
}
