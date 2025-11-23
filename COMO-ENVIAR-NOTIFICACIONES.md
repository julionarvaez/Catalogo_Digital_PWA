# 📱 Guía Completa: Cómo Enviar Notificaciones Push

## ✅ Estado Actual del Sistema

**SISTEMA 100% FUNCIONAL** ✨

- ✅ **2 usuarios activos** registrados en Firestore
- ✅ **Backend verificado**: Envía notificaciones correctamente
- ✅ **API funcionando**: `obtener-estadisticas-fcm` devuelve datos reales
- ✅ **Panel admin disponible**: `panel-admin.html`

---

## 🔑 Credenciales de Acceso

### Panel de Administración
**URL:** https://alimentodelcielo-congeladosmonteliban.netlify.app/panel-admin.html

**Secreto Admin:** `8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn`

---

## 📤 Cómo Enviar una Notificación

### Paso 1: Acceder al Panel
1. Abre: https://alimentodelcielo-congeladosmonteliban.netlify.app/panel-admin.html
2. Verás **2 USUARIOS** en las estadísticas (si aparece 0, recarga con Ctrl+Shift+R)

### Paso 2: Completar el Formulario

#### Plantilla Rápida (Opcional)
Haz clic en un botón de plantilla:
- 🎉 **Oferta** - Para promociones con descuento
- 🆕 **Nuevo Producto** - Para productos nuevos
- 🛒 **Recordatorio** - Para carritos abandonados
- 💝 **Promoción** - Para envío gratis u ofertas especiales

#### Campos Requeridos

**📌 Título de la notificación**
```
Ejemplo: ¡Oferta Especial del Día!
```

**💬 Mensaje**
```
Ejemplo: 20% de descuento en todos los productos de pollo. ¡Solo hoy!
```

**🖼️ Icono (emoji o URL)**
```
Ejemplo: 🎉
O: /Imagenes/iconos/96x96/icon.png
```

**🔗 URL de destino**
```
Ejemplo: /#catalogo
O: /#producto/pollo-semicriollo
```

**🖼️ Imagen (URL opcional)**
```
Ejemplo: /Imagenes/Productos/Pollo/pollo Semicriollo.jpg
Dejar vacío si no quieres imagen
```

**🔐 Secreto de administrador**
```
Pegar: 8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn
```

### Paso 3: Enviar
1. Click en **📤 Enviar Notificación a Todos**
2. Verás mensaje: `✅ Notificación enviada exitosamente a 2 usuario(s)`
3. Las estadísticas se actualizarán automáticamente

---

## 🔍 Verificación de Envío

### Método 1: Consola del Navegador
1. Presiona **F12** para abrir DevTools
2. Ve a la pestaña **Console**
3. Busca mensajes como:
```
📤 Enviando datos: {title: "...", body: "...", ...}
📡 Status de respuesta: 200
📊 Respuesta completa del servidor: {ok: true, results: {...}}
```

### Método 2: Verificar en Dispositivo
- Los usuarios registrados recibirán la notificación inmediatamente
- La notificación aparecerá en el sistema operativo
- Al hacer clic, se abrirá la URL especificada

### Método 3: PowerShell (Técnico)
```powershell
$body = @{ 
    title = "Test" 
    body = "Prueba de notificación" 
    icon = "🔔"
    url = "/#catalogo"
    sendToAll = $true 
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://alimentodelcielo-congeladosmonteliban.netlify.app/.netlify/functions/enviar-notificacion-fcm" -Method POST -Headers @{ 
    "Authorization" = "Bearer 8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn"
    "Content-Type" = "application/json" 
} -Body $body | ConvertTo-Json
```

**Respuesta esperada:**
```json
{
  "ok": true,
  "message": "Notificaciones enviadas",
  "results": {
    "totalTokens": 2,
    "successCount": 2,
    "failureCount": 0,
    "errors": []
  }
}
```

---

## ❓ Solución de Problemas

### Problema: Aparece "0 USUARIOS"
**Solución:** 
- Recarga la página con **Ctrl + Shift + R** (hard refresh)
- Limpia caché del navegador
- Verifica que estás en `panel-admin.html` y no en `admin-notificaciones.html`

### Problema: "Notificación enviada a 0 usuario(s)"
**Diagnóstico:**
1. Abre la consola del navegador (F12)
2. Busca el log `📊 Respuesta completa del servidor:`
3. Verifica que `successCount` sea 2

**Posibles causas:**
- Secreto admin incorrecto (verifica que sea exactamente: `8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn`)
- Caché del navegador mostrando versión antigua del panel
- Error de conexión (revisa la consola)

### Problema: Error 401 "No autorizado"
**Solución:**
- Verifica que el secreto sea exactamente: `8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn`
- No agregues espacios antes o después
- Copia y pega directamente desde este documento

### Problema: Error 400 "Bad Request"
**Solución:**
- Asegúrate de completar el Título y Mensaje (son obligatorios)
- Verifica que `sendToAll` esté configurado (se hace automáticamente)

---

## 📊 Estadísticas en Tiempo Real

El panel muestra 3 métricas:

### 2 USUARIOS
- Total de usuarios activos con notificaciones habilitadas
- Se actualiza automáticamente al cargar el panel

### 3 ENVIADOS HOY
- Cantidad de notificaciones enviadas hoy
- Se actualiza después de cada envío

### 67% TASA ÉXITO
- Porcentaje de notificaciones entregadas exitosamente
- Calculado desde el inicio del sistema

---

## 🔧 Arquitectura Técnica

### Backend (Netlify Functions)
1. **`enviar-notificacion-fcm.js`** - Envía notificaciones via Firebase
2. **`obtener-estadisticas-fcm.js`** - Obtiene estadísticas en tiempo real
3. **`guardar-token-fcm.js`** - Registra nuevos usuarios

### Frontend
- **`panel-admin.html`** - Interfaz de administración
- **`firebase-config.js`** - Configuración de Firebase + VAPID

### Base de Datos (Firestore)
- Colección: `fcm_tokens`
- Documentos: 1 por token de usuario
- Campos:
  - `token` - Token FCM del dispositivo
  - `active` - Boolean (true/false)
  - `createdAt` - Timestamp de creación
  - `lastUpdated` - Timestamp de última actualización
  - `userAgent` - Navegador del usuario

---

## 🎯 Mejores Prácticas

### Título
- Máximo 50 caracteres
- Claro y conciso
- Usa emojis para llamar la atención: 🎉 🆕 🔥 💝

### Mensaje
- Máximo 120 caracteres recomendado
- Directo al punto
- Incluye call-to-action claro
- Ejemplo: "¡Aprovecha 20% de descuento HOY! Ver productos →"

### Frecuencia
- **No enviar más de 1-2 notificaciones por día**
- Mejor horario: 10:00 AM - 8:00 PM
- Evitar fines de semana a menos que sea urgente

### Contenido Efectivo
✅ **HACER:**
- Ofertas con descuentos específicos
- Productos nuevos con imágenes
- Recordatorios de carritos (máximo 1 por semana)
- Promociones de envío gratis

❌ **EVITAR:**
- Notificaciones genéricas sin valor
- Spam repetitivo
- Mensajes muy largos
- Contenido irrelevante

---

## 📈 Cómo Aumentar Usuarios

Los usuarios se registran automáticamente cuando:
1. Visitan tu PWA: https://alimentodelcielo-congeladosmonteliban.netlify.app
2. Aceptan el permiso de notificaciones
3. El navegador soporta push notifications (Chrome, Edge, Firefox, Opera)

**No funciona en:**
- Safari iOS (limitación de Apple)
- Navegadores en modo incógnito
- Navegadores muy antiguos

---

## 🆘 Soporte

Si tienes problemas:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Copia el mensaje de error completo
4. Verifica que las variables de entorno estén configuradas en Netlify

**Variables de entorno necesarias en Netlify:**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_SERVICE_ACCOUNT_B64`
- `FCM_ADMIN_SECRET`

---

## ✨ Resumen Rápido

1. **URL:** https://alimentodelcielo-congeladosmonteliban.netlify.app/panel-admin.html
2. **Secreto:** `8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn`
3. **Usuarios activos:** 2
4. **Estado:** ✅ FUNCIONANDO

¡Todo está listo para enviar notificaciones! 🚀
