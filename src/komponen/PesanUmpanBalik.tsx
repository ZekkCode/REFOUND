interface PropsPesan {
  tipe?: 'sukses' | 'error' | 'peringatan' | 'info';
  judul?: string;
  pesan: string;
  onTutup?: () => void;
}

export default function PesanUmpanBalik({ tipe = 'info', judul, pesan, onTutup }: PropsPesan) {
  const warnaMap = {
    sukses: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200',
    error: 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200',
    peringatan: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200',
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200',
  };

  return (
    <div className={`p-4 rounded-xl border ${warnaMap[tipe]} flex items-start justify-between gap-4 transition-all shadow-sm`}>
      <div className="space-y-0.5">
        {judul && <h4 className="font-bold text-sm">{judul}</h4>}
        <p className="text-xs font-medium leading-relaxed">{pesan}</p>
      </div>
      {onTutup && (
        <button
          onClick={onTutup}
          className="text-xs font-bold opacity-60 hover:opacity-100 p-1"
        >
          &times;
        </button>
      )}
    </div>
  );
}
