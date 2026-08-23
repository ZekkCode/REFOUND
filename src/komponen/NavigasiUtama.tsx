'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavigasiUtama() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-10 lg:px-16 py-4 flex items-center justify-between relative">
        
        {/* Brand Logo & Community Tag */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 transition-opacity hover:opacity-90">
            <Image src="/logo.png" alt="REFOUND Logo" width={140} height={42} className="object-contain h-8 sm:h-10 w-auto" priority />
            <div className="h-5 sm:h-6 w-px bg-slate-200" />
            <Image src="/TCC_LOGO.png" alt="TCC Logo" width={38} height={38} className="object-contain h-7 sm:h-9 w-auto" priority />
          </Link>
        </div>

        {/* Navigation Menus */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-bold text-slate-600 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-all"
          >
            Beranda
          </Link>
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-all"
          >
            Dashboard
          </Link>
          <Link
            href="/barang-temuan"
            className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-all"
          >
            Katalog Temuan
          </Link>
        </nav>

        {/* Action Button on Far Right & Hamburger Toggler */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/lapor/kehilangan"
            className="px-3.5 py-2 sm:px-4 sm:py-2 bg-[#0F172A] hover:bg-[#0D9488] text-white font-bold rounded-xl shadow-xs text-xs transition-all shrink-0"
          >
            <span className="hidden sm:inline">+ Buat Laporan</span>
            <span className="sm:hidden">+ Lapor</span>
          </Link>

          {/* Hamburger Icon Button */}
          <button
            type="button"
            onClick={() => setMenuTerbuka(!menuTerbuka)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer shrink-0"
            aria-label="Tampilkan menu"
          >
            {menuTerbuka ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Drawer Menu */}
      {menuTerbuka && (
        <div className="absolute top-18 left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-4 flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMenuTerbuka(false)}
              className="text-sm font-bold text-slate-700 hover:text-[#12A99A] py-2 border-b border-slate-100"
            >
              Beranda
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMenuTerbuka(false)}
              className="text-sm font-bold text-slate-700 hover:text-[#12A99A] py-2 border-b border-slate-100"
            >
              Dashboard
            </Link>
            <Link
              href="/barang-temuan"
              onClick={() => setMenuTerbuka(false)}
              className="text-sm font-bold text-slate-700 hover:text-[#12A99A] py-2 border-b border-slate-100"
            >
              Katalog Temuan
            </Link>
            <Link
              href="/lapor/kehilangan"
              onClick={() => setMenuTerbuka(false)}
              className="text-sm font-bold text-slate-700 hover:text-[#12A99A] py-2 border-b border-slate-100"
            >
              Lapor Kehilangan
            </Link>
            <Link
              href="/lapor/penemuan"
              onClick={() => setMenuTerbuka(false)}
              className="text-sm font-bold text-slate-700 hover:text-[#12A99A] py-2"
            >
              Lapor Penemuan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
