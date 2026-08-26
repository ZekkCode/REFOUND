'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarAdmin from '@/komponen/SidebarAdmin';
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
        body: JSON.stringify({ id_klaim: claimId, kode_pengambilan: otpCode.replace(' ', '') }),
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

  const checkboxClass = "w-5 h-5 rounded border-slate-300 text-[#12A99A] focus:ring-[#12A99A] mt-0.5 shrink-0 cursor-pointer";

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <main className="flex-1 max-w-3xl w-full mx-auto py-8 px-4 sm:px-8 space-y-6">
          
          {/* Header */}
          <div>
            <Link href="/admin" className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-[#12A99A] transition-colors mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Ringkasan
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633]">
              Serah Terima Barang
            </h1>
            <p className="text-slate-500 text-sm font-normal mt-1">
              Pastikan identitas penerima sesuai sebelum menyerahkan barang.
            </p>
          </div>

          {pesan && (
            <>
              <PesanUmpanBalik
                tipe={pesan.tipe}
                judul={pesan.tipe === 'sukses' ? 'Penyerahan Sukses' : 'Penyerahan Gagal'}
                pesan={pesan.isi}
              />
              <div className="flex justify-center">
                <Link
                  href="/admin"
                  className="px-6 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                >
                  Kembali ke Dashboard Admin
                </Link>
              </div>
            </>
          )}

          {!pesan && (
            <form onSubmit={handleEksekusiPenyerahan} className="space-y-6">
              
              {/* OTP Code Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col items-center justify-center space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Kode OTP Serah Terima
                </span>
                <span className="text-4xl font-bold text-[#12A99A] tracking-wider font-mono">
                  {otpCode}
                </span>
                <p className="text-slate-400 text-[10px] font-medium">
                  Tunjukkan kode ini kepada petugas lab.
                </p>
              </div>

              {/* Verification Checklist */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#0B1633]">
                  Verifikasi Identitas
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3.5 p-1">
                    <input type="checkbox" id="verif-ktm" checked={ktmCocok} onChange={(e) => setKtmCocok(e.target.checked)} className={checkboxClass} />
                    <label htmlFor="verif-ktm" className="flex flex-col cursor-pointer select-none">
                      <span className="text-sm font-semibold text-[#0B1633]">KTM / Kartu Identitas Fisik Cocok</span>
                      <span className="text-slate-400 text-xs font-normal mt-0.5">Nama dan foto sesuai dengan pengambil.</span>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3.5 p-1">
                    <input type="checkbox" id="verif-desc" checked={deskripsiSesuai} onChange={(e) => setDeskripsiSesuai(e.target.checked)} className={checkboxClass} />
                    <label htmlFor="verif-desc" className="flex flex-col cursor-pointer select-none">
                      <span className="text-sm font-semibold text-[#0B1633]">Deskripsi Barang Sesuai</span>
                      <span className="text-slate-400 text-xs font-normal mt-0.5">Penerima dapat menyebutkan detail spesifik barang.</span>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3.5 p-1">
                    <input type="checkbox" id="verif-sign" checked={tandaTanganDisetujui} onChange={(e) => setTandaTanganDisetujui(e.target.checked)} className={checkboxClass} />
                    <label htmlFor="verif-sign" className="flex flex-col cursor-pointer select-none">
                      <span className="text-sm font-semibold text-[#0B1633]">Tanda Tangan Digital / Persetujuan</span>
                      <span className="text-slate-400 text-xs font-normal mt-0.5">Penerima telah mengonfirmasi penerimaan di sistem.</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="px-8 py-3 bg-[#0B1633] hover:bg-[#12A99A] disabled:opacity-40 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex-1 text-center cursor-pointer"
                >
                  {loading ? 'Memproses...' : 'Barang Diserahkan'}
                </button>
                <Link
                  href="/admin"
                  className="px-8 py-3 border border-red-200 text-red-500 hover:bg-red-50 font-semibold text-sm rounded-xl transition-all text-center"
                >
                  Batalkan
                </Link>
              </div>

            </form>
          )}

        </main>
      </div>
    </div>
  );
}
