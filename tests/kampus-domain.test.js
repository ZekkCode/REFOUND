/**
 * REFOUND - UTM Campus Domain Validation Unit Test
 */

const assert = require('assert');

function apakahEmailKampus(email) {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return cleanEmail.endsWith('@trunojoyo.ac.id') || cleanEmail.endsWith('.trunojoyo.ac.id');
}

console.log('====================================================');
console.log('🧪 PENGUJIAN VALIDASI DOMAIN KAMPUS TRUNOJOYO.AC.ID');
console.log('====================================================\n');

const testCases = [
  // Kasus Valid (Mahasiswa & Sivitas Akademika UTM)
  { email: 'budi.santoso@student.trunojoyo.ac.id', expected: true, desc: 'Email mahasiswa student.trunojoyo.ac.id' },
  { email: 'dosen.pembimbing@trunojoyo.ac.id', expected: true, desc: 'Email dosen/tendik trunojoyo.ac.id' },
  { email: 'lab.tif@ft.trunojoyo.ac.id', expected: true, desc: 'Subdomain fakultas ft.trunojoyo.ac.id' },
  { email: 'MAHASISWA@STUDENT.TRUNOJOYO.AC.ID', expected: true, desc: 'Huruf besar (case-insensitive)' },
  { email: '  user@trunojoyo.ac.id  ', expected: true, desc: 'Email dengan leading/trailing space' },

  // Kasus Tidak Valid (Domain Luar / Upaya Spoofing)
  { email: 'user@gmail.com', expected: false, desc: 'Email publik Gmail' },
  { email: 'user@yahoo.co.id', expected: false, desc: 'Email publik Yahoo' },
  { email: 'hacker@trunojoyo.com', expected: false, desc: 'Domain bukan .ac.id' },
  { email: 'penipu@student.trunojoyo.ac.id.fake.com', expected: false, desc: 'Spoofing subdomain fake.com di akhir' },
  { email: 'budi@evil-trunojoyo.ac.id', expected: false, desc: 'Prefix domain palsu' },
  { email: '', expected: false, desc: 'String kosong' },
  { email: null, expected: false, desc: 'Nilai null' },
  { email: undefined, expected: false, desc: 'Nilai undefined' },
];

let lulus = 0;
let gagal = 0;

for (const tc of testCases) {
  const result = apakahEmailKampus(tc.email);
  const ok = result === tc.expected;
  if (ok) {
    lulus++;
    console.log(`✅ [LULUS] ${tc.desc} (${tc.email}) -> ${result}`);
  } else {
    gagal++;
    console.error(`❌ [GAGAL] ${tc.desc} (${tc.email}) -> Harusnya ${tc.expected}, hasil ${result}`);
  }
}

console.log(`\nHasil: ${lulus} Lulus, ${gagal} Gagal.`);
assert.strictEqual(gagal, 0, 'Semua pengujian domain kampus harus lulus 100%!');
console.log('🎉 VALIDASI DOMAIN KAMPUS UTM 100% VALID & AMAN!\n');
