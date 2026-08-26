'use client';

import { useState } from 'react';
import SidebarAdmin from '@/komponen/SidebarAdmin';

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

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-[#0B1633] placeholder-slate-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-all";

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <main className="flex-1 max-w-5xl w-full mx-auto py-8 px-4 sm:px-8 space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633]">
              Penitipan & Penyerahan Barang
            </h1>
            <p className="text-slate-500 text-sm font-normal mt-1">
              Validasi barang temuan dan serahkan ke pemilik sah.
            </p>
          </div>

          {pesan && (
            <div className={`p-4 rounded-2xl text-xs font-semibold ${
              pesan.startsWith('Error') 
                ? 'bg-red-50 border border-red-200 text-red-600' 
                : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
            }`}>
              {pesan}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Form 1: Validasi Penitipan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
              <div>
                <h2 className="text-sm font-bold text-[#0B1633]">1. Validasi Penitipan</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Catat ciri rahasia barang yang tidak dipublikasikan.
                </p>
              </div>

              <form onSubmit={handleValidasiPenitipan} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Pilih Laporan Barang</label>
                  <select
                    required
                    value={idLaporan}
                    onChange={(e) => setIdLaporan(e.target.value)}
                    className={inputClass}
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
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Ciri Rahasia Barang</label>
                  <textarea
                    required
                    rows={3}
                    value={catatanRahasia}
                    onChange={(e) => setCatatanRahasia(e.target.value)}
                    placeholder="Contoh: Stiker logo macbook dipojok kanan bawah"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Kode Penitipan Fisik</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: RAK-A2-05"
                    value={kodePenitipan}
                    onChange={(e) => setKodePenitipan(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Pertanyaan Verifikasi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Sebutkan stiker dibagian belakang laptop"
                    value={pertanyaanVerifikasi}
                    onChange={(e) => setPertanyaanVerifikasi(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0B1633] hover:bg-[#12A99A] text-white rounded-xl font-semibold text-xs transition-all disabled:opacity-50 shadow-sm cursor-pointer"
                >
                  Simpan & Aktifkan Laporan
                </button>
              </form>
            </div>

            {/* Form 2: Penyerahan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
              <div>
                <h2 className="text-sm font-bold text-[#0B1633]">2. Konfirmasi Penyerahan</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Cocokkan kode pengambilan mahasiswa.
                </p>
              </div>

              <form onSubmit={handlePenyerahan} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">ID Klaim Mahasiswa</label>
                  <input
                    type="text"
                    required
                    placeholder="ID Klaim"
                    value={idKlaim}
                    onChange={(e) => setIdKlaim(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Kode Pengambilan Sekali Pakai</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: AMBIL-9921"
                    value={kodePengambilan}
                    onChange={(e) => setKodePengambilan(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0B1633] hover:bg-[#12A99A] text-white rounded-xl font-semibold text-xs transition-all disabled:opacity-50 shadow-sm cursor-pointer"
                >
                  Verifikasi & Serahkan Barang
                </button>
              </form>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
