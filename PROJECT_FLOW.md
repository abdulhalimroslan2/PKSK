# 🧭 PROJECT FLOW & LIVING ARCHITECTURE: Sistem Simulator PKSK Online & Penilai AI Artikulasi Penulisan

> **Status Semasa:** FASA 6 SELESAI (Google OAuth Physflix UX, Percubaan 2 Jam & Paywall Kunci Lesen Stabil)  
> **Tarikh Kemas Kini Terakhir:** 2026-09-27  
> **Fail Rujukan Utama:** [index.html](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/index.html), [app.js](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/app.js), [license.js](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/license.js), [styles.css](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/styles.css), [sw.js](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/sw.js)

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
  - Pangkalan Data & Auth: Supabase PostgreSQL & Google OAuth (`lcfkvljmcamulshvyeqe.supabase.co`) — Jadual `pksk_users` & `pksk_licenses`

---

## 2. 📊 Status Fasa & Kemajuan Terkini
| Fasa | Nama Modul / Tugasan | Status | Catatan / Output |
| :---: | :--- | :---: | :--- |
| **Fasa 1** | Portal Simulator PKSK & Bank Soalan 500+ | ✅ Selesai | Silibus Bahagian A, B, C lengkap dengan rajah autentik KPM |
| **Fasa 2** | Integrasi Lesen Peranti Supabase Cloud | ✅ Selesai | Sistem lesen berpusat dengan pengesahan perkakasan & kuota |
| **Fasa 3** | Penilai AI Artikulasi Penulisan (Ox Alpha + Gemini) | ✅ Selesai | Rubrik 4 kriteria LPM, pemilihan tajuk rawak, cadangan 4-6 frasa isi padat |
| **Fasa 4** | Pemasa Berkembar & Perlindungan Anti-Salin Esei | ✅ Selesai | 45 minit masa menjawab + 10 minit auto-hide cadangan idea serentak |
| **Fasa 5** | Bank Soalan KBAT 2026 & Penalaan Rubrik Melayu Baku | ✅ Selesai | 23 Variasi tajuk esei, Kad Tema & Dropdown, Pengoptimuman Skrin Telefon & Tablet, Dev Master Key & Ikon PWA siap |
| **Fasa 6** | Google OAuth Physflix UX & Percubaan 2 Jam | ✅ Selesai | Log masuk Google OAuth, auto-redirect Dashboard, avatar dropdown profil & log keluar, pemasa percubaan 2 jam, auto-lock sistem, butang pembelian Telegram @halimroslan, penyingkiran butang lewah & pembersihan modal lesen |

---

## 3. 🏛️ Seni Bina Teknikal & Peraturan Emas (Golden Invariants)
- **Stack Teknologi:** Vanilla HTML5, Vanilla Modern CSS, Vanilla JavaScript ES6+, Supabase REST API & Google OAuth, OpenRouter API (Ox Alpha), Google Gemini Flash API.
- **Golden Invariants Wajib:**
  1. **Keselarasan Pemasa Esei Bahagian C:** Pemasa 45 minit (masa menjawab rasmi) dan pemasa 10 minit (auto-tutup kotak cadangan idea esei) WAJIB bermula serentak sebaik calon membuka Bahagian C.
  2. **Perlindungan Anti-Salin (Anti-Copy):** Kotak cadangan isi AI dilindungi dengan sekatan pemilihan teks (`user-select: none`) dan larangan salin-tampal bagi memastikan murid menulis ayat sendiri.
  3. **Peringkasan Cadangan Poin Esei:** Cadangan idea karangan wajib diringkaskan kepada 4–6 frasa padat, bukan perenggan panjang.
  4. **Penjanaan Tajuk Rawak:** Setiap sesi esei wajib memaparkan tajuk secara rawak bagi mengelakkan calon menghafal tajuk tetap.
  5. **Polisi Tempoh Percubaan 2 Jam:** Tempoh percubaan adalah tepat 2 jam (`TRIAL_DURATION_MS = 2 * 60 * 60 * 1000`). Apabila tamat tempoh, sistem dikunci serta-merta melalui pemantau berkala (`initTrialLivenessWatcher`) dan memaparkan `#trialLockNotice` serta `#inputLicenseKey`.
  6. **Peralihan Auto ke Dashboard Pasca Log Masuk:** Log masuk Google OAuth berjaya MESTI terus mengalihkan calon ke paparan `DASHBOARD` (Pilihan Mod Pentaksiran).
  7. **Pusat Log Keluar pada Avatar:** Log keluar calon dilaksanakan melalui dropdown avatar pengguna (`#userProfileDropdown`) dan tiada butang log masuk lewah di bar navigasi utama.
  8. **Modal Pengaktifan Khusus Lesen:** Modal `#activationModal` dikhususkan secara eksklusif untuk kunci lesen 16-digit atau pembelian Telegram `@halimroslan`, tanpa butang log masuk luar.
  9. **Simetri Margin Spanning:** Spanduk status percubaan (`#trialStatusBanner`) diletakkan di dalam bekas `.dashboard-grid` agar margin kiri dan kanan sepadan 100% dengan kad ujian (1080px).
  10. **Protokol Sandaran Mandatori:** Sebarang pengubahsuaian fail wajib disandarkan ke `/Users/halimroslan/NEW CIDS SUITES PRO/pksk-sistem-backup/` sebelum diedit.

---

## 4. 📁 Peta Fail & Aset Kritikal
- [`index.html`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/index.html): Antara muka penuh portal PKSK, navigasi tab soalan, pemasa HUD, modal pengesahan, dan ruang penulisan esei Bahagian C.
- [`app.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/app.js): Logik pemasa dwi-serentak (`startEssaySessionTimers`), pemarkahan objektif, integrasi AI semakan esei, dan pengurusan status peperiksaan.
- [`license.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/license.js): Pengurusan tempoh percubaan 2 jam, integrasi Google OAuth, verifikasi kunci lesen, dan mock test hooks.
- [`styles.css`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/styles.css): Tema visual Physflix, gaya avatar dropdown, banner simetri 1080px, dan lencana status lesen.
- [`sw.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/sw.js): PWA service worker versi `pksk-pwa-v1.0.9`.
- [`data/dataset.js`](file:///Users/halimroslan/Desktop/Kod Sumber (Antigravity)/PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)/data/dataset.js): Bank data 500+ soalan lengkap beserta pilihan jawapan dan skema penerangan.

---

## 5. 📝 Log Keputusan Teknikal (Decisions & Mini-ADRs)
- **2026-09-27 - Polisi Percubaan 2 Jam & Penguncian Sistem**: Menetapkan tempoh percubaan percuma tepat 2 jam untuk memberikan calon pengalaman ujian pantas sebelum mengunci sistem secara automatik.
- **2026-09-27 - Avatar Dropdown Menu & Penyingkiran Butang Lewah**: Menggantikan tab lewah 'Log Masuk' di bar navigasi dan butang hero dengan satu menu profil dropdown interaktif pada avatar.
- **2026-09-27 - Penyesuaian Margin Sepadan Sepenuhnya**: Memindahkan `#trialStatusBanner` ke dalam `.dashboard-grid` untuk memastikan margin kiri dan kanan sentiasa simetri tepat dengan kad ujian (1080px).
- **2026-09-27 - Pembersihan Modal Lesen**: Membuang butang Google login dan divider dari modal pengaktifan kunci lesen agar aliran pembelian dan pengesahan kunci 16-digit menjadi lebih fokus.

---

## 6. ⏭️ Tindakan Seterusnya (Next Action Items)
- [ ] Peningkatan bank soalan Bahagian B (subjek Matematik & Sains bertaraf KBAT tinggi).
- [ ] Ujian keserasian paparan penuh untuk peranti telefon pintar skrin ultra kecil (< 360px).
- [ ] Integrasi pemantauan status pangkalan data Supabase melalui pelayan Supabaseauto.
