"use strict";

//untuk menyimpan asset website ke dalam chache
var CACHE_NAME = "dreamPlace-v3";
var urlsToCache = ["/", "/content/nav-content.html", "/index.html", "/pages/Home.html", "/pages/Destinasi.html", "/pages/Contact.html", "/pages/About.html", "/css/materialize.min.css", "/css/style.css", "/js/materialize.min.js", "/js/content.js", "/js/sw-register.js", "/images/about.svg", "/images/destinasi1.jpg", "/images/destinasi2.jpg", "/images/destinasi3.jpg", "/images/destinasi4.jpg", "/images/hero.svg", "/manifest.json", "/images/maskable_icon32.png", "/images/maskable_icon72.png", "/images/maskable_icon96.png", "/images/maskable_icon128.png", "/images/maskable_icon144.png", "/images/maskable_icon192.png", "/images/maskable_icon512.png", "https://fonts.googleapis.com/icon?family=Material+Icons", "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"];
self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache);
  }));
}); //menampilkan asset yang sudah disimpan dalam chache

self.addEventListener("fetch", function (event) {
  event.respondWith(caches.match(event.request, {
    cacheName: CACHE_NAME
  }).then(function (response) {
    if (response) {
      console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
      return response;
    }

    console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
    return fetch(event.request);
  }));
}); //menghapus chache yang lama saat ada versi chache terbaru

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheName !== CACHE_NAME) {
        console.log("ServiceWorker: cache ".concat(cacheName, " dihapus"));
        return caches["delete"](cacheName);
      }
    }));
  }));
});