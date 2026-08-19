'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import { supabaseKlien } from '@/pustaka/supabase/klien';

export default function ProfilMahasiswaPage() {
  const [nama, setNama] = useState('Budi Santoso');
  const [nim, setNim] = useState('13519099');
  const [prodi, setProdi] = useState('Teknik Informatika');
  const [email, setEmail] = useState('budi.santoso@student.trunojoyo.ac.id');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [duaFaktor, setDuaFaktor] = useState(false);
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load session or profile data
  useEffect(() => {
    async function loadData() {
      try {
        const { data: { session } } = await supabaseKlien.auth.getSession();
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          if (userMeta.full_name || userMeta.name) setNama(userMeta.full_name || userMeta.name);
          if (userMeta.nim) setNim(userMeta.nim);
          if (userMeta.prodi) setProdi(userMeta.prodi);
          if (session.user.email) setEmail(session.user.email);
          if (userMeta.avatar_url || userMeta.picture) setAvatarUrl(userMeta.avatar_url || userMeta.picture);
        } else {
          const res = await fetch('/api/profil');
          const json = await res.json();
          if (json?.data) {
            if (json.data.nama) setNama(json.data.nama);
            if (json.data.nim) setNim(json.data.nim);
            if (json.data.program_studi) setProdi(json.data.program_studi);
            if (json.data.email) setEmail(json.data.email);
            if (json.data.telepon) setPhone(json.data.telepon);
            if (json.data.avatar_url) setAvatarUrl(json.data.avatar_url);
            if (json.data.dua_faktor !== undefined) setDuaFaktor(json.data.dua_faktor);
          }
        }
      } catch (err) {
        console.warn('Load profile:', err);
      }
    }
    loadData();
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg('Ukuran file foto maksimal 3MB.');
      return;
    }

    setUploading(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setAvatarUrl(base64);
      setUploading(false);
      setSuccessMsg('Foto profil berhasil diunggah. Klik "Simpan Perubahan" untuk menyimpan.');
      setTimeout(() => setSuccessMsg(null), 4000);
    };
    reader.onerror = () => {
      setUploading(false);
      setErrorMsg('Gagal membaca file foto.');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/profil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama,
          telepon: phone,
          dua_faktor: duaFaktor,
          avatar_url: avatarUrl,
        }),
      });

      if (res.ok) {
        setSuccessMsg('Profil dan foto berhasil diperbarui.');
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg('Gagal menyimpan profil.');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  const words = nama.trim().split(' ');
  const inisial = words.length > 1
    ? `${words[0][0]}${words[1][0]}`.toUpperCase()
    : nama.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      
      {/* Consistent Left Sidebar */}
      <SidebarMahasiswa />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-8">
        
        {/* Top Navbar */}
        <TopbarMahasiswa judulHalaman="Profil & Keamanan Akun" />

        <main className="flex-1 py-8 px-6 sm:px-10 max-w-5xl w-full mx-auto space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#12A99A]">
              Pengaturan Akun
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1633]">
              Profil & Keamanan Akun
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-normal">
              Kelola data identitas mahasiswa, foto profil, dan kontak verifikasi laboratorium.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 bg-teal-50 border border-teal-200 text-[#12A99A] text-xs font-semibold rounded-xl flex items-center space-x-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-[#FF765F] text-xs font-semibold rounded-xl flex items-center space-x-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                <h2 className="text-base font-bold text-[#0B1633] border-b border-slate-100 pb-3">
                  Informasi Mahasiswa
                </h2>

                {/* Avatar Photo Section with Upload Button */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl">
                  <div className="relative group shrink-0">
                    {avatarUrl ? (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xs border-2 border-white ring-2 ring-[#12A99A]/30">
                        <Image
                          src={avatarUrl}
                          alt={nama}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-[#0B1633] text-white text-xl font-bold flex items-center justify-center shadow-xs border-2 border-white">
                        {inisial}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left flex-1">
                    <h4 className="text-sm font-bold text-[#0B1633]">{nama}</h4>
                    <p className="text-slate-400 text-xs font-medium">{nim} &bull; {prodi}</p>
                    
                    <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#12A99A] text-[#0B1633] hover:text-[#12A99A] font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 text-[#12A99A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{uploading ? 'Memproses...' : 'Ubah Foto'}</span>
                      </button>

                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl('')}
                          className="px-3 py-1.5 bg-white border border-rose-200 text-[#FF765F] hover:bg-rose-50 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                    />
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">NIM</label>
                      <input
                        type="text"
                        disabled
                        value={nim}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Program Studi</label>
                      <input
                        type="text"
                        disabled
                        value={prodi}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        disabled
                        value={email}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Nomor WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none font-medium"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-5 py-2.5 bg-[#0B1633] hover:bg-[#0B1633]/90 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                  </div>
                </form>
              </div>
            </section>

            <section className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                <h2 className="text-base font-bold text-[#0B1633] border-b border-slate-100 pb-3">
                  Statistik & Status
                </h2>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xl font-bold text-[#0B1633]">2</span>
                    <span className="block text-[9px] font-medium text-slate-400 mt-1 uppercase">Laporan</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-xl font-bold text-[#0B1633]">1</span>
                    <span className="block text-[9px] font-medium text-slate-400 mt-1 uppercase">Klaim</span>
                  </div>
                  <div className="p-3.5 bg-teal-50/60 rounded-xl border border-teal-100">
                    <span className="block text-xl font-bold text-[#12A99A]">1</span>
                    <span className="block text-[9px] font-semibold text-[#12A99A] mt-1 uppercase">Selesai</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3 text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[#0B1633] font-semibold">2-Factor Authentication</span>
                      <span className="block text-slate-400 text-[10px]">Perlindungan sesi login mahasiswa</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDuaFaktor(!duaFaktor)}
                      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${
                        duaFaktor ? 'bg-[#12A99A]' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          duaFaktor ? 'transform translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
