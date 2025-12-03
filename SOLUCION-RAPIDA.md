# 🚨 Guía Rápida de Resolución de Problemas

## ⚡ Soluciones Inmediatas

### Error: "RangeError: Invalid time value"

**Síntoma:** Error en consola al cargar reseñas, las reseñas no se muestran.

**Causa:** Fechas inválidas en Firebase.

**Solución:** ✅ **YA RESUELTO** - El sistema ahora maneja automáticamente fechas inválidas.

**Verificación:**
```javascript
// Abrir consola del navegador y verificar que no haya RangeError
// Si aún aparece, asegúrate de que el código esté actualizado
```

---

### Error 500: "Servidor sin integrity secret configurado"

**Síntoma:** Error al intentar crear una transacción con Wompi.

**Causa:** Variable `WOMPI_INTEGRITY_SECRET` no configurada en Netlify.

**Solución Inmediata:**

1. **Ve a Netlify Dashboard**
   - https://app.netlify.com

2. **Selecciona tu sitio**
   - Catalogo_Digital_PWA

3. **Ve a Site Settings > Environment Variables**

4. **Agrega la variable:**
   ```
   Key: WOMPI_INTEGRITY_SECRET
   Value: [obtener de Wompi Dashboard]
   ```

5. **Obtener el valor:**
   - Ve a https://comercios.wompi.co/
   - Configuración > Credenciales de prueba
   - Copia el "Secret de integridad"

6. **Deploy:**
   - Deploys > Trigger deploy > Clear cache and deploy site

**Tiempo estimado:** 5 minutos

---

### Error: "Servidor sin llaves Wompi configuradas"

**Síntoma:** Error 500 al crear transacción.

**Causa:** Variables `WOMPI_PUBLIC_KEY` o `WOMPI_PRIVATE_KEY` faltantes.

**Solución Inmediata:**

1. **Verifica qué variables faltan** en el mensaje de error

2. **Agrega las variables en Netlify:**
   ```
   WOMPI_PUBLIC_KEY=pub_test_xxxxxxxxxxxx
   WOMPI_PRIVATE_KEY=prv_test_xxxxxxxxxxxx
   ```

3. **Obtén los valores:**
   - https://comercios.wompi.co/
   - Configuración > Credenciales de prueba

4. **Redeploy:**
   - Trigger deploy en Netlify

---

### Error: "Datos inválidos"

**Síntoma:** Error 400 al crear transacción.

**Causa:** Datos enviados no cumplen con las validaciones.

**Solución:**

Verifica que el payload incluya:
```javascript
{
  "monto": 14990,           // ✅ Número positivo
  "moneda": "COP",          // ✅ "COP" o "USD"
  "referencia": "ORD-123",  // ✅ String no vacío
  "email": "test@test.com", // ✅ Email válido con @
  "nombre": "Juan Pérez",   // Opcional
  "telefono": "3001234567"  // Opcional
}
```

**Errores comunes:**
- ❌ `monto: "14990"` → ✅ `monto: 14990` (número, no string)
- ❌ `email: "test"` → ✅ `email: "test@test.com"` (debe incluir @)
- ❌ `referencia: ""` → ✅ `referencia: "ORD-123"` (no vacío)

---

### Error: "Transacción no encontrada"

**Síntoma:** Error 404 al verificar pago.

**Causas posibles:**
1. ID de transacción incorrecto
2. Usando credenciales de prueba pero buscando transacción de producción (o viceversa)
3. Transacción realmente no existe

**Solución:**

1. **Verifica el ID:**
   ```javascript
   // El ID viene en la URL después del pago
   // Ejemplo: ?id=12345-67890-ABCDE
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get('id');
   console.log('ID de transacción:', id);
   ```

2. **Verifica el ambiente:**
   - Credenciales de prueba solo funcionan con transacciones de prueba
   - Credenciales de producción solo con transacciones reales

3. **Revisa logs en Netlify:**
   - Functions > verificar-pago-wompi > Logs

---

## 🔍 Diagnóstico Rápido

### Checklist de Diagnóstico (5 minutos)

Ejecuta estos comandos en la consola del navegador:

```javascript
// 1. Verificar que el sistema de reseñas esté inicializado
console.log('Sistema reseñas:', window.sistemaResenas ? '✅' : '❌');

// 2. Verificar que las funciones existan
const sr = new SistemaResenas();
console.log('convertirFechaSegura:', typeof sr.convertirFechaSegura === 'function' ? '✅' : '❌');
console.log('formatearFecha:', typeof sr.formatearFecha === 'function' ? '✅' : '❌');
console.log('formatearFechaISO:', typeof sr.formatearFechaISO === 'function' ? '✅' : '❌');

// 3. Probar conversión de fecha
const fechaPrueba = sr.convertirFechaSegura(null);
console.log('Conversión null:', !isNaN(fechaPrueba.getTime()) ? '✅' : '❌');

// 4. Verificar endpoint de Wompi
fetch('/.netlify/functions/crear-transaccion-wompi', { method: 'OPTIONS' })
  .then(r => console.log('Endpoint Wompi:', r.ok ? '✅' : '❌'))
  .catch(e => console.log('Endpoint Wompi: ❌', e));
```

**Resultado esperado:**
```
Sistema reseñas: ✅
convertirFechaSegura: ✅
formatearFecha: ✅
formatearFechaISO: ✅
Conversión null: ✅
Endpoint Wompi: ✅
```

---

### Verificar Variables de Entorno

**En Netlify Dashboard:**

1. Site Settings > Environment Variables
2. Verificar que existan:
   - ✅ WOMPI_PUBLIC_KEY
   - ✅ WOMPI_PRIVATE_KEY
   - ✅ WOMPI_INTEGRITY_SECRET
   - ✅ URL
   - ✅ NODE_ENV

**En Logs de Functions:**

Los mensajes de error ahora incluyen qué variables faltan:
```json
{
  "error": "Servidor no configurado correctamente",
  "detalles": [
    "WOMPI_INTEGRITY_SECRET no configurada - Requerida para Nequi y otros medios de pago"
  ]
}
```

---

## 🛠️ Herramientas de Debugging

### Ver Logs de Netlify Functions

1. **Netlify Dashboard** > tu sitio
2. **Functions** en el menú
3. Selecciona la función:
   - `crear-transaccion-wompi`
   - `verificar-pago-wompi`
4. Ve el **Log** en tiempo real

### Netlify CLI (Local)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Ejecutar en local
netlify dev

# Ver logs de función específica
netlify functions:log crear-transaccion-wompi

# Invocar función manualmente
netlify functions:invoke crear-transaccion-wompi --payload '{"monto":14990,"referencia":"TEST","email":"test@test.com"}'
```

### Consola del Navegador

```javascript
// Ver todas las reseñas cargadas
console.table(window.sistemaResenas?.resenas);

// Ver detalles de una reseña específica
const resena = window.sistemaResenas?.resenas[0];
console.log('Reseña:', resena);
console.log('Fecha original:', resena?.createdAt);
console.log('Fecha convertida:', window.sistemaResenas?.convertirFechaSegura(resena?.createdAt));

// Probar creación de transacción
fetch('/.netlify/functions/crear-transaccion-wompi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    monto: 14990,
    referencia: 'TEST-' + Date.now(),
    email: 'test@test.com',
    moneda: 'COP'
  })
})
.then(r => r.json())
.then(data => console.log('Respuesta:', data))
.catch(err => console.error('Error:', err));
```

---

## 📊 Matriz de Errores Comunes

| Error | Causa | Solución | Tiempo |
|-------|-------|----------|--------|
| RangeError: Invalid time value | Fechas inválidas | ✅ Ya resuelto automáticamente | 0 min |
| Error 500: integrity secret | Variable faltante | Configurar en Netlify | 5 min |
| Error 500: llaves Wompi | Variables faltantes | Configurar en Netlify | 5 min |
| Error 400: Datos inválidos | Payload incorrecto | Validar formato de datos | 2 min |
| Error 404: Transacción no encontrada | ID incorrecto o ambiente equivocado | Verificar ID y credenciales | 3 min |
| Error 405: Método no permitido | Método HTTP incorrecto | Usar POST/GET según corresponda | 1 min |
| CORS error | Headers incorrectos | ✅ Ya resuelto en funciones | 0 min |

---

## 🚀 Solución Express (Si todo falla)

### Opción 1: Reinstalar desde Cero

```bash
# 1. Hacer backup de archivos personalizados
# 2. Descargar código actualizado
# 3. Configurar variables de entorno
# 4. Deploy
```

### Opción 2: Verificación Manual Paso a Paso

1. **Código actualizado:**
   ```bash
   # Verificar que los archivos estén actualizados
   git status
   git pull origin main
   ```

2. **Variables configuradas:**
   - Netlify > Site Settings > Environment Variables
   - Verificar las 5 variables obligatorias

3. **Deploy limpio:**
   ```bash
   # En Netlify Dashboard
   Deploys > Trigger deploy > Clear cache and deploy site
   ```

4. **Test básico:**
   ```javascript
   // En consola del navegador
   fetch('/.netlify/functions/crear-transaccion-wompi', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       monto: 100,
       referencia: 'TEST',
       email: 'test@test.com',
       moneda: 'COP'
     })
   }).then(r => r.json()).then(console.log)
   ```

5. **Si funciona:**
   ✅ Sistema operativo

6. **Si no funciona:**
   Ver logs en Netlify Functions para el error exacto

---

## 📞 Contacto de Soporte

### Documentación Interna
- **Configuración:** `CONFIGURACION-NETLIFY-WOMPI.md`
- **Ejemplos:** `EJEMPLOS-USO.md`
- **Resumen técnico:** `RESUMEN-CORRECCIONES.md`

### Documentación Externa
- **Wompi Docs:** https://docs.wompi.co/
- **Wompi Dashboard:** https://comercios.wompi.co/
- **Netlify Docs:** https://docs.netlify.com/
- **Firebase Docs:** https://firebase.google.com/docs

### Logs y Monitoreo
- **Netlify Functions Logs:** Dashboard > Functions > [función] > Log
- **Browser Console:** F12 > Console
- **Network Tab:** F12 > Network (ver requests a functions)

---

## ✅ Verificación Final

Antes de contactar soporte, verifica:

- [ ] Variables de entorno configuradas en Netlify
- [ ] Código actualizado (archivos modificados recientemente)
- [ ] Deploy exitoso en Netlify
- [ ] No hay errores en consola del navegador (F12)
- [ ] Logs de Netlify Functions revisados
- [ ] Credenciales de Wompi válidas (test o prod)

---

**🎯 Estado del Sistema:** PRODUCCIÓN READY  
**Última actualización:** 26 de noviembre de 2025  
**Mantenido por:** GitHub Copilot
