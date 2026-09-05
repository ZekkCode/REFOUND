import Link from 'next/link';
import LencanaStatus from './LencanaStatus';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';

interface PropsKartuLaporan {
  item: ItemLaporan;
}

export default function KartuLaporan({ item }: PropsKartuLaporan) {
  return (
    <div className="kartu-refound p-5 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <LencanaStatus tipe={item.tipe} statusLaporan={item.status} />
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-[100px]">
            {item.id}
          </span>
        </div>

        <div>
          <span className="text-xs font-semibold text-[#12A99A] uppercase tracking-wider block mb-1">
            {item.kategori}
          </span>
          <p className="text-sm font-medium text-[#0B1633] dark:text-zinc-100 line-clamp-3 leading-relaxed">
            {item.deskripsi_publik}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {item.nama_zona || item.id_zona}
          </span>
          <span>&bull;</span>
          <span>{item.waktu_kejadian}</span>
        </div>

        {item.status === 'potensi_cocok' && item.id_pencocokan_kandidat ? (
          <Link
            href={`/kecocokan/${item.id_pencocokan_kandidat}`}
            className="text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border border-indigo-200/60"
          >
            Lihat Kecocokan
          </Link>
        ) : (
          <Link
            href={`/barang-temuan`}
            className="text-xs font-semibold text-[#12A99A] hover:underline"
          >
            Detail
          </Link>
        )}
      </div>
    </div>
  );
}
