'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilMahasiswaPage() {
  const [phone, setPhone] = useState('0812-3456-7890');
  const [duaFaktor, setDuaFaktor] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Profil berhasil diperbarui.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="min-h-screen flex bg-[#F9FAFC] text-[#0B1633] font-sans antialiased selection:bg-[#12A99A]/20">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0B1633] text-white flex flex-col justify-between p-6 shrink-0 min-h-screen hidden md:flex">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="pt-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={130} height={40} className="object-contain h-10 w-auto brightness-0 invert" />
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
              className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 font-semibold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
              href="/profil"
              className="flex items-center space-x-3 px-4 py-3 bg-[#1E293B] text-white font-bold text-sm rounded-xl transition-all"
            >
              <svg className="w-5 h-5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profil</span>
            </Link>
          </nav>
        </div>

        {/* Logout Link */}
        <div>
          <Link
            href="/login"
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
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0">
        
        {/* Top Navbar */}
        <header className="w-full bg-white py-4 px-6 sm:px-12 flex items-center justify-between md:justify-end border-b border-zinc-100 shrink-0">
          {/* Logo Brand on Mobile */}
          <div className="md:hidden">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="REFOUND Logo" width={100} height={32} className="object-contain h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <button className="relative text-zinc-500 hover:text-[#0B1633] transition-colors p-1.5 rounded-lg hover:bg-zinc-50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0B1633] text-white flex items-center justify-center font-bold text-xs shadow-md">
                BS
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 py-8 px-6 sm:px-12 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-[#0B1633]">
              Profil Pengguna
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Kelola detail akun mahasiswa dan keamanan verifikasi Anda.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 bg-teal-50 border border-teal-100 text-[#12A99A] text-xs font-bold rounded-2xl flex items-center space-x-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Personal Information Form */}
            <section className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-6">
                <h2 className="text-lg font-black text-[#0B1633] border-b border-zinc-100 pb-3">
                  Detail Profil
                </h2>

                <form onSubmit={handleSave} className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-[#0B1633] text-white text-xl font-black flex items-center justify-center shadow-md relative shrink-0">
                      BS
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0B1633]">Budi Santoso</h4>
                      <p className="text-zinc-400 text-xs font-semibold">NIM: 13519099 &bull; Informatika</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">Nama Lengkap</label>
                      <input
                        type="text"
                        disabled
                        value="Budi Santoso"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-bold text-zinc-500 cursor-not-allowed outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">Nomor Induk Mahasiswa (NIM)</label>
                      <input
                        type="text"
                        disabled
                        value="13519099"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-bold text-zinc-500 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">Program Studi</label>
                      <input
                        type="text"
                        disabled
                        value="Teknik Informatika"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-bold text-zinc-500 cursor-not-allowed outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">Status Keanggotaan</label>
                      <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs font-bold text-zinc-500 cursor-not-allowed flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
                        Mahasiswa Aktif
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">Email Kampus</label>
                      <input
                        type="email"
                        disabled
                        value="budi.santoso@std.stei.itb.ac.id"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-bold text-zinc-500 cursor-not-allowed outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-400 mb-1.5">Nomor Telepon (WhatsApp)</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs font-bold text-[#0B1633] focus:ring-1 focus:ring-[#006F69] focus:border-[#006F69] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Simpan Perubahan
                    </button>
                  </div>

                </form>
              </div>
            </section>

            {/* Right Column: Stats & Security */}
            <section className="lg:col-span-5 space-y-6">
              
              {/* Activity Stats Card */}
              <div className="bg-white p-6 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-5">
                <h2 className="text-lg font-black text-[#0B1633] border-b border-zinc-100 pb-3">
                  Statistik Aktivitas
                </h2>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="block text-xl font-black text-[#0B1633]">2</span>
                    <span className="block text-[9px] font-bold text-zinc-400 mt-1 uppercase">Laporan</span>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="block text-xl font-black text-[#0B1633]">1</span>
                    <span className="block text-[9px] font-bold text-zinc-400 mt-1 uppercase">Klaim</span>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <span className="block text-xl font-black text-[#12A99A]">1</span>
                    <span className="block text-[9px] font-bold text-zinc-400 mt-1 uppercase">Selesai</span>
                  </div>
                </div>
              </div>

              {/* Account Security Card */}
              <div className="bg-white p-6 rounded-3xl border border-zinc-150 shadow-[0_10px_35px_rgba(11,22,51,0.02)] space-y-5">
                <h2 className="text-lg font-black text-[#0B1633] border-b border-zinc-100 pb-3">
                  Keamanan Akun
                </h2>

                <div className="space-y-4 text-xs font-semibold">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[#0B1633] font-bold">Autentikasi Dua Faktor (2FA)</span>
                      <span className="block text-zinc-400 text-[10px] mt-0.5">Amankan login mahasiswa Anda.</span>
                    </div>
                    <button
                      onClick={() => setDuaFaktor(!duaFaktor)}
                      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                        duaFaktor ? 'bg-[#12A99A]' : 'bg-zinc-200'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          duaFaktor ? 'transform translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 space-y-3">
                    <button className="w-full py-2.5 bg-zinc-50 hover:bg-zinc-100 text-[#0B1633] border border-zinc-200 font-extrabold text-xs rounded-xl transition-all text-center">
                      Ubah Kata Sandi
                    </button>
                    <button className="w-full py-2.5 bg-zinc-50 hover:bg-zinc-100 text-[#0B1633] border border-zinc-200 font-extrabold text-xs rounded-xl transition-all text-center">
                      Reset PIN Serah Terima
                    </button>
                  </div>
                </div>
              </div>

            </section>
          </div>

        </main>
      </div>

      {/* Sticky Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex items-center justify-around py-2.5 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <Link
          href="/dashboard"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
          <span className="text-[10px] font-bold">Dashboard</span>
        </Link>
        <Link
          href="/barang-temuan"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-[10px] font-bold">Temuan</span>
        </Link>
        <Link
          href="/kecocokan"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="9" cy="12" r="5" />
            <circle cx="15" cy="12" r="5" />
          </svg>
          <span className="text-[10px] font-bold">Kecocokan</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center space-y-0.5 text-zinc-400 hover:text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span className="text-[10px] font-bold">Laporan Saya</span>
        </Link>
        <Link
          href="/profil"
          className="flex flex-col items-center space-y-0.5 text-[#006F69] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-black">Profil</span>
        </Link>
      </div>

    </div>
  );
}
