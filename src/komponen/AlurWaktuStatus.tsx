import { StatusLaporan } from '@/pustaka/alur-kerja/tipe';

interface PropsAlurWaktu {
  statusAktif: StatusLaporan;
}

export default function AlurWaktuStatus({ statusAktif }: PropsAlurWaktu) {
  const langkahList: { key: StatusLaporan; label: string; deskripsi: string }[] = [
    { key: 'diajukan', label: '1. Diajukan', deskripsi: 'Laporan diterima sistem' },
    { key: 'menunggu_validasi', label: '2. Verifikasi', deskripsi: 'Pemeriksaan fisik oleh admin' },
    { key: 'aktif', label: '3. Diproses', deskripsi: 'Pencocokan sistem berjalan' },
    { key: 'potensi_cocok', label: '4. Cocok', deskripsi: 'Kandidat ditemukan' },
    { key: 'dikembalikan', label: '5. Selesai', deskripsi: 'Barang diserahkan ke pemilik' },
  ];

  const indexAktif = langkahList.findIndex((l) => l.key === statusAktif);

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Alur Status
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {langkahList.map((l, idx) => {
          const Selesai = idx <= indexAktif;
          const AdalahAktif = idx === indexAktif;

          return (
            <div
              key={l.key}
              className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                AdalahAktif
                  ? 'border-[#12A99A] bg-[#12A99A]/10 text-[#0B1633] font-bold ring-2 ring-[#12A99A]/30'
                  : Selesai
                  ? 'border-teal-200 bg-teal-50/50 text-teal-800'
                  : 'border-slate-200 bg-slate-50/50 text-slate-400'
              }`}
            >
              <span className="block font-bold">{l.label}</span>
              <p className="text-[10px] leading-tight opacity-80">{l.deskripsi}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
