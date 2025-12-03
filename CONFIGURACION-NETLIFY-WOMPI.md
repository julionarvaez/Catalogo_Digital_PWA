# 🚀 Guía de Configuración: Netlify + Wompi + Firebase

## ✅ Soluciones Implementadas

### 1. **Error: RangeError - Invalid time value** ✅ RESUELTO

**Problema:** Las fechas de Firebase Timestamp no se convertían correctamente, generando `Invalid Date`.

**Solución Implementada:**
- ✅ Función `convertirFechaSegura()` que maneja múltiples formatos de fecha
- ✅ Validación de timestamps vacíos, null o inválidos
- ✅ Fallback automático a fecha actual cuando falla la conversión
- ✅ Funciones auxiliares `formatearFecha()` y `formatearFechaISO()`
- ✅ Sistema robusto que **nunca** rompe la UI por fechas inválidas

**Archivos Modificados:**
- `script.js` - Líneas 4524-4616 (nuevas funciones)
- `script.js` - createReviewCard() actualizado
- `script.js` - updateSchema() actualizado

---

### 2. **Error 500: Servidor sin integrity secret configurado** ✅ RESUELTO

**Problema:** La función serverless fallaba porque no validaba la existencia de `WOMPI_INTEGRITY_SECRET`.

**Solución Implementada:**
- ✅ Validación exhaustiva de todas las variables de entorno
- ✅ Mensajes de error descriptivos con instrucciones
- ✅ Verificación antes de procesar cualquier pago
- ✅ Generación segura de firma de integridad con SHA256
- ✅ Logs detallados para debugging

**Archivos Modificados:**
- `netlify/functions/crear-transaccion-wompi.js` - Refactorizado completamente
- `netlify/functions/verificar-pago-wompi.js` - Mejorado con validaciones

---

## 🔐 Configuración de Variables de Entorno en Netlify

### Paso 1: Acceder a la Configuración

1. Ve a tu dashboard de Netlify: https://app.netlify.com
2. Selecciona tu sitio: **Catalogo_Digital_PWA**
3. Ve a **Site Settings** (Configuración del sitio)
4. En el menú lateral, selecciona **Environment Variables** (Variables de entorno)

### Paso 2: Agregar Variables Requeridas

Haz clic en **Add a variable** y agrega las siguientes:

#### Variables de Wompi (OBLIGATORIAS)

| Variable | Valor de Ejemplo | Descripción |
|----------|------------------|-------------|
| `WOMPI_PUBLIC_KEY` | `pub_test_xxxxxxxxxxxxx` o `pub_prod_xxxxxxxxxxxxx` | Llave pública de Wompi |
| `WOMPI_PRIVATE_KEY` | `prv_test_xxxxxxxxxxxxx` o `prv_prod_xxxxxxxxxxxxx` | Llave privada de Wompi (NUNCA exponerla en frontend) |
| `WOMPI_INTEGRITY_SECRET` | `test_integrity_xxxxxxxxxxxxx` o `prod_integrity_xxxxxxxxxxxxx` | Secret para firmas de integridad (CRÍTICO) |

#### Variables Adicionales

| Variable | Valor de Ejemplo | Descripción |
|----------|------------------|-------------|
| `URL` | `https://alimentodelcielo-congeladosmonteliban.netlify.app` | URL base de tu sitio |
| `NODE_ENV` | `production` | Entorno de ejecución |

### Paso 3: Obtener las Credenciales de Wompi

#### Para Ambiente de Pruebas (Testing)

1. Ve a: https://comercios.wompi.co/
2. Inicia sesión o crea una cuenta
3. Ve a **Configuración** > **Credenciales de prueba**
4. Copia:
   - Llave pública de prueba (`pub_test_...`)
   - Llave privada de prueba (`prv_test_...`)
   - Secret de integridad de prueba (`test_integrity_...`)

#### Para Ambiente de Producción

1. En el panel de Wompi, ve a **Configuración** > **Credenciales de producción**
2. Copia las credenciales de producción:
   - Llave pública de producción (`pub_prod_...`)
   - Llave privada de producción (`prv_prod_...`)
   - Secret de integridad de producción (`prod_integrity_...`)

⚠️ **IMPORTANTE:** Usa las credenciales de prueba primero para validar que todo funcione correctamente.

### Paso 4: Configurar en Netlify

Para cada variable:

1. Haz clic en **Add a variable**
2. En **Key**, escribe el nombre de la variable (ejemplo: `WOMPI_PUBLIC_KEY`)
3. En **Values**, selecciona el scope:
   - ✅ **All deploys** (Todos los despliegues) - Recomendado para producción
   - O selecciona branches específicos para testing
4. Pega el valor correspondiente
5. Haz clic en **Create variable**

**Ejemplo:**
```
Key: WOMPI_PUBLIC_KEY
Scope: All deploys
Value: pub_test_xxxxxxxxxxxxxxxxxxxx
```

### Paso 5: Verificar Configuración

Después de agregar todas las variables:

1. Ve a **Deploys** (Despliegues)
2. Haz clic en **Trigger deploy** > **Clear cache and deploy site**
3. Espera a que el deploy termine
4. Prueba crear una transacción en tu sitio

---

## 🧪 Probar la Configuración

### Test 1: Verificar Variables de Entorno

Las funciones ahora incluyen validación automática. Si falta alguna variable, verás un error descriptivo:

```json
{
  "error": "Servidor no configurado correctamente",
  "detalles": [
    "WOMPI_INTEGRITY_SECRET no configurada - Requerida para Nequi y otros medios de pago"
  ],
  "ayuda": "Configure las variables de entorno en Netlify: Site Settings > Environment Variables"
}
```

### Test 2: Crear una Transacción de Prueba

1. Abre tu sitio web
2. Agrega productos al carrito
3. Haz clic en **Pagar con Wompi**
4. Deberías ver el widget de Wompi correctamente

### Test 3: Verificar Logs

En Netlify:
1. Ve a **Functions** (Funciones)
2. Selecciona `crear-transaccion-wompi`
3. Ve los logs para verificar que todo funciona:

```
✅ Transacción creada exitosamente: { referencia: 'REF-123', monto: 14990, ... }
```

---

## 🔒 Seguridad - Mejores Prácticas Implementadas

### ✅ Variables de Entorno
- ✅ **NUNCA** exponer llaves privadas o secrets en el frontend
- ✅ Todas las credenciales están en variables de entorno serverless
- ✅ Las funciones validan la existencia de variables antes de ejecutarse

### ✅ Firma de Integridad
- ✅ Todas las transacciones incluyen firma SHA256
- ✅ Formato: `SHA256(referencia + monto + moneda + secret)`
- ✅ Previene manipulación de montos en el frontend

### ✅ Validación de Datos
- ✅ Validación exhaustiva de todos los parámetros de entrada
- ✅ Sanitización de datos del usuario
- ✅ Mensajes de error descriptivos sin exponer información sensible

### ✅ CORS Configurado
- ✅ Headers CORS apropiados en todas las funciones
- ✅ Manejo de preflight OPTIONS
- ✅ Control de métodos HTTP permitidos

---

## 🐛 Solución de Problemas

### Error: "Servidor sin integrity secret configurado"

**Causa:** Variable `WOMPI_INTEGRITY_SECRET` no configurada.

**Solución:**
1. Ve a Netlify > Site Settings > Environment Variables
2. Agrega la variable `WOMPI_INTEGRITY_SECRET`
3. Obtén el valor desde el panel de Wompi
4. Trigger deploy

### Error: "Invalid time value" en reseñas

**Causa:** Reseñas con fechas inválidas en Firebase.

**Solución:** ✅ YA RESUELTO - El sistema ahora maneja automáticamente fechas inválidas usando fallback a fecha actual.

### Error: "Transacción no encontrada"

**Causa:** ID de transacción inválido o transacción no existe en Wompi.

**Solución:**
- Verifica que el ID sea correcto
- Asegúrate de estar usando las credenciales del ambiente correcto (test/prod)
- Revisa los logs de Netlify Functions

### Error 500 en funciones

**Solución:**
1. Revisa los logs en Netlify > Functions > [nombre-función]
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que las dependencias estén instaladas (`node-fetch`, `crypto`)

---

## 📊 Monitoreo y Logs

### Ver Logs de Funciones

1. Netlify Dashboard > Functions
2. Selecciona la función (crear-transaccion-wompi o verificar-pago-wompi)
3. Ve el historial de ejecuciones y logs

### Logs Implementados

Las funciones ahora incluyen logs detallados:

```javascript
// Logs de éxito
✅ Transacción creada exitosamente: { referencia, monto, email }
✅ Transacción consultada exitosamente: { id, status, reference }

// Logs de error
❌ Error procesando transacción: [mensaje]
❌ Errores de configuración: [lista de errores]

// Logs informativos
🔐 Firma generada para: { referencia, monto, moneda }
🔍 Verificando transacción: [id]
```

---

## 🎯 Checklist de Configuración Final

Antes de ir a producción, verifica:

- [ ] Todas las variables de entorno configuradas en Netlify
- [ ] Probado con credenciales de prueba de Wompi
- [ ] Widget de Wompi abre correctamente
- [ ] Firma de integridad se genera sin errores
- [ ] Logs muestran transacciones exitosas
- [ ] Sistema de reseñas funciona sin errores de fecha
- [ ] No hay errores 500 en Functions
- [ ] CORS funciona correctamente
- [ ] Credenciales de producción listas (cuando vayas a producción)

---

## 📞 Soporte

### Documentación Wompi
- Docs: https://docs.wompi.co/
- Dashboard: https://comercios.wompi.co/

### Documentación Netlify
- Functions: https://docs.netlify.com/functions/overview/
- Environment Variables: https://docs.netlify.com/environment-variables/overview/

### Firebase
- Console: https://console.firebase.google.com/
- Firestore: Timestamps documentation

---

## 🎉 Resumen de Mejoras

### Código Corregido ✅
- ✅ Manejo robusto de fechas Firebase con múltiples fallbacks
- ✅ Validación exhaustiva de variables de entorno
- ✅ Firma de integridad segura con SHA256
- ✅ Mensajes de error descriptivos y útiles
- ✅ Logs detallados para debugging
- ✅ Manejo de errores profesional sin exponer información sensible

### Seguridad Reforzada 🔒
- ✅ Variables sensibles solo en backend
- ✅ Validación de todos los inputs
- ✅ Firma criptográfica en todas las transacciones
- ✅ CORS configurado correctamente

### Resiliencia 💪
- ✅ Sistema no se rompe por datos inválidos
- ✅ Fallbacks automáticos para fechas
- ✅ Validaciones antes de procesar pagos
- ✅ Manejo de errores en todas las operaciones

---

**🚀 Tu aplicación está lista para producción con Netlify + Wompi + Firebase**

**Última actualización:** 26 de noviembre de 2025
