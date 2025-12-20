
const CACHE_VERSION = '1.0.74'; // ⭐ Incrementado para sistema de productos dinámicos
const CACHE_NAME = `alimento-del-cielo-v${CACHE_VERSION}`;
const APP_VERSION = CACHE_VERSION;


const LAST_UPDATE = Date.now();


const getFirebaseConfig = () => {
    const parts = ['AIza', 'SyAkAZEuyiWWK5aO26WSzSuPR4ekVV2fx6Y'];
    return {
        apiKey: parts.join(''),
        authDomain: "alimento-del-cielo.firebaseapp.com",
        projectId: "alimento-del-cielo",
        storageBucket: "alimento-del-cielo.firebasestorage.app",
        messagingSenderId: "500358694887",
        appId: "1:500358694887:web:7487dfb975dac084851f42",
        measurementId: "G-NSC2ZFXF41"
    };
};


let firebaseInitialized = false;


const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/productos.json', // ⭐ Datos dinámicos del catálogo
    '/manifest.json',
    '/Imagenes/logo/Logo.png',
    // Imágenes de productos
    '/Imagenes/productos/pollo-apanado.png',
    '/Imagenes/productos/alitas-bbq.png',
    '/Imagenes/productos/pavo-ahumado.png',
    '/Imagenes/productos/carne-marinada.png',
    '/Imagenes/productos/hamburguesas.png',
    '/Imagenes/productos/lomo-cerdo.png',
    '/Imagenes/productos/salmon.png',
    '/Imagenes/productos/camarones.png',
    '/Imagenes/productos/mix-verduras.png',
    '/Imagenes/productos/papas-criollas.png',
    '/Imagenes/productos/empanada-carne.png',
    '/Imagenes/productos/empanada-pollo.png',
    '/Imagenes/productos/empanada-queso.png',
    '/Imagenes/productos/empanada-jamon-queso.png',
    '/Imagenes/Productos/combo_1.png',
    '/Imagenes/productos/deditos-queso.png'
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
    console.log('🚀 Service Worker: Activando versión', APP_VERSION);
    
    event.waitUntil(
        Promise.all([
            // 1. Limpiar caches antiguos automáticamente
            caches.keys().then(function(cacheNames) {
                console.log('📦 Caches encontrados:', cacheNames.length);
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        // Eliminar TODOS los caches que no sean la versión actual
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Eliminando cache antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // 2. Notificar a todos los clientes sobre la nueva versión
            self.clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
                clients.forEach(function(client) {
                    client.postMessage({
                        type: 'SW_UPDATED',
                        version: APP_VERSION,
                        timestamp: LAST_UPDATE
                    });
                });
            }),
            
            // 3. Tomar control inmediato de todas las páginas
            self.clients.claim()
        ]).then(function() {
            console.log('✅ Service Worker activado correctamente - v' + APP_VERSION);
            console.log('🧹 Limpieza automática completada');
        })
    );
});

// === MENSAJES DESDE EL CLIENTE ===
self.addEventListener('message', (event) => {
    try {
        const data = event.data || {};
        if (data.type === 'SKIP_WAITING') {
            console.log('⏭️ Recibido SKIP_WAITING desde cliente');
            self.skipWaiting();
        }
        if (data.type === 'CLEAR_OLD_CACHES') {
            console.log('🧹 Solicitud de limpieza de caches antigua');
            event.waitUntil(limpiarCacheAntiguo().then(() => {
                return self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
                    clients.forEach((client) => client.postMessage({ type: 'CACHE_CLEARED' }));
                });
            }));
        }
        // Mensaje para inicializar Firebase
        if (data.type === 'INIT_FIREBASE') {
            console.log('🔥 Inicializando Firebase en Service Worker');
            initializeFirebaseInSW();
        }
    } catch (e) {
        console.error('❌ Error manejando mensaje:', e);
    }
});

// === INICIALIZAR FIREBASE EN SERVICE WORKER ===
function initializeFirebaseInSW() {
    if (firebaseInitialized) {
        console.log('✅ Firebase ya inicializado en SW');
        return;
    }

    try {
        // Importar scripts de Firebase
        importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
        importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

        // Inicializar Firebase
        firebase.initializeApp(getFirebaseConfig());
        const messaging = firebase.messaging();

        // Manejar mensajes en background
        messaging.onBackgroundMessage((payload) => {
            console.log('📩 [SW] Mensaje FCM en background:', payload);

            const notificationTitle = payload.notification?.title || 'Alimento del Cielo';
            const notificationOptions = {
                body: payload.notification?.body || 'Nueva notificación',
                icon: payload.notification?.icon || '/Imagenes/logo/Logo.png',
                image: payload.notification?.image,
                badge: '/Imagenes/logo/logo 96x96.png',
                tag: payload.data?.tag || 'default',
                requireInteraction: false,
                data: payload.data || {},
                actions: [
                    { action: 'ver', title: 'Ver' },
                    { action: 'cerrar', title: 'Cerrar' }
                ],
                vibrate: [200, 100, 200]
            };

            return self.registration.showNotification(notificationTitle, notificationOptions);
        });

        firebaseInitialized = true;
        console.log('✅ Firebase inicializado correctamente en SW');
    } catch (error) {
        console.error('❌ Error inicializando Firebase en SW:', error);
    }
}

// === MANEJAR CLICS EN NOTIFICACIONES ===
self.addEventListener('notificationclick', (event) => {
    console.log('🖱️ Click en notificación:', event);
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Buscar ventana abierta
                for (let client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        client.focus();
                        client.postMessage({
                            type: 'NOTIFICATION_CLICKED',
                            data: event.notification.data,
                            action: event.action
                        });
                        return client;
                    }
                }
                // Abrir nueva ventana
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// === MANEJAR CIERRE DE NOTIFICACIONES ===
self.addEventListener('notificationclose', (event) => {
    console.log('🔕 Notificación cerrada:', event.notification.tag);
});

// === INTERCEPTAR REQUESTS (ESTRATEGIA DINÁMICA POR TIPO) ===
self.addEventListener('fetch', function(event) {
    const url = event.request.url;
    // Ignorar extensiones de navegador y protocolos no HTTP
    if (!url.startsWith('http') ||
        url.startsWith('chrome-extension') ||
        url.startsWith('moz-extension') ||
        url.startsWith('safari-extension')) {
        return;
    }

    // No interceptar métodos distintos a GET (evita errores con POST/PUT/PATCH en Cache API)
    if (event.request.method !== 'GET') {
        return; // dejar que el navegador maneje la solicitud normalmente
    }

    // Usa las estrategias declaradas abajo según el tipo de request
    event.respondWith(aplicarEstrategiaCache(event.request));
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
        Promise.all([
            self.registration.showNotification(notificationData.title || '🍽️ Alimento del Cielo', options),
            // Guardar notificación en localStorage a través de los clientes
            guardarNotificacionEnClientes(
                notificationData.title || '🍽️ Alimento del Cielo',
                notificationData.body,
                notificationData.url || '/'
            )
        ])
    );
});

// === GUARDAR NOTIFICACIÓN EN CLIENTES ===
async function guardarNotificacionEnClientes(titulo, mensaje, url) {
    try {
        const clientList = await clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        });
        
        // Enviar mensaje a todos los clientes para que guarden la notificación
        clientList.forEach(client => {
            client.postMessage({
                type: 'GUARDAR_NOTIFICACION',
                data: {
                    titulo,
                    mensaje,
                    url,
                    timestamp: Date.now()
                }
            });
        });
        
        console.log('📨 Notificación enviada a', clientList.length, 'clientes');
    } catch (error) {
        console.error('❌ Error al guardar notificación en clientes:', error);
    }
}

// === CLICK EN NOTIFICACIÓN ===
self.addEventListener('notificationclick', function(event) {
    console.log('🔔 Service Worker: Click en notificación', event.action);
    
    event.notification.close();
    
    // Determinar qué acción tomar
    if (event.action === 'close') {
        // Solo cerrar la notificación
        console.log('✖️ Notificación cerrada por el usuario');
        return;
    }
    
    // Para acción 'open', 'ver', o click general en la notificación
    const urlToOpen = new URL(event.notification.data?.url || '/', self.location.origin).href;
    console.log('📱 Abriendo URL:', urlToOpen);
    
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function(clientList) {
            console.log(`🔍 Ventanas abiertas encontradas: ${clientList.length}`);
            
            // Primero intentar encontrar una ventana con la URL exacta
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    console.log('✅ Enfocando ventana existente');
                    return client.focus();
                }
            }
            
            // Si no hay coincidencia exacta, enfocar cualquier ventana del sitio
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.startsWith(self.location.origin) && 'focus' in client) {
                    console.log('✅ Enfocando ventana del mismo origen y navegando');
                    return client.focus().then(() => {
                        if ('navigate' in client) {
                            return client.navigate(urlToOpen);
                        }
                    });
                }
            }
            
            // Si no hay ventanas abiertas, crear una nueva
            if (clients.openWindow) {
                console.log('🆕 Abriendo nueva ventana');
                return clients.openWindow(urlToOpen);
            }
        }).catch(function(error) {
            console.error('❌ Error al manejar click en notificación:', error);
        })
    );
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
    
    const { type, payload } = event.data;
    
    if (type === 'SKIP_WAITING') {
        // Activar inmediatamente el nuevo SW
        console.log('⚡ Activación inmediata solicitada');
        self.skipWaiting();
    }
    
    if (type === 'DATA_UPDATED') {
        // Mensaje de actualización de datos - ya manejado, solo registrar
        console.log('✅ Datos actualizados:', payload);
        return;
    }
    
    if (type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
                return cache.addAll(payload);
            })
        );
    }
    
    if (type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Limpiando cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }).then(() => {
                // Notificar al cliente que la limpieza terminó
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({
                            type: 'CACHE_CLEARED',
                            timestamp: Date.now()
                        });
                    });
                });
            })
        );
    }
    
    if (type === 'GET_VERSION') {
        // Enviar versión actual al cliente
        event.source.postMessage({
            type: 'VERSION_INFO',
            version: APP_VERSION,
            cacheName: CACHE_NAME,
            timestamp: LAST_UPDATE
        });
    }
});

// === LIMPIEZA DE CACHE ===
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

// === FUNCIÓN PARA VERIFICAR SI SE DEBE CACHEAR ===
function debeCachear(url) {
    // No cachear extensiones del navegador
    if (url.includes('grammarly') || 
        url.includes('extension') ||
        url.includes('chrome-extension') ||
        url.includes('moz-extension')) {
        return false;
    }
    
    // No cachear CDNs externos (Bootstrap, jQuery, etc.)
    const cdnDomains = [
        'cdn.jsdelivr.net',
        'cdnjs.cloudflare.com',
        'unpkg.com',
        'cdn.bootcss.com',
        'maxcdn.bootstrapcdn.com',
        'stackpath.bootstrapcdn.com',
        'code.jquery.com',
        'ajax.googleapis.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ];
    
    return !cdnDomains.some(domain => url.includes(domain));
}

// === ESTRATEGIA DE CACHE PERSONALIZADA ===
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        // Solo cachear peticiones GET exitosas
        if (request.method === 'GET' && networkResponse.ok && debeCachear(request.url)) {
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
        // Evitar intentar cachear métodos no soportados (POST, PUT, etc.)
        if (request.method === 'GET' && networkResponse.ok && debeCachear(request.url)) {
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

// === ESTRATEGIA: STALE-WHILE-REVALIDATE ===
// Sirve desde cache inmediatamente, pero actualiza en background
// PERFECTO para datos que cambian frecuentemente (productos, precios)
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Verificar si ya se actualizó recientemente (evitar actualizaciones continuas)
    const lastUpdateKey = `lastUpdate_${request.url}`;
    const lastUpdate = await caches.match(lastUpdateKey).then(r => r ? r.text() : null);
    const now = Date.now();
    const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutos
    
    if (lastUpdate && (now - parseInt(lastUpdate)) < UPDATE_INTERVAL) {
        // Actualización reciente, solo retornar cache
        return cachedResponse || fetch(request);
    }
    
    // Fetch en background para actualizar cache
    const fetchPromise = fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok && debeCachear(request.url)) {
            // Actualizar cache con nueva respuesta
            await cache.put(request, networkResponse.clone());
            
            // Guardar timestamp de actualización
            await cache.put(lastUpdateKey, new Response(now.toString()));
            
            // Notificar a clientes sobre actualización de datos (solo si hay cambios)
            const clients = await self.clients.matchAll();
            clients.forEach(client => {
                client.postMessage({
                    type: 'DATA_UPDATED',
                    url: request.url,
                    timestamp: now
                });
            });
        }
        return networkResponse;
    }).catch(error => {
        console.log('🔄 Actualización en background falló:', error.message);
        return cachedResponse; // Retornar cache si falla la red
    });
    
    // Retornar cache inmediatamente si existe, sino esperar network
    return cachedResponse || fetchPromise;
}

function aplicarEstrategiaCache(request) {
    const url = new URL(request.url);
    
    // ⭐ Para productos.json: Stale-While-Revalidate (actualización automática)
    if (url.pathname.includes('/productos.json')) {
        console.log('📦 Usando Stale-While-Revalidate para productos');
        return staleWhileRevalidate(request);
    }
    
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
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/')) {
        return networkFirst(request);
    }
    
    // Por defecto: Cache First
    return cacheFirst(request);
}

// === VERSIÓN ===
console.log('🚀 Service Worker de Alimento del Cielo cargado correctamente');
console.log(`📊 Versión: ${APP_VERSION}`);
console.log('✅ Funcionalidades habilitadas:');
console.log('  📦 Cache estratégico');
console.log('  🔄 Sincronización background');
console.log('  📬 Notificaciones push');
console.log('  📱 Soporte offline');
console.log('  📊 Monitoreo de rendimiento');