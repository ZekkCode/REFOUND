import Link from 'next/link';

export default function DashboardMahasiswaPage() {
  return (
    <div className="min-h-screen flex bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0B1633] text-white flex flex-col justify-between p-6 shrink-0 min-h-screen hidden md:flex">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="pt-2">
            <Link href="/" className="font-black text-2xl tracking-tight hover:text-[#12A99A] transition-colors">
              REFOUND
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Link
              href="/lapor/penemuan"
              className="flex items-center justify-center w-full px-4 py-3 bg-[#12A99A] hover:bg-[#12A99A]/90 text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Lapor Penemuan
            </Link>
            <Link
              href="/lapor/kehilangan"
              className="flex items-center justify-center w-full px-4 py-3 bg-transparent hover:bg-white/5 text-white font-bold text-sm rounded-xl border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Lapor Kehilangan
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 bg-[#1E293B] text-white font-bold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/barang-temuan"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Barang Temuan</span>
            </Link>
            <Link
              href="/kecocokan"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="5" />
                <circle cx="15" cy="12" r="5" />
              </svg>
              <span>Kecocokan</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Laporan Saya</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profil</span>
            </Link>
          </nav>
        </div>

        {/* Logout Link */}
        <div>
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 font-bold text-sm rounded-xl transition-all"
          >
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Navbar */}
        <header className="w-full bg-white py-4 px-6 sm:px-12 flex items-center justify-end border-b border-zinc-100 shrink-0">
          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <button className="relative text-zinc-500 hover:text-[#0B1633] transition-colors p-1.5 rounded-lg hover:bg-zinc-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0B1633] text-white flex items-center justify-center font-bold text-xs shadow-md">
                BS
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="flex-1 py-8 px-6 sm:px-12 max-w-6xl w-full mx-auto space-y-8">
          {/* Welcome Banner */}
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-[#0B1633]">
              Halo, Budi Santoso!
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Selamat datang di dashboard REFOUND.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Match Candidates */}
            <section className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-2.5">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0B1633]">
                  Kandidat Kecocokan Baru
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-red-600 text-white rounded-full tracking-wider flex items-center">
                  1 Baru
                </span>
              </div>

              {/* Match Candidate Card */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-[0_10px_35px_rgba(11,22,51,0.03)] hover:shadow-[0_15px_40px_rgba(11,22,51,0.06)] hover:border-indigo-100/50 transition-all duration-300 space-y-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-zinc-400 tracking-wider">
                      FLASHDISK 32GB
                    </span>
                    <h3 className="text-xl font-black text-[#0B1633] leading-tight">
                      SanDisk Cruzer
                    </h3>
                  </div>
                  {/* Score badge */}
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
                    <svg className="w-3.5 h-3.5 mr-1 text-indigo-500 fill-current" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v6.5h3a1 1 0 01.76 1.649l-6 7.5A1 1 0 018 17v-6.5H5a1 1 0 01-.76-1.649l6-7.5a1 1 0 011.06-.305z" />
                    </svg>
                    86/100 – Potensi Tinggi
                  </span>
                </div>

                {/* Attributes Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Warna mirip
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <svg className="w-3.5 h-3.5 mr-1 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Zona dekat
                  </span>
                </div>

                {/* Status alert box */}
                <div className="flex items-center px-4 py-2.5 bg-teal-50/50 border border-teal-100 rounded-xl">
                  <svg className="w-4 h-4 mr-2 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-bold text-[#12A99A]">
                    Disimpan Admin
                  </span>
                </div>

                {/* Button detail */}
                <Link
                  href="/kecocokan"
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-white border border-[#12A99A] hover:bg-teal-50/20 text-[#12A99A] font-bold text-sm rounded-xl transition-all duration-300"
                >
                  Lihat Detail
                </Link>
              </div>

              {/* Privacy protection notice box */}
              <div className="p-4 bg-zinc-100/50 border border-zinc-200 rounded-2xl flex items-start space-x-3">
                <svg className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
                  Sistem melindungi privasi Anda. NIM dan detail pribadi disamarkan. Lokasi ditampilkan sebagai "Zona" untuk keamanan.
                </p>
              </div>
            </section>

            {/* Right Column: Active Reports */}
            <section className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0B1633]">
                  Laporan Aktif Saya
                </h2>
                <Link href="/dashboard" className="text-xs font-bold text-[#12A99A] hover:underline transition-all">
                  Lihat Semua
                </Link>
              </div>

              {/* Card 1: Flashdisk SanDisk 32GB */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-[0_10px_35px_rgba(11,22,51,0.03)] hover:shadow-[0_15px_40px_rgba(11,22,51,0.06)] transition-all duration-300 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    {/* Icon frame */}
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500 shrink-0 shadow-sm">
                      {/* USB Icon */}
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0B1633]">
                        Flashdisk SanDisk 32GB
                      </h3>
                      <p className="text-zinc-400 text-xs font-semibold">
                        Hilang pada 12 Okt 2024 &bull; Lab Komputer A
                      </p>
                    </div>
                  </div>
                  {/* Status label */}
                  <span className="px-3.5 py-1.5 text-xs font-bold bg-[#FF765F]/10 text-[#FF765F] rounded-full border border-[#FF765F]/20 whitespace-nowrap">
                    Menunggu Validasi Admin
                  </span>
                </div>

                {/* Horizontal Progress Timeline */}
                <div className="relative pt-4 pb-2">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />
                  
                  {/* Active Line Segment */}
                  <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-[#FF765F] -translate-y-1/2 z-0" />

                  <div className="relative grid grid-cols-4 z-10 text-center">
                    {/* Step 1: Dilaporkan */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-6 h-6 rounded-full bg-[#12A99A] text-white flex items-center justify-center shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-[#0B1633]">Dilaporkan</span>
                    </div>

                    {/* Step 2: Validasi Admin */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-6 h-6 rounded-full bg-white border-4 border-[#FF765F] flex items-center justify-center shadow-sm" />
                      <span className="text-[10px] font-black text-[#FF765F]">Validasi Admin</span>
                    </div>

                    {/* Step 3: Pencarian AI */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 border-4 border-white flex items-center justify-center shadow-sm" />
                      <span className="text-[10px] font-bold text-zinc-400">Pencarian AI</span>
                    </div>

                    {/* Step 4: Ditemukan */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 border-4 border-white flex items-center justify-center shadow-sm" />
                      <span className="text-[10px] font-bold text-zinc-400">Ditemukan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Buku Catatan Praktikum */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-[0_10px_35px_rgba(11,22,51,0.03)] hover:shadow-[0_15px_40px_rgba(11,22,51,0.06)] transition-all duration-300 overflow-hidden">
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    {/* Icon frame */}
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500 shrink-0 shadow-sm">
                      {/* Book Icon */}
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0B1633]">
                        Buku Catatan Praktikum
                      </h3>
                      <p className="text-zinc-400 text-xs font-semibold">
                        Ditemukan pada 10 Okt 2024 &bull; Lobi Utama
                      </p>
                    </div>
                  </div>
                  {/* Status label */}
                  <span className="px-3.5 py-1.5 text-xs font-bold bg-teal-50 text-[#12A99A] rounded-full border border-teal-100 whitespace-nowrap">
                    Selesai / Dikembalikan
                  </span>
                </div>

                {/* Footer details row */}
                <div className="bg-zinc-50 px-6 py-3 flex items-center justify-between border-t border-zinc-100">
                  <span className="text-xs font-semibold text-zinc-400">
                    Status akhir: Dikembalikan ke pemilik.
                  </span>
                  <Link href="/dashboard" className="text-xs font-bold text-[#12A99A] hover:underline">
                    Lihat Riwayat
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

