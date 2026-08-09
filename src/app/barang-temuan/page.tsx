'use client';

import { useState } from 'react';
import NavigasiUtama from '@/komponen/NavigasiUtama';
import KartuLaporan from '@/komponen/KartuLaporan';
import { ItemLaporan } from '@/pustaka/alur-kerja/tipe';
import { DAFTAR_ZONA_LAB } from '@/pustaka/alur-kerja/katalog';

export default function HalamanBarangTemuan() {
  const [kataKunci, setKataKunci] = useState('');
  const [zonaTerpilih, setZonaTerpilih] = useState('semua');

  const daftarSemuaTemuan: ItemLaporan[] = [
    {
      id: 'lap-temuan-202',
      user_id: 'usr-mhs-02',
      tipe: 'penemuan',
      kategori: 'Elektronik',
      deskripsi_publik: 'Flashdisk Sandisk 32GB warna merah ditemukan di meja koridor utama',
      id_zona: 'koridor',
      nama_zona: 'Koridor Gedung Lab',
      waktu_kejadian: '9 Agu 2026, 11:30 WIB',
      status: 'aktif',
    },
    {
      id: 'lap-temuan-205',
      user_id: 'usr-mhs-04',
      tipe: 'penemuan',
      kategori: 'Wadah (Tumbler)',
      deskripsi_publik: 'Tumbler Corkcicle warna hitam 750ml ditemukan di meja lab komputer 3.',
      id_zona: 'lab_tif',
      nama_zona: 'Lab TIF',
      waktu_kejadian: '9 Agu 2026, 09:30 WIB',
      status: 'potensi_cocok',
      id_pencocokan_kandidat: 'match-8821',
    },
    {
      id: 'lap-temuan-209',
      user_id: 'usr-mhs-05',
      tipe: 'penemuan',
      kategori: 'Aksesoris',
      deskripsi_publik: 'Kacamata frame hitam merk Rayban tertinggal di lobi utama lab',
      id_zona: 'lobi',
      nama_zona: 'Lobi Utama Lab',
      waktu_kejadian: '7 Agu 2026, 14:00 WIB',
      status: 'aktif',
    },
  ];

  const temuanTersaring = daftarSemuaTemuan.filter((item) => {
    const cocokKata =
      item.deskripsi_publik.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.kategori.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokZona = zonaTerpilih === 'semua' || item.id_zona === zonaTerpilih;
    return cocokKata && cocokZona;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavigasiUtama />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#12A99A]">
            Katalog Publik Aman Privasi
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1633] dark:text-white">
            Daftar Barang Temuan Terverifikasi
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Seluruh barang temuan pada daftar ini telah disimpan dengan aman di Ruang Admin Lab.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="kartu-refound p-4 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Cari kategori atau deskripsi barang..."
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            className="w-full sm:flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
          />

          <select
            value={zonaTerpilih}
            onChange={(e) => setZonaTerpilih(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-2.5 text-sm font-medium focus:ring-2 focus:ring-[#12A99A] outline-none"
          >
            <option value="semua">Semua Zona Gedung</option>
            {DAFTAR_ZONA_LAB.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nama}
              </option>
            ))}
          </select>
        </div>

        {/* List Cards */}
        {temuanTersaring.length === 0 ? (
          <div className="p-12 text-center kartu-refound text-zinc-500 text-sm">
            Tidak ada barang temuan yang sesuai dengan filter pencarian.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temuanTersaring.map((item) => (
              <KartuLaporan key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
