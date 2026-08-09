import NavigasiUtama from '@/komponen/NavigasiUtama';
import FormLaporBaru from '@/komponen/FormLaporBaru';

export default function HalamanLaporKehilangan() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Form Lapor Kehilangan
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Laporkan Barang Kehilangan Anda
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Data laporan kehilangan akan otomatis dicocokkan oleh AI Vector Engine dengan barang temuan yang dititipkan di Admin Lab.
          </p>
        </div>

        <FormLaporBaru tipeAwal="kehilangan" />
      </main>
    </div>
  );
}
