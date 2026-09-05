'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#0B1633] selection:bg-[#12A99A]/20 font-sans antialiased">
      
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 transition-all">
        <div className="w-full px-4 sm:px-10 lg:px-16 h-20 flex items-center justify-between relative">
          {/* Brand Logo & Event Co-branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 transition-all hover:opacity-90 group">
              <Image
                src="/logo.png"
                alt="REFOUND Logo"
                width={140}
                height={42}
                className="object-contain h-8 sm:h-10 w-auto group-hover:scale-102 transition-transform duration-300"
                priority
              />
              <div className="h-5 sm:h-6 w-px bg-slate-200" />
              <Image
                src="/TCC_LOGO.png"
                alt="TCC Logo"
                width={38}
                height={38}
                className="object-contain h-7 sm:h-9 w-auto group-hover:scale-102 transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/barang-temuan" className="hover:text-[#12A99A] hover:bg-slate-50 px-3 py-2 rounded-xl transition-all duration-200">
              Katalog Temuan
            </Link>
            <Link href="/lapor/kehilangan" className="hover:text-[#12A99A] hover:bg-slate-50 px-3 py-2 rounded-xl transition-all duration-200">
              Lapor Kehilangan
            </Link>
            <Link href="/lapor/penemuan" className="hover:text-[#12A99A] hover:bg-slate-50 px-3 py-2 rounded-xl transition-all duration-200">
              Lapor Penemuan
            </Link>
          </nav>

          {/* Auth Button & Hamburger Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              href="/login"
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shrink-0"
            >
              <span className="hidden sm:inline">Masuk Portal Mahasiswa</span>
              <span className="sm:hidden">Masuk</span>
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
          <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden z-40 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="px-6 py-4 flex flex-col space-y-3">
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

      <main className="flex-1 flex flex-col">
        
        {/* 2. Hero Section with Premium Backdrop Gradient */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-6 overflow-hidden">
          {/* Premium Radial Accent Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-50/60 via-slate-50 to-slate-100/50 -z-10" />
          
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Hero Content */}
              <div className="lg:col-span-6 space-y-6 text-left">
                {/* Badge Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200/80 rounded-full text-xs font-semibold text-slate-600 shadow-sm animate-fade-in">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#12A99A] animate-pulse" />
                  <span>Sistem Lost & Found Kampus</span>
                </div>

                {/* Heading with Brand Gradient */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B1633] leading-[1.15] tracking-tight">
                  Temukan barangmu, <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#12A99A] to-[#0D9488]">kembalikan</span> <br />
                  ke pemiliknya.
                </h1>

                {/* Subtitle */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                  Platform pelaporan barang hilang dan temuan di lingkungan kampus dengan pencocokan cerdas dan verifikasi kepemilikan yang aman.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/lapor/kehilangan"
                    className="px-6 py-3 bg-[#0B1633] hover:bg-[#12A99A] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#12A99A] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Lapor Kehilangan
                  </Link>
                  <Link
                    href="/lapor/penemuan"
                    className="px-6 py-3 bg-white border border-[#12A99A] text-[#12A99A] hover:bg-[#12A99A]/5 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Lapor Temuan
                  </Link>
                  <Link
                    href="/barang-temuan"
                    className="px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs hover:shadow-xs transition-all duration-200"
                  >
                    Katalog Temuan
                  </Link>
                </div>

                {/* Key Highlights */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-6">
                  <div>
                    <span className="block text-2xl font-bold text-[#0B1633] font-mono leading-none">&lt; 1s</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Pencocokan Cepat</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#12A99A] font-mono leading-none">100%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Privasi Terjaga</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#0B1633] font-mono leading-none">Admin Lab</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Penitipan Aman</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Card Illustration */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-lg bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                  <Image
                    src="/hero_illustration.png"
                    alt="REFOUND Lost and Found System"
                    width={500}
                    height={350}
                    className="rounded-2xl w-full h-auto object-cover border border-slate-100"
                    priority
                  />

                  <div className="mt-4 p-4 bg-[#0B1633] text-white rounded-2xl flex items-center justify-between shadow-inner">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold text-[#12A99A] tracking-widest block">Verifikasi Terlindungi</span>
                      <p className="text-xs text-slate-200 font-medium">Ciri khusus barang diverifikasi oleh petugas sebelum serah terima.</p>
                    </div>
                    <span className="px-3 py-1 bg-[#12A99A] text-white text-[10px] font-black rounded-lg uppercase tracking-wider shrink-0 self-center shadow-xs">
                      Aman
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Cara Kerja 3-Langkah */}
        <section className="bg-white py-20 px-6 border-y border-slate-200/80">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#12A99A] block">Alur Penggunaan</span>
              <h2 className="text-3xl font-extrabold text-[#0B1633] tracking-tight">
                Bagaimana REFOUND Bekerja?
              </h2>
              <p className="text-slate-500 text-sm font-normal">
                Alur pelaporan yang mudah, terstruktur, dan aman bagi seluruh civitas kampus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between space-y-5 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#12A99A] border border-teal-100 flex items-center justify-center font-bold text-sm shadow-xs">
                    1
                  </div>
                  <h3 className="text-base font-bold text-[#0B1633]">Lapor & Pilih Lokasi</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Tuliskan deskripsi umum barang temuan atau kehilangan, lalu pilih zona lokasi kampus tempat kejadian.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#12A99A]">
                  Ciri Rahasia Terjaga
                </span>
              </div>

              {/* Card 2 */}
              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between space-y-5 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#6366F1] border border-indigo-100 flex items-center justify-center font-bold text-sm shadow-xs">
                    2
                  </div>
                  <h3 className="text-base font-bold text-[#0B1633]">Pencocokan Cerdas</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Sistem otomatis menghitung kecocokan deskripsi, foto, lokasi zona, dan rentang waktu kejadian.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#6366F1]">
                  Hasil Real-time
                </span>
              </div>

              {/* Card 3 */}
              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between space-y-5 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] border border-emerald-100 flex items-center justify-center font-bold text-sm shadow-xs">
                    3
                  </div>
                  <h3 className="text-base font-bold text-[#0B1633]">Verifikasi & Pengambilan</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Jawab pertanyaan verifikasi untuk membuktikan kepemilikan, lalu ambil barang dengan kode serah terima.
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#10B981]">
                  Kode OTP Pengambilan
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Fitur Keamanan */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Box 1 */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#12A99A] border border-teal-100 flex items-center justify-center shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0B1633]">Perlindungan Ciri Rahasia</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Ciri unik seperti nomor seri atau goresan tersembunyi disimpan aman dan hanya digunakan saat proses verifikasi klaim.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#6366F1] border border-indigo-100 flex items-center justify-center shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0B1633]">Verifikasi Cepat & Akurat</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Jawaban klaim dievaluasi untuk memastikan kesesuaian ciri barang secara objektif, aman, dan tepat sasaran.
              </p>
            </div>
            
          </div>
        </section>
      </main>

      {/* 5. Clean Modern Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200/80 py-10 px-6">
        <div className="w-full px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-90 font-bold">
              <Image src="/logo.png" alt="REFOUND Logo" width={120} height={36} className="object-contain h-8 w-auto" />
              <div className="h-5 w-px bg-slate-200" />
              <Image src="/TCC_LOGO.png" alt="TCC Logo" width={32} height={32} className="object-contain h-7 w-auto" />
            </Link>
            <p className="text-xs text-slate-400 font-semibold">
              © 2026 REFOUND. Sistem Lost & Found Digital Komunitas Kampus Universitas Trunojoyo Madura.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-bold text-slate-500">
            <Link href="/barang-temuan" className="hover:text-[#12A99A] transition-colors">Katalog Temuan</Link>
            <Link href="/lapor/kehilangan" className="hover:text-[#12A99A] transition-colors">Lapor Kehilangan</Link>
            <Link href="/lapor/penemuan" className="hover:text-[#12A99A] transition-colors">Lapor Penemuan</Link>
            <Link href="/admin-login" className="hover:text-[#12A99A] transition-colors">Gerbang Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
