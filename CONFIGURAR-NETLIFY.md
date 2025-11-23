# 🚀 GUÍA: Configurar Variables de Entorno en Netlify

## ⚠️ ERROR ACTUAL

**Error 401** en el panel de notificaciones → Las variables de entorno NO están configuradas en Netlify.

---

## ✅ SOLUCIÓN PASO A PASO

### PASO 1: Obtener Service Account de Firebase

1. Ve a **Firebase Console**:
   ```
   https://console.firebase.google.com/project/alimento-del-cielo/settings/serviceaccounts/adminsdk
   ```

2. Click en **"Generate new private key"**

3. **Descarga** el archivo JSON (ejemplo: `alimento-del-cielo-firebase-adminsdk-xxxxx.json`)

4. **Guarda** el archivo en un lugar seguro (NO lo subas a Git)

---

### PASO 2: Convertir el JSON a Base64

**Opción A: Usando el script automático (RECOMENDADO)**

```powershell
# Ejecuta el script incluido
.\generar-base64-firebase.ps1

# Sigue las instrucciones
# El Base64 se copiará automáticamente al portapapeles
```

**Opción B: Manualmente en PowerShell**

```powershell
# Cambia la ruta por la ubicación de tu archivo
$json = Get-Content "C:\Downloads\alimento-del-cielo-firebase-adminsdk-xxxxx.json" -Raw
$base64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json))
$base64 | Set-Clipboard
Write-Host "✅ Base64 copiado al portapapeles"
```

---

### PASO 3: Configurar Variables en Netlify

1. **Abre Netlify Dashboard**:
   ```
   https://app.netlify.com/sites/alimentodelcielo-congeladosmonteliban/settings/env
   ```

2. **Click en "Add a variable"**

3. **Agrega las siguientes 3 variables**:

#### Variable 1: Firebase Project ID
```
Key:   FIREBASE_PROJECT_ID
Value: alimento-del-cielo
Scope: All scopes
```

#### Variable 2: Firebase Service Account (Base64)
```
Key:   FIREBASE_SERVICE_ACCOUNT_B64
Value: [Pega el Base64 que copiaste - será muy largo]
Scope: All scopes
```

#### Variable 3: Secreto de Administrador
```
Key:   FCM_ADMIN_SECRET
Value: [Tu clave secreta personal - ejemplo: MiClave123XYZ]
Scope: All scopes
```

⚠️ **IMPORTANTE**: Guarda el valor de `FCM_ADMIN_SECRET` que uses, lo necesitarás para enviar notificaciones.

4. **Click en "Save"** después de cada variable

---

### PASO 4: Redesplegar el Sitio

Después de agregar las variables, Netlify necesita redesplegar:

**Opción A: Forzar redespliegue desde Netlify Dashboard**
```
https://app.netlify.com/sites/alimentodelcielo-congeladosmonteliban/deploys
→ Click en "Trigger deploy" → "Clear cache and deploy site"
```

**Opción B: Hacer un commit vacío**
```powershell
git commit --allow-empty -m "Trigger redeploy - Configure env vars"
git push origin main
```

⏰ **Espera 1-2 minutos** para que termine el despliegue.

---

### PASO 5: Probar el Panel de Notificaciones

1. **Abre el panel**:
   ```
   https://alimentodelcielo-congeladosmonteliban.netlify.app/admin-notificaciones.html
   ```

2. **Completa el formulario**:
   - Título: `🎉 Prueba de Notificación`
   - Mensaje: `Esta es una prueba del sistema`
   - Secreto: [El valor que pusiste en FCM_ADMIN_SECRET]

3. **Click en "Enviar Notificación"**

4. **Resultado esperado**:
   ```
   ✅ Notificación enviada exitosamente a X usuario(s)
   ```

---

## 🔍 VERIFICAR SI ESTÁ FUNCIONANDO

### Ver logs de las funciones en Netlify

```
https://app.netlify.com/sites/alimentodelcielo-congeladosmonteliban/functions
```

Busca mensajes como:
- ✅ `Firebase Admin SDK inicializado`
- ✅ `Token FCM guardado`

Si ves:
- ❌ `FIREBASE_SERVICE_ACCOUNT_B64 no está configurado`
- ❌ `Firebase no configurado - credenciales faltantes`

→ Las variables NO están configuradas correctamente.

---

## ❓ PREGUNTAS FRECUENTES

### P: ¿Puedo usar cualquier valor para FCM_ADMIN_SECRET?
**R:** Sí, pero elige algo seguro (mínimo 12 caracteres, mezcla letras, números y símbolos).

### P: ¿El Base64 es muy largo, es normal?
**R:** Sí, el Base64 del Service Account tiene miles de caracteres. Es normal.

### P: ¿Tengo que hacer esto cada vez?
**R:** No, solo UNA VEZ. Las variables quedan guardadas en Netlify.

### P: ¿Puedo ver las variables después?
**R:** Puedes ver los nombres (keys) pero NO los valores por seguridad.

### P: ¿Qué pasa si alguien descubre mi FCM_ADMIN_SECRET?
**R:** Cambia el valor en Netlify inmediatamente y redesplega.

---

## 🎯 CHECKLIST

- [ ] Descargué el Service Account de Firebase
- [ ] Convertí el JSON a Base64
- [ ] Agregué las 3 variables en Netlify
- [ ] Forcé un redespliegue
- [ ] Esperé 1-2 minutos
- [ ] Probé enviar una notificación
- [ ] ¡Funcionó! ✅

---

## 📞 ¿PROBLEMAS?

Si después de seguir todos los pasos sigues viendo error 401:

1. Verifica que las variables estén en **"All scopes"**
2. Verifica que el Base64 esté completo (sin espacios ni saltos de línea)
3. Revisa los logs en: https://app.netlify.com/sites/alimentodelcielo-congeladosmonteliban/functions
4. Intenta con un nuevo Service Account Key de Firebase

---

**¡Listo!** Con esto configurado, podrás enviar notificaciones push a todos tus usuarios.
