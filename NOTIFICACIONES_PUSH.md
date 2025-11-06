# 🔔 Sistema de Notificaciones Push - Alimento del Cielo

## 📋 Descripción General

Sistema completo de notificaciones push integrado en la PWA de Alimento del Cielo. Permite enviar notificaciones nativas del navegador a los usuarios para informarles sobre ofertas, nuevos productos y actualizaciones importantes.

---

## ✨ Características Implementadas

### 1. **Solicitud de Permisos Inteligente**
- ✅ Modal atractivo con diseño profesional
- ✅ Explicación clara de los beneficios
- ✅ Solicitud automática después de 30 segundos
- ✅ Respeta la decisión del usuario (no insiste)
- ✅ Guarda estado en localStorage

### 2. **Notificaciones Push Nativas**
- ✅ Soporte completo para Notification API
- ✅ Iconos, imágenes y badge personalizados
- ✅ Vibración con patrón personalizado
- ✅ Botones de acción interactivos
- ✅ Auto-cierre después de 10 segundos
- ✅ Click para abrir la aplicación

### 3. **Integración con Service Worker**
- ✅ Manejo de eventos `push`
- ✅ Manejo de eventos `notificationclick`
- ✅ Apertura/enfoque inteligente de ventanas
- ✅ Navegación automática a URLs específicas
- ✅ Suscripción a PushManager

### 4. **Notificaciones In-App**
- ✅ Banner superior para mensajes rápidos
- ✅ Tipos: éxito, error, información
- ✅ Auto-cierre después de 3 segundos
- ✅ Animaciones suaves
- ✅ Responsive y accesible

### 5. **Botón de Activación en Banner**
- ✅ Botón visual en el banner promocional
- ✅ Animación de campana balanceándose
- ✅ Estados: normal, activo, bloqueado
- ✅ Indicador visual claro del estado
- ✅ Responsive (solo icono en móvil)

### 6. **Notificaciones Contextuales**
- ✅ Bienvenida al primer ingreso
- ✅ Confirmación cuando se agrega primer producto al carrito
- ✅ Notificación de prueba al activar permisos
- ✅ Compatible con eventos personalizados

---

## 🎯 Casos de Uso

### 1. Activación de Notificaciones
```javascript
// Manual desde botón
await solicitarPermisoNotificaciones();

// Automática después de 30 segundos
inicializarNotificaciones(); // Ya llamado en DOMContentLoaded
```

### 2. Enviar Notificación Push
```javascript
// Básica
mostrarNotificacionPush(
    '🎉 ¡Oferta Especial!',
    'Descuento del 20% en todos los productos de pollo',
    '/index.html#pollo'
);

// Con todos los parámetros
mostrarNotificacionPush(
    'Título',
    'Mensaje detallado aquí',
    'https://tudominio.com/ruta'
);
```

### 3. Verificar Estado
```javascript
const estado = verificarEstadoNotificaciones();
console.log(estado);
// {
//   soportado: true,
//   permiso: 'granted',
//   mensaje: '✅ Notificaciones activadas'
// }
```

### 4. Notificación In-App
```javascript
// Éxito (predeterminado)
mostrarNotificacion('✅ Producto agregado al carrito');

// Error
mostrarNotificacion('❌ Error al procesar', 'error');
```

---

## 🔧 API Pública

### Funciones Principales

#### `solicitarPermisoNotificaciones()`
Solicita permiso para mostrar notificaciones.

**Retorna:** `Promise<string>` - Estado del permiso ('granted', 'denied', 'default')

**Ejemplo:**
```javascript
const permiso = await solicitarPermisoNotificaciones();
if (permiso === 'granted') {
    console.log('¡Notificaciones activadas!');
}
```

---

#### `mostrarNotificacionPush(titulo, mensaje, url)`
Muestra una notificación push nativa del navegador.

**Parámetros:**
- `titulo` (string): Título de la notificación
- `mensaje` (string): Cuerpo del mensaje
- `url` (string, opcional): URL a abrir al hacer clic (default: '/')

**Ejemplo:**
```javascript
mostrarNotificacionPush(
    '🔥 ¡Nueva Oferta!',
    'Combo familiar con 30% de descuento',
    '/index.html#pasabocas'
);
```

---

#### `verificarEstadoNotificaciones()`
Verifica el estado actual de los permisos de notificación.

**Retorna:** `Object`
```javascript
{
    soportado: boolean,
    permiso: 'granted' | 'denied' | 'default',
    mensaje: string
}
```

**Ejemplo:**
```javascript
const estado = verificarEstadoNotificaciones();
if (estado.permiso === 'denied') {
    console.warn('Notificaciones bloqueadas por el usuario');
}
```

---

#### `mostrarNotificacion(mensaje, tipo)`
Muestra notificación in-app (banner superior).

**Parámetros:**
- `mensaje` (string): Texto del mensaje
- `tipo` (string, opcional): 'exito' o 'error' (default: 'exito')

**Ejemplo:**
```javascript
mostrarNotificacion('✅ Carrito actualizado', 'exito');
mostrarNotificacion('❌ Error al guardar', 'error');
```

---

#### `suscribirseAPush()`
Suscribe al usuario a notificaciones push (automático).

**Uso:** Se llama automáticamente cuando se conceden permisos.

---

#### `actualizarEstadoBotonNotificaciones()`
Actualiza el estado visual del botón de notificaciones.

**Uso:** Se llama automáticamente después de cambios de permisos.

---

## 🎨 Personalización

### Modificar Iconos de Notificación

Editar en `script.js`:
```javascript
const opciones = {
    icon: './Imagenes/logo/Logo.png',  // Cambiar aquí
    badge: './Imagenes/iconos/96x96/96x96.png',  // Y aquí
    // ...
};
```

### Modificar Patrón de Vibración

```javascript
vibrate: [200, 100, 200], // [vibrar, pausa, vibrar] en ms
```

### Modificar Tiempo de Auto-Cierre

```javascript
// Notificación push (en mostrarNotificacionPush)
setTimeout(() => {
    notificacion.close();
}, 10000); // Cambiar 10000 a los ms deseados

// Notificación in-app (en mostrarNotificacion)
setTimeout(() => {
    notificacion.classList.remove('mostrar');
}, 3000); // Cambiar 3000 a los ms deseados
```

### Modificar Tiempo Antes de Preguntar

En `inicializarNotificaciones()`:
```javascript
setTimeout(() => {
    mostrarPromptNotificaciones();
}, 30000); // Cambiar 30000 (30 segundos) al valor deseado
```

---

## 🔐 Seguridad y Privacidad

### Permisos
- ✅ Solo se solicitan con consentimiento explícito del usuario
- ✅ El usuario puede revocar permisos en cualquier momento
- ✅ Se respeta la configuración del navegador

### Datos
- ✅ No se recopilan datos personales
- ✅ Solo se almacena estado de permisos en localStorage
- ✅ Las suscripciones son anónimas

### Mejores Prácticas
- ✅ Solicitar permisos en contexto (no al cargar página)
- ✅ Explicar beneficios antes de solicitar
- ✅ Respetar la decisión del usuario
- ✅ Permitir desactivación fácil

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 42+
- ✅ Firefox 44+
- ✅ Edge 17+
- ✅ Safari 16+ (macOS 13+, iOS 16.4+)
- ✅ Opera 37+
- ✅ Samsung Internet 4+

### Verificación de Soporte
```javascript
if ('Notification' in window) {
    console.log('✅ Notificaciones soportadas');
} else {
    console.log('❌ Notificaciones no soportadas');
}
```

---

## 🐛 Solución de Problemas

### Problema: "Las notificaciones no aparecen"

**Soluciones:**
1. Verificar permisos del navegador:
   ```javascript
   console.log(Notification.permission); // Debe ser 'granted'
   ```

2. Verificar soporte:
   ```javascript
   console.log('Notification' in window); // Debe ser true
   ```

3. Verificar service worker registrado:
   ```javascript
   navigator.serviceWorker.ready.then(reg => {
       console.log('SW listo:', reg);
   });
   ```

4. Revisar consola del navegador para errores

---

### Problema: "El botón muestra 'Bloqueadas'"

**Causa:** El usuario bloqueó las notificaciones previamente.

**Solución:**
1. Chrome: `Configuración > Privacidad y seguridad > Configuración de sitios > Notificaciones`
2. Firefox: `about:preferences#privacy > Permisos > Notificaciones`
3. Safari: `Preferencias > Sitios web > Notificaciones`

---

### Problema: "Modal no aparece"

**Verificaciones:**
1. Comprobar que pasaron 30 segundos desde carga:
   ```javascript
   // El modal se muestra después de 30s
   ```

2. Verificar localStorage:
   ```javascript
   localStorage.getItem('pregunto_notificaciones'); // Si existe, ya se preguntó
   ```

3. Limpiar localStorage para resetear:
   ```javascript
   localStorage.removeItem('pregunto_notificaciones');
   location.reload();
   ```

---

### Problema: "Notificaciones push desde servidor"

**Nota:** La implementación actual usa notificaciones locales. Para notificaciones desde servidor:

1. Generar claves VAPID:
   ```bash
   npx web-push generate-vapid-keys
   ```

2. Configurar en `script.js`:
   ```javascript
   const VAPID_PUBLIC_KEY = 'TU_CLAVE_PUBLICA_AQUI';
   
   function urlBase64ToUint8Array(base64String) {
       const padding = '='.repeat((4 - base64String.length % 4) % 4);
       const base64 = (base64String + padding)
           .replace(/\-/g, '+')
           .replace(/_/g, '/');
       const rawData = window.atob(base64);
       const outputArray = new Uint8Array(rawData.length);
       for (let i = 0; i < rawData.length; ++i) {
           outputArray[i] = rawData.charCodeAt(i);
       }
       return outputArray;
   }
   
   // En suscribirseAPush()
   subscription = await registration.pushManager.subscribe({
       userVisibleOnly: true,
       applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
   });
   ```

3. Enviar suscripción al servidor:
   ```javascript
   await fetch('/api/subscribe', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(subscription)
   });
   ```

---

## 📊 Métricas y Analytics

### Eventos Rastreados

El sistema está preparado para integrar con Google Analytics:

```javascript
// En solicitarPermisoNotificaciones()
if (permission === 'granted') {
    // gtag('event', 'notification_permission', { value: 'granted' });
}

// Al hacer clic en notificación (en sw.js)
// clients.openWindow() registra apertura
```

### Datos Disponibles
- Estado de permisos (granted/denied/default)
- Cantidad de notificaciones enviadas
- Clics en notificaciones
- Tiempo de activación desde primera visita

---

## 🚀 Próximas Mejoras

### Fase 1 (Corto Plazo)
- [ ] Integración con backend para notificaciones programadas
- [ ] Panel de administración para enviar notificaciones
- [ ] Segmentación de usuarios (por intereses, ubicación)
- [ ] A/B testing de mensajes

### Fase 2 (Mediano Plazo)
- [ ] Notificaciones basadas en comportamiento (carritos abandonados)
- [ ] Rich notifications con imágenes dinámicas
- [ ] Notificaciones silenciosas para sincronización
- [ ] Programación de notificaciones por zona horaria

### Fase 3 (Largo Plazo)
- [ ] Machine learning para personalización
- [ ] Integración con CRM
- [ ] Notificaciones transaccionales (pedidos, entregas)
- [ ] Notificaciones multicanal (push + email + SMS)

---

## 📖 Recursos Adicionales

### Documentación Oficial
- [MDN - Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [MDN - Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [W3C - Notifications API](https://notifications.spec.whatwg.org/)

### Herramientas
- [web-push](https://www.npmjs.com/package/web-push) - Librería Node.js para push
- [FCM](https://firebase.google.com/docs/cloud-messaging) - Firebase Cloud Messaging
- [OneSignal](https://onesignal.com/) - Plataforma de notificaciones push

### Buenas Prácticas
- [Web.dev - Notifications](https://web.dev/push-notifications-overview/)
- [Google - Best Practices](https://developers.google.com/web/fundamentals/push-notifications)

---

## 👨‍💻 Soporte Técnico

### Archivos Relacionados
- `script.js` - Lógica principal de notificaciones
- `sw.js` - Service worker con manejo de push
- `styles.css` - Estilos del modal y botones
- `index.html` - HTML del botón y notificación in-app

### Contacto
Para soporte técnico o preguntas sobre el sistema de notificaciones:
- 📧 Email: congeladosmontelibano@gmail.com
- 📱 WhatsApp: +57 313 521 2887

---

## 📄 Licencia y Créditos

Sistema desarrollado para **Alimento del Cielo - Congelados Montelíbano**

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2024  
**Desarrollado por:** Equipo de desarrollo Alimento del Cielo

---

## ✅ Checklist de Implementación

- [x] Solicitud de permisos implementada
- [x] Notificaciones push nativas funcionando
- [x] Integración con service worker
- [x] Modal de solicitud de permisos diseñado
- [x] Botón de activación en banner
- [x] Estados visuales del botón
- [x] Notificaciones in-app
- [x] Notificaciones contextuales (bienvenida, carrito)
- [x] Compatibilidad cross-browser
- [x] Responsive design
- [x] Modo oscuro
- [x] Accesibilidad
- [x] Documentación completa
- [ ] Integración con backend (pendiente)
- [ ] Analytics tracking (pendiente)
- [ ] Tests automatizados (pendiente)

---

**🎉 ¡Sistema de Notificaciones Push Completamente Funcional!**
