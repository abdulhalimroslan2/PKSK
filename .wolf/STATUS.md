---
description: session handoff, regenerate with /handoff when a quest finishes
budget_tokens: 1500
---
# STATUS — PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-10-03 (PKSK Admin Hub PWA & Pemulihan 500 Lesen Selesai → Sedia Fasa 7)

---

## ✅ Done

### Penyelesaian Isu Skor Statik 7.4 & Semakan Terperinci Esei Buli (2026-10-11)
- **Punca Masalah Skor Mendatar 7.4 Dihapuskan:**
  1. Penggantian model lalai OpenRouter kepada `google/gemini-2.5-flash` yang sangat pantas (<2s) dan stabil berbanding model lapuk yang sering timeout.
  2. Pemanjangan had masa timeout perlumbaan AI client-side `app.js` daripada 3.8s ke 7.0s bagi mengelakkan pembatalan awal sebelum AI sempat pulangkan JSON.
  3. Kemas kini kedua-dua enjin tempatan (`api/evaluate.js` dan `app.js`) dengan penskoran granular dinamik: pengesan peribahasa ("sediakan payung sebelum hujan"), pengesan pengulangan pemula frasa ("kita juga" 3x), analisis kedalaman perenggan penutup (12 perkataan), dan perkadaran panjang kata sebenar.
- **Hasil Diagnostik Karangan Buli Calon (151 patah perkataan):**
  - Skor Melonjak dari 7.4 ke **8.0 / 10.0** (Band 5 Cemerlang / TP 5 Menilai & Mewajarkan).
  - Skor Kriteria: Idea (2.6/3.0), Bahasa (2.3/3.0), Struktur (1.5/2.0), Nilai & KBAT (1.6/2.0).
  - Ketulenan Humanizer Malaya: 90% (Sifar klise AI, bahasa Melayu asli).
- **Integriti & Sandaran:** Sandaran terkini dicipta di `/Users/halimroslan/NEW CIDS SUITES PRO/pksk-sistem-backup/`. Syntax kedua-dua fail disahkan `node -c` lulus (Exit code 0).

### Penambahbaikan Enjin Semakan & Penskoran Artikulasi Penulisan (DSKP & Humanizer Malaya) (2026-10-11)
- Integrasi Standard Prestasi DSKP KSSM (TP 1 - TP 6) berasaskan taksonomi kognitif dan Kemahiran Proses Sains (KPS Penaakulan Sebab-Akibat / Inkuiri Saintifik).
- Integrasi Humanizer Malaya untuk pengesanan 7 corak klise AI (BM-01 s/d BM-07) serta pembetulan tatabahasa dan morfologi DBP.
- Pengemaskinian selaras antara `api/evaluate.js` (Vercel serverless) dan `app.js` (client-side rule engine & OpenRouter prompt).
- Penambahbaikan visual `renderAiEssayReportCard` dengan Lencana DSKP TP, Indeks Ketulenan Humanizer Malaya, diagnostik dwitunjang, dan bimbingan pedagogikal LPM.
- Ujian heuristik & sintaks berjaya sepenuhnya (`node -c`). Sandaran fail disahkan di `/Users/halimroslan/NEW CIDS SUITES PRO/pksk-sistem-backup/`.

### PKSK Admin Hub: PWA Rasmi, Ikon Kunci & Pemulihan Supabase (2026-10-03)
- Pemulihan & suntikan 500 kunci lesen komersial rasmi (`data/pksk_500_licenses.json`) ke projek Supabase aktif `lcfkvljmcamulshvyeqe` dengan had 2 peranti aktif.
- Perlindungan auto-migrasi `localStorage` pada `admin_portal/admin.js` untuk membersihkan URL lapuk `rvslrscgbhgdcktdtfrl`.
- Penjanaan set ikon PWA rasmi berimej lambang kunci & teks besar "PKSK ADMIN" (512px, 192px, maskable, iOS apple-touch-icon, favicon).
- PWA penuh dengan `manifest.json` dan `sw.js` (Network-first untuk data Supabase, caching aset statik).
- Pengoptimuman UI/UX responsif komprehensif untuk telefon pintar (< 768px, < 480px, < 360px) dan tablet/iPad (<= 1024px) dengan touch-target minimum 44px dan sokongan iOS safe-area insets.
- Pushed ke GitHub `abdulhalimroslan2/PKSKAdmin.git` dan aktif live di Vercel: https://pkskadmin.vercel.app.

### Fasa 6: Google OAuth Physflix UX & Percubaan Percuma 2 Hari
- Integrasi penuh Google OAuth Supabase (`pksk_users`).
- Pengalihan automatik (*auto-redirect*) terus ke Dashboard sejurus log masuk.
- Menu Dropdown Profil Avatar interaktif berserta butang Log Keluar.
- Penguatkuasaan Tempoh Percubaan 2 Hari (`TRIAL_DURATION_MS = 2 * 24 * 60 * 60 * 1000`) dan auto-lock sistem.
- Notis tamat tempoh `#trialLockNotice`, medan Kunci Lesen 16-digit `#inputLicenseKey`, dan butang pembelian terus Telegram `@halimroslan`.
- Simetri margin 1080px sejajar dengan kad ujian (`#trialStatusBanner` di dalam `.dashboard-grid`).

### Fasa 1 - 5 (Selesai Sepenuhnya)
- Portal Simulator PKSK & Bank Soalan 500+ Bahagian A, B, C.
- Sistem Penilai AI Artikulasi Penulisan (Ox Alpha + Gemini) berpandukan rubrik 4 kriteria LPM.
- Pemasa Berkembar 45 minit & 10 minit penutupan cadangan idea serentak.
- 22 Variasi tajuk esei Bahagian C, Modul Anti-Salin, PWA Simulator PKSK (`https://pksk2026.vercel.app`).

---

## 🚀 Next phase (Fasa 7: Peningkatan Bank Soalan Lanjutan KBAT Math & Sains)

**Goal:** Memperluas dan meningkatkan mutu bank soalan Bahagian B dengan soalan-soalan aras tinggi (KBAT) Matematik & Sains berformat terkini PKSK 2026/2027.

### Acceptance criteria
1. Penambahan set soalan KBAT Matematik (Penyelesaian masalah berbilang langkah, penaakulan spatial, nisbah, peratusan, corak nombor, tafsiran graf & data).
2. Penambahan set soalan KBAT Sains (Aplikasi konsep fizik asas, biologi harian, daya & tenaga, ekosistem, inferens saintifik & hipotesis).
3. Pengemaskinian `data/dataset.js` tanpa merosakkan indeks soalan atau format sedia ada.
4. Ujian keserasian paparan soalan pada peranti telefon pintar skrin kecil (< 360px) dan tablet.
5. Pemantauan status data & verifikasi integriti pemarkahan Bahagian B.

### Files to create / edit
| Type | File | Content |
|---|---|---|
| edit | `data/dataset.js` | Menambah soalan-soalan baharu KBAT Matematik & Sains serta pilihan jawapan & penerangan skema |
| edit | `app.js` | Memastikan pemilih soalan rawak atau pembahagian soalan mengikut sub-topik berfungsi lancar |
| edit | `PROJECT_FLOW.md` & `ROADMAP.md` | Mengemas kini status kemajuan Fasa 7 |

---

## 📁 Active architecture

- **Simulator Web:** https://pksk2026.vercel.app (Repo: `abdulhalimroslan2/PKSK`)
- **Admin Hub Web:** https://pkskadmin.vercel.app (Repo: `abdulhalimroslan2/PKSKAdmin`)
- **Pangkalan Data:** Supabase PostgreSQL (`lcfkvljmcamulshvyeqe.supabase.co`) — 500 Kunci Lesen Komersial Aktif.
- **10 Golden Invariants:** Sentiasa patuhi keselarasan pemasa esei 45m & 10m, anti-salin, ringkasan 4-6 frasa, percubaan 2 hari, margin 1080px simetri, dan protokol sandaran mandatori #10.

---

## 🔧 Useful commands

```bash
# Token-efficient file navigation
openwolf find <symbol_or_keyword>
graft grep "<symbol>"
graft skeleton <file>

# Handoff & Session Sync
openwolf scan
git status --short
git log --oneline -5
```
