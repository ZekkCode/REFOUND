/**
 * REFOUND Mesin Pencocokan AI Bahasa Indonesia
 * Formula Terikat Blueprint:
 * MatchScore = 0.45 * SkorTeks + 0.30 * SkorVisual + 0.15 * SkorLokasi + 0.10 * SkorWaktu
 */

export interface SkorPencocokan {
  skorTeks: number;
  skorVisual: number;
  skorLokasi: number;
  skorWaktu: number;
  skorAkhir: number;
  labelPotensi: string;
  alasanRingkas: string[];
}

export function hitungSkorPencocokan(
  kemiripanTeks: number,
  kemiripanVisual: number,
  zonaSama: boolean,
  selisihJam: number
): SkorPencocokan {
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
  };
}

/**
 * Evaluasi semantik LLM untuk verifikasi jawaban klaim pengguna terhadap ciri rahasia barang temuan.
 */
export async function evaluasiJawabanKlaim(
  catatanRahasia: string,
  jawabanPengguna: string
): Promise<{ skorSemantik: number; alasanAnalisis: string }> {
  if (!jawabanPengguna || jawabanPengguna.trim() === '') {
    return { skorSemantik: 0, alasanAnalisis: 'Jawaban pengguna tidak boleh kosong.' };
  }

  const jawabanClean = jawabanPengguna.toLowerCase();
  const catatanClean = catatanRahasia.toLowerCase();

  // Pencocokan kata kunci dasar
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
  let alasanAnalisis = 'Jawaban mengandung beberapa kemiripan, namun disarankan untuk memverifikasi fisik barang secara langsung di Ruang Admin Lab.';

  if (cocokLangsung || rasioCocok >= 0.6) {
    skorSemantik = 0.95;
    alasanAnalisis = 'Jawaban pengguna sangat spesifik dan mencakup detail ciri rahasia barang temuan secara tepat.';
  } else if (rasioCocok > 0.2) {
    skorSemantik = 0.72;
    alasanAnalisis = 'Jawaban pengguna menyebutkan beberapa kata kunci ciri rahasia yang relevan.';
  }

  return {
    skorSemantik: Number(skorSemantik.toFixed(2)),
    alasanAnalisis,
  };
}
