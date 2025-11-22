# 🔔 GUÍA: Cómo Enviar Notificaciones Push

## ⚠️ IMPORTANTE: El Error 405 y Cómo Solucionarlo

El error **405 Method Not Allowed** que viste ocurre porque abriste `admin-notificaciones.html` directamente desde el explorador de archivos (`file://` o con Live Server en puerto 5500).

**Las funciones de Netlify SOLO funcionan con:**
- ✅ **Netlify Dev** (desarrollo local)
- ✅ **Netlify en producción** (tu sitio desplegado)

---

## 📋 SOLUCIÓN 1: Usar Netlify Dev (RECOMENDADO para desarrollo local)

### Paso 1: Crear archivo .env

```powershell
# Copia el archivo de ejemplo
copy .env.example .env
```

### Paso 2: Editar .env con tus credenciales

Abre `.env` y completa con tus valores reales:

```env
FIREBASE_PROJECT_ID=alimento-del-cielo
FIREBASE_SERVICE_ACCOUNT_B64=eyJOTU_BASE64_AQUI...
FCM_ADMIN_SECRET=MiClaveSecreta123
```

**Para obtener FIREBASE_SERVICE_ACCOUNT_B64:**

```powershell
# 1. Descarga tu serviceAccountKey.json desde Firebase Console
# 2. Ejecuta en PowerShell:
$json = Get-Content "ruta\al\serviceAccountKey.json" -Raw
$base64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json))
$base64 | Set-Clipboard
# 3. Pega el resultado en .env
```

### Paso 3: Instalar dependencias

```powershell
cd C:\Users\HP\Desktop\Catalogo_Digital_PWA
npm install
```

### Paso 4: Iniciar Netlify Dev

```powershell
npm run dev
```

**Verás algo como:**
```
◈ Netlify Dev ◈
◈ Server now ready on http://localhost:8888
```

### Paso 5: Abrir admin panel

Abre en tu navegador:
```
http://localhost:8888/admin-notificaciones.html
```

### Paso 6: Enviar notificación

1. Completa el formulario
2. En **Secreto de administrador**, escribe: `MiClaveSecreta123` (o el que pusiste en `.env`)
3. Click en **Enviar Notificación**

✅ **Ahora funcionará sin error 405**

---

## 📋 SOLUCIÓN 2: Usar Netlify en Producción (MÁS FÁCIL)

### Paso 1: Configurar variables en Netlify

1. Ve a https://app.netlify.com
2. Selecciona tu sitio
3. **Site settings → Environment variables**
4. Agrega estas variables:

```
FIREBASE_PROJECT_ID = alimento-del-cielo
FIREBASE_SERVICE_ACCOUNT_B64 = tu_base64_aqui
FCM_ADMIN_SECRET = MiClaveSecreta123
```

### Paso 2: Subir a Git

```powershell
git add admin-notificaciones.html netlify.toml
git commit -m "Add admin notifications panel"
git push origin main
```

### Paso 3: Esperar despliegue (1-2 minutos)

Netlify desplegará automáticamente.

### Paso 4: Abrir admin panel

```
https://tu-sitio.netlify.app/admin-notificaciones.html
```

### Paso 5: Enviar notificación

1. Completa el formulario
2. En **Secreto de administrador**, escribe tu `FCM_ADMIN_SECRET`
3. Click en **Enviar Notificación**

✅ **Funcionará perfectamente**

---

## 🧪 SOLUCIÓN 3: Prueba Rápida con PowerShell (Sin interfaz)

Si solo quieres probar el envío:

```powershell
# Variables
$secreto = "MiClaveSecreta123"
$url = "https://tu-sitio.netlify.app/.netlify/functions/enviar-notificacion-fcm"

# Notificación
$body = @{
    title = "🎉 Prueba"
    body = "Esta es una notificación de prueba"
    icon = "🔔"
    url = "/#catalogo"
    sendToAll = $true
} | ConvertTo-Json

# Enviar
Invoke-RestMethod -Uri $url `
  -Method POST `
  -Headers @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $secreto"
  } `
  -Body $body
```

---

## 🔍 Verificar que Todo Funcione

### Checklist:

- [ ] ¿Tienes las variables de entorno configuradas?
- [ ] ¿Estás usando Netlify Dev (`http://localhost:8888`) o producción?
- [ ] ¿Tu secreto coincide con `FCM_ADMIN_SECRET`?
- [ ] ¿Hay usuarios registrados con tokens FCM en Firestore?

### Ver tokens registrados:

Ve a Firebase Console → Firestore → Colección `fcm_tokens`

---

## ❓ Preguntas Frecuentes

### P: ¿Por qué sale error 405?
**R:** Porque abriste el archivo directamente. Usa Netlify Dev o sube a producción.

### P: ¿Puedo usar Live Server?
**R:** No. Live Server no puede ejecutar funciones serverless de Netlify.

### P: ¿Dónde guardo mis credenciales?
**R:** 
- **Local:** archivo `.env` (NO subir a Git)
- **Producción:** Variables de entorno en Netlify Dashboard

### P: ¿Cómo sé si se envió?
**R:** Verás una alerta verde con el número de usuarios que recibieron la notificación.

---

## 🎯 Resumen Rápido

| Método | Cuándo Usar | Complejidad |
|--------|-------------|-------------|
| **Netlify Dev** | Desarrollo local | ⭐⭐ Media |
| **Netlify Producción** | Uso real | ⭐ Fácil |
| **PowerShell/cURL** | Pruebas rápidas | ⭐⭐ Media |

**Mi recomendación:** 
👉 **Usa Netlify en producción** (Solución 2) - Es lo más simple.

---

## 📞 Soporte

Si tienes problemas:

1. Verifica la consola del navegador (F12)
2. Verifica los logs de Netlify
3. Verifica que las variables de entorno estén configuradas

---

✅ **Ahora ya sabes cómo enviar notificaciones sin errores** 🚀
