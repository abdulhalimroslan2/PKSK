# PRODUCT CONTEXT — PKSK Sistem & Admin Hub

## 1. Product Identity
- **Product Name:** PKSK Sistem (Simulator Pentaksiran Kemasukan Sekolah Khusus & AI Artikulasi Penulisan)
- **Target Surface:** PKSK License Manager & Admin Hub (`admin_portal/` -> `https://pkskadmin.vercel.app`)
- **Primary Mode:** **Operate** (Internal license operations, live telemetry, inventory monitoring, multi-device authorization, and rapid order fulfillment for Shopee/WhatsApp/Telegram/TikTok Shop).

## 2. Core Users & Jobs-to-be-Done
- **Primary User:** Project Owner / Administrator / Customer Support Specialist.
- **Core Jobs:**
  1. **Instant Fulfillment (Agih Kunci):** Pick the next available license key, attach buyer details/Order ID, and copy a formatted delivery message to send to the buyer in under 5 seconds.
  2. **Inventory Oversight:** Monitor commercial pool capacity (500 active keys in Supabase `pksk_licenses`) — breakdown of available vs used vs expired vs blocked.
  3. **License Lifecycle Management:** Reset hardware device binding when a parent changes laptops, extend validity (+30d, +180d, +365d), or revoke/block suspicious keys.
  4. **Batch Operations & Audit:** Filter keys by status, search by IC/Device/Name, export CSV reports, and batch generate new cryptographic keys.

## 3. Technical Invariants & Constraints
- **Database Engine:** Supabase PostgreSQL (`lcfkvljmcamulshvyeqe.supabase.co`), table `pksk_licenses`.
- **License Key Format:** `PKSK-XXXX-XXXX-XXXX` (16 alphanumeric characters excluding confusing glyphs 0, O, 1, I, L).
- **Device Policy:** Hardware fingerprint hash bound to maximum 2 devices per license key.
- **Duration Policy:** Standard commercial tier valid for 6 months (180 days) from the exact timestamp of first activation.
- **Security:** Admin lock screen protected by authentication gate (`@reeZ860`) with auto-sanitization of legacy local storage.
