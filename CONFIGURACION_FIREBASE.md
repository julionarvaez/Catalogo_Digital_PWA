# Configuración de Firebase para el Sistema de Reseñas

## ✅ Estado Actual
El sistema de reseñas está completamente implementado y listo para funcionar. Solo necesitas configurar Firebase.

## 🔧 Pasos para Configurar Firebase

### 1. Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto (ej: "alimento-del-cielo")
4. Sigue los pasos para crear el proyecto

### 2. Habilitar Firestore Database

1. En el panel de Firebase, ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona el modo **"Producción"** para comenzar
4. Elige una ubicación cercana (ej: `us-east1` o `southamerica-east1`)

### 3. Configurar Reglas de Seguridad de Firestore

Ve a la pestaña **Reglas** en Firestore y usa estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colección de reseñas
    match /reviews/{reviewId} {
      // Permitir lectura solo de reseñas publicadas
      allow read: if resource.data.published == true;
      
      // No permitir escritura directa desde el cliente
      // Solo las Cloud Functions pueden escribir
      allow write: if false;
    }
  }
}
```

### 4. Crear una Cuenta de Servicio

1. Ve a **Configuración del proyecto** (ícono de engranaje)
2. Ve a la pestaña **Cuentas de servicio**
3. Haz clic en "Generar nueva clave privada"
4. Se descargará un archivo JSON con las credenciales

### 5. Configurar Variables de Entorno en Netlify

1. Ve a tu dashboard de Netlify
2. Selecciona tu sitio
3. Ve a **Site settings > Environment variables**
4. Agrega estas variables:

#### Variable: `FIREBASE_SERVICE_ACCOUNT_B64`
- **Valor**: El contenido del archivo JSON de la cuenta de servicio, codificado en Base64

Para obtener el valor en Base64 (en PowerShell):
```powershell
$json = Get-Content -Path "ruta-al-archivo-descargado.json" -Raw
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json))
```

#### Variable: `FIREBASE_PROJECT_ID`
- **Valor**: El ID de tu proyecto Firebase (lo encuentras en la configuración del proyecto)

### 6. Estructura de Datos en Firestore

Las reseñas se guardarán en Firestore con esta estructura:

**Colección**: `reviews`

**Documento** (cada reseña):
```javascript
{
  nombre: "Juan Pérez",           // Nombre del cliente
  texto: "Excelente producto...", // Opinión
  rating: 5,                      // Calificación de 1 a 5
  productoId: 1,                  // ID del producto (opcional)
  published: true,                // Si está publicada o no
  verified: false,                // Si es verificada (compra real)
  createdAt: Timestamp,           // Fecha de creación
  updatedAt: Timestamp,           // Fecha de actualización
  clientIP: "xxx.xxx.xxx.xxx",   // IP del cliente (privado)
  userAgent: "...",               // Navegador usado (privado)
}
```

## 🚀 Verificar Funcionamiento

### 1. Probar en Local (Desarrollo)

```powershell
npm run dev
```

Abre `http://localhost:8888` y navega hasta la sección de reseñas.

### 2. Comportamiento Esperado

#### Sin Conexión a Firebase (Primera Vez):
- ✅ El formulario de reseñas se muestra correctamente
- ✅ Puedes completar el formulario
- ❌ Al enviar, mostrará un error (normal si Firebase no está configurado)
- ✅ La reseña se guarda localmente para envío posterior

#### Con Firebase Configurado:
- ✅ Las reseñas existentes se cargan automáticamente
- ✅ El carrusel muestra las reseñas con navegación
- ✅ Las estadísticas (promedio, total) se actualizan
- ✅ Al enviar una nueva reseña, se guarda en Firestore
- ✅ La nueva reseña aparece inmediatamente (optimistic UI)

### 3. Verificar en la Consola del Navegador

Abre las DevTools (F12) y busca estos mensajes:
- ✅ `"✅ Sistema de reseñas inicializado correctamente"`
- ✅ `"📦 IndexedDB inicializado para reseñas"`
- ❌ Si ves errores de Firebase, revisa las variables de entorno

## 📋 Funcionalidades Implementadas

### Frontend (script.js)
- ✅ Clase `SistemaResenas` completamente funcional
- ✅ Carrusel de reseñas con navegación táctil
- ✅ Formulario con validación completa
- ✅ Optimistic UI (muestra la reseña antes de confirmar)
- ✅ Soporte offline con IndexedDB/localStorage
- ✅ Sincronización automática al recuperar conexión
- ✅ Rate limiting (3 reseñas por minuto)
- ✅ Analytics integrado
- ✅ JSON-LD Schema para SEO

### Backend (Netlify Functions)
- ✅ `reviews.js` - Crear nuevas reseñas
- ✅ `getReviews.js` - Obtener reseñas públicas
- ✅ Validación de datos
- ✅ Sanitización de entrada
- ✅ Rate limiting
- ✅ Cache de 5 minutos

### HTML
- ✅ Sección de reseñas correctamente ubicada
- ✅ Formulario completo con todos los campos
- ✅ Carrusel con controles de navegación
- ✅ Estadísticas de reseñas
- ✅ Estados offline y mensajes

## 🐛 Solución de Problemas

### Problema: "No se cargan las reseñas"
**Solución:**
1. Verifica que Firebase esté configurado
2. Revisa las variables de entorno en Netlify
3. Asegúrate de que hay al menos una reseña con `published: true` en Firestore

### Problema: "Error al enviar reseña"
**Solución:**
1. Verifica la consola del navegador para detalles del error
2. Revisa que las reglas de Firestore permitan lectura
3. Verifica que la Cloud Function `reviews.js` esté desplegada

### Problema: "Las reseñas no se muestran en la página"
**Solución:**
1. Verifica que la sección `<section id="reseñas">` esté en el HTML
2. Asegúrate de que `inicializarResenas()` se está llamando
3. Revisa la consola para errores de JavaScript

## 📝 Agregar Reseñas Manualmente (Para Testing)

Puedes agregar reseñas de prueba directamente en Firestore Console:

1. Ve a Firestore Database en Firebase Console
2. Crea la colección `reviews` si no existe
3. Agrega un documento con esta estructura:

```json
{
  "nombre": "María González",
  "texto": "Excelente calidad de los productos. El pollo siempre llega fresco y el servicio es impecable. 100% recomendado!",
  "rating": 5,
  "productoId": 1,
  "published": true,
  "verified": false,
  "createdAt": [Timestamp actual],
  "updatedAt": [Timestamp actual]
}
```

## ✨ Próximos Pasos

1. **Configurar Firebase** siguiendo esta guía
2. **Agregar reseñas de prueba** para verificar que se muestran
3. **Desplegar en Netlify** con las variables de entorno configuradas
4. **Probar el formulario** enviando una reseña real
5. **Monitorear** las reseñas en Firebase Console

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs de Netlify Functions
3. Revisa los logs en Firebase Console

---

**¡El sistema está listo para funcionar! Solo necesitas configurar Firebase.** 🚀
