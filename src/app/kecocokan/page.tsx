'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import MatchCard from '@/komponen/MatchCard';

interface ReportDetails {
  id: string;
  tipe: string;
  kategori: string;
  deskripsi_publik: string;
  id_zona: string;
  nama_zona?: string;
  waktu_kejadian: string;
  status: string;
}

interface MatchCandidate {
  id: string | number;
  lost_report_id: string;
  found_report_id: string;
  skor_teks: number;
  skor_visual: number;
  skor_lokasi: number;
  skor_waktu: number;
  skor_akhir: number;
  status: string;
  found_report?: ReportDetails;
  lost_report?: ReportDetails;
}

const getCategoryFallbackImage = (kategori?: string) => {
  if (!kategori) return '/laptop_apple_library.png';
  const kat = kategori.toLowerCase();
  if (kat.includes('laptop') || kat.includes('komputer') || kat.includes('macbook') || kat.includes('hp')) {
    return '/laptop_apple_library.png';
  }
  if (kat.includes('kunci') || kat.includes('kendaraan') || kat.includes('motor')) {
    return '/kunci_mobil.png';
  }
  return '/laptop_dark_cafe.png';
};

const getMatchingReasons = (match: MatchCandidate) => {
  const reasons: string[] = [];
  if (match.skor_teks > 0.7) reasons.push('Nama & Deskripsi Mirip');
  if (match.skor_visual > 0.6) reasons.push('Atribut Fisik Cocok');
  if (match.skor_lokasi > 0.7) reasons.push('Zona Penemuan Sesuai');
  if (match.skor_waktu > 0.7) reasons.push('Korelasi Waktu Sesuai');
  if (reasons.length === 0) reasons.push('Kategori Barang Sama');
  return reasons;
};

export default function HalamanPencocokanAI() {
  const [kandidatList, setKandidatList] = useState<MatchCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notif, setNotif] = useState<string | null>(null);
  const [ignoredIds, setIgnoredIds] = useState<any[]>([]);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    async function cekStatusKecocokan() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await fetch('/api/kecocokan');
        const json = await res.json();
        if (json.sukses && Array.isArray(json.data)) {
          setKandidatList(json.data);
        } else {
          setErrorMsg(json.error || 'Gagal memuat daftar kecocokan AI.');
        }
      } catch (err) {
        console.error('Koneksi endpoint kecocokan:', err);
        setErrorMsg('Koneksi internet gagal memuat hasil kecocokan AI.');
      } finally {
        setLoading(false);
      }
    }
    cekStatusKecocokan();
  }, [retryTrigger]);

  const handleIgnore = (id: any) => {
    setIgnoredIds((prev) => [...prev, id]);
    setNotif('Barang telah ditandai sebagai bukan milik Anda.');
    setTimeout(() => {
      setNotif(null);
    }, 4000);
  };

  const handleRetry = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  // Filter out ignored items
  const activeCandidates = kandidatList.filter(item => !ignoredIds.includes(item.id));

  // Determine lost report details from the first matching candidate
  const firstMatch = kandidatList[0];
  const lostReport = firstMatch?.lost_report;
  const lostReportTitle = lostReport?.deskripsi_publik
    ? lostReport.deskripsi_publik.split('\n')[0].replace('Nama Barang: ', '')
    : lostReport?.kategori || 'MacBook Pro 14" (Space Grey)';
  const lostReportTime = lostReport?.waktu_kejadian || '12 Okt 2024, 14:30 WIB';
  const lostReportLocation = lostReport?.nama_zona || lostReport?.id_zona || 'Lab TIF (Lt. 2)';
  const lostReportImage = getCategoryFallbackImage(lostReport?.kategori);

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-10">
        <TopbarMahasiswa judulHalaman="Hasil Pencocokan AI" />

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
                src={lostReportImage}
                alt={lostReportTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 176px"
                priority
              />
            </div>

            <div className="flex-1 space-y-2.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                  Laporan Kehilangan Anda
                </span>
                <h2 className="text-base font-bold text-[#0B1633]">
                  {lostReportTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="block text-slate-400 font-normal text-[10px] uppercase">Waktu Hilang</span>
                  <span className="text-[#0B1633] font-medium">{lostReportTime}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="block text-slate-400 font-normal text-[10px] uppercase">Lokasi Terakhir</span>
                  <span className="text-[#0B1633] font-medium">{lostReportLocation}</span>
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
              {loading ? (
                // Skeletons during Loading state
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs animate-pulse space-y-4">
                    <div className="flex gap-4">
                      <div className="w-48 h-32 bg-slate-100 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-3 pt-2">
                        <div className="h-4 bg-slate-100 rounded w-1/4" />
                        <div className="h-6 bg-slate-100 rounded w-3/4" />
                        <div className="h-10 bg-slate-100 rounded w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : errorMsg ? (
                // Error state
                <div className="bg-white p-6 rounded-2xl border border-red-200 text-center space-y-3">
                  <p className="text-sm text-red-500 font-semibold">{errorMsg}</p>
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Coba Lagi
                  </button>
                </div>
              ) : activeCandidates.length === 0 ? (
                // Empty state
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs font-normal">
                  Semua kandidat kecocokan telah ditinjau atau tidak ada kandidat kecocokan baru saat ini.
                </div>
              ) : (
                // Dynamic Matching Candidate List
                activeCandidates.map((item) => {
                  const report = item.found_report;
                  const itemTitle = report?.deskripsi_publik
                    ? report.deskripsi_publik.split('\n')[0].replace('Nama Barang: ', '')
                    : report?.kategori || 'Barang Temuan';
                  const itemDesc = report?.deskripsi_publik || 'Tidak ada deskripsi publik.';
                  const itemCategory = report?.kategori || 'Elektronik';
                  const itemLocation = report?.nama_zona || report?.id_zona || 'Lab TIF';
                  const itemTime = report?.waktu_kejadian || '12 Okt 2024, 15:00 WIB';
                  const itemImage = getCategoryFallbackImage(report?.kategori);
                  const reasons = getMatchingReasons(item);

                  return (
                    <MatchCard
                      key={item.id}
                      id={item.id}
                      title={itemTitle}
                      category={itemCategory}
                      description={itemDesc}
                      score={item.skor_akhir}
                      location={itemLocation}
                      time={itemTime}
                      reasons={reasons}
                      image={itemImage}
                      onIgnore={handleIgnore}
                    />
                  );
                })
              )}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
