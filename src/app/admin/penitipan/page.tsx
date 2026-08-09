'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BarangTemuanPending {
  id: string;
  kategori: string;
  deskripsi_publik: string;
  id_zona: string;
  waktu_kejadian: string;
}

export default function HalamanPenitipanAdmin() {
  const [idLaporan, setIdLaporan] = useState('');
  const [catatanRahasia, setCatatanRahasia] = useState('');
  const [kodePenitipan, setKodePenitipan] = useState('');
  const [pertanyaanVerifikasi, setPertanyaanVerifikasi] = useState('');
  const [idKlaim, setIdKlaim] = useState('');
  const [kodePengambilan, setKodePengambilan] = useState('');
  const [pesan, setPesan] = useState('');
  const [loading, setLoading] = useState(false);

  const daftarPending: BarangTemuanPending[] = [
    {
      id: 'lap-temuan-001',
      kategori: 'Wadah',
      deskripsi_publik: 'Tumbler hitam merk Corkcicle ditemukan di meja lab komputer 3',
      id_zona: 'lab_tif',
      waktu_kejadian: '2026-08-09T09:30:00Z',
    },
  ];

  const handleValidasiPenitipan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan('');

    setTimeout(() => {
      setPesan(`Barang ${idLaporan} berhasil divalidasi. Kode simpan custody: ${kodePenitipan || 'CUST-8821'}`);
      setIdLaporan('');
      setCatatanRahasia('');
      setKodePenitipan('');
      setPertanyaanVerifikasi('');
      setLoading(false);
    }, 500);
  };

  const handlePenyerahan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan('');

    try {
      const res = await fetch('/api/admin/penyerahan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_klaim: idKlaim, kode_pengambilan: kodePengambilan }),
      });
      const data = await res.json();
      if (res.ok) {
        setPesan(data.pesan);
        setIdKlaim('');
        setKodePengambilan('');
      } else {
        setPesan(`Error: ${data.error}`);
      }
    } catch {
      setPesan('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Portal Admin Lab
            </span>
            <h1 className="text-2xl font-bold tracking-tight">Penitipan & Penyerahan Barang Lab</h1>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            &larr; Beranda
          </Link>
        </div>

        {pesan && (
          <div className="p-4 rounded-lg text-sm font-medium bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
            {pesan}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-lg font-semibold">1. Validasi Penitipan Barang Temuan</h2>
            <p className="text-xs text-zinc-500">
              Catat ciri rahasia barang yang TIDAK boleh dipublikasikan ke mahasiswa.
            </p>

            <form onSubmit={handleValidasiPenitipan} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Pilih Laporan Barang</label>
                <select
                  required
                  value={idLaporan}
                  onChange={(e) => setIdLaporan(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
                >
                  <option value="">-- Pilih Barang --</option>
                  {daftarPending.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} - {item.kategori} ({item.id_zona})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Ciri Rahasia Barang</label>
                <textarea
                  required
                  rows={3}
                  value={catatanRahasia}
                  onChange={(e) => setCatatanRahasia(e.target.value)}
                  placeholder="Contoh: Stiker logo macbook dipojok kanan bawah"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Kode Penitipan Fisik</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: RAK-A2-05"
                  value={kodePenitipan}
                  onChange={(e) => setKodePenitipan(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Pertanyaan Verifikasi Klaim</label>
                <input
                  type="text"
                  placeholder="Contoh: Sebutkan stiker dibagian belakang laptop"
                  value={pertanyaanVerifikasi}
                  onChange={(e) => setPertanyaanVerifikasi(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-all"
              >
                Simpan & Aktifkan Laporan
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-lg font-semibold">2. Konfirmasi Penyerahan Barang</h2>
            <p className="text-xs text-zinc-500">
              Cocokkan Kode Pengambilan Mahasiswa untuk menyerahkan barang fisik.
            </p>

            <form onSubmit={handlePenyerahan} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">ID Klaim Mahasiswa</label>
                <input
                  type="text"
                  required
                  placeholder="ID Klaim"
                  value={idKlaim}
                  onChange={(e) => setIdKlaim(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Kode Pengambilan Sekali Pakai</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: AMBIL-9921"
                  value={kodePengambilan}
                  onChange={(e) => setKodePengambilan(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-lg font-medium text-sm transition-all"
              >
                Verifikasi & Serahkan Barang
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
