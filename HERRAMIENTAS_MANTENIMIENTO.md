# 🧹 HERRAMIENTAS DE MANTENIMIENTO - Alimento del Cielo PWA

## 📋 Índice
1. [Herramienta de Limpieza](#herramienta-de-limpieza)
2. [Script de Verificación](#script-de-verificación)
3. [Solución Rápida a Problemas](#solución-rápida-a-problemas)
4. [Errores Comunes](#errores-comunes)

---

## 🧹 Herramienta de Limpieza

### ¿Qué hace?
Limpia el cache, Service Workers y almacenamiento local de la aplicación.

### ¿Cuándo usarla?

- ❌ Ves errores persistentes en consola
- 🔄 Las actualizaciones no se reflejan
- 💾 El cache está corrupto
- 🐛 Comportamiento extraño de la app

### Cómo usar:

#### Opción 1: Interfaz Web (Recomendado)
```
1. Navega a: http://localhost:5500/limpiar-cache.html
2. Haz clic en "🗑️ Limpiar Todo"
3. Espera a que termine
4. ¡Listo!
```

#### Opción 2: Desde la Consola
```javascript
// Pega esto en la consola del navegador (F12):

// Limpiar cache
caches.keys().then(names => 
    Promise.all(names.map(name => caches.delete(name)))
).then(() => console.log('✅ Cache limpiado'));

// Desregistrar Service Workers
navigator.serviceWorker.getRegistrations().then(regs => 
    Promise.all(regs.map(reg => reg.unregister()))
).then(() => console.log('✅ SW desregistrados'));

// Limpiar storage
localStorage.clear();
sessionStorage.clear();
console.log('✅ Storage limpiado');

// Recargar
location.reload();
```

---

## 🔍 Script de Verificación

### ¿Qué hace?
Analiza el estado completo de la PWA y genera un reporte detallado.

### Qué verifica:

- ✅ Service Worker (registro y estado)
- 📦 Cache (cantidad y contenido)
- 🌐 API Global (window.AlimentoDelCielo)
- ⭐ Sistema de Reseñas
- 💾 Almacenamiento Local
- 📶 Conectividad
- 📋 Manifest

### Cómo usar:

#### Opción 1: Copiar archivo
```javascript
// En la consola (F12), pega el contenido de:
// verificar-pwa.js
```

#### Opción 2: Cargar desde archivo
```html
<!-- Agregar al final de index.html para debugging -->
<script src="verificar-pwa.js"></script>
```

#### Opción 3: Snippet rápido
```javascript
// Versión corta en la consola:

(async () => {
    console.log('🔍 Verificando...\n');
    
    // Service Worker
    const sws = await navigator.serviceWorker.getRegistrations();
    console.log(`✅ Service Workers: ${sws.length}`);
    
    // Cache
    const caches_list = await caches.keys();
    console.log(`✅ Caches: ${caches_list.length}`);
    
    // API
    console.log(`✅ API Global: ${typeof window.AlimentoDelCielo !== 'undefined'}`);
    
    // Analytics
    console.log(`✅ Analytics: ${
        window.AlimentoDelCielo?.analytics?.track !== undefined
    }`);
    
    console.log('\n✨ Verificación completada');
})();
```

### Interpretación de Resultados:

#### 🎯 Puntuación 80-100%
```
¡Perfecto! Todo funciona correctamente.
No se requiere acción.
```

#### 🎯 Puntuación 60-79%
```
Bien, pero hay áreas de mejora.
Revisa las advertencias.
```

#### 🎯 Puntuación 0-59%
```
Se requiere atención.
Ejecuta la herramienta de limpieza.
```

---

## 🚨 Solución Rápida a Problemas

### Problema: Errores de chrome-extension

```javascript
// ✅ YA ESTÁ SOLUCIONADO
// El Service Worker ahora ignora estos recursos automáticamente
// Si aún ves el error, es solo informativo y puedes ignorarlo
```

### Problema: analytics.track is not a function

```javascript
// ✅ YA ESTÁ SOLUCIONADO
// El sistema ahora verifica la existencia antes de usar

// Si quieres forzar una actualización:
location.reload(true);
```

### Problema: Service Worker no se actualiza

```javascript
// Solución 1: Hard Reload
// Ctrl + Shift + R (Windows/Linux)
// Cmd + Shift + R (Mac)

// Solución 2: Desde DevTools
// Application > Service Workers > Unregister
// Luego recargar la página

// Solución 3: Programáticamente
navigator.serviceWorker.getRegistrations().then(regs => 
    regs.forEach(reg => reg.unregister())
).then(() => location.reload());
```

### Problema: Cache desactualizado

```javascript
// Solución Rápida:
caches.keys().then(names => 
    Promise.all(names.map(name => caches.delete(name)))
).then(() => location.reload());
```

### Problema: La app no funciona offline

```javascript
// Verificar que el SW está registrado:
navigator.serviceWorker.getRegistrations()
    .then(regs => console.log('SWs:', regs.length));

// Si es 0, recargar la página:
if (navigator.serviceWorker.controller) {
    console.log('✅ SW activo');
} else {
    console.log('❌ No hay SW, recargando...');
    location.reload();
}
```

---

## ❓ Errores Comunes

### 1. "Uncaught (in promise) TypeError: Failed to execute 'put'"

**Causa:** Intentando cachear recursos no HTTP

**Solución:** ✅ Ya está corregido en sw.js v1.0.1

**Verificar:**
```javascript
// En consola:
navigator.serviceWorker.getRegistrations()
    .then(regs => regs[0]?.active?.scriptURL)
    .then(url => console.log('SW URL:', url));

// Debe mostrar: http://localhost:5500/sw.js
```

---

### 2. "grm ERROR [iterable] Not supported: in app messages"

**Causa:** Extensión de Grammarly

**Solución:** Este error es de la extensión del navegador, no afecta tu app

**Opciones:**
```
1. Ignorar (recomendado) ✅
2. Deshabilitar extensión Grammarly
3. Usar modo incógnito para desarrollo
```

---

### 3. "window.AlimentoDelCielo.analytics.track is not a function"

**Causa:** El objeto analytics no estaba correctamente estructurado

**Solución:** ✅ Ya está corregido en script.js

**Verificar:**
```javascript
// En consola:
console.log(typeof window.AlimentoDelCielo?.analytics?.track);
// Debe mostrar: "function"

// Probar:
window.AlimentoDelCielo.analytics.track('test', { foo: 'bar' });
// Debe mostrar: 📊 Analytics Track: test {foo: "bar"}
```

---

## 🔧 Comandos Útiles para DevTools

### Inspeccionar Service Worker
```javascript
// Ver todos los SWs
await navigator.serviceWorker.getRegistrations();

// Ver estado del SW activo
navigator.serviceWorker.controller;

// Forzar actualización del SW
navigator.serviceWorker.getRegistrations()
    .then(regs => regs.forEach(reg => reg.update()));
```

### Inspeccionar Cache
```javascript
// Ver todos los caches
await caches.keys();

// Ver contenido de un cache
const cache = await caches.open('alimento-del-cielo-v1.0.0');
const keys = await cache.keys();
console.log(keys.map(k => k.url));

// Buscar recurso en cache
await caches.match('/index.html');
```

### Inspeccionar Storage
```javascript
// Ver todo el localStorage
console.table(Object.entries(localStorage));

// Ver carrito
const carrito = localStorage.getItem('carritoAlimentoDelCielo');
console.log(JSON.parse(carrito));

// Limpiar item específico
localStorage.removeItem('carritoAlimentoDelCielo');
```

---

## 📱 Testing en Diferentes Navegadores

### Chrome/Edge
```
1. F12 → Application
2. Service Workers → Ver estado
3. Cache Storage → Ver contenido
4. Clear Storage → Limpiar todo
```

### Firefox
```
1. F12 → Storage
2. Service Workers → Ver registros
3. Cache → Ver contenido
4. Borrar datos del sitio
```

### Safari
```
1. Develop → Show Web Inspector
2. Storage → Ver todo
3. Clear Cache
```

---

## 🎯 Checklist de Salud de la PWA

Ejecuta este checklist regularmente:

```
✅ Service Worker registrado y activo
✅ Cache funcionando (ver en DevTools)
✅ window.AlimentoDelCielo disponible
✅ window.AlimentoDelCielo.analytics.track funciona
✅ Sin errores de "chrome-extension" afectando funcionalidad
✅ Sin errores de "analytics.track is not a function"
✅ App funciona offline
✅ Carrito persiste en localStorage
✅ Manifest.json accesible
```

### Cómo verificar todo de una vez:

```javascript
// Pegar en consola:
(async () => {
    const checks = [];
    
    // SW
    const sws = await navigator.serviceWorker.getRegistrations();
    checks.push(['Service Worker', sws.length > 0]);
    
    // Cache
    const caches_list = await caches.keys();
    checks.push(['Cache', caches_list.length > 0]);
    
    // API
    checks.push(['API Global', typeof window.AlimentoDelCielo !== 'undefined']);
    
    // Analytics
    checks.push(['Analytics', 
        window.AlimentoDelCielo?.analytics?.track !== undefined
    ]);
    
    // Manifest
    const manifest = document.querySelector('link[rel="manifest"]');
    checks.push(['Manifest', manifest !== null]);
    
    console.table(checks);
    
    const passed = checks.filter(c => c[1]).length;
    const total = checks.length;
    console.log(`\n✅ ${passed}/${total} checks pasados (${Math.round(passed/total*100)}%)`);
})();
```

---

## 📞 ¿Necesitas ayuda?

Si después de usar estas herramientas sigues teniendo problemas:

1. **Ejecuta el script de verificación** (verificar-pwa.js)
2. **Toma captura** del resultado en consola
3. **Revisa** CORRECCIONES_APLICADAS.md
4. **Limpia** usando limpiar-cache.html
5. **Recarga** con Ctrl + Shift + R

---

## ✨ Resumen Rápido

```bash
# ¿Todo funciona bien?
→ No hacer nada ✅

# ¿Errores en consola?
→ Verificar con: verificar-pwa.js
→ Si puntuación < 80%: usar limpiar-cache.html

# ¿Actualizaciones no visibles?
→ Ctrl + Shift + R
→ O usar: limpiar-cache.html

# ¿Duda sobre estado?
→ Ejecutar: verificar-pwa.js
→ Revisar reporte en consola
```

---

**¡Listo!** 🎉 Con estas herramientas puedes mantener tu PWA funcionando perfectamente.
