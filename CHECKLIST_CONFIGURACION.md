# ✅ CHECKLIST COMPLETO - CONFIGURACIÓN WOMPI

## 🎯 OBJETIVO
Activar pagos con Wompi en tu catálogo digital de Alimento del Cielo.

---

## 📝 CHECKLIST DE CONFIGURACIÓN

### FASE 1: PREPARACIÓN (5 minutos)

- [ ] **1.1** Crear cuenta en [Wompi](https://wompi.co/)
- [ ] **1.2** Completar verificación de comercio
- [ ] **1.3** Acceder a [Dashboard de Comercios](https://comercios.wompi.co/)
- [ ] **1.4** Navegar a Configuración → API Keys
- [ ] **1.5** Copiar llaves de prueba:
  - [ ] Llave pública de prueba: `pub_test_XXXXX`
  - [ ] Llave privada de prueba: `prv_test_XXXXX`
- [ ] **1.6** Copiar llaves de producción:
  - [ ] Llave pública de producción: `pub_prod_XXXXX`
  - [ ] Llave privada de producción: `prv_prod_XXXXX`

---

### FASE 2: CONFIGURACIÓN NETLIFY (3 minutos)

- [ ] **2.1** Acceder a [Netlify Dashboard](https://app.netlify.com/)
- [ ] **2.2** Seleccionar el sitio "Alimento del Cielo"
- [ ] **2.3** Ir a Site settings → Environment variables
- [ ] **2.4** Agregar variable `WOMPI_PUBLIC_KEY`:
  - [ ] Key: `WOMPI_PUBLIC_KEY`
  - [ ] Value: `pub_prod_XXXXX` (tu llave real)
  - [ ] Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
  - [ ] Click en "Save variable"
- [ ] **2.5** Agregar variable `WOMPI_PRIVATE_KEY`:
  - [ ] Key: `WOMPI_PRIVATE_KEY`
  - [ ] Value: `prv_prod_XXXXX` (tu llave real)
  - [ ] Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
  - [ ] Click en "Save variable"
- [ ] **2.6** Agregar variable `URL`:
  - [ ] Key: `URL`
  - [ ] Value: `https://tu-sitio.netlify.app`
  - [ ] Scope: ✅ Production
  - [ ] Click en "Save variable"
- [ ] **2.7** Verificar que las 3 variables estén listadas

---

### FASE 3: ACTUALIZAR CÓDIGO (2 minutos)

- [ ] **3.1** Abrir archivo `script.js`
- [ ] **3.2** Ir a la línea 2237 (buscar `WOMPI_CONFIG`)
- [ ] **3.3** Cambiar `publicKey` por tu llave pública de producción:
  ```javascript
  publicKey: 'pub_prod_TU_LLAVE_AQUI', // ← Cambiar esto
  ```
- [ ] **3.4** Guardar el archivo
- [ ] **3.5** Hacer commit:
  ```powershell
  git add script.js
  git commit -m "Configurar Wompi con llaves de producción"
  ```

---

### FASE 4: DESPLIEGUE (2 minutos)

- [ ] **4.1** Hacer push a GitHub:
  ```powershell
  git push origin main
  ```
- [ ] **4.2** Esperar despliegue automático en Netlify (1-2 min)
- [ ] **4.3** Ir a Deploys en Netlify Dashboard
- [ ] **4.4** Verificar que el deploy esté "Published"
- [ ] **4.5** Click en el deploy para ver los logs
- [ ] **4.6** Buscar mensajes de éxito (sin errores)

---

### FASE 5: PRUEBAS (5 minutos)

#### Prueba 1: Pago de Prueba

- [ ] **5.1** Visitar tu sitio: `https://tu-sitio.netlify.app`
- [ ] **5.2** Agregar al menos 2 productos al carrito
- [ ] **5.3** Abrir el carrito (icono 🛒)
- [ ] **5.4** Click en "💳 Pagar con Wompi"
- [ ] **5.5** Completar formulario:
  - [ ] Email: tu@email.com
  - [ ] Nombre: Tu Nombre
  - [ ] Teléfono: 3001234567
  - [ ] Dirección: Tu dirección
- [ ] **5.6** Click en "💳 Pagar con Wompi"
- [ ] **5.7** Verificar redirección a checkout de Wompi

#### Prueba 2: Checkout de Wompi

- [ ] **5.8** En el checkout de Wompi, usar tarjeta de prueba:
  - [ ] Número: `4242 4242 4242 4242`
  - [ ] CVV: `123`
  - [ ] Fecha: Cualquier fecha futura (ej: 12/25)
  - [ ] Nombre: Tu nombre
- [ ] **5.9** Click en "Pagar"
- [ ] **5.10** Verificar procesamiento del pago
- [ ] **5.11** Verificar redirección a página de confirmación

#### Prueba 3: Confirmación

- [ ] **5.12** Verificar que aparezca "⏳ Verificando tu pago..."
- [ ] **5.13** Esperar 2-3 segundos
- [ ] **5.14** Verificar que aparezca "✅ ¡Pago Aprobado!"
- [ ] **5.15** Verificar detalles de la transacción:
  - [ ] Referencia
  - [ ] ID Transacción
  - [ ] Estado: APPROVED
  - [ ] Monto correcto
- [ ] **5.16** Verificar que el carrito se haya vaciado

---

### FASE 6: VERIFICACIÓN BACKEND (3 minutos)

- [ ] **6.1** Ir a Netlify Dashboard → Functions
- [ ] **6.2** Revisar logs de `crear-transaccion-wompi`:
  - [ ] Sin errores de "WOMPI_PUBLIC_KEY no configurada"
  - [ ] Status 200
  - [ ] Respuesta con checkout_url
- [ ] **6.3** Revisar logs de `verificar-pago-wompi`:
  - [ ] Sin errores
  - [ ] Status 200
  - [ ] Respuesta con data.status = "APPROVED"
- [ ] **6.4** Ir a Dashboard de Wompi
- [ ] **6.5** Verificar que la transacción aparezca en el historial
- [ ] **6.6** Verificar monto y estado

---

### FASE 7: CONFIGURACIÓN DE PRODUCCIÓN (cuando estés listo)

- [ ] **7.1** Verificar que todas las pruebas funcionen
- [ ] **7.2** Cambiar a llaves de producción en Netlify:
  - [ ] Editar `WOMPI_PUBLIC_KEY` con `pub_prod_XXXXX`
  - [ ] Editar `WOMPI_PRIVATE_KEY` con `prv_prod_XXXXX`
- [ ] **7.3** Actualizar `script.js` con llave pública de producción
- [ ] **7.4** Hacer commit y push
- [ ] **7.5** Esperar redespliegue
- [ ] **7.6** Hacer pago de prueba con tarjeta REAL (monto pequeño)
- [ ] **7.7** Verificar que el pago REAL funcione
- [ ] **7.8** 🎉 ¡Listo para recibir pagos!

---

## 🔥 CHECKLIST DE FIREBASE (OPCIONAL)

Solo si quieres activar el sistema de reseñas:

- [ ] **F.1** Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
- [ ] **F.2** Habilitar Firestore Database
- [ ] **F.3** Configurar reglas de seguridad
- [ ] **F.4** Crear cuenta de servicio
- [ ] **F.5** Descargar JSON de credenciales
- [ ] **F.6** Convertir a Base64
- [ ] **F.7** Agregar `FIREBASE_PROJECT_ID` en Netlify
- [ ] **F.8** Agregar `FIREBASE_SERVICE_ACCOUNT_B64` en Netlify
- [ ] **F.9** Redesplegar
- [ ] **F.10** Probar sistema de reseñas

**Nota**: Firebase NO es necesario para pagos con Wompi.

---

## 📊 RESUMEN DE PROGRESO

### ¿Cuánto has completado?

**FASE 1 - Preparación**: ☐☐☐☐☐☐ (0/6)  
**FASE 2 - Netlify**: ☐☐☐☐☐☐☐ (0/7)  
**FASE 3 - Código**: ☐☐☐☐☐ (0/5)  
**FASE 4 - Despliegue**: ☐☐☐☐☐☐ (0/6)  
**FASE 5 - Pruebas**: ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐ (0/16)  
**FASE 6 - Verificación**: ☐☐☐☐☐☐ (0/6)  
**FASE 7 - Producción**: ☐☐☐☐☐☐☐☐ (0/8)  

**Total**: 0/54 completadas (0%)

---

## 🎯 CRITERIOS DE ÉXITO

### ✅ Configuración Exitosa Cuando:

1. ✅ Variables de entorno configuradas en Netlify
2. ✅ Código actualizado con llaves correctas
3. ✅ Deploy exitoso sin errores
4. ✅ Pago de prueba completado con éxito
5. ✅ Página de confirmación muestra "Pago Aprobado"
6. ✅ Transacción visible en Dashboard de Wompi
7. ✅ Logs de Functions sin errores
8. ✅ Carrito se vacía después de pago exitoso

---

## ⚠️ SEÑALES DE ALERTA

### ❌ Revisa si ves:

- [ ] "WOMPI_PUBLIC_KEY no está configurado"
- [ ] "Error al crear transacción en Wompi"
- [ ] "Transacción no encontrada"
- [ ] "CORS policy error"
- [ ] "Function not found"
- [ ] Botón de pago no aparece
- [ ] Página de confirmación en blanco
- [ ] Estado de pago siempre "PENDING"

**Si ves alguno de estos**: Revisa la documentación de troubleshooting.

---

## 🚀 DESPUÉS DE COMPLETAR TODO

### Próximos pasos recomendados:

1. ✅ Configurar notificaciones de Wompi (webhook)
2. ✅ Agregar métodos de pago adicionales (PSE, Nequi)
3. ✅ Implementar sistema de inventario
4. ✅ Configurar emails de confirmación
5. ✅ Analizar transacciones en Dashboard de Wompi
6. ✅ Optimizar experiencia de checkout

---

## 📞 ¿NECESITAS AYUDA?

### Recursos:

- **Documentación Wompi**: https://docs.wompi.co/
- **Soporte Wompi**: soporte@wompi.co
- **Documentación Netlify**: https://docs.netlify.com/
- **Archivos de ayuda en el proyecto**:
  - `CONFIGURACION_COMPLETA_WOMPI_NETLIFY.md`
  - `GUIA_RAPIDA_WOMPI.md`
  - `ARQUITECTURA_SISTEMA_PAGOS.md`
  - `INSTRUCCIONES_NETLIFY.md`

---

## 🎉 ¡FELICIDADES!

Una vez completado todo el checklist, tendrás:

✅ Sistema de pagos totalmente funcional  
✅ Integración profesional con Wompi  
✅ Backend serverless escalable  
✅ Experiencia de usuario optimizada  
✅ Seguridad implementada correctamente  
✅ ¡Listo para recibir pagos reales!  

---

**Fecha de creación**: 6 de noviembre de 2025  
**Versión**: 1.0  
**Tiempo estimado total**: 20-30 minutos
