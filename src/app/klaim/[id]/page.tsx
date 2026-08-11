'use client';

import { useState, use } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Header bar */}
      <header className="sticky top-0 bg-white border-b border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between z-20 shadow-sm shrink-0">
        <div>
          <Link href="/kecocokan" className="font-black text-2xl tracking-tight text-[#0B1633] hover:text-[#12A99A] transition-colors">
            REFOUND
          </Link>
        </div>
        <div>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs rounded-full shadow-sm transition-all"
          >
            Masuk
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-start justify-center p-6 md:p-8">
        <div className="max-w-3xl w-full bg-white p-8 sm:p-10 rounded-3xl border border-zinc-150 shadow-[0_10px_40px_rgba(11,22,51,0.02)] space-y-6 mb-24">
          
          {/* Header text */}
          <div className="space-y-2 border-b border-zinc-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1633]">
              Pengajuan Klaim Barang
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed">
              Sistem verifikasi keamanan ketat. Buktikan kepemilikan Anda untuk memproses pengambilan barang.
            </p>
          </div>

          {/* Item Info Box */}
          <div className="p-5 bg-[#F4F6F9] border border-zinc-200 rounded-2xl flex items-center gap-4">
            {/* Left square badge */}
            <div className="w-12 h-12 bg-zinc-200/50 rounded-xl flex items-center justify-center text-zinc-500 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            {/* Right text info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase bg-[#6366F1] text-white rounded-full tracking-wider">
                  Disimpan Admin
                </span>
                <span className="text-zinc-400 font-bold text-[10px]">
                  ID: {kandidat.id_barang}
                </span>
              </div>
              <h3 className="font-extrabold text-[#0B1633] text-sm sm:text-base leading-tight">
                {kandidat.title}
              </h3>
              <p className="text-zinc-400 text-[10px] font-bold">
                Ditemukan di {kandidat.zona_penemuan} pada {kandidat.waktu_penemuan}.
              </p>
            </div>
          </div>

          {/* AI Semantic Evaluation Result */}
          {hasil && (
            <div className="space-y-4 pt-2">
              <PesanUmpanBalik
                tipe={hasil.error ? 'error' : 'sukses'}
                judul={hasil.error ? 'Pengajuan Gagal' : 'Klaim Berhasil Dikirim'}
                pesan={hasil.error || hasil.pesan || ''}
              />

              {hasil.skor_semantik_ai !== undefined && (
                <div className="p-5 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-3 shadow-sm text-xs">
                  <span className="font-black uppercase tracking-wider text-[#12A99A] block">
                    Hasil Evaluasi Semantik LLM AI Engine:
                  </span>
                  <div className="space-y-1 font-mono text-[#0B1633]">
                    <p><strong>Skor Verifikasi Jawaban:</strong> {Math.round(hasil.skor_semantik_ai * 100)}%</p>
                    <p className="leading-relaxed"><strong>Analisis AI:</strong> {hasil.alasan_analisis_ai}</p>
                  </div>
                  <div className="pt-2 border-t border-teal-100 flex justify-end">
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 bg-[#12A99A] hover:bg-[#12A99A]/90 text-white font-bold rounded-xl transition-all shadow-sm"
                    >
                      Buka Dashboard Saya &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {!hasil && (
            <form onSubmit={handleSubmitKlaim} className="space-y-6">
              {/* Question Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#0B1633]">
                    Pertanyaan Verifikasi Keamanan *
                  </label>
                  <p className="text-zinc-400 text-xs font-semibold leading-relaxed">
                    Untuk memastikan ini milik Anda, jawab pertanyaan spesifik dari penemu/admin:
                  </p>
                </div>

                {/* Dark highlighted box */}
                <div className="p-4 bg-[#0B1633] rounded-xl text-white flex items-start space-x-3 shadow-md shadow-[#0B1633]/5">
                  <svg className="w-5 h-5 text-[#12A99A] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-bold leading-relaxed">
                    &quot;{kandidat.pertanyaan_verifikasi}&quot;
                  </span>
                </div>

                {/* Response Textarea */}
                <div>
                  <textarea
                    required
                    rows={4}
                    value={jawaban}
                    onChange={(e) => setJawaban(e.target.value)}
                    placeholder="Masukkan jawaban spesifik Anda di sini..."
                    className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Additional Proof Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#0B1633]">
                    Bukti Kepemilikan Tambahan (Opsional)
                  </label>
                  <p className="text-zinc-400 text-xs font-semibold leading-relaxed">
                    Unggah foto nota pembelian, kotak kemasan, atau tangkapan layar jika relevan.
                  </p>
                </div>

                {/* Dashed upload box */}
                <div className="border-2 border-dashed border-zinc-200 hover:border-[#12A99A] rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 bg-zinc-50/50 hover:bg-teal-50/5 cursor-pointer transition-all">
                  <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm font-bold text-[#0B1633]">
                      <span className="text-[#12A99A]">Upload file</span> atau drag and drop
                    </p>
                    <p className="text-zinc-400 text-[10px] font-bold mt-1">PNG, JPG, PDF up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Checkbox confirmation */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="confirm-kebenaran"
                  checked={sudahKonfirmasi}
                  onChange={(e) => setSudahKonfirmasi(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-[#0B1633] focus:ring-[#12A99A] mt-1 shrink-0 cursor-pointer"
                />
                <label htmlFor="confirm-kebenaran" className="text-zinc-500 text-xs font-semibold leading-relaxed cursor-pointer select-none">
                  Saya mengonfirmasi bahwa informasi yang diberikan adalah benar. Saya memahami bahwa klaim palsu dapat berakibat pada sanksi administratif kampus dan proses klaim ini akan ditinjau langsung oleh Admin Lab.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-end space-x-4">
                <Link
                  href="/kecocokan"
                  className="px-6 py-2.5 border border-zinc-200 text-zinc-500 hover:border-zinc-300 font-bold text-sm rounded-xl transition-all bg-white"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={loading || !sudahKonfirmasi}
                  className="px-6 py-2.5 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {loading ? 'Mengirim...' : 'Kirim Pengajuan Klaim'}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1633] text-white py-12 px-6 sm:px-12 border-t border-white/10 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="font-black text-xl tracking-wider">REFOUND</span>
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

