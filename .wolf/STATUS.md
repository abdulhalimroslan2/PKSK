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
