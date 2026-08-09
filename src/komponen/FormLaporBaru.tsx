'use client';

import { useState } from 'react';
import { TipeLaporan, DataLaporanBaruDTO } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB, KATEGORI_BARANG } from '@/pustaka/alur-kerja/katalog';

interface PropsForm {
  tipeAwal?: TipeLaporan;
  onSelesai?: (dto: DataLaporanBaruDTO) => void;
}

export default function FormLaporBaru({ tipeAwal = 'kehilangan', onSelesai }: PropsForm) {
  const [langkah, setLangkah] = useState<number>(1);
  const [tipe, setTipe] = useState<TipeLaporan>(tipeAwal);
  const [kategori, setKategori] = useState<string>(KATEGORI_BARANG[0]);
  const [idZona, setIdZona] = useState<string>(DAFTAR_ZONA_LAB[0].id);
  const [waktuKejadian, setWaktuKejadian] = useState<string>('');
  const [deskripsiPublik, setDeskripsiPublik] = useState<string>('');
  const [urlFoto, setUrlFoto] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [pesan, setPesan] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan('');

    const dto: DataLaporanBaruDTO = {
      tipe,
      kategori,
      id_zona: idZona,
      deskripsi_publik: deskripsiPublik,
      waktu_kejadian: waktuKejadian,
      url_foto: urlFoto || undefined,
    };

    try {
      const res = await fetch('/api/laporan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });

      const data = await res.json();

      if (res.ok) {
        setPesan('Laporan berhasil dikirim!');
        if (onSelesai) onSelesai(dto);
      } else {
        setPesan(`Gagal membuat laporan: ${data.error || 'Kesalahan server'}`);
      }
    } catch {
      setPesan('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kartu-refound p-6 md:p-8 space-y-6">
      {/* Wizard Header Steps */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12A99A]">
            Langkah {langkah} dari 3
          </span>
          <h2 className="text-xl font-bold text-[#0B1633] dark:text-white">
            {langkah === 1 && 'Identitas & Kategori Barang'}
            {langkah === 2 && 'Deskripsi & Bukti Foto'}
            {langkah === 3 && 'Lokasi & Kejadian'}
          </h2>
        </div>
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className={`w-3 h-3 rounded-full ${langkah >= 1 ? 'bg-[#12A99A]' : 'bg-zinc-300'}`} />
          <span className={`w-3 h-3 rounded-full ${langkah >= 2 ? 'bg-[#12A99A]' : 'bg-zinc-300'}`} />
          <span className={`w-3 h-3 rounded-full ${langkah >= 3 ? 'bg-[#12A99A]' : 'bg-zinc-300'}`} />
        </div>
      </div>

      {pesan && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold ${
            pesan.includes('berhasil')
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
          }`}
        >
          {pesan}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {langkah === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">Tipe Laporan</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTipe('kehilangan')}
                  className={`py-3.5 px-4 rounded-xl font-bold border text-sm transition-all ${
                    tipe === 'kehilangan'
                      ? 'bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-950/40 dark:border-rose-500 dark:text-rose-300 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'
                  }`}
                >
                  Saya Kehilangan Barang
                </button>
                <button
                  type="button"
                  onClick={() => setTipe('penemuan')}
                  className={`py-3.5 px-4 rounded-xl font-bold border text-sm transition-all ${
                    tipe === 'penemuan'
                      ? 'bg-teal-50 border-teal-500 text-teal-700 dark:bg-teal-950/40 dark:border-teal-500 dark:text-teal-300 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50'
                  }`}
                >
                  Saya Menemukan Barang
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Kategori Barang</label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
              >
                {KATEGORI_BARANG.map((kat, idx) => (
                  <option key={idx} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setLangkah(2)}
                className="px-6 py-2.5 bg-[#0B1633] text-white dark:bg-[#12A99A] rounded-xl font-bold text-sm hover:opacity-90 transition-all"
              >
                Lanjut ke Deskripsi &rarr;
              </button>
            </div>
          </div>
        )}

        {langkah === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-1">
                Deskripsi Publik (Bisa Dibaca Anggota Komunitas)
              </label>
              <p className="text-xs text-zinc-500 mb-2">
                Jangan memasukkan nomor kontak, NIM, atau ciri rahasia di sini.
              </p>
              <textarea
                required
                rows={4}
                value={deskripsiPublik}
                onChange={(e) => setDeskripsiPublik(e.target.value)}
                placeholder="Tuliskan ciri fisik umum (contoh: Tumbler Corkcicle hitam 750ml, polos tanpa gantung jam)."
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">URL Foto Barang (Opsional)</label>
              <input
                type="text"
                value={urlFoto}
                onChange={(e) => setUrlFoto(e.target.value)}
                placeholder="https://... (URL foto opsional)"
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setLangkah(1)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:underline"
              >
                &larr; Kembali
              </button>
              <button
                type="button"
                onClick={() => setLangkah(3)}
                className="px-6 py-2.5 bg-[#0B1633] text-white dark:bg-[#12A99A] rounded-xl font-bold text-sm hover:opacity-90 transition-all"
              >
                Lanjut ke Lokasi &rarr;
              </button>
            </div>
          </div>
        )}

        {langkah === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-1">Zona Lokasi Kejadian</label>
              <select
                value={idZona}
                onChange={(e) => setIdZona(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
              >
                {DAFTAR_ZONA_LAB.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.nama} - {z.deskripsi}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Waktu Kejadian</label>
              <input
                type="datetime-local"
                required
                value={waktuKejadian}
                onChange={(e) => setWaktuKejadian(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-3 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setLangkah(2)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:underline"
              >
                &larr; Kembali
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#12A99A] hover:bg-[#0f9184] text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                {loading ? 'Mengirim Laporan...' : 'Kirim Laporan & Prospek AI'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
