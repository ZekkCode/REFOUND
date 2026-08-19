import { StatusLaporan, StatusKlaim, TipeLaporan } from '@/pustaka/alur-kerja/tipe';
import { LABEL_STATUS_LAPORAN, LABEL_STATUS_KLAIM } from '@/pustaka/alur-kerja/katalog';

interface PropsLencana {
  tipe?: TipeLaporan;
  statusLaporan?: StatusLaporan;
  statusKlaim?: StatusKlaim;
}

export default function LencanaStatus({ tipe, statusLaporan, statusKlaim }: PropsLencana) {
  if (statusKlaim) {
    const info = LABEL_STATUS_KLAIM[statusKlaim] || { 
      label: statusKlaim, 
      kelasWarna: 'bg-gray-100 text-[#4B5563] border border-[#9CA3AF]/40' 
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${info.kelasWarna}`}>
        {info.label}
      </span>
    );
  }

  if (statusLaporan) {
    const info = LABEL_STATUS_LAPORAN[statusLaporan] || { 
      label: statusLaporan, 
      kelasWarna: 'bg-gray-100 text-[#4B5563] border border-[#9CA3AF]/40' 
    };
    return (
      <div className="flex items-center gap-2">
        {tipe && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
              tipe === 'kehilangan'
                ? 'bg-rose-50 text-[#FF765F] border border-[#FF765F]/30'
                : 'bg-teal-50 text-[#12A99A] border border-[#12A99A]/30'
            }`}
          >
            {tipe === 'kehilangan' ? 'Kehilangan' : 'Penemuan'}
          </span>
        )}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${info.kelasWarna}`}>
          {info.label}
        </span>
      </div>
    );
  }

  return null;
}
