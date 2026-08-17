'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DetailBarangTemuanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock detail data based on ID
  const itemDetail = {
    id,
    title: 'Laptop Hitam 14"',
    deskripsi: 'Ditemukan di area Lab Komputer lantai 2. Kondisi layar tertutup saat ditemukan.',
    kategori: 'Elektronik',
    waktuDitemukan: '12 Okt 2023, 14:30',
    zona: 'Gedung Fakultas Teknik, Lab Komputer A',
    status: 'Menunggu Klaim',
    image: '/laptop_dark_cafe.png',
    skorKecocokan: '85% Cocok',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Header bar */}
      <header className="sticky top-0 bg-white border-b border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between z-20 shadow-sm shrink-0">
        <div>
          <Link href="/barang-temuan" className="flex items-center text-[#0B1633] hover:text-[#12A99A] font-black text-lg tracking-tight transition-colors">
            <svg className="w-5 h-5 mr-2 text-[#0B1633] hover:text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <Image src="/logo.png" alt="REFOUND Logo" width={110} height={32} className="object-contain h-8 w-auto" />
          </Link>
        </div>
        <div>
          <Link
            href="/login"
            className="px-6 py-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full shadow-sm transition-all"
          >
            Masuk
          </Link>
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto py-10 px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image and Specs */}
        <section className="lg:col-span-7 space-y-6">
          {/* Card 1: Product Photo */}
          <div className="bg-white rounded-3xl border border-zinc-150 overflow-hidden shadow-[0_10px_35px_rgba(11,22,51,0.02)] relative">
            <div className="w-full h-80 relative bg-zinc-100">
              <Image
                src={itemDetail.image}
                alt={itemDetail.title}
                fill
                className="object-cover"
                priority
              />
              {/* Disimpan Admin Badge */}
              <span className="absolute top-4 left-4 bg-[#12A99A] text-white px-3 py-1.5 rounded-full font-bold text-xs flex items-center shadow-md">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Disimpan Admin
              </span>
            </div>
          </div>

          {/* Card 2: Technical specifications description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1633]">
                {itemDetail.title}
              </h2>
              <p className="text-zinc-500 font-medium text-xs sm:text-sm leading-relaxed">
                {itemDetail.deskripsi}
              </p>
            </div>

            {/* Attributes info list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-100 text-xs">
              <div>
                <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px] mb-1">Kategori</span>
                <span className="text-[#0B1633] font-bold text-sm">{itemDetail.kategori}</span>
              </div>
              <div>
                <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px] mb-1">Waktu Ditemukan</span>
                <span className="text-[#0B1633] font-bold text-sm">{itemDetail.waktuDitemukan}</span>
              </div>
              <div>
                <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px] mb-1">Zona Lokasi</span>
                <span className="text-[#0B1633] font-bold text-sm">{itemDetail.zona}</span>
              </div>
              <div>
                <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px] mb-1">Status</span>
                <span className="text-[#D97706] font-bold text-sm">{itemDetail.status}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: AI Analysis and Timeline Status */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* Card 1: AI Match Analysis */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#0B1633]">
                Analisis Kecocokan
              </h3>
              {/* Stars badge */}
              <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white bg-[#6366F1] rounded-full shadow-sm">
                <svg className="w-3.5 h-3.5 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {itemDetail.skorKecocokan}
              </span>
            </div>

            <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
              Berdasarkan laporan kehilangan Anda, sistem menemukan kecocokan atribut berikut:
            </p>

            {/* Similarity parameters list */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                <svg className="w-3.5 h-3.5 mr-1.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Warna Sama
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                <svg className="w-3.5 h-3.5 mr-1.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Kategori Cocok
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                <svg className="w-3.5 h-3.5 mr-1.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Zona Berdekatan
              </span>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <Link
                href={`/klaim/${id}`}
                className="flex items-center justify-center w-full px-6 py-3 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-300"
              >
                Ajukan Klaim
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>

            {/* Lock Security note */}
            <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start space-x-3 text-zinc-400">
              <svg className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-[11px] font-semibold leading-relaxed">
                Proses klaim mewajibkan verifikasi identitas di Admin Lab. Beberapa detail spesifik disembunyikan untuk mencegah klaim palsu demi keamanan barang.
              </p>
            </div>
          </div>

          {/* Card 2: Custody timeline Status */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-6">
            <h3 className="text-lg font-black text-[#0B1633]">
              Status Barang
            </h3>

            {/* Vertical timeline steps */}
            <div className="relative pl-6 space-y-6">
              {/* Connecting vertical line */}
              <div className="absolute top-2.5 bottom-2.5 left-2 w-0.5 bg-zinc-100" />

              {/* Point 1: completed */}
              <div className="relative space-y-1">
                {/* Active circle */}
                <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-[#12A99A] ring-4 ring-teal-50" />
                <h4 className="text-xs sm:text-sm font-black text-[#0B1633]">
                  Diserahkan ke Admin Lab
                </h4>
                <p className="text-zinc-400 text-[10px] font-bold">12 Okt 2023, 15:00</p>
              </div>

              {/* Point 2: pending */}
              <div className="relative space-y-1">
                {/* Pending circle */}
                <div className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-zinc-200" />
                <h4 className="text-xs sm:text-sm font-bold text-zinc-400">
                  Menunggu Proses Klaim
                </h4>
                <p className="text-zinc-300 text-[10px] font-bold">Saat ini</p>
              </div>
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1633] text-white py-12 px-6 sm:px-12 border-t border-white/10 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
  );
}
