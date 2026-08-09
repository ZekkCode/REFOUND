'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigasiUtama() {
  const pathname = usePathname();

  const isAktif = (path: string) => pathname === path;

  return (
    <header className="bg-white/90 dark:bg-[#0B1633]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B1633] dark:bg-[#12A99A] text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              RF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#0B1633] dark:text-white">
                  REFOUND
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#12A99A]/10 text-[#12A99A] px-2 py-0.5 rounded-full border border-[#12A99A]/20">
                  Lab TIF & SI
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Lost & Found Digital Komunitas Gedung Lab
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2 text-xs font-semibold">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isAktif('/')
                ? 'bg-[#0B1633] text-white dark:bg-[#12A99A]'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/barang-temuan"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isAktif('/barang-temuan')
                ? 'bg-[#0B1633] text-white dark:bg-[#12A99A]'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Barang Temuan
          </Link>
          <Link
            href="/kecocokan"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isAktif('/kecocokan')
                ? 'bg-[#0B1633] text-white dark:bg-[#12A99A]'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Kecocokan AI
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isAktif('/dashboard')
                ? 'bg-[#0B1633] text-white dark:bg-[#12A99A]'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Laporan Saya
          </Link>
          <Link
            href="/admin"
            className={`px-3 py-2 rounded-lg border transition-colors ${
              pathname.startsWith('/admin')
                ? 'border-[#FF765F] bg-[#FF765F]/10 text-[#FF765F]'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Admin Lab
          </Link>
          <Link
            href="/lapor/kehilangan"
            className="ml-2 px-3.5 py-2 rounded-lg bg-[#12A99A] hover:bg-[#0f9184] text-white shadow-sm font-bold transition-all"
          >
            + Lapor Barang
          </Link>
        </nav>
      </div>
    </header>
  );
}
