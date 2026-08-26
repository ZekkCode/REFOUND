/**
 * REFOUND - AI Matching Engine & Score Fusion Pipeline Test Suite
 */

const assert = require('assert');

// Jalankan tes kalkulasi formula matematis AI
function testScoreFusion() {
  console.log('Testing Score Fusion Equation...');
  
  // Rumus: 0.45 * Teks + 0.30 * Visual + 0.15 * Lokasi + 0.10 * Waktu
  const skorTeks = 0.85;
  const skorVisual = 0.70;
  const zonaSama = true; // 1.0
  const selisihJam = 12; // 1 - 12/72 = 0.8333
  
  const skorLokasi = zonaSama ? 1.0 : 0.5;
  const skorWaktu = Math.max(0, 1 - selisihJam / 72);
  
  const skorAkhir = Number((0.45 * skorTeks + 0.30 * skorVisual + 0.15 * skorLokasi + 0.10 * skorWaktu).toFixed(4));
  
  console.log(`- Skor Teks   : ${skorTeks}`);
  console.log(`- Skor Visual : ${skorVisual}`);
  console.log(`- Skor Lokasi : ${skorLokasi}`);
  console.log(`- Skor Waktu  : ${skorWaktu.toFixed(4)}`);
  console.log(`- Skor Akhir  : ${skorAkhir}`);
  
  assert(skorAkhir >= 0.7 && skorAkhir <= 0.9, 'Skor akhir harus dalam rentang valid.');
  console.log('✅ Score Fusion Formula PASSED\n');
}

function testCosineSimilarity() {
  console.log('Testing Cosine Distance...');
  
  function cosineSim(vecA, vecB) {
    let dot = 0, nA = 0, nB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      nA += vecA[i] * vecA[i];
      nB += vecB[i] * vecB[i];
    }
    return dot / (Math.sqrt(nA) * Math.sqrt(nB));
  }
  
  const vec1 = [1, 0, 1, 0];
  const vec2 = [1, 0, 1, 0];
  const vec3 = [0, 1, 0, 1];
  
  assert(Math.abs(cosineSim(vec1, vec2) - 1.0) < 0.001, 'Vektor identik harus bernilai 1.0');
  assert(Math.abs(cosineSim(vec1, vec3) - 0.0) < 0.001, 'Vektor ortogonal harus bernilai 0.0');
  
  console.log('✅ Cosine Similarity Math PASSED\n');
}

function testDeterministicSemanticEvaluation() {
  console.log('Testing Semantic Fallback Evaluation...');
  
  const secretNotes = 'Stiker Batman warna hitam di pojok casing belakang dekat port charger';
  const goodAnswer = 'Ada stiker batman hitam di pojok belakang dekat port charger laptop';
  const badAnswer = 'Laptop warna abu abu polos tanpa stiker';
  
  function evalAnswer(secret, answer) {
    const sClean = secret.toLowerCase();
    const aClean = answer.toLowerCase();
    const words = sClean.split(/\s+/).filter(w => w.length > 3);
    let matches = 0;
    for (const w of words) {
      if (aClean.includes(w)) matches++;
    }
    const ratio = matches / words.length;
    return ratio;
  }
  
  const goodScore = evalAnswer(secretNotes, goodAnswer);
  const badScore = evalAnswer(secretNotes, badAnswer);
  
  console.log(`- Jawaban Pemilik Asli  -> Keyword Overlap Ratio: ${(goodScore * 100).toFixed(1)}%`);
  console.log(`- Jawaban Palsu / Umum  -> Keyword Overlap Ratio: ${(badScore * 100).toFixed(1)}%`);
  
  assert(goodScore > 0.6, 'Jawaban pemilik asli harus menghasilkan rasio tinggi');
  assert(badScore < 0.3, 'Jawaban salah harus menghasilkan rasio rendah');
  
  console.log('✅ Semantic Deterministic Fallback PASSED\n');
}

async function runAll() {
  console.log('====================================================');
  console.log('🤖 AI MATCHING & SEMANTIC PIPELINE UNIT TEST');
  console.log('====================================================\n');
  
  testScoreFusion();
  testCosineSimilarity();
  testDeterministicSemanticEvaluation();
  
  console.log('🎉 SEMUA TEST AI PIPELINE BERHASIL 100%!');
}

runAll();
