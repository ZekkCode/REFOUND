'use client';

import { useState } from 'react';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanAdminLaporanCustody() {
  const [reportId, setReportId] = useState('lap-temuan-202');
  const [secretNotes, setSecretNotes] = useState('');
  const [custodyCode, setCustodyCode] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'sukses' | 'error'; isi: string } | null>(null);

  const handleSubmitPenitipan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan(null);

    try {
      const res = await fetch('/api/admin/penitipan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_laporan: reportId,
          catatan_rahasia: secretNotes,
          kode_penitipan: custodyCode,
          pertanyaan_verifikasi: verificationQuestion,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPesan({ tipe: 'sukses', isi: data.pesan });
        setSecretNotes('');
        setCustodyCode('');
        setVerificationQuestion('');
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

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Penitipan Barang Fisik
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Input Ciri Rahasia & Simpan Physical Custody
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Admin mencatat ciri rahasia yang TIDAK tampil publik untuk dipakai sebagai dasar verifikasi pertanyaan klaim mahasiswa.
          </p>
        </div>

        {pesan && (
          <PesanUmpanBalik
            tipe={pesan.tipe}
            judul={pesan.tipe === 'sukses' ? 'Penitipan Berhasil' : 'Penitipan Gagal'}
            pesan={pesan.isi}
          />
        )}

        <form onSubmit={handleSubmitPenitipan} className="kartu-refound p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              ID Laporan Barang Temuan
            </label>
            <input
              type="text"
              required
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              Ciri Rahasia Barang (Hanya Terlihat Admin)
            </label>
            <textarea
              required
              rows={3}
              value={secretNotes}
              onChange={(e) => setSecretNotes(e.target.value)}
              placeholder="Contoh: Ada stiker logo TIF 2024 di pojok kanan bawah & goresan halus dekat lubang port."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              Kode Simpan Rak Fisik (Custody Code)
            </label>
            <input
              type="text"
              required
              value={custodyCode}
              onChange={(e) => setCustodyCode(e.target.value)}
              placeholder="Contoh: RAK-A2-05"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              Usulan Pertanyaan Verifikasi Klaim Mahasiswa
            </label>
            <input
              type="text"
              value={verificationQuestion}
              onChange={(e) => setVerificationQuestion(e.target.value)}
              placeholder="Contoh: Sebutkan stiker atau goresan unik yang terdapat pada fisik barang."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0B1633] hover:bg-[#152754] text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-md"
          >
            {loading ? 'Menyimpan...' : 'Validasi & Aktifkan Laporan Temuan'}
          </button>
        </form>
      </main>
    </div>
  );
}
