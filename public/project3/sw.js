let cacheName = 'pro2';
let cacheFiles = [
    '../project3/',
    'index.html',
    'css/peta.css',
    'js/peta.js',
];

self.addEventListener('install', function(event) {
 console.log('Service worker installing...');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener('activate', function(event) {
 console.log('Service worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheName => {
                if (thisCacheName !== cacheName) {
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
            caches.match(e.request).then(response => {
                if (response) {
                    return response;
                }
                let requestClone = e.request.clone();
                fetch(requestClone).then(response => {
                    if (!response) {
                        return response;
                    }

                    let responseClone = response.clone();
                    caches.open(cacheName).then(cache => {
                        cache.put(e.request, responseClone);
                        return response;
                    })
                })
                .catch(err => {
                    console.log('[ServiceWorker] Faild to fetching and caching', err)
                })
            })
        .catch(err => {
            console.log('[ServiceWorker] Faild to fetching and caching', err)
        })
    )
});