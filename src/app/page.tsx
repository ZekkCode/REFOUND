import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#0B1633] selection:bg-[#12A99A]/20 font-sans antialiased">
      
      {/* 1. Top Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-90">
            <Image src="/logo.png" alt="REFOUND Logo" width={125} height={36} className="object-contain h-8 w-auto" priority />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <Link href="/barang-temuan" className="hover:text-[#12A99A] transition-colors">
              Katalog Temuan
            </Link>
            <Link href="/lapor/kehilangan" className="hover:text-[#12A99A] transition-colors">
              Lapor Kehilangan
            </Link>
            <Link href="/lapor/penemuan" className="hover:text-[#12A99A] transition-colors">
              Lapor Penemuan
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-[#0B1633] hover:bg-[#0B1633]/90 text-white font-medium text-xs sm:text-sm rounded-xl transition-all duration-200"
            >
              Masuk Mahasiswa
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 px-6 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-5 text-left">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#12A99A]" />
                <span>Lost & Found Digital Komunitas Kampus</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0B1633] leading-tight tracking-tight">
                Temukan barangmu, <br />
                <span className="text-[#12A99A]">hubungkan kembali</span> <br />
                ke pemilik sah.
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                Platform pelaporan terpusat dengan pencocokan cerdas dan verifikasi dua langkah untuk mengembalikan barang hilang secara terstruktur dan aman.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/lapor/kehilangan"
                  className="px-5 py-2.5 bg-[#0B1633] hover:bg-slate-800 text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Lapor Kehilangan
                </Link>
                <Link
                  href="/lapor/penemuan"
                  className="px-5 py-2.5 bg-[#12A99A] hover:bg-[#12A99A]/90 text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Lapor Penemuan
                </Link>
                <Link
                  href="/barang-temuan"
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm rounded-xl transition-all"
                >
                  Katalog Temuan &rarr;
                </Link>
              </div>

              {/* Key Highlights */}
              <div className="pt-5 border-t border-slate-200 grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-xl font-semibold text-[#0B1633]">0.45s</span>
                  <span className="text-xs text-slate-500">Pencocokan Cepat</span>
                </div>
                <div>
                  <span className="block text-xl font-semibold text-[#12A99A]">100%</span>
                  <span className="text-xs text-slate-500">Privasi Ciri Khusus</span>
                </div>
                <div>
                  <span className="block text-xl font-semibold text-[#0B1633]">Admin Lab</span>
                  <span className="text-xs text-slate-500">Penitipan Fisik</span>
                </div>
              </div>
            </div>

            {/* Right Hero Card Illustration */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md bg-white p-3 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <Image
                  src="/hero_illustration.png"
                  alt="REFOUND Lost and Found System"
                  width={500}
                  height={350}
                  className="rounded-xl w-full h-auto object-cover"
                  priority
                />

                <div className="mt-3 p-3.5 bg-[#0B1633] text-white rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-semibold text-[#12A99A] tracking-wider">Verifikasi Terlindungi</span>
                    <p className="text-xs text-slate-200 font-medium">Ciri fisik rahasia diverifikasi oleh Admin Lab</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#12A99A] text-white text-[10px] font-semibold rounded-md">
                    Aktif
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Cara Kerja 3-Langkah */}
        <section className="bg-white py-16 px-6 border-y border-slate-200">
          <div className="max-w-6xl mx-auto space-y-10">
            
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#12A99A]">Alur Penggunaan</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B1633] tracking-tight">
                Bagaimana REFOUND Bekerja?
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-normal">
                Alur tertutup untuk memastikan keabsahan kepemilikan tanpa membocorkan ciri rahasia ke publik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#12A99A]/10 text-[#12A99A] flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <h3 className="text-base font-semibold text-[#0B1633]">Pelaporan & Zonasi</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Tuliskan deskripsi umum dan pilih zona lokasi tempat barang ditemukan atau hilang.
                  </p>
                </div>
                <span className="text-xs font-medium text-[#12A99A]">Privasi Ciri Terjaga &rarr;</span>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#6366F1] flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <h3 className="text-base font-semibold text-[#0B1633]">Pencocokan Cerdas</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Sistem membandingkan kemiripan teks, visual foto, zona lokasi, dan rentang waktu.
                  </p>
                </div>
                <span className="text-xs font-medium text-[#6366F1]">Skor Kecocokan Otomatis &rarr;</span>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <h3 className="text-base font-semibold text-[#0B1633]">Verifikasi & Pengambilan</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    Jawab pertanyaan rahasia. Setelah disetujui, ambil barang fisik di Admin Lab dengan kode unik.
                  </p>
                </div>
                <span className="text-xs font-medium text-[#10B981]">Kode Sekali Pakai &rarr;</span>
              </div>

            </div>

          </div>
        </section>

        {/* 4. Fitur Keamanan */}
        <section className="py-16 px-6 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#12A99A] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B1633]">Perlindungan Ciri Rahasia</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Ciri fisik unik seperti nomor seri atau goresan tersembunyi disimpan di tabel rahasia terpisah dan hanya bisa diakses oleh Admin Lab saat proses verifikasi.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#6366F1] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B1633]">Evaluasi Semantik & Fail-Safe</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Jawaban klaim dievaluasi oleh sistem semantik untuk mencocokkan makna kata kunci pemohon dengan ciri rahasia barang secara objektif dan akurat.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Clean Modern Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={110} height={32} className="object-contain h-7 w-auto" />
            </Link>
            <p className="text-xs text-slate-500 font-normal">
              © 2026 REFOUND. Sistem Lost & Found Digital Komunitas Kampus.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs font-medium text-slate-600">
            <Link href="/barang-temuan" className="hover:text-[#12A99A] transition-colors">Katalog Temuan</Link>
            <Link href="/lapor/kehilangan" className="hover:text-[#12A99A] transition-colors">Lapor Kehilangan</Link>
            <Link href="/lapor/penemuan" className="hover:text-[#12A99A] transition-colors">Lapor Penemuan</Link>
            <Link href="/admin-login" className="hover:text-[#12A99A] transition-colors">Gerbang Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
