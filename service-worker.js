self.addEventListener("install", e=>{
e.waitUntil(
caches.open("ramadan-v2").then(cache=>{
return cache.addAll([
"/",
"index.html",
"manifest.json",
"adhan.mp3",
"icon.png"
])
})
)
})

self.addEventListener("fetch", e=>{
e.respondWith(
caches.match(e.request).then(res=>{
return res || fetch(e.request)
})
)
})

self.addEventListener("notificationclick", function(event) {
event.notification.close();
event.waitUntil(clients.openWindow("/"));
});
