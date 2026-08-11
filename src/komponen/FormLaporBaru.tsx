'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TipeLaporan, DataLaporanBaruDTO } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB, KATEGORI_BARANG } from '@/pustaka/alur-kerja/katalog';

interface PropsForm {
  tipeAwal?: TipeLaporan;
  onSelesai?: (dto: DataLaporanBaruDTO) => void;
}

export default function FormLaporBaru({ tipeAwal = 'kehilangan', onSelesai }: PropsForm) {
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

    // Compile public description
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
        setSuksesKirim(true);
        setPesan(bodyTipeSuccessMessage(tipe));
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

  const bodyTipeSuccessMessage = (t: TipeLaporan) => {
    return t === 'penemuan'
      ? 'Laporan penemuan berhasil disimpan! Silakan serahkan barang fisik ke Admin Lab.'
      : 'Laporan kehilangan berhasil dibuat dan sedang diproses oleh AI Matching Engine.';
  };

  // Find zone name for review screen
  const namaZonaTerpilih = DAFTAR_ZONA_LAB.find((z) => z.id === idZona)?.nama || idZona;

  return (
    <div className="fixed inset-0 bg-[#F9FAFC] z-50 overflow-y-auto flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 bg-white border-b border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between z-20 shadow-sm shrink-0">
        <div className="flex items-center">
          <Link href="/dashboard" className="font-black text-2xl tracking-tight text-[#0B1633] hover:text-[#12A99A] transition-colors">
            REFOUND
          </Link>
        </div>
        <div className="flex items-center space-x-2 text-zinc-400 text-xs font-semibold">
          <svg className="w-4 h-4 text-zinc-400 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13h-8zM9 8a1 1 0 012 0v2h2a1 1 0 110 2H9a1 1 0 01-1-1V8z" clipRule="evenodd" />
          </svg>
          <span>Tersimpan otomatis</span>
        </div>
        <div>
          <Link href="/dashboard" className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Stepper Indicators */}
      <div className="max-w-3xl w-full mx-auto px-6 pt-10 shrink-0">
        <div className="relative flex items-center justify-between w-full">
          {/* Stepper Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#12A99A] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((langkah - 1) / 4) * 100}%` }}
          />

          {/* Steps */}
          {[
            { nr: 1, name: 'Identitas' },
            { nr: 2, name: 'Deskripsi' },
            { nr: 3, name: 'Foto' },
            { nr: 4, name: 'Kejadian' },
            { nr: 5, name: 'Review' },
          ].map((s) => (
            <div key={s.nr} className="relative z-10 flex flex-col items-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all duration-300 ${
                  langkah === s.nr
                    ? 'bg-white border-2 border-[#12A99A] text-[#12A99A]'
                    : langkah > s.nr
                    ? 'bg-[#12A99A] text-white'
                    : 'bg-white border-2 border-zinc-200 text-zinc-400'
                }`}
              >
                {langkah > s.nr ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.nr
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  langkah === s.nr ? 'text-[#0B1633] font-bold' : 'text-zinc-400'
                }`}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="flex-1 flex items-start justify-center p-6 md:p-8">
        <div className="max-w-3xl w-full bg-white p-8 sm:p-10 rounded-3xl border border-zinc-100 shadow-[0_10px_40px_rgba(11,22,51,0.02)] space-y-6 mb-24">
          
          {/* Header Message */}
          {pesan && (
            <div className={`p-4 rounded-2xl text-sm font-bold flex items-start space-x-3 ${
              suksesKirim 
                ? 'bg-teal-50 text-[#12A99A] border border-teal-100' 
                : 'bg-rose-50 text-rose-600 border border-rose-100'
            }`}>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {suksesKirim ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
              <div>
                <span>{pesan}</span>
                {suksesKirim && (
                  <div className="mt-3">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center px-4 py-2 bg-[#12A99A] text-white text-xs font-bold rounded-xl hover:bg-[#12A99A]/95 transition-all shadow-sm"
                    >
                      Kembali ke Dashboard &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {!suksesKirim && (
            <form onSubmit={langkah === 5 ? handleSubmit : handleNext} className="space-y-6">
              {/* Step 1: Identitas */}
              {langkah === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[#0B1633]">Identitas Barang</h2>
                    <p className="text-xs text-zinc-400 font-medium">Lengkapi kategori, nama, merek, dan warna dominan barang temuan atau kehilangan.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Kategori Barang *</label>
                      <select
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                      >
                        {KATEGORI_BARANG.map((kat, idx) => (
                          <option key={idx} value={kat}>
                            {kat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Nama Barang *</label>
                      <input
                        type="text"
                        required
                        value={namaBarang}
                        onChange={(e) => setNamaBarang(e.target.value)}
                        placeholder="Contoh: Laptop Asus ROG / Dompet Kulit"
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Merek (Opsional)</label>
                        <input
                          type="text"
                          value={merek}
                          onChange={(e) => setMerek(e.target.value)}
                          placeholder="Contoh: Asus, Nike"
                          className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Warna Dominan</label>
                        <input
                          type="text"
                          required
                          value={warnaDominan}
                          onChange={(e) => setWarnaDominan(e.target.value)}
                          placeholder="Contoh: Hitam, Merah"
                          className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Deskripsi */}
              {langkah === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[#0B1633]">Deskripsi</h2>
                    <p className="text-xs text-zinc-400 font-medium">Jelaskan detail fisik barang secara rinci dan sertakan ciri rahasia sebagai validasi kepemilikan.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Deskripsi Fisik *</label>
                      <textarea
                        required
                        rows={4}
                        value={deskripsiFisik}
                        onChange={(e) => setDeskripsiFisik(e.target.value)}
                        placeholder="Contoh: Ada goresan di pojok kanan bawah, stiker Apple di belakang laptop..."
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Ciri Rahasia (Hanya dibaca Admin) *</label>
                      <textarea
                        required
                        rows={4}
                        value={ciriRahasia}
                        onChange={(e) => setCiriRahasia(e.target.value)}
                        placeholder="Contoh: Serial number laptop SN1839201, atau ada foto K-Pop di slip dalam dompet..."
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Foto */}
              {langkah === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[#0B1633]">Foto</h2>
                    <p className="text-xs text-zinc-400 font-medium">Unggah bukti foto dari barang tersebut untuk mempermudah proses identifikasi visual.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Drag and Drop mockup */}
                    <div className="border-2 border-dashed border-zinc-200 hover:border-[#12A99A] rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 bg-zinc-50/50 hover:bg-teal-50/5 cursor-pointer transition-all">
                      <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#0B1633]">Tarik & taruh foto barang di sini, atau pilih file</p>
                        <p className="text-zinc-400 text-xs mt-1">Mendukung PNG, JPG (maks. 5MB)</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Atau masukkan URL Foto:</label>
                      <input
                        type="text"
                        value={urlFoto}
                        onChange={(e) => setUrlFoto(e.target.value)}
                        placeholder="https://... (URL foto opsional)"
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Kejadian */}
              {langkah === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[#0B1633]">Kejadian</h2>
                    <p className="text-xs text-zinc-400 font-medium">Tentukan estimasi lokasi zona dan waktu kejadian barang hilang atau ditemukan.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Zona Lokasi Kejadian *</label>
                      <select
                        value={idZona}
                        onChange={(e) => setIdZona(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                      >
                        {DAFTAR_ZONA_LAB.map((z) => (
                          <option key={z.id} value={z.id}>
                            {z.nama} - {z.deskripsi}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Waktu Kejadian *</label>
                      <input
                        type="datetime-local"
                        required
                        value={waktuKejainer(waktuKejadian)}
                        onChange={(e) => setWaktuKejadian(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0B1633] mb-1.5">Detail Lokasi Tambahan (Opsional)</label>
                      <textarea
                        rows={3}
                        value={detailLokasi}
                        onChange={(e) => setDetailLokasi(e.target.value)}
                        placeholder="Contoh: Tertinggal di atas meja barisan tengah dekat pintu keluar..."
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3.5 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {langkah === 5 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[#0B1633]">Review</h2>
                    <p className="text-xs text-zinc-400 font-medium">Periksa kembali data laporan Anda sebelum mengirimkannya ke sistem.</p>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl overflow-hidden divide-y divide-zinc-50 bg-zinc-50/20">
                    <div className="p-4 grid grid-cols-3 gap-4">
                      <span className="text-xs font-bold text-zinc-400">Jenis Laporan</span>
                      <span className="text-xs font-extrabold text-[#0B1633] col-span-2 capitalize">{tipe}</span>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4">
                      <span className="text-xs font-bold text-zinc-400">Kategori & Nama</span>
                      <span className="text-xs font-semibold text-[#0B1633] col-span-2">{kategori} &bull; <strong className="font-extrabold">{namaBarang}</strong></span>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4">
                      <span className="text-xs font-bold text-zinc-400">Merek & Warna</span>
                      <span className="text-xs font-semibold text-[#0B1633] col-span-2">{merek || '-'} &bull; {warnaDominan}</span>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4">
                      <span className="text-xs font-bold text-zinc-400">Deskripsi Fisik</span>
                      <span className="text-xs font-semibold text-[#0B1633] col-span-2 leading-relaxed whitespace-pre-line">{deskripsiFisik}</span>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4">
                      <span className="text-xs font-bold text-zinc-400">Ciri Rahasia</span>
                      <span className="text-xs font-semibold text-zinc-500 col-span-2 leading-relaxed whitespace-pre-line">{ciriRahasia}</span>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4">
                      <span className="text-xs font-bold text-zinc-400">Zona & Waktu</span>
                      <span className="text-xs font-semibold text-[#0B1633] col-span-2">{namaZonaTerpilih} &bull; {waktuKejadian.replace('T', ' ')}</span>
                    </div>
                    {detailLokasi && (
                      <div className="p-4 grid grid-cols-3 gap-4">
                        <span className="text-xs font-bold text-zinc-400">Detail Lokasi</span>
                        <span className="text-xs font-semibold text-[#0B1633] col-span-2">{detailLokasi}</span>
                      </div>
                    )}
                    {urlFoto && (
                      <div className="p-4 grid grid-cols-3 gap-4">
                        <span className="text-xs font-bold text-zinc-400">Link Foto</span>
                        <span className="text-xs font-semibold text-[#12A99A] col-span-2 truncate">{urlFoto}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sticky bottom footer inside the form so that button submit works */}
              <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between z-20 shadow-[0_-4px_20px_rgba(11,22,51,0.02)] shrink-0">
                <div>
                  {langkah > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2.5 bg-white border border-[#12A99A] text-[#12A99A] hover:bg-teal-50/20 font-bold rounded-lg transition-colors"
                    >
                      Kembali
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
                <div>
                  {langkah < 5 ? (
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-bold rounded-lg transition-colors"
                    >
                      Lanjut
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] disabled:opacity-50 text-white font-bold rounded-lg transition-colors"
                    >
                      {loading ? 'Mengirim...' : 'Kirim Laporan'}
                    </button>
                  )}
                </div>
              </footer>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Small helper to safely format value for datetime-local
function waktuKejainer(str: string): string {
  return str;
}

