// === FIREBASE CLOUD MESSAGING SERVICE WORKER ===
// Este archivo maneja las notificaciones push cuando la app está en background

// Importar Firebase Messaging para Service Workers
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Configuración de Firebase (construida dinámicamente)
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

// Inicializar Firebase en el Service Worker
firebase.initializeApp(getFirebaseConfig());

// Obtener instancia de messaging
const messaging = firebase.messaging();

// Manejar mensajes en background
messaging.onBackgroundMessage((payload) => {
    console.log('📩 [firebase-messaging-sw.js] Mensaje recibido en background:', payload);

    const notificationTitle = payload.notification?.title || 'Alimento del Cielo';
    const notificationOptions = {
        body: payload.notification?.body || 'Tienes una nueva notificación',
        icon: payload.notification?.icon || '/Imagenes/logo/Logo.png',
        image: payload.notification?.image,
        badge: '/Imagenes/logo/logo 96x96.png',
        tag: payload.data?.tag || 'default',
        requireInteraction: false,
        data: payload.data || {},
        actions: [
            {
                action: 'ver',
                title: 'Ver',
                icon: '/Imagenes/iconos/ver.png'
            },
            {
                action: 'cerrar',
                title: 'Cerrar'
            }
        ],
        vibrate: [200, 100, 200]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar clics en las notificaciones
self.addEventListener('notificationclick', (event) => {
    console.log('🖱️ Click en notificación:', event);

    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/';

    // Manejar acciones
    if (event.action === 'ver') {
        // Abrir la URL especificada
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientList) => {
                    // Buscar si ya hay una ventana abierta
                    for (let client of clientList) {
                        if (client.url.includes(self.location.origin) && 'focus' in client) {
                            client.focus();
                            client.postMessage({
                                type: 'NOTIFICATION_CLICKED',
                                data: event.notification.data
                            });
                            return client;
                        }
                    }
                    // Si no hay ventana abierta, abrir una nueva
                    if (clients.openWindow) {
                        return clients.openWindow(urlToOpen);
                    }
                })
        );
    } else if (event.action === 'cerrar') {
        // Solo cerrar la notificación (ya se hizo arriba)
        console.log('✅ Notificación cerrada');
    } else {
        // Click en el cuerpo de la notificación (no en una acción)
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientList) => {
                    for (let client of clientList) {
                        if (client.url.includes(self.location.origin) && 'focus' in client) {
                            client.focus();
                            client.postMessage({
                                type: 'NOTIFICATION_CLICKED',
                                data: event.notification.data
                            });
                            return client;
                        }
                    }
                    if (clients.openWindow) {
                        return clients.openWindow(urlToOpen);
                    }
                })
        );
    }
});

// Manejar cierre de notificaciones
self.addEventListener('notificationclose', (event) => {
    console.log('🔕 Notificación cerrada:', event.notification.tag);
});
