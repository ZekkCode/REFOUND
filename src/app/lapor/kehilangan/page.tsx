import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import FormLaporBaru from '@/komponen/FormLaporBaru';

export default function HalamanLaporKehilangan() {
  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-8">
        <TopbarMahasiswa judulHalaman="Lapor Kehilangan" />

        <main className="flex-1 max-w-3xl w-full mx-auto px-6 sm:px-10 py-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF765F]">
              Kehilangan Barang
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1633]">
              Lapor Barang Kehilangan
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-normal">
              Data laporan Anda akan otomatis dicocokkan oleh AI Vector Engine dengan barang temuan di laboratorium.
            </p>
          </div>

          <FormLaporBaru tipeAwal="kehilangan" />
        </main>
      </div>
    </div>
  );
}
