'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SidebarAdmin() {
  const pathname = usePathname();

  const menuItems = [
    {
      nama: 'Ringkasan',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
      active: pathname === '/admin',
    },
    {
      nama: 'Laporan Masuk',
      href: '/admin/laporan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      active: pathname === '/admin/laporan',
    },
    {
      nama: 'Barang Disimpan',
      href: '/admin/penitipan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      active: pathname === '/admin/penitipan',
    },
    {
      nama: 'Verifikasi Klaim',
      href: '/admin/klaim',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      active: pathname === '/admin/klaim',
    },
    {
      nama: 'Penyerahan',
      href: '/admin/penyerahan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 8h.01M12 17h.01" />
        </svg>
      ),
      active: pathname === '/admin/penyerahan',
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white text-[#0B1633] flex-col justify-between p-5 shrink-0 min-h-screen border-r border-slate-200/70 hidden md:flex">
        <div className="space-y-6">
          <div className="px-2 pt-2 flex items-center space-x-2.5">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={130} height={38} className="object-contain h-9 w-auto" priority />
            </Link>
            <span className="bg-[#0B1633] text-white px-2 py-0.5 rounded text-[8px] font-semibold tracking-wider uppercase">
              Admin
            </span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 text-sm rounded-xl transition-all ${
                  item.active
                    ? 'bg-teal-50 text-[#12A99A] font-semibold border border-teal-100'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                {item.icon}
                <span>{item.nama}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom logout */}
        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/admin-login"
            className="flex items-center justify-center w-full px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-medium text-xs rounded-xl shadow-sm transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around py-2 z-50 md:hidden">
        {menuItems.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              item.active ? 'text-[#12A99A]' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.nama}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
