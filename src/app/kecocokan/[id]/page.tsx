'use client';

import { use } from 'react';
import Link from 'next/link';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import BilahKecocokan from '@/komponen/BilahKecocokan';
import { hitungSkorPencocokan } from '@/pustaka/ai/pencocokan';

export default function HalamanDetailKecocokan({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const mockMatch = {
    id,
    lost: {
      id: 'lap-hilang-101',
      kategori: 'Laptop & Komputer',
      deskripsi_publik: 'MacBook Pro 14" (Space Grey) tertinggal di area Lab TIF.',
      zona: 'Lab TIF',
      waktu: '12 Okt 2024, 14:30 WIB',
    },
    found: {
      id: 'lap-temuan-205',
      kategori: 'Laptop & Komputer',
      deskripsi_publik: 'Laptop Silver/Grey (Apple) ditemukan di meja baca Utara Lab TIF.',
      zona: 'Lab TIF',
      waktu: '12 Okt 2024, 15:00 WIB',
      custody_status: 'Disimpan di Ruang Admin Lab',
    },
    skor: hitungSkorPencocokan(0.88, 0.75, true, 0.5),
  };

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-10">
        <TopbarMahasiswa judulHalaman="Detail Kecocokan AI" />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-5 sm:py-7 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                Perbandingan Side-by-Side
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
                Detail Kecocokan AI #{id}
              </h1>
            </div>
            <Link
              href="/kecocokan"
              className="text-xs font-medium text-slate-500 hover:text-[#0B1633] transition-colors"
            >
              &larr; Kembali
            </Link>
          </div>

          <BilahKecocokan skor={mockMatch.skor} />

          {/* Side by Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Laporan Kehilangan Saya */}
            <div className="bg-white p-5 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-3">
              <span className="text-[10px] font-semibold text-[#FF765F] bg-rose-50 px-2.5 py-0.5 rounded-full uppercase">
                Laporan Kehilangan Anda
              </span>
              <h3 className="font-semibold text-sm sm:text-base text-[#0B1633]">
                {mockMatch.lost.kategori}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {mockMatch.lost.deskripsi_publik}
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p><strong className="text-slate-700">Zona:</strong> {mockMatch.lost.zona}</p>
                <p><strong className="text-slate-700">Waktu Kejadian:</strong> {mockMatch.lost.waktu}</p>
              </div>
            </div>

            {/* Barang Temuan Admin */}
            <div className="bg-white p-5 rounded-xl sm:rounded-2xl border border-teal-200/70 shadow-xs space-y-3">
              <span className="text-[10px] font-semibold text-[#12A99A] bg-teal-50 px-2.5 py-0.5 rounded-full uppercase">
                Kandidat Barang Temuan
              </span>
              <h3 className="font-semibold text-sm sm:text-base text-[#0B1633]">
                {mockMatch.found.kategori}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {mockMatch.found.deskripsi_publik}
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p><strong className="text-slate-700">Zona Penemuan:</strong> {mockMatch.found.zona}</p>
                <p><strong className="text-slate-700">Waktu Ditemukan:</strong> {mockMatch.found.waktu}</p>
                <p><strong className="text-[#12A99A]">Status Fisik:</strong> {mockMatch.found.custody_status}</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href={`/klaim/${id}`}
              className="inline-block px-6 py-2.5 bg-[#0B1633] hover:bg-[#0B1633]/90 text-white font-medium text-xs rounded-xl shadow-xs transition-all"
            >
              Lanjut Ajukan Klaim Verifikasi Kepemilikan &rarr;
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
