# 🍗 Alimento del Cielo - PWA

**Catálogo Digital de Alimentos Congelados Premium**

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site)
![Versión](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-brightgreen.svg)

---

## 🎯 Características

- ✅ **PWA Completa** - Instalable en cualquier dispositivo
- ✅ **Offline First** - Funciona sin conexión
- ✅ **Catálogo Dinámico** - Actualizaciones automáticas sin borrar cache
- ✅ **Notificaciones Push** - Firebase Cloud Messaging
- ✅ **Pagos Wompi** - Integración completa con pasarela de pagos
- ✅ **Sistema de Reseñas** - Valoraciones y comentarios
- ✅ **Panel Admin** - Gestión de notificaciones y reseñas
- ✅ **Modo Oscuro** - Tema adaptativo
- ✅ **Responsive** - Optimizado para móvil, tablet y desktop
- ✅ **Auto-actualización** - Service Worker inteligente

---

## 🚀 Inicio Rápido

### Requisitos

- Node.js >= 14.0.0
- npm o yarn
- Cuenta de Netlify (para deploy)
- Cuenta de Firebase (para notificaciones)
- Cuenta de Wompi (para pagos)

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/julionarvaez/Catalogo_Digital_PWA.git
cd Catalogo_Digital_PWA

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:8888`

---

## 📦 Gestión de Productos

### Sistema de Actualización Automática

Los productos ahora se gestionan a través de `productos.json` con actualización automática en todos los clientes.

#### Agregar/Editar Productos

1. Edita `productos.json`
2. Actualiza la versión:
```bash
npm run update:productos
```
3. Commit y push:
```bash
git add productos.json
git commit -m "feat: Actualizar catálogo"
git push
```

Los clientes recibirán la actualización automáticamente en 30-60 segundos.

📖 **[Ver Guía Completa](GUIA-ACTUALIZACION-PRODUCTOS.md)**

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev                      # Servidor local con Netlify Dev

# Actualización de Productos
npm run update:productos         # Versión patch (1.0.0 → 1.0.1)
npm run update:productos:minor   # Versión minor (1.0.0 → 1.1.0)
npm run update:productos:major   # Versión major (1.0.0 → 2.0.0)

# Deployment
npm run deploy                   # Deploy a producción en Netlify
```

---

## 📁 Estructura del Proyecto

```
Catalogo_Digital_PWA/
├── index.html                      # Página principal
├── script.js                       # Lógica de la aplicación
├── styles.css                      # Estilos
├── productos.json                  # ⭐ Catálogo dinámico
├── sw.js                          # Service Worker
├── manifest.json                   # Manifest PWA
├── firebase-config.js             # Configuración Firebase
├── firebase-messaging-sw.js       # SW para notificaciones
├── auto-update.js                 # Sistema de auto-actualización
├── actualizar-version-productos.js # Script de versionado
│
├── netlify/
│   └── functions/                 # Serverless functions
│       ├── crear-transaccion-wompi.js
│       ├── enviar-notificacion-fcm.js
│       ├── getReviews.js
│       ├── reviews.js
│       └── ...
│
├── Imagenes/
│   ├── logo/                      # Iconos de la PWA
│   ├── Productos/                 # Imágenes de productos
│   └── screenshots/               # Capturas para manifest
│
└── docs/
    ├── GUIA-ACTUALIZACION-PRODUCTOS.md
    ├── CONFIGURAR-NETLIFY.md
    └── ...
```

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Wompi
WOMPI_PUBLIC_KEY=pub_test_xxxxx
WOMPI_PRIVATE_KEY=prv_test_xxxxx

# Firebase
FIREBASE_PROJECT_ID=tu-proyecto
FIREBASE_SERVICE_ACCOUNT_B64=tu_base64...

# Admin
FCM_ADMIN_SECRET=tu_clave_secreta
```

### Netlify

1. Conecta tu repositorio en Netlify
2. Configura las variables de entorno en Netlify Dashboard
3. Deploy automático en cada push a `main`

📖 **[Guía de Configuración Netlify](CONFIGURAR-NETLIFY.md)**

---

## 🔄 Sistema de Actualización

### Cómo Funciona

1. **Productos en JSON separado** → `productos.json`
2. **Stale-While-Revalidate** → Muestra cache, actualiza en background
3. **Service Worker inteligente** → Detecta cambios automáticamente
4. **Notificación al usuario** → "🆕 Catálogo actualizado"
5. **Refresh automático** → Vista actualizada sin recargar

### Estrategias de Cache

- **productos.json** → Stale-While-Revalidate (actualización automática)
- **HTML** → Network First (siempre fresco)
- **CSS/JS** → Cache First (archivos estáticos)
- **Imágenes** → Cache First (optimización)
- **APIs** → Network First (datos en tiempo real)

---

## 📱 Características PWA

### Instalación

La app se puede instalar en:
- ✅ Android (Chrome, Edge, Samsung Internet)
- ✅ iOS (Safari - Add to Home Screen)
- ✅ Desktop (Chrome, Edge, Safari)

### Offline

- ✅ Catálogo completo disponible offline
- ✅ Carrito persistente
- ✅ Sincronización al volver online

### Notificaciones Push

- ✅ Firebase Cloud Messaging
- ✅ Notificaciones de ofertas
- ✅ Actualizaciones del catálogo
- ✅ Panel admin para envío masivo

---

## 🎨 Personalización

### Cambiar Colores

Edita `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Azul principal */
    --secondary-color: #10b981;    /* Verde secundario */
    /* ... más variables */
}
```

### Cambiar Logo

Reemplaza los archivos en `Imagenes/logo/`:
- `Logo.png` (principal)
- `logo 72x72.png`, `logo 96x96.png`, etc. (iconos PWA)

Actualiza `manifest.json` si cambias nombres de archivos.

---

## 🧪 Testing

### Probar PWA Localmente

```bash
npm run dev
```

Luego en Chrome DevTools:
1. Application → Service Workers → Verificar estado
2. Application → Manifest → Verificar manifest.json
3. Lighthouse → Run PWA audit

### Probar Actualizaciones de Productos

1. Edita `productos.json`
2. `npm run update:productos`
3. Recarga la página
4. Verifica consola: "🆕 Nueva versión del catálogo detectada"

---

## 📊 Métricas y Monitoreo

### Service Worker

```javascript
// Consola del navegador
navigator.serviceWorker.getRegistration().then(reg => {
    console.log('SW activo:', reg.active);
    console.log('SW esperando:', reg.waiting);
});
```

### Versión del Catálogo

```javascript
// Consola del navegador
localStorage.getItem('catalogoVersion');      // Versión actual
localStorage.getItem('catalogoLastUpdate');   // Última actualización
```

---

## 🐛 Solución de Problemas

### Los productos no se cargan

1. Verifica consola del navegador (F12)
2. Revisa que `productos.json` sea válido:
```bash
node -e "JSON.parse(require('fs').readFileSync('productos.json'))"
```
3. Hard refresh: `Ctrl + F5`

### Service Worker no actualiza

1. DevTools → Application → Service Workers
2. Click "Update" o "Unregister"
3. Recarga la página

### Notificaciones no funcionan

1. Verifica que Firebase esté configurado
2. Revisa variables de entorno en Netlify
3. Consulta [GUIA-NOTIFICACIONES.md](GUIA-NOTIFICACIONES.md)

---

## 🚀 Deployment

### Netlify (Recomendado)

```bash
# Deploy manual
npm run deploy

# Deploy automático
git push origin main  # Netlify detecta y despliega automáticamente
```

### Otros Hosting

La app es estática, puede desplegarse en:
- Vercel
- GitHub Pages
- Firebase Hosting
- Cloudflare Pages

**Nota:** Las Netlify Functions requieren Netlify o migración a otro serverless provider.

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "feat: Agregar nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Autor

**Alimento del Cielo**
- GitHub: [@julionarvaez](https://github.com/julionarvaez)

---

## 📞 Soporte

- 📧 Email: soporte@alimentodelcielo.com
- 📱 WhatsApp: [Contactar](https://wa.me/tu-numero)
- 📝 Issues: [GitHub Issues](https://github.com/julionarvaez/Catalogo_Digital_PWA/issues)

---

## 🎯 Roadmap

- [ ] Panel admin con autenticación
- [ ] Gestión de inventario
- [ ] Análisis de ventas
- [ ] Integración con más pasarelas de pago
- [ ] App móvil nativa (React Native)
- [ ] Sistema de cupones/descuentos

---

## ⭐ Agradecimientos

- Firebase por el servicio de notificaciones
- Wompi por la pasarela de pagos
- Netlify por el hosting y functions
- Comunidad open source

---

**¡Gracias por usar Alimento del Cielo PWA!** 🍗

Si te gusta el proyecto, dale una ⭐ en GitHub.
