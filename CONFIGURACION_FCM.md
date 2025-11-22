# 🔔 Configuración de Firebase Cloud Messaging (FCM)

## 📋 Guía de Configuración Completa

Esta guía te ayudará a configurar Firebase Cloud Messaging para enviar notificaciones push a tu PWA.

---

## 🚀 Paso 1: Configurar Firebase Project

### 1.1 Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Agregar proyecto"
3. Nombre del proyecto: `alimento-del-cielo` (o el que prefieras)
4. Desactiva Google Analytics si no lo necesitas
5. Clic en "Crear proyecto"

### 1.2 Agregar una Aplicación Web

1. En la página de inicio del proyecto, clic en el icono **Web** (</>)
2. Nombre de la app: `Alimento del Cielo PWA`
3. **NO marques** "También configura Firebase Hosting"
4. Clic en "Registrar app"
5. **GUARDA** la configuración que aparece:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkAZEuyiWWK5aO26WSzSuPR4ekVV2fx6Y",
  authDomain: "alimento-del-cielo.firebaseapp.com",
  projectId: "alimento-del-cielo",
  storageBucket: "alimento-del-cielo.firebasestorage.app",
  messagingSenderId: "500358694887",
  appId: "1:500358694887:web:7487dfb975dac084851f42",
  measurementId: "G-NSC2ZFXF41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
---

## 🔑 Paso 2: Obtener Credenciales

### 2.1 Obtener la Clave VAPID

1. En Firebase Console, ve a **Project Settings** (⚙️)
2. Pestaña **Cloud Messaging**
3. En "Web Push certificates", clic en **Generate key pair**
4. **COPIA** la clave pública que aparece es; BJWPYTYUys0da2uena9ElENpgl1NDSlAe_bvYA204AXMaFqBTlTVsT0nKpthzTNwRL7erriKqVb-Zs021gpx9hs

### 2.2 Crear Service Account

1. En Firebase Console, ve a **Project Settings** (⚙️)
2. Pestaña **Service accounts**
3. Clic en **Generate new private key**
4. Confirma y descarga el archivo JSON
5. **IMPORTANTE**: Guarda este archivo en un lugar seguro

### 2.3 Convertir Service Account a Base64

Abre PowerShell y ejecuta:

```powershell
$jsonPath = "ruta\al\archivo-service-account.json"
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$base64 | Set-Clipboard
Write-Host "✅ Base64 copiado al portapapeles"
```

---

## 📝 Paso 3: Actualizar Archivos de Configuración

### 3.1 Actualizar `firebase-config.js`

Abre el archivo `firebase-config.js` y reemplaza:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",              // ← Reemplaza con tu apiKey
    authDomain: "TU_PROJECT_ID.firebaseapp.com",  // ← Tu authDomain
    projectId: "TU_PROJECT_ID",         // ← Tu projectId
    storageBucket: "TU_PROJECT_ID.appspot.com",   // ← Tu storageBucket
    messagingSenderId: "TU_SENDER_ID",  // ← Tu messagingSenderId
    appId: "TU_APP_ID"                  // ← Tu appId
};
```

Y más abajo, reemplaza la clave VAPID:

```javascript
const token = await messaging.getToken({
    vapidKey: 'TU_VAPID_KEY_PUBLICA' // ← Pega tu clave VAPID aquí
});
```

### 3.2 Actualizar `firebase-messaging-sw.js`

Abre `firebase-messaging-sw.js` y reemplaza la configuración al inicio:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSendId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### 3.3 Actualizar `sw.js`

Abre `sw.js` y encuentra la sección de configuración de Firebase (líneas 11-19):

```javascript
const FIREBASE_CONFIG = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};
```

---

## 🌐 Paso 4: Configurar Variables de Entorno en Netlify

### 4.1 Ir a Configuración de Netlify

1. Ve a tu sitio en [Netlify](https://app.netlify.com/)
2. Ve a **Site settings** > **Environment variables**

### 4.2 Agregar Variables

Agrega las siguientes variables:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_B64` | (Base64 del JSON) | Service Account en Base64 |
| `FIREBASE_PROJECT_ID` | `tu-proyecto` | ID del proyecto Firebase |
| `FCM_ADMIN_SECRET` | `tu-secreto-seguro` | Secreto para autenticar envíos |

Para generar un secreto seguro en PowerShell:

```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```
8pfgBA0bhYs9dHUuNqtLOFwkaQ42XeDICiRycK3MJGEjzvrn

### 4.3 Guardar y Redesplegar

1. Clic en **Save**
2. Ve a **Deploys** > **Trigger deploy** > **Deploy site**

---

## ✅ Paso 5: Verificar la Configuración

### 5.1 Probar en Local

1. Abre tu sitio en el navegador
2. Abre la consola de desarrollador (F12)
3. Clic en el botón "🔔 Ofertas" en el banner
4. Acepta los permisos de notificación
5. Deberías ver en consola:
   ```
   ✅ Firebase App inicializada
   ✅ Firebase Messaging inicializado
   ✅ Token FCM obtenido: ...
   ✅ Token guardado en servidor
   ```

### 5.2 Verificar Token en Firestore

1. Ve a Firebase Console > **Firestore Database**
2. Deberías ver una colección `fcm_tokens`
3. Con documentos que contienen los tokens de usuarios

---

## 📤 Paso 6: Enviar Notificaciones de Prueba

### 6.1 Usar la Función de Netlify

Crea un archivo `test-notificacion.http` o usa Postman:

```http
POST https://tu-sitio.netlify.app/.netlify/functions/enviar-notificacion-fcm
Content-Type: application/json
Authorization: Bearer tu-secreto-admin

{
  "title": "🎉 ¡Oferta Especial!",
  "body": "20% de descuento en todos los productos de pollo",
  "icon": "/Imagenes/logo/Logo.png",
  "image": "/Imagenes/Productos/Pollo/pollo Semicriollo.jpg",
  "url": "/#catalogo",
  "sendToAll": true
}
```

O desde PowerShell:

```powershell
$body = @{
    title = "🎉 ¡Oferta Especial!"
    body = "20% de descuento en todos los productos de pollo"
    icon = "/Imagenes/logo/Logo.png"
    url = "/#catalogo"
    sendToAll = $true
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer tu-secreto-admin"
}

Invoke-RestMethod -Uri "https://tu-sitio.netlify.app/.netlify/functions/enviar-notificacion-fcm" -Method Post -Body $body -Headers $headers
```

### 6.2 Usar Firebase Console (Método Manual)

1. Ve a Firebase Console > **Cloud Messaging**
2. Clic en **Send your first message**
3. Completa el formulario:
   - **Notification title**: Tu título
   - **Notification text**: Tu mensaje
   - **Image**: URL de imagen (opcional)
4. Clic en **Next**
5. En **Target**, selecciona tu app web
6. Clic en **Next** y luego **Review**
7. Clic en **Publish**

---

## 🔍 Solución de Problemas

### No se reciben notificaciones

1. **Verificar permisos**: Revisa que el navegador tenga permisos
2. **Verificar token**: Abre la consola y busca "Token FCM obtenido"
3. **Verificar service worker**: Ve a DevTools > Application > Service Workers
4. **Verificar Firestore**: Confirma que el token se guardó en la colección

### Error al obtener token

1. Verifica que la clave VAPID sea correcta
2. Verifica que el navegador soporte notificaciones
3. Verifica que estés en HTTPS (o localhost)

### Error al enviar notificación

1. Verifica las variables de entorno en Netlify
2. Verifica que el Service Account sea válido
3. Revisa los logs de la función en Netlify

---

## 📚 Archivos Creados

- ✅ `firebase-config.js` - Configuración del cliente
- ✅ `firebase-messaging-sw.js` - Service Worker de Firebase
- ✅ `sw.js` - Service Worker principal (actualizado)
- ✅ `netlify/functions/guardar-token-fcm.js` - Guardar tokens
- ✅ `netlify/functions/enviar-notificacion-fcm.js` - Enviar notificaciones
- ✅ `manifest.json` - Actualizado con gcm_sender_id

---

## 🎯 Próximos Pasos

1. **Segmentar usuarios**: Crear colecciones para diferentes tipos de usuarios
2. **Programar notificaciones**: Usar cron jobs para envíos automáticos
3. **Personalizar mensajes**: Enviar notificaciones basadas en comportamiento
4. **Analytics**: Registrar clics y conversiones de notificaciones

---

## 📞 Soporte

Si tienes problemas, verifica:

- [Documentación de FCM](https://firebase.google.com/docs/cloud-messaging)
- [Guía de PWA](https://web.dev/push-notifications/)
- Los logs en Firebase Console y Netlify

---

**¡Listo!** 🎉 Tu PWA ya puede enviar notificaciones push con Firebase Cloud Messaging.
