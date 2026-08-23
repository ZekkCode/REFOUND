'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabaseKlien } from '@/pustaka/supabase/klien';
import { keluarSesi } from '@/pustaka/supabase/auth';

interface PropsTopbar {
  judulHalaman?: string;
}

interface UserProfile {
  nama: string;
  nim: string;
  prodi: string;
  email: string;
  avatar_url?: string;
  inisial: string;
}

interface ItemNotifikasi {
  id: string;
  judul: string;
  pesan: string;
  tipe: string;
  sudah_dibaca: boolean;
  dibuat_pada: string;
  tautan?: string;
}

export default function TopbarMahasiswa({ }: PropsTopbar) {
  const router = useRouter();
  const [profil, setProfil] = useState<UserProfile>({
    nama: 'Budi Santoso',
    nim: '13519099',
    prodi: 'Teknik Informatika',
    email: 'budi.santoso@student.trunojoyo.ac.id',
    inisial: 'BS',
  });

  const [notifikasi, setNotifikasi] = useState<ItemNotifikasi[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [bukaNotif, setBukaNotif] = useState<boolean>(false);
  const [bukaProfilPop, setBukaProfilPop] = useState<boolean>(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profilRef = useRef<HTMLDivElement>(null);

  // Ambil sesi user dinamis dari Supabase Auth
  useEffect(() => {
    async function loadUserSession() {
      try {
        const { data: { session } } = await supabaseKlien.auth.getSession();
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          const fullName = userMeta.full_name || userMeta.name || session.user.email?.split('@')[0] || 'Mahasiswa';
          const email = session.user.email || '';
          const avatar = userMeta.avatar_url || userMeta.picture;

          const words = fullName.trim().split(' ');
          const inisial = words.length > 1
            ? `${words[0][0]}${words[1][0]}`.toUpperCase()
            : fullName.slice(0, 2).toUpperCase();

          setProfil({
            nama: fullName,
            nim: userMeta.nim || '13519099',
            prodi: userMeta.prodi || 'Teknik Informatika',
            email,
            avatar_url: avatar,
            inisial,
          });
        } else {
          // Cek API profil lokal
          const res = await fetch('/api/profil');
          const json = await res.json();
          if (json?.data) {
            const fullName = json.data.nama || 'Budi Santoso';
            const words = fullName.trim().split(' ');
            const inisial = words.length > 1
              ? `${words[0][0]}${words[1][0]}`.toUpperCase()
              : fullName.slice(0, 2).toUpperCase();

            setProfil({
              nama: fullName,
              nim: json.data.nim || '13519099',
              prodi: json.data.program_studi || 'Teknik Informatika',
              email: json.data.email || 'budi@student.trunojoyo.ac.id',
              avatar_url: json.data.avatar_url,
              inisial,
            });
          }
        }
      } catch (err) {
        console.warn('Load session topbar:', err);
      }
    }

    loadUserSession();
  }, []);

  // Ambil data notifikasi
  useEffect(() => {
    async function loadNotifikasi() {
      try {
        const res = await fetch('/api/notifikasi');
        const json = await res.json();
        if (json.sukses && Array.isArray(json.data)) {
          setNotifikasi(json.data);
          setUnreadCount(json.jumlah_belum_dibaca || 0);
        }
      } catch (e) {
        console.warn('Fetch notifikasi:', e);
      }
    }

    loadNotifikasi();
  }, []);

  // Tutup dropdown notif & profil saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setBukaNotif(false);
      }
      if (profilRef.current && !profilRef.current.contains(event.target as Node)) {
        setBukaProfilPop(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTandaiSemuaDibaca = async () => {
    setNotifikasi((prev) => prev.map((n) => ({ ...n, sudah_dibaca: true })));
    setUnreadCount(0);
    try {
      await fetch('/api/notifikasi', { method: 'PATCH' });
    } catch {
      // ignore
    }
  };

  const handleLogout = async () => {
    try {
      await keluarSesi();
    } catch {
      // ignore
    }
    document.cookie = 'refound_auth_token=; path=/; max-age=0';
    document.cookie = 'refound_admin_token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md py-3 px-6 sm:px-10 flex items-center justify-between border-b border-slate-200/80 shrink-0 sticky top-0 z-30">
      {/* Mobile Logo */}
      <div className="md:hidden">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="REFOUND Logo"
            width={90}
            height={28}
            className="object-contain h-6 w-auto"
            priority
          />
          <div className="h-4.5 w-px bg-slate-200" />
          <Image
            src="/TCC_LOGO.png"
            alt="TCC Logo"
            width={28}
            height={28}
            className="object-contain h-6 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        
        {/* Status Chip */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[11px] font-medium text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Mahasiswa Aktif</span>
        </div>

        {/* 1. Notifikasi Icon & Interactive Popover */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setBukaNotif(!bukaNotif);
              setBukaProfilPop(false);
            }}
            className="relative p-2 text-slate-500 hover:text-[#0B1633] hover:bg-slate-100/80 rounded-full transition-colors cursor-pointer"
            title="Notifikasi"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9px] font-bold text-white bg-[#FF765F] rounded-full border-2 border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifikasi Popover */}
          {bukaNotif && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#0B1633]">Notifikasi</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-50 text-[#FF765F] rounded-full border border-rose-100">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleTandaiSemuaDibaca}
                    className="text-[10px] font-semibold text-[#12A99A] hover:underline cursor-pointer"
                  >
                    Tandai dibaca
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifikasi.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 font-medium">
                    Tidak ada notifikasi saat ini.
                  </div>
                ) : (
                  notifikasi.map((n) => (
                    <Link
                      key={n.id}
                      href={n.tautan || '#'}
                      onClick={() => setBukaNotif(false)}
                      className={`p-3.5 block transition-colors ${
                        !n.sudah_dibaca ? 'bg-teal-50/40 hover:bg-teal-50/70' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#0B1633] leading-snug">
                          {n.judul}
                        </span>
                        {!n.sudah_dibaca && (
                          <span className="w-2 h-2 rounded-full bg-[#12A99A] shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-1 leading-relaxed line-clamp-2">
                        {n.pesan}
                      </p>
                    </Link>
                  ))
                )}
              </div>

              <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
                <Link
                  href="/dashboard"
                  onClick={() => setBukaNotif(false)}
                  className="text-[11px] font-semibold text-[#0B1633] hover:text-[#12A99A] transition-colors"
                >
                  Buka Semua di Dashboard &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 2. Interactive Profile Popover Button (Nama, NIM, Prodi, Cek Akun, Logout) */}
        <div className="relative" ref={profilRef}>
          <button
            type="button"
            onClick={() => {
              setBukaProfilPop(!bukaProfilPop);
              setBukaNotif(false);
            }}
            className="flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full transition-all duration-150 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#12A99A]/40"
            title="Menu Akun Saya"
          >
            {profil.avatar_url ? (
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 group-hover:ring-2 group-hover:ring-[#12A99A]/50 transition-all">
                <Image
                  src={profil.avatar_url}
                  alt={profil.nama}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#0B1633] text-white flex items-center justify-center font-semibold text-xs shadow-xs group-hover:ring-2 group-hover:ring-[#12A99A]/50 transition-all shrink-0">
                {profil.inisial}
              </div>
            )}

            <div className="hidden sm:flex flex-col text-left leading-none pr-1">
              <span className="text-xs font-semibold text-[#0B1633] group-hover:text-[#12A99A] transition-colors truncate max-w-[120px]">
                {profil.nama}
              </span>
              <span className="text-[10px] text-slate-400 font-normal mt-0.5 truncate max-w-[120px]">
                {profil.nim}
              </span>
            </div>

            <svg className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B1633] transition-transform duration-150 hidden sm:block ${bukaProfilPop ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Popover Modal / Dropdown */}
          {bukaProfilPop && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Header Info User: Nama, NIM, Prodi */}
              <div className="p-4 bg-slate-50/70 border-b border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  {profil.avatar_url ? (
                    <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={profil.avatar_url}
                        alt={profil.nama}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#0B1633] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                      {profil.inisial}
                    </div>
                  )}

                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-sm font-bold text-[#0B1633] truncate">
                      {profil.nama}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate">
                      NIM: {profil.nim}
                    </p>
                  </div>
                </div>

                {/* Prodi Badge */}
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-400">Program Studi:</span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-[#0B1633]">
                    {profil.prodi}
                  </span>
                </div>
              </div>

              {/* Action Links: Cek Akun & Logout */}
              <div className="p-2 space-y-1">
                <Link
                  href="/profil"
                  onClick={() => setBukaProfilPop(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-xs font-medium text-[#0B1633] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#12A99A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-semibold text-[#0B1633]">Cek Akun & Profil</span>
                    <span className="block text-[10px] text-slate-400 font-normal">Edit foto, nomor WA, dan keamanan</span>
                  </div>
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setBukaProfilPop(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span>Dashboard Saya</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-[#FF765F] font-semibold text-xs rounded-xl shadow-2xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span>Keluar Akun (Log Out)</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}
