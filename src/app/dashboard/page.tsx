'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';

export default function DashboardMahasiswaPage() {
  const [laporanSaya, setLaporanSaya] = useState<ItemLaporan[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data laporan langsung dari Supabase API
  useEffect(() => {
    async function loadLaporan() {
      try {
        const res = await fetch('/api/laporan');
        const json = await res.json();
        if (json.sukses && Array.isArray(json.data)) {
          setLaporanSaya(json.data);
        }
      } catch (e) {
        console.warn('Load live reports:', e);
      } finally {
        setLoading(false);
      }
    }
    loadLaporan();
  }, []);

  const totalLaporan = laporanSaya.length;
  const matchKandidat = laporanSaya.find(l => l.status === 'potensi_cocok') || laporanSaya[0];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-28 md:pb-12">
        <TopbarMahasiswa judulHalaman="Dashboard" />

        <main className="flex-1 py-6 sm:py-8 px-4 sm:px-8 max-w-5xl w-full mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Banner - Spacious & Clean */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#12A99A] text-[11px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12A99A]" />
                Portal Mahasiswa
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
                Selamat Datang, Budi Santoso
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl leading-relaxed">
                Pantau laporan barang hilang Anda, laporkan temuan baru, dan periksa notifikasi kecocokan cerdas AI laboratorium.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
              <Link
                href="/lapor/kehilangan"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-150"
              >
                <svg className="w-4 h-4 text-[#12A99A] group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Lapor Kehilangan</span>
              </Link>
              <Link
                href="/lapor/penemuan"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-[#0B1633] font-medium text-xs sm:text-sm rounded-xl transition-all duration-150"
              >
                <svg className="w-4 h-4 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Lapor Temuan</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar - Responsive & Spacious (Stacked on Mobile, 3-Cols on Tablet/Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Laporan Aktif</span>
                <span className="text-2xl font-bold text-[#0B1633] block">
                  {loading ? '...' : totalLaporan}
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0B1633] shrink-0">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Kecocokan AI</span>
                <span className="text-2xl font-bold text-[#12A99A] block">1 Match</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#12A99A] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Status Fisik</span>
                <span className="text-2xl font-bold text-[#10B981] block">Disimpan</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#10B981] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>

          </div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left: AI Match Highlight Card */}
            <section className="lg:col-span-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Kandidat Kecocokan AI
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#12A99A] text-white rounded-full">
                    1 Baru
                  </span>
                </div>
                <Link href="/kecocokan" className="text-xs font-medium text-[#12A99A] hover:underline">
                  Lihat Semua
                </Link>
              </div>

              {/* Match Card - Spacious & Clean */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-[#12A99A] uppercase tracking-wider block">
                      {matchKandidat?.kategori || 'Laptop & Komputer'}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1633] leading-snug">
                      {matchKandidat?.deskripsi_publik ? matchKandidat.deskripsi_publik.split('\n')[0].replace('Nama Barang: ', '') : 'MacBook Pro 14" (Space Grey)'}
                    </h3>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full shrink-0">
                    86% Cocok
                  </span>
                </div>

                {/* Attributes Tags */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Atribut Sesuai
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Zona: {matchKandidat?.nama_zona || 'Lab TIF'}
                  </span>
                </div>

                {/* Storage Status */}
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs font-medium text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                  <span>Disimpan Aman di Ruang Admin Lab</span>
                </div>

                <Link
                  href="/kecocokan"
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-150"
                >
                  Tinjau & Klaim Barang &rarr;
                </Link>
              </div>

              {/* Privacy Notice Card */}
              <div className="p-3.5 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-start gap-2.5 text-slate-500 text-xs font-normal leading-relaxed">
                <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Ciri rahasia barang temuan dilindungi sistem. Hanya Admin Lab yang memverifikasi keaslian bukti kepemilikan Anda.</span>
              </div>
            </section>

            {/* Right: Active Reports Section */}
            <section className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Laporan Aktif Saya
                </h2>
                <span className="text-xs font-normal text-slate-400">{totalLaporan} Laporan Terdaftar</span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs animate-pulse space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-1.5 bg-slate-100 rounded w-full pt-2" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {laporanSaya.map((lap) => {
                    const isKehilangan = lap.tipe === 'kehilangan';
                    const isPotensiCocok = lap.status === 'potensi_cocok';

                    return (
                      <div key={lap.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 shadow-xs space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isKehilangan ? 'bg-teal-50 border border-teal-100 text-[#12A99A]' : 'bg-slate-50 border border-slate-100 text-slate-500'
                            }`}>
                              {isKehilangan ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm sm:text-base text-[#0B1633]">
                                {lap.deskripsi_publik ? lap.deskripsi_publik.split('\n')[0].replace('Nama Barang: ', '') : lap.kategori}
                              </h3>
                              <p className="text-slate-400 text-xs font-normal mt-0.5">
                                {isKehilangan ? 'Hilang' : 'Ditemukan'} pada {lap.waktu_kejadian?.slice(0, 16).replace('T', ' ')} &bull; {lap.nama_zona || lap.id_zona}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase rounded-full shrink-0 ${
                            isPotensiCocok 
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/70' 
                              : 'bg-emerald-50 text-[#10B981] border border-emerald-200/70'
                          }`}>
                            {isPotensiCocok ? 'Potensi Cocok AI' : 'Disimpan Admin'}
                          </span>
                        </div>

                        {/* Minimalist Linear Progress Bar */}
                        <div className="pt-2 border-t border-slate-100">
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-[#12A99A] rounded-full" />
                              <span className="text-[11px] font-medium text-[#12A99A] block">Dilaporkan</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-[#12A99A] rounded-full" />
                              <span className="text-[11px] font-medium text-[#12A99A] block">Diproses AI</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className={`h-1.5 w-full rounded-full ${isPotensiCocok ? 'bg-[#6366F1]' : 'bg-slate-200'}`} />
                              <span className={`text-[11px] block ${isPotensiCocok ? 'font-medium text-[#6366F1]' : 'font-normal text-slate-400'}`}>Verifikasi</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                              <span className="text-[11px] font-normal text-slate-400 block">Pengambilan</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

          </div>
        </main>
      </div>

    </div>
  );
}
