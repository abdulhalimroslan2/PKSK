# 🇲🇾 Sistem Simulator PKSK Tingkatan 1 (Kementerian Pendidikan Malaysia)

Sistem Simulator Pentaksiran Kemasukan Sekolah Khusus (PKSK) Tingkatan 1 yang autentik, lengkap, dan interaktif berpandukan format dan piawaian rasmi Lembaga Peperiksaan Malaysia & Kementerian Pendidikan Malaysia (KPM).

---

## 🌟 Ciri-Ciri Utama

1. **Format Rasmi PKSK**:
   - **Bahagian A (Kecerdasan Insaniah - 20%)**: 30 Soalan (Integriti, EQ, SQ, Kepimpinan).
   - **Bahagian B (Kecerdasan Intelektual - 70%)**: 70 Soalan (IQ, Penyelesaian Masalah, Matematik, Sains, Bahasa Melayu & Bahasa Inggeris).
   - **Bahagian C (Artikulasi Penulisan - 10%)**: Karangan Esei Berpandu 100+ patah perkataan dengan semakan AI.

2. **Bank Soalan Autentik (500+ Soalan & Rajah Rasmi)**:
   - Mengandungi lebih 500 soalan asli merangkumi silibus penuh dengan rajah-rajah berkualiti tinggi (*Clipped Diagrams*).

3. **Enjin Penilaian Esei AI Bersepadu (Ox Alpha AI)**:
   - Integrasi semakan esei masa nyata dengan pemarkahan berasaskan 4 kriteria rasmi LPM: Idea & Kematangan Hujah, Bahasa & Tatabahasa, Struktur Perenggan, dan Nilai Murni & KBAT.

4. **Mod Pembelajaran Fleksibel**:
   - **Simulasi Penuh (90 minit + 45 minit)**: Simulasi sebenar dewan peperiksaan.
   - **Diagnostik Pantas (30 soalan)**: Ujian ringkas untuk mengukur tahap penguasaan asas.
   - **Latih Tubi Ikut Subjek**: Fokus latih tubi khusus (IQ, Matematik, Sains, BM, BI, dsb.).
   - **Latihan Esei Sahaja**: Latihan intensif penulisan esei Bahagian C bersama semakan AI.

5. **Slip Keputusan Rasmi & Skema Penjelasan Lengkap**:
   - Paparan slip markah format rasmi berserta gred/band kelayakan (SBP, SMKA, MRSM, MTD).
   - Mod semakan jawapan terperinci berserta penerangan konsep soalan.

---

## 🚀 Cara Menjalankan Secara Tempatan

Buka terminal dan jalankan:
```bash
# Menggunakan npx serve atau mana-mana HTTP static server
npx serve -p 3000
```
Buka pelayar web di: `http://localhost:3000`

---

## 📁 Struktur Fail
- `index.html` — Antara muka utama Portal Rasmi PKSK.
- `styles.css` — Reka bentuk korporat KPM, susun atur grid responsif & tema.
- `app.js` — Logik sistem simulator, pengiraan markah, pemasa & integrasi AI Ox Alpha.
- `data/dataset.js` — Bank soalan PKSK master.
- `assets/` — Logo rasmi KPM, Jata Negara & rajah-rajah soalan.

---
*Dibangunkan untuk kemudahan murid, guru, dan ibu bapa membuat persediaan PKSK.*
