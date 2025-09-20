const CACHE_NAME = 'giovanni-doni-v1';
const STATIC_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
const HTML_CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Assets that should be cached with long expiration
const LONG_CACHE_PATTERNS = [
  /\/assets\/.*\.(js|css|webp|png|jpg|jpeg|gif|svg|woff|woff2)$/
];

// Assets that should be cached with short expiration
const SHORT_CACHE_PATTERNS = [
  /\.(html)$/,
  /\/$/,
  /\/sitemap\.xml$/,
  /\/rss\/feed\.xml$/,
  /\/robots\.txt$/
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Add fetch priority optimization for critical assets
  const isCriticalAsset = /\/assets\/(index-.*\.(js|css)|6069157c-16af-41e6-a698-637aa684d8eb\.webp)$/.test(url.pathname);

  if (isCriticalAsset && event.request.url.indexOf('?priority=high') === -1) {
    // Clone the request to add priority hint
    const modifiedRequest = new Request(event.request.url + '?priority=high', {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.body,
      mode: event.request.mode,
      credentials: event.request.credentials,
      cache: event.request.cache,
      redirect: event.request.redirect,
      referrer: event.request.referrer
    });

    event.request = modifiedRequest;
  }

  const isLongCacheAsset = LONG_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
  const isShortCacheAsset = SHORT_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));

  if (isLongCacheAsset || isShortCacheAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            const cachedTime = new Date(cachedResponse.headers.get('sw-cached-time'));
            const now = new Date();
            const maxAge = isLongCacheAsset ? STATIC_CACHE_DURATION : HTML_CACHE_DURATION;

            // Check if cache is still valid
            if (now - cachedTime < maxAge) {
              return cachedResponse;
            }
          }

          // Fetch new version
          return fetch(event.request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();

              // Add timestamp header for cache validation
              const headers = new Headers(responseClone.headers);
              headers.set('sw-cached-time', new Date().toISOString());

              const modifiedResponse = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              });

              cache.put(event.request, modifiedResponse);
            }
            return response;
          }).catch(() => {
            // Return cached version if network fails
            return cachedResponse || new Response('Offline', { status: 503 });
          });
        });
      })
    );
  }
});