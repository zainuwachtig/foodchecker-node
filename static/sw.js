const CORE_CACHE_NAME = 'core-cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1'
const CORE_ASSETS = [
    '/',
    '/css/style.css',
    '/js/script.js',
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap'
];

self.addEventListener('install', event => {
    console.log('SW installed')
    event.waitUntil(
        caches.open(CORE_CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
    )
});

self.addEventListener('activate', event => {
    console.log('SW activated')
    event.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(keys
                .filter(key => key !== CORE_CACHE_NAME)
                .map(key => caches.delete(key))
            )
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.req)
        .then(cacheRes => { return cacheRes || fetch(event.req) })
        .catch((err) => console.log(err))
    )

    // event.respondWith(
    //     caches.open(CORE_CACHE_NAME)
    //     .then(cache => cache.match(event.request.url))
    // )
});