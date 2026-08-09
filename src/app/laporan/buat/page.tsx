'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HalamanBuatLaporan() {
  const [tipe, setTipe] = useState<'kehilangan' | 'penemuan'>('kehilangan');
  const [kategori, setKategori] = useState('Elektronik');
  const [idZona, setIdZona] = useState('lab_tif');
  const [deskripsiPublik, setDeskripsiPublik] = useState('');
  const [waktuKejadian, setWaktuKejadian] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan('');

    try {
      const res = await fetch('/api/laporan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipe,
          kategori,
          id_zona: idZona,
          deskripsi_publik: deskripsiPublik,
          waktu_kejadian: waktuKejadian,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPesan(data.pesan);
        setDeskripsiPublik('');
        setWaktuKejadian('');
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
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Buat Laporan Baru</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Laporkan barang hilang atau barang temuan di lingkungan laboratorium.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            &larr; Kembali
          </Link>
        </div>

        {pesan && (
          <div
            className={`p-4 rounded-lg text-sm font-medium ${
              pesan.startsWith('Error')
                ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
            }`}
          >
            {pesan}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Jenis Laporan</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTipe('kehilangan')}
                className={`py-3 rounded-lg font-medium border text-sm transition-all ${
                  tipe === 'kehilangan'
                    ? 'bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-950/40 dark:border-rose-500 dark:text-rose-300'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                Saya Kehilangan Barang
              </button>
              <button
                type="button"
                onClick={() => setTipe('penemuan')}
                className={`py-3 rounded-lg font-medium border text-sm transition-all ${
                  tipe === 'penemuan'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-300'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                Saya Menemukan Barang
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori Barang</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
            >
              <option value="Elektronik">Elektronik (Laptop, Flashdisk, Charger, TWS)</option>
              <option value="Aksesoris">Aksesoris (Kacamata, Jam Tangan, Perhiasan)</option>
              <option value="Dokumen">Dokumen (KTM, KTP, STNK, Buku Catatan)</option>
              <option value="Wadah">Wadah (Tumbler, Tas, Dompet, Jaket)</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Zona Lokasi Kejadian</label>
            <select
              value={idZona}
              onChange={(e) => setIdZona(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
            >
              <option value="lab_tif">Lab TIF - Teknik Informatika</option>
              <option value="lab_si">Lab SI - Sistem Informasi</option>
              <option value="koridor">Koridor Gedung Lab</option>
              <option value="tangga">Area Tangga</option>
              <option value="lobi">Lobi Utama Lab</option>
              <option value="ruang_admin">Ruang Admin Lab</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Waktu Kejadian</label>
            <input
              type="datetime-local"
              required
              value={waktuKejadian}
              onChange={(e) => setWaktuKejadian(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi Publik</label>
            <textarea
              required
              rows={4}
              value={deskripsiPublik}
              onChange={(e) => setDeskripsiPublik(e.target.value)}
              placeholder="Tuliskan deskripsi umum (contoh: Tumbler hitam merk Corkcicle hilang sekitar jam 10 pagi saat praktikum)."
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-lg font-medium text-sm transition-all disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </button>
        </form>
      </div>
    </div>
  );
}
