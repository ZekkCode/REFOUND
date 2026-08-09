'use client';

import { useState } from 'react';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanAdminTinjauKlaim() {
  const [alasan, setAlasan] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'sukses' | 'error'; isi: string } | null>(null);

  const mockKlaim = {
    id_klaim: 'claim-9912',
    mahasiswa: 'Zakaria (NIM: 220411100099)',
    prodi: 'Teknik Informatika',
    jawaban_mahasiswa: 'Ada stiker logo Mac warna putih di bagian samping dekat dasar tumbler.',
    catatan_rahasia_admin: 'Stiker logo Mac warna putih di bagian samping dekat dasar tumbler.',
    skor_semantik_ai: 0.95,
    alasan_ai: 'Jawaban pengguna sangat cocok dengan ciri rahasia barang temuan.',
  };

  const handleEksekusi = async (setujui: boolean) => {
    if (!alasan) {
      setPesan({ tipe: 'error', isi: 'Mohon isi alasan keputusan sebelum memproses.' });
      return;
    }

    setLoading(true);
    setPesan(null);

    try {
      const res = await fetch(`/api/admin/klaim/${mockKlaim.id_klaim}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setujui, alasan }),
      });

      const data = await res.json();
      if (res.ok) {
        setPesan({ tipe: 'sukses', isi: data.pesan });
      } else {
        setPesan({ tipe: 'error', isi: data.error });
      }
    } catch {
      setPesan({ tipe: 'error', isi: 'Terjadi kesalahan jaringan.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Peninjauan Klaim Kepemilikan
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Evaluasi Side-by-Side Klaim #{mockKlaim.id_klaim}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Bandingkan jawaban rahasia pemohon dengan catatan rahasia barang temuan yang disimpan Admin Lab.
          </p>
        </div>

        {pesan && (
          <PesanUmpanBalik
            tipe={pesan.tipe}
            judul={pesan.tipe === 'sukses' ? 'Keputusan Diproses' : 'Gagal'}
            pesan={pesan.isi}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jawaban Mahasiswa */}
          <div className="kartu-refound p-6 space-y-3 border-purple-300 dark:border-purple-800">
            <span className="text-xs font-bold uppercase text-purple-700 bg-purple-100 dark:bg-purple-950 px-2.5 py-1 rounded-full">
              Jawaban Pemohon ({mockKlaim.mahasiswa})
            </span>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              "{mockKlaim.jawaban_mahasiswa}"
            </div>
            <div className="pt-2 text-xs font-mono space-y-1">
              <p><strong>Rekomendasi AI:</strong> {Math.round(mockKlaim.skor_semantik_ai * 100)}% Match</p>
              <p className="text-zinc-500">{mockKlaim.alasan_ai}</p>
            </div>
          </div>

          {/* Catatan Rahasia Admin */}
          <div className="kartu-refound p-6 space-y-3 border-teal-300 dark:border-teal-800">
            <span className="text-xs font-bold uppercase text-teal-700 bg-teal-100 dark:bg-teal-950 px-2.5 py-1 rounded-full">
              Catatan Rahasia Physical Custody
            </span>
            <div className="p-3 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl text-xs font-semibold text-teal-900 dark:text-teal-200">
              "{mockKlaim.catatan_rahasia_admin}"
            </div>
            <p className="text-xs text-zinc-500 pt-2">
              Hanya terlihat oleh Admin Lab bertugas.
            </p>
          </div>
        </div>

        {/* Input Alasan & Decision Buttons */}
        <div className="kartu-refound p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              Alasan Keputusan Admin Lab (Wajib)
            </label>
            <input
              type="text"
              required
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              placeholder="Contoh: Jawaban verifikasi sangat akurat sesuai stiker fisik barang."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleEksekusi(false)}
              disabled={loading}
              className="py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50"
            >
              Tolak Klaim
            </button>
            <button
              onClick={() => handleEksekusi(true)}
              disabled={loading}
              className="py-3 bg-[#12A99A] hover:bg-[#0f9184] text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-md"
            >
              Setujui Klaim & Generate Kode
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
