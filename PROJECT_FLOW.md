# 🧭 PROJECT FLOW & LIVING ARCHITECTURE: Sistem Simulator PKSK Online & Penilai AI Artikulasi Penulisan

> **Status Semasa:** FASA 5 AKTIF (Variasi Tajuk Esei Buli, Ko-Akademik, Kokurikulum, Teknologi & Penalaan Rubrik Melayu Baku Siap)  
> **Tarikh Kemas Kini Terakhir:** 2026-09-27  
> **Fail Rujukan Utama:** [index.html](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/index.html), [app.js](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/app.js), [license.js](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/license.js), [styles.css](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/styles.css), [data/dataset.js](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/data/dataset.js)

---

## 1. 🎯 Ringkasan Eksekutif & Skop Projek
- Sistem Simulator Pentaksiran Kemasukan Sekolah Khusus (PKSK) Tingkatan 1 Kementerian Pendidikan Malaysia (KPM) berasaskan web responsif sepenuhnya (PWA-ready).
- Menyediakan persekitaran simulasi peperiksaan dewan autentik yang merangkumi:
  - **Bahagian A (Kecerdasan Insaniah - 20%)**: 30 soalan EQ, SQ, integriti & kepimpinan.
  - **Bahagian B (Kecerdasan Intelektual - 70%)**: 70 soalan IQ, logik, matematik, sains, BM & BI.
  - **Bahagian C (Artikulasi Penulisan - 10%)**: Ujian esei berpandu dengan bimbingan idea AI dan pemarkahan automatik berpandukan rubrik 4 kriteria LPM.
- **Output & Penerbitan Akhir:**
  - Laman Web Live Vercel: [https://pksk2026.vercel.app](https://pksk2026.vercel.app)
  - Repositori GitHub: [abdulhalimroslan2/PKSK](https://github.com/abdulhalimroslan2/PKSK.git) (Branch: `main`)
  - Pangkalan Data Lesen: Supabase PostgreSQL (`rvslrscgbhgdcktdtfrl.supabase.co`) — Jadual `pksk_licenses`

---

## 2. 📊 Status Fasa & Kemajuan Terkini
| Fasa | Nama Modul / Tugasan | Status | Catatan / Output |
| :---: | :--- | :---: | :--- |
| **Fasa 1** | Portal Simulator PKSK & Bank Soalan 500+ | ✅ Selesai | Silibus Bahagian A, B, C lengkap dengan rajah autentik KPM |
| **Fasa 2** | Integrasi Lesen Peranti Supabase Cloud | ✅ Selesai | Sistem lesen berpusat dengan pengesahan perkakasan & kuota |
| **Fasa 3** | Penilai AI Artikulasi Penulisan (Ox Alpha + Gemini) | ✅ Selesai | Rubrik 4 kriteria LPM, pemilihan tajuk rawak, cadangan 4-6 frasa isi padat |
| **Fasa 4** | Pemasa Berkembar & Perlindungan Anti-Salin Esei | ✅ Selesai | 45 minit masa menjawab + 10 minit auto-hide cadangan idea berjalan serentak |
| **Fasa 5** | Bank Soalan KBAT 2026 & Penalaan Rubrik Melayu Baku | 🚀 Aktif | 22 Variasi tajuk esei, Kad Pilihan Tema & Dropdown Tajuk, Pengoptimuman Penuh Telefon & Tablet (Portrait/Landscape), Dev Master Key & PWA Ikon Rasmi siap |

---

## 3. 🏛️ Seni Bina Teknikal & Peraturan Emas (Golden Invariants)
- **Stack Teknologi:** Vanilla HTML5, Vanilla Modern CSS, Vanilla JavaScript ES6+, Supabase REST API, OpenRouter API (Ox Alpha), Google Gemini Flash API.
- **Golden Invariants Wajib:**
  1. **Keselarasan Pemasa Esei Bahagian C:** Pemasa 45 minit (masa menjawab rasmi) dan pemasa 10 minit (auto-tutup kotak cadangan idea esei) WAJIB bermula serentak sebaik calon membuka Bahagian C.
  2. **Perlindungan Anti-Salin (Anti-Copy):** Kotak cadangan isi AI dilindungi dengan sekatan pemilihan teks (`user-select: none`) dan larangan salin-tampal bagi memastikan murid menulis ayat sendiri.
  3. **Peringkasan Cadangan Poin Esei:** Cadangan idea karangan wajib diringkaskan kepada 4–6 frasa padat (contoh: *"Pupuk semangat perpaduan antara murid pelbagai kaum"*), bukan perenggan panjang.
  4. **Penjanaan Tajuk Rawak:** Setiap sesi esei wajib memaparkan tajuk secara rawak bagi mengelakkan calon menghafal tajuk tetap yang sama setiap kali muat semula laman.
  5. **Keselamatan Kunci API & Sandaran AI:** Penilaian esei menggunakan OpenRouter Ox Alpha dengan fallback automatik ke Google Gemini Flash API sekiranya berlaku sebarang gangguan latensi.
  6. **Protokol Sandaran Mandatori:** Sebarang pengubahsuaian fail wajib disandarkan ke `/Users/halimroslan/NEW CIDS SUITES PRO/pksk-sistem-backup/` sebelum diedit.

---

## 4. 📁 Peta Fail & Aset Kritikal
- [`index.html`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/index.html): Antara muka penuh portal PKSK, navigasi tab soalan, pemasa HUD, modal pengesahan, dan ruang penulisan esei Bahagian C.
- [`app.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/app.js): Logik pemasa dwi-serentak (`startEssaySessionTimers`), pemarkahan objektif, integrasi AI semakan esei, dan pengurusan status peperiksaan.
- [`license.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/license.js): Modul verifikasi lesen Supabase (`rvslrscgbhgdcktdtfrl.supabase.co`) & pengurusan peranti.
- [`styles.css`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/styles.css): Reka bentuk tema korporat KPM, palet warna rasmi, kad soalan responsif, dan lencana anti-salin.
- [`data/dataset.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/data/dataset.js): Bank data 500+ soalan lengkap beserta pilihan jawapan dan skema penerangan.
- [`verify_diagrams.html`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/verify_diagrams.html): Utiliti audit visual untuk menyemak kualiti rendering rajah soalan.

---

## 5. 📝 Log Keputusan Teknikal (Decisions & Mini-ADRs)
- **2026-09-11 - Pengesahan Lesen Berpusat Supabase:** Memindahkan pengesahan lesen tempatan ke pangkalan data cloud Supabase (`rvslrscgbhgdcktdtfrl`) untuk membolehkan pengaktifan lesen pelbagai peranti dengan had kuota yang dikawal.
- **2026-09-12 - Fallback Enjin AI Berkembar:** Mengintegrasikan model Gemini sebagai sandaran pantas kepada Ox Alpha untuk menangani situasi latensi dan memastikan maklum balas rubrik tidak melebihi 10 saat.
- **2026-09-12 - Pelaksanaan Pemasa 45 Minit & 10 Minit Berjalan Serentak:** Menyelaraskan detik masa 45 minit peperiksaan esei dengan 10 minit penutupan cadangan isi agar murid mempunyai masa mencukupi merangka esei sebelum panduan hilang secara automatik.

---

## 6. ⏭️ Tindakan Seterusnya (Next Action Items)
- [ ] Peningkatan bank soalan Bahagian B (subjek Matematik & Sains bertaraf KBAT tinggi).
- [x] Penalaan lanjut prompt rubrik AI Bahagian C untuk memperincikan skor mengikut tatabahasa Melayu Baku & Tatabahasa Dewan DBP (Selesai 2026-09-27).
- [x] Perluasan variasi tajuk esei Bahagian C (22 tajuk: Buli, Ko-Akademik, Kokurikulum, Teknologi AI, Sambutan Hari Kebangsaan, Hari Malaysia & Integrasi Wilayah) untuk umur 12-13 tahun (Selesai 2026-09-27).
- [x] Pelaksanaan PWA Penuh & Ikon Rasmi Korporat Janaan ChatGPT (/chatgpt-page-generator) dengan latar belakang PNG telus (transparent), tipografi PKSK, dan simbol AI di hujung atas kanan (Selesai 2026-09-27).
- [x] Mekanisme Kunci Induk Pembangun (Developer Master Key & Auto-Unlock URL): Kunci 'PKSK-DEV-MASTER-2026' dan parameter '?dev=unlock' untuk akses tanpa had seumur hidup tanpa tolak kuota Supabase (Selesai 2026-09-27).
- [ ] Ujian keserasian paparan penuh untuk peranti telefon pintar skrin kecil (skrin < 380px).
- [ ] Pengekalan pangkalan data Supabase melalui automasi heartbeat Supabaseauto.
