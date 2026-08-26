'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarAdmin from '@/komponen/SidebarAdmin';

export default function AdminOverviewDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await fetch('/api/admin/dashboard');
        const json = await res.json();
        if (json.sukses && json.data) {
          setDashboardData(json.data);
        } else {
          setErrorMsg(json.error || 'Gagal memuat data dashboard.');
        }
      } catch (err) {
        console.error('Fetch admin dashboard error:', err);
        setErrorMsg('Koneksi internet gagal memuat data dashboard.');
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [retryTrigger]);

  const handleRetry = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  const stats = dashboardData?.stats || { total_inventory: 0, pending_claims: 0, successful_returns: 0 };
  const verificationQueue = dashboardData?.verificationQueue || [];
  const activityLog = dashboardData?.activityLog || [];

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0">
        {/* Content */}
        <main className="flex-1 py-8 px-4 sm:px-8 max-w-5xl w-full mx-auto space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633]">
              Ringkasan Admin
            </h1>
            <p className="text-slate-500 text-sm font-normal mt-1">
              Kelola inventaris barang dan verifikasi klaim mahasiswa.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-2xl flex items-center justify-between">
              <span>{errorMsg}</span>
              <button onClick={handleRetry} className="underline font-bold text-[#0B1633] ml-2 cursor-pointer">Coba Lagi</button>
            </div>
          )}

          {/* 3 KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-3 min-h-[120px]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-[#12A99A] border border-teal-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-full">
                  Disimpan
                </span>
              </div>
              <div className="space-y-0.5">
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <h3 className="text-3xl font-bold text-[#0B1633] font-mono leading-none">
                    {stats.total_inventory}
                  </h3>
                )}
                <p className="text-slate-400 text-xs font-medium">Total Barang Tercatat</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-3 min-h-[120px]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#F59E0B] border border-amber-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full uppercase tracking-wider">
                  Perlu Tindakan
                </span>
              </div>
              <div className="space-y-0.5">
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <h3 className="text-3xl font-bold text-[#0B1633] font-mono leading-none">
                    {stats.pending_claims}
                  </h3>
                )}
                <p className="text-slate-400 text-xs font-medium">Klaim Menunggu Verifikasi</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between space-y-3 min-h-[120px]">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#10B981] border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold text-[#10B981] bg-emerald-50 border border-emerald-200 rounded-full tracking-wider">
                  Minggu Ini
                </span>
              </div>
              <div className="space-y-0.5">
                {loading ? (
                  <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse" />
                ) : (
                  <h3 className="text-3xl font-bold text-[#0B1633] font-mono leading-none">
                    {stats.successful_returns}
                  </h3>
                )}
                <p className="text-slate-400 text-xs font-medium">Barang Berhasil Dikembalikan</p>
              </div>
            </div>

          </div>

          {/* Two-Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Verification Queue */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Antrean Verifikasi
                </h3>
                <Link href="/admin/klaim" className="text-xs font-medium text-[#12A99A] hover:underline">
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-16 bg-slate-100 rounded-2xl w-full" />
                    <div className="h-16 bg-slate-100 rounded-2xl w-full" />
                  </div>
                ) : verificationQueue.length === 0 ? (
                  <div className="text-center py-6 text-xs font-medium text-slate-400">
                    Tidak ada antrean verifikasi klaim aktif.
                  </div>
                ) : (
                  verificationQueue.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 p-4 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-semibold text-sm text-[#0B1633]">{item.item_name}</h4>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-medium">ID: #{item.claim_id}</span>
                            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-600 bg-amber-50 rounded-full">
                              Menunggu
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/admin/klaim"
                        className="px-4 py-2 bg-white border border-[#12A99A] hover:bg-teal-50 text-[#12A99A] font-medium text-xs rounded-xl transition-all shrink-0"
                      >
                        Tinjau
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Activity Log */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Aktivitas Terbaru
              </h3>

              <div className="relative pl-6 space-y-5">
                <div className="absolute top-2.5 bottom-2.5 left-2.5 w-0.5 bg-slate-100" />

                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-10 bg-slate-100 rounded-lg w-full" />
                    <div className="h-10 bg-slate-100 rounded-lg w-full" />
                  </div>
                ) : activityLog.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    Belum ada log aktivitas.
                  </div>
                ) : (
                  activityLog.map((log: any) => {
                    const isReturned = log.tipe === 'item_returned';
                    const isNewItem = log.tipe === 'new_item';

                    return (
                      <div key={log.id} className="relative space-y-1">
                        <div className={`absolute -left-[24px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white ring-4 shrink-0 ${
                          isReturned 
                            ? 'bg-[#10B981] ring-emerald-50' 
                            : isNewItem 
                            ? 'bg-[#0B1633] ring-slate-100' 
                            : 'bg-[#6366F1] ring-indigo-50'
                        }`}>
                          {isReturned ? (
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : isNewItem ? (
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          ) : (
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                            </svg>
                          )}
                        </div>
                        <h4 className="text-xs font-semibold text-[#0B1633]">{log.judul}</h4>
                        <p className="text-slate-500 text-[10px] font-normal leading-relaxed">{log.deskripsi}</p>
                        <p className="text-slate-400 text-[10px] font-medium">
                          {log.waktu} {log.pelaku && `oleh ${log.pelaku}`}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
