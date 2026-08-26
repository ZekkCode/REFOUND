/**
 * REFOUND AI Engine & Fail-Safe Adapter Pattern
 * 
 * Penggunaan AI di REFOUND:
 * 1. AI Vector Similarity & Score Fusion (Pencocokan Kandidat)
 * 2. LLM Semantic Verification (Evaluasi Jawaban Klaim Rahasia) - Google Gemini API
 * 3. LLM Admin Verification Question Suggester (Usulan Pertanyaan Admin) - Google Gemini API
 * 
 * Mekanisme Backup / Callback Fail-Safe:
 * - Apabila API Key (Gemini/OpenAI) tidak dikonfigurasi, kuota habis, atau error jaringan,
 *   sistem secara otomatis (callback) beralih ke Mesin Fallback Deterministik berbasis
 *   Aturan & Kemiripan Kata Kunci Lokal (Local Keyword & String Overlap).
 * - Keputusan akhir SELALU tetap di tangan Admin Lab (Admin Manual Override).
 */

import { isGeminiTersedia } from './gemini';
import { buatEmbeddingTeks, hitungCosineSimilarity } from './embedding';
import { evaluasiSemantikKlaimAI, usulkanPertanyaanVerifikasiAI } from './verifikasi-semantik';

export interface SkorPencocokan {
  skorTeks: number;
  skorVisual: number;
  skorLokasi: number;
  skorWaktu: number;
  skorAkhir: number;
  labelPotensi: string;
  alasanRingkas: string[];
  modeEngine: 'live_api' | 'fallback_local';
}

export interface StatusAdapterAI {
  provider: string;
  isApiKeyReady: boolean;
  activeMode: 'live_api' | 'fallback_local';
  deskripsiStatus: string;
}

/**
 * Memeriksa status kesiapan API Key dan menentukan mode engine yang aktif.
 */
export function dapatkanStatusAdapterAI(): StatusAdapterAI {
  const provider = process.env.AI_PROVIDER || 'gemini';
  const openAiKey = process.env.OPENAI_API_KEY;
  const isGeminiReady = isGeminiTersedia();

  const isReady =
    (provider === 'gemini' && isGeminiReady) ||
    (provider === 'openai' && Boolean(openAiKey && !openAiKey.includes('your-') && openAiKey.length > 10));

  if (isReady) {
    return {
      provider,
      isApiKeyReady: true,
      activeMode: 'live_api',
      deskripsiStatus: `AI Engine Aktif (Live API: ${provider.toUpperCase()} - Google AI Studio Free Tier)`,
    };
  }

  return {
    provider,
    isApiKeyReady: false,
    activeMode: 'fallback_local',
    deskripsiStatus: 'AI Engine Aktif (Mode Cadangan / Fallback Deterministik - Aman Demo)',
  };
}

/**
 * Menghitung skor pencocokan laporan dengan formula Score Fusion.
 * Formula: MatchScore = 0.45 * Teks + 0.30 * Visual + 0.15 * Lokasi + 0.10 * Waktu
 */
export function hitungSkorPencocokan(
  kemiripanTeks: number,
  kemiripanVisual: number,
  zonaSama: boolean,
  selisihJam: number
): SkorPencocokan {
  const statusAdapter = dapatkanStatusAdapterAI();

  const skorTeks = Math.max(0, Math.min(1, kemiripanTeks));
  const skorVisual = Math.max(0, Math.min(1, kemiripanVisual));
  const skorLokasi = zonaSama ? 1.0 : 0.5;
  const skorWaktu = Math.max(0, Number((1 - selisihJam / 72).toFixed(4)));

  const skorAkhir = Number(
    (
      0.45 * skorTeks +
      0.30 * skorVisual +
      0.15 * skorLokasi +
      0.10 * skorWaktu
    ).toFixed(4)
  );

  const alasanRingkas: string[] = [];
  if (skorTeks >= 0.7) alasanRingkas.push('Deskripsi barang sangat mirip');
  if (skorVisual >= 0.7) alasanRingkas.push('Kemiripan visual foto tinggi');
  if (zonaSama) alasanRingkas.push('Zona lokasi kejadian sama persis');
  if (selisihJam <= 24) alasanRingkas.push('Rentang waktu penemuan & kehilangan dekat');

  let labelPotensi = 'Potensi Rendah';
  if (skorAkhir >= 0.8) {
    labelPotensi = 'Potensi Kecocokan Tinggi';
  } else if (skorAkhir >= 0.6) {
    labelPotensi = 'Potensi Kecocokan Sedang';
  }

  return {
    skorTeks,
    skorVisual,
    skorLokasi,
    skorWaktu,
    skorAkhir,
    labelPotensi,
    alasanRingkas,
    modeEngine: statusAdapter.activeMode,
  };
}

/**
 * Evaluasi semantik jawaban klaim pengguna terhadap ciri rahasia barang temuan.
 * Mendukung pencocokan otomatis via Live Gemini API atau Callback Fallback Lokal jika API Key tidak tersedia.
 */
export async function evaluasiJawabanKlaim(
  catatanRahasia: string,
  jawabanPengguna: string
): Promise<{ skorSemantik: number; alasanAnalisis: string; modeEngine: 'live_api' | 'fallback_local' }> {
  const hasil = await evaluasiSemantikKlaimAI(catatanRahasia, jawabanPengguna);
  return {
    skorSemantik: hasil.skorSemantik,
    alasanAnalisis: hasil.alasanAnalisis,
    modeEngine: hasil.modeEngine === 'live_gemini' ? 'live_api' : 'fallback_local',
  };
}

/**
 * Usulan pertanyaan verifikasi klaim untuk Admin Lab berdasarkan kategori barang.
 */
export function usulkanPertanyaanVerifikasiAdmin(kategori: string): string[] {
  const usulan: Record<string, string[]> = {
    Elektronik: [
      'Sebutkan warna stiker, ganti nama Bluetooth, atau goresan unik pada bodi barang.',
      'Sebutkan nomor seri (SN), isi stiker belakang, atau gantungan kunci yang terpasang.',
      'Sebutkan warna kabel charger / aksesoris yang ikut tertinggal.',
    ],
    Wadah: [
      'Sebutkan merk, kapasitas (ml), dan stiker/gantian yang menempel pada tumbler/tas.',
      'Sebutkan barang-barang kecil unik yang berada di dalam kompartemen tas/dompet.',
    ],
    Dokumen: [
      'Sebutkan nama lengkap, NIM/NIK, atau tempat tanggal lahir yang tertera pada dokumen.',
      'Sebutkan sampul atau warna map yang membungkus dokumen tersebut.',
    ],
    Aksesoris: [
      'Sebutkan warna frame, stempel merk di bagian dalam gagang, atau ciri fisik khusus.',
    ],
  };

  const kategoriKey = Object.keys(usulan).find((k) => kategori.includes(k));
  return usulan[kategoriKey || 'Elektronik'];
}

// Re-export modul pendukung
export { buatEmbeddingTeks, hitungCosineSimilarity, evaluasiSemantikKlaimAI, usulkanPertanyaanVerifikasiAI };
