'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SidebarMahasiswa() {
  const pathname = usePathname();
  const [bukaMenuLapor, setBukaMenuLapor] = useState(false);

  const menuUtama = [
    {
      nama: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      active: pathname === '/dashboard',
    },
    {
      nama: 'Temuan',
      href: '/barang-temuan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
      active: pathname.startsWith('/barang-temuan'),
    },
    {
      nama: 'Kecocokan',
      href: '/kecocokan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      active: pathname.startsWith('/kecocokan'),
    },
    {
      nama: 'Profil',
      href: '/profil',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      active: pathname.startsWith('/profil'),
    },
  ];

  return (
    <>
      {/* Desktop Clean Sidebar */}
      <aside className="w-64 bg-white text-[#0B1633] flex flex-col justify-between p-5 shrink-0 min-h-screen border-r border-slate-200/70 hidden md:flex">
        <div className="space-y-6">
          <div className="px-2 pt-2">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="REFOUND Logo"
                width={130}
                height={38}
                className="object-contain h-9 w-auto"
                priority
              />
              <div className="h-6 w-px bg-slate-200" />
              <Image
                src="/TCC_LOGO.png"
                alt="TCC Logo"
                width={36}
                height={36}
                className="object-contain h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Quick Action Pill Buttons */}
          <div className="space-y-2 pt-1">
            <Link
              href="/lapor/kehilangan"
              className="flex items-center justify-center w-full px-3.5 py-2.5 bg-[#0B1633] hover:bg-[#0B1633]/90 text-white font-semibold text-xs rounded-xl shadow-xs transition-all duration-150"
            >
              <svg className="w-4 h-4 mr-2 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              Lapor Kehilangan
            </Link>
            <Link
              href="/lapor/penemuan"
              className="flex items-center justify-center w-full px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-[#0B1633] font-semibold text-xs rounded-xl transition-all duration-150"
            >
              <svg className="w-4 h-4 mr-2 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Lapor Penemuan
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Menu Utama
            </span>
            {menuUtama.map((item) => (
              <Link
                key={item.nama}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 font-medium text-xs rounded-xl transition-all duration-150 ${
                  item.active
                    ? 'bg-teal-50/80 text-[#12A99A] font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-[#0B1633] hover:bg-slate-50'
                }`}
              >
                <span className={item.active ? 'text-[#12A99A]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.nama}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Logout Link */}
        <div className="pt-4 border-t border-slate-100 px-1">
          <Link
            href="/login"
            className="flex items-center space-x-3 px-3 py-2 text-slate-500 hover:text-[#FF765F] hover:bg-rose-50/60 font-medium text-xs rounded-xl transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar: 5 Items with Center Lapor */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 flex items-center justify-around py-1.5 px-2 z-50 shadow-lg">
        
        {/* Item 1: Dashboard */}
        <Link
          href={menuUtama[0].href}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all flex-1 ${
            menuUtama[0].active ? 'text-[#12A99A] font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${menuUtama[0].active ? 'bg-teal-50 text-[#12A99A]' : ''}`}>
            {menuUtama[0].icon}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{menuUtama[0].nama}</span>
        </Link>

        {/* Item 2: Barang Temuan */}
        <Link
          href={menuUtama[1].href}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all flex-1 ${
            menuUtama[1].active ? 'text-[#12A99A] font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${menuUtama[1].active ? 'bg-teal-50 text-[#12A99A]' : ''}`}>
            {menuUtama[1].icon}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{menuUtama[1].nama}</span>
        </Link>

        {/* Item 3 (CENTER): Fitur Lapor */}
        <div className="flex flex-col items-center -mt-4 px-1 shrink-0">
          <button
            type="button"
            onClick={() => setBukaMenuLapor(true)}
            className="w-12 h-12 rounded-full bg-[#0B1633] hover:bg-[#12A99A] text-white flex items-center justify-center shadow-md shadow-[#0B1633]/20 ring-4 ring-white transition-all duration-200 active:scale-95 cursor-pointer"
            title="Buat Laporan"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>
          <span className="text-[10px] font-semibold text-[#0B1633] mt-1">Lapor</span>
        </div>

        {/* Item 4: Kecocokan AI */}
        <Link
          href={menuUtama[2].href}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all flex-1 ${
            menuUtama[2].active ? 'text-[#12A99A] font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${menuUtama[2].active ? 'bg-teal-50 text-[#12A99A]' : ''}`}>
            {menuUtama[2].icon}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{menuUtama[2].nama}</span>
        </Link>

        {/* Item 5: Profil */}
        <Link
          href={menuUtama[3].href}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all flex-1 ${
            menuUtama[3].active ? 'text-[#12A99A] font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-lg ${menuUtama[3].active ? 'bg-teal-50 text-[#12A99A]' : ''}`}>
            {menuUtama[3].icon}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">{menuUtama[3].nama}</span>
        </Link>

      </div>

      {/* Modal Pilihan Lapor untuk Mobile */}
      {bukaMenuLapor && (
        <div className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-[#12A99A] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0B1633]">Buat Laporan</h3>
              </div>
              <button
                type="button"
                onClick={() => setBukaMenuLapor(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Pilih jenis laporan:
            </p>

            <div className="space-y-2.5 pt-1">
              <Link
                href="/lapor/kehilangan"
                onClick={() => setBukaMenuLapor(false)}
                className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-200 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1633] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#0B1633] group-hover:text-[#12A99A] transition-colors">
                    Barang Hilang
                  </h4>
                  <p className="text-[11px] text-slate-400 font-normal">
                    Lapor barang yang hilang untuk dicocokkan otomatis.
                  </p>
                </div>
              </Link>

              <Link
                href="/lapor/penemuan"
                onClick={() => setBukaMenuLapor(false)}
                className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-200 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#12A99A] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-[#0B1633] group-hover:text-[#12A99A] transition-colors">
                    Barang Ditemukan
                  </h4>
                  <p className="text-[11px] text-slate-400 font-normal">
                    Lapor barang temuan untuk dititipkan ke lab.
                  </p>
                </div>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setBukaMenuLapor(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs rounded-xl transition-all cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
