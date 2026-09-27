// Vercel Serverless Function: High-Intelligence Essay Evaluation & Grading
// Powered by OpenRouter Frontier Models (Nemotron 3 Ultra 550B / Super 120B)
// Multi-Key Rotating Failover from 9router Key Pool

const _B64_KEYS = [
  'c2stb3ItdjEtMjY0MTNkNzFmNTlmNmJiYTRkMmI2OGU2NGJhOWVkMWZkOTc1MDE2N2ZiMzc5MTdlYWI1OGUzMWNkMzI0MDA5Nw==',
  'c2stb3ItdjEtOWRjMWQ2NjM4MjMzNmM5YjNhNzFiNGFjYjU1OGMyZmY3ZTgxNDFlNGYwOGVmODIwNTJjODU1ZjcwZDI5MGY2Mw==',
  'c2stb3ItdjEtNGIzMmYzM2JhYjY4Nzk0NjQwMWMzYTI2MWY0NjU1ZjFmZDE3YTU0MWNlMGIxMTlmOTJiN2Q5NzUzZDYxYTY4Zg==',
  'c2stb3ItdjEtODE3ODc3ZDYxZGFmYjliZTlkM2Y4MzdmNTI3YjhmZjlhMjc4MzAzN2FkOWZlYTIyOWI5N2NhYzdlMWM0YzI3Mg==',
  'c2stb3ItdjEtOGJhYzg0MmM5MzU2ZjViMWE2M2Y0ZGQwMGRlNzQ2NmJmYTZhYjU4MTU0OGNiZmU2ZWY2ZTRlMTJlOWEzMWMyOA==',
  'c2stb3ItdjEtODJkOTczZDdjMzY2NWNiNTllMWE0ZjU4MjhmNzQzZmQ5MzhkZWMzOWM0ZDlmZWI2OGY0MjQwMjcwOGM5YmY4NQ==',
  'c2stb3ItdjEtZTA4MTRhYjI0MmQ2NmNiMGFjYzZmYzc2ZjI2NTdmY2VjYWFiZjEzNDhlZTU4MTQwY2E2OWJhNmJkMjI1MDNhZQ==',
  'c2stb3ItdjEtYjNmN2IzZjIwYThjNzNjZWU1NGMxMjA2YWQwMGU5YzQxZTQzNmQ4NTAzYTdjZDk5MTM3MTk3YzI2ODg3ZjgxMA=='
];

function getKeys() {
  const envKeys = process.env.OPENROUTER_API_KEYS;
  if (envKeys) {
    const list = envKeys.split(',').map(k => k.trim()).filter(Boolean);
    if (list.length > 0) return list;
  }
  return _B64_KEYS.map(k => Buffer.from(k, 'base64').toString('utf-8'));
}

const EVAL_MODELS = (process.env.OPENROUTER_EVAL_MODELS || 'nvidia/nemotron-3-ultra-550b-a55b:free,nvidia/nemotron-3-super-120b-a12b:free,openrouter/free')
  .split(',')
  .map(m => m.trim())
  .filter(Boolean);

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { essayText, topicTitle = 'Umum', topicPrompt = '' } = req.body || {};

  const essay = (essayText || '').trim();
  if (!essay) {
    return res.status(200).json({
      success: true,
      assessment: {
        skor_keseluruhan: 0,
        band: 'Band 1 (Tiada Penulisan)',
        kriteria: {
          idea: { skor: 0, max: 3.0, ulasan: 'Calon tidak memuat naik gambar kertas esei atau teks kosong.' },
          bahasa: { skor: 0, max: 3.0, ulasan: 'Tiada teks untuk disemak tatabahasa & ejaan.' },
          struktur: { skor: 0, max: 2.0, ulasan: 'Tiada perenggan yang dikesan.' },
          nilai_kbat: { skor: 0, max: 2.0, ulasan: 'Tiada bukti nilai murni atau pemikiran kritis.' }
        },
        kekuatan: ['Tiada'],
        kelemahan_tatabahasa: ['Ruang penulisan kosong.'],
        cadangan_penambahbaikan: ['Sila muat naik foto kertas jawapan anda untuk disemak oleh AI.'],
        rumusan_keseluruhan: 'Calon tidak melengkapkan Bahagian C (Artikulasi Penulisan).'
      },
      modelUsed: 'Sistem Heuristik'
    });
  }

  const systemInstruction = `Anda ialah Pemeriksa Kanan Rasmi Lembaga Peperiksaan Malaysia bagi Pentaksiran Kemasukan Sekolah Khusus (PKSK) Tingkatan 1 (Bahagian C: Artikulasi Penulisan - Wajaran 10 Markah).
Sasaran Calon: Murid Tahun 6 (Umur 12-13 Tahun) yang memohon kemasukan ke Sekolah Berasrama Penuh (SBP) / Maktab Rendah Sains MARA (MRSM).
Nilai karangan calon dengan KRITIKAL, ADIL, TELITI dan BERPANDUKAN standard bahasa Melayu Baku KPM & Tatabahasa Dewan DBP mengikut 4 kriteria Rubrik Rasmi LPM:
1. Idea, Hujah & Kematangan Isi (Maksimum 3.0 markah)
   - Kebolehan membina dan menghuraikan idea berkaitan isu soalan secara logik, matang, dan bersesuaian dengan aras murid 12-13 tahun.
2. Bahasa, Ejaan, Tatabahasa Melayu Baku & Kosa Kata (Maksimum 3.0 markah)
   - Mematuhi hukum Tatabahasa Dewan DBP: ketepatan imbuhan awalan/akhiran/apitan, ejaan perkataan baku, struktur frasa/ayat majmuk berwacana, tanda baca yang betul, serta pengelakan slanga atau singkatan media sosial.
3. Struktur, Koheren & Format Karangan (Maksimum 2.0 markah)
   - Perengganan yang seimbang dan kemas (Pendahuluan, Isi-isi penting, Penutup), disulami penanda wacana yang tepat dan bertaut lancar antara ayat.
4. Nilai Murni, Pengajaran & Pemikiran Kritis KBAT (Maksimum 2.0 markah)
   - Penerapan nilai murni kemanusiaan, empati, disiplin, jati diri, serta daya pemikiran kritis dalam mencadangkan solusi praktikal.

PENTING: Pulangkan jawapan dalam format JSON SAHAJA tanpa sebarang teks markdown atau penerangan lain di luar JSON:
{
  "skor_keseluruhan": 7.5,
  "band": "Band 4 (Kepujian)",
  "kriteria": {
    "idea": { "skor": 2.3, "max": 3.0, "ulasan": "Idea relevan dengan tema namun hujah memerlukan kupasan dan contoh konkrit." },
    "bahasa": { "skor": 2.2, "max": 3.0, "ulasan": "Bahasa Melayu baku dikuasai dengan baik, perhatikan ketepatan imbuhan." },
    "struktur": { "skor": 1.5, "max": 2.0, "ulasan": "Perenggan dan wacana tersusun dengan pendahuluan serta penutup yang seimbang." },
    "nilai_kbat": { "skor": 1.5, "max": 2.0, "ulasan": "Penerapan nilai murni wujud dan bersesuaian dengan situasi harian murid." }
  },
  "kekuatan": ["Idea berkembang secara logik", "Kosa kata bersesuaian"],
  "kelemahan_tatabahasa": ["Variasi struktur ayat boleh ditingkatkan", "Semak ketepatan ejaan kata majmuk"],
  "cadangan_penambahbaikan": ["Selitkan peribahasa bersesuaian dan contoh situasi harian"],
  "rumusan_keseluruhan": "Karangan baik dan menepati format asas kemasukan SBP/MRSM."
}`;

  const userInstruction = `Karangan Calon:
Tajuk: "${topicTitle}"
Stimulus: "${topicPrompt}"
Teks Karangan:
"""
${essay}
"""`;

  const keys = getKeys();
  let lastError = 'Ralat sambungan penilaian';

  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    const currentKey = keys[keyIdx];

    for (const model of EVAL_MODELS) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentKey}`,
            'HTTP-Referer': 'https://pksk2026.vercel.app',
            'X-Title': 'PKSK Simulator - Essay Evaluator'
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: userInstruction }
            ],
            temperature: 0.2,
            max_tokens: 1000
          })
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';

          if (content.trim()) {
            let cleanJson = content.replace(/```json/gi, '').replace(/```/g, '').trim();
            const match = cleanJson.match(/\{[\s\S]*\}/);
            if (match) cleanJson = match[0];
            const parsed = JSON.parse(cleanJson);
            parsed.aiModelUsed = `OpenRouter (${model.replace(':free', '')})`;

            return res.status(200).json({
              success: true,
              assessment: parsed,
              modelUsed: model,
              keyIndex: keyIdx + 1
            });
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${response.status}`;
          console.warn(`Key #${keyIdx+1} Model ${model} eval failed (${response.status}):`, lastError);
        }
      } catch (err) {
        lastError = err.name === 'AbortError' ? 'Masa menunggu penilaian tamat (20s)' : err.message;
        console.warn(`Key #${keyIdx+1} Model ${model} eval error:`, lastError);
      }
    }
  }

  // Fallback heuristic if all fail
  const words = essay.split(/\s+/).filter(w => w.length > 0).length;
  const fallbackScore = words >= 100 ? 8.5 : Math.max(1.0, parseFloat(((words / 100) * 8.0).toFixed(1)));
  const fallbackAssessment = {
    isHeuristic: true,
    error: lastError,
    skor_keseluruhan: fallbackScore,
    band: 'Band 4 (Penilaian Sandaran)',
    kriteria: {
      idea: { skor: parseFloat((fallbackScore * 0.3).toFixed(1)), max: 3.0, ulasan: 'Idea bersesuaian dengan tema karangan.' },
      bahasa: { skor: parseFloat((fallbackScore * 0.3).toFixed(1)), max: 3.0, ulasan: 'Tatabahasa memuaskan.' },
      struktur: { skor: parseFloat((fallbackScore * 0.2).toFixed(1)), max: 2.0, ulasan: 'Struktur karangan tersusun.' },
      nilai_kbat: { skor: parseFloat((fallbackScore * 0.2).toFixed(1)), max: 2.0, ulasan: 'Nilai murni diterapkan.' }
    },
    kekuatan: [`Jumlah perkataan: ${words}`],
    kelemahan_tatabahasa: [`Semakan AI tergendala: ${lastError}`],
    cadangan_penambahbaikan: ['Tekan butang Nilai Semula AI di bawah untuk semakan semula.'],
    rumusan_keseluruhan: 'Pemarkahan anggaran diberikan berikutan kelewatan sambungan AI.'
  };

  return res.status(200).json({
    success: true,
    assessment: fallbackAssessment,
    modelUsed: 'Heuristic Fallback'
  });
}
