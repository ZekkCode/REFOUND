'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';

export default function HalamanBarangTemuan() {
  const [kataKunci, setKataKunci] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [urutkan, setUrutkan] = useState<'terbaru' | 'terlama' | 'nama' | 'zona'>('terbaru');
  const [loading, setLoading] = useState(true);

  const [daftarSemuaTemuan, setDaftarSemuaTemuan] = useState<any[]>([
    {
      id: 'item-1',
      title: 'Laptop Hitam 14"',
      zona: 'Lab Komputer A',
      kategori: 'Elektronik',
      tags: ['Elektronik', 'Hitam'],
      image: '/laptop_dark_cafe.png',
      hasImage: true,
      created_at: '2024-10-12T14:30:00Z',
    },
    {
      id: 'item-2',
      title: 'Map Dokumen Biru',
      zona: 'Lobi Gedung B',
      kategori: 'Dokumen',
      tags: ['Dokumen', 'Biru'],
      image: '',
      hasImage: false,
      created_at: '2024-10-11T09:15:00Z',
    },
    {
      id: 'item-3',
      title: 'Kunci Mobil & Gantungan',
      zona: 'Area Parkir C',
      kategori: 'Lainnya',
      tags: ['Lainnya'],
      image: '/kunci_mobil.png',
      hasImage: true,
      created_at: '2024-10-10T16:45:00Z',
    },
  ]);

  useEffect(() => {
    async function ambilData() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (kataKunci) queryParams.set('q', kataKunci);
        if (filterKategori && filterKategori !== 'Semua') queryParams.set('kategori', filterKategori);

        const res = await fetch(`/api/barang-temuan?${queryParams.toString()}`);
        const data = await res.json();
        if (data.sukses && Array.isArray(data.data)) {
          setDaftarSemuaTemuan(data.data);
        }
      } catch (e) {
        console.error('Fetch katalog barang temuan fallback ke data lokal', e);
      } finally {
        setLoading(false);
      }
    }
    ambilData();
  }, [kataKunci, filterKategori]);

  const temuanTersaring = useMemo(() => {
    const list = daftarSemuaTemuan.filter((item) => {
      const cocokKata =
        item.title.toLowerCase().includes(kataKunci.toLowerCase()) ||
        item.kategori.toLowerCase().includes(kataKunci.toLowerCase()) ||
        (item.zona && item.zona.toLowerCase().includes(kataKunci.toLowerCase()));
      
      const cocokFilter = 
        filterKategori === 'Semua' || 
        (filterKategori === 'Alat Tulis' && item.kategori === 'Lainnya') ||
        item.kategori === filterKategori;

      return cocokKata && cocokFilter;
    });

    // Opsi Sorting
    return list.sort((a, b) => {
      if (urutkan === 'terbaru') {
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      }
      if (urutkan === 'terlama') {
        return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
      }
      if (urutkan === 'nama') {
        return a.title.localeCompare(b.title);
      }
      if (urutkan === 'zona') {
        return (a.zona || '').localeCompare(b.zona || '');
      }
      return 0;
    });
  }, [daftarSemuaTemuan, kataKunci, filterKategori, urutkan]);

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      
      {/* Sidebar */}
      <SidebarMahasiswa />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-10">
        
        {/* Top Navbar */}
        <TopbarMahasiswa judulHalaman="Katalog Barang Temuan" />

        {/* Content Wrapper */}
        <main className="flex-1 py-5 sm:py-7 px-4 sm:px-8 max-w-6xl w-full mx-auto space-y-5">
          
          {/* Header Title Banner */}
          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12A99A]">
              Katalog
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
              Barang Temuan
            </h1>
          </div>

          {/* Search Bar, Categories & Sorting Row */}
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs space-y-3.5">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1 border border-slate-200/90 rounded-xl flex items-center p-1 focus-within:ring-1 focus-within:ring-[#12A99A] focus-within:border-[#12A99A] bg-white">
                <svg className="w-4 h-4 text-slate-400 ml-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari barang atau lokasi..."
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                  className="w-full pl-2.5 pr-4 py-1.5 text-xs sm:text-sm font-normal text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={urutkan}
                  onChange={(e) => setUrutkan(e.target.value as any)}
                  className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 text-[#0B1633] text-xs font-medium rounded-xl outline-none focus:border-[#12A99A] cursor-pointer"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="nama">Nama (A-Z)</option>
                  <option value="zona">Lokasi</option>
                </select>
              </div>
            </div>

            {/* Category Filter Tags */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {['Semua', 'Elektronik', 'Dokumen', 'Alat Tulis', 'Lainnya'].map((cat) => {
                const active = filterKategori === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterKategori(cat)}
                    className={`px-3 py-1 text-xs rounded-lg border transition-all duration-150 cursor-pointer ${
                      active
                        ? 'border-[#12A99A] text-[#12A99A] bg-teal-50/70 font-semibold shadow-2xs'
                        : 'border-slate-200 text-slate-500 font-normal hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Cards List with Skeleton Loader */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/70 p-4 space-y-3 animate-pulse">
                  <div className="w-full h-40 bg-slate-100 rounded-xl" />
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-8 bg-slate-100 rounded-xl mt-2" />
                </div>
              ))}
            </div>
          ) : temuanTersaring.length === 0 ? (
            <div className="p-10 text-center bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-normal">
              Tidak ada barang temuan yang cocok.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
              {temuanTersaring.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative">
                    <span className="absolute top-2.5 left-2.5 bg-[#0B1633]/90 text-white px-2.5 py-0.5 rounded-full font-medium text-[10px] flex items-center shadow-xs z-10 backdrop-blur-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12A99A] mr-1.5 animate-pulse" />
                      Disimpan di Lab
                    </span>

                    <div className="w-full h-44 relative bg-slate-100 flex items-center justify-center">
                      {item.hasImage ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          loading="lazy"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                          <span className="text-[10px] text-slate-400 mt-1 font-normal">Tanpa foto</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12A99A]">
                        {item.kategori}
                      </span>
                      <h3 className="text-sm font-semibold text-[#0B1633] leading-snug">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center text-xs font-normal text-slate-400 pt-0.5">
                        <svg className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>{item.zona}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(item.tags) && item.tags.map((t: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-normal bg-slate-50 border border-slate-200 text-slate-600 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        href={`/barang-temuan/${item.id}`}
                        className="flex items-center justify-center w-full px-3.5 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white font-semibold text-xs rounded-xl transition-all duration-150 shadow-xs"
                      >
                        Detail & Klaim
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
