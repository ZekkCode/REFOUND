'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanAdminTinjauKlaim() {
  const [alasan, setAlasan] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'sukses' | 'error'; isi: string } | null>(null);

  const mockKlaim = {
    id_klaim: 'CLM-8921-X',
    mahasiswa: 'Ahmad Budiarjo',
    nim: '13519021',
    prodi: 'Teknik Informatika',
    waktuLapor: '12 Okt 2023, 14:30 WIB',
    kategoriHilang: 'Elektronik - Laptop',
    merkhilang: 'Lenovo Thinkpad / Hitam',
    lokasiHilang: 'Lab Komputer Dasar (Lab 1)',
    pertanyaan1: 'Apa ciri khusus barang tersebut?',
    jawaban1: 'Ada stiker \'Himpunan\' di sudut kanan bawah lid laptop, dan tombol spasi agak lecet.',
    pertanyaan2: 'Apa isi wallpaper lockscreen?',
    jawaban2: 'Foto pegunungan Bromo pas sunrise.',
    skorMatch: '92% Match',
    ditemukanOleh: 'Admin Lab (Bpk. Joko)',
    waktuTemu: '12 Okt 2023, 16:00 WIB',
    lokerPenyimpanan: 'Disimpan Admin - Loker A3',
    imageTemu: '/laptop_dark_cafe.png',
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
        setPesan({
          tipe: 'sukses',
          isi: setujui ? 'Klaim disetujui, kode serah terima telah dibuat.' : 'Klaim ditolak.',
        });
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
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Header bar */}
      <header className="sticky top-0 bg-white border-b border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between z-20 shadow-sm shrink-0">
        <div className="flex items-center space-x-3">
          <Link href="/admin" className="flex items-center">
            <Image src="/logo.png" alt="REFOUND Logo" width={110} height={32} className="object-contain h-8 w-auto" />
          </Link>
          <span className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
            Admin View
          </span>
        </div>
        
        <nav className="flex items-center space-x-6 text-sm font-semibold text-zinc-500">
          <Link href="/admin" className="hover:text-[#0B1633] transition-colors">Dashboard</Link>
          <Link href="/admin/klaim" className="text-[#006F69] border-b-2 border-[#006F69] pb-0.5 font-bold transition-colors">Review Klaim</Link>
          <Link href="/barang-temuan" className="hover:text-[#0B1633] transition-colors">Inventory</Link>
          <Link
            href="/admin-login"
            className="px-6 py-2 bg-black hover:bg-zinc-800 text-white font-semibold text-xs rounded-full shadow-sm transition-all"
          >
            Keluar
          </Link>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto py-8 px-6 sm:px-12 space-y-6">
        
        {/* Back link & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Link
              href="/admin"
              className="inline-flex items-center text-xs font-semibold text-zinc-400 hover:text-[#0B1633] transition-colors"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Daftar Klaim
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-[#0B1633]">
              Tinjauan Klaim: {mockKlaim.id_klaim}
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-normal">
              Review kecocokan data laporan kehilangan user dengan data inventaris laboratorium.
            </p>
          </div>

          <div>
            <span className="inline-flex items-center px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse" />
              Menunggu Tinjauan
            </span>
          </div>
        </div>

        {pesan && (
          <PesanUmpanBalik
            tipe={pesan.tipe}
            judul={pesan.tipe === 'sukses' ? 'Tinjauan Diproses' : 'Proses Gagal'}
            pesan={pesan.isi}
          />
        )}

        {/* Side-by-Side grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: User Data */}
          <section className="lg:col-span-6 bg-white rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] overflow-hidden flex flex-col justify-between">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0B1633] flex items-center">
                <svg className="w-5 h-5 mr-2 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Data Pelapor (User)
              </h3>
              <span className="px-2.5 py-0.5 text-[9px] font-semibold uppercase bg-[#0B1633] text-white rounded-full">
                Laporan Kehilangan
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* User row */}
              <div className="p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">
                  AB
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-semibold text-sm text-[#0B1633]">
                    {mockKlaim.mahasiswa}
                  </h4>
                  <p className="text-zinc-500 text-[11px] font-medium">
                    NIM: {mockKlaim.nim} • {mockKlaim.prodi}
                  </p>
                  <p className="text-zinc-400 text-[10px] font-medium pt-0.5">
                    Dilaporkan pada: {mockKlaim.waktuLapor}
                  </p>
                </div>
              </div>

              {/* Items specifications */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Deskripsi Barang Hilang
                </h4>
                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="block text-zinc-400 font-medium mb-0.5">Kategori</span>
                    <span className="text-[#0B1633] font-semibold">{mockKlaim.kategoriHilang}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-400 font-medium mb-0.5">Merk/Warna</span>
                    <span className="text-[#0B1633] font-semibold">{mockKlaim.merkhilang}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-zinc-400 font-medium mb-0.5">Lokasi Kehilangan Terakhir</span>
                    <span className="text-[#0B1633] font-semibold">{mockKlaim.lokasiHilang}</span>
                  </div>
                </div>
              </div>

              {/* Security Questions & Answers */}
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12A99A] block flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Jawaban Verifikasi (User)
                </span>

                <div className="space-y-4">
                  {/* QA Box 1 */}
                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1.5">
                    <span className="block text-[10px] font-bold text-zinc-400">Q: {mockKlaim.pertanyaan1}</span>
                    <span className="block text-xs font-bold text-[#0B1633] leading-relaxed">
                      &quot;{mockKlaim.jawaban1}&quot;
                    </span>
                  </div>
                  {/* QA Box 2 */}
                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1.5">
                    <span className="block text-[10px] font-bold text-zinc-400">Q: {mockKlaim.pertanyaan2}</span>
                    <span className="block text-xs font-bold text-[#0B1633] leading-relaxed">
                      &quot;{mockKlaim.jawaban2}&quot;
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Right Column: Found Item */}
          <section className="lg:col-span-6 bg-white rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] overflow-hidden flex flex-col justify-between">
            <div className="p-6 bg-[#006F69] text-white flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center">
                <svg className="w-5 h-5 mr-2 text-white/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Data Barang Temuan
              </h3>
              <span className="inline-flex items-center px-2.5 py-1 text-[9px] font-semibold text-white bg-black/40 rounded-full">
                <svg className="w-3 h-3 mr-1 fill-current text-[#12A99A]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {mockKlaim.skorMatch}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Product Photo */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Foto Barang dari Finder
                </span>
                <div className="w-full h-44 relative bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-100">
                  <Image
                    src={mockKlaim.imageTemu}
                    alt="Found Item Photo"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Match Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Kategori Cocok
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Zona Sama
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-[#12A99A] bg-[#12A99A]/5 border border-[#12A99A]/20 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Stiker Terdeteksi
                  </span>
                </div>
              </div>

              {/* Status and Info */}
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Info Penemu & Status
                </h4>
                
                <div className="grid grid-cols-2 gap-4 p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl text-xs">
                  <div>
                    <span className="block text-zinc-400 font-semibold mb-0.5">Ditemukan Oleh</span>
                    <span className="text-[#0B1633] font-bold">{mockKlaim.ditemukanOleh}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-400 font-semibold mb-0.5">Waktu Ditemukan</span>
                    <span className="text-[#0B1633] font-bold">{mockKlaim.waktuTemu}</span>
                  </div>
                  <div className="col-span-2 pt-2">
                    <span className="block text-zinc-400 font-semibold mb-1">Status Penyimpanan</span>
                    <span className="inline-flex items-center px-3 py-1.5 font-bold text-[#006F69] bg-teal-50 border border-teal-200 rounded-xl leading-none">
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {mockKlaim.lokerPenyimpanan}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dashed comparison instructions */}
              <div className="p-4 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl text-center text-zinc-400 text-[11px] font-semibold leading-relaxed">
                Silakan bandingkan jawaban verifikasi dengan fisik barang sebelum menyetujui klaim.
              </div>

            </div>
          </section>

        </div>

        {/* Bottom Decision Bar Card */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Catatan Admin / Alasan Keputusan (Wajib)
            </label>
            <input
              type="text"
              required
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              placeholder="Contoh: Bukti stiker cocok dan NIM sesuai..."
              className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-semibold text-[#0B1633] placeholder-zinc-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-all"
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-2">
            <button
              onClick={() => handleEksekusi(false)}
              disabled={loading}
              className="px-6 py-3 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 font-bold text-sm rounded-xl transition-all flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tolak Klaim
            </button>
            <button
              onClick={() => handleEksekusi(true)}
              disabled={loading}
              className="px-6 py-3 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Terima Klaim
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#0B1633] text-white py-12 px-6 sm:px-12 border-t border-white/10 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Image src="/logo.png" alt="REFOUND Logo" width={110} height={32} className="object-contain h-8 w-auto brightness-0 invert" />
            <span className="text-xs text-zinc-400 font-semibold">
              © 2024 REFOUND University Laboratory System. All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-zinc-300">
            <Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link>
            <Link href="#" className="hover:text-white transition-colors">Panduan Komunitas</Link>
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Kontak Admin Lab</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

