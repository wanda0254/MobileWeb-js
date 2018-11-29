// self.addEventListener('install', function(event){
// 	console.log('service worker instaling..');
// });

// self.addEventListener('activate', function(event){
// 	console.log('service worker activating..');
// });
let cacheName = 'index';
let cacheFiles = [
			'/',
			'./index.html',
			'./manifest.json',
			'./styleGrid.css',
			'./404.html',
			'./sw.js',
			'./asset/register_sw.js',
			'./style.css',
			'./project1/maps.html',
			'./project2/kalkulator.html',
			'./project3/index.html'
			];

self.addEventListener('install', function(event) {
 console.log('Service worker installing...');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            // console.log('[ServiceWorker] Caching cacheFiles');
            // return cache.addAll(cacheFiles).then(() => self.skipWaiting());
            return cache.addAll(cacheFiles);
        })
    );
});
self.addEventListener('activate', function(event) {
 console.log('Service worker activating...');
    // console.log('[ServiceWorker] Activated')
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheName => {
                if (thisCacheName !== cacheName) {
                    // console.log('[ServiceWorker] Removing cached files from', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});
// this.addEventListener('fetch', function(event)){

// }
self.addEventListener('fetch', e => {
    // console.log('[ServiceWorker] Fetching', e.request.url)
    e.respondWith(
        // fetch(e.request).catch( () => {
            caches.match(e.request).then(response => {
                if (response) {
                    // console.log('[ServiceWorker] Found in cache', e.request.url);
                    return response;
                }
                let requestClone = e.request.clone();
                fetch(requestClone).then(response => {
                    if (!response) {
                        // console.log('[ServiceWorker] No response from fetch', response);
                        return response;
                    }

                    let responseClone = response.clone();
                    caches.open(cacheName).then(cache => {
                        // console.log('[ServiceWorker] New data new', e.request.url);
                        cache.put(e.request, responseClone);
                        return response;
                    })
                })
                .catch(err => {
                    console.log('[ServiceWorker] Faild to fetching and caching', err)
                })
            })
        // })
        .catch(err => {
            console.log('[ServiceWorker] Faild to fetching and caching', err)
        })
    )
});