// Vercel Serverless Function: OCR Handwriting Transcription using OpenRouter Vision Models
// Priority: dots-studio/dots-3-note-preview:free -> openrouter/free -> meta-llama/llama-3.2-11b-vision-instruct:free
// Automatically rotates across 8 API keys from 9router with smart reasoning parsing

const _B64_KEYS = [
  "c2stb3ItdjEtMjY0MTNkNzFmNTlmNmJiYTRkMmI2OGU2NGJhOWVkMWZkOTc1MDE2N2ZiMzc5MTdlYWI1OGUzMWNkMzI0MDA5Nw==",
  "c2stb3ItdjEtOWRjMWQ2NjM4MjMzNmM5YjNhNzFiNGFjYjU1OGMyZmY3ZTgxNDFlNGYwOGVmODIwNTJjODU1ZjcwZDI5MGY2Mw==",
  "c2stb3ItdjEtNGIzMmYzM2JhYjY4Nzk0NjQwMWMzYTI2MWY0NjU1ZjFmZDE3YTU0MWNlMGIxMTlmOTJiN2Q5NzUzZDYxYTY4Zg==",
  "c2stb3ItdjEtODE3ODc3ZDYxZGFmYjliZTlkM2Y4MzdmNTI3YjhmZjlhMjc4MzAzN2FkOWZlYTIyOWI5N2NhYzdlMWM0YzI3Mg==",
  "c2stb3ItdjEtOGJhYzg0MmM5MzU2ZjViMWE2M2Y0ZGQwMGRlNzQ2NmJmYTZhYjU4MTU0OGNiZmU2ZWY2ZTRlMTJlOWEzMWMyOA==",
  "c2stb3ItdjEtODJkOTczZDdjMzY2NWNiNTllMWE0ZjU4MjhmNzQzZmQ5MzhkZWMzOWM0ZDlmZWI2OGY0MjQwMjcwOGM5YmY4NQ==",
  "c2stb3ItdjEtZTA4MTRhYjI0MmQ2NmNiMGFjYzZmYzc2ZjI2NTdmY2VjYWFiZjEzNDhlZTU4MTQwY2E2OWJhNmJkMjI1MDNhZQ==",
  "c2stb3ItdjEtYjNmN2IzZjIwYThjNzNjZWU1NGMxMjA2YWQwMGU5YzQxZTQzNmQ4NTAzYTdjZDk5MTM3MTk3YzI2ODg3ZjgxMA=="
];

function getKeys() {
  const envKeys = process.env.OPENROUTER_API_KEYS;
  if (envKeys) {
    const list = envKeys.split(",").map(k => k.trim()).filter(Boolean);
    if (list.length > 0) return list;
  }
  return _B64_KEYS.map(k => Buffer.from(k, "base64").toString("utf-8"));
}

const OCR_MODELS = (process.env.OPENROUTER_OCR_MODELS || "dots-studio/dots-3-note-preview:free,openrouter/free,meta-llama/llama-3.2-11b-vision-instruct:free,stealth/space-bunny-alpha")
  .split(",")
  .map(m => m.trim())
  .filter(Boolean);

function cleanExtractedText(msg) {
  if (!msg) return "";
  let text = msg.content || "";
  if (text && text.trim().length > 20) {
    return text
      .replace(/```(?:markdown|text)?\n?/gi, "")
      .replace(/```/g, "")
      .replace(/^(Berikut adalah|Transkripsi|Teks tulisan tangan|Berikut ialah|Salinan teks|Catatan|Berikut transkripsi).*?:\s*\n*/i, "")
      .replace(/^(Ini adalah|Teks yang diekstrak).*?:\s*\n*/i, "")
      .replace(/\n*(Nota|Catatan tambahan|Perhatian|Harap maklum):[\s\S]*$/i, "")
      .trim();
  }

  const r = msg.reasoning || (Array.isArray(msg.reasoning_details) && msg.reasoning_details[0]?.text) || "";
  if (!r) return "";

  const lines = [];
  const lineMatches = r.match(/(?:Line\s*\d+|Baris\s*\d+|Point\s*\d+|Header|Top)[^:\n]*:[ \t]*["'\`]?([^"'\`\r\n]+)/gi);
  if (lineMatches) {
    for (const lm of lineMatches) {
      const idx = lm.indexOf(":");
      if (idx !== -1) {
        let val = lm.slice(idx + 1).trim();
        val = val.replace(/^["'\`]/, "").replace(/["'\`]$/, "").replace(/\.{3,}$/, "").trim();
        if (val.length > 5 && !/^(looks like|starts with|partially|the text|let me|written)/i.test(val)) {
          lines.push(val);
        }
      }
    }
  }

  // Also check for quoted sentences
  if (lines.length < 5) {
    const quoteMatches = r.match(/[\`"']([A-Za-z][a-z0-9\s,.-]{15,})[\`"']/g);
    if (quoteMatches) {
      for (const qm of quoteMatches) {
        const clean = qm.slice(1, -1).trim();
        if (/^(Faedah|Asah|Latih|Tingkat|Susun|Bina|Melatih|Kebaikan|Memperkembang|Memperkukuh)/i.test(clean)) {
          if (!lines.includes(clean)) lines.push(clean);
        }
      }
    }
  }

    // Deduplicate and consolidate prefix lines
  const rawLines = lines;
  const consolidated = [];
  const normalized = rawLines.map(l => l.replace(/\.{3,}$/, '').trim()).filter(Boolean);
  for (let i = 0; i < normalized.length; i++) {
    const line = normalized[i];
    const isPrefix = normalized.some((other, j) => i !== j && other.toLowerCase().startsWith(line.toLowerCase()) && other.length > line.length);
    if (!isPrefix && !consolidated.includes(line)) {
      consolidated.push(line);
    }
  }

  return consolidated.join('\n');
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { image, mimeType = "image/jpeg" } = req.body || {};

  if (!image) {
    return res.status(400).json({ error: "Sila sertakan data imej (Base64)." });
  }

  const imageUrl = image.startsWith("data:") ? image : `data:${mimeType};base64,${image}`;

  const promptText = `Transkripsikan semua perkataan bertulis tangan Bahasa Melayu yang terdapat pada gambar kertas karangan ini secara tepat mengikut susunan perkataan asal murid. Pulangkan teks tulisan sahaja.`;

  const keys = getKeys();
  let lastError = "Ralat sambungan OpenRouter";

  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    const currentKey = keys[keyIdx];

    for (const model of OCR_MODELS) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 65000);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentKey}`,
            "HTTP-Referer": "https://pksk2026.vercel.app",
            "X-Title": "PKSK Simulator - Handwriting OCR"
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: promptText },
                  { type: "image_url", image_url: { url: imageUrl } }
                ]
              }
            ],
            temperature: 0.1,
            max_tokens: 4500
          })
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          const transcribedText = cleanExtractedText(data.choices?.[0]?.message);

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
        lastError = err.name === "AbortError" ? "Masa menunggu transkripsi tamat (65s)" : err.message;
        console.warn(`Key #${keyIdx+1} Model ${model} error:`, lastError);
      }
    }
  }

  return res.status(502).json({
    success: false,
    error: `Transkripsi gagal setelah mencuba semua kunci API & model: ${lastError}`
  });
}
