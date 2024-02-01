const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
importScripts('workbox-v5.1.3/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
// Cache CSS, JavaScript, and Web Worker files with a Cache First strategy
registerRoute(
  // Define a callback function that will filter the requests to cache
  ({ request }) => request.destination === 'style' || 
                   request.destination === 'script' || 
                   request.destination === 'worker',
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // Keep assets for 30 days
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Automatically clean up old entries once limit is reached
        maxEntries: 60,
      }),
    ],
  })
);

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request is for an image
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // Keep images for 30 days
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Automatically clean up old entries once limit is reached
        maxEntries: 50,
      }),
    ],
  })
);

