'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AdminOverviewDashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Left Admin Sidebar */}
      <aside className="w-64 bg-white text-zinc-600 flex flex-col justify-between shrink-0 min-h-screen border-r border-zinc-200 hidden md:flex">
        <div className="p-6 space-y-8">
          {/* Logo Brand with Admin badge */}
          <div className="pt-2 flex items-center space-x-2.5">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain h-10 w-auto" />
            </Link>
            <span className="bg-[#0B1633] text-white px-2 py-0.5 rounded text-[8px] font-semibold tracking-wider uppercase">
              Admin
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-4 py-3 bg-[#5EEAD4]/80 text-[#0B1633] font-semibold text-sm rounded-xl transition-all shadow-sm"
            >
              <svg className="w-5 h-5 text-[#0B1633]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Overview</span>
            </Link>
            
            <Link
              href="/admin/laporan"
              className="flex items-center justify-between px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Laporan Masuk</span>
              </div>
              <span className="bg-[#FFB020] text-white px-2 py-0.5 rounded-full text-[9px] font-semibold">3</span>
            </Link>

            <Link
              href="/admin/penitipan"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Barang Disimpan</span>
            </Link>

            <Link
              href="/admin/klaim"
              className="flex items-center justify-between px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Klaim</span>
              </div>
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px] font-semibold">18</span>
            </Link>

            <Link
              href="/admin/penyerahan"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 8h.01M12 17h.01" />
              </svg>
              <span>Penyerahan</span>
            </Link>

            <Link
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Audit</span>
            </Link>
          </nav>
        </div>

        {/* Bottom logout row */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100">
          <Link
            href="/admin-login"
            className="flex items-center justify-center w-full px-4 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-white">
        
        {/* Content Wrapper */}
        <div className="flex-1 py-8 px-6 sm:px-12 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#0B1633]">
              Admin Overview
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl font-normal">
              Manage laboratory lost and found inventory and verifications.
            </p>
          </div>

          {/* 3 KPI Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Total Items Logged */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-[#12A99A]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="px-2.5 py-1 text-[9px] font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-full">
                  In Storage
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-[#0B1633] font-mono leading-none">
                  142
                </h3>
                <p className="text-zinc-400 text-xs font-medium">
                  Total Items Logged
                </p>
              </div>
            </div>

            {/* Card 2: Pending Claims */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#FFB020]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="px-2.5 py-1 text-[9px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full uppercase tracking-wider">
                  Action Required
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-[#0B1633] font-mono leading-none">
                  18
                </h3>
                <p className="text-zinc-400 text-xs font-medium">
                  Pending Claims
                </p>
              </div>
            </div>

            {/* Card 3: Successful Returns */}
            <div className="bg-white p-6 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#12A99A]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="px-2.5 py-1 text-[9px] font-semibold text-[#12A99A] bg-teal-50 border border-teal-200 rounded-full tracking-wider">
                  This Week
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-[#0B1633] font-mono leading-none">
                  45
                </h3>
                <p className="text-zinc-400 text-xs font-medium">
                  Successful Returns
                </p>
              </div>
            </div>

          </div>

          {/* Lower Two-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Left Column: Verification Queue */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-[#0B1633] flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#0B1633]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Verification Queue
                </h3>
                <Link href="/admin/klaim" className="text-xs font-semibold text-[#006F69] hover:underline">
                  View All
                </Link>
              </div>

              {/* List of queue items */}
              <div className="space-y-6">
                
                {/* Item 1 */}
                <div className="flex items-center justify-between gap-4 p-4 border border-zinc-100 hover:border-zinc-200 rounded-2xl transition-all">
                  <div className="flex items-center space-x-4">
                    {/* Icon frame */}
                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* Meta info */}
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm text-[#0B1633] leading-tight">
                        MacBook Pro Charger
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Claim ID: #CL-089
                        </span>
                        <span className="px-2 py-0.5 text-[8px] font-semibold uppercase text-amber-600 bg-amber-50 rounded-full">
                          Awaiting Verif
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[10px] font-medium">
                        Claimed by: Budi S. (Computer Science)
                      </p>
                    </div>
                  </div>
                  {/* Action Review */}
                  <Link
                    href="/admin/klaim"
                    className="px-4 py-2 bg-white border border-[#006F69] hover:bg-[#006F69]/5 text-[#006F69] font-semibold text-xs rounded-xl transition-all"
                  >
                    Review
                  </Link>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between gap-4 p-4 border border-zinc-100 hover:border-zinc-200 rounded-2xl transition-all">
                  <div className="flex items-center space-x-4">
                    {/* Icon frame */}
                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    {/* Meta info */}
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm text-[#0B1633] leading-tight">
                        Advanced Calculus Textbook
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Claim ID: #CL-092
                        </span>
                        <span className="px-2 py-0.5 text-[8px] font-semibold uppercase text-amber-600 bg-amber-50 rounded-full">
                          Awaiting Verif
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[10px] font-medium">
                        Claimed by: Ani K. (Mathematics)
                      </p>
                    </div>
                  </div>
                  {/* Action Review */}
                  <Link
                    href="/admin/klaim"
                    className="px-4 py-2 bg-white border border-[#006F69] hover:bg-[#006F69]/5 text-[#006F69] font-semibold text-xs rounded-xl transition-all"
                  >
                    Review
                  </Link>
                </div>

              </div>
            </div>

            {/* Right Column: Activity Log */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-6">
              <h3 className="text-lg font-bold text-[#0B1633] flex items-center border-b border-zinc-100 pb-4">
                <svg className="w-5 h-5 mr-2 text-[#0B1633]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Activity Log
              </h3>

              {/* Vertical timeline details */}
              <div className="relative pl-6 space-y-6">
                {/* Connecting vertical line */}
                <div className="absolute top-2.5 bottom-2.5 left-2.5 w-0.5 bg-zinc-100" />

                {/* Log 1: returned item */}
                <div className="relative space-y-1">
                  {/* Verified circle icon */}
                  <div className="absolute -left-[24px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-4 ring-emerald-50 shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-semibold text-[#0B1633]">
                    Item Returned
                  </h4>
                  <p className="text-zinc-500 text-[10px] font-normal leading-relaxed">
                    Water bottle returned to owner.
                  </p>
                  <p className="text-zinc-400 text-[9px] font-medium">10 mins ago by Admin Sys</p>
                </div>

                {/* Log 2: new item logged */}
                <div className="relative space-y-1">
                  {/* Folder/plus circle icon */}
                  <div className="absolute -left-[24px] top-0.5 w-4 h-4 rounded-full bg-[#0B1633] flex items-center justify-center text-white ring-4 ring-zinc-100 shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-semibold text-[#0B1633]">
                    New Item Logged
                  </h4>
                  <p className="text-zinc-500 text-[10px] font-normal leading-relaxed">
                    Black umbrella found in Lab B added to inventory.
                  </p>
                  <p className="text-zinc-400 text-[9px] font-medium">45 mins ago by Staff Member</p>
                </div>

                {/* Log 3: system sync */}
                <div className="relative space-y-1">
                  {/* Sync blue icon */}
                  <div className="absolute -left-[24px] top-0.5 w-4 h-4 rounded-full bg-[#6366F1] flex items-center justify-center text-white ring-4 ring-indigo-50 shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-semibold text-[#0B1633]">
                    System Sync
                  </h4>
                  <p className="text-zinc-500 text-[10px] font-semibold leading-relaxed">
                    Automated inventory sync completed.
                  </p>
                  <p className="text-zinc-400 text-[9px] font-bold">2 hours ago</p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <footer className="bg-[#0B1633] text-white py-12 px-6 sm:px-12 border-t border-white/10 shrink-0">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <Image src="/logo.png" alt="REFOUND Logo" width={110} height={32} className="object-contain h-8 w-auto brightness-0 invert" />
              <span className="text-xs text-zinc-400 font-semibold">
                © 2024 REFOUND University Laboratory System. All rights reserved.
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-zinc-300">
              <Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link>
              <Link href="#" className="hover:text-white transition-colors">Panduan Komunitas</Link>
              <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-white transition-colors">Kontak Admin Lab</Link>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}

