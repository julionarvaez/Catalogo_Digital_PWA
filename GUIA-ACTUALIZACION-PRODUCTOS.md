# 📦 Guía de Actualización del Catálogo de Productos

## 🎯 Resumen

Ahora tu catálogo de productos se actualiza **automáticamente** en todos los clientes **sin necesidad de borrar cache**.

---

## ✅ ¿Qué cambió?

### Antes ❌
- Productos hardcodeados en `script.js`
- Cache First → Los cambios no se veían
- Necesitabas incrementar `CACHE_VERSION` manualmente
- Los usuarios debían borrar cache

### Ahora ✅
- Productos en `productos.json` separado
- **Stale-While-Revalidate** → Actualización automática en background
- Los cambios se ven en **máximo 60 segundos**
- **Sin borrar cache** → Funciona offline también

---

## 🚀 Cómo Actualizar Productos

### Opción 1: Edición Manual (Recomendada para cambios pequeños)

1. Abre `productos.json`
2. Edita, agrega o elimina productos
3. **IMPORTANTE:** Actualiza la versión:

```bash
npm run update:productos
```

Este comando automáticamente:
- ✅ Incrementa la versión (1.0.0 → 1.0.1)
- ✅ Actualiza el timestamp
- ✅ Valida el JSON

4. Commit y push a Git:

```bash
git add productos.json
git commit -m "feat: Actualizar catálogo de productos v1.0.1"
git push
```

5. Los clientes recibirán la actualización automáticamente en 1-2 minutos

---

### Opción 2: Scripts NPM

#### Actualización Patch (cambios pequeños):
```bash
npm run update:productos
# 1.0.0 → 1.0.1
```

#### Actualización Minor (nuevos productos):
```bash
npm run update:productos:minor
# 1.0.0 → 1.1.0
```

#### Actualización Major (cambios importantes):
```bash
npm run update:productos:major
# 1.0.0 → 2.0.0
```

---

## 📝 Formato de Productos

Cada producto debe tener esta estructura:

```json
{
  "id": 999,
  "nombre": "Nombre del Producto",
  "categoria": "pollo|carnes|pescado|verduras|empanadas|pasabocas|deditos|medallones",
  "precio": 12990,
  "descripcion": "Descripción del producto",
  "emoji": "🍗",
  "imagen": "./Imagenes/Productos/Categoria/imagen.jpg",
  "etiqueta": "Nuevo|Premium|Bestseller",
  "tipoEtiqueta": "etiqueta-nuevo|etiqueta-premium|etiqueta-producto"
}
```

---

## 🔄 Flujo de Actualización Automática

1. **Editas** `productos.json`
2. **Ejecutas** `npm run update:productos`
3. **Subes** a Git/Netlify
4. **Service Worker** detecta cambio (Stale-While-Revalidate)
5. **Actualiza** cache en background
6. **Notifica** al usuario: "🆕 Catálogo actualizado"
7. **Refresca** vista automáticamente

**Tiempo total: 30-60 segundos desde el push**

---

## 🧪 Probar Actualizaciones Localmente

1. Ejecuta el servidor local:
```bash
npm run dev
```

2. Abre la aplicación en el navegador

3. Edita `productos.json` y guarda

4. Ejecuta:
```bash
npm run update:productos
```

5. Recarga la página → Deberías ver los cambios

---

## 📊 Verificar Versión del Catálogo

Abre la consola del navegador (F12) y busca:

```
✅ 50 productos cargados correctamente
📅 Versión del catálogo: 1.0.1
🕐 Última actualización: 2025-12-03T...
```

---

## 🐛 Solución de Problemas

### Los cambios no se ven:

1. **Verifica la versión en productos.json:**
```json
{
  "version": "1.0.1",  ← ¿Está actualizada?
  "lastUpdate": "2025-12-03T..."
}
```

2. **Fuerza un hard refresh:**
- Windows/Linux: `Ctrl + F5`
- Mac: `Cmd + Shift + R`

3. **Revisa la consola del navegador:**
- ¿Hay errores al cargar productos.json?
- ¿Se muestra "Datos actualizados detectados"?

4. **Verifica el Service Worker:**
- DevTools → Application → Service Workers
- Click en "Update" o "Unregister"

---

## 📋 Ejemplos de Cambios Comunes

### Agregar un nuevo producto:

1. Edita `productos.json`
2. Agrega al final del array:

```json
{
  "id": 142,
  "nombre": "Nuevo Producto",
  "categoria": "pollo",
  "precio": 15990,
  "descripcion": "Descripción del nuevo producto",
  "emoji": "🍗",
  "imagen": "./Imagenes/Productos/Pollo/nuevo-producto.jpg",
  "etiqueta": "Nuevo",
  "tipoEtiqueta": "etiqueta-nuevo"
}
```

3. Ejecuta: `npm run update:productos:minor`
4. Commit y push

### Cambiar precio de un producto:

1. Busca el producto en `productos.json` por ID
2. Modifica el campo `precio`:

```json
{
  "id": 1,
  "nombre": "Pollo Semicriollo Entero",
  "precio": 8500,  ← Cambio de 7500 a 8500
  ...
}
```

3. Ejecuta: `npm run update:productos`
4. Commit y push

### Eliminar un producto:

1. Busca el producto en `productos.json`
2. Elimina todo el objeto `{ ... }`
3. Ejecuta: `npm run update:productos`
4. Commit y push

---

## 🎯 Mejores Prácticas

1. ✅ **Siempre actualiza la versión** después de cambios
2. ✅ **Usa commits descriptivos**
3. ✅ **Prueba localmente** antes de hacer push
4. ✅ **Mantén backup** de productos.json
5. ✅ **No edites directamente en producción**
6. ✅ **Valida el JSON** (usa un linter)

---

## 🔧 Comandos Útiles

```bash
# Actualizar versión patch
npm run update:productos

# Ver versión actual
cat productos.json | grep version

# Validar JSON
node -e "JSON.parse(require('fs').readFileSync('productos.json'))"

# Contar productos
node -e "console.log(require('./productos.json').productos.length)"
```

---

## 📱 Comportamiento en Clientes

### Primera visita:
- Descarga `productos.json` del servidor
- Cachea localmente
- Guarda versión en localStorage

### Visitas posteriores:
- Muestra productos desde cache (instantáneo)
- Verifica actualización en background
- Si hay nueva versión:
  - Descarga automáticamente
  - Actualiza cache
  - Notifica al usuario
  - Refresca vista

### Modo offline:
- Usa última versión cacheada
- Sin notificación de actualización
- Al volver online: sincroniza automáticamente

---

## 🎉 Ventajas del Nuevo Sistema

✅ **Actualizaciones instantáneas** → Sin esperar a que usuarios borren cache
✅ **Funciona offline** → Siempre hay productos disponibles
✅ **Sin interrupciones** → Actualización transparente
✅ **Fácil de mantener** → Solo editas un JSON
✅ **Versionado claro** → Sabes qué versión está en producción
✅ **Notificaciones automáticas** → Usuarios informados de cambios

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs del Service Worker
3. Consulta esta guía
4. Revisa el código en `script.js` → función `cargarProductos()`

---

**¡Listo! Ahora tienes control total sobre tu catálogo con actualizaciones automáticas.** 🚀
