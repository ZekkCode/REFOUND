/**
 * Modul Embedding & Kemiripan Vektor (Vector Cosine Similarity)
 */

import { geminiEmbedText, isGeminiTersedia } from './gemini';

/**
 * Menghitung cosine similarity antara dua vektor matematika:
 * Cosine Similarity = (A . B) / (||A|| * ||B||)
 * Menghasilkan nilai 0.0 s.d. 1.0
 */
export function hitungCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0 || vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.max(0, Math.min(1, Number(similarity.toFixed(4))));
}

/**
 * Menghasilkan embedding vektor untuk teks laporan barang
 * Jika Gemini API aktif, menggunakan text-embedding-004.
 * Jika tidak aktif / error, menghasilkan pseudo-embedding berbasis hashing token lokal (aman demo).
 */
export async function buatEmbeddingTeks(teks: string): Promise<number[]> {
  if (isGeminiTersedia()) {
    try {
      const liveVec = await geminiEmbedText(teks);
      if (liveVec && liveVec.length > 0) {
        return liveVec;
      }
    } catch (e) {
      console.warn('Gemini embedding error, beralih ke fallback lokal:', e);
    }
  }

  // Fallback Deterministic Local Vector (768 dimensi) untuk demo tanpa API Key
  return generateDeterministicLocalVector(teks, 768);
}

/**
 * Helper deterministic vector hashing lokal untuk mode offline / demo
 */
function generateDeterministicLocalVector(input: string, dimensions: number = 768): number[] {
  const vector = new Array(dimensions).fill(0);
  const cleanInput = input.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const words = cleanInput.split(/\s+/).filter(Boolean);

  for (let wIdx = 0; wIdx < words.length; wIdx++) {
    const word = words[wIdx];
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0;
    }

    const pos = Math.abs(hash) % dimensions;
    vector[pos] += 1.0 / (wIdx + 1);
  }

  // Normalisasi L2 norm
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (norm > 0) {
    for (let i = 0; i < dimensions; i++) {
      vector[i] = Number((vector[i] / norm).toFixed(6));
    }
  }

  return vector;
}
