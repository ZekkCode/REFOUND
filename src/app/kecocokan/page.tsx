import Link from 'next/link';
import Image from 'next/image';

export default function HalamanPencocokanAI() {
  return (
    <div className="min-h-screen flex bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-white text-zinc-600 flex flex-col justify-between shrink-0 min-h-screen border-r border-zinc-200 hidden md:flex">
        <div className="p-6 space-y-8">
          {/* Logo Brand */}
          <div className="pt-2">
            <Link href="/" className="font-black text-2xl tracking-tight text-[#0B1633] hover:text-[#006F69] transition-colors">
              REFOUND
            </Link>
          </div>

          {/* Quick Action Button */}
          <div className="pt-2">
            <Link
              href="/lapor/kehilangan"
              className="flex items-center justify-center w-full px-4 py-3 bg-[#006F69] hover:bg-[#006f69]/90 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Lapor
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/barang-temuan"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Barang Temuan</span>
            </Link>
            <Link
              href="/kecocokan"
              className="flex items-center space-x-3 px-4 py-3 bg-[#006F69] text-white font-bold text-sm rounded-xl transition-all shadow-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="5" />
                <circle cx="15" cy="12" r="5" />
              </svg>
              <span>Kecocokan</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Laporan Saya</span>
            </Link>
          </nav>
        </div>

        {/* Profile menu item in bottom light-grey row */}
        <div className="bg-zinc-50 border-t border-zinc-100 p-4">
          <Link
            href="#"
            className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 font-semibold text-sm rounded-xl transition-all"
          >
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profil</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-white">
        
        {/* Content Wrapper */}
        <div className="flex-1 py-8 px-6 sm:px-12 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Back link & Title */}
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-xs font-bold text-zinc-400 hover:text-[#0B1633] transition-colors"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Laporan #RF-2023-11-04
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-[#0B1633]">
                Kandidat Ditemukan
              </h1>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl">
                Sistem AI kami menemukan 3 barang yang berpotensi cocok dengan laporan kehilangan MacBook Pro 14&quot; (Space Grey) Anda di area Perpustakaan Pusat.
              </p>
            </div>
          </div>

          {/* Laporan Anda Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-150 shadow-[0_4px_25px_rgba(11,22,51,0.02)] flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Laptop Image */}
            <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden border border-zinc-100 shrink-0">
              <Image
                src="/macbook_space_grey.png"
                alt="MacBook Pro Space Grey"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Description Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-zinc-400 tracking-wider">
                  LAPORAN ANDA
                </span>
                <h2 className="text-2xl font-black text-[#0B1633]">
                  MacBook Pro 14&quot; (Space Grey)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Waktu Hilang</span>
                  <span className="text-[#0B1633] font-bold text-sm">12 Okt 2023, 14:30 WIB</span>
                </div>
                <div>
                  <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Lokasi Terakhir</span>
                  <span className="text-[#0B1633] font-bold text-sm">Perpustakaan Pusat, Lt. 2</span>
                </div>
              </div>

              <div>
                <span className="block text-zinc-400 font-semibold uppercase tracking-wider text-[10px] text-xs">Ciri Khusus</span>
                <p className="text-zinc-500 font-medium text-xs leading-relaxed mt-0.5">
                  Stiker &apos;GitHub&apos; di sudut kiri atas, ada goresan kecil dekat port MagSafe.
                </p>
              </div>
            </div>
          </div>

          {/* Hasil Analisis AI Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-black text-[#0B1633] border-b border-zinc-100 pb-3">
              Hasil Analisis AI
            </h2>

            {/* AI Candidates List */}
            <div className="space-y-6">
              
              {/* Match Card 1: 86% Match */}
              <div className="bg-white rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] overflow-hidden relative">
                {/* Match percentage badge top right */}
                <div className="absolute top-0 right-0 bg-[#4F46E5] text-white px-4 py-1.5 rounded-bl-2xl font-black text-xs flex items-center shadow-sm">
                  <svg className="w-3.5 h-3.5 mr-1 fill-current text-white" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Kecocokan 86%
                </div>

                <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                  {/* Laptop image with admin badge inside */}
                  <div className="w-full md:w-52 h-36 relative rounded-2xl overflow-hidden border border-zinc-100 shrink-0">
                    <Image
                      src="/laptop_apple_library.png"
                      alt="Laptop Apple Library"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#12A99A] text-white px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center shadow-md">
                      Disimpan Admin
                    </span>
                  </div>

                  {/* Descriptions and Similarity Tags */}
                  <div className="flex-1 space-y-4 pr-16 md:pr-0">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-[#0B1633]">
                        Laptop Silver/Grey (Apple)
                      </h3>
                      <p className="text-zinc-500 font-medium text-xs leading-relaxed">
                        Ditemukan di Meja Baca Utara, Perpustakaan Pusat. Diserahkan oleh petugas kebersihan.
                      </p>
                    </div>

                    {/* Similarity Tags List */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Warna Mirip (Space Grey)
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Zona Sesuai (Perpustakaan Lt. 2)
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Waktu Logis (+45 mnt)
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Stiker Teridentifikasi Parsial
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="px-6 py-4 bg-zinc-50/50 border-t border-zinc-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <Link
                    href="/klaim/match-8821"
                    className="flex-1 w-full text-center px-6 py-2.5 bg-[#006F69] hover:bg-[#006F69]/90 text-white font-bold text-sm rounded-xl transition-all duration-300"
                  >
                    Ini Barang Saya
                  </Link>
                  <button className="flex-1 w-full px-6 py-2.5 bg-white border border-[#006F69] hover:bg-[#006F69]/5 text-[#006F69] font-bold text-sm rounded-xl transition-all duration-300">
                    Bukan Barang Saya
                  </button>
                </div>
              </div>

              {/* Match Card 2: 42% Match */}
              <div className="bg-white rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] overflow-hidden relative">
                {/* Match percentage badge top right */}
                <div className="absolute top-0 right-0 bg-[#FFB020] text-white px-4 py-1.5 rounded-bl-2xl font-black text-xs flex items-center shadow-sm">
                  <svg className="w-3.5 h-3.5 mr-1 fill-current text-white" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Kecocokan 42%
                </div>

                <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                  {/* Laptop image with admin badge inside */}
                  <div className="w-full md:w-52 h-36 relative rounded-2xl overflow-hidden border border-zinc-100 shrink-0">
                    <Image
                      src="/laptop_dark_cafe.png"
                      alt="Laptop Dark Cafe"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#12A99A] text-white px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center shadow-md">
                      Disimpan Admin
                    </span>
                  </div>

                  {/* Descriptions and Similarity Tags */}
                  <div className="flex-1 space-y-4 pr-16 md:pr-0">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-[#0B1633]">
                        Laptop Gelap Tanpa Merk
                      </h3>
                      <p className="text-zinc-500 font-medium text-xs leading-relaxed">
                        Ditemukan tertinggal di area Kantin Fakultas Teknik.
                      </p>
                    </div>

                    {/* Similarity Tags List */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Kategori (Laptop)
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Beda Zona (Kantin FT)
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 mr-1 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Tanpa Stiker
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="px-6 py-4 bg-zinc-50/50 border-t border-zinc-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <Link
                    href="/klaim/match-8821"
                    className="flex-1 w-full text-center px-6 py-2.5 bg-[#006F69] hover:bg-[#006F69]/90 text-white font-bold text-sm rounded-xl transition-all duration-300"
                  >
                    Ini Barang Saya
                  </Link>
                  <button className="flex-1 w-full px-6 py-2.5 bg-white border border-[#006F69] hover:bg-[#006F69]/5 text-[#006F69] font-bold text-sm rounded-xl transition-all duration-300">
                    Bukan Barang Saya
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-[#0B1633] text-white py-12 px-6 sm:px-12 shrink-0">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="font-black text-xl tracking-wider text-white">REFOUND</span>
              <span className="text-xs text-zinc-400 font-semibold">
                © 2024 REFOUND University Laboratory System. All rights reserved.
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-zinc-300">
              <Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link>
              <Link href="#" className="hover:text-white transition-colors">Panduan Komunitas</Link>
              <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-white transition-colors">Kontak Admin Lab</Link>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

