'use client';

import { useState } from 'react';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanAdminPenyerahan() {
  const [claimId, setClaimId] = useState('claim-9912');
  const [pickupCode, setPickupCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'sukses' | 'error'; isi: string } | null>(null);

  const handleVerifikasiKode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan(null);

    try {
      const res = await fetch('/api/admin/penyerahan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_klaim: claimId,
          kode_pengambilan: pickupCode,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPesan({ tipe: 'sukses', isi: data.pesan });
        setPickupCode('');
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

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12A99A]">
            Verifikasi Akhir Penyerahan Barang
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Eksekusi Kode Pengambilan Single-Use
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Cocokkan kode pengambilan yang ditunjukkan oleh mahasiswa saat berada di Ruang Admin Lab.
          </p>
        </div>

        {pesan && (
          <PesanUmpanBalik
            tipe={pesan.tipe}
            judul={pesan.tipe === 'sukses' ? 'Verifikasi Sukses' : 'Kode Tidak Valid'}
            pesan={pesan.isi}
          />
        )}

        <form onSubmit={handleVerifikasiKode} className="kartu-refound p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              ID Klaim Disetujui
            </label>
            <input
              type="text"
              required
              value={claimId}
              onChange={(e) => setClaimId(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-[#0B1633] dark:text-white">
              Kode Pengambilan Single-Use (Ditunjukkan Mahasiswa)
            </label>
            <input
              type="text"
              required
              value={pickupCode}
              onChange={(e) => setPickupCode(e.target.value)}
              placeholder="Contoh: AMBIL-8821"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-base font-mono font-bold uppercase text-[#12A99A]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#12A99A] hover:bg-[#0f9184] text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            {loading ? 'Memverifikasi Kode...' : 'Verifikasi Kode & Serahkan Barang (Tutup Kasus)'}
          </button>
        </form>
      </main>
    </div>
  );
}
