/**
 * Modul Evaluasi Semantik Klaim Rahasia & Usulan Pertanyaan Admin
 * Menggunakan Gemini 2.5 Flash / 1.5 Flash via Google AI Studio API
 */

import { geminiGenerateContent, isGeminiTersedia } from './gemini';

export interface HasilEvaluasiSemantik {
  skorSemantik: number;
  alasanAnalisis: string;
  rekomendasi: 'setujui' | 'tinjau_manual' | 'tolak';
  modeEngine: 'live_gemini' | 'fallback_local';
}

/**
 * Membandingkan makna semantik antara Catatan Rahasia Admin vs Jawaban Klaim Mahasiswa
 * Catatan rahasia TIDAK PERNAH dikirim ke client/mahasiswa.
 */
export async function evaluasiSemantikKlaimAI(
  catatanRahasia: string,
  jawabanPengguna: string
): Promise<HasilEvaluasiSemantik> {
  if (!jawabanPengguna || jawabanPengguna.trim() === '') {
    return {
      skorSemantik: 0,
      alasanAnalisis: 'Jawaban pengguna tidak boleh kosong.',
      rekomendasi: 'tolak',
      modeEngine: 'fallback_local',
    };
  }

  // 1. Jika Gemini API Key tersedia, lakukan evaluasi LLM Semantic Reasoning
  if (isGeminiTersedia()) {
    try {
      const prompt = `
Anda adalah sistem AI Verifikator Klaim Barang Hilang di Laboratorium Kampus (REFOUND).
Tugas Anda: Bandingkan jawaban klaim dari mahasiswa dengan catatan ciri rahasia barang yang dicatat oleh Admin Lab.
PENTING: Jangan pernah membocorkan catatan rahasia secara langsung di respon!

Catatan Rahasia Barang (Hanya untuk Evaluasi): "${catatanRahasia}"
Jawaban Klaim Mahasiswa: "${jawabanPengguna}"

Analisis kecocokan secara semantik:
- Berikan nilai skor semantik dari 0.00 hingga 1.00.
- Berikan alasan ringkas (1-2 kalimat) yang objektif untuk pertimbangan Admin Lab.
- Berikan rekomendasi: "setujui" (jika skor >= 0.8), "tinjau_manual" (jika 0.4 <= skor < 0.8), atau "tolak" (jika skor < 0.4).

Format output WAJIB JSON persis seperti ini:
{
  "skor_semantik": 0.85,
  "alasan": "Mahasiswa menyebutkan ciri spesifik stiker dan warna yang sesuai dengan catatan rahasia.",
  "rekomendasi": "setujui"
}
`;

      const responseText = await geminiGenerateContent(prompt, true);
      if (responseText) {
        const parsed = JSON.parse(responseText.replace(/```json|```/g, '').trim());
        const skor = typeof parsed.skor_semantik === 'number' ? Math.max(0, Math.min(1, parsed.skor_semantik)) : 0.7;
        const rekomendasi = ['setujui', 'tinjau_manual', 'tolak'].includes(parsed.rekomendasi)
          ? parsed.rekomendasi
          : (skor >= 0.8 ? 'setujui' : skor >= 0.4 ? 'tinjau_manual' : 'tolak');

        return {
          skorSemantik: Number(skor.toFixed(2)),
          alasanAnalisis: parsed.alasan || 'Evaluasi semantik Gemini selesai.',
          rekomendasi,
          modeEngine: 'live_gemini',
        };
      }
    } catch (err) {
      console.warn('[Gemini LLM Eval] Error, otomatis fallback ke algoritma lokal:', err);
    }
  }

  // 2. Fallback Deterministik Lokal (Aman Demo & Anti-Crash)
  const jawabanClean = jawabanPengguna.toLowerCase();
  const catatanClean = catatanRahasia.toLowerCase();

  const kataRahasia = catatanClean.split(/\s+/).filter((w) => w.length > 3);
  let matchCount = 0;

  for (const kata of kataRahasia) {
    if (jawabanClean.includes(kata)) {
      matchCount++;
    }
  }

  const rasioCocok = kataRahasia.length > 0 ? matchCount / kataRahasia.length : 0;
  const cocokLangsung = jawabanClean.includes(catatanClean);

  let skorSemantik = 0.4;
  let alasanAnalisis = 'Jawaban mengandung beberapa kemiripan kata kunci. Admin Lab disarankan meninjau secara manual.';
  let rekomendasi: 'setujui' | 'tinjau_manual' | 'tolak' = 'tinjau_manual';

  if (cocokLangsung || rasioCocok >= 0.6) {
    skorSemantik = 0.95;
    alasanAnalisis = 'Jawaban pengguna sangat spesifik dan mencakup detail ciri rahasia barang temuan secara tepat.';
    rekomendasi = 'setujui';
  } else if (rasioCocok > 0.2) {
    skorSemantik = 0.72;
    alasanAnalisis = 'Jawaban pengguna menyebutkan beberapa kata kunci ciri rahasia yang relevan.';
    rekomendasi = 'tinjau_manual';
  } else {
    skorSemantik = 0.25;
    alasanAnalisis = 'Jawaban kurang mencerminkan ciri khusus yang dicatat admin.';
    rekomendasi = 'tolak';
  }

  return {
    skorSemantik: Number(skorSemantik.toFixed(2)),
    alasanAnalisis,
    rekomendasi,
    modeEngine: 'fallback_local',
  };
}

/**
 * Usulkan pertanyaan verifikasi kepemilikan untuk Admin Lab
 */
export async function usulkanPertanyaanVerifikasiAI(
  kategori: string,
  deskripsiBarang: string = ''
): Promise<string[]> {
  if (isGeminiTersedia()) {
    try {
      const prompt = `
Buatkan 3 pertanyaan verifikasi kepemilikan yang tajam untuk barang temuan di lab kampus:
Kategori: ${kategori}
Deskripsi publik: ${deskripsiBarang || 'Umum'}

Tujuannya agar mahasiswa yang mengaku pemilik bisa membuktikan kepemilikannya tanpa membocorkan ciri ke publik.
Kembalikan HANYA array JSON string:
["pertanyaan 1", "pertanyaan 2", "pertanyaan 3"]
`;
      const responseText = await geminiGenerateContent(prompt, true);
      if (responseText) {
        const parsed = JSON.parse(responseText.replace(/```json|```/g, '').trim());
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 3);
        }
      }
    } catch {
      // Fallback
    }
  }

  // Fallback katalog statis
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

  const key = Object.keys(usulan).find((k) => kategori.includes(k)) || 'Elektronik';
  return usulan[key];
}
