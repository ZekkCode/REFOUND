'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';

export default function DetailBarangTemuanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const itemDetail = {
    id,
    title: 'Laptop Hitam 14"',
    deskripsi: 'Ditemukan di area Lab Komputer A lantai 2. Kondisi layar tertutup saat ditemukan dan telah diamankan di ruang loker Admin Lab.',
    kategori: 'Elektronik',
    waktuDitemukan: '12 Okt 2024, 14:30 WIB',
    zona: 'Lab Komputer A (Lab TIF)',
    status: 'Disimpan di Loker Admin',
    image: '/laptop_dark_cafe.png',
    skorKecocokan: '85% Cocok AI',
  };

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-10">
        <TopbarMahasiswa judulHalaman="Detail Barang Temuan" />

        <main className="flex-1 max-w-5xl w-full mx-auto py-5 sm:py-7 px-4 sm:px-8 space-y-5">
          <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-400">
            <Link href="/barang-temuan" className="hover:text-[#12A99A] transition-colors">&larr; Kembali ke Katalog</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left: Image & Info */}
            <section className="lg:col-span-7 space-y-5">
              <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs relative">
                <div className="w-full h-72 relative bg-slate-100">
                  <Image
                    src={itemDetail.image}
                    alt={itemDetail.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B1633]/90 text-white px-2.5 py-0.5 rounded-full font-medium text-[10px] flex items-center shadow-xs backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12A99A] mr-1.5 animate-pulse" />
                    Disimpan Admin Lab
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12A99A]">
                    Katalog Publik Terverifikasi
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1633] tracking-tight">
                    {itemDetail.title}
                  </h2>
                  <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed pt-1">
                    {itemDetail.deskripsi}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-slate-400 font-normal text-[10px] uppercase">Kategori</span>
                    <span className="text-[#0B1633] font-medium text-xs sm:text-sm">{itemDetail.kategori}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-slate-400 font-normal text-[10px] uppercase">Waktu Ditemukan</span>
                    <span className="text-[#0B1633] font-medium text-xs sm:text-sm">{itemDetail.waktuDitemukan}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-slate-400 font-normal text-[10px] uppercase">Zona Lokasi</span>
                    <span className="text-[#0B1633] font-medium text-xs sm:text-sm">{itemDetail.zona}</span>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="block text-slate-400 font-normal text-[10px] uppercase">Status Fisik</span>
                    <span className="text-[#10B981] font-medium text-xs sm:text-sm">{itemDetail.status}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Right: AI Match & Action */}
            <section className="lg:col-span-5 space-y-5">
              <div className="bg-white p-5 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#0B1633]">
                    Analisis Pencocokan AI
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
                    {itemDetail.skorKecocokan}
                  </span>
                </div>

                <p className="text-slate-500 text-xs font-normal leading-relaxed">
                  Kecocokan atribut laporan dengan database inventaris laboratorium:
                </p>

                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-normal text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Warna Serupa
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-normal text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Kategori Cocok
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-normal text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Zona Sesuai
                  </span>
                </div>

                <div className="pt-1">
                  <Link
                    href={`/klaim/${id}`}
                    className="flex items-center justify-center w-full px-4 py-2.5 bg-[#0B1633] hover:bg-[#0B1633]/90 text-white font-medium text-xs rounded-xl shadow-xs transition-all duration-150"
                  >
                    Ajukan Klaim Barang Ini &rarr;
                  </Link>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2 text-slate-500 text-[11px] font-normal leading-relaxed">
                  <svg className="w-3.5 h-3.5 text-[#12A99A] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span>Klaim diverifikasi oleh Admin Lab untuk melindungi keamanan barang.</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-3.5">
                <h3 className="text-sm font-semibold text-[#0B1633]">
                  Riwayat Penanganan
                </h3>

                <div className="relative pl-5 space-y-4">
                  <div className="absolute top-2 bottom-2 left-2 w-0.5 bg-slate-200" />

                  <div className="relative space-y-0.5">
                    <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#12A99A] ring-4 ring-teal-50" />
                    <h4 className="text-xs font-semibold text-[#0B1633]">Disimpan di Ruang Admin Lab</h4>
                    <p className="text-slate-400 text-[10px]">12 Okt 2024, 15:00 WIB</p>
                  </div>

                  <div className="relative space-y-0.5">
                    <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <h4 className="text-xs font-normal text-slate-500">Menunggu Verifikasi Klaim</h4>
                    <p className="text-slate-400 text-[10px]">Status Saat Ini</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
