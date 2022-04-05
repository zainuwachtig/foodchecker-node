const CORE_CACHE_NAME = 'core-cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1'
const CORE_ASSETS = [
    '/',
    '/manifest.json',
    '/css/style.css',
    '/js/script.js',
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
  
// Fetch files and in cache, else if offline cache page
// self.addEventListener('fetch', event => {
//     console.log('Fetch event: ', event.request.url);
//     if (isCoreGetRequest(event.request)) {
//         console.log('Core get request: ', event.request.url);
//         // cache only strategy
//         event.respondWith(
//             caches.open(CORE_CACHE_NAME)
//             .then(cache => cache.match(event.request.url))
//         )
//     } else if (isHtmlGetRequest(event.request)) {
//       console.log('html get request', event.request.url)
//       // generic fallback
//       event.respondWith(
   
// // Fallback if no files in cache, go to Offline.ejs
//         caches.open('html-cache')
//           .then(cache => cache.match(event.request.url))
//           .then(response => response ? response : fetchAndCache(event.request, 'html-cache'))
//           .catch(e => {
//             return caches.open(CORE_CACHE_NAME)
//               .then(cache => cache.match('/offline'))
//           })
//       )
//     }
// });

// /**
//  * Checks if a request is a GET and HTML request
//  *
//  * @param {Object} request        The request object
//  * @returns {Boolean}            Boolean value indicating whether the request is a GET and HTML request
//  */
//  function isHtmlGetRequest(request) {
//     return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').indexOf('text/html') > -1);
//   }
  
//   /**
//    * Checks if a request is a core GET request
//    *
//    * @param {Object} request        The request object
//    * @returns {Boolean}            Boolean value indicating whether the request is in the core mapping
//    */
//   function isCoreGetRequest(request) {
//     return request.method === 'GET' && CORE_ASSETS.includes(getPathName(request.url));
//   }
  
//   /**
//    * Get a pathname from a full URL by stripping off domain
//    *
//    * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index.css
//    * @returns {String}                Relative url to the domain, e.g. index.css
//    */
//   function getPathName(requestUrl) {
//     const url = new URL(requestUrl);
//     return url.pathname;
//   }