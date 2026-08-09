'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanPengajuanKlaim({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [jawaban, setJawaban] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<{
    pesan?: string;
    error?: string;
    skor_semantik_ai?: number;
    alasan_analisis_ai?: string;
  } | null>(null);

  const kandidat = {
    id_pencocokan: id,
    kategori_barang: 'Wadah (Tumbler Corkcicle)',
    zona_penemuan: 'Lab TIF',
    waktu_penemuan: '9 Agu 2026, 09:30 WIB',
    deskripsi_publik: 'Tumbler hitam merk Corkcicle ditemukan di meja lab komputer 3.',
    pertanyaan_verifikasi: 'Sebutkan warna stiker atau tulisan unik yang terdapat pada bagian samping/bawah tumbler milik Anda.',
  };

  const handleSubmitKlaim = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Verifikasi Kepemilikan Barang (Rahasia)
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
              Ajukan Klaim Barang #Match-{id}
            </h1>
          </div>
          <Link
            href="/kecocokan"
            className="text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            &larr; Kembali
          </Link>
        </div>

        <div className="kartu-refound p-6 space-y-3">
          <h2 className="font-bold text-base text-[#0B1633] dark:text-white">
            Detail Barang Temuan Terpilih
          </h2>
          <div className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-300">
            <p><strong className="text-zinc-900 dark:text-zinc-100">Kategori:</strong> {kandidat.kategori_barang}</p>
            <p><strong className="text-zinc-900 dark:text-zinc-100">Lokasi Penemuan:</strong> {kandidat.zona_penemuan}</p>
            <p><strong className="text-zinc-900 dark:text-zinc-100">Waktu Ditemukan:</strong> {kandidat.waktu_penemuan}</p>
            <p><strong className="text-zinc-900 dark:text-zinc-100">Deskripsi Publik:</strong> {kandidat.deskripsi_publik}</p>
          </div>
        </div>

        {hasil && (
          <div className="space-y-3">
            <PesanUmpanBalik
              tipe={hasil.error ? 'error' : 'sukses'}
              judul={hasil.error ? 'Pengajuan Gagal' : 'Klaim Berhasil Dikirim'}
              pesan={hasil.error || hasil.pesan || ''}
            />

            {hasil.skor_semantik_ai !== undefined && (
              <div className="kartu-refound p-4 space-y-2 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12A99A]">
                  Hasil Evaluasi Semantik LLM AI Engine:
                </span>
                <div className="text-xs space-y-1 font-mono">
                  <p><strong>Skor Verifikasi Jawaban:</strong> {Math.round(hasil.skor_semantik_ai * 100)}%</p>
                  <p><strong>Analisis AI:</strong> {hasil.alasan_analisis_ai}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmitKlaim} className="kartu-refound p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0B1633] dark:text-white">
              Pertanyaan Verifikasi Kepemilikan dari Admin Lab:
            </label>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-900 dark:text-amber-200 font-bold leading-relaxed">
              "{kandidat.pertanyaan_verifikasi}"
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              Jawaban Rahasia Anda
            </label>
            <textarea
              required
              rows={4}
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
              placeholder="Jawab sejelas mungkin sesuai ciri fisik barang Anda (contoh: stiker logo Mac warna putih di bagian samping dekat dasar)."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#12A99A] hover:bg-[#0f9184] text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            {loading ? 'Mengevaluasi Jawaban dengan AI...' : 'Kirim Jawaban Klaim'}
          </button>
        </form>
      </main>
    </div>
  );
}
