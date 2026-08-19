import Link from 'next/link';
import Image from 'next/image';

export default function NavigasiUtama() {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Community Tag */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="REFOUND Logo" width={125} height={38} className="object-contain h-8 w-auto" priority />
          </Link>
        </div>

        {/* Navigation Menus */}
        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs font-bold text-slate-600">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-all"
          >
            Beranda
          </Link>
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-all"
          >
            Dashboard
          </Link>
          <Link
            href="/barang-temuan"
            className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-all"
          >
            Katalog Temuan
          </Link>
          <Link
            href="/lapor/kehilangan"
            className="px-4 py-2 bg-[#0F172A] hover:bg-[#0D9488] text-white font-bold rounded-xl shadow-xs transition-all"
          >
            + Buat Laporan
          </Link>
        </nav>

      </div>
    </header>
  );
}
