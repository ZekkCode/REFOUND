'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidebarAdmin from '@/komponen/SidebarAdmin';
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
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <main className="flex-1 max-w-5xl w-full mx-auto py-8 px-4 sm:px-8 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <Link
                href="/admin"
                className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-[#12A99A] transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Ringkasan
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-[#0B1633]">
                Tinjauan Klaim: {mockKlaim.id_klaim}
              </h1>
            </div>
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse" />
              Menunggu Tinjauan
            </span>
          </div>

          {pesan && (
            <PesanUmpanBalik
              tipe={pesan.tipe}
              judul={pesan.tipe === 'sukses' ? 'Tinjauan Diproses' : 'Proses Gagal'}
              pesan={pesan.isi}
            />
          )}

          {/* Side-by-Side grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: User Data */}
            <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0B1633] flex items-center">
                  <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Data Pelapor
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-[#0B1633] text-white rounded-full">
                  Kehilangan
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* User row */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">
                    AB
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-sm text-[#0B1633]">{mockKlaim.mahasiswa}</h4>
                    <p className="text-slate-500 text-[10px] font-medium">
                      NIM: {mockKlaim.nim} • {mockKlaim.prodi}
                    </p>
                    <p className="text-slate-400 text-[10px] font-medium">
                      Dilaporkan: {mockKlaim.waktuLapor}
                    </p>
                  </div>
                </div>

                {/* Item specs */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Deskripsi Barang Hilang</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-slate-400 font-medium mb-0.5">Kategori</span>
                      <span className="text-[#0B1633] font-semibold">{mockKlaim.kategoriHilang}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-medium mb-0.5">Merk/Warna</span>
                      <span className="text-[#0B1633] font-semibold">{mockKlaim.merkhilang}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-slate-400 font-medium mb-0.5">Lokasi Terakhir</span>
                      <span className="text-[#0B1633] font-semibold">{mockKlaim.lokasiHilang}</span>
                    </div>
                  </div>
                </div>

                {/* Security Q&A */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12A99A] flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Jawaban Verifikasi
                  </span>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <span className="block text-[10px] font-medium text-slate-400">Q: {mockKlaim.pertanyaan1}</span>
                      <span className="block text-xs font-semibold text-[#0B1633] leading-relaxed">
                        &quot;{mockKlaim.jawaban1}&quot;
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <span className="block text-[10px] font-medium text-slate-400">Q: {mockKlaim.pertanyaan2}</span>
                      <span className="block text-xs font-semibold text-[#0B1633] leading-relaxed">
                        &quot;{mockKlaim.jawaban2}&quot;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Found Item */}
            <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 bg-[#0B1633] text-white flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center">
                  <svg className="w-4 h-4 mr-2 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Data Barang Temuan
                </h3>
                <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold text-white bg-white/20 rounded-full">
                  ⭐ {mockKlaim.skorMatch}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Photo */}
                <div className="w-full h-40 relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
                  <Image src={mockKlaim.imageTemu} alt="Found Item" fill className="object-cover" />
                </div>

                {/* Match Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Kategori Cocok', 'Zona Sama', 'Stiker Terdeteksi'].map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full">
                      <svg className="w-3 h-3 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Finder Info */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Info Penemu</h4>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
                    <div>
                      <span className="block text-slate-400 font-medium mb-0.5">Ditemukan Oleh</span>
                      <span className="text-[#0B1633] font-semibold">{mockKlaim.ditemukanOleh}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-medium mb-0.5">Waktu Ditemukan</span>
                      <span className="text-[#0B1633] font-semibold">{mockKlaim.waktuTemu}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-slate-400 font-medium mb-0.5">Status Penyimpanan</span>
                      <span className="inline-flex items-center px-2.5 py-1 font-semibold text-[#12A99A] bg-teal-50 border border-teal-200 rounded-xl text-xs">
                        📦 {mockKlaim.lokerPenyimpanan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Decision Bar */}
          <section className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Catatan Admin / Alasan Keputusan (Wajib)
              </label>
              <input
                type="text"
                required
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                placeholder="Contoh: Bukti stiker cocok dan NIM sesuai..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-[#0B1633] placeholder-slate-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-1">
              <button
                onClick={() => handleEksekusi(false)}
                disabled={loading}
                className="px-5 py-2.5 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 font-semibold text-xs rounded-xl transition-all flex items-center cursor-pointer"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tolak Klaim
              </button>
              <button
                onClick={() => handleEksekusi(true)}
                disabled={loading}
                className="px-5 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center cursor-pointer"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Terima Klaim
              </button>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
