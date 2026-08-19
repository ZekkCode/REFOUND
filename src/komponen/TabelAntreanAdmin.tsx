import LencanaStatus from './LencanaStatus';
import { ItemLaporan, StatusLaporan } from '@/pustaka/alur-kerja/tipe';

interface PropsTabel {
  daftarLaporan: ItemLaporan[];
  onPilihLaporan?: (item: ItemLaporan) => void;
}

export default function TabelAntreanAdmin({ daftarLaporan, onPilihLaporan }: PropsTabel) {
  if (daftarLaporan.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
        Tidak ada antrean laporan saat ini.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-xs font-semibold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="p-4">ID Laporan</th>
              <th className="p-4">Tipe</th>
              <th className="p-4">Kategori & Deskripsi</th>
              <th className="p-4">Zona</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {daftarLaporan.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {item.id}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      item.tipe === 'kehilangan'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                    }`}
                  >
                    {item.tipe}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-xs block text-[#0B1633] dark:text-white">
                    {item.kategori}
                  </span>
                  <p className="text-xs text-zinc-500 truncate max-w-xs">{item.deskripsi_publik}</p>
                </td>
                <td className="p-4 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {item.nama_zona || item.id_zona}
                </td>
                <td className="p-4">
                  <LencanaStatus statusLaporan={item.status as StatusLaporan} />
                </td>
                <td className="p-4 text-right">
                  {onPilihLaporan && (
                    <button
                      onClick={() => onPilihLaporan(item)}
                      className="px-3 py-1.5 bg-[#0B1633] hover:bg-[#152754] text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      Kelola Custody &rarr;
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
