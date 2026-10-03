# DESIGN SYSTEM & VISUAL WORLD — PKSK Admin Hub

## 1. Visual World & Direction: "Obsidian & Deep Cobalt Enterprise"
- **Surface Category:** Web Application Dashboard (Mode: **Operate**).
- **Core Mood:** High-authority, calm, precise, dense, distraction-free. The tool disappears into the task.
- **Palette Principles:**
  - Base: Deep Obsidian Slate (`#080b11`), never pure black (`#000000`).
  - Cards & Shell: Layered Obsidian Glass (`#0e1422` with hairline border `rgba(255, 255, 255, 0.07)`).
  - Elevated Surfaces & Headers: `#141d30`.
  - Hover States: `#1a253d`.
- **Semantic Accents:**
  - Primary Action / Fulfillment: Emerald Teal (`#10b981`, hover `#059669`, ring `rgba(16, 185, 129, 0.25)`).
  - Status "ACTIVE" (Tersedia): Emerald (`#10b981`, bg `rgba(16, 185, 129, 0.12)`, text `#34d399`).
  - Status "USED" (Diaktifkan): Sapphire Cobalt (`#3b82f6`, bg `rgba(59, 130, 246, 0.12)`, text `#60a5fa`).
  - Status "EXPIRED" (Tamat Tempoh): Amber Ochre (`#f59e0b`, bg `rgba(245, 158, 11, 0.12)`, text `#fbbf24`).
  - Status "BLOCKED" (Disekat): Crimson Rose (`#f43f5e`, bg `rgba(244, 63, 94, 0.12)`, text `#fb7185`).

## 2. Typography
- **UI & Headings:** `Plus Jakarta Sans`, system-ui, sans-serif.
  - Scale: Display H1 1.35rem, Card H2 1.05rem, Section H3 0.95rem, Body 0.875rem, Caption 0.75rem.
- **Data & Monospace:** `JetBrains Mono`, `SF Mono`, monospace.
  - Applied to: License keys (`PKSK-XXXX-XXXX-XXXX`), device IDs, IC numbers, timestamps, and data counts.
  - Tabular numerals enabled via `font-variant-numeric: tabular-nums` and `font-feature-settings: "tnum" 1`.

## 3. Craft Floor Adherence
- **Zero Kickers/Eyebrows:** Headings carry their own weight without decorative subtitles above them.
- **Zero Gradient Text:** Contrast and weight convey hierarchy.
- **Icons:** SVG / FontAwesome icons in a unified 1.25x scale; zero raw emojis standing in for functional icons.
- **Browser Surface Theming:**
  - Custom scrollbar styled to dark obsidian.
  - Text selection: `::selection { background: rgba(59, 130, 246, 0.35); color: #ffffff; }`.
  - Caret color: `#38bdf8`.
  - Focus visible rings: `2px solid #3b82f6; outline-offset: 2px;`.
- **Motion:** Micro-transitions strictly bounded between 150ms–220ms, ease-out. No sluggish entrance sequences.
- **Scanability:** High information density without visual noise. Fixed header, sticky actions on mobile, crisp borders.
