# PLAN DE PRUEBAS: Sistema de Reseñas

## 🎯 Objetivo
Verificar que las reseñas se publican automáticamente según los nuevos criterios y que el usuario recibe feedback claro sobre el estado de moderación.

---

## ✅ CASOS DE PRUEBA

### **Prueba 1: Rating Alto + Texto Corto (Auto-aprobación)**
**Entrada:**
- Nombre: `Juan Pérez`
- Rating: `⭐⭐⭐⭐⭐` (5 estrellas)
- Texto: `"Excelente"` (9 caracteres)

**Criterios de Auto-aprobación:**
- ✅ NO spam detectado
- ✅ Rating >= 3 (5 >= 3) → **CUMPLE**
- ⚠️ Texto >= 20 (9 < 20) → **NO CUMPLE**
- **Resultado:** `rating >= 3 OR texto >= 20` → **TRUE (porque rating cumple)**

**Resultado Esperado:**
```
✅ published = true
✅ Mensaje: "¡Gracias por tu reseña! Se ha publicado correctamente."
✅ Indicador visual: "✅ Publicado"
✅ Aparece en catálogo inmediatamente
✅ PERSISTE después de refresh
```

**Comando de Verificación en Firestore:**
```javascript
db.collection('reviews')
  .where('nombre', '==', 'Juan Pérez')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('published:', data.published); // Debe ser true
      console.log('rating:', data.rating);        // Debe ser 5
      console.log('texto:', data.texto);          // "Excelente"
    });
  });
```

---

### **Prueba 2: Rating Bajo + Texto Largo (Auto-aprobación)**
**Entrada:**
- Nombre: `María López`
- Rating: `⭐⭐` (2 estrellas)
- Texto: `"La calidad podría mejorar bastante, pero el servicio al cliente fue muy bueno"` (80 caracteres)

**Criterios de Auto-aprobación:**
- ✅ NO spam detectado
- ⚠️ Rating >= 3 (2 < 3) → **NO CUMPLE**
- ✅ Texto >= 20 (80 >= 20) → **CUMPLE**
- **Resultado:** `rating >= 3 OR texto >= 20` → **TRUE (porque texto cumple)**

**Resultado Esperado:**
```
✅ published = true
✅ Mensaje: "¡Gracias por tu reseña! Se ha publicado correctamente."
✅ Indicador visual: "✅ Publicado"
✅ Aparece en catálogo inmediatamente
✅ PERSISTE después de refresh
```

---

### **Prueba 3: Rating Bajo + Texto Corto (Moderación)**
**Entrada:**
- Nombre: `Pedro Gómez`
- Rating: `⭐⭐` (2 estrellas)
- Texto: `"Regular"` (7 caracteres)

**Criterios de Auto-aprobación:**
- ✅ NO spam detectado
- ⚠️ Rating >= 3 (2 < 3) → **NO CUMPLE**
- ⚠️ Texto >= 20 (7 < 20) → **NO CUMPLE**
- **Resultado:** `rating >= 3 OR texto >= 20` → **FALSE**

**Resultado Esperado:**
```
⏳ published = false
⏳ Mensaje: "¡Gracias por tu reseña! Se publicará después de la revisión. Puedes verla arriba mientras esperas."
⏳ Indicador visual: "⏳ En revisión"
⏳ Aparece en vista local CON indicador de revisión
⏳ DESAPARECE después de refresh (comportamiento esperado y explicado)
```

**Comando de Verificación en Firestore:**
```javascript
db.collection('reviews')
  .where('nombre', '==', 'Pedro Gómez')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('published:', data.published); // Debe ser false
      console.log('rating:', data.rating);        // Debe ser 2
      console.log('texto:', data.texto);          // "Regular"
    });
  });
```

---

### **Prueba 4: Rating Alto + Texto Largo (Auto-aprobación Garantizada)**
**Entrada:**
- Nombre: `Ana Martínez`
- Rating: `⭐⭐⭐⭐` (4 estrellas)
- Texto: `"Muy buenos productos, entrega rápida y atención excelente. Lo recomiendo totalmente"` (85 caracteres)

**Criterios de Auto-aprobación:**
- ✅ NO spam detectado
- ✅ Rating >= 3 (4 >= 3) → **CUMPLE**
- ✅ Texto >= 20 (85 >= 20) → **CUMPLE**
- **Resultado:** `rating >= 3 OR texto >= 20` → **TRUE (ambos cumplen)**

**Resultado Esperado:**
```
✅ published = true
✅ Mensaje: "¡Gracias por tu reseña! Se ha publicado correctamente."
✅ Indicador visual: "✅ Publicado"
✅ Aparece en catálogo inmediatamente
✅ PERSISTE después de refresh
```

---

### **Prueba 5: Spam Detectado (Moderación Forzada)**
**Entrada:**
- Nombre: `Spammer Bot`
- Rating: `⭐⭐⭐⭐⭐` (5 estrellas)
- Texto: `"Visita http://casino-online.com para ganar dinero fácil. Click aquí"` (72 caracteres)

**Criterios de Auto-aprobación:**
- ❌ Spam detectado (contiene "http://", "casino", "click")
- ✅ Rating >= 3 (5 >= 3) → **CUMPLE**
- ✅ Texto >= 20 (72 >= 20) → **CUMPLE**
- **Resultado:** `flagged = true` → **AUTO-APROBACIÓN BLOQUEADA**

**Resultado Esperado:**
```
🚫 published = false (spam detectado)
🚫 flagged = true
🚫 flagReason = "Posible spam detectado"
⏳ Mensaje: "¡Gracias por tu reseña! Se publicará después de la revisión..."
⏳ Indicador visual: "⏳ En revisión"
⏳ DESAPARECE después de refresh
⏳ Requiere moderación manual
```

**Comando de Verificación en Firestore:**
```javascript
db.collection('reviews')
  .where('flagged', '==', true)
  .get()
  .then(snapshot => {
    console.log(`${snapshot.size} reseñas marcadas como spam`);
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('- Nombre:', data.nombre);
      console.log('  Texto:', data.texto.substring(0, 50) + '...');
      console.log('  Razón:', data.flagReason);
      console.log('  published:', data.published); // Debe ser false
    });
  });
```

---

### **Prueba 6: Exactamente en el Límite (Texto = 20 caracteres)**
**Entrada:**
- Nombre: `Carlos Ruiz`
- Rating: `⭐⭐` (2 estrellas)
- Texto: `"Servicio aceptable."` (exactamente 20 caracteres)

**Criterios de Auto-aprobación:**
- ✅ NO spam detectado
- ⚠️ Rating >= 3 (2 < 3) → **NO CUMPLE**
- ✅ Texto >= 20 (20 >= 20) → **CUMPLE** (límite inclusivo)
- **Resultado:** `rating >= 3 OR texto >= 20` → **TRUE**

**Resultado Esperado:**
```
✅ published = true (por texto en el límite)
✅ Mensaje: "¡Gracias por tu reseña! Se ha publicado correctamente."
✅ PERSISTE después de refresh
```

---

### **Prueba 7: Rating Mínimo para Auto-aprobación (3 estrellas)**
**Entrada:**
- Nombre: `Luis Torres`
- Rating: `⭐⭐⭐` (3 estrellas)
- Texto: `"Bien"` (4 caracteres)

**Criterios de Auto-aprobación:**
- ✅ NO spam detectado
- ✅ Rating >= 3 (3 >= 3) → **CUMPLE** (límite inclusivo)
- ⚠️ Texto >= 20 (4 < 20) → **NO CUMPLE**
- **Resultado:** `rating >= 3 OR texto >= 20` → **TRUE**

**Resultado Esperado:**
```
✅ published = true (por rating = 3)
✅ Mensaje: "¡Gracias por tu reseña! Se ha publicado correctamente."
✅ PERSISTE después de refresh
```

---

## 🧪 PROCEDIMIENTO DE PRUEBA

### **Setup Inicial**
```bash
# 1. Asegurar que los cambios están desplegados
git status

# 2. Verificar que Netlify Functions están actualizadas
# Ir a: https://app.netlify.com/sites/[TU_SITIO]/deploys
# Verificar última implementación incluye reviews.js modificado

# 3. Limpiar caché del navegador
# Chrome: Ctrl+Shift+Delete → Borrar caché de imágenes y archivos

# 4. Limpiar localStorage/IndexedDB
# DevTools → Application → Storage → Clear site data
```

### **Ejecución de Pruebas**
Para cada prueba:

1. **Abrir DevTools** → Console
2. **Ir a la sección de reseñas** en la PWA
3. **Llenar formulario** con los datos de prueba
4. **Enviar reseña**
5. **Verificar respuesta en Console:**
   ```javascript
   // Buscar log del tipo:
   // Review response: {ok: true, id: "xyz", published: true/false, message: "..."}
   ```
6. **Verificar UI:**
   - Mensaje de éxito/revisión
   - Indicador de estado (✅ Publicado / ⏳ En revisión)
   - Reseña aparece en carrusel
7. **Refrescar página (F5)**
8. **Verificar persistencia:**
   - Reseñas con `published: true` → DEBEN aparecer
   - Reseñas con `published: false` → DEBEN desaparecer (esperado)

### **Verificación en Firestore**
```javascript
// Abrir Firebase Console
// https://console.firebase.google.com/

// Ir a Firestore Database → reviews collection

// Ejecutar queries para verificar:

// 1. Todas las reseñas recién creadas
db.collection('reviews')
  .orderBy('createdAt', 'desc')
  .limit(10)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('---');
      console.log('Nombre:', data.nombre);
      console.log('Rating:', '⭐'.repeat(data.rating));
      console.log('Texto:', data.texto);
      console.log('Published:', data.published);
      console.log('Flagged:', data.flagged || false);
    });
  });

// 2. Solo reseñas publicadas (las que aparecen en catálogo)
db.collection('reviews')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(50)
  .get()
  .then(snapshot => {
    console.log(`Reseñas publicadas: ${snapshot.size}`);
  });

// 3. Solo reseñas en moderación
db.collection('reviews')
  .where('published', '==', false)
  .orderBy('createdAt', 'desc')
  .get()
  .then(snapshot => {
    console.log(`Reseñas en moderación: ${snapshot.size}`);
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`- ${data.nombre}: ${data.rating}⭐ "${data.texto.substring(0, 30)}..."`);
    });
  });
```

---

## 📊 MATRIZ DE RESULTADOS

| # | Nombre | Rating | Texto (chars) | Published Esperado | ✅/❌ |
|---|--------|--------|---------------|-------------------|-------|
| 1 | Juan Pérez | 5 | 9 | ✅ true | |
| 2 | María López | 2 | 80 | ✅ true | |
| 3 | Pedro Gómez | 2 | 7 | ❌ false | |
| 4 | Ana Martínez | 4 | 85 | ✅ true | |
| 5 | Spammer Bot | 5 | 72 | ❌ false (spam) | |
| 6 | Carlos Ruiz | 2 | 20 | ✅ true | |
| 7 | Luis Torres | 3 | 4 | ✅ true | |

**Criterio de éxito:** 
- Pruebas 1, 2, 4, 6, 7 → `published = true` + persisten después de refresh
- Pruebas 3, 5 → `published = false` + desaparecen después de refresh con mensaje claro

---

## 🚨 PROBLEMAS CONOCIDOS Y SOLUCIONES

### Problema 1: Reseña no aparece después de enviar
**Síntoma:** Mensaje de éxito pero reseña no visible
**Causa:** Error en `renderReviews()` o caché CDN
**Solución:**
```javascript
// DevTools Console:
localStorage.removeItem('ultima_lista_resenas');
location.reload();
```

### Problema 2: Estado "En revisión" no se muestra
**Síntoma:** Todas las reseñas muestran "✅ Publicado"
**Causa:** Backend no está devolviendo campo `published` en respuesta
**Solución:** Verificar `netlify/functions/reviews.js` línea ~278:
```javascript
body: JSON.stringify({
    ok: true,
    id: docRef.id,
    published: sanitizedData.published, // ← Este campo debe existir
    message: ...
})
```

### Problema 3: Todas las reseñas van a moderación
**Síntoma:** Ninguna reseña se auto-aprueba
**Causa:** Lógica de auto-aprobación no actualizada (usando AND en lugar de OR)
**Solución:** Verificar `netlify/functions/reviews.js` línea ~254:
```javascript
// DEBE ser OR (||), NO AND (&&)
const autoApprove = !sanitizedData.flagged && 
                  (sanitizedData.rating >= 3 || sanitizedData.texto.length >= 20);
```

### Problema 4: Reseñas duplicadas en vista
**Síntoma:** Misma reseña aparece 2+ veces
**Causa:** `addOptimisticReview()` + respuesta del servidor
**Solución:** Verificar que `updateReviewStatus()` reemplaza ID temporal:
```javascript
// script.js línea ~5167
if (serverId) {
    this.resenas[index].id = serverId;  // Reemplazar temp_xxx con ID real
    delete this.resenas[index].timestamp;
}
```

---

## 📈 MÉTRICAS ESPERADAS

Después de implementar la solución:

- **Tasa de Auto-aprobación:** >= 85%
  - Cálculo: `(published = true) / (total reseñas) * 100`
  
- **Tasa de Moderación:** <= 15%
  - Cálculo: `(published = false) / (total reseñas) * 100`
  
- **Tasa de Spam:** <= 2%
  - Cálculo: `(flagged = true) / (total reseñas) * 100`
  
- **Persistencia:** 100%
  - Todas las reseñas con `published = true` deben aparecer después de refresh

---

## ✅ CHECKLIST FINAL

Antes de dar por completadas las pruebas, verificar:

- [ ] 7 pruebas ejecutadas con resultados esperados
- [ ] Logs de Netlify Functions revisados (sin errores)
- [ ] Firestore muestra datos correctos (`published`, `flagged`)
- [ ] UI muestra mensajes apropiados ("Publicado" vs "En revisión")
- [ ] Reseñas publicadas persisten después de múltiples refreshes
- [ ] Reseñas en moderación desaparecen al refrescar (comportamiento esperado)
- [ ] No hay duplicados en vista
- [ ] Analytics registra campo `auto_published`
- [ ] Detección de spam funciona correctamente

---

**Fecha de Última Actualización:** {{FECHA}}
**Versión del Plan:** 1.0
**Estado:** ✅ Listo para ejecutar
