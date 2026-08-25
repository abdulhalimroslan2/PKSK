/**
 * ============================================================================
 * SISTEM LESEN & PENGAKTIFAN SUPABASE (PKSK COMMERCIAL ENGINE)
 * ============================================================================
 * Menguruskan validasi dalam talian, sekuriti peranti, dan sesi pengaktifan
 * bagi 500 Kunci Lesen Komersial PKSK.
 */

(function(window) {
  'use strict';

  // Konfigurasi Asas Supabase (Boleh dikemaskini oleh Pengurus/Developer)
  const DEFAULT_SUPABASE_URL = 'https://rvslrscgbhgdcktdtfrl.supabase.co';
  const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2c2xyc2NnYmhnZGNrdGR0ZnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MzM3MDQsImV4cCI6MjEwMzIwOTcwNH0.B5PRH8Mp7NgKDO9NnyS0akFcBuWz-e5xjKjEFjUD-1Y';

  const STORAGE_KEY_SESSION = 'pksk_license_session';
  const STORAGE_KEY_DEVICE = 'pksk_device_id';
  const STORAGE_KEY_CONFIG_URL = 'pksk_supabase_url';
  const STORAGE_KEY_CONFIG_KEY = 'pksk_supabase_anon_key';

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

  // Detect GPU Hardware (Normalized across Chrome, Safari, Firefox, Edge)
  function getNormalizedGpuSignature() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return 'GL_NONE';
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      let rawVendor = '';
      let rawRenderer = '';
      if (debugInfo) {
        rawVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
        rawRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      }
      
      const full = (rawVendor + ' ' + rawRenderer).toUpperCase();
      if (full.includes('APPLE')) return 'APPLE_SILICON_GPU';
      if (full.includes('INTEL')) return 'INTEL_GRAPHICS_GPU';
      if (full.includes('NVIDIA') || full.includes('GEFORCE')) return 'NVIDIA_DISCRETE_GPU';
      if (full.includes('AMD') || full.includes('RADEON')) return 'AMD_RADEON_GPU';
      return full.replace(/[^A-Z0-9]/g, '').substring(0, 20) || 'GENERIC_GPU';
    } catch (e) {
      return 'GL_UNAVAILABLE';
    }
  }

  // Detect Normalized OS Category
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

  // Generate Stable, Cross-Browser Hardware-bound Device Fingerprint (HWFP-XXXXXXXX-YYYYYYYY)
  function getDeviceHardwareFingerprint() {
    if (window._pksk_hwfp_cached) return window._pksk_hwfp_cached;

    const screenData = (window.screen) ? `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth || 24}` : '1920x1080x24';
    const cpuCores = navigator.hardwareConcurrency || 4;
    const osPlatform = getNormalizedPlatform();
    const gpuSignature = getNormalizedGpuSignature();
    const timeZone = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

    // Gabungkan komponen perkakasan tulen fizikal yang stabil rentas pelayar
    const hardwareIdentityString = [
      osPlatform,
      cpuCores,
      screenData,
      timeZone,
      gpuSignature
    ].join('##');

    const hash1 = murmurHash3(hardwareIdentityString, 101);
    const hash2 = murmurHash3(hardwareIdentityString, 997);
    const hwFingerprintId = `HWFP-${hash1}-${hash2}`;

    window._pksk_hwfp_cached = hwFingerprintId;
    localStorage.setItem(STORAGE_KEY_DEVICE, hwFingerprintId);
    return hwFingerprintId;
  }

  function getSupabaseConfig() {
    const url = localStorage.getItem(STORAGE_KEY_CONFIG_URL) || DEFAULT_SUPABASE_URL;
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

  window.PkskLicense = {
    getDeviceId: getDeviceHardwareFingerprint,
    
    getConfig: getSupabaseConfig,

    setSupabaseConfig: function(url, anonKey) {
      if (url) localStorage.setItem(STORAGE_KEY_CONFIG_URL, url.trim().replace(/\/$/, ''));
      if (anonKey) localStorage.setItem(STORAGE_KEY_CONFIG_KEY, anonKey.trim());
    },

    isConfigured: function() {
      const config = getSupabaseConfig();
      return config.url && !config.url.includes('YOUR_PROJECT_ID') && config.anonKey && !config.anonKey.includes('YOUR_SUPABASE_ANON_KEY');
    },

    // Periksa sama ada peranti ini telah mempunyai lesen yang sah & aktif
    isActivated: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_SESSION);
        if (!raw) return false;
        const session = JSON.parse(raw);
        if (!session || !session.license_key || session.status !== 'ACTIVE_SESSION') return false;
        
        const currentHwId = getDeviceHardwareFingerprint();
        // Semak padanan Hardware Fingerprint
        if (session.device_id !== currentHwId) return false;

        // Semak tempoh tamat sah (6 Bulan)
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

    // Validasi & Aktifkan Kunci Lesen melalui Supabase REST API (Had 2 Peranti)
    activateLicenseOnline: async function(rawKey, candidateName, candidateIc) {
      const formattedKey = sanitizeAndFormatKey(rawKey);
      if (!formattedKey || formattedKey.length < 19) {
        return { success: false, message: 'Format Kunci Lesen tidak lengkap. Sila masukkan format PKSK-XXXX-XXXX-XXXX.' };
      }

      const deviceId = getDeviceHardwareFingerprint();
      const config = getSupabaseConfig();

      const now = new Date();
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
