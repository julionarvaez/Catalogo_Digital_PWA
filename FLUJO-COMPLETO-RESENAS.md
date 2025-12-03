# 🔄 FLUJO COMPLETO: Cómo Funciona el Sistema de Reseñas

## 📊 ARQUITECTURA GENERAL

```
┌─────────────────┐
│   FRONTEND      │ (index.html + script.js)
│  SistemaResenas │
└────────┬────────┘
         │
         │ 1. Usuario escribe reseña
         ↓
┌─────────────────┐
│ Optimistic UI   │ (Muestra inmediatamente)
└────────┬────────┘
         │
         │ 2. POST request
         ↓
┌─────────────────────────────┐
│ NETLIFY FUNCTION            │
│ /.netlify/functions/reviews │
└────────┬────────────────────┘
         │
         │ 3. Validación + Sanitización
         ↓
┌─────────────────┐
│  FIRESTORE DB   │
│  Collection:    │
│    reviews      │
└────────┬────────┘
         │
         │ 4. Guardar con published: true/false
         ↓
┌─────────────────┐
│   RESPUESTA     │
│   { ok, id,     │
│   published }   │
└────────┬────────┘
         │
         │ 5. Actualizar UI según estado
         ↓
┌─────────────────────────────┐
│ VISUALIZACIÓN EN CATÁLOGO   │
│ Solo si published: true     │
└─────────────────────────────┘
```

---

## 📝 PASO A PASO DETALLADO

### **FASE 1: Usuario Escribe la Reseña**

**Ubicación:** `index.html` líneas 498-570

**Elementos del formulario:**
```html
<form id="resenaForm">
  <input id="nombreResena" name="nombre">      <!-- Nombre del usuario -->
  <select id="productoResena">                 <!-- Producto opcional -->
  <div id="ratingSelector">                    <!-- Estrellas 1-5 -->
  <textarea id="textoResena" name="texto">     <!-- Comentario -->
  <button id="btnEnviarResena">                <!-- Botón enviar -->
</form>
```

**Validaciones en el frontend:**
- Nombre: 2-50 caracteres
- Rating: 1-5 estrellas (requerido)
- Texto: 10-500 caracteres
- Rate limiting: máximo 1 reseña cada 3 segundos

---

### **FASE 2: Envío del Formulario**

**Archivo:** `script.js` - Clase `SistemaResenas`

#### 2.1 **Captura del Submit** (línea 5100)
```javascript
async handleSubmit(event) {
    event.preventDefault();
    
    // 1. Rate limiting check
    if (now - this.lastSubmit < 3000) {
        this.showError('Espera unos segundos...');
        return;
    }
    
    // 2. Validar formulario
    if (!this.validateForm()) return;
    
    // 3. Recopilar datos
    const resenaData = {
        nombre: formData.get('nombre').trim(),
        texto: formData.get('texto').trim(),
        rating: parseInt(formData.get('rating')),
        productoId: formData.get('productoId') || null,
        timestamp: Date.now(),
        status: 'pending'
    };
```

#### 2.2 **Optimistic UI** - Muestra Inmediatamente
```javascript
    // 4. Agregar INMEDIATAMENTE a la vista (antes de confirmar)
    this.addOptimisticReview(resenaData);
```

**⚠️ IMPORTANTE:** Aquí está el primer punto crítico:
- La reseña aparece en el carrusel ANTES de confirmar con el servidor
- Esto mejora la UX, pero puede causar confusión si falla

---

### **FASE 3: Envío al Servidor**

#### 3.1 **Request a Netlify Function** (línea 5492)
```javascript
async enviarResenaAlServidor(resenaData) {
    const response = await fetch('/.netlify/functions/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: resenaData.nombre,
            texto: resenaData.texto,
            rating: resenaData.rating,
            productoId: resenaData.productoId
        })
    });
    
    const data = await response.json();
    
    return {
        ok: true,
        id: data.id,
        published: data.published,  // ← CLAVE: indica si se publicó
        message: data.message
    };
}
```

---

### **FASE 4: Backend - Netlify Function**

**Archivo:** `netlify/functions/reviews.js`

#### 4.1 **Recepción y Validación**
```javascript
exports.handler = async (event, context) => {
    // 1. Verificar método POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, error: 'Solo POST' };
    }
    
    // 2. Rate limiting por IP
    const clientIP = event.headers['x-forwarded-for'];
    if (!checkRateLimit(clientIP)) {
        return { statusCode: 429, error: 'Demasiadas reseñas' };
    }
    
    // 3. Parsear y validar datos
    const reviewData = JSON.parse(event.body);
    const errors = validateReviewData(reviewData);
    if (errors.length > 0) {
        return { statusCode: 400, error: 'Datos inválidos' };
    }
```

#### 4.2 **Sanitización y Detección de Spam**
```javascript
    // 4. Sanitizar (prevenir XSS)
    const sanitizedData = {
        nombre: sanitizeText(reviewData.nombre),
        texto: sanitizeText(reviewData.texto),
        rating: reviewData.rating,
        productoId: reviewData.productoId || null,
        createdAt: Timestamp.now(),
        published: true,  // ← ACTUALMENTE: SIEMPRE true
        verified: false,
        clientIP: clientIP,
        userAgent: event.headers['user-agent']
    };
    
    // 5. Detección de spam
    if (detectSpam(sanitizedData.texto, sanitizedData.nombre)) {
        sanitizedData.flagged = true;
        sanitizedData.flagReason = 'Posible spam';
    }
```

#### 4.3 **Guardar en Firestore**
```javascript
    // 6. Inicializar Firebase
    const db = initFirebase();
    
    // 7. Guardar en colección 'reviews'
    const docRef = await db.collection('reviews').add(sanitizedData);
    
    console.log(`Reseña guardada: ${docRef.id}, published: ${sanitizedData.published}`);
```

#### 4.4 **Respuesta al Frontend**
```javascript
    // 8. Responder con ID y estado de publicación
    return {
        statusCode: 200,
        body: JSON.stringify({
            ok: true,
            id: docRef.id,
            published: sanitizedData.published,  // ← Indica si se publicó
            message: sanitizedData.published 
                ? 'Reseña publicada exitosamente'
                : 'Reseña en espera de moderación'
        })
    };
}
```

---

### **FASE 5: Actualización de UI según Respuesta**

**Archivo:** `script.js` línea 5136

```javascript
if (response.ok) {
    // 1. Determinar estado según respuesta
    const status = response.published ? 'published' : 'moderation';
    
    // 2. Actualizar estado visual de la reseña
    this.updateReviewStatus(resenaData.timestamp, status, response.id);
    
    // 3. Mensaje personalizado
    const mensaje = response.published 
        ? '✅ ¡Gracias! Se ha publicado correctamente.' 
        : '⏳ ¡Gracias! Se publicará después de la revisión.';
    
    this.showSuccess(mensaje);
    this.resetForm();
}
```

**Estados posibles:**
- `pending`: Enviando...
- `offline`: Sin conexión (se enviará después)
- `published`: ✅ Publicado
- `moderation`: ⏳ En revisión

---

### **FASE 6: Visualización en Catálogo**

#### 6.1 **Carga Inicial de Reseñas** (línea 4808)
```javascript
async loadReviews() {
    // 1. Llamar a función GET
    const response = await this.obtenerResenasPublicas();
    
    // 2. Guardar en array local
    if (response.ok && response.reviews) {
        this.resenas = response.reviews;
        this.renderReviews();
        this.updateStatistics();
    }
}
```

#### 6.2 **Request a getReviews** (línea 5438)
```javascript
async obtenerResenasPublicas() {
    const response = await fetch('/.netlify/functions/getReviews?stats=true&limit=50');
    const data = await response.json();
    
    return {
        ok: true,
        reviews: data.reviews || [],
        total: data.total
    };
}
```

#### 6.3 **Backend - getReviews.js**
```javascript
exports.handler = async (event, context) => {
    const db = initFirebase();
    
    // ⚠️ FILTRO CRÍTICO: Solo reseñas publicadas
    const snapshot = await db.collection('reviews')
        .where('published', '==', true)  // ← SOLO PUBLICADAS
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
    
    const reviews = [];
    snapshot.forEach(doc => {
        reviews.push({
            id: doc.id,
            nombre: doc.data().nombre,
            texto: doc.data().texto,
            rating: doc.data().rating,
            createdAt: doc.data().createdAt,
            // NO expone IP, userAgent, etc.
        });
    });
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            ok: true,
            reviews: reviews,
            total: reviews.length
        })
    };
}
```

#### 6.4 **Renderizado en Carrusel** (línea 4825)
```javascript
renderReviews() {
    this.elementos.track.innerHTML = '';
    
    if (this.resenas.length === 0) {
        this.showPlaceholder();  // "Sé el primero en dejar una reseña"
        return;
    }
    
    // Crear una tarjeta por cada reseña
    this.resenas.forEach((resena, index) => {
        const card = this.createReviewCard(resena, index);
        this.elementos.track.appendChild(card);
    });
}
```

---

## 🔴 PROBLEMA ACTUAL

### **Por qué las reseñas desaparecen al refrescar:**

```
1. Usuario escribe reseña con 5⭐ + "Son ricos y suaves" (19 chars)
   ↓
2. Optimistic UI → Aparece inmediatamente ✅
   ↓
3. Backend recibe reseña
   ↓
4. ❌ ANTES: published: false (por auto-aprobación restrictiva)
   ✅ AHORA: published: true (sin moderación)
   ↓
5. Firestore guarda con published: true/false
   ↓
6. Usuario refresca página
   ↓
7. getReviews consulta: WHERE published == true
   ↓
8. ❌ Si published: false → NO se devuelve → Desaparece
   ✅ Si published: true → Se devuelve → Aparece
```

---

## ✅ SOLUCIÓN APLICADA

### **Cambio 1: Auto-publicar TODAS las reseñas**

**Archivo:** `netlify/functions/reviews.js` línea 237

```javascript
// ANTES:
published: false,  // Requiere moderación manual

// AHORA:
published: true,   // ✅ Publicación automática
```

**Resultado:**
- Todas las reseñas nuevas → `published: true`
- Aparecen inmediatamente en el catálogo
- Persisten después de refrescar

### **Cambio 2: Migrar reseñas antiguas**

**Archivo nuevo:** `netlify/functions/migrar-resenas.js`

```javascript
// Obtener todas las reseñas NO publicadas
const snapshot = await db.collection('reviews')
    .where('published', '==', false)
    .get();

// Actualizar en lote
const batch = db.batch();
snapshot.forEach(doc => {
    batch.update(doc.ref, { published: true });
});
await batch.commit();
```

**Uso:**
```
https://TU-SITIO.netlify.app/.netlify/functions/migrar-resenas?secret=cambiar-esto-123
```

---

## 📊 FLUJO COMPLETO (DESPUÉS DE LA SOLUCIÓN)

```
1. Usuario escribe reseña
   ↓
2. Frontend: Optimistic UI (aparece inmediatamente)
   ↓
3. POST /.netlify/functions/reviews
   ↓
4. Backend: Validación + Sanitización
   ↓
5. Firestore: Guardar con published: true ✅
   ↓
6. Respuesta: { ok: true, id: "abc123", published: true }
   ↓
7. Frontend: Actualiza estado visual a "✅ Publicado"
   ↓
8. Usuario refresca
   ↓
9. GET /.netlify/functions/getReviews
   ↓
10. Consulta: WHERE published == true
    ↓
11. Resultado: Incluye la reseña recién enviada ✅
    ↓
12. Renderiza en carrusel → ✅ APARECE
```

---

## 🔍 VERIFICACIÓN

### **Cómo verificar que una reseña se guardó correctamente:**

#### **1. En Firebase Console:**
```
https://console.firebase.google.com/project/alimento-del-cielo/firestore/data/reviews

Buscar documento reciente, verificar:
✅ published: true
✅ nombre: "Tu nombre"
✅ texto: "Tu comentario"
✅ rating: 5
✅ createdAt: [timestamp reciente]
```

#### **2. En Netlify Functions Logs:**
```
Site settings → Functions → reviews → View logs

Buscar línea:
✅ Reseña auto-publicada: rating=5, textLength=19
```

#### **3. En DevTools Console (Frontend):**
```javascript
// Ver reseñas cargadas
JSON.parse(localStorage.getItem('ultima_lista_resenas'))

// Ver reseñas renderizadas
sistemaResenas.resenas
```

#### **4. Endpoint de API directamente:**
```
https://TU-SITIO.netlify.app/.netlify/functions/getReviews

Respuesta esperada:
{
  "ok": true,
  "reviews": [
    {
      "id": "xyz789",
      "nombre": "Katy LOpez",
      "texto": "Son ricos y suaves",
      "rating": 5,
      "createdAt": "2025-11-24T..."
    }
  ],
  "total": 1
}
```

---

## 🚀 OPTIMIZACIONES ADICIONALES

### **Cache en Frontend**
```javascript
// Guardar última consulta en localStorage
localStorage.setItem('ultima_lista_resenas', JSON.stringify({
    reviews: data.reviews,
    timestamp: Date.now()
}));

// Fallback si falla la consulta
const cache = JSON.parse(localStorage.getItem('ultima_lista_resenas'));
```

### **Cache en Backend (getReviews.js)**
```javascript
let reviewsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Verificar cache antes de consultar Firestore
if (reviewsCache && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    return reviewsCache;
}
```

---

## 📞 DEBUGGING

### **Reseña no aparece después de enviar:**

**1. Verificar respuesta del servidor:**
```javascript
// En DevTools → Network → reviews
// Ver Response:
{
  "ok": true,
  "published": true,  // ← Debe ser true
  "id": "..."
}
```

**2. Verificar en Firestore:**
- Ir a Firebase Console
- Buscar documento por ID
- Verificar campo `published: true`

**3. Verificar consulta GET:**
```javascript
// En DevTools → Network → getReviews
// Ver Response:
{
  "reviews": [...],  // ← Debe incluir tu reseña
  "total": 5
}
```

**4. Hard refresh del navegador:**
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

---

## 🎯 CHECKLIST DE FUNCIONAMIENTO CORRECTO

- [ ] Formulario de reseñas visible en `index.html#reseñas`
- [ ] Al enviar, aparece mensaje "✅ Publicado"
- [ ] Reseña aparece en el carrusel inmediatamente
- [ ] Al refrescar (F5), la reseña sigue visible
- [ ] En Firestore, `published: true`
- [ ] En `/getReviews`, aparece en la lista
- [ ] Badge muestra "✅ Publicado" (no "⏳ En revisión")

---

## 📚 ARCHIVOS INVOLUCRADOS

| Archivo | Rol | Cambios Necesarios |
|---------|-----|-------------------|
| `index.html` | Formulario HTML | ✅ Ya existe |
| `script.js` | Lógica frontend | ✅ Ya funciona |
| `netlify/functions/reviews.js` | POST crear reseña | ✅ Modificado (published: true) |
| `netlify/functions/getReviews.js` | GET listar reseñas | ✅ Ya funciona |
| `netlify/functions/migrar-resenas.js` | Migración una vez | ✅ Creado |

---

## 🔐 SEGURIDAD

**Protecciones activas:**
- ✅ Rate limiting (3 reseñas/minuto por IP)
- ✅ Sanitización HTML (previene XSS)
- ✅ Validación de longitud (10-500 chars)
- ✅ Validación de rating (1-5)
- ✅ Detección básica de spam
- ✅ IP y userAgent registrados (no públicos)

**Moderación manual (opcional):**
- Ir a Firestore Console
- Cambiar `published: false` en reseñas inapropiadas
- No aparecerán hasta cambiarlas a `true`

---

**Fecha:** 24 de noviembre de 2025  
**Estado:** ✅ Sistema funcionando con auto-publicación  
**Próximo paso:** Desplegar y ejecutar migración de reseñas antiguas
