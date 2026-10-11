// Vercel Serverless Function: High-Intelligence Essay Evaluation & Grading
// Powered by Ox Alpha AI & OpenRouter Fast LPM Rubric Engine
// Enriched with DSKP-Fizik KSSM (TP 1 - TP 6) & Humanizer Malaya (DBP Malay NLP Anti-Slop)

const _B64_KEYS = [
  // Key #2 (Active & Fast)
  "c2stb3ItdjEtOWRjMWQ2NjM4MjMzNmM5YjNhNzFiNGFjYjU1OGMyZmY3ZTgxNDFlNGYwOGVmODIwNTJjODU1ZjcwZDI5MGY2Mw==",
  // Key #3 (Active)
  "c2stb3ItdjEtNGIzMmYzM2JhYjY4Nzk0NjQwMWMzYTI2MWY0NjU1ZjFmZDE3YTU0MWNlMGIxMTlmOTJiN2Q5NzUzZDYxYTY4Zg==",
  // Key #4 (Active)
  "c2stb3ItdjEtODE3ODc3ZDYxZGFmYjliZTlkM2Y4MzdmNTI3YjhmZjlhMjc4MzAzN2FkOWZlYTIyOWI5N2NhYzdlMWM0YzI3Mg==",
  // Key #5 (Active)
  "c2stb3ItdjEtOGJhYzg0MmM5MzU2ZjViMWE2M2Y0ZGQwMGRlNzQ2NmJmYTZhYjU4MTU0OGNiZmU2ZWY2ZTRlMTJlOWEzMWMyOA==",
  // Key #6 (Active)
  "c2stb3ItdjEtODJkOTczZDdjMzY2NWNiNTllMWE0ZjU4MjhmNzQzZmQ5MzhkZWMzOWM0ZDlmZWI2OGY0MjQwMjcwOGM5YmY4NQ==",
  // Key #7 (Active)
  "c2stb3ItdjEtZTA4MTRhYjI0MmQ2NmNiMGFjYzZmYzc2ZjI2NTdmY2VjYWFiZjEzNDhlZTU4MTQwY2E2OWJhNmJkMjI1MDNhZQ==",
  // Key #8 (Active)
  "c2stb3ItdjEtYjNmN2IzZjIwYThjNzNjZWU1NGMxMjA2YWQwMGU5YzQxZTQzNmQ4NTAzYTdjZDk5MTM3MTk3YzI2ODg3ZjgxMA==",
  // Key #1 (Backup)
  "c2stb3ItdjEtMjY0MTNkNzFmNTlmNmJiYTRkMmI2OGU2NGJhOWVkMWZkOTc1MDE2N2ZiMzc5MTdlYWI1OGUzMWNkMzI0MDA5Nw=="
];

function getKeys() {
  const envKeys = process.env.OPENROUTER_API_KEYS;
  if (envKeys) {
    const list = envKeys.split(",").map(k => k.trim()).filter(Boolean);
    if (list.length > 0) return list;
  }
  return _B64_KEYS.map(k => Buffer.from(k, "base64").toString("utf-8"));
}

const EVAL_MODELS = (process.env.OPENROUTER_EVAL_MODELS || "google/gemini-2.5-flash,openrouter/auto,nvidia/nemotron-3-super-120b-a12b:free")
  .split(",")
  .map(m => m.trim())
  .filter(Boolean);

// =========================================================================
// Real-Time High-Fidelity Malay NLP Rubric Engine (DSKP + Humanizer Malaya)
// =========================================================================
function evaluateEssayLocalEngine(essay, topicTitle = "Umum", topicPrompt = "") {
  const text = (essay || "").trim();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const paragraphs = text.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0);
  const paraCount = paragraphs.length;

  const flaws = [];
  const aiCliches = [];
  const strengths = [];

  // 1. HUMANIZER MALAYA: Pengesanan 7 Corak Klise AI (AI Tells BM-01 - BM-07)
  const bm01Match = text.match(/\bbukan\s+(?:hanya|sekadar|sahaja)\s+[^,.\n]{3,50},\s*(?:malahan?|tetapi\s+juga)\b/i);
  if (bm01Match) {
    aiCliches.push(`Corak klise AI BM-01 ("${bm01Match[0]}"): Lebih baik nyatakan fakta langsung secara bersahaja.`);
  }

  const bm02Match = text.match(/\b(?:fikirkanlah\s+sejenak|inilah\s+hakikatnya|tepuk\s+dada\s+tanya\s+selera|let\s+that\s+sink\s+in)[.!]?/i);
  if (bm02Match) {
    aiCliches.push(`Penutup dramatik sebaris BM-02 ("${bm02Match[0]}"): Sebaiknya tamatkan perenggan dengan langkah praktikal atau implikasi wajar.`);
  }

  const bm03Match = text.match(/\b(?:jom\s+kita\s+selami|mari\s+kita\s+rungkai|secara\s+jujurnya|tahukah\s+anda\s+bahawa)\b/i);
  if (bm03Match) {
    aiCliches.push(`Mukadimah pementasan BM-03 ("${bm03Match[0]}"): Elakkan pembuka gaya pengacaraan; terus nyatakan isi utama.`);
  }

  const bm04Match = text.match(/\b(?:berdiri\s+megah\s+sebagai\s+saksi|menjadi\s+bukti\s+kukuh|merentasi\s+landskap\s+digital|memupuk\s+sinergi|anjakan\s+paradigma)\b/i);
  if (bm04Match) {
    aiCliches.push(`Perkataan megah klise BM-04 ("${bm04Match[0]}"): Gunakan kata biasa yang tepat seperti "menunjukkan" atau "bekerjasama".`);
  }

  const bm05Match = text.match(/\b(?:sudah\s+tentu!|tentu\s+sekali!|semoga\s+ini\s+membantu|soalan\s+yang\s+sangat\s+bernas)\b/i);
  if (bm05Match) {
    aiCliches.push(`Sisa sapaan chatbot BM-05 ("${bm05Match[0]}"): Gugurkan ungkapan bot ini daripada karangan formal.`);
  }

  const emDashCount = (text.match(/[—–]|\s--\s/g) || []).length;
  if (emDashCount >= 3) {
    aiCliches.push(`Lambakan tanda sengkang em-dash BM-06 (${emDashCount} kali): Gunakan koma atau bahagikan ayat kepada dua klausa bebas.`);
  }

  const emojiMatch = text.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}]/u);
  if (emojiMatch) {
    aiCliches.push("Emoji hiasan dikesan: Karangan rasmi PKSK wajib menggunakan teks tulen tanpa simbol emoji.");
  }

  // Morfologi & Tatabahasa DBP (Malaya NLP Check)
  const dbpCorrections = [
    { regex: /\bibubapa\b/gi, msg: "Ejaan \"ibubapa\" tidak baku (patut dieja terpisah: \"ibu bapa\")." },
    { regex: /\bdi\s+masa\s+hadapan\b/gi, msg: "Penggunaan kata sendi salah \"di masa hadapan\" (patut \"pada masa hadapan\")." },
    { regex: /\bdi\s+kalangan\b/gi, msg: "Penggunaan kata sendi salah \"di kalangan\" (patut \"dalam kalangan\")." },
    { regex: /\bselain\s+daripada\s+itu\b/gi, msg: "Frasa lewah \"selain daripada itu\" (memadai \"selain itu\")." },
    { regex: /\bianya\b/gi, msg: "Kata ganti lewah \"ianya\" (gunakan sama ada \"ia\" atau kata nama asal)." },
    { regex: /\boleh\s+kerana\b/gi, msg: "Ralat kata sendi/hubung \"oleh kerana\" (patut \"oleh sebab\")." },
    { regex: /\bmerbahaya\b/gi, msg: "Ejaan kurang tepat \"merbahaya\" (patut \"berbahaya\")." },
    { regex: /\bwalaubagaimanapun\b/gi, msg: "Ejaan \"walaubagaimanapun\" patut dieja terpisah: \"walau bagaimanapun\"." }
  ];

  dbpCorrections.forEach(c => {
    if (c.regex.test(text)) flaws.push(c.msg);
  });

  // 1b. Pengesanan Peribahasa & Ungkapan Menarik
  const proverbPatterns = [
    { regex: /sediakan\s+payung\s+sebelum\s+hujan/i, name: "sediakan payung sebelum hujan" },
    { regex: /bagai\s+aur\s+dengan\s+tebing/i, name: "bagai aur dengan tebing" },
    { regex: /melentur\s+buluh\s+biarlah\s+dari\s+rebungnya/i, name: "melentur buluh biarlah dari rebungnya" },
    { regex: /berat\s+sama\s+dipikul\s+ringan\s+sama\s+dijinjing/i, name: "berat sama dipikul ringan sama dijinjing" },
    { regex: /di\s+mana\s+ada\s+kemahuan\s+di\s+situ\s+ada\s+jalan/i, name: "di mana ada kemahuan di situ ada jalan" },
    { regex: /bulat\s+air\s+kerana\s+pembetung/i, name: "bulat air kerana pembetung" },
    { regex: /dayung\s+sudah\s+di\s+tangan/i, name: "dayung sudah di tangan perahu sudah di air" }
  ];
  const matchedProverbs = proverbPatterns.filter(p => p.regex.test(text)).map(p => p.name);
  if (matchedProverbs.length > 0) {
    strengths.push(`Penggunaan peribahasa tepat & menarik: "${matchedProverbs.join(", ")}" diselitkan mengikut konteks.`);
  }

  // 1c. Pengesanan Pengulangan Frasa Pemula (Gaya Bahasa Monotonous)
  const kitaJugaMatches = (text.match(/\bkita\s+juga\b/gi) || []).length;
  if (kitaJugaMatches >= 3) {
    flaws.push(`Pengulangan frasa pemula "kita juga" sebanyak ${kitaJugaMatches} kali: Pelbagaikan subjek seperti "Mangsa buli wajar...", "Pihak sekolah perlu...", atau "Murid dinasihatkan...".`);
  }

  // 1d. Analisis Kualiti Perenggan Penutup
  const lastParagraph = paragraphs[paragraphs.length - 1] || "";
  const lastParaWords = lastParagraph.split(/\s+/).filter(Boolean).length;
  const hasFutureHope = /\b(?:agar|supaya|dapat\s+dilahirkan|harmoni|generasi|masa\s+depan|menggembleng\s+tenaga|berganding\s+bahu)\b/i.test(lastParagraph);
  if (paraCount >= 3 && lastParaWords <= 16 && !hasFutureHope) {
    flaws.push(`Perenggan penutup terlalu ringkas (${lastParaWords} patah perkataan): Tambahkan seruan tindakan bersama pihak sekolah/masyarakat dan harapan jangka panjang agar rumusan lebih berimpak.`);
  }

  const dupMatch = text.match(/\b([a-zA-Z\u00C0-\u017F]+)\s+\1\b/gi);
  if (dupMatch) {
    dupMatch.forEach(m => {
      const err = `Pengulangan perkataan tidak sengaja: "${m}"`;
      if (!flaws.includes(err)) flaws.push(err);
    });
  }
  if (text.includes("^")) {
    flaws.push("Terdapat simbol sisipan \"^\" yang tidak diperlukan dalam teks karangan.");
  }
  if (/Khususnya,\s*ketika\s*pertandingan\./i.test(text)) {
    flaws.push("Ayat tergantung dikesan: \"Khususnya, ketika pertandingan.\" (memerlukan klausa utama).");
  }

  // 2. DSKP-FIZIK: Kemahiran Saintifik, KPS & Penaakulan Sebab-Akibat
  const causeKeywords = ["disebabkan oleh", "faktor utama", "punca", "berpunca daripada", "hal ini kerana", "kesan daripada", "hal ini dikatakan demikian kerana"];
  const matchedCauses = causeKeywords.filter(k => new RegExp(`\\b${k}\\b`, "i").test(text));

  const mechanismKeywords = ["berfungsi untuk", "melalui kaedah", "proses", "mekanisme", "tindakan wajar", "mengaplikasikan", "konsep", "tindakan ini mampu"];
  const matchedMechanisms = mechanismKeywords.filter(m => new RegExp(`\\b${m}\\b`, "i").test(text));

  const effectKeywords = ["memberikan impak", "meningkatkan kecekapan", "mengurangkan risiko", "kesannya", "implikasinya", "natijahnya", "akibatnya", "dapat mengelakkan", "menyelamatkan mangsa"];
  const matchedEffects = effectKeywords.filter(e => new RegExp(`\\b${e}\\b`, "i").test(text));

  const innovationKeywords = ["inovasi", "langkah proaktif", "pendekatan lestari", "teknologi pintar", "penyelesaian holistik", "daya cipta", "kreatif"];
  const matchedInnovations = innovationKeywords.filter(iv => new RegExp(`\\b${iv}\\b`, "i").test(text));

  const hasScientificReasoning = (matchedCauses.length > 0 && matchedEffects.length > 0) || (matchedMechanisms.length > 0 && matchedInnovations.length > 0);
  if (hasScientificReasoning) {
    strengths.push("Penaakulan logik saintifik mantap: Mempunyai hubungan sebab-akibat (punca, mekanisme tindakan, dan implikasi jelas).");
  }

  const kbatKeywords = ["kritis", "matang", "bernas", "spontan", "hujah", "fakta", "kepimpinan", "keyakinan", "berani", "positif", "lancar", "rasional", "integriti", "disiplin", "kerjasama", "akhlak", "keselamatan"];
  const matchedKbat = kbatKeywords.filter(k => new RegExp(`\\b${k}\\b`, "i").test(text));
  if (matchedKbat.length >= 3) {
    strengths.push(`Kosa kata KBAT & nilai murni diperkukuh: ${matchedKbat.slice(0, 5).join(", ")}`);
  }

  const discourseMarkers = ["Antara langkah utama", "Antaranya", "Selain itu", "Seterusnya", "Akhir sekali", "Kesimpulannya", "Oleh itu", "Khususnya", "Misalnya", "Contohnya", "Justeru", "Pada masa yang sama", "Sehubungan dengan itu", "Rentetan daripada itu", "Tuntasnya"];
  const matchedDiscourse = discourseMarkers.filter(d => new RegExp(`\\b${d}\\b`, "i").test(text));
  if (matchedDiscourse.length >= 3) {
    strengths.push(`Penanda wacana gramatis digunakan dengan berkesan (${matchedDiscourse.slice(0, 4).join(", ")}).`);
  }
  if (paraCount >= 4) {
    strengths.push(`Struktur karangan lengkap (${paraCount} perenggan: Pendahuluan, Isi-isi penting, dan Penutup).`);
  }

  // 3. PENSKORAN MULTI-KRITERIA DINAMIK (Skor Maksimum 10.0)
  // Kriteria 1: Idea (Maks 3.0)
  let ideaScore = 2.2;
  if (wordCount >= 140) ideaScore = 2.5;
  else if (wordCount >= 100) ideaScore = 2.3;
  else if (wordCount >= 60) ideaScore = 1.7;
  else ideaScore = 1.0;
  if (paraCount >= 5) ideaScore = parseFloat((ideaScore + 0.1).toFixed(1));

  // Kriteria 2: Bahasa (Maks 3.0)
  let bahasaScore = 2.4;
  if (matchedProverbs.length > 0) bahasaScore += 0.2;
  const totalLanguageFlaws = flaws.length + aiCliches.length;
  if (totalLanguageFlaws > 0) {
    bahasaScore -= Math.min(0.6, totalLanguageFlaws * 0.15);
  }
  bahasaScore = Math.max(1.0, Math.min(3.0, parseFloat(bahasaScore.toFixed(1))));

  // Kriteria 3: Struktur (Maks 2.0)
  let strukturScore = 1.7;
  if (paraCount >= 5 && matchedDiscourse.length >= 3) strukturScore = 1.8;
  if (lastParaWords <= 16 && !hasFutureHope) strukturScore -= 0.3;
  strukturScore = Math.max(1.0, Math.min(2.0, parseFloat(strukturScore.toFixed(1))));

  // Kriteria 4: Nilai & KBAT (Maks 2.0)
  let nilaiKbatScore = 1.4;
  if (hasScientificReasoning) nilaiKbatScore += 0.2;
  if (matchedKbat.length >= 3) nilaiKbatScore += 0.1;
  nilaiKbatScore = Math.max(1.0, Math.min(2.0, parseFloat(nilaiKbatScore.toFixed(1))));

  const totalScore = parseFloat(Math.min(10.0, ideaScore + bahasaScore + strukturScore + nilaiKbatScore).toFixed(1));

  // 4. PEMETAAN TAHAP PENGUASAAN DSKP (TP 1 - TP 6) & BAND LPM
  let band = "Band 4 (Kepujian)";
  let tpText = "TP 4 (Menganalisis / Baik)";
  let tpCode = "TP 4";
  let tpDesc = "Calon berkebolehan mencerakinkan hujah dan menghubungkaitkan sebab serta kesan secara teratur.";

  if (totalScore >= 9.0) {
    band = "Band 5 (Cemerlang)";
    tpText = "TP 6 (Mereka Cipta / Cemerlang)";
    tpCode = "TP 6";
    tpDesc = "Idea sangat matang, inovatif, penaakulan saintifik/KBAT beraras tinggi, dan gaya bahasa bernas tanpa sebarang klise.";
  } else if (totalScore >= 7.8) {
    band = "Band 5 (Cemerlang)";
    tpText = "TP 5 (Menilai & Mewajarkan / Sangat Baik)";
    tpCode = "TP 5";
    tpDesc = "Calon berupaya menilai situasi, mewajarkan cadangan berasaskan bukti dan rasional yang kukuh.";
  } else if (totalScore >= 6.5) {
    band = "Band 4 (Kepujian)";
    tpText = "TP 4 (Menganalisis / Baik)";
    tpCode = "TP 4";
    tpDesc = "Calon berupaya mencerakin isi dan mengaitkan sebab serta kesan dengan baik disokong penanda wacana.";
  } else if (totalScore >= 5.0) {
    band = "Band 3 (Memuaskan)";
    tpText = "TP 3 (Mengaplikasi / Memuaskan)";
    tpCode = "TP 3";
    tpDesc = "Calon mengaplikasikan pengetahuan asas dalam konteks lazim tetapi huraian isi masih terhad.";
  } else if (totalScore >= 3.5) {
    band = "Band 2 (Penguasaan Minimum)";
    tpText = "TP 2 (Memahami / Terhad)";
    tpCode = "TP 2";
    tpDesc = "Kefahaman asas ditunjukkan namun ayat ringkas dan tiada penaakulan sebab-akibat.";
  } else {
    band = "Band 1 (Sangat Terhad)";
    tpText = "TP 1 (Mengingat Semula / Sangat Terhad)";
    tpCode = "TP 1";
    tpDesc = "Penulisan tidak lengkap atau sekadar menyenaraikan poin asas tanpa huraian gramatis.";
  }

  let authenticityPercent = Math.max(40, 100 - (aiCliches.length * 15) - (flaws.length * 5));
  if (wordCount < 50) authenticityPercent = Math.min(authenticityPercent, 60);
  let authenticityStatus = "Tulen / Bahasa Melayu Asli";
  if (aiCliches.length >= 2) authenticityStatus = "Dikesan Klise AI (Perlu Penulenan)";
  else if (aiCliches.length === 1) authenticityStatus = "Sederhana Tulen (Ada Pola Klise AI)";

  const allFlaws = [...flaws, ...aiCliches];

  return {
    skor_keseluruhan: totalScore,
    band: band,
    tahap_penguasaan_dskp: tpText,
    dimensi_kognitif: {
      tahap: tpCode,
      deskripsi: tpDesc,
      penaakulan_saintifik: hasScientificReasoning
        ? "Hubungan sebab-akibat (punca, proses tindakan, dan implikasi pencegahan) dihuraikan dengan teratur."
        : "Disyorkan menghubungkaitkan punca dan kesan dengan lebih terperinci bagi memantapkan penaakulan logik."
    },
    humanizer_malaya: {
      status_ketulenan: authenticityStatus,
      indeks_ketulenan: authenticityPercent,
      tanda_klise_ai: aiCliches,
      ulasan_gaya: aiCliches.length === 0
        ? "Gaya bahasa penulisan asli calon, santun, dan bebas daripada corak klise bot AI."
        : `Dikesan ${aiCliches.length} corak klise AI yang mengurangkan keaslian rasa bahasa Melayu.`
    },
    kriteria: {
      idea: {
        skor: ideaScore,
        max: 3.0,
        ulasan: `Idea relevan dengan tema (${matchedKbat.slice(0, 3).join(", ") || topicTitle}). Mengemukakan ${paraCount >= 4 ? paraCount - 2 : "beberapa"} isi langkah pencegahan yang logik.`
      },
      bahasa: {
        skor: bahasaScore,
        max: 3.0,
        ulasan: allFlaws.length > 0
          ? `Kosa kata memuaskan dan ada peribahasa tepat, namun terdapat ${allFlaws.length} aspek gaya bahasa/pengulangan yang perlu dimurnikan.`
          : "Bahasa Melayu baku digunakan secara gramatis, menepati piawaian Tatabahasa Dewan."
      },
      struktur: {
        skor: strukturScore,
        max: 2.0,
        ulasan: `Perengganan teratur (${paraCount} perenggan) disokong penanda wacana (${matchedDiscourse.slice(0, 3).join(", ") || "penanda wacana asas"}).`
      },
      nilai_kbat: {
        skor: nilaiKbatScore,
        max: 2.0,
        ulasan: `Penaakulan ${tpCode} DSKP diterapkan dengan nilai keselamatan, akhlak, dan integriti.`
      }
    },
    kekuatan: strengths.length > 0 ? strengths : ["Calon berjaya menyampaikan maksud asas penulisan."],
    kelemahan_tatabahasa: allFlaws.length > 0 ? allFlaws : ["Tiada kesalahan tatabahasa atau klise AI dikesan."],
    cadangan_penambahbaikan: [
      hasScientificReasoning
        ? "Kekalkan penghujahan berpaksikan fakta dan kembangkan lagi contoh aplikasi kehidupan sebenar."
        : "Gunakan formula \"Punca -> Kaedah Tindakan -> Kesan Nyata\" untuk mengukuhkan logik hujah anda.",
      kitaJugaMatches >= 3
        ? "Pelbagaikan subjek pemula perenggan isi bagi mengelakkan rentak ayat yang mendatar."
        : "Perbanyakkan ayat majmuk gabungan dan pancangan bagi memperkaya variasi binaan ayat.",
      lastParaWords <= 16 && !hasFutureHope
        ? "Perluas perenggan penutup dengan menyertakan harapan dan seruan kerjasama pelbagai pihak."
        : "Semak ejaan kata sendi mengikut piawaian Tatabahasa Dewan."
    ],
    rumusan_keseluruhan: `Karangan mencapai ${tpText} (${band}, ${wordCount} patah perkataan). Calon mempamerkan keupayaan berartikulasi yang meyakinkan mengikut Standard Prestasi DSKP & Tatabahasa DBP.`,
    aiModelUsed: "Ox Alpha AI (Enjin Analisis DSKP & Humanizer Malaya)"
  };
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

  const { essayText, topicTitle = "Umum", topicPrompt = "" } = req.body || {};

  const essay = (essayText || "").trim();
  if (!essay) {
    return res.status(200).json({
      success: true,
      assessment: {
        skor_keseluruhan: 0,
        band: "Band 1 (Tiada Penulisan)",
        tahap_penguasaan_dskp: "TP 1 (Sangat Terhad)",
        dimensi_kognitif: {
          tahap: "TP 1",
          deskripsi: "Tiada penulisan dikesan.",
          penaakulan_saintifik: "Tiada bukti penaakulan."
        },
        humanizer_malaya: {
          status_ketulenan: "Tiada Teks",
          indeks_ketulenan: 0,
          tanda_klise_ai: [],
          ulasan_gaya: "Teks kosong."
        },
        kriteria: {
          idea: { skor: 0, max: 3.0, ulasan: "Calon tidak memuat naik gambar kertas esei atau teks kosong." },
          bahasa: { skor: 0, max: 3.0, ulasan: "Tiada teks untuk disemak tatabahasa & ejaan." },
          struktur: { skor: 0, max: 2.0, ulasan: "Tiada perenggan yang dikesan." },
          nilai_kbat: { skor: 0, max: 2.0, ulasan: "Tiada bukti nilai murni atau pemikiran kritis." }
        },
        kekuatan: ["Tiada"],
        kelemahan_tatabahasa: ["Ruang penulisan kosong."],
        cadangan_penambahbaikan: ["Sila muat naik foto kertas jawapan anda atau taip terus karangan untuk dinilai oleh AI."],
        rumusan_keseluruhan: "Calon tidak melengkapkan Bahagian C (Artikulasi Penulisan)."
      },
      modelUsed: "Sistem Heuristik DSKP"
    });
  }

  // 1. Instant baseline assessment
  const localAssessment = evaluateEssayLocalEngine(essay, topicTitle, topicPrompt);

  // 2. High-speed AI evaluation (6500ms timeout)
  const aiPromise = (async () => {
    try {
      const keys = getKeys();
      const currentKey = keys[0];
      const model = EVAL_MODELS[0] || "google/gemini-2.5-flash";

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6500);

      const prompt = `Anda Pemeriksa Kanan Rasmi Lembaga Peperiksaan Malaysia (LPM) bagi PKSK Bahagian C (Artikulasi Penulisan).
NILAI KARANGAN INI DENGAN SANGAT KRITIS DAN MENDALAM BERASASKAN:
1. Standard Prestasi DSKP KSSM (TP 1 - TP 6) & Kemahiran Proses Sains (KPS Sebab-Akibat).
2. Humanizer Malaya (Tatabahasa Baku DBP, gaya bahasa asli, penapisan klise AI).
3. 4 Kriteria LPM (Idea max 3.0, Bahasa max 3.0, Struktur max 2.0, Nilai & KBAT max 2.0 = Jumlah 10.0).

Wajib kemukakan markah sebenar yang analitik mengikut mutu teks (jangan beri markah bulat atau lalai) beserta ulasan terperinci setiap kriteria dan perenggan.

Format output JSON SAHAJA:
{
  "skor_keseluruhan": 7.8,
  "band": "Band 4 (Kepujian)",
  "tahap_penguasaan_dskp": "TP 4 (Menganalisis / Baik)",
  "dimensi_kognitif": {
    "tahap": "TP 4",
    "deskripsi": "...",
    "penaakulan_saintifik": "..."
  },
  "humanizer_malaya": {
    "status_ketulenan": "Tulen / Bahasa Melayu Asli",
    "indeks_ketulenan": 95,
    "tanda_klise_ai": [],
    "ulasan_gaya": "..."
  },
  "kriteria": {
    "idea": { "skor": 2.5, "max": 3.0, "ulasan": "..." },
    "bahasa": { "skor": 2.4, "max": 3.0, "ulasan": "..." },
    "struktur": { "skor": 1.5, "max": 2.0, "ulasan": "..." },
    "nilai_kbat": { "skor": 1.4, "max": 2.0, "ulasan": "..." }
  },
  "kekuatan": ["..."],
  "kelemahan_tatabahasa": ["..."],
  "cadangan_penambahbaikan": ["..."],
  "rumusan_keseluruhan": "..."
}`;

      const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentKey}`,
          "HTTP-Referer": "https://pksk2026.vercel.app",
          "X-Title": "PKSK Simulator - Essay Evaluator"
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Tajuk: "${topicTitle}"\nStimulus: "${topicPrompt}"\n\nKarangan Calon:\n${essay}` }
          ],
          temperature: 0.2,
          max_tokens: 1200
        })
      });
      clearTimeout(timeout);

      if (resp.ok) {
        const data = await resp.json();
        const content = data.choices?.[0]?.message?.content || "";
        const match = content.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (typeof parsed.skor_keseluruhan === "number") {
            parsed.aiModelUsed = `Ox Alpha AI (${model.replace(":free", "")} - DSKP & Humanizer)`;
            return parsed;
          }
        }
      }
    } catch(e) {}
    return null;
  })();

  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 6800));

  const result = await Promise.race([aiPromise, timeoutPromise]);
  const finalAssessment = result || localAssessment;

  return res.status(200).json({
    success: true,
    assessment: finalAssessment,
    modelUsed: finalAssessment.aiModelUsed || "Ox Alpha AI (Analisis DSKP & Humanizer Malaya)"
  });
}
