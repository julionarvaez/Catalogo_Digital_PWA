# 🔔 Ejemplo de Uso - Notificaciones Push FCM

## Ejemplos Prácticos para Enviar Notificaciones

Este archivo contiene ejemplos de uso de las notificaciones push configuradas.

---

## 📱 Ejemplo 1: Notificación Simple de Oferta

```javascript
// En tu código JavaScript o desde una función administrativa
const enviarOferta = async () => {
    const response = await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify({
            title: '🎉 ¡Oferta Especial!',
            body: '20% de descuento en todos los productos de pollo',
            icon: '/Imagenes/logo/Logo.png',
            image: '/Imagenes/Productos/Pollo/pollo Semicriollo.jpg',
            url: '/#catalogo',
            sendToAll: true
        })
    });
    
    const result = await response.json();
    console.log('Notificación enviada:', result);
};
```

---

## 🛒 Ejemplo 2: Notificación de Nuevo Producto

```javascript
const notificarNuevoProducto = async (producto) => {
    await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify({
            title: '🆕 Nuevo Producto Disponible',
            body: `${producto.nombre} - ${producto.descripcion.substring(0, 50)}...`,
            icon: '/Imagenes/logo/Logo.png',
            image: producto.imagen,
            url: `/#producto-${producto.id}`,
            data: {
                tipo: 'nuevo-producto',
                productoId: producto.id
            },
            sendToAll: true
        })
    });
};

// Uso
notificarNuevoProducto({
    id: 100,
    nombre: 'Filete de Salmón Premium',
    descripcion: 'Salmón fresco del Atlántico, rico en Omega-3',
    imagen: '/Imagenes/Productos/Pescado/salmon-premium.jpg'
});
```

---

## 📦 Ejemplo 3: Notificación de Pedido (Token Específico)

```javascript
// Cuando un usuario hace un pedido, enviarle una confirmación
const notificarPedidoRecibido = async (tokenUsuario, pedidoId) => {
    await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify({
            title: '✅ Pedido Confirmado',
            body: `Tu pedido #${pedidoId} ha sido recibido y está en proceso`,
            icon: '/Imagenes/logo/Logo.png',
            url: `/confirmacion-pago.html?pedido=${pedidoId}`,
            data: {
                tipo: 'pedido-confirmado',
                pedidoId: pedidoId
            },
            targetTokens: [tokenUsuario] // Solo a este usuario
        })
    });
};
```

---

## 🚚 Ejemplo 4: Notificación Programada (Recordatorio)

```javascript
// Recordar a los usuarios que tienen productos en el carrito
const recordatorioCarrito = async () => {
    // Primero, obtener usuarios con carritos abandonados
    // (esto requeriría una base de datos de usuarios)
    
    await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify({
            title: '🛒 ¿Olvidaste algo?',
            body: 'Tienes productos en tu carrito. ¡Completa tu pedido ahora!',
            icon: '/Imagenes/logo/Logo.png',
            url: '/#carrito',
            data: {
                tipo: 'carrito-abandonado'
            },
            sendToAll: true
        })
    });
};

// Programar para ejecutar diariamente
// (requiere un servicio de cron jobs o scheduled functions)
```

---

## 🎯 Ejemplo 5: Notificación con Acciones Personalizadas

```javascript
// En firebase-messaging-sw.js puedes personalizar las acciones
self.addEventListener('notificationclick', (event) => {
    const data = event.notification.data;
    
    if (data.tipo === 'oferta-especial') {
        // Aplicar cupón automáticamente
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then(clientList => {
                if (clientList.length > 0) {
                    clientList[0].focus();
                    clientList[0].postMessage({
                        type: 'APLICAR_CUPON',
                        cupon: data.codigoCupon
                    });
                }
            })
        );
    }
});

// Enviar la notificación
const enviarOfertaConCupon = async () => {
    await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify({
            title: '🎁 ¡Cupón Especial Para Ti!',
            body: 'Usa el código POLLO20 para 20% de descuento',
            icon: '/Imagenes/logo/Logo.png',
            url: '/#catalogo',
            data: {
                tipo: 'oferta-especial',
                codigoCupon: 'POLLO20',
                descuento: 20
            },
            sendToAll: true
        })
    });
};
```

---

## 🔄 Ejemplo 6: Manejo de Respuesta en el Cliente

```javascript
// En script.js - Escuchar mensajes del service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, data } = event.data;
        
        if (type === 'NOTIFICATION_CLICKED') {
            console.log('Usuario hizo clic en notificación:', data);
            
            // Realizar acciones según el tipo
            if (data.tipo === 'oferta-especial') {
                // Mostrar modal de oferta
                mostrarModalOferta(data);
            } else if (data.tipo === 'nuevo-producto') {
                // Navegar al producto
                mostrarDetalleProducto(data.productoId);
            }
        }
        
        if (type === 'APLICAR_CUPON') {
            // Aplicar cupón automáticamente
            aplicarCuponDescuento(data.cupon);
            mostrarNotificacion(`✅ Cupón ${data.cupon} aplicado correctamente`);
        }
    });
}
```

---

## 🕐 Ejemplo 7: Notificaciones Programadas con Netlify Scheduled Functions

Crea un archivo `netlify/functions/notificaciones-programadas.js`:

```javascript
const { schedule } = require('@netlify/functions');

// Ejecutar todos los días a las 10 AM
const handler = schedule('0 10 * * *', async () => {
    console.log('📅 Ejecutando notificaciones programadas...');
    
    // Enviar oferta del día
    await fetch(process.env.URL + '/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FCM_ADMIN_SECRET}`
        },
        body: JSON.stringify({
            title: '🌅 ¡Buenos días! Oferta del Día',
            body: 'Descubre las ofertas especiales de hoy',
            icon: '/Imagenes/logo/Logo.png',
            url: '/#ofertas-del-dia',
            sendToAll: true
        })
    });
    
    return { statusCode: 200 };
});

module.exports.handler = handler;
```

Instalación requerida:
```bash
npm install @netlify/functions
```

---

## 📊 Ejemplo 8: Tracking de Notificaciones

```javascript
// Guardar estadísticas de notificaciones enviadas
const enviarYRegistrar = async (notificacionData) => {
    // Enviar notificación
    const response = await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify(notificacionData)
    });
    
    const result = await response.json();
    
    // Registrar en Firestore para analytics
    await fetch('/.netlify/functions/registrar-estadistica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tipo: 'notificacion-enviada',
            titulo: notificacionData.title,
            enviados: result.results.successCount,
            fallidos: result.results.failureCount,
            timestamp: new Date().toISOString()
        })
    });
    
    return result;
};
```

---

## 🎨 Ejemplo 9: Notificación con Estilo Personalizado

```javascript
const enviarNotificacionPersonalizada = async () => {
    await fetch('/.netlify/functions/enviar-notificacion-fcm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-secreto-admin'
        },
        body: JSON.stringify({
            title: '🎊 ¡Feliz Cumpleaños!',
            body: 'Tenemos un regalo especial para ti. 30% de descuento en tu próxima compra.',
            icon: '/Imagenes/logo/Logo.png',
            image: '/Imagenes/promociones/cumpleanos.jpg',
            url: '/#ofertas-cumpleanos',
            data: {
                tipo: 'cumpleanos',
                descuento: 30,
                vibrate: [200, 100, 200, 100, 200],
                badge: '/Imagenes/logo/logo 96x96.png'
            },
            targetTokens: ['token-del-usuario-con-cumpleanos']
        })
    });
};
```

---

## 🧪 Ejemplo 10: Testing en Desarrollo

```javascript
// Función de prueba para desarrollo
const testearNotificaciones = async () => {
    console.log('🧪 Iniciando test de notificaciones...');
    
    // Test 1: Verificar permisos
    const permisos = await verificarEstadoPermisos();
    console.log('Permisos:', permisos);
    
    // Test 2: Obtener token
    const token = await obtenerTokenFCM();
    console.log('Token:', token ? token.substring(0, 20) + '...' : 'No disponible');
    
    // Test 3: Enviar notificación de prueba
    if (token) {
        await fetch('/.netlify/functions/enviar-notificacion-fcm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer tu-secreto-admin'
            },
            body: JSON.stringify({
                title: '🧪 Test de Notificación',
                body: 'Esta es una notificación de prueba',
                icon: '/Imagenes/logo/Logo.png',
                url: '/',
                targetTokens: [token]
            })
        });
        
        console.log('✅ Notificación de prueba enviada');
    }
};

// Agregar botón de prueba en desarrollo
if (window.location.hostname === 'localhost') {
    const btnTest = document.createElement('button');
    btnTest.textContent = '🧪 Test FCM';
    btnTest.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;padding:10px 20px;';
    btnTest.onclick = testearNotificaciones;
    document.body.appendChild(btnTest);
}
```

---

## 📚 Recursos Adicionales

- [Documentación oficial de FCM](https://firebase.google.com/docs/cloud-messaging)
- [Web Push Notifications](https://web.dev/push-notifications/)
- [Notification API](https://developer.mozilla.org/es/docs/Web/API/notification)

---

**¡Experimenta con estos ejemplos y personalízalos según tus necesidades!** 🚀
