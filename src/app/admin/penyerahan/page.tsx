'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanAdminPenyerahan() {
  const [claimId] = useState('CLM-8921-X');
  const [otpCode] = useState('742 091');
  const [ktmCocok, setKtmCocok] = useState(false);
  const [deskripsiSesuai, setDeskripsiSesuai] = useState(false);
  const [tandaTanganDisetujui, setTandaTanganDisetujui] = useState(false);

  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'sukses' | 'error'; isi: string } | null>(null);

  const handleEksekusiPenyerahan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ktmCocok || !deskripsiSesuai || !tandaTanganDisetujui) {
      alert('Mohon lengkapi semua verifikasi identitas terlebih dahulu.');
      return;
    }

    setLoading(true);
    setPesan(null);

    try {
      const res = await fetch('/api/admin/penyerahan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_klaim: claimId,
          kode_pengambilan: otpCode.replace(' ', ''),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPesan({
          tipe: 'sukses',
          isi: 'Barang berhasil diserahkan. Kasus klaim resmi ditutup dan diarsipkan.',
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

  const isFormValid = ktmCocok && deskripsiSesuai && tandaTanganDisetujui;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Header bar */}
      <header className="sticky top-0 bg-white border-b border-zinc-100 py-4 px-6 md:px-12 flex items-center justify-between z-20 shadow-sm shrink-0">
        <div>
          <Link href="/admin" className="flex items-center">
            <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain h-10 w-auto" />
          </Link>
        </div>
        <div>
          <Link
            href="/login"
            className="text-zinc-500 hover:text-[#0B1633] font-extrabold text-sm transition-all"
          >
            Masuk
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-start justify-center p-6 md:p-8">
        <div className="max-w-3xl w-full bg-white p-8 sm:p-10 rounded-3xl border border-zinc-150 shadow-[0_10px_40px_rgba(11,22,51,0.02)] space-y-6 mb-24">
          
          {/* Header text */}
          <div className="space-y-2 border-b border-zinc-100 pb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1633]">
              Serah Terima Barang
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed">
              Pastikan identitas penerima sesuai sebelum menyerahkan barang.
            </p>
          </div>

          {pesan && (
            <div className="pt-2">
              <PesanUmpanBalik
                tipe={pesan.tipe}
                judul={pesan.tipe === 'sukses' ? 'Penyerahan Sukses' : 'Penyerahan Gagal'}
                pesan={pesan.isi}
              />
              <div className="mt-4 flex justify-center">
                <Link
                  href="/admin"
                  className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                >
                  Kembali ke Dashboard Admin
                </Link>
              </div>
            </div>
          )}

          {!pesan && (
            <form onSubmit={handleEksekusiPenyerahan} className="space-y-6">
              
              {/* Code OTP and QR Code Box */}
              <div className="p-6 bg-[#F4F6F9] border border-zinc-200 rounded-2xl flex flex-col items-center justify-center space-y-4">
                <div className="text-center space-y-1">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    KODE OTP SERAH TERIMA
                  </span>
                  <span className="block text-4xl font-black text-[#006F69] tracking-wider font-mono">
                    {otpCode}
                  </span>
                </div>

                {/* Simulated QR Code Sign frame */}
                <div className="w-48 h-32 relative bg-white border border-zinc-200 rounded-xl shadow-sm flex items-center justify-center p-3 overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center space-x-2">
                    {/* Simulated Desk Background */}
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-zinc-800 to-zinc-200" />
                    
                    {/* Visual QR sign frame */}
                    <div className="w-16 h-20 bg-white border border-zinc-300 rounded shadow-md flex flex-col items-center justify-center p-1.5 z-10 shrink-0">
                      {/* Brand title */}
                      <span className="text-[4px] font-black leading-none text-[#0B1633] mb-1">REFOUND OTP</span>
                      
                      {/* Mock QR SVG */}
                      <svg className="w-8 h-8 text-[#0B1633]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-4 2h2v2h-2v-2zm6-6h2v2h-2V9zm-2 2h2v2h-2v-2zm-2-2h2v2h-2V9zm-2 2h2v2h-2v-2z" />
                      </svg>
                      
                      <span className="text-[3px] text-zinc-400 font-bold mt-1">SCAN UNTUK VERIFIKASI</span>
                    </div>

                    {/* Simulated details laptop background in micro size */}
                    <div className="flex-1 flex flex-col justify-center space-y-1">
                      <div className="w-full h-2.5 bg-zinc-200 rounded-sm" />
                      <div className="w-3/4 h-1.5 bg-zinc-150 rounded-sm" />
                      <div className="w-1/2 h-1.5 bg-zinc-150 rounded-sm" />
                    </div>
                  </div>
                </div>

                <p className="text-zinc-400 text-[10px] font-bold">
                  Tunjukkan kode ini kepada petugas lab.
                </p>
              </div>

              {/* Verification Checklist */}
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-black text-[#0B1633]">
                  Verifikasi Identitas
                </h3>

                <div className="space-y-4">
                  {/* Checkbox 1 */}
                  <div className="flex items-start space-x-3.5 p-1">
                    <input
                      type="checkbox"
                      id="verif-ktm"
                      checked={ktmCocok}
                      onChange={(e) => setKtmCocok(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-300 text-[#006F69] focus:ring-[#006F69] mt-0.5 shrink-0 cursor-pointer"
                    />
                    <label htmlFor="verif-ktm" className="flex flex-col cursor-pointer select-none">
                      <span className="text-sm font-extrabold text-[#0B1633]">
                        KTM / Kartu Identitas Fisik Cocok
                      </span>
                      <span className="text-zinc-400 text-xs font-semibold mt-0.5 leading-relaxed">
                        Nama dan foto pada kartu identitas sesuai dengan pengambil.
                      </span>
                    </label>
                  </div>

                  {/* Checkbox 2 */}
                  <div className="flex items-start space-x-3.5 p-1">
                    <input
                      type="checkbox"
                      id="verif-desc"
                      checked={deskripsiSesuai}
                      onChange={(e) => setDeskripsiSesuai(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-300 text-[#006F69] focus:ring-[#006F69] mt-0.5 shrink-0 cursor-pointer"
                    />
                    <label htmlFor="verif-desc" className="flex flex-col cursor-pointer select-none">
                      <span className="text-sm font-extrabold text-[#0B1633]">
                        Deskripsi Barang Sesuai
                      </span>
                      <span className="text-zinc-400 text-xs font-semibold mt-0.5 leading-relaxed">
                        Penerima dapat menyebutkan detail spesifik barang (warna, merk, isi dompet).
                      </span>
                    </label>
                  </div>

                  {/* Checkbox 3 */}
                  <div className="flex items-start space-x-3.5 p-1">
                    <input
                      type="checkbox"
                      id="verif-sign"
                      checked={tandaTanganDisetujui}
                      onChange={(e) => setTandaTanganDisetujui(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-300 text-[#006F69] focus:ring-[#006F69] mt-0.5 shrink-0 cursor-pointer"
                    />
                    <label htmlFor="verif-sign" className="flex flex-col cursor-pointer select-none">
                      <span className="text-sm font-extrabold text-[#0B1633]">
                        Tanda Tangan Digital / Persetujuan Log
                      </span>
                      <span className="text-zinc-400 text-xs font-semibold mt-0.5 leading-relaxed">
                        Penerima telah mengonfirmasi penerimaan di sistem.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="px-8 py-3 bg-black hover:bg-zinc-800 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-all shadow-md flex-1 text-center"
                >
                  {loading ? 'Memproses...' : 'Barang Diserahkan'}
                </button>
                <Link
                  href="/admin"
                  className="px-8 py-3 border border-red-200 text-red-500 hover:bg-red-50/50 font-bold text-sm rounded-xl transition-all text-center"
                >
                  Batalkan
                </Link>
              </div>

            </form>
          )}

        </div>
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

