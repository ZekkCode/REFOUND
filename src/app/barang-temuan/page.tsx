'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HalamanBarangTemuan() {
  const [kataKunci, setKataKunci] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');

  const daftarSemuaTemuan = [
    {
      id: 'item-1',
      title: 'Laptop Hitam',
      zona: 'Lab Komputer A',
      kategori: 'Elektronik',
      tags: ['Elektronik', 'Hitam'],
      image: '/laptop_dark_cafe.png',
      hasImage: true,
    },
    {
      id: 'item-2',
      title: 'Map Dokumen Biru',
      zona: 'Lobi Gedung B',
      kategori: 'Dokumen',
      tags: ['Dokumen', 'Biru'],
      image: '',
      hasImage: false,
    },
    {
      id: 'item-3',
      title: 'Kunci Mobil',
      zona: 'Area Parkir C',
      kategori: 'Lainnya',
      tags: ['Lainnya'],
      image: '/kunci_mobil.png',
      hasImage: true,
    },
  ];

  const temuanTersaring = daftarSemuaTemuan.filter((item) => {
    const cocokKata =
      item.title.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.kategori.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.zona.toLowerCase().includes(kataKunci.toLowerCase());
    
    const cocokFilter = 
      filterKategori === 'Semua' || 
      (filterKategori === 'Alat Tulis' && item.kategori === 'Lainnya') || // Mock mapping
      item.kategori === filterKategori;

    return cocokKata && cocokFilter;
  });

  return (
    <div className="min-h-screen flex bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-white text-zinc-600 flex flex-col justify-between shrink-0 min-h-screen border-r border-zinc-200 hidden md:flex">
        <div className="p-6 space-y-8">
          {/* Logo Brand */}
          <div className="pt-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain h-10 w-auto" />
            </Link>
          </div>

          {/* Quick Action Button */}
          <div className="pt-2">
            <Link
              href="/lapor/kehilangan"
              className="flex items-center justify-center w-full px-4 py-3 bg-[#006F69] hover:bg-[#006f69]/90 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Lapor
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/barang-temuan"
              className="flex items-center space-x-3 px-4 py-3 bg-[#006F69] text-white font-bold text-sm rounded-xl transition-all shadow-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Barang Temuan</span>
            </Link>
            <Link
              href="/kecocokan"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="5" />
                <circle cx="15" cy="12" r="5" />
              </svg>
              <span>Kecocokan</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Laporan Saya</span>
            </Link>
            <Link
              href="/profil"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profil</span>
            </Link>
          </nav>
        </div>

        {/* Logout Link */}
        <div className="bg-zinc-50 border-t border-zinc-100 p-4">
          <Link
            href="/login"
            className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:text-red-600 font-bold text-sm rounded-xl transition-all"
          >
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-white pb-20 md:pb-0">
        
        {/* Content Wrapper */}
        <div className="flex-1 py-8 px-6 sm:px-12 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-[#0B1633]">
              Cari Barang Temuan
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl font-medium">
              Telusuri daftar barang yang ditemukan di area kampus. Sistem kami menjaga privasi data spesifik hingga proses verifikasi kepemilikan.
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="relative w-full border border-zinc-200 rounded-2xl flex items-center p-1.5 focus-within:ring-1 focus-within:ring-[#006F69] focus-within:border-[#006F69] bg-white">
            <svg className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Ketik jenis barang, warna, atau merek..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-3 pr-24 py-2.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 outline-none"
            />
            <button className="absolute right-1.5 px-6 py-2.5 bg-black hover:bg-black/90 text-white font-bold text-xs rounded-xl shadow-md transition-all">
              Cari
            </button>
          </div>

          {/* Category Filter Tags */}
          <div className="flex flex-wrap gap-3">
            {['Semua', 'Elektronik', 'Dokumen', 'Alat Tulis', 'Lainnya'].map((cat) => {
              const active = filterKategori === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilterKategori(cat)}
                  className={`px-5 py-2 text-xs font-bold rounded-full border transition-all duration-300 ${
                    active
                      ? 'border-[#006F69] text-[#006F69] bg-[#006F69]/5 shadow-sm'
                      : 'border-zinc-200 text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid Cards list */}
          {temuanTersaring.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-zinc-200 rounded-3xl text-zinc-400 text-sm font-semibold">
              Tidak ada barang temuan yang cocok.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {temuanTersaring.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] hover:shadow-[0_15px_40px_rgba(11,22,51,0.05)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative">
                    {/* Disimpan Admin Badge */}
                    <span className="absolute top-3 left-3 bg-[#0B1633] text-white px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center shadow-md z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12A99A] mr-1.5 animate-pulse" />
                      Disimpan Admin
                    </span>

                    {/* Image or Placeholder Frame */}
                    <div className="w-full h-44 relative bg-zinc-100 border-b border-zinc-50 flex items-center justify-center">
                      {item.hasImage ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-400">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-[#0B1633] leading-tight">
                        {item.title}
                      </h3>
                      
                      {/* Location text */}
                      <div className="flex items-center text-xs font-semibold text-zinc-400">
                        <svg className="w-4 h-4 mr-1 text-zinc-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Zona: {item.zona}</span>
                      </div>
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[10px] font-bold bg-zinc-50 border border-zinc-200 text-zinc-500 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Link
                        href={`/barang-temuan/${item.id}`}
                        className="flex items-center justify-center w-full px-4 py-2.5 bg-white border border-[#006F69] hover:bg-[#006F69]/5 text-[#006F69] font-bold text-sm rounded-xl transition-all duration-300"
                      >
                        Klaim Barang
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {temuanTersaring.length > 0 && (
            <div className="flex justify-center pt-8">
              <button className="px-6 py-2.5 border border-zinc-200 text-zinc-500 hover:border-zinc-300 font-extrabold text-xs rounded-full transition-all bg-white shadow-sm">
                Muat Lebih Banyak
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="bg-[#0B1633] text-white py-12 px-6 sm:px-12 border-t border-white/10 shrink-0">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start space-y-3 max-w-sm">
              <span className="font-black text-xl tracking-wider">REFOUND</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold text-center md:text-left">
                Sistem Layanan Laboratorium Universitas untuk mengelola pelaporan dan penemuan barang hilang secara terstruktur dan aman.
              </p>
              <span className="text-[11px] text-zinc-500 font-semibold pt-1">
                © 2024 REFOUND University Laboratory System. All rights reserved.
              </span>
            </div>
            
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-zinc-300">
                <Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link>
                <Link href="#" className="hover:text-white transition-colors">Panduan Komunitas</Link>
                <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                <Link href="#" className="hover:text-white transition-colors">Kontak Admin Lab</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex items-center justify-around py-2.5 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <Link
          href="/dashboard"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link
          href="/barang-temuan"
          className="flex flex-col items-center space-y-0.5 text-[#006F69]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-[10px] font-black">Temuan</span>
        </Link>
        <Link
          href="/kecocokan"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="5" />
            <circle cx="15" cy="12" r="5" />
          </svg>
          <span className="text-[10px] font-bold">Kecocokan</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span className="text-[10px] font-bold">Laporan Saya</span>
        </Link>
        <Link
          href="/profil"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-bold">Profil</span>
        </Link>
      </div>
    </div>
  );
}
