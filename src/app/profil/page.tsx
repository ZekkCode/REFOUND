'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SidebarMahasiswa from '@/komponen/SidebarMahasiswa';
import TopbarMahasiswa from '@/komponen/TopbarMahasiswa';
import { supabaseKlien } from '@/pustaka/supabase/klien';

function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="h-4 bg-slate-100 rounded w-1/4" />
        <div className="h-8 bg-slate-100 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-2/3" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="h-6 bg-slate-100 rounded w-1/3 border-b border-slate-100 pb-3" />
          <div className="flex gap-4 items-center bg-slate-50 p-4 border border-slate-200/60 rounded-2xl">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
            <div className="h-10 bg-slate-100 rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs h-64 animate-pulse" />
      </div>
    </div>
  );
}

export default function ProfilMahasiswaPage() {
  const [nama, setNama] = useState<string | null>(null);
  const [nim, setNim] = useState<string | null>(null);
  const [prodi, setProdi] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [duaFaktor, setDuaFaktor] = useState(false);
  
  // UTM specific academic fields
  const [fakultas, setFakultas] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [labAffiliation, setLabAffiliation] = useState<string | null>(null);
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load session or profile data
  useEffect(() => {
    async function loadData() {
      try {
        const { data: authData } = await supabaseKlien.auth.getUser();
        if (authData?.user) {
          const userMeta = authData.user.user_metadata || {};
          
          if (authData.user.email) setEmail(authData.user.email);
          
          // Query the db profil table directly
          const { data: profilDb, error } = await supabaseKlien
            .from('profil')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          if (!error && profilDb) {
            if (profilDb.nama) setNama(profilDb.nama);
            if (profilDb.nim) setNim(profilDb.nim);
            if (profilDb.program_studi) setProdi(profilDb.program_studi);
            if (profilDb.nomor_telepon) setPhone(profilDb.nomor_telepon);
            if (profilDb.avatar_url) setAvatarUrl(profilDb.avatar_url);
          } else {
            // Fallback to metadata
            if (userMeta.full_name || userMeta.name) setNama(userMeta.full_name || userMeta.name);
            if (userMeta.nim) setNim(userMeta.nim);
            if (userMeta.prodi) setProdi(userMeta.prodi);
            if (userMeta.avatar_url || userMeta.picture) setAvatarUrl(userMeta.avatar_url || userMeta.picture);
          }
          
          // UTM academic fields from metadata
          setFakultas(userMeta.fakultas || 'Fakultas Teknik');
          setRole(userMeta.role || 'Mahasiswa');
          setLabAffiliation(userMeta.lab_affiliation || 'Laboratorium TIF');
        } else {
          // API fallback
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
            
            setFakultas(json.data.fakultas || 'Fakultas Teknik');
            setRole(json.data.role || 'Mahasiswa');
            setLabAffiliation(json.data.lab_affiliation || 'Laboratorium TIF');
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

  if (nama === null) {
    return (
      <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
        <SidebarMahasiswa />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-8">
          <TopbarMahasiswa judulHalaman="Profil & Keamanan Akun" />
          <main className="flex-1 py-8 px-6 sm:px-10 max-w-5xl w-full mx-auto">
            <ProfileSkeleton />
          </main>
        </div>
      </div>
    );
  }

  const words = nama.trim().split(' ');
  const inisial = words.length > 1
    ? `${words[0][0]}${words[1][0]}`.toUpperCase()
    : nama.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#0B1633] font-sans antialiased">
      <SidebarMahasiswa />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-8">
        <TopbarMahasiswa judulHalaman="Profil" />

        <main className="flex-1 py-8 px-6 sm:px-10 max-w-5xl w-full mx-auto space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#12A99A]">
              Pengaturan
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1633]">
              Profil Akun
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-normal">
              Kelola data identitas dan kontak verifikasi Anda.
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
                  Data Diri
                </h2>

                {/* Avatar Photo Section with Upload Button */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl">
                  <div className="relative group shrink-0">
                    {avatarUrl ? (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xs border-2 border-white ring-2 ring-[#12A99A]/30">
                        <Image
                          src={avatarUrl}
                          alt={nama || 'Foto Profil'}
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
                        value={nama || ''}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">NIM / NIP</label>
                      <input
                        type="text"
                        disabled
                        value={nim || ''}
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
                        value={prodi || ''}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Fakultas</label>
                      <input
                        type="text"
                        disabled
                        value={fakultas || ''}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Peran</label>
                      <input
                        type="text"
                        disabled
                        value={role || ''}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Afiliasi Lab</label>
                      <input
                        type="text"
                        disabled
                        value={labAffiliation || ''}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        disabled
                        value={email || ''}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-1">Nomor WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={phone || ''}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-[#12A99A] focus:ring-1 focus:ring-[#12A99A] outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-5 py-2.5 bg-[#0B1633] hover:bg-[#12A99A] disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
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
                  Ringkasan
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
                      <span className="block text-[#0B1633] font-semibold">Autentikasi 2-Langkah</span>
                      <span className="block text-slate-400 text-[10px]">Keamanan tambahan akun</span>
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
