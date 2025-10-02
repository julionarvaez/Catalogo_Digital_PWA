// === SERVICE WORKER PARA ALIMENTO DEL CIELO PWA ===
const CACHE_NAME = 'alimento-del-cielo-v1.0.0';

// Archivos esenciales para cachear
const urlsToCache = [
    '/Catalogo_Digital_PWA/',
    '/Catalogo_Digital_PWA/index.html',
    '/Catalogo_Digital_PWA/styles.css',
    '/Catalogo_Digital_PWA/script.js',
    '/Catalogo_Digital_PWA/manifest.json',
    '/Catalogo_Digital_PWA/Imagenes/logo/Logo.png'
];

// === INSTALACIÓN DEL SERVICE WORKER ===
self.addEventListener('install', function(event) {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('📦 Service Worker: Cache abierto');
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                console.log('✅ Service Worker: Archivos cacheados');
                return self.skipWaiting(); // Forzar activación inmediata
            })
            .catch(function(error) {
                console.error('❌ Service Worker: Error en instalación:', error);
            })
    );
});

// === ACTIVACIÓN DEL SERVICE WORKER ===
self.addEventListener('activate', function(event) {
    console.log('🚀 Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Eliminar caches antiguos
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            console.log('✅ Service Worker: Activado correctamente');
            return self.clients.claim(); // Controlar inmediatamente las páginas
        })
    );
});

// === INTERCEPTAR REQUESTS (ESTRATEGIA CACHE-FIRST) ===
self.addEventListener('fetch', function(event) {
    // Solo cachear requests HTTP/HTTPS
    if (event.request.url.startsWith('http')) {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    // Si está en cache, devolverlo
                    if (response) {
                        return response;
                    }
                    
                    // Si no está en cache, hacer fetch
                    return fetch(event.request)
                        .then(function(response) {
                            // Verificar si es una respuesta válida
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            
                            // Clonar la respuesta
                            const responseToCache = response.clone();
                            
                            // Agregar al cache dinámico
                            caches.open(CACHE_NAME)
                                .then(function(cache) {
                                    cache.put(event.request, responseToCache);
                                });
                            
                            return response;
                        })
                        .catch(function() {
                            // Si falla el fetch, mostrar página offline
                            if (event.request.destination === 'document') {
                                return caches.match('/index.html');
                            }
                            
                            // Para imágenes, mostrar imagen placeholder
                            if (event.request.destination === 'image') {
                                return new Response(
                                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" font-size="40" text-anchor="middle" fill="#9ca3af">📱</text><text x="100" y="140" font-size="12" text-anchor="middle" fill="#6b7280">Sin conexión</text></svg>',
                                    { headers: { 'Content-Type': 'image/svg+xml' } }
                                );
                            }
                        });
                })
        );
    }
});

// === NOTIFICACIONES PUSH ===
self.addEventListener('push', function(event) {
    console.log('📬 Service Worker: Notificación push recibida');
    
    let notificationData = {};
    
    if (event.data) {
        try {
            notificationData = event.data.json();
        } catch (e) {
            notificationData = {
                title: 'Alimento del Cielo',
                body: event.data.text() || 'Nueva oferta disponible',
                icon: '/icon-192.png',
                badge: '/badge-72.png'
            };
        }
    } else {
        notificationData = {
            title: '🍽️ Alimento del Cielo',
            body: '¡Nuevos productos frescos disponibles!',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%232563eb" rx="20"/><text x="96" y="120" font-size="80" text-anchor="middle" fill="white">🍽️</text></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><rect width="72" height="72" fill="%232563eb" rx="8"/><text x="36" y="45" font-size="30" text-anchor="middle" fill="white">🍽️</text></svg>'
        };
    }
    
    const options = {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: Date.now().toString(),
            url: notificationData.url || '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Ver Catálogo',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7L12 2z"/></svg>'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
            }
        ],
        requireInteraction: false,
        silent: false,
        tag: 'alimento-del-cielo-notification'
    };
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title || '🍽️ Alimento del Cielo', options)
    );
});

// === CLICK EN NOTIFICACIÓN ===
self.addEventListener('notificationclick', function(event) {
    console.log('🔔 Service Worker: Click en notificación');
    
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        // Abrir la aplicación
        const urlToOpen = event.notification.data.url || '/';
        
        event.waitUntil(
            clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            }).then(function(clientList) {
                // Si ya hay una ventana abierta, enfocarla
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Si no hay ventana abierta, crear una nueva
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
        );
    } else if (event.action === 'close') {
        // Solo cerrar la notificación (ya se cerró arriba)
        console.log('🔔 Notificación cerrada por el usuario');
    }
});

// === SINCRONIZACIÓN EN BACKGROUND ===
self.addEventListener('sync', function(event) {
    console.log('🔄 Service Worker: Sincronización en background');
    
    if (event.tag === 'background-sync') {
        event.waitUntil(sincronizarDatos());
    }
});

async function sincronizarDatos() {
    try {
        // Aquí se puede implementar lógica para sincronizar datos
        // como pedidos pendientes, actualizaciones de productos, etc.
        console.log('🔄 Sincronizando datos...');
        
        // Ejemplo: enviar pedidos pendientes
        const pedidosPendientes = await obtenerPedidosPendientes();
        if (pedidosPendientes.length > 0) {
            await enviarPedidosPendientes(pedidosPendientes);
        }
        
        console.log('✅ Sincronización completada');
    } catch (error) {
        console.error('❌ Error en sincronización:', error);
    }
}

async function obtenerPedidosPendientes() {
    // Implementar lógica para obtener pedidos pendientes del IndexedDB
    return [];
}

async function enviarPedidosPendientes(pedidos) {
    // Implementar lógica para enviar pedidos al servidor
    console.log('📤 Enviando pedidos pendientes:', pedidos.length);
}

// === MANEJO DE MENSAJES ===
self.addEventListener('message', function(event) {
    console.log('💬 Service Worker: Mensaje recibido', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
                return cache.addAll(event.data.payload);
            })
        );
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});

// === LIMPIEZA DE CACHE ===
self.addEventListener('activate', function(event) {
    event.waitUntil(
        limpiarCacheAntiguo()
    );
});

async function limpiarCacheAntiguo() {
    const cacheWhitelist = [CACHE_NAME];
    
    const cacheNames = await caches.keys();
    const deletePromises = cacheNames.map(cacheName => {
        if (!cacheWhitelist.includes(cacheName)) {
            console.log('🗑️ Eliminando cache:', cacheName);
            return caches.delete(cacheName);
        }
    });
    
    await Promise.all(deletePromises);
    console.log('🧹 Cache limpiado');
}

// === ESTRATEGIA DE CACHE PERSONALIZADA ===
function aplicarEstrategiaCache(request) {
    const url = new URL(request.url);
    
    // Para archivos estáticos: Cache First
    if (request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'image') {
        return cacheFirst(request);
    }
    
    // Para páginas HTML: Network First
    if (request.destination === 'document') {
        return networkFirst(request);
    }
    
    // Para APIs: Network First con fallback
    if (url.pathname.startsWith('/api/')) {
        return networkFirst(request);
    }
    
    // Por defecto: Cache First
    return cacheFirst(request);
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('❌ Error en cache first:', error);
        throw error;
    }
}

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('🔄 Network falló, intentando cache');
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// === GESTIÓN DE VERSIONES ===
const VERSION = '1.0.0';
const ASSETS_VERSION = 'v1';

self.addEventListener('install', function(event) {
    console.log(`📦 Instalando Service Worker versión ${VERSION}`);
    
    event.waitUntil(
        caches.open(`${CACHE_NAME}-${ASSETS_VERSION}`)
            .then(cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './styles.css',
                    './script.js',
                    './manifest.json'
                ]);
            })
            .then(() => self.skipWaiting())
    );
});

// === MONITOREO DE RENDIMIENTO ===
self.addEventListener('fetch', function(event) {
    const startTime = performance.now();
    
    event.respondWith(
        aplicarEstrategiaCache(event.request)
            .then(response => {
                const endTime = performance.now();
                const duration = endTime - startTime;
                
                // Log de rendimiento (solo en desarrollo)
                if (duration > 1000) {
                    console.log(`⚠️ Request lento: ${event.request.url} - ${duration.toFixed(2)}ms`);
                }
                
                return response;
            })
            .catch(error => {
                console.error('❌ Error en fetch:', event.request.url, error);
                
                // Respuesta de fallback
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
                
                return new Response('Error de red', {
                    status: 408,
                    statusText: 'Request timeout'
                });
            })
    );
});

// === ESTADÍSTICAS DE USO ===
let requestCount = 0;
let cacheHits = 0;

self.addEventListener('fetch', function(event) {
    requestCount++;
    
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                cacheHits++;
                console.log(`📊 Cache hit rate: ${((cacheHits / requestCount) * 100).toFixed(1)}%`);
            }
            return response || fetch(event.request);
        })
    );
});

console.log('🚀 Service Worker de Alimento del Cielo cargado correctamente');
console.log(`📊 Versión: ${VERSION}`);
console.log('✅ Funcionalidades habilitadas:');
console.log('  📦 Cache estratégico');
console.log('  🔄 Sincronización background');
console.log('  📬 Notificaciones push');
console.log('  📱 Soporte offline');
console.log('  📊 Monitoreo de rendimiento');
