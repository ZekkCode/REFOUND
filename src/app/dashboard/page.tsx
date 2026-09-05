'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';
import { supabaseKlien } from '@/pustaka/supabase/klien';

interface UserProfile {
  nama: string;
  nim: string;
  program_studi: string;
  avatar_url?: string;
}

interface DashboardStats {
  total_laporan: number;
  laporan_kehilangan_aktif: number;
  laporan_penemuan_aktif: number;
  total_kandidat_cocok: number;
  klaim_diproses: number;
  klaim_selesai: number;
}

interface ItemNotifikasi {
  id: string;
  judul: string;
  pesan: string;
  tipe: string;
  sudah_dibaca: boolean;
  dibuat_pada: string;
  tautan?: string;
}

export default function DashboardMahasiswaPage() {
  // States
  const [profil, setProfil] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [laporanSaya, setLaporanSaya] = useState<ItemLaporan[]>([]);
  const [notifikasi, setNotifikasi] = useState<ItemNotifikasi[]>([]);

  // Loading States
  const [loadingProfil, setLoadingProfil] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLaporan, setLoadingLaporan] = useState(true);
  const [loadingNotif, setLoadingNotif] = useState(true);

  // Error States
  const [errorProfil, setErrorProfil] = useState<string | null>(null);
  const [errorStats, setErrorStats] = useState<string | null>(null);
  const [errorLaporan, setErrorLaporan] = useState<string | null>(null);
  const [errorNotif, setErrorNotif] = useState<string | null>(null);

  // Reload triggers
  const [retryTrigger, setRetryTrigger] = useState(0);

  const handleRetry = () => {
    setRetryTrigger(prev => prev + 1);
  };

  // Fetch data
  useEffect(() => {
    async function fetchProfil() {
      try {
        setLoadingProfil(true);
        setErrorProfil(null);
        
        // Retrieve current authenticated user from local storage session
        const { data: authData } = await supabaseKlien.auth.getUser();
        if (authData?.user) {
          const userMeta = authData.user.user_metadata || {};
          
          // Query the public.profil table on the client side
          const { data: profilDb, error } = await supabaseKlien
            .from('profil')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          if (!error && profilDb) {
            setProfil({
              nama: profilDb.nama,
              nim: profilDb.nim,
              program_studi: profilDb.program_studi,
              avatar_url: profilDb.avatar_url,
            });
          } else {
            // Fallback to auth metadata if profile row isn't in db yet
            setProfil({
              nama: userMeta.full_name || userMeta.name || authData.user.email?.split('@')[0] || 'Mahasiswa',
              nim: userMeta.nim || '13519099',
              program_studi: userMeta.prodi || 'Teknik Informatika',
              avatar_url: userMeta.avatar_url,
            });
          }
        } else {
          // If no client session, fallback to mock/API
          const res = await fetch('/api/profil');
          const json = await res.json();
          if (json.sukses && json.data) {
            setProfil(json.data);
          } else {
            setErrorProfil(json.error || 'Gagal memuat profil');
          }
        }
      } catch {
        setErrorProfil('Koneksi gagal memuat profil');
      } finally {
        setLoadingProfil(false);
      }
    }

    async function fetchStats() {
      try {
        setLoadingStats(true);
        setErrorStats(null);
        const res = await fetch('/api/dashboard/stats');
        const json = await res.json();
        if (json.sukses && json.data) {
          setStats(json.data);
        } else {
          setErrorStats(json.error || 'Gagal memuat statistik');
        }
      } catch {
        setErrorStats('Koneksi gagal memuat statistik');
      } finally {
        setLoadingStats(false);
      }
    }

    async function fetchLaporan() {
      try {
        setLoadingLaporan(true);
        setErrorLaporan(null);
        const res = await fetch('/api/laporan');
        const json = await res.json();
        if (json.sukses && Array.isArray(json.data)) {
          setLaporanSaya(json.data);
        } else {
          setErrorLaporan(json.error || 'Gagal memuat laporan');
        }
      } catch {
        setErrorLaporan('Koneksi gagal memuat laporan');
      } finally {
        setLoadingLaporan(false);
      }
    }

    async function fetchNotifikasi() {
      try {
        setLoadingNotif(true);
        setErrorNotif(null);
        const res = await fetch('/api/notifikasi');
        const json = await res.json();
        if (json.sukses && Array.isArray(json.data)) {
          setNotifikasi(json.data);
        } else {
          setErrorNotif(json.error || 'Gagal memuat notifikasi');
        }
      } catch {
        setErrorNotif('Koneksi gagal memuat notifikasi');
      } finally {
        setLoadingNotif(false);
      }
    }

    fetchProfil();
    fetchStats();
    fetchLaporan();
    fetchNotifikasi();
  }, [retryTrigger]);

  const initials = profil?.nama
    ? profil.nama.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'BS';

  const matchKandidat = laporanSaya.find(l => l.status === 'potensi_cocok') || laporanSaya[0];

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-28 md:pb-12">
        <TopbarMahasiswa judulHalaman="Dashboard" />

        <main className="flex-1 py-6 sm:py-8 px-4 sm:px-8 max-w-5xl w-full mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Banner Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#12A99A] text-[11px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#12A99A]" />
                Mahasiswa
              </div>
              
              {loadingProfil ? (
                <div className="animate-pulse space-y-2.5">
                  <div className="h-7 bg-slate-100 rounded-lg w-64" />
                  <div className="h-4 bg-slate-100 rounded-lg w-96" />
                </div>
              ) : errorProfil ? (
                <div className="space-y-1 text-red-500">
                  <h1 className="text-xl font-bold">Gagal memuat salam</h1>
                  <p className="text-xs">{errorProfil}. <button onClick={handleRetry} className="underline font-bold text-teal-600">Coba lagi</button></p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    {profil?.avatar_url ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-100">
                        <Image src={profil.avatar_url} alt={profil.nama} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0B1633] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                        {initials}
                      </div>
                    )}
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1633]">
                      Selamat Datang, {profil?.nama}
                    </h1>
                  </div>
                  <p className="text-xs text-slate-400 font-normal pt-0.5">
                    {profil?.program_studi} • NIM {profil?.nim}
                  </p>
                </>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
              <Link
                href="/lapor/kehilangan"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-150"
              >
                <svg className="w-4 h-4 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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

          {/* Quick Metrics Bar - 4 Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Metric 1: Laporan Aktif */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between min-h-[85px]">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Laporan Aktif</span>
                {loadingStats ? (
                  <div className="h-7 w-12 bg-slate-100 rounded-md animate-pulse" />
                ) : errorStats ? (
                  <span className="text-xs text-red-500">Error</span>
                ) : (
                  <span className="text-2xl font-bold text-[#0B1633] block">
                    {stats?.total_laporan || 0}
                  </span>
                )}
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0B1633] shrink-0">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
            </div>

            {/* Metric 2: Kecocokan AI */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between min-h-[85px]">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Kecocokan</span>
                {loadingStats ? (
                  <div className="h-7 w-16 bg-slate-100 rounded-md animate-pulse" />
                ) : errorStats ? (
                  <span className="text-xs text-red-500">Error</span>
                ) : (
                  <span className="text-2xl font-bold text-[#12A99A] block">
                    {stats?.total_kandidat_cocok || 0}
                  </span>
                )}
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#12A99A] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>

            {/* Metric 3: Klaim Aktif */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between min-h-[85px]">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Klaim Aktif</span>
                {loadingStats ? (
                  <div className="h-7 w-12 bg-slate-100 rounded-md animate-pulse" />
                ) : errorStats ? (
                  <span className="text-xs text-red-500">Error</span>
                ) : (
                  <span className="text-2xl font-bold text-indigo-600 block">
                    {stats?.klaim_diproses || 0}
                  </span>
                )}
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            {/* Metric 4: Barang Berhasil Kembali */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-center justify-between min-h-[85px]">
              <div className="space-y-0.5">
                <span className="text-xs font-normal text-slate-500 block">Selesai</span>
                {loadingStats ? (
                  <div className="h-7 w-12 bg-slate-100 rounded-md animate-pulse" />
                ) : errorStats ? (
                  <span className="text-xs text-red-500">Error</span>
                ) : (
                  <span className="text-2xl font-bold text-[#10B981] block">
                    {stats?.klaim_selesai || 0}
                  </span>
                )}
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#10B981] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>

          </div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left: AI Match Highlight & Notifications */}
            <section className="lg:col-span-5 space-y-6">
              
              {/* AI Match Highlight Section */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Kecocokan Baru
                    </h2>
                    {!loadingStats && stats && stats.total_kandidat_cocok > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#12A99A] text-white rounded-full">
                        {stats.total_kandidat_cocok} Baru
                      </span>
                    )}
                  </div>
                  <Link href="/kecocokan" className="text-xs font-medium text-[#12A99A] hover:underline">
                    Lihat Semua
                  </Link>
                </div>

                {loadingStats || loadingLaporan ? (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs animate-pulse space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-8 bg-slate-100 rounded w-full" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                  </div>
                ) : errorStats ? (
                  <div className="bg-white p-5 rounded-2xl border border-red-200 text-red-500 text-xs font-semibold text-center">
                    Gagal memuat kandidat kecocokan. <button onClick={handleRetry} className="underline text-teal-600 font-bold ml-1">Coba lagi</button>
                  </div>
                ) : !matchKandidat ? (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs text-center space-y-2">
                    <p className="text-xs text-slate-400 font-semibold">Belum ada kecocokan saat ini.</p>
                    <p className="text-[11px] text-slate-400 font-medium">Sistem akan memberi tahu jika ada barang temuan yang cocok.</p>
                  </div>
                ) : (
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 shadow-xs space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-[#12A99A] uppercase tracking-wider block">
                          {matchKandidat.kategori || 'Elektronik'}
                        </span>
                        <h3 className="text-base font-bold text-[#0B1633] leading-snug">
                          {matchKandidat.deskripsi_publik ? matchKandidat.deskripsi_publik.split('\n')[0].replace('Nama Barang: ', '') : 'Barang Temu'}
                        </h3>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full shrink-0">
                        86% Cocok
                      </span>
                    </div>

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
                        Lokasi: {matchKandidat.nama_zona || matchKandidat.id_zona || 'Lab Komputer'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs font-medium text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0 animate-pulse" />
                      <span>Disimpan di Ruang Admin Lab</span>
                    </div>

                    <Link
                      href="/kecocokan"
                      className="flex items-center justify-center w-full px-4 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-150"
                    >
                      Tinjau Kecocokan
                    </Link>
                  </div>
                )}
              </div>

              {/* Notifications / Activity Section */}
              <div className="space-y-3.5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Notifikasi Terbaru
                </h2>

                {loadingNotif ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-12 bg-white rounded-xl border border-slate-200/50 w-full" />
                    <div className="h-12 bg-white rounded-xl border border-slate-200/50 w-full" />
                  </div>
                ) : errorNotif ? (
                  <div className="bg-white p-4 rounded-xl border border-red-100 text-red-500 text-xs font-semibold text-center">
                    Gagal memuat notifikasi. <button onClick={handleRetry} className="underline text-teal-600 font-bold ml-1">Coba lagi</button>
                  </div>
                ) : notifikasi.length === 0 ? (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs text-center text-xs text-slate-400 font-semibold">
                    Tidak ada notifikasi baru saat ini.
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200/70 shadow-xs overflow-hidden divide-y divide-slate-100">
                    {notifikasi.slice(0, 3).map((notif) => (
                      <Link
                        key={notif.id}
                        href={notif.tautan || '/dashboard'}
                        className={`p-4 block transition-colors ${
                          !notif.sudah_dibaca ? 'bg-teal-50/20 hover:bg-teal-50/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-[#0B1633] block leading-snug">
                              {notif.judul}
                            </span>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                              {notif.pesan}
                            </p>
                          </div>
                          {!notif.sudah_dibaca && (
                            <span className="w-2 h-2 rounded-full bg-[#12A99A] shrink-0 mt-1" />
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>


            </section>

            {/* Right: Active Reports Section */}
            <section className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Laporan Saya
                </h2>
                {!loadingLaporan && (
                  <span className="text-xs font-normal text-slate-400">{laporanSaya.length} Laporan</span>
                )}
              </div>

              {loadingLaporan ? (
                <div className="space-y-3">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs animate-pulse space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-1.5 bg-slate-100 rounded w-full pt-2" />
                  </div>
                </div>
              ) : errorLaporan ? (
                <div className="bg-white p-6 rounded-2xl border border-red-200 text-red-500 text-xs font-semibold text-center">
                  Gagal memuat daftar laporan. <button onClick={handleRetry} className="underline text-teal-600 font-bold ml-1">Coba lagi</button>
                </div>
              ) : laporanSaya.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-xs text-center space-y-3">
                  <svg className="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0a2.25 2.25 0 00-2.25 2.25v.9c0 1.144.918 2.063 2.063 2.063h17.874c1.145 0 2.063-.919 2.063-2.063v-.9a2.25 2.25 0 00-2.25-2.25m-18 0a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25m-18 0V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v6" />
                  </svg>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold">Belum ada laporan aktif.</p>
                    <p className="text-[11px] text-slate-400 font-medium">Buat laporan kehilangan atau temuan untuk mulai pencarian.</p>
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
                            {isPotensiCocok ? 'Potensi Cocok' : 'Disimpan di Lab'}
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
                              <span className="text-[11px] font-medium text-[#12A99A] block">Diproses</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className={`h-1.5 w-full rounded-full ${isPotensiCocok ? 'bg-[#6366F1]' : 'bg-slate-200'}`} />
                              <span className={`text-[11px] block ${isPotensiCocok ? 'font-medium text-[#6366F1]' : 'font-normal text-slate-400'}`}>Verifikasi</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                              <span className="text-[11px] font-normal text-slate-400 block">Selesai</span>
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
