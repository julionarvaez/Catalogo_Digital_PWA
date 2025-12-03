# 🧪 PRUEBAS MANUALES DEL SISTEMA DE NOTIFICACIONES

## ✅ CHECKLIST DE VALIDACIÓN

### 1️⃣ PRUEBA: Notificación en Foreground (App Abierta)

**Objetivo:** Verificar que notificaciones lleguen al centro cuando la app está activa

**Pasos:**
1. Abrir la PWA en el navegador
2. Abrir DevTools (F12) → Consola
3. Desde `panel-admin.html`, enviar una notificación de prueba
4. Verificar en consola:
   ```
   📩 Mensaje recibido (foreground): {...}
   📥 Agregando notificación al centro: {...}
   ✅ Notificación agregada al centro
   ```
5. Abrir centro de notificaciones (icono 🔔)
6. Confirmar que aparece la notificación con:
   - Título correcto
   - Mensaje completo
   - Icono apropiado
   - Badge con número de no leídas

**Resultado esperado:** ✅ Notificación visible en el centro + badge actualizado

---

### 2️⃣ PRUEBA: Notificación en Background (App Cerrada/Minimizada)

**Objetivo:** Verificar que notificaciones background se sincroni with

cen al abrir la app

**Pasos:**
1. Cerrar completamente la PWA
2. Desde `panel-admin.html`, enviar una notificación
3. Esperar 5 segundos
4. Reabrir la PWA
5. Verificar en consola:
   ```
   🔄 Sincronizando notificaciones perdidas...
   📋 Procesando N notificaciones pendientes...
   ✅ N notificaciones sincronizadas
   ```
6. Abrir centro de notificaciones
7. Confirmar que aparece la notificación recibida mientras estaba cerrada

**Resultado esperado:** ✅ Notificación aparece automáticamente al reabrir

---

### 3️⃣ PRUEBA: Múltiples Usuarios (Broadcast)

**Objetivo:** Verificar que TODOS los usuarios reciban notificaciones broadcast

**Pasos:**
1. Abrir la PWA en 3 navegadores diferentes (Chrome, Edge, Firefox)
2. Activar notificaciones en los 3
3. En cada uno, abrir DevTools
4. Desde `panel-admin.html`, enviar notificación con `sendToAll: true`
5. Verificar en los 3 navegadores:
   - Notificación push del navegador
   - Entrada en consola confirmando recepción
   - Badge actualizado
   - Notificación en el centro

**Resultado esperado:** ✅ Los 3 usuarios ven la notificación

---

### 4️⃣ PRUEBA: Sincronización Offline → Online

**Objetivo:** Verificar recuperación de notificaciones al volver online

**Pasos:**
1. Abrir PWA
2. Activar modo offline en DevTools (Network → Offline)
3. Desde otro dispositivo/navegador, enviar 2-3 notificaciones
4. Esperar 10 segundos
5. Desactivar modo offline
6. Verificar en consola:
   ```
   🌐 Conexión restaurada, sincronizando notificaciones...
   📡 Consultando notificaciones desde: [fecha]
   📬 N notificaciones recibidas del servidor
   ```
7. Confirmar que aparecen todas las notificaciones perdidas

**Resultado esperado:** ✅ Recupera notificaciones automáticamente

---

### 5️⃣ PRUEBA: Persistencia (Reload)

**Objetivo:** Verificar que notificaciones persisten al recargar la página

**Pasos:**
1. Recibir 3-5 notificaciones
2. Marcar 2 como leídas
3. Recargar página (Ctrl+R)
4. Abrir centro de notificaciones
5. Confirmar:
   - Todas las notificaciones siguen ahí
   - Las marcadas como leídas mantienen ese estado
   - Badge muestra solo las no leídas

**Resultado esperado:** ✅ Notificaciones persisten correctamente

---

### 6️⃣ PRUEBA: Click en Notificación

**Objetivo:** Verificar navegación al hacer clic

**Pasos:**
1. Enviar notificación con URL específica (ej: `/index.html#productos`)
2. Hacer clic en la notificación push del navegador
3. Verificar:
   - La PWA se enfoca/abre
   - Navega a la URL especificada
   - Se agrega al centro de notificaciones

**Resultado esperado:** ✅ Navegación correcta + entrada en centro

---

### 7️⃣ PRUEBA: Badge Counter

**Objetivo:** Verificar contador de notificaciones no leídas

**Pasos:**
1. Limpiar todas las notificaciones
2. Recibir 5 notificaciones nuevas
3. Verificar badge muestra "5"
4. Abrir centro y marcar 2 como leídas
5. Verificar badge actualiza a "3"
6. Marcar todas como leídas
7. Verificar badge desaparece

**Resultado esperado:** ✅ Badge siempre correcto

---

### 8️⃣ PRUEBA: Estadísticas de Sincronización

**Objetivo:** Verificar sistema de tracking interno

**Pasos:**
1. Abrir consola
2. Ejecutar:
   ```javascript
   const stats = obtenerEstadisticasSync();
   console.log(stats);
   ```
3. Verificar objeto con:
   - `total`: Número total de notificaciones guardadas
   - `sincronizadas`: Cantidad ya procesadas
   - `noSincronizadas`: Pendientes de procesar
   - `ultimaSincronizacion`: Fecha de última sync

**Resultado esperado:** ✅ Estadísticas precisas

---

## 🔧 COMANDOS DE DIAGNÓSTICO

### Ver notificaciones guardadas (localStorage):
```javascript
const notif = JSON.parse(localStorage.getItem('notificaciones'));
console.table(notif);
```

### Ver notificaciones pendientes de sync:
```javascript
const pendientes = JSON.parse(localStorage.getItem('notificaciones_pendientes_sync'));
console.table(pendientes);
```

### Forzar sincronización manual:
```javascript
sincronizarNotificacionesPerdidas();
```

### Limpiar todas las notificaciones:
```javascript
localStorage.removeItem('notificaciones');
localStorage.removeItem('notificaciones_pendientes_sync');
location.reload();
```

### Ver tokens FCM activos:
```javascript
const token = localStorage.getItem('fcmToken');
console.log('Token FCM:', token);
```

---

## 📊 MÉTRICAS A VALIDAR

| Métrica | Valor esperado | Cómo verificar |
|---------|----------------|----------------|
| **Tasa de entrega** | 100% (todas llegan) | Enviar 10, contar en centro |
| **Latencia foreground** | < 1 segundo | Tiempo entre envío y aparición |
| **Latencia background** | < 3 segundos | Al reabrir app |
| **Persistencia** | 100% tras reload | Recargar y contar |
| **Sincronización offline** | 100% al volver online | Modo offline y verificar |
| **Badge accuracy** | Siempre correcto | Comparar badge vs no leídas |

---

## ⚠️ PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "agregarNotificacionAlCentro is not a function"
**Causa:** Script `notificaciones-sistema.js` no cargó  
**Solución:** Verificar en Network tab que se descargó correctamente

### ❌ Notificaciones no aparecen en background
**Causa:** Service Worker no está activo  
**Solución:** 
```javascript
navigator.serviceWorker.ready.then(reg => {
    console.log('SW activo:', reg.active);
});
```

### ❌ Badge no se actualiza
**Causa:** Función `actualizarContadorNotificaciones()` no se ejecuta  
**Solución:** Verificar que `notificacionesNoLeidas` se calcula correctamente

### ❌ Sincronización falla
**Causa:** Función Netlify no disponible  
**Solución:** Verificar que `obtener-notificaciones.js` esté desplegado:
```bash
curl https://alimentodelcielo.netlify.app/.netlify/functions/obtener-notificaciones?desde=0
```

---

## 🎯 CRITERIOS DE ÉXITO

✅ **TODAS** estas pruebas deben pasar para considerar el sistema completo:

1. ✅ Notificaciones foreground se reflejan en el centro (100%)
2. ✅ Notificaciones background se sincronizan al reabrir (100%)
3. ✅ Usuarios múltiples reciben broadcasts (100%)
4. ✅ Recuperación automática al volver online
5. ✅ Persistencia tras reloads
6. ✅ Navegación correcta en clicks
7. ✅ Badge siempre preciso
8. ✅ Estadísticas de sync funcionando

---

## 📝 NOTAS FINALES

- **Tiempo estimado de pruebas:** 30-45 minutos
- **Navegadores a probar:** Chrome, Edge, Firefox (PWA-compatible)
- **Dispositivos:** Desktop + móvil (Android con Chrome)
- **Herramientas necesarias:** DevTools, panel-admin.html, acceso a Netlify Functions

**Reportar resultados en:** GitHub Issues con capturas de consola y descripción del comportamiento observado.
