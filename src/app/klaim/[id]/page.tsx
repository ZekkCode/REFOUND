'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanPengajuanKlaim({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [jawaban, setJawaban] = useState('');
  const [sudahKonfirmasi, setSudahKonfirmasi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<{
    pesan?: string;
    error?: string;
    skor_semantik_ai?: number;
    alasan_analisis_ai?: string;
  } | null>(null);

  const kandidat = {
    id_pencocokan: id,
    id_barang: 'RF-20394',
    title: 'Flashdisk SanDisk 32GB (Hitam)',
    zona_penemuan: 'Lab Komputer B (Zona 2)',
    waktu_penemuan: '12 Okt 2024',
    pertanyaan_verifikasi: 'Apa isi atau nama folder utama yang ada di dalam flashdisk ini?',
  };

  const handleSubmitKlaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sudahKonfirmasi) {
      alert('Mohon centang konfirmasi kebenaran informasi sebelum mengirim.');
      return;
    }
    setLoading(true);
    setHasil(null);

    try {
      const res = await fetch('/api/klaim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_pencocokan: id,
          jawaban_rahasia: jawaban,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setHasil({
          pesan: data.pesan,
          skor_semantik_ai: data.data.skor_semantik_ai,
          alasan_analisis_ai: data.data.alasan_analisis_ai,
        });
      } else {
        setHasil({ error: data.error });
      }
    } catch {
      setHasil({ error: 'Terjadi kesalahan sistem/jaringan.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      
      {/* Header bar */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-6 md:px-12 flex items-center justify-between z-20 shrink-0">
        <div>
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="REFOUND Logo" width={120} height={36} className="object-contain h-8 w-auto" priority />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-slate-600 hover:text-[#0B1633] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/profil"
            title="Buka Profil Saya"
            className="w-8 h-8 rounded-full bg-[#0B1633] text-white flex items-center justify-center font-semibold text-xs shadow-xs hover:ring-2 hover:ring-[#12A99A]/50 transition-all"
          >
            BS
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-start justify-center p-6 md:p-10">
        <div className="max-w-2xl w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 mb-20">
          
          {/* Header text */}
          <div className="space-y-1.5 border-b border-slate-100 pb-5">
            <span className="text-[10px] font-semibold text-[#12A99A] uppercase tracking-widest bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
              Verifikasi Kepemilikan
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1633] tracking-tight">
              Klaim Barang
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
              Jawab pertanyaan berikut untuk memverifikasi kepemilikan barang.
            </p>
          </div>

          {/* Item Info Box */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-4">
            <div className="w-11 h-11 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-[#12A99A] shrink-0 font-semibold text-sm shadow-xs">
              <svg className="w-6 h-6 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[9px] font-semibold uppercase bg-emerald-50 text-[#10B981] border border-emerald-200 rounded-full">
                  Disimpan di Lab
                </span>
                <span className="text-slate-400 font-medium text-[10px]">
                  ID: {kandidat.id_barang}
                </span>
              </div>
              <h3 className="font-bold text-[#0B1633] text-sm sm:text-base leading-tight">
                {kandidat.title}
              </h3>
              <p className="text-slate-500 text-[11px] font-normal">
                {kandidat.zona_penemuan} &bull; {kandidat.waktu_penemuan}
              </p>
            </div>
          </div>

          {/* AI Semantic Evaluation Result */}
          {hasil && (
            <div className="space-y-4 pt-2">
              <PesanUmpanBalik
                tipe={hasil.error ? 'error' : 'sukses'}
                judul={hasil.error ? 'Pengajuan Gagal' : 'Klaim Terkirim'}
                pesan={hasil.error || hasil.pesan || ''}
              />

              {hasil.skor_semantik_ai !== undefined && (
                <div className="p-5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-3 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#12A99A] block">
                    Hasil Verifikasi:
                  </span>
                  <div className="space-y-1 font-mono text-[#0B1633]">
                    <p><strong>Kemiripan Jawaban:</strong> {Math.round(hasil.skor_semantik_ai * 100)}%</p>
                    <p className="leading-relaxed"><strong>Analisis:</strong> {hasil.alasan_analisis_ai}</p>
                  </div>
                  <div className="pt-2 border-t border-teal-100 flex justify-end">
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white font-semibold rounded-xl transition-all shadow-xs"
                    >
                      Ke Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {!hasil && (
            <form onSubmit={handleSubmitKlaim} className="space-y-6">
              {/* Question Section */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#0B1633] uppercase tracking-wider">
                    Pertanyaan Verifikasi *
                  </label>
                  <p className="text-slate-500 text-xs font-normal">
                    Pertanyaan berdasarkan ciri fisik barang:
                  </p>
                </div>

                {/* Question Box */}
                <div className="p-4 bg-[#0B1633] rounded-xl text-white flex items-start space-x-3 shadow-xs">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 text-[#12A99A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ?
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed text-slate-100">
                    "{kandidat.pertanyaan_verifikasi}"
                  </span>
                </div>

                {/* Response Textarea */}
                <div>
                  <textarea
                    required
                    rows={4}
                    value={jawaban}
                    onChange={(e) => setJawaban(e.target.value)}
                    placeholder="Tuliskan jawaban Anda di sini..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Checkbox confirmation */}
              <div className="flex items-start space-x-3 pt-1">
                <input
                  type="checkbox"
                  id="confirm-kebenaran"
                  checked={sudahKonfirmasi}
                  onChange={(e) => setSudahKonfirmasi(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#12A99A] focus:ring-[#12A99A] mt-0.5 shrink-0 cursor-pointer"
                />
                <label htmlFor="confirm-kebenaran" className="text-slate-500 text-xs font-normal leading-relaxed cursor-pointer select-none">
                  Saya menyatakan bahwa informasi yang diberikan adalah benar dan sesuai.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <Link
                  href="/kecocokan"
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-xl transition-all"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={loading || !sudahKonfirmasi}
                  className="px-6 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center cursor-pointer"
                >
                  {loading ? 'Memverifikasi...' : 'Kirim Jawaban'}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1633] text-white py-8 px-6 border-t border-white/10 shrink-0 text-center text-xs font-normal text-slate-400">
        © 2026 REFOUND - Laboratorium Teknik Informatika & Sistem Informasi
      </footer>

    </div>
  );
}
