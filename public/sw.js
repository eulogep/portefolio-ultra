const CACHE_NAME = 'portfolio-euloge-v2.0.0';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Dynamic cache patterns
const CACHE_PATTERNS = {
  fonts: /^https:\/\/fonts\.googleapis\.com/,
  images: /\.(jpg|jpeg|png|gif|webp|svg)$/,
  api: /^https:\/\/api\.github\.com/,
  cdn: /^https:\/\/cdn\.|^https:\/\/unpkg\.com/
};

// Background sync patterns
const SYNC_PATTERNS = {
  contact: 'contact-form-sync',
  analytics: 'analytics-sync'
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('🚀 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome extensions
  if (url.protocol === 'chrome-extension:') return;

  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Network first for API calls
    if (CACHE_PATTERNS.api.test(url.href)) {
      return await networkFirst(request);
    }
    
    // Strategy 2: Cache first for images
    if (CACHE_PATTERNS.images.test(url.href)) {
      return await cacheFirst(request);
    }
    
    // Strategy 3: Stale while revalidate for fonts and CDN
    if (CACHE_PATTERNS.fonts.test(url.href) || CACHE_PATTERNS.cdn.test(url.href)) {
      return await staleWhileRevalidate(request);
    }
    
    // Strategy 4: Network first with fallback for HTML
    if (request.destination === 'document') {
      return await networkFirstWithFallback(request);
    }
    
    // Default: Network first
    return await networkFirst(request);
    
  } catch (error) {
    console.error('🔥 Service Worker: Request failed', error);
    return new Response('Network error', { status: 408 });
  }
}

// Caching strategies
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Image not available', { status: 404 });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

async function networkFirstWithFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    throw error;
  }
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  console.log('🔄 Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === SYNC_PATTERNS.contact) {
    event.waitUntil(syncContactForm());
  }
  
  if (event.tag === SYNC_PATTERNS.analytics) {
    event.waitUntil(syncAnalytics());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingContactForms();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removePendingContactForm(form.id);
          console.log('✅ Contact form synced successfully');
        }
      } catch (error) {
        console.error('❌ Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('❌ Contact form sync failed:', error);
  }
}

async function syncAnalytics() {
  try {
    // Sync analytics data
    const pendingEvents = await getPendingAnalytics();
    
    for (const event of pendingEvents) {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event.data)
        });
        
        await removePendingAnalytics(event.id);
      } catch (error) {
        console.error('❌ Failed to sync analytics:', error);
      }
    }
  } catch (error) {
    console.error('❌ Analytics sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'portfolio-notification',
    actions: [
      {
        action: 'view',
        title: 'Voir',
        icon: '/icons/action-view.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio Euloge', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Utility functions for IndexedDB operations
async function getPendingContactForms() {
  // Implementation would use IndexedDB to store/retrieve pending forms
  return [];
}

async function removePendingContactForm(id) {
  // Implementation would remove form from IndexedDB
}

async function getPendingAnalytics() {
  // Implementation would use IndexedDB to store/retrieve pending analytics
  return [];
}

async function removePendingAnalytics(id) {
  // Implementation would remove analytics from IndexedDB
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    console.log('📊 Performance metrics received:', event.data.metrics);
    // Could sync to analytics service
  }
});

console.log('🎯 Service Worker: Loaded and ready');
