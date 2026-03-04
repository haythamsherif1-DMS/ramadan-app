const VERSION = "1.1"; // قم بتغيير هذا الرقم عند كل تحديث جديد
const CACHE_NAME = `ramadan-app-v${VERSION}`;

const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "manifest.json",
  "adhan.mp3",
  "icon.png"
];

// مرحلة التثبيت - حفظ الملفات في الكاش الجديد
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log(`[Service Worker] Caching version: ${VERSION}`);
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // إجبار الـ Service Worker الجديد على أن يصبح نشطاً فوراً
  self.skipWaiting();
});

// مرحلة التنشيط - حذف الكاش القديم تماماً
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${key}`);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // السيطرة على الصفحة فوراً دون الحاجة لإعادة تحميل يدوية أول مرة
  return self.clients.claim();
});

// مرحلة جلب الملفات - الرد من الكاش أو الشبكة
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

