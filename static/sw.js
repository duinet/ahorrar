/**
Import the Workbox library from the Google CDN.
It is possible to serve this locally should we want to remove the dependency on Google
See here for more info: https://developers.google.com/web/tools/workbox/modules/workbox-sw
**/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js');

// SETTINGS
workbox.setConfig({
  // set the local path is not using Google CDN
  //modulePathPrefix: '/directory/to/workbox/'

  // By default, workbox-sw will use the debug build for sites on localhost,
  // but for any other origin it’ll use the production build. Force by setting to true.
  debug: false
});
// Force verbose logging even for the production
// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// Cache settings
workbox.core.setCacheNameDetails({
  // set the default cache name prefix. each domain should be unique to stop clashes
  // this is used for runtime and precaching only
  prefix: 'govuk-cache'
});

// Estas rutas las busca de internet, no de offline
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/'),
  new workbox.strategies.CacheOnly()
);

// If any precache rules are defined in the Workbox setup this is where they will be injected
workbox.precaching.precacheAndRoute([]);

// skip the 'worker in waiting' phase and activate immediately
workbox.skipWaiting();
// claim any clients that match the worker scope immediately. requests on these pages will
// now go via the service worker. 
workbox.clientsClaim();