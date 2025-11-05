# Configurar Firebase en Netlify

## Problema
Los errores 429 y 500 que estás viendo indican que:
1. **Error 500**: Firebase Admin no está configurado correctamente en Netlify
2. **Error 429**: Rate limiting activado por múltiples peticiones fallidas

## Solución: Configurar las Variables de Entorno en Netlify

### Paso 1: Obtener las Credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **⚙️ Project Settings** (Configuración del proyecto)
4. Ve a la pestaña **Service Accounts**
5. Haz clic en **Generate New Private Key**
6. Descarga el archivo JSON (ejemplo: `serviceAccountKey.json`)

### Paso 2: Convertir las Credenciales a Base64

Abre PowerShell en tu computadora y ejecuta:

```powershell
# Reemplaza la ruta con la ubicación de tu archivo descargado
$jsonPath = "C:\ruta\a\tu\serviceAccountKey.json"

# Leer el archivo
$jsonContent = Get-Content -Path $jsonPath -Raw

# Convertir a Base64
$base64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($jsonContent))

# Mostrar el resultado (cópialo)
Write-Output $base64

# También guardarlo en un archivo para copiarlo fácilmente
$base64 | Out-File -FilePath "firebase-base64.txt" -Encoding UTF8
```

### Paso 3: Configurar las Variables en Netlify

1. Ve a tu sitio en [Netlify](https://app.netlify.com/)
2. Ve a **Site settings** → **Environment variables**
3. Haz clic en **Add a variable**
4. Agrega las siguientes variables:

   **Variable 1:**
   - Key: `FIREBASE_SERVICE_ACCOUNT_B64`
   - Value: El texto base64 que generaste en el paso anterior (toda la cadena)

   **Variable 2:**
   - Key: `FIREBASE_PROJECT_ID`
   - Value: Tu project ID de Firebase (ejemplo: `alimento-del-cielo-xyz`)

5. Haz clic en **Save**

### Paso 4: Volver a Desplegar

Después de configurar las variables de entorno:

1. Ve a **Deploys** en Netlify
2. Haz clic en **Trigger deploy** → **Deploy site**
3. Espera a que termine el deploy

## Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Recarga tu sitio
3. Los errores 500 deberían desaparecer
4. Las reseñas deberían cargarse correctamente

## Notas de Seguridad

⚠️ **IMPORTANTE:**
- **NUNCA** subas el archivo `serviceAccountKey.json` a GitHub
- **NUNCA** pegues las credenciales directamente en el código
- Las variables de entorno en Netlify son seguras y privadas
- El archivo JSON original debe guardarse en un lugar seguro (por ejemplo, un gestor de contraseñas)

## Solución de Problemas

### Si sigues viendo errores 500:

1. Verifica que las variables estén configuradas correctamente en Netlify
2. Revisa los logs de funciones en Netlify:
   - Ve a **Functions** en Netlify
   - Haz clic en la función `getReviews` o `reviews`
   - Revisa los logs para ver el error específico

### Si ves "Firebase no configurado - credenciales faltantes":

- La variable `FIREBASE_SERVICE_ACCOUNT_B64` no está configurada o está vacía
- Asegúrate de haber guardado los cambios en Netlify
- Haz un nuevo deploy después de agregar las variables

### Si ves errores de permisos de Firestore:

1. Ve a Firebase Console → Firestore Database
2. Ve a la pestaña **Rules**
3. Asegúrate de que las reglas permitan lectura/escritura para tu colección `reviews`

## Reglas de Firestore Recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura de reseñas publicadas
    match /reviews/{reviewId} {
      allow read: if resource.data.published == true;
      allow create: if request.auth != null || true; // Permitir crear sin autenticación si usas funciones
      allow update, delete: if false; // Solo admin puede actualizar/eliminar
    }
  }
}
```

**Nota:** Si usas Firebase Admin SDK (que es tu caso), las reglas no aplican a las funciones de servidor.
