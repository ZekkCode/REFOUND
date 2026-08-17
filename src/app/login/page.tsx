'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (isRegisterMode) {
      // Registration validation
      if (!nama || !nim || !email || !password || !konfirmasiPassword) {
        setErrorMsg('Mohon lengkapi seluruh kolom pendaftaran.');
        return;
      }
      if (password !== konfirmasiPassword) {
        setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg('Pendaftaran akun berhasil! Silakan masuk menggunakan NIM Anda.');
        setIsRegisterMode(false);
        // Clear registration fields
        setNama('');
        setKonfirmasiPassword('');
      }, 1500);
    } else {
      // Login validation
      if (!nim || !password) {
        setErrorMsg('Mohon isi NIM dan Kata Sandi Anda.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Header bar */}
      <header className="bg-white border-b border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between shadow-sm shrink-0">
        <div>
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain h-10 w-auto" />
          </Link>
        </div>
        <div>
          <Link href="/" className="text-zinc-500 hover:text-[#0B1633] text-sm font-extrabold transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      {/* Main Gate Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-8 my-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-zinc-150 shadow-[0_10px_45px_rgba(11,22,51,0.02)] space-y-6">
          
          {/* Logo & Welcome */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={140} height={44} className="object-contain" />
            </div>
            <h1 className="text-2xl font-black text-[#0B1633] tracking-tight">
              {isRegisterMode ? 'Daftar Akun Mahasiswa' : 'Portal Masuk Mahasiswa'}
            </h1>
            <p className="text-zinc-400 text-xs font-semibold leading-relaxed">
              {isRegisterMode 
                ? 'Lengkapi form di bawah ini untuk membuat akun baru.' 
                : 'Gunakan akun universitas (NIM) Anda untuk masuk ke sistem.'}
            </p>
          </div>

          {successMsg && (
            <div className="p-3.5 bg-teal-50 border border-teal-150 text-[#12A99A] text-xs font-bold rounded-2xl flex items-center space-x-2">
              <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-150 text-red-500 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full bg-white border border-zinc-200 focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none rounded-xl p-3 text-xs font-bold text-[#0B1633]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                    Program Studi
                  </label>
                  <select
                    value={prodi}
                    onChange={(e) => setProdi(e.target.value)}
                    className="w-full bg-white border border-zinc-200 focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none rounded-xl p-3 text-xs font-bold text-[#0B1633]"
                  >
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                    Email Kampus
                  </label>
                  <input
                    type="email"
                    placeholder="Contoh: budi@student.unpad.ac.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-zinc-200 focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none rounded-xl p-3 text-xs font-bold text-[#0B1633]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                Nomor Induk Mahasiswa (NIM)
              </label>
              <input
                type="text"
                placeholder="Contoh: 13519099"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full bg-white border border-zinc-200 focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none rounded-xl p-3 text-xs font-bold text-[#0B1633]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-zinc-200 focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none rounded-xl p-3 text-xs font-bold text-[#0B1633]"
              />
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  placeholder="Masukkan ulang kata sandi..."
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  className="w-full bg-white border border-zinc-200 focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none rounded-xl p-3 text-xs font-bold text-[#0B1633]"
                />
              </div>
            )}

            {!isRegisterMode && (
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-zinc-300 text-[#006F69] focus:ring-[#006F69]" />
                  <span>Ingat Saya</span>
                </label>
                <Link href="#" className="text-[#006F69] hover:underline">
                  Lupa Sandi?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all mt-4"
            >
              {loading 
                ? (isRegisterMode ? 'Memproses Pendaftaran...' : 'Memproses Masuk...') 
                : (isRegisterMode ? 'Daftar Akun' : 'Masuk')}
            </button>
          </form>

          {/* Toggle Button for Login / Registration */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs font-extrabold text-[#006F69] hover:underline focus:outline-none"
            >
              {isRegisterMode ? 'Sudah memiliki akun? Masuk Sekarang' : 'Belum punya akun? Daftar Sekarang'}
            </button>
          </div>

          {/* Secure gate redirect for lab admins */}
          <div className="text-center pt-4 border-t border-zinc-100">
            <span className="text-[10px] font-bold text-zinc-400">
              Petugas Lab?{' '}
              <Link href="/admin-login" className="text-[#006F69] hover:underline font-extrabold">
                Masuk di Gerbang Admin
              </Link>
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1633] text-white py-8 px-6 sm:px-12 border-t border-white/10 shrink-0 text-center text-xs font-semibold text-zinc-400">
        © 2026 REFOUND University Laboratory System. All rights reserved.
      </footer>

    </div>
  );
}
