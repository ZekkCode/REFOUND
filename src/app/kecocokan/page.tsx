'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';

export default function HalamanPencocokanAI() {
  const [showMatch1, setShowMatch1] = useState(true);
  const [notif, setNotif] = useState<string | null>(null);

  useEffect(() => {
    async function cekStatusKecocokan() {
      try {
        const res = await fetch('/api/kecocokan');
        const json = await res.json();
        if (json.sukses && Array.isArray(json.data)) {
          // Connected
        }
      } catch (err) {
        console.error('Koneksi endpoint kecocokan:', err);
      }
    }
    cekStatusKecocokan();
  }, []);

  const handleIgnore = (id: number) => {
    if (id === 1) setShowMatch1(false);
    setNotif('Barang telah ditandai sebagai bukan milik Anda.');
    setTimeout(() => {
      setNotif(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      
      {/* Sidebar */}
      <SidebarMahasiswa />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-10">
        
        {/* Top Navbar */}
        <TopbarMahasiswa judulHalaman="Hasil Pencocokan AI" />

        {/* Content Wrapper */}
        <main className="flex-1 py-6 sm:py-8 px-4 sm:px-8 max-w-6xl w-full mx-auto space-y-5 sm:space-y-6">
          
          {/* Header Title Banner */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-400">
              <Link href="/dashboard" className="hover:text-[#12A99A] transition-colors">&larr; Kembali ke Dashboard</Link>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
              Hasil Analisis Kecocokan AI
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
              Sistem AI Vector Matching menemukan kandidat barang temuan yang memiliki kesamaan atribut dengan laporan kehilangan Anda.
            </p>
          </div>

          {notif && (
            <div className="p-3.5 bg-teal-50 border border-teal-200 text-[#12A99A] text-xs font-medium rounded-xl flex items-center space-x-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{notif}</span>
            </div>
          )}

          {/* Laporan Anda Reference Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-5 items-start md:items-center">
            <div className="w-full md:w-44 h-28 relative rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
              <Image
                src="/macbook_space_grey.png"
                alt="MacBook Pro Space Grey"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1 space-y-2.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                  Laporan Kehilangan Anda
                </span>
                <h2 className="text-base font-bold text-[#0B1633]">
                  MacBook Pro 14" (Space Grey)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="block text-slate-400 font-normal text-[10px] uppercase">Waktu Hilang</span>
                  <span className="text-[#0B1633] font-medium">12 Okt 2024, 14:30 WIB</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="block text-slate-400 font-normal text-[10px] uppercase">Lokasi Terakhir</span>
                  <span className="text-[#0B1633] font-medium">Lab TIF (Lt. 2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Candidates List */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/80 pb-2">
              Kandidat Kecocokan Tertinggi
            </h2>

            <div className="space-y-4">
              {showMatch1 ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-5 items-start">
                    <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                      <Image
                        src="/laptop_apple_library.png"
                        alt="Laptop Apple Library"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#0B1633]/90 text-white px-2 py-0.5 rounded-full font-medium text-[9px] backdrop-blur-xs">
                        Disimpan Admin Lab
                      </span>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-bold text-[#0B1633]">
                            Laptop Silver/Grey (Apple)
                          </h3>
                          <p className="text-slate-500 text-xs font-normal">
                            Ditemukan di Meja Baca Utara, Lab TIF. Diserahkan oleh petugas lab.
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full shrink-0">
                          86% Cocok AI
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                          Warna Mirip (Space Grey)
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                          Zona Sesuai (Lab TIF)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                    <Link
                      href="/klaim/match-8821"
                      className="flex-1 w-full text-center px-4 py-2 bg-[#0B1633] hover:bg-[#0B1633]/90 text-white font-medium text-xs rounded-xl shadow-xs transition-all"
                    >
                      Ini Barang Saya (Ajukan Klaim) &rarr;
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleIgnore(1)}
                      className="flex-1 w-full px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Bukan Barang Saya
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs font-normal">
                  Semua kandidat kecocokan telah ditinjau.
                </div>
              )}
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}
