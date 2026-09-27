// Vercel Serverless Function: OCR Handwriting Transcription using OpenRouter Vision Models
// Priority: stealth/space-bunny-alpha -> dots-studio/dots-3-note-preview:free -> openrouter/free
// Automatically rotates across 8 API keys from 9router

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

const OCR_MODELS = (process.env.OPENROUTER_OCR_MODELS || 'stealth/space-bunny-alpha,dots-studio/dots-3-note-preview:free,openrouter/free')
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

  const { image, mimeType = 'image/jpeg' } = req.body || {};

  if (!image) {
    return res.status(400).json({ error: 'Sila sertakan data imej (Base64).' });
  }

  const imageUrl = image.startsWith('data:') ? image : `data:${mimeType};base64,${image}`;

  const promptText = `Transkripsikan semua perkataan bertulis tangan Bahasa Melayu yang terdapat pada gambar kertas karangan ini.
Peraturan:
1. Salin perkataan secara tepat mengikut ejaan asal murid.
2. Kekalkan susunan perenggan karangan.
3. Jangan tambah sebarang ulasan, jangan tambah pengenalan atau penutup.
4. Pulangkan teks karangan sahaja.`;

  const keys = getKeys();
  let lastError = 'Ralat sambungan OpenRouter';

  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    const currentKey = keys[keyIdx];

    for (const model of OCR_MODELS) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 18000);

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentKey}`,
            'HTTP-Referer': 'https://pksk2026.vercel.app',
            'X-Title': 'PKSK Simulator - Handwriting OCR'
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: promptText },
                  { type: 'image_url', image_url: { url: imageUrl } }
                ]
              }
            ],
            temperature: 0.1,
            max_tokens: 1500
          })
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          let transcribedText = data.choices?.[0]?.message?.content || '';

          // Remove potential wrappers
          transcribedText = transcribedText
            .replace(/^```(?:markdown|text)?\n/i, '')
            .replace(/```$/i, '')
            .replace(/^(Teks yang terdapat dalam gambar adalah:?|Berikut adalah teks karangan:?)\s*/i, '')
            .trim();

          if (transcribedText) {
            return res.status(200).json({
              success: true,
              transcribedText,
              modelUsed: model,
              keyIndex: keyIdx + 1
            });
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData.error?.message || `HTTP ${response.status}`;
          console.warn(`Key #${keyIdx+1} Model ${model} failed (${response.status}):`, lastError);
        }
      } catch (err) {
        lastError = err.name === 'AbortError' ? 'Masa menunggu transkripsi tamat (18s)' : err.message;
        console.warn(`Key #${keyIdx+1} Model ${model} error:`, lastError);
      }
    }
  }

  return res.status(502).json({
    success: false,
    error: `Transkripsi gagal setelah mencuba semua kunci API & model: ${lastError}`
  });
}
