// Service Worker for Bright Forge SEO - Performance Optimization
const CACHE_NAME = 'brightforge-seo-v5';
const STATIC_CACHE = 'brightforge-static-v5';
const DYNAMIC_CACHE = 'brightforge-dynamic-v5';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about-us/',
  '/white-label-seo-services-philippines/',
  '/content-seo-services-philippines/',
  '/backlink-seo-services-philippines/',
  '/images/Hero-SEO-Agency-In-The-Philippines.webp',
  '/images/bright-forge-logo.png',
  '/images/favcon/bright-forge-favcon.png',
  '/_astro/critical.css',
  '/_astro/bundled.css'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: [
    /\/_astro\/.*\.(css|js)$/,
    /\/images\/.*\.(png|jpg|jpeg|webp|avif|svg)$/,
    /\/fonts\/.*\.(woff|woff2|ttf|otf)$/
  ],
  
  // Network first for HTML pages
  pages: [
    /.*\.html$/,
    /\/$/,
    /\/[^.]*\/$/
  ],
  
  // Stale while revalidate for API calls
  api: [
    /\/api\//,
    /\.json$/
  ]
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== location.origin) return;
  
  // Determine cache strategy
  const strategy = getCacheStrategy(request.url);
  
  switch (strategy) {
    case 'static':
      event.respondWith(cacheFirst(request));
      break;
    case 'pages':
      event.respondWith(networkFirst(request));
      break;
    case 'api':
      event.respondWith(staleWhileRevalidate(request));
      break;
    default:
      event.respondWith(networkFirst(request));
  }
});

// Cache strategies implementation
function getCacheStrategy(url) {
  if (CACHE_STRATEGIES.static.some(pattern => pattern.test(url))) {
    return 'static';
  }
  if (CACHE_STRATEGIES.pages.some(pattern => pattern.test(url))) {
    return 'pages';
  }
  if (CACHE_STRATEGIES.api.some(pattern => pattern.test(url))) {
    return 'api';
  }
  return 'default';
}

// Cache first strategy - for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network first strategy - for HTML pages
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page if available
    const offlinePage = await caches.match('/offline/');
    if (offlinePage) {
      return offlinePage;
    }
    
    return new Response('Page not available offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Stale while revalidate strategy - for API calls
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cachedResponse);
  
  return cachedResponse || networkResponsePromise;
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Handle any offline actions here
}

// Push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/images/favcon/bright-forge-favcon.png',
      badge: '/images/favcon/bright-forge-favcon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification('Bright Forge SEO', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
