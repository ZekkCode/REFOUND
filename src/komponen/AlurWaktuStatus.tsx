import { StatusLaporan } from '@/pustaka/alur-kerja/tipe';

interface PropsAlurWaktu {
  statusAktif: StatusLaporan;
}

export default function AlurWaktuStatus({ statusAktif }: PropsAlurWaktu) {
  const langkahList: { key: StatusLaporan; label: string; deskripsi: string }[] = [
    { key: 'diajukan', label: '1. Diajukan', deskripsi: 'Laporan telah masuk ke sistem' },
    { key: 'menunggu_validasi', label: '2. Menunggu Admin', deskripsi: 'Pemeriksaan & penitipan barang oleh Admin Lab' },
    { key: 'aktif', label: '3. Aktif Diproses', deskripsi: 'Proses embedding & AI vector search berjalan' },
    { key: 'potensi_cocok', label: '4. Potensi Cocok', deskripsi: 'Kandidat match ditemukan' },
    { key: 'dikembalikan', label: '5. Dikembalikan', deskripsi: 'Barang berhasil diserahkan ke pemilik' },
  ];

  const indexAktif = langkahList.findIndex((l) => l.key === statusAktif);

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Status Timeline Laporan
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
                  ? 'border-[#12A99A] bg-[#12A99A]/10 text-[#0B1633] dark:text-white font-bold ring-2 ring-[#12A99A]/30'
                  : Selesai
                  ? 'border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300'
                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-400'
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
