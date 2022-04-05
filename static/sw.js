const CORE_CACHE_NAME = 'core-cache-v2';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v2'
const CORE_ASSETS = [
    '/',
    '/manifest.json',
    '/css/style.min.css',
    '/js/script.min.js',
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
    '/offline'
];

// Opent of maakt een cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
    )
});

// Verwijdert oudere caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(keys
                .filter(key => key !== CORE_CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
                .map(key => caches.delete(key))
            )
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        // Zoekt naar of het request in een cache gevonden kan worden
        caches.match(event.request)
        .then(cacheRes => { return cacheRes || fetch(event.request).then(fetchRes => {
            return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                cache.put(event.request.url, fetchRes.clone())
                return fetchRes
            })
        }) 
        }).catch(() => caches.match('/offline'))
    )
});