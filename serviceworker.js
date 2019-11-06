const cacheName = 'ShopHub';
const staticAssets = [
    './',
    './index.html',
    './ads.html',
    './adsCat.html',
    './myAds.html',    
    './favs.html',
    './inbox.html',
    './chat.html',  

    './css/style.css',
    './css/ads.css',
    './css/inbox.css',
    './css/chat.css',
    './css/nav.css',
    './css/bktotp.css',
    './css/footer.css', 

    
    './js/signup.js',
    './js/login.js',
    './js/app.js',
    './js/ads.js',
    './js/adsCat.js',
    './js/myAds.js',
    './js/favs.js',
    './js/inbox.js',
    './js/chat.js',
    './js/postAD.js',
    './js/nav.js',
    './js/bktotp.js',
    './js/localforage.min.js',


    './icons/appicon.png',
    './icons/favicon.ico',    

    './images/back4.jpg',
    './images/avatar.png',
    './images/noti/msgNoti2.png',
    './images/loader/Preloader_8.gif',
    './images/loader/Preloader_7.gif',
]

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(staticAssets);
            })
    );
})
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
}

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             if (response) {
//                 return response;
//             }
//             return fetch(event.request)
//         }).catch(function (error) {
//             // TODO 6 - Respond with custom offline page
//         }).then(function (response) {
//             // TODO 5 - Respond with custom 404 page
//             return caches.open(cacheName).then(function (cache) {
//                 if (event.request.url.indexOf('test') < 0) {
//                     // cache.put(event.request.url, response.clone());
//                     //Not Supported in Chrome..!
//                 }
//                 return response;
//             })
//         })

//     );
// });



/*   PUSH NOTIFICATION   */
/*   START   */

importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
 var config = {
    apiKey: "AIzaSyDMH8j9q2luinH5P-BKd5gHU3sX5zpILTY",
    authDomain: "shophub-mak.firebaseapp.com",
    databaseURL: "https://shophub-mak.firebaseio.com",
    projectId: "shophub-mak",
    storageBucket: "shophub-mak.appspot.com",
    messagingSenderId: "1000638393490"
  };
  firebase.initializeApp(config); 
// messagingSenderId.
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


/*  PUSH NOTIFICATION   */
/*   END  */