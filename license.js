/**
 * ============================================================================
 * SISTEM LESEN & PENGAKTIFAN SUPABASE (PKSK COMMERCIAL ENGINE)
 * ============================================================================
 * Menguruskan validasi dalam talian, sekuriti peranti, sesi pengaktifan
 * bagi 500 Kunci Lesen Komersial PKSK & Google/Gmail OAuth Supabase.
 * Projek Supabase: lcfkvljmcamulshvyeqe (https://lcfkvljmcamulshvyeqe.supabase.co)
 * Mematuhi skill: /firebase-to-supabase-migration (Zero-Data-Loss Standards)
 */

(function(window) {
  'use strict';

  // Konfigurasi Asas Supabase Sasaran: lcfkvljmcamulshvyeqe
  const DEFAULT_SUPABASE_URL = 'https://lcfkvljmcamulshvyeqe.supabase.co';
  const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZmt2bGptY2FtdWxzaHZ5ZXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NTc3ODYsImV4cCI6MjEwNjAzMzc4Nn0.bDAu2Inge2D53_zDeaI37mpEfMNcQYJraXxoVfoc1pc';

  const STORAGE_KEY_SESSION = 'pksk_license_session';
  const STORAGE_KEY_DEVICE = 'pksk_device_id';
  const STORAGE_KEY_CONFIG_URL = 'pksk_supabase_url';
  const STORAGE_KEY_CONFIG_KEY = 'pksk_supabase_anon_key';
  const STORAGE_KEY_TRIAL = 'pksk_trial_device_record';
  const TRIAL_DURATION_MS = 2 * 24 * 60 * 60 * 1000; // 48 Jam (2 Hari Penuh)
  const TELEGRAM_PURCHASE_URL = 'https://t.me/halimroslan';
  const TELEGRAM_USERNAME = '@halimroslan';

  /* =========================================================================
     HARDWARE DEVICE FINGERPRINT ENGINE (CROSS-BROWSER & RE-FORMAT RESISTANT)
     ========================================================================= */

  // Fast 32-bit MurmurHash3 algorithm
  function murmurHash3(keyStr, seed = 42) {
    let remainder = keyStr.length & 3;
    let bytesLen = keyStr.length - remainder;
    let h1 = seed;
    const c1 = 0xcc9e2d51;
    const c2 = 0x1b873593;
    let i = 0;

    while (i < bytesLen) {
      let k1 = (keyStr.charCodeAt(i) & 0xff) |
               ((keyStr.charCodeAt(i + 1) & 0xff) << 8) |
               ((keyStr.charCodeAt(i + 2) & 0xff) << 16) |
               ((keyStr.charCodeAt(i + 3) & 0xff) << 24);
      i += 4;

      k1 = Math.imul(k1, c1);
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = Math.imul(k1, c2);

      h1 ^= k1;
      h1 = (h1 << 13) | (h1 >>> 19);
      h1 = Math.imul(h1, 5) + 0xe6546b64;
    }

    let k1 = 0;
    if (remainder === 3) k1 ^= (keyStr.charCodeAt(bytesLen + 2) & 0xff) << 16;
    if (remainder >= 2) k1 ^= (keyStr.charCodeAt(bytesLen + 1) & 0xff) << 8;
    if (remainder >= 1) {
      k1 ^= (keyStr.charCodeAt(bytesLen) & 0xff);
      k1 = Math.imul(k1, c1);
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = Math.imul(k1, c2);
      h1 ^= k1;
    }

    h1 ^= keyStr.length;
    h1 ^= h1 >>> 16;
    h1 = Math.imul(h1, 0x85ebca6b);
    h1 ^= h1 >>> 13;
    h1 = Math.imul(h1, 0xc2b2ae35);
    h1 ^= h1 >>> 16;

    return (h1 >>> 0).toString(16).toUpperCase().padStart(8, '0');
  }

  // Detect Normalized OS Category (Stable across all browsers & profiles)
  function getNormalizedPlatform() {
    const p = (navigator.platform || navigator.userAgentData?.platform || '').toUpperCase();
    const ua = (navigator.userAgent || '').toUpperCase();
    if (p.includes('MAC') || ua.includes('MACINTOSH') || ua.includes('MAC OS')) return 'MACOS';
    if (p.includes('WIN') || ua.includes('WINDOWS')) return 'WINDOWS';
    if (p.includes('LINUX') || ua.includes('X11')) return 'LINUX';
    if (ua.includes('IPHONE') || ua.includes('IPAD') || ua.includes('IPOD')) return 'IOS';
    if (ua.includes('ANDROID')) return 'ANDROID';
    return 'UNKNOWN_OS';
  }

  // Generate Stable, Cross-Browser & Cross-Profile Hardware Fingerprint (HWFP-XXXXXXXX-YYYYYYYY)
  function getDeviceHardwareFingerprint() {
    if (window._pksk_hwfp_cached) return window._pksk_hwfp_cached;

    const osPlatform = getNormalizedPlatform();
    const cpuCores = navigator.hardwareConcurrency || 4;
    const screenRes = (window.screen) ? `${window.screen.width}x${window.screen.height}` : '1920x1080';
    const timeZone = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

    const hardwareIdentityString = [
      osPlatform,
      cpuCores,
      screenRes,
      timeZone
    ].join('##');

    const hash1 = murmurHash3(hardwareIdentityString, 101);
    const hash2 = murmurHash3(hardwareIdentityString, 997);
    const hwFingerprintId = `HWFP-${hash1}-${hash2}`;

    window._pksk_hwfp_cached = hwFingerprintId;
    localStorage.setItem(STORAGE_KEY_DEVICE, hwFingerprintId);
    return hwFingerprintId;
  }

  // Konfigurasi Supabase dengan perlindungan auto-migrasi dari projek lama
  function getSupabaseConfig() {
    let url = localStorage.getItem(STORAGE_KEY_CONFIG_URL);
    // Migrasi automatik jika URL lama dikesan (rvslrscgbhgdcktdtfrl -> lcfkvljmcamulshvyeqe)
    if (!url || url.includes('rvslrscgbhgdcktdtfrl')) {
      url = DEFAULT_SUPABASE_URL;
      localStorage.setItem(STORAGE_KEY_CONFIG_URL, DEFAULT_SUPABASE_URL);
      if (localStorage.getItem(STORAGE_KEY_CONFIG_KEY)?.includes('rvslrscgbhgdcktdtfrl')) {
        localStorage.removeItem(STORAGE_KEY_CONFIG_KEY);
      }
    }
    const anonKey = localStorage.getItem(STORAGE_KEY_CONFIG_KEY) || DEFAULT_SUPABASE_ANON_KEY;
    return { url, anonKey };
  }

  // Format Kunci Lesen automatik: PKSK-XXXX-XXXX-XXXX
  function sanitizeAndFormatKey(rawKey) {
    if (!rawKey) return '';
    let cleaned = rawKey.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleaned.startsWith('PKSK')) {
      cleaned = cleaned.substring(4);
    }
    
    // Pecahkan kepada blok 4 aksara
    const parts = [];
    for (let i = 0; i < cleaned.length && i < 12; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }
    
    if (parts.length === 0) return 'PKSK-';
    return 'PKSK-' + parts.join('-');
  }

  // Helper untuk memproses senarai Device ID berbilang peranti (Maksimum 2 Peranti)
  function parseRegisteredDevices(raw) {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    return String(raw).split(',').map(s => s.trim()).filter(Boolean);
  }

  /* =========================================================================
     SUPABASE JS CLIENT INITIALIZER & AUTH BRIDGE
     ========================================================================= */
  let _supabaseClientInstance = null;

  function getSupabaseClient() {
    const config = getSupabaseConfig();
    if (!config.url || !config.anonKey) return null;
    if (!window.supabase || typeof window.supabase.createClient !== 'function') return null;

    if (!_supabaseClientInstance || _supabaseClientInstance._url !== config.url) {
      try {
        _supabaseClientInstance = window.supabase.createClient(config.url, config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        _supabaseClientInstance._url = config.url;
      } catch (e) {
        console.warn('[PKSK Supabase] Gagal menginisialisasi supabase-js client:', e);
        return null;
      }
    }
    return _supabaseClientInstance;
  }

  /* =========================================================================
     FASA 3: SANITIZER & NORMALIZER PATTERN (ZERO DATA LOSS)
     ========================================================================= */
  function sanitizeUserForSupabase(authUser) {
    if (!authUser) return null;
    const nowIso = new Date().toISOString();
    const fullName = (
      authUser.user_metadata?.full_name || 
      authUser.user_metadata?.name || 
      authUser.email?.split('@')[0] || 
      'Calon PKSK'
    ).trim();

    const avatarUrl = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || '';
    const email = (authUser.email || '').trim().toLowerCase();

    return {
      auth_id: authUser.id,
      email: email,
      full_name: fullName,
      avatar_url: avatarUrl,
      provider: authUser.app_metadata?.provider || 'google',
      role: 'student',
      status: 'ACTIVE',
      last_sign_in_at: nowIso
    };
  }

  const PkskLicense = {
    getDeviceId: getDeviceHardwareFingerprint,
    
    getConfig: getSupabaseConfig,

    getSupabaseClient: getSupabaseClient,

    setSupabaseConfig: function(url, anonKey) {
      if (url) localStorage.setItem(STORAGE_KEY_CONFIG_URL, url.trim().replace(/\/$/, ''));
      if (anonKey) localStorage.setItem(STORAGE_KEY_CONFIG_KEY, anonKey.trim());
      _supabaseClientInstance = null; // Reset instance to reload config
    },

    isConfigured: function() {
      const config = getSupabaseConfig();
      return config.url && !config.url.includes('YOUR_PROJECT_ID') && config.anonKey && config.anonKey.length > 20;
    },

    TELEGRAM_URL: TELEGRAM_PURCHASE_URL,
    TELEGRAM_USER: TELEGRAM_USERNAME,
    TRIAL_DURATION_MS: TRIAL_DURATION_MS,

    // Inisialisasi atau ambil rekod percubaan peranti (2 Hari = 48 Jam)
    initTrial: function() {
      try {
        const deviceId = getDeviceHardwareFingerprint();
        const raw = localStorage.getItem(STORAGE_KEY_TRIAL);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.start && parsed.sig) {
            const expectedSig = murmurHash3(deviceId + '::' + parsed.start + '::PKSK_TRIAL_2026');
            if (parsed.sig === expectedSig) {
              return parsed;
            }
          }
        }
        // Cipta rekod percubaan baharu
        const start = Date.now();
        const sig = murmurHash3(deviceId + '::' + start + '::PKSK_TRIAL_2026');
        const newRecord = {
          device_id: deviceId,
          start: start,
          duration_ms: TRIAL_DURATION_MS,
          sig: sig
        };
        localStorage.setItem(STORAGE_KEY_TRIAL, JSON.stringify(newRecord));
        return newRecord;
      } catch (err) {
        console.warn('initTrial error:', err);
        return { start: Date.now(), duration_ms: TRIAL_DURATION_MS };
      }
    },

    // Semak status tempoh percubaan
    getTrialStatus: function() {
      // Jika telah diaktifkan dengan lesen sah / VIP, tempoh percubaan tidak lagi menyekat
      if (this.isActivated()) {
        return {
          isActivated: true,
          isTrial: false,
          isExpired: false,
          remainingMs: 0,
          remainingHours: 0,
          remainingDays: 0,
          remainingText: 'Lesen Penuh Aktif',
          progressPercent: 100
        };
      }

      const trial = this.initTrial();
      const now = Date.now();
      const elapsed = Math.max(0, now - trial.start);
      const remainingMs = Math.max(0, (trial.duration_ms || TRIAL_DURATION_MS) - elapsed);
      const isExpired = remainingMs <= 0;
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
      const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));

      let remainingText = '';
      if (isExpired) {
        remainingText = 'Tamat';
      } else if (remainingHours > 24) {
        remainingText = 'Baki ' + remainingDays + ' Hari';
      } else {
        remainingText = 'Baki ' + remainingHours + ' Jam';
      }

      const duration = trial.duration_ms || TRIAL_DURATION_MS;
      const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / duration) * 100)));

      return {
        isActivated: false,
        isTrial: true,
        isExpired: isExpired,
        start: trial.start,
        expiresAt: trial.start + duration,
        remainingMs: remainingMs,
        remainingHours: remainingHours,
        remainingDays: remainingDays,
        remainingText: remainingText,
        progressPercent: progressPercent
      };
    },

    // Semak sama ada pengguna dibenarkan mengakses ujian (Lesen Aktif ATAU Dalam Tempoh Percubaan 2 Hari)
    isAccessAllowed: function() {
      if (this.isActivated()) return true;
      const trial = this.getTrialStatus();
      return !trial.isExpired;
    },

    // Utiliti ujian pembangunan untuk menguji lock trial
    mockExpireTrialForTesting: function() {
      const deviceId = getDeviceHardwareFingerprint();
      const start = Date.now() - (TRIAL_DURATION_MS + 60000);
      const sig = murmurHash3(deviceId + '::' + start + '::PKSK_TRIAL_2026');
      localStorage.setItem(STORAGE_KEY_TRIAL, JSON.stringify({
        device_id: deviceId,
        start: start,
        duration_ms: TRIAL_DURATION_MS,
        sig: sig
      }));
      console.log('⚠️ [DEV TEST] Tempoh percubaan kini ditetapkan sebagai TAMAT (Expired).');
      return this.getTrialStatus();
    },

    resetTrialForTesting: function() {
      localStorage.removeItem(STORAGE_KEY_TRIAL);
      const res = this.initTrial();
      console.log('✓ [DEV TEST] Tempoh percubaan diset semula ke 48 Jam penuh.');
      return res;
    },

    // Periksa sama ada peranti ini telah mempunyai lesen yang sah & aktif
    isActivated: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_SESSION);
        if (!raw) return false;
        const session = JSON.parse(raw);
        if (!session || !session.status || session.status !== 'ACTIVE_SESSION') return false;
        
        // Developer bypass: sentiasa sah jika peranti developer
        if (session.is_developer || session.tier === 'DEVELOPER_SUPERADMIN') {
          return true;
        }

        // Pengesahan Log Masuk Gmail: Sah jika ada auth_id atau is_gmail_auth
        if (session.is_gmail_auth && session.email) {
          if (session.expires_at && new Date(session.expires_at).getTime() < Date.now()) {
            console.warn('⚠️ Tempoh sah sesi Gmail telah tamat.');
            localStorage.removeItem(STORAGE_KEY_SESSION);
            return false;
          }
          return true;
        }

        const currentHwId = getDeviceHardwareFingerprint();
        if (session.device_id !== currentHwId) return false;

        // Semak tempoh tamat sah lesen kunci biasa (6 Bulan)
        if (session.expires_at && new Date(session.expires_at).getTime() < Date.now()) {
          console.warn('⚠️ Tempoh sah lesen 6 bulan telah tamat.');
          localStorage.removeItem(STORAGE_KEY_SESSION);
          return false;
        }
        
        return true;
      } catch (e) {
        return false;
      }
    },

    // Ambil maklumat sesi aktif semasa
    getLicenseSession: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_SESSION);
        if (!raw) return null;
        const session = JSON.parse(raw);
        if (session && session.expires_at && new Date(session.expires_at).getTime() < Date.now()) {
          localStorage.removeItem(STORAGE_KEY_SESSION);
          return null;
        }
        return session;
      } catch (e) {
        return null;
      }
    },

    /* =========================================================================
       GOOGLE / GMAIL OAUTH AUTHENTICATION (SUPABASE AUTH)
       ========================================================================= */
    signInWithGoogle: async function() {
      const config = getSupabaseConfig();
      if (!config.anonKey || config.anonKey.length < 20) {
        return {
          success: false,
          needsConfig: true,
          message: 'Sila masukkan Anon Public Key untuk projek Supabase lcfkvljmcamulshvyeqe di tetapan sebelum log masuk Google.'
        };
      }

      const client = getSupabaseClient();
      if (!client) {
        return {
          success: false,
          message: 'Pustaka Supabase JS belum sedia atau pelayan tidak dapat dicapai. Sila semak sambungan internet.'
        };
      }

      try {
        const redirectUrl = window.location.origin + window.location.pathname;
        const { data, error } = await client.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        });

        if (error) throw error;
        return { success: true, data };
      } catch (err) {
        console.error('[PKSK Google OAuth Error]:', err);
        return { success: false, message: err.message || 'Ralat memulakan log masuk Google.' };
      }
    },

    // Proses sesi pengguna selepas berjaya log masuk Google (Upsert ke pksk_users)
    handleGoogleUserSession: async function(authUser) {
      if (!authUser) return null;

      const deviceId = getDeviceHardwareFingerprint();
      const now = new Date();
      // Akses 1 Tahun untuk pengguna berdaftar Google Auth
      const oneYearLater = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000)).toISOString();

      const sanitizedProfile = sanitizeUserForSupabase(authUser);

      // Safe Upsert ke jadual public.pksk_users
      const client = getSupabaseClient();
      if (client && sanitizedProfile) {
        try {
          const { error: upsertErr } = await client
            .from('pksk_users')
            .upsert(sanitizedProfile, { onConflict: 'email' });
          if (upsertErr) {
            console.warn('[PKSK Supabase] Amaran upsert pksk_users (abaikan jika RLS membaca):', upsertErr.message);
          } else {
            console.log('✓ Profil pengguna berjaya disimpan ke pksk_users Supabase:', sanitizedProfile.email);
          }
        } catch (dbErr) {
          console.warn('[PKSK Supabase DB Notice]:', dbErr);
        }
      }

      const activeSession = {
        license_key: 'GMAIL-' + authUser.id.substring(0, 8).toUpperCase(),
        status: 'ACTIVE_SESSION',
        tier: 'GMAIL_AUTHENTICATED',
        auth_id: authUser.id,
        email: sanitizedProfile.email,
        device_id: deviceId,
        max_devices: 5,
        device_slot: 1,
        activated_by_name: sanitizedProfile.full_name,
        avatar_url: sanitizedProfile.avatar_url,
        is_gmail_auth: true,
        provider: 'google',
        activated_at: now.toISOString(),
        expires_at: oneYearLater,
        validity_days: 365
      };

      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(activeSession));
      return activeSession;
    },

    // Dengarkan perubahan status pengesahan Supabase (OAuth Callback / Refresh)
    initAuthListener: function(onUserSessionChange) {
      const client = getSupabaseClient();
      if (!client) return;

      // 1. Semak sesi sedia ada terlebih dahulu
      client.auth.getSession().then(async ({ data: { session } }) => {
        if (session && session.user) {
          const activeSess = await this.handleGoogleUserSession(session.user);
          if (onUserSessionChange) onUserSessionChange(activeSess);
        }
      }).catch(err => {
        console.warn('[PKSK Auth] Semakan sesi awal:', err);
      });

      // 2. Langganan peristiwa perubahan status Auth
      client.auth.onAuthStateChange(async (event, session) => {
        console.log('[PKSK Supabase Auth Event]:', event);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          if (session && session.user) {
            const activeSess = await this.handleGoogleUserSession(session.user);
            if (onUserSessionChange) onUserSessionChange(activeSess);
          }
        } else if (event === 'SIGNED_OUT') {
          this.deactivateLocal();
          if (onUserSessionChange) onUserSessionChange(null);
        }
      });
    },

    // Log keluar Google Auth
    signOutGoogle: async function() {
      const client = getSupabaseClient();
      if (client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn('[PKSK Supabase] SignOut error:', e);
        }
      }
      this.deactivateLocal();
    },

    // Auto-restore sesi lesen dari Supabase jika peranti ini (Hardware Fingerprint) telah didaftarkan sebelum ini
    autoRestoreHardwareLicense: async function() {
      if (this.isActivated()) return { restored: true, session: this.getLicenseSession() };
      if (!this.isConfigured()) return { restored: false };

      try {
        const currentHwId = getDeviceHardwareFingerprint();
        const config = getSupabaseConfig();
        
        // Cari rekod lesen yang berstatus USED dan mengandungi HWFP peranti ini
        const endpoint = `${config.url}/rest/v1/pksk_licenses?status=eq.USED&device_id=ilike.*${encodeURIComponent(currentHwId)}*&select=*`;
        const headers = {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
          'Content-Type': 'application/json'
        };

        const res = await fetch(endpoint, { headers });
        if (!res.ok) return { restored: false };

        const rows = await res.json();
        if (!rows || rows.length === 0) return { restored: false };

        // Cari rekod yang masih belum luput
        const now = Date.now();
        const validRecord = rows.find(r => !r.expires_at || new Date(r.expires_at).getTime() > now);
        if (!validRecord) return { restored: false };

        const registeredDevices = parseRegisteredDevices(validRecord.device_id);
        const slot = registeredDevices.indexOf(currentHwId) + 1;

        const restoredSession = {
          license_key: validRecord.license_key,
          status: 'ACTIVE_SESSION',
          tier: validRecord.tier || 'PREMIUM_6_MONTHS',
          device_id: currentHwId,
          max_devices: validRecord.max_devices || 2,
          device_slot: slot > 0 ? slot : 1,
          activated_by_name: validRecord.activated_by_name || 'Calon PKSK',
          activated_by_ic: validRecord.activated_by_ic || '-',
          activated_at: validRecord.activated_at,
          expires_at: validRecord.expires_at
        };

        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(restoredSession));
        console.log('✓ Sesi lesen berjaya dipulihkan secara automatik melalui Hardware Fingerprint!');
        return { restored: true, session: restoredSession };

      } catch (err) {
        console.warn('Auto restore hardware license error:', err);
        return { restored: false, error: err.message };
      }
    },

    // Validasi & Aktifkan Kunci Lesen melalui Supabase REST API (Had 2 Peranti)
    activateLicenseOnline: async function(rawKey, candidateName, candidateIc) {
      const cleanInput = (rawKey || '').trim().toUpperCase();
      const DEV_MASTER_KEYS = ['PKSK-DEV-MASTER-2026', 'PKSK-DEV-HALIM-ROSLAN', 'PKSK-DEV-UNLOCK', 'DEV-PKSK-2026', 'PKSK-CIKGU-HALIM'];

      const deviceId = getDeviceHardwareFingerprint();
      const now = new Date();

      // Semakan PINTASAN PEMBANGUN (Developer Master Key Override)
      if (DEV_MASTER_KEYS.includes(cleanInput) || cleanInput === 'DEV-UNLOCK' || cleanInput.startsWith('PKSK-DEV-')) {
        const devSession = {
          license_key: cleanInput,
          status: 'ACTIVE_SESSION',
          tier: 'DEVELOPER_SUPERADMIN',
          device_id: deviceId,
          max_devices: 999,
          device_slot: 1,
          activated_by_name: candidateName && candidateName !== 'Calon PKSK' ? candidateName : 'Cikgu Halim (Pembangun Sistem)',
          activated_by_ic: candidateIc || 'DEV-SUPERADMIN',
          activated_at: now.toISOString(),
          expires_at: '2099-12-31T23:59:59.000Z',
          validity_days: 99999,
          is_developer: true
        };
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(devSession));
        return {
          success: true,
          message: '👑 Selamat Datang Cikgu Halim! Akses Penuh Pembangun (Developer Lifetime VIP) telah diaktifkan.',
          session: devSession
        };
      }
      const formattedKey = sanitizeAndFormatKey(rawKey);
      if (!formattedKey || formattedKey.length < 19) {
        return { success: false, message: 'Format Kunci Lesen tidak lengkap. Sila masukkan format PKSK-XXXX-XXXX-XXXX.' };
      }

      const config = getSupabaseConfig();
      // Tetapan Tempoh Sah: Tepat 6 Bulan (180 Hari) bermula tarikh pengaktifan
      const sixMonthsLater = new Date(now.getTime() + (180 * 24 * 60 * 60 * 1000));
      const expiresAtIso = sixMonthsLater.toISOString();

      // Sekiranya Supabase belum dikonfigurasikan atau dalam mod offline developer
      if (!this.isConfigured()) {
        console.warn('⚠️ Supabase URL / Key belum dikonfigurasikan. Menggunakan mod pengesahan tempatan.');
        
        // Cipta sesi aktif tempatan
        const mockSession = {
          license_key: formattedKey,
          status: 'ACTIVE_SESSION',
          tier: 'PREMIUM_6_MONTHS',
          device_id: deviceId,
          max_devices: 2,
          device_slot: 1,
          activated_by_name: candidateName || 'Calon PKSK',
          activated_by_ic: candidateIc || '-',
          activated_at: now.toISOString(),
          expires_at: expiresAtIso,
          validity_days: 180,
          is_offline_verified: true
        };
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(mockSession));
        return { 
          success: true, 
          message: 'Lesen PKSK (Sah 6 Bulan • Peranti 1/2) berjaya diaktifkan!', 
          session: mockSession 
        };
      }

      try {
        // 1. Carian Kunci Lesen di Jadual Supabase
        const endpointQuery = `${config.url}/rest/v1/pksk_licenses?license_key=eq.${encodeURIComponent(formattedKey)}&select=*`;
        const headers = {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        };

        const res = await fetch(endpointQuery, { headers });
        if (!res.ok) {
          throw new Error(`Ralat pelayan pangkalan data (${res.status}). Sila semak sambungan internet.`);
        }

        const data = await res.json();
        if (!data || data.length === 0) {
          return { success: false, message: 'Kunci Lesen tidak wujud atau tidak sah. Sila semak semula ejaan kunci anda.' };
        }

        const licenseRecord = data[0];

        // 2. Semakan Status Kunci
        if (licenseRecord.status === 'BLOCKED') {
          return { success: false, message: 'Kunci Lesen ini telah disekat. Sila hubungi pihak pentadbir.' };
        }

        // Semak tarikh tamat tempoh 6 bulan
        if (licenseRecord.expires_at && new Date(licenseRecord.expires_at).getTime() < Date.now()) {
          return { success: false, message: 'Tempoh sah lesen (6 bulan) untuk kunci ini telah tamat. Sila dapatkan kunci lesen baharu.' };
        }

        if (licenseRecord.status === 'EXPIRED') {
          return { success: false, message: 'Tempoh sah Kunci Lesen ini telah tamat.' };
        }

        // 3. Semakan Senarai Peranti (Had 2 Peranti)
        const registeredDevices = parseRegisteredDevices(licenseRecord.device_id);
        const maxAllowedDevices = licenseRecord.max_devices || 2;
        const isDeviceAlreadyRegistered = registeredDevices.includes(deviceId);

        // KES A: Peranti ini telah berdaftar sebelumnya
        if (isDeviceAlreadyRegistered) {
          const validSession = {
            license_key: formattedKey,
            status: 'ACTIVE_SESSION',
            tier: licenseRecord.tier || 'PREMIUM_6_MONTHS',
            device_id: deviceId,
            max_devices: maxAllowedDevices,
            device_slot: registeredDevices.indexOf(deviceId) + 1,
            activated_by_name: licenseRecord.activated_by_name || candidateName,
            activated_at: licenseRecord.activated_at,
            expires_at: licenseRecord.expires_at || expiresAtIso
          };
          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(validSession));
          return { 
            success: true, 
            message: `Selamat kembali! Lesen anda aktif (Peranti ${validSession.device_slot}/${maxAllowedDevices}) pada peranti ini.`, 
            session: validSession 
          };
        }

        // KES B: Peranti baharu dan masih ada slot (cth: 0/2 atau 1/2)
        if (registeredDevices.length < maxAllowedDevices) {
          registeredDevices.push(deviceId);
          const currentSlot = registeredDevices.length;

          const updateEndpoint = `${config.url}/rest/v1/pksk_licenses?license_key=eq.${encodeURIComponent(formattedKey)}`;
          const updateBody = {
            status: 'USED',
            tier: 'PREMIUM_6_MONTHS',
            max_devices: maxAllowedDevices,
            device_id: registeredDevices.join(','),
            activated_by_name: licenseRecord.activated_by_name || candidateName || 'Calon PKSK',
            activated_by_ic: licenseRecord.activated_by_ic || candidateIc || '-',
            activated_at: licenseRecord.activated_at || now.toISOString(),
            expires_at: licenseRecord.expires_at || expiresAtIso
          };

          const patchRes = await fetch(updateEndpoint, {
            method: 'PATCH',
            headers: {
              ...headers,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(updateBody)
          });

          if (!patchRes.ok) {
            throw new Error('Gagal mengemas kini pendaftaran peranti ke pelayan Supabase.');
          }

          const savedSession = {
            license_key: formattedKey,
            status: 'ACTIVE_SESSION',
            tier: 'PREMIUM_6_MONTHS',
            device_id: deviceId,
            max_devices: maxAllowedDevices,
            device_slot: currentSlot,
            activated_by_name: updateBody.activated_by_name,
            activated_by_ic: updateBody.activated_by_ic,
            activated_at: updateBody.activated_at,
            expires_at: updateBody.expires_at
          };

          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(savedSession));

          return { 
            success: true, 
            message: `Tahniah! Akses PKSK Simulator (Sah 6 Bulan) berjaya diaktifkan pada Peranti ${currentSlot}/${maxAllowedDevices}!`, 
            session: savedSession 
          };
        }

        // KES C: Had 2 peranti telah penuh (2/2) dan peranti ke-3 cuba masuk
        return { 
          success: false, 
          message: `Had ${maxAllowedDevices} peranti telah dicapai untuk kunci ini. Kunci lesen ini telah didaftarkan pada ${registeredDevices.length} peranti lain. Sila hubungi penjual jika anda ingin menukar peranti.` 
        };

      } catch (err) {
        console.error('PkskLicense Error:', err);
        return { success: false, message: err.message || 'Ralat semasa menghubungi pelayan validasi Supabase.' };
      }
    },

    // Nyahaktif lesen (logout/reset dari peranti)
    deactivateLocal: function() {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  };

  window.PkskLicense = PkskLicense;
  window.sanitizeAndFormatKey = sanitizeAndFormatKey;

})(window);
