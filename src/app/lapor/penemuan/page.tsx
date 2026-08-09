import NavigasiUtama from '@/komponen/NavigasiUtama';
import FormLaporBaru from '@/komponen/FormLaporBaru';

export default function HalamanLaporPenemuan() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12A99A]">
            Form Lapor Penemuan
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Laporkan Barang Temuan Anda
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Terima kasih telah menemukan barang! Setelah mengisi form ini, mohon serahkan fisik barang ke Ruang Admin Lab untuk diproses & dititipkan.
          </p>
        </div>

        <FormLaporBaru tipeAwal="penemuan" />
      </main>
    </div>
  );
}
