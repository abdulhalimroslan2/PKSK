---
description: learned preferences, project conventions, and Do-Not-Repeat rules
budget_tokens: 2000
---
# Cerebrum — PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-10-03

## User Preferences & Developer Rules

- **Persona & Engineering Rigor:** Agency Frontend Developer & Minimal Change Engineer. Surgical precision, zero unintended side-effects, minimal diffs.
- **Aesthetic Excellence:** Mengikuti tema visual Physflix (gelap, elegan, responsif, kontras tinggi, typography moden, elak klise reka bentuk AI).
- **Bahasa & Silibus:** Bahasa Melayu baku autentik KPM mengikut format Lembaga Peperiksaan Malaysia (LPM).
- **Token Efficiency:** Selalu gunakan `openwolf find <symbol>` atau `graft grep / skeleton` sebelum membuka fail besar seperti `app.js` (~180KB) atau `data/dataset.js`.
- **Mandatory Backup:** Sentiasa patuhi Invariant #10 — buat salinan sandaran sebelum membuat sebarang perubahan fail.

## 10 Golden Invariants (Perlembagaan Projek)

1. **Keselarasan Pemasa Esei Bahagian C:** Pemasa 45 minit dan pemasa 10 minit auto-tutup cadangan idea WAJIB bermula serentak.
2. **Perlindungan Anti-Salin:** Kotak idea AI dilindungi `user-select: none` dan larangan salin-tampal.
3. **Peringkasan Cadangan Poin Esei:** Cadangan isi wajib diringkaskan kepada 4–6 frasa padat, bukan perenggan panjang.
4. **Penjanaan Tajuk Rawak:** Setiap sesi esei wajib memaparkan tajuk secara rawak.
5. **Polisi Tempoh Percubaan 2 Hari:** Tempoh percubaan tepat 2 hari (`TRIAL_DURATION_MS = 2 * 24 * 60 * 60 * 1000`). Apabila tamat, sistem dikunci serta-merta.
6. **Peralihan Auto ke Dashboard:** Log masuk Google OAuth berjaya MESTI terus mengalihkan calon ke paparan `DASHBOARD`.
7. **Pusat Log Keluar pada Avatar:** Log keluar dilaksanakan melalui dropdown avatar pengguna (`#userProfileDropdown`).
8. **Modal Pengaktifan Khusus Lesen:** Modal `#activationModal` dikhususkan secara eksklusif untuk kunci lesen 16-digit atau pembelian Telegram `@halimroslan`.
9. **Simetri Margin Spanning:** `#trialStatusBanner` diletakkan di dalam `.dashboard-grid` (1080px simetri).
10. **Protokol Sandaran Mandatori:** Sebarang pengubahsuaian fail wajib disandarkan ke `/Users/halimroslan/NEW CIDS SUITES PRO/pksk-sistem-backup/` sebelum diedit.

## Key Learnings

- **Project:** PKSK Sistem (Simulator Ujian & AI Artikulasi Penulisan)
- **Description:** Sistem Simulator Pentaksiran Kemasukan Sekolah Khusus (PKSK) Tingkatan 1 KPM berpandukan format dan piawaian rasmi LPM & KPM.
- **Fail Besar:** `app.js` bersaiz > 180KB dan mengandungi banyak modul interaktif. Jangan sekali-kali membaca keseluruhan fail tanpa sasaran baris yang tepat. Gunakan `graft grep` atau `openwolf find` untuk mencari fungsi khusus.
- **Supabase Cloud Sync:** Konfigurasi Supabase dan Google OAuth tersimpan pada pangkalan data Supabase rasmi.

## Do-Not-Repeat

- **[2026-09-27] Jangan letak butang Google Login dalam Modal Lesen:** Modal lesen (#activationModal) mestilah fokus khusus untuk pengesahan kunci lesen 16-digit atau pembelian Telegram @halimroslan.
- **[2026-09-27] Jangan pisahkan pemasa esei dan idea:** Pemasa 45 minit dan pemasa 10 minit penutupan idea mesti diselaraskan serentak (`startEssaySessionTimers`).
- **[2026-09-27] Jangan benarkan salin-tampal pada teks cadangan AI:** Kotak idea mesti dilindungi dengan `user-select: none` dan larangan salin teks.
- **[2026-09-27] Jangan letak banner percubaan di luar grid:** `#trialStatusBanner` wajib berada dalam `.dashboard-grid` agar margin kiri dan kanan simetri tepat 1080px.

## Decision Log

- **2026-09-27 (Fasa 6): Polisi Percubaan 2 Hari & Penguncian Sistem**: Menetapkan tempoh percubaan percuma tepat 2 hari untuk memberikan calon pengalaman ujian pantas sebelum mengunci sistem secara automatik.
- **2026-09-27 (Fasa 6): Avatar Dropdown Menu & Penyingkiran Butang Lewah**: Menggantikan tab lewah 'Log Masuk' di bar navigasi dan butang hero dengan satu menu profil dropdown interaktif pada avatar.
- **2026-09-27 (Fasa 6): Penyesuaian Margin Sepadan Sepenuhnya**: Memindahkan `#trialStatusBanner` ke dalam `.dashboard-grid` untuk memastikan margin kiri dan kanan sentiasa simetri tepat dengan kad ujian (1080px).
- **2026-09-27 (Fasa 6): Pembersihan Modal Lesen**: Membuang butang Google login dan divider dari modal pengaktifan kunci lesen agar aliran pembelian dan pengesahan kunci 16-digit menjadi lebih fokus.
- **2026-09-27 (Fasa 5): Kad Kawalan Pilihan Tema & Dropdown Tajuk Esei**: Menyediakan fleksibiliti ujian esei dengan 22 variasi tajuk.
- **2026-09-12 (Fasa 4): Pemasa Berkembar 45m & 10m**: Melaksanakan fungsi dwi-pemasa serentak untuk membimbing pengurusan masa murid.
- **2026-09-11 (Fasa 3): Integrasi AI Enjin Berganda**: Menggabungkan Ox Alpha dan Google Gemini untuk penilaian rubrik 4 kriteria LPM.
- **2026-09-06 (Fasa 2): Lesen Perkakasan Supabase**: Pengesahan lesen berasaskan perkakasan untuk mengawal penggunaan peranti serentak.
- **2026-08-25 (Fasa 1): Seni Bina Asas Simulator**: Pembangunan simulator web Vanilla JS dengan pemarkahan pantas dan paparan autentik dewan peperiksaan.
