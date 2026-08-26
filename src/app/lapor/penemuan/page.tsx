import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import FormLaporBaru from '@/komponen/FormLaporBaru';

export default function HalamanLaporPenemuan() {
  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-8">
        <TopbarMahasiswa judulHalaman="Lapor Temuan" />

        <main className="flex-1 max-w-3xl w-full mx-auto px-6 sm:px-10 py-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12A99A]">
              Temuan Barang
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1633]">
              Lapor Barang Ditemukan
            </h1>
          </div>

          <FormLaporBaru tipeAwal="penemuan" />
        </main>
      </div>
    </div>
  );
}
