import { StatusLaporan, StatusKlaim, TipeLaporan } from '@/pustaka/alur-kerja/tipe';
import { LABEL_STATUS_LAPORAN, LABEL_STATUS_KLAIM } from '@/pustaka/alur-kerja/katalog';

interface PropsLencana {
  tipe?: TipeLaporan;
  statusLaporan?: StatusLaporan;
  statusKlaim?: StatusKlaim;
}

export default function LencanaStatus({ tipe, statusLaporan, statusKlaim }: PropsLencana) {
  if (statusKlaim) {
    const info = LABEL_STATUS_KLAIM[statusKlaim] || { label: statusKlaim, kelasWarna: 'bg-zinc-100 text-zinc-800' };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${info.kelasWarna}`}>
        {info.label}
      </span>
    );
  }

  if (statusLaporan) {
    const info = LABEL_STATUS_LAPORAN[statusLaporan] || { label: statusLaporan, kelasWarna: 'bg-zinc-100 text-zinc-800' };
    return (
      <div className="flex items-center gap-2">
        {tipe && (
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
              tipe === 'kehilangan'
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
            }`}
          >
            {tipe === 'kehilangan' ? 'Kehilangan' : 'Penemuan'}
          </span>
        )}
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${info.kelasWarna}`}>
          {info.label}
        </span>
      </div>
    );
  }

  return null;
}
