'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TipeLaporan, DataLaporanBaruDTO } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB, KATEGORI_BARANG } from '@/pustaka/alur-kerja/katalog';

interface PropsForm {
  tipeAwal?: TipeLaporan;
  onSelesai?: (dto: DataLaporanBaruDTO) => void;
}

export default function FormLaporBaru({ tipeAwal = 'kehilangan', onSelesai }: PropsForm) {
  const router = useRouter();
  const [langkah, setLangkah] = useState<number>(1);
  const [tipe, setTipe] = useState<TipeLaporan>(tipeAwal);
  
  // Step 1: Identitas
  const [kategori, setKategori] = useState<string>(KATEGORI_BARANG[0]);
  const [namaBarang, setNamaBarang] = useState<string>('');
  const [merek, setMerek] = useState<string>('');
  const [warnaDominan, setWarnaDominan] = useState<string>('');

  // Step 2: Deskripsi
  const [deskripsiFisik, setDeskripsiFisik] = useState<string>('');
  const [ciriRahasia, setCiriRahasia] = useState<string>('');

  // Step 3: Foto
  const [urlFoto, setUrlFoto] = useState<string>('');

  // Step 4: Kejadian
  const [idZona, setIdZona] = useState<string>(DAFTAR_ZONA_LAB[0].id);
  const [waktuKejadian, setWaktuKejadian] = useState<string>('');
  const [detailLokasi, setDetailLokasi] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [pesan, setPesan] = useState<string>('');
  const [suksesKirim, setSuksesKirim] = useState<boolean>(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (langkah < 5) {
      setLangkah(langkah + 1);
    }
  };

  const handleBack = () => {
    if (langkah > 1) {
      setLangkah(langkah - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan('');

    const compiledDescription = `Nama Barang: ${namaBarang}
Merek: ${merek || '-'}
Warna Dominan: ${warnaDominan}
Deskripsi Fisik: ${deskripsiFisik}
Ciri Rahasia: ${ciriRahasia || '-'}
Detail Lokasi: ${detailLokasi || '-'}`;

    const dto: DataLaporanBaruDTO = {
      tipe,
      kategori,
      id_zona: idZona,
      deskripsi_publik: compiledDescription,
      waktu_kejadian: waktuKejadian || new Date().toISOString(),
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
        setSuksesKirim(true);
        setPesan(
          tipe === 'penemuan'
            ? 'Laporan penemuan berhasil disimpan! Silakan serahkan barang fisik ke Admin Lab.'
            : 'Laporan kehilangan berhasil dibuat dan sedang diproses oleh AI Matching Engine.'
        );
        if (onSelesai) onSelesai(dto);
      } else {
        setPesan(`Gagal membuat laporan: ${data.error || 'Kesalahan server'}`);
      }
    } catch {
      setPesan('Terjadi kesalahan jaringan saat mengirim laporan.');
    } finally {
      setLoading(false);
    }
  };

  const namaZonaTerpilih = DAFTAR_ZONA_LAB.find((z) => z.id === idZona)?.nama || idZona;

  return (
    <div className="w-full space-y-6">
      
      {/* Stepper Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Langkah {langkah} dari 5: {[
            'Identitas Barang',
            'Deskripsi & Ciri',
            'Foto Barang',
            'Lokasi & Waktu',
            'Konfirmasi Data'
          ][langkah - 1]}</span>
          <span className="text-teal-600 font-semibold">{Math.round((langkah / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(langkah / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {pesan && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-start space-x-3 ${
            suksesKirim 
              ? 'bg-teal-50 text-teal-800 border border-teal-200' 
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            <div>
              <span>{pesan}</span>
              {suksesKirim && (
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="px-4 py-2 bg-teal-700 text-white text-xs font-bold rounded-xl hover:bg-teal-800 transition-all shadow-xs"
                  >
                    Buka Dashboard Saya &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSuksesKirim(false);
                      setLangkah(1);
                      setNamaBarang('');
                      setDeskripsiFisik('');
                      setCiriRahasia('');
                      setPesan('');
                    }}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Buat Laporan Lain
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {!suksesKirim && (
          <form onSubmit={langkah === 5 ? handleSubmit : handleNext} className="space-y-5">
            
            {/* Step 1: Identitas */}
            {langkah === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis Laporan *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTipe('kehilangan')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        tipe === 'kehilangan'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Barang Hilang</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipe('penemuan')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        tipe === 'penemuan'
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span>Barang Ditemukan</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori Barang *</label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  >
                    {KATEGORI_BARANG.map((kat, idx) => (
                      <option key={idx} value={kat}>{kat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama / Jenis Barang *</label>
                  <input
                    type="text"
                    required
                    value={namaBarang}
                    onChange={(e) => setNamaBarang(e.target.value)}
                    placeholder="Contoh: MacBook Pro 14 / Flashdisk SanDisk 32GB"
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Merek (Opsional)</label>
                    <input
                      type="text"
                      value={merek}
                      onChange={(e) => setMerek(e.target.value)}
                      placeholder="Contoh: Apple, Asus, Sandisk"
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Warna Dominan *</label>
                    <input
                      type="text"
                      required
                      value={warnaDominan}
                      onChange={(e) => setWarnaDominan(e.target.value)}
                      placeholder="Contoh: Space Grey, Hitam, Merah"
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Deskripsi */}
            {langkah === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Fisik Publik *</label>
                  <textarea
                    required
                    rows={3}
                    value={deskripsiFisik}
                    onChange={(e) => setDeskripsiFisik(e.target.value)}
                    placeholder="Contoh: Kondisi mulus, layar 14 inci, ada casing pelindung abu-abu..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none resize-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Deskripsi ini dapat dilihat oleh pengguna lain di katalog umum.</p>
                </div>

                <div className="p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-1.5">
                  <label className="block text-xs font-bold text-teal-900 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Ciri Rahasia (Khusus Admin Lab & Verifikasi) *</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={ciriRahasia}
                    onChange={(e) => setCiriRahasia(e.target.value)}
                    placeholder="Contoh: Nomor seri SN-198293, atau ada stiker GitHub kecil di pojok bawah..."
                    className="w-full rounded-xl border border-teal-300 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none resize-none"
                  />
                  <p className="text-[11px] text-teal-800">Ciri ini dirahasiakan dari publik untuk mencegah klaim palsu.</p>
                </div>
              </div>
            )}

            {/* Step 3: Foto */}
            {langkah === 3 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 hover:border-teal-600 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 bg-slate-50/50 cursor-pointer transition-all">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-800">Pilih file foto atau drag & drop</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">Format JPG / PNG hingga 5MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Atau URL Foto (Opsional)</label>
                  <input
                    type="text"
                    value={urlFoto}
                    onChange={(e) => setUrlFoto(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Kejadian */}
            {langkah === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Zona Lokasi *</label>
                  <select
                    value={idZona}
                    onChange={(e) => setIdZona(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  >
                    {DAFTAR_ZONA_LAB.map((z) => (
                      <option key={z.id} value={z.id}>{z.nama} - {z.deskripsi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Waktu Kejadian *</label>
                  <input
                    type="datetime-local"
                    required
                    value={waktuKejadian}
                    onChange={(e) => setWaktuKejadian(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Detail Lokasi Tambahan (Opsional)</label>
                  <input
                    type="text"
                    value={detailLokasi}
                    onChange={(e) => setDetailLokasi(e.target.value)}
                    placeholder="Contoh: Di dekat PC nomor 04 baris depan"
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {langkah === 5 && (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-slate-50/50 text-xs">
                  <div className="p-3 grid grid-cols-3 gap-2">
                    <span className="font-medium text-slate-400">Tipe Laporan</span>
                    <span className="font-semibold text-slate-900 col-span-2 capitalize">{tipe}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-slate-400">Nama Barang</span>
                    <span className="font-semibold text-slate-900 col-span-2">{namaBarang} ({kategori})</span>
                  </div>
                  <div className="p-3 grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-400">Merek & Warna</span>
                    <span className="font-semibold text-slate-700 col-span-2">{merek || '-'} &bull; {warnaDominan}</span>
                  </div>
                  <div className="p-3 grid grid-cols-3 gap-2">
                    <span className="font-bold text-slate-400">Lokasi & Waktu</span>
                    <span className="font-semibold text-slate-700 col-span-2">{namaZonaTerpilih} &bull; {waktuKejadian || 'Waktu saat ini'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {langkah > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                >
                  &larr; Sebelumnya
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
                >
                  Batal
                </Link>
              )}

              {langkah < 5 ? (
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  Lanjut &rarr;
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  {loading ? 'Menyimpan...' : 'Kirim Laporan Resmi'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
