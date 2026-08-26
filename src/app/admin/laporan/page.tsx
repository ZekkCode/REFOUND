'use client';

import { useState } from 'react';
import SidebarAdmin from '@/komponen/SidebarAdmin';
import PesanUmpanBalik from '@/komponen/PesanUmpanBalik';

export default function HalamanAdminLaporanCustody() {
  const [reportId, setReportId] = useState('lap-temuan-202');
  const [secretNotes, setSecretNotes] = useState('');
  const [custodyCode, setCustodyCode] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'sukses' | 'error'; isi: string } | null>(null);

  const handleSubmitPenitipan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan(null);

    try {
      const res = await fetch('/api/admin/penitipan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_laporan: reportId,
          catatan_rahasia: secretNotes,
          kode_penitipan: custodyCode,
          pertanyaan_verifikasi: verificationQuestion,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPesan({ tipe: 'sukses', isi: data.pesan });
        setSecretNotes('');
        setCustodyCode('');
        setVerificationQuestion('');
      } else {
        setPesan({ tipe: 'error', isi: data.error });
      }
    } catch {
      setPesan({ tipe: 'error', isi: 'Terjadi kesalahan jaringan.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-[#0B1633] placeholder-slate-300 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none transition-all";

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0">
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
          
          {/* Header */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF765F]">
              Penitipan Barang Fisik
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633]">
              Input Ciri Rahasia & Physical Custody
            </h1>
          </div>

          {pesan && (
            <PesanUmpanBalik
              tipe={pesan.tipe}
              judul={pesan.tipe === 'sukses' ? 'Penitipan Berhasil' : 'Penitipan Gagal'}
              pesan={pesan.isi}
            />
          )}

          <form onSubmit={handleSubmitPenitipan} className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                ID Laporan Barang Temuan
              </label>
              <input
                type="text"
                required
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                className={`${inputClass} font-mono`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Ciri Rahasia Barang (Hanya Admin)
              </label>
              <textarea
                required
                rows={3}
                value={secretNotes}
                onChange={(e) => setSecretNotes(e.target.value)}
                placeholder="Contoh: Ada stiker logo TIF 2024 di pojok kanan bawah & goresan halus dekat lubang port."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Kode Simpan Rak Fisik (Custody Code)
              </label>
              <input
                type="text"
                required
                value={custodyCode}
                onChange={(e) => setCustodyCode(e.target.value)}
                placeholder="Contoh: RAK-A2-05"
                className={`${inputClass} font-mono`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Pertanyaan Verifikasi Klaim Mahasiswa
              </label>
              <input
                type="text"
                value={verificationQuestion}
                onChange={(e) => setVerificationQuestion(e.target.value)}
                placeholder="Contoh: Sebutkan stiker atau goresan unik yang terdapat pada fisik barang."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0B1633] hover:bg-[#12A99A] text-white rounded-xl font-semibold text-xs transition-all disabled:opacity-50 shadow-sm cursor-pointer"
            >
              {loading ? 'Menyimpan...' : 'Validasi & Aktifkan Laporan Temuan'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
