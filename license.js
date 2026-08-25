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

  // Dapatkan atau cipta Device ID yang unik
  function getOrCreateDeviceId() {
    let deviceId = localStorage.getItem(STORAGE_KEY_DEVICE);
    if (!deviceId) {
      deviceId = 'DEV-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
      localStorage.setItem(STORAGE_KEY_DEVICE, deviceId);
    }
    return deviceId;
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

  const PkskLicense = {
    getDeviceId: getOrCreateDeviceId,
    
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
        
        // Semak padanan Device ID
        if (session.device_id !== getOrCreateDeviceId()) return false;

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

    // Validasi & Aktifkan Kunci Lesen melalui Supabase REST API
    activateLicenseOnline: async function(rawKey, candidateName, candidateIc) {
      const formattedKey = sanitizeAndFormatKey(rawKey);
      if (!formattedKey || formattedKey.length < 19) {
        return { success: false, message: 'Format Kunci Lesen tidak lengkap. Sila masukkan format PKSK-XXXX-XXXX-XXXX.' };
      }

      const deviceId = getOrCreateDeviceId();
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
          message: 'Lesen PKSK (Sah 6 Bulan) berjaya diaktifkan!', 
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

        // Jika kunci sudah berstatus 'USED'
        if (licenseRecord.status === 'USED') {
          // Semak jika peranti ini adalah peranti asal yang mengaktifkannya
          if (licenseRecord.device_id === deviceId) {
            const validSession = {
              license_key: formattedKey,
              status: 'ACTIVE_SESSION',
              tier: licenseRecord.tier || 'PREMIUM_6_MONTHS',
              device_id: deviceId,
              activated_by_name: licenseRecord.activated_by_name || candidateName,
              activated_at: licenseRecord.activated_at,
              expires_at: licenseRecord.expires_at || expiresAtIso
            };
            localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(validSession));
            return { success: true, message: 'Selamat kembali! Lesen anda aktif (Sah 6 Bulan) pada peranti ini.', session: validSession };
          } else {
            return { 
              success: false, 
              message: 'Kunci Lesen ini telah didaftarkan pada peranti lain. Setiap kunci hanya sah untuk 1 peranti mengikut syarat jualan.' 
            };
          }
        }

        // 3. Kunci masih 'ACTIVE' -> Kemas kini status kepada 'USED', tetapkan tarikh tamat 6 bulan dan catat Device ID
        if (licenseRecord.status === 'ACTIVE') {
          const updateEndpoint = `${config.url}/rest/v1/pksk_licenses?license_key=eq.${encodeURIComponent(formattedKey)}`;
          const updateBody = {
            status: 'USED',
            tier: 'PREMIUM_6_MONTHS',
            device_id: deviceId,
            activated_by_name: candidateName || 'Calon PKSK',
            activated_by_ic: candidateIc || '-',
            activated_at: now.toISOString(),
            expires_at: expiresAtIso
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
            throw new Error('Gagal mengemas kini status lesen ke pelayan Supabase.');
          }

          const savedSession = {
            license_key: formattedKey,
            status: 'ACTIVE_SESSION',
            tier: 'PREMIUM_6_MONTHS',
            device_id: deviceId,
            activated_by_name: candidateName || 'Calon PKSK',
            activated_by_ic: candidateIc || '-',
            activated_at: updateBody.activated_at,
            expires_at: expiresAtIso
          };

          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(savedSession));

          return { 
            success: true, 
            message: 'Tahniah! Akses Penuh PKSK Simulator (Sah 6 Bulan) telah berjaya diaktifkan!', 
            session: savedSession 
          };
        }

        return { success: false, message: 'Status Kunci Lesen tidak dapat disahkan.' };

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
