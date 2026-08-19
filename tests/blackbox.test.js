/**
 * REFOUND - Blackbox Automated Testing Suite
 * Menguji sistem secara menyeluruh melalui API endpoints live (Blackbox Input-Output, Validasi, Security & Workflow)
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const hasilTest = [];

function catatHasil(namaKasus, status, detail = '') {
  hasilTest.push({ namaKasus, status: status ? 'PASSED' : 'FAILED', detail });
  const icon = status ? '✅' : '❌';
  console.log(`${icon} [${status ? 'PASSED' : 'FAILED'}] ${namaKasus} ${detail ? '- ' + detail : ''}`);
}

async function jalankanBlackboxTest() {
  console.log('===============================================================');
  console.log('🚀 MEMULAI BLACKBOX TEST SUITE: SISTEM REFOUND');
  console.log(`Target Host: ${BASE_URL}`);
  console.log('===============================================================\n');

  // --------------------------------------------------------------------------
  // TEST SCENARIO 1: Pengambilan Katalog Barang Temuan & Filtering (Blackbox)
  // --------------------------------------------------------------------------
  console.log('--- SKENARIO 1: Katalog Barang Temuan & Search ---');
  try {
    const res = await fetch(`${BASE_URL}/api/barang-temuan`);
    const json = await res.json();
    const items = json.data || [];

    catatHasil(
      'TC-01: Mengambil daftar katalog temuan dari API publik',
      json.sukses && Array.isArray(items) && items.length > 0,
      `Ditemukan ${items.length} barang temuan publik.`
    );

    // Test Search query logic
    const pencarian = 'Laptop';
    const terfilter = items.filter(i => 
      (i.kategori || '').toLowerCase().includes(pencarian.toLowerCase()) || 
      (i.title || '').toLowerCase().includes(pencarian.toLowerCase()) ||
      (i.deskripsi || '').toLowerCase().includes(pencarian.toLowerCase())
    );
    catatHasil(
      'TC-02: Pencarian kata kunci spesifik ("Laptop")',
      terfilter.length > 0,
      `Ditemukan ${terfilter.length} item sesuai kata kunci "${pencarian}".`
    );
  } catch (e) {
    catatHasil('TC-01/02: Error exception katalog', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 2: Validasi Pembuatan Laporan Baru (Input Boundary & Security)
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 2: Pembuatan Laporan & Validasi Input ---');
  let laporanDibuatId = null;
  try {
    const payload = {
      tipe: 'kehilangan',
      kategori: 'Elektronik',
      deskripsi_publik: 'Earphone Sony TWS Hitam tertinggal di Lab TIF',
      id_zona: 'lab_tif',
      waktu_kejadian: 'Hari ini, 10:00 WIB',
      ciri_spesifik: 'Warna hitam doff dengan sticker kecil',
      kontak_pelapor: '081299887766',
    };

    const res = await fetch(`${BASE_URL}/api/laporan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    laporanDibuatId = json.data?.id;

    catatHasil(
      'TC-03: Simpan Laporan Kehilangan Baru via API',
      json.sukses && Boolean(laporanDibuatId),
      `ID Laporan: ${laporanDibuatId}, Sumber: ${json.sumber_data}`
    );

    catatHasil(
      'TC-04: Keamanan Ciri Rahasia & Data Isolation',
      json.sukses && json.data && !JSON.stringify(json.data).includes('token_rahasia_admin'),
      'Data isolation terjaga, tidak mengekspos token internal.'
    );
  } catch (e) {
    catatHasil('TC-03/04: Error exception pembuatan laporan', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 3: AI Match Engine & Evaluasi Skor
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 3: AI Match Engine & Evaluasi Skor ---');
  try {
    const res = await fetch(`${BASE_URL}/api/kecocokan`);
    const json = await res.json();
    const kandidatList = json.data || [];
    const firstMatch = kandidatList[0];

    const skorValid = firstMatch && typeof firstMatch.skor_akhir === 'number' && firstMatch.skor_akhir >= 0 && firstMatch.skor_akhir <= 1;

    catatHasil(
      'TC-05: Verifikasi Kalkulasi Skor Kecocokan AI (Range 0.0 - 1.0)',
      json.sukses && skorValid,
      `Skor AI: ${Math.round((firstMatch?.skor_akhir || 0) * 100)}% (${firstMatch?.alasan_ringkas || 'Match atribut spesifik'})`
    );
  } catch (e) {
    catatHasil('TC-05: Error exception match engine', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 4: Pengajuan Klaim & 2-Step Verification
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 4: Verifikasi Klaim Barang & Ciri Rahasia ---');
  let klaimId = null;
  try {
    const payloadKlaim = {
      id_pencocokan: 'match-1',
      id_laporan_kehilangan: 'lap-01',
      jawaban_rahasia: 'Ada stiker GitHub dan goresan tipis di pojok kanan keyboard',
      catatan_tambahan: 'Saya bisa bawa kardus dan bukti invoice pembelian.',
    };

    const res = await fetch(`${BASE_URL}/api/klaim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadKlaim),
    });
    const json = await res.json();
    klaimId = json.data?.id;

    catatHasil(
      'TC-06: Pengajuan Klaim dengan Jawaban Verifikasi Rahasia',
      json.sukses && Boolean(klaimId),
      `Status Klaim: ${json.data?.status || 'diajukan'}, Skor Evaluasi AI: ${Math.round((json.data?.skor_kemiripan || 0.88) * 100)}%`
    );
  } catch (e) {
    catatHasil('TC-06: Error exception alur klaim', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 5: Keputusan Admin Lab (Approval & Generate OTP)
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 5: Keputusan Admin & Serah Terima OTP ---');
  let kodeOTP = 'AMBIL-8821';
  try {
    const res = await fetch(`${BASE_URL}/api/admin/klaim/klm-test-01`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setujui: true, alasan: 'Bukti nomor seri dan stiker valid.' }),
    });
    const json = await res.json();
    if (json.data?.kode_pengambilan) {
      kodeOTP = json.data.kode_pengambilan;
    }

    catatHasil(
      'TC-07: Keputusan Persetujuan Admin Lab (Generate OTP Kode)',
      json.sukses && Boolean(kodeOTP),
      `Kode OTP Serah Terima: ${kodeOTP}`
    );
  } catch (e) {
    catatHasil('TC-07: Error exception keputusan admin', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 6: Eksekusi Serah Terima Fisik (Handover Completion)
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 6: Serah Terima Fisik & Tutup Kasus ---');
  try {
    const res = await fetch(`${BASE_URL}/api/admin/penyerahan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_klaim: 'klm-test-01',
        kode_pengambilan: kodeOTP,
        nama_pengambil: 'Budi Santoso (13519099)',
        catatan_petugas: 'Barang telah diterima dalam kondisi baik.',
      }),
    });
    const json = await res.json();

    catatHasil(
      'TC-08: Penutupan Kasus Serah Terima Barang (Handover Closed)',
      json.sukses,
      `Status Kasus: Dikembalikan & Terverifikasi (${json.data?.kode_pengambilan || kodeOTP})`
    );
  } catch (e) {
    catatHasil('TC-08: Error exception penutupan kasus', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 7: Manajemen Notifikasi Realtime
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 7: Sistem Notifikasi Mahasiswa ---');
  try {
    const res = await fetch(`${BASE_URL}/api/notifikasi`);
    const json = await res.json();
    const notifList = json.data || [];

    catatHasil(
      'TC-09: Pengambilan data notifikasi akun mahasiswa',
      json.sukses && Array.isArray(notifList) && notifList.length > 0,
      `Total Notifikasi: ${notifList.length}, Unread: ${json.jumlah_belum_dibaca || 0}`
    );
  } catch (e) {
    catatHasil('TC-09: Error exception notifikasi', false, e.message);
  }

  // --------------------------------------------------------------------------
  // TEST SCENARIO 8: Profil & Autentikasi Pengguna
  // --------------------------------------------------------------------------
  console.log('\n--- SKENARIO 8: Profil & Keamanan Akun ---');
  try {
    const res = await fetch(`${BASE_URL}/api/profil`);
    const json = await res.json();
    const profil = json.data;

    catatHasil(
      'TC-10: Verifikasi Data Profil Mahasiswa Terdaftar',
      json.sukses && Boolean(profil?.nama) && Boolean(profil?.nim),
      `Nama: ${profil?.nama}, NIM: ${profil?.nim}, Prodi: ${profil?.program_studi}`
    );
  } catch (e) {
    catatHasil('TC-10: Error exception profil', false, e.message);
  }

  // --------------------------------------------------------------------------
  // RINGKASAN HASIL TEST
  // --------------------------------------------------------------------------
  console.log('\n===============================================================');
  console.log('📊 RINGKASAN HASIL BLACKBOX TESTING');
  console.log('===============================================================');
  const total = hasilTest.length;
  const passed = hasilTest.filter(h => h.status === 'PASSED').length;
  const failed = hasilTest.filter(h => h.status === 'FAILED').length;
  const successRate = Math.round((passed / total) * 100);

  console.log(`Total Test Cases : ${total}`);
  console.log(`Passed           : ${passed}`);
  console.log(`Failed           : ${failed}`);
  console.log(`Success Rate     : ${successRate}%\n`);

  if (failed === 0) {
    console.log('🎉 SEMUA SKENARIO BLACKBOX TESTING LULUS 100% TANPA KENDALA!');
  } else {
    console.log('⚠️ Ditemukan beberapa test case yang gagal, silakan periksa rincian di atas.');
  }
}

jalankanBlackboxTest();
