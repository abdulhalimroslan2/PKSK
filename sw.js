// PKSK Simulator 2026 - Service Worker (Offline Resilience & PWA Cache)
const CACHE_NAME = 'pksk-pwa-v1.0.5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './license.js',
  './data/dataset.js',
  './manifest.json',
  './assets/kpm_favicon.png',
  './assets/logo_kpm_bm.png',
  './assets/pksk_icon_official.png',
  './assets/physflix_hero_bg.jpg',
  './assets/pksk_icon_192.png',
  './assets/pksk_icon_512.png'
];

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PKSK SW] Pre-caching core offline assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[PKSK SW] Some optional assets failed to cache during install:', err);
      });
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PKSK SW] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale While Revalidate with Network Fallback
self.addEventListener('fetch', (event) => {
  // Hanya proses GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Jangan cache panggilan API luar (Supabase, Gemini, OpenRouter)
  if (url.origin.includes('supabase.co') || url.origin.includes('googleapis.com') || url.origin.includes('openrouter.ai')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.log('[PKSK SW] Network offline, serving cache for:', event.request.url);
      });

      return cachedResponse || fetchPromise;
    })
  );
});
