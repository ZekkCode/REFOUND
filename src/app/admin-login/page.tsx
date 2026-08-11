'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !securityKey) {
      setErrorMsg('Mohon isi ID Admin dan Kunci Keamanan Gerbang.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);

    // Simulated login success
    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070D1F] text-white font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Header bar */}
      <header className="bg-[#0B1633] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between shadow-sm shrink-0">
        <div>
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain h-10 w-auto brightness-0 invert" />
          </Link>
        </div>
        <div>
          <Link href="/" className="text-zinc-400 hover:text-white text-sm font-extrabold transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      {/* Main Gate Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-8">
        <div className="max-w-md w-full bg-[#0B1633] p-8 sm:p-10 rounded-3xl border border-white/5 shadow-[0_15px_50px_rgba(0,0,0,0.4)] space-y-6">
          
          {/* Logo & Welcome */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 mb-1">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Gerbang Aman Petugas Lab
            </h1>
            <p className="text-zinc-400 text-xs font-semibold leading-relaxed">
              Otoritas khusus. Halaman masuk dilindungi oleh kriptografi.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <svg className="w-4.5 h-4.5 shrink-0 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                ID Petugas / Administrator
              </label>
              <input
                type="text"
                placeholder="ID Petugas Lab..."
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full bg-[#121E3D] border border-white/10 focus:ring-1 focus:ring-[#12A99A] focus:border-[#12A99A] outline-none rounded-xl p-3 text-xs font-bold text-white placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">
                Kunci Gerbang Keamanan (Single-Sign-Key)
              </label>
              <input
                type="password"
                placeholder="Masukkan Secure Key..."
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                className="w-full bg-[#121E3D] border border-white/10 focus:ring-1 focus:ring-[#12A99A] focus:border-[#12A99A] outline-none rounded-xl p-3 text-xs font-bold text-white placeholder-zinc-500"
              />
            </div>

            <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
              <p className="text-[10px] font-semibold text-yellow-400/90 leading-relaxed text-center">
                Akses sistem diaudit secara otomatis. Penggunaan tidak sah terancam sanksi akademik.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#12A99A] hover:bg-[#0f9184] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg transition-all mt-4"
            >
              {loading ? 'Mengautentikasi Kunci...' : 'Buka Gerbang Admin'}
            </button>
          </form>

          {/* Redirect to user portal */}
          <div className="text-center pt-4 border-t border-white/5">
            <span className="text-[10px] font-bold text-zinc-500">
              Bukan Petugas?{' '}
              <Link href="/login" className="text-[#12A99A] hover:underline font-extrabold">
                Kembali ke Portal Mahasiswa
              </Link>
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#050A18] text-zinc-500 py-8 px-6 sm:px-12 border-t border-white/5 shrink-0 text-center text-xs font-semibold">
        Sistem Pengawasan Log Otoritas Lab REFOUND &bull; © 2026.
      </footer>

    </div>
  );
}
