'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';

export default function DetailBarangTemuanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [itemDetail, setItemDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function ambilDetail() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/barang-temuan/${id}`);
        const data = await res.json();
        if (res.ok && data.sukses) {
          setItemDetail(data.data);
        } else {
          setError(data.error || 'Gagal mengambil detail barang temuan.');
        }
      } catch (e) {
        console.error(e);
        setError('Terjadi kesalahan jaringan.');
      } finally {
        setLoading(false);
      }
    }
    ambilDetail();
  }, [id]);

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-10">
        <TopbarMahasiswa judulHalaman="Detail Barang Temuan" />

        <main className="flex-1 max-w-5xl w-full mx-auto py-5 sm:py-7 px-4 sm:px-8 space-y-5">
          <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-400">
            <Link href="/barang-temuan" className="hover:text-[#12A99A] transition-colors">
              Katalog Temuan
            </Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200/70 p-6 space-y-4 animate-pulse">
              <div className="w-full h-72 bg-slate-100 rounded-xl" />
              <div className="h-4 bg-slate-100 rounded w-1/3" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
          ) : error || !itemDetail ? (
            <div className="p-8 text-center bg-white border border-rose-200 rounded-2xl text-rose-500 text-xs font-semibold">
              {error || 'Barang temuan tidak ditemukan.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {/* Left Column: Visual & Public Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/70 p-4 sm:p-5 shadow-xs space-y-4">
                  {/* Item Image with Fallback */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                    <Image
                      src={itemDetail.url_foto || '/hero_illustration.png'}
                      alt={itemDetail.nama_barang}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase bg-emerald-50 text-[#10B981] border border-emerald-200/60 rounded-full">
                        {itemDetail.status_penyimpanan}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        ID: {itemDetail.id}
                      </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
                      {itemDetail.nama_barang}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {itemDetail.deskripsi_publik}
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Kategori</span>
                      <p className="font-semibold text-[#0B1633]">{itemDetail.kategori}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Warna</span>
                      <p className="font-semibold text-[#0B1633]">{itemDetail.warna_dominan}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Lokasi Penemuan</span>
                      <p className="font-semibold text-[#0B1633]">{itemDetail.lokasi_penemuan}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Waktu Ditemukan</span>
                      <p className="font-semibold text-[#0B1633]">{itemDetail.waktu_kejadian}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Match Breakdown & Claim Action */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#0B1633]">
                      Kecocokan
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
                      85% Cocok
                    </span>
                  </div>

                  <p className="text-slate-500 text-xs font-normal leading-relaxed">
                    Kesesuaian atribut barang temuan:
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
                      Kategori Sesuai
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-normal text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg">
                      <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Lokasi Sesuai
                    </span>
                  </div>

                  <div className="pt-1">
                    <Link
                      href={`/klaim/${id}`}
                      className="flex items-center justify-center w-full px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-semibold text-xs rounded-xl shadow-xs transition-all duration-150"
                    >
                      Klaim Barang
                    </Link>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2 text-slate-500 text-[11px] font-normal leading-relaxed">
                    <svg className="w-3.5 h-3.5 text-[#12A99A] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span>Klaim diverifikasi oleh petugas untuk memastikan kepemilikan.</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-3.5">
                  <h3 className="text-sm font-semibold text-[#0B1633]">
                    Riwayat
                  </h3>

                  <div className="relative pl-5 space-y-4">
                    <div className="absolute top-2 bottom-2 left-2 w-0.5 bg-slate-200" />

                    <div className="relative space-y-0.5">
                      <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#12A99A] ring-4 ring-teal-50" />
                      <h4 className="text-xs font-semibold text-[#0B1633]">Disimpan di Ruang Admin Lab</h4>
                      <p className="text-slate-400 text-[10px]">{itemDetail.waktu_penemuan || 'Hari Penemuan'}</p>
                    </div>

                    <div className="relative space-y-0.5">
                      <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <h4 className="text-xs font-normal text-slate-500">Menunggu Verifikasi</h4>
                      <p className="text-slate-400 text-[10px]">Status Saat Ini</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
