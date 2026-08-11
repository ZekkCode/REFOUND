import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 py-4 px-6 sm:px-12 flex items-center justify-between transition-all">
        <div className="flex items-center">
          <Link href="/" className="font-black text-2xl tracking-tight text-[#0B1633] hover:text-[#12A99A] transition-colors">
            REFOUND
          </Link>
        </div>
        <div>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-[#0B1633] hover:bg-[#12A99A] text-white font-bold text-sm rounded-lg shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Masuk
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Subtle background glow */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl -z-10" />

          {/* Left Column (Text & CTAs) */}
          <div className="flex-1 space-y-6 max-w-xl text-left z-10">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0B1633] leading-tight">
              Temukan Barangmu,<br className="hidden sm:inline" /> Hubungkan Kembali ke Komunitas.
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-medium">
              Sistem Lost & Found terintegrasi untuk Informatika & Sistem Informasi.<br className="hidden sm:inline" /> Cepat, aman, dan transparan.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/lapor/kehilangan"
                className="px-6 py-3.5 bg-[#0B1633] hover:bg-[#0B1633]/90 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Lapor Kehilangan
              </Link>
              <Link
                href="/lapor/penemuan"
                className="px-6 py-3.5 bg-[#12A99A] hover:bg-[#12A99A]/90 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Lapor Penemuan
              </Link>
            </div>
          </div>

          {/* Right Column (Illustration) */}
          <div className="flex-1 w-full flex justify-center items-center relative py-8">
            {/* Background Faint Text */}
            <div className="absolute text-[120px] font-black text-zinc-100/70 select-none tracking-widest pointer-events-none -z-10 font-sans transform -translate-x-12">
              REFOUND
            </div>
            
            {/* Image Container with shadow and styling */}
            <div className="relative bg-white p-3 rounded-2xl shadow-[0_20px_50px_rgba(11,22,51,0.08)] border border-zinc-100 max-w-lg w-full transform hover:scale-[1.02] transition-transform duration-500 z-10 overflow-hidden">
              <Image
                src="/hero_illustration.png"
                alt="Lost & Found Desk Illustration"
                width={600}
                height={400}
                className="rounded-xl w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Cara Kerja Section */}
        <section className="bg-white py-20 px-6 sm:px-12 border-t border-zinc-50">
          <div className="max-w-6xl mx-auto space-y-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1633] text-center tracking-tight">
              Cara Kerja
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-[0_4px_20px_-2px_rgba(11,22,51,0.02)] hover:shadow-[0_10px_30px_-5px_rgba(11,22,51,0.06)] hover:border-indigo-100 transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-lg text-[#0B1633]">Lapor & Foto</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Unggah foto barang yang hilang atau ditemukan. Sistem kami akan memproses detailnya.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-[0_4px_20px_-2px_rgba(11,22,51,0.02)] hover:shadow-[0_10px_30px_-5px_rgba(11,22,51,0.06)] hover:border-teal-100 transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 113.62 0m-3.62 0A19.953 19.953 0 0012 20c-1.398 0-2.727-.282-3.94-.793z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-lg text-[#0B1633]">AI Matching</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Algoritma pintar kami membandingkan laporan untuk menemukan kecocokan yang paling relevan.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-[0_4px_20px_-2px_rgba(11,22,51,0.02)] hover:shadow-[0_10px_30px_-5px_rgba(11,22,51,0.06)] hover:border-rose-100 transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#FF765F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-lg text-[#0B1633]">Verifikasi Admin</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Admin lab memverifikasi kecocokan dan mengamankan pengembalian barang fisik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Ranked Match & Keamanan Admin Lab Details */}
        <section className="py-20 px-6 sm:px-12 bg-[#F9FAFC]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: AI-Ranked Match */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-[0_10px_35px_rgba(11,22,51,0.03)] hover:shadow-[0_15px_40px_rgba(11,22,51,0.06)] hover:border-indigo-100/50 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1633]">AI-Ranked Match</h3>
                <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-medium">
                  Sistem memberikan peringkat pada potensi kecocokan berdasarkan warna, lokasi (Zonasi), dan deskripsi. Alasan kecocokan dijelaskan secara transparan untuk membantu Anda.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 text-xs font-bold bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                  Warna Mirip
                </span>
                <span className="px-3 py-1.5 text-xs font-bold bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                  Zona Sama (LAB A)
                </span>
              </div>
            </div>

            {/* Card 2: Keamanan Admin Lab */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-[0_10px_35px_rgba(11,22,51,0.03)] hover:shadow-[0_15px_40px_rgba(11,22,51,0.06)] hover:border-teal-100/50 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#12A99A] rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-600/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-[#0B1633]">Keamanan Admin Lab</h3>
                <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-medium">
                  Barang yang ditemukan disimpan secara fisik dan aman di ruangan laboratorium. Admin kami bertindak sebagai pihak ketiga yang netral untuk proses serah terima.
                </p>
              </div>
              <div className="flex pt-2">
                <span className="px-3.5 py-1.5 text-xs font-bold bg-teal-50 text-[#12A99A] rounded-full border border-[#12A99A]/30 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12A99A] mr-2 animate-pulse" />
                  Disimpan Admin
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Banner Section */}
        <section className="bg-[#0B1633] text-white py-16 px-6 sm:px-12 text-center relative overflow-hidden">
          {/* Decorative mesh */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#12A99A_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Privasi Anda Terjaga
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-medium">
              Informasi sensitif seperti NIM atau detail spesifik lainnya secara otomatis disembunyikan dalam kartu publik. Lokasi disederhanakan menjadi "Zona" untuk mencegah penyalahgunaan.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20 px-6 sm:px-12">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1633] text-center tracking-tight">
              Pertanyaan Umum
            </h2>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="bg-[#F9FAFC] p-6 rounded-2xl border border-zinc-100 flex flex-col space-y-2 hover:border-zinc-200 transition-colors">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0B1633]">
                  Berapa lama proses verifikasi?
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Proses pencocokan awal oleh AI terjadi instan. Verifikasi akhir oleh Admin Lab biasanya memakan waktu 1–2 hari kerja.
                </p>
              </div>

              {/* Question 2 */}
              <div className="bg-[#F9FAFC] p-6 rounded-2xl border border-zinc-100 flex flex-col space-y-2 hover:border-zinc-200 transition-colors">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0B1633]">
                  Di mana saya bisa mengambil barang saya?
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Pengambilan dilakukan di Ruang Tata Usaha / Lab Center gedung Informatika pada jam kerja operasional.
                </p>
              </div>

              {/* Question 3 */}
              <div className="bg-[#F9FAFC] p-6 rounded-2xl border border-zinc-100 flex flex-col space-y-2 hover:border-zinc-200 transition-colors">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0B1633]">
                  Apakah saya perlu membuat akun?
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Ya, pelaporan dan klaim membutuhkan login menggunakan kredensial universitas Anda untuk memastikan keamanan.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1633] text-white border-t border-white/10 py-12 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="font-black text-xl tracking-wider">REFOUND</span>
            <span className="text-xs text-zinc-400 font-medium">
              © 2026 REFOUND University Laboratory System. All rights reserved.
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
  );
}

