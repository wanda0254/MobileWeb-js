var Cache = 'network-or-cache';

self.addEventListener('instal', function(evt){
	console.log('The service worker is being installed');

	evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt){
	console.log('The service worker is serving asset.');


	evt.responWith(fromNetwork(evt.request, 400).catch(function(){
		return fromCache(evt.request);
	}));
});

function precache(){
	return caches.open(CACHE).then(function(cache){
		return cache.addAll([
			'./index.html',
			'./styleGrid.css',
			'./404.html',
			'./sw.js',
			'./asset/register_sw.js',
			'./style.css',
			'./project1/maps.html',
			'./project2/kalkulator.html'
			'./project3/index.html'
			]);
	});
}

function fromNetwork(request, timeout){
	return new Promise(function(fulfill, reject){

		var timeoutId = setTimeout(reject, timeout);

		fetch(request.then(function(response){
			clearTimeout(timeoutId);
			fulfill(response);

		},reject);
		});
	}

function fromCache(request){
	return cache.open(CACHE).then(function(cache){
		return cache.match(request).then(function(matching){
			return matching || Promise.reject('no-match');
		});
	});
}