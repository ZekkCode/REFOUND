'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TipeLaporan, DataLaporanBaruDTO } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB, KATEGORI_BARANG } from '@/pustaka/alur-kerja/katalog';
import { supabaseKlien } from '@/pustaka/supabase/klien';

const MAKS_UKURAN_FILE = 5 * 1024 * 1024; // 5MB
const TIPE_FILE_VALID = ['image/jpeg', 'image/png', 'image/webp'];

interface PropsForm {
  tipeAwal?: TipeLaporan;
  onSelesai?: (dto: DataLaporanBaruDTO) => void;
}

export default function FormLaporBaru({ tipeAwal = 'kehilangan', onSelesai }: PropsForm) {
  const router = useRouter();
  const [langkah, setLangkah] = useState<number>(1);
  // tipe is locked from the parent page route — no toggle needed
  const tipe: TipeLaporan = tipeAwal;
  
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
  const [fileFoto, setFileFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string>('');
  const [sedangUpload, setSedangUpload] = useState<boolean>(false);
  const [pesanUpload, setPesanUpload] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputCameraRef = useRef<HTMLInputElement>(null);

  // Step 4: Kejadian
  const [idZona, setIdZona] = useState<string>(DAFTAR_ZONA_LAB[0].id);
  const [waktuKejadian, setWaktuKejadian] = useState<string>('');
  const [detailLokasi, setDetailLokasi] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [pesan, setPesan] = useState<string>('');
  const [suksesKirim, setSuksesKirim] = useState<boolean>(false);

  // ─── Upload helpers ───────────────────────────────────────
  const validasiFile = useCallback((file: File): string | null => {
    if (!TIPE_FILE_VALID.includes(file.type)) {
      return 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP.';
    }
    if (file.size > MAKS_UKURAN_FILE) {
      return `Ukuran file terlalu besar (maks 5 MB). File Anda: ${(file.size / 1024 / 1024).toFixed(1)} MB`;
    }
    return null;
  }, []);

  const prosesFile = useCallback((file: File) => {
    const error = validasiFile(file);
    if (error) {
      setPesanUpload(error);
      return;
    }
    setPesanUpload('');
    setFileFoto(file);
    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewFoto(objectUrl);
    // Clear manual URL since file takes priority
    setUrlFoto('');
  }, [validasiFile]);

  const hapusFoto = useCallback(() => {
    setFileFoto(null);
    if (previewFoto) URL.revokeObjectURL(previewFoto);
    setPreviewFoto('');
    setPesanUpload('');
    if (inputFileRef.current) inputFileRef.current.value = '';
  }, [previewFoto]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) prosesFile(file);
  }, [prosesFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) prosesFile(file);
  }, [prosesFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadKeSupabase = async (file: File): Promise<string | null> => {
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const namaFile = `laporan/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error } = await supabaseKlien.storage
        .from('foto-laporan')
        .upload(namaFile, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      const { data: urlData } = supabaseKlien.storage
        .from('foto-laporan')
        .getPublicUrl(namaFile);

      return urlData?.publicUrl || null;
    } catch (err) {
      console.error('Upload exception:', err);
      return null;
    }
  };

  // ─── Navigation & Submit ─────────────────────────────────
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

    // Upload foto if file is selected
    let fotoUrl = urlFoto;
    if (fileFoto) {
      setSedangUpload(true);
      const uploadedUrl = await uploadKeSupabase(fileFoto);
      setSedangUpload(false);
      if (uploadedUrl) {
        fotoUrl = uploadedUrl;
      } else {
        // Upload failed but don't block submission — just skip photo
        console.warn('Upload foto gagal, melanjutkan tanpa foto.');
      }
    }

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
      url_foto: fotoUrl || undefined,
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
            ? 'Laporan temuan berhasil dibuat. Silakan serahkan barang ke petugas Admin Lab.'
            : 'Laporan kehilangan berhasil dibuat. Sistem akan memberi tahu jika ada barang temuan yang cocok.'
        );
        if (onSelesai) onSelesai(dto);
      } else {
        setPesan(`Gagal membuat laporan: ${data.error || 'Terjadi kesalahan'}`);
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
          <span>{langkah}/5 — {[
            'Identitas',
            'Deskripsi',
            'Foto',
            'Lokasi',
            'Konfirmasi'
          ][langkah - 1]}</span>
          <span className="text-[#12A99A] font-semibold">{Math.round((langkah / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#12A99A] h-full transition-all duration-300 rounded-full"
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
                    className="px-4 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                  >
                    Ke Dashboard
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
                      hapusFoto();
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
            
            {/* Step 1: Identitas — tipe is locked from the route */}
            {langkah === 1 && (
              <div className="space-y-4">
                {/* Read-only type indicator */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis</label>
                  <div className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    tipe === 'kehilangan'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-teal-700 text-white border-teal-700'
                  }`}>
                    {tipe === 'kehilangan' ? (
                      <>
                        <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Barang Hilang</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Barang Ditemukan</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Barang *</label>
                  <input
                    type="text"
                    required
                    value={namaBarang}
                    onChange={(e) => setNamaBarang(e.target.value)}
                    placeholder="MacBook Pro 14, Flashdisk SanDisk 32GB"
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
                      placeholder="Apple, Asus, dll"
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Warna *</label>
                    <input
                      type="text"
                      required
                      value={warnaDominan}
                      onChange={(e) => setWarnaDominan(e.target.value)}
                      placeholder="Hitam, Merah, Silver"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Fisik *</label>
                  <textarea
                    required
                    rows={3}
                    value={deskripsiFisik}
                    onChange={(e) => setDeskripsiFisik(e.target.value)}
                    placeholder="Kondisi mulus, layar 14 inci, ada casing abu-abu..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none resize-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Terlihat oleh pengguna lain.</p>
                </div>

                <div className="p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-1.5">
                  <label className="block text-xs font-bold text-teal-900 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Ciri Rahasia *</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={ciriRahasia}
                    onChange={(e) => setCiriRahasia(e.target.value)}
                    placeholder="No. seri SN-198293, stiker di pojok bawah..."
                    className="w-full rounded-xl border border-teal-300 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none resize-none"
                  />
                  <p className="text-[11px] text-teal-800">Hanya terlihat oleh admin untuk verifikasi.</p>
                </div>
              </div>
            )}

            {/* Step 3: Foto — Real upload with drag & drop + camera */}
            {langkah === 3 && (
              <div className="space-y-4">
                {/* Hidden file input — gallery picker */}
                <input
                  ref={inputFileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {/* Hidden file input — camera capture (mobile) */}
                <input
                  ref={inputCameraRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!fileFoto && !previewFoto ? (
                  <div className="space-y-3">
                    {/* Camera + Gallery buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => inputCameraRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50/60 hover:bg-teal-100/60 hover:border-teal-500 transition-all cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-teal-900">Ambil Foto</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => inputFileRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-400 transition-all cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-full bg-slate-700 flex items-center justify-center text-white shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-slate-800">Dari Galeri</p>
                      </button>
                    </div>

                    {/* Desktop drag & drop zone */}
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => inputFileRef.current?.click()}
                      className={`border border-dashed rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-all text-[11px] ${
                        isDragging
                          ? 'border-teal-500 bg-teal-50/60'
                          : 'border-slate-200 hover:border-slate-400 bg-slate-50/30'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="font-semibold text-slate-400">
                        {isDragging ? 'Lepaskan file di sini...' : 'Atau drag & drop file di sini'}
                      </span>
                    </div>

                    <p className="text-center text-[10px] text-slate-400">JPG, PNG, WebP · Maks 5 MB</p>
                  </div>
                ) : (
                  /* Preview */
                  <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={previewFoto}
                        alt="Preview foto barang"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between bg-white border-t border-slate-100">
                      <div className="flex items-center gap-2 min-w-0">
                        <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs font-semibold text-slate-700 truncate">{fileFoto?.name}</span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          ({fileFoto ? (fileFoto.size / 1024 / 1024).toFixed(1) : '?'} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={hapusFoto}
                        className="px-3 py-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex-shrink-0"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}

                {pesanUpload && (
                  <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    ⚠ {pesanUpload}
                  </p>
                )}

                {/* Divider */}
                {!fileFoto && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">atau</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Atau tempel URL</label>
                      <input
                        type="url"
                        value={urlFoto}
                        onChange={(e) => setUrlFoto(e.target.value)}
                        placeholder="https://contoh.com/foto-barang.jpg"
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Kejadian */}
            {langkah === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Lokasi *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Waktu *</label>
                  <input
                    type="datetime-local"
                    required
                    value={waktuKejadian}
                    onChange={(e) => setWaktuKejadian(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Detail tambahan</label>
                  <input
                    type="text"
                    value={detailLokasi}
                    onChange={(e) => setDetailLokasi(e.target.value)}
                    placeholder="Dekat PC 04 baris depan, meja dosen, dll"
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
                  <div className="p-3 grid grid-cols-3 gap-2">
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
                  {(fileFoto || urlFoto) && (
                    <div className="p-3 grid grid-cols-3 gap-2">
                      <span className="font-bold text-slate-400">Foto</span>
                      <span className="font-semibold text-teal-700 col-span-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {fileFoto ? fileFoto.name : 'URL foto terlampir'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {langkah > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Kembali
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
                  className="px-5 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Lanjut
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || sedangUpload}
                  className="px-5 py-2 bg-[#12A99A] hover:bg-[#12A99A]/90 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {sedangUpload ? 'Mengunggah...' : loading ? 'Mengirim...' : 'Kirim Laporan'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
