import React from 'react';

interface LocationSelectorProps {
  selectedLocation: string;
  onChange: (loc: string) => void;
  error?: string;
}

export default function LocationSelector({
  selectedLocation,
  onChange,
  error,
}: LocationSelectorProps) {
  const locations = [
    { id: 'lab_tif', name: 'Lab Teknik Informatika' },
    { id: 'lab_si', name: 'Lab Sistem Informasi' },
    { id: 'tu_teknik', name: 'Tata Usaha Teknik' },
    { id: 'perpus_pusat', name: 'Perpustakaan Pusat' },
    { id: 'selasar_lab', name: 'Selasar Gedung Lab' },
  ];

  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
        Pilih Zona / Lokasi Laboratorium
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {locations.map((loc) => {
          const isSelected = selectedLocation === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => onChange(loc.id)}
              className={`p-3 text-left border rounded-xl transition-all flex flex-col justify-between min-h-[75px] cursor-pointer ${
                isSelected
                  ? 'border-[#0D9488] bg-teal-50/50 text-[#0D9488] ring-1 ring-[#0D9488]'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-[11px] font-semibold leading-tight">{loc.name}</span>
              <span className="text-[9px] text-slate-400 mt-1 uppercase font-semibold">
                {isSelected ? 'Terpilih' : 'Pilih'}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-[10px] text-rose-500 font-semibold">{error}</p>}
    </div>
  );
}
