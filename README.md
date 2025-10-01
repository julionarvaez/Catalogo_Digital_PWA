# 🍽️ Alimento del Cielo - Catálogo Digital PWA

Una Progressive Web App (PWA) completa para el catálogo digital de alimentos congelados "Alimento del Cielo". Incluye carrito de compras, integración con WhatsApp Business, sistema de combos, modo offline y más.

## 📋 Características Principales

### 🛒 E-commerce Completo
- **Carrito de compras** con persistencia local
- **Sumar/restar cantidades** de productos
- **Eliminar productos** del carrito
- **Cálculo automático** de totales
- **Finalización por WhatsApp** Business

### 🔍 Experiencia de Usuario
- **Búsqueda en tiempo real** de productos
- **Filtros por categoría** (carnes, pollo, pescado, verduras)
- **Modo claro/oscuro** automático
- **Diseño responsive** para móvil y desktop
- **Animaciones fluidas** y transiciones

### 💬 Integración WhatsApp
- **Enlaces directos** a WhatsApp por producto
- **Finalización de pedidos** con resumen completo
- **Formato profesional** de mensajes
- **Contacto directo** con el negocio

### 🎁 Sistema de Combos
- **Combos especiales** con descuentos
- **Precios diferenciados** y ahorros visibles
- **Agregar combos** al carrito
- **Productos incluidos** detallados

### 📱 PWA Features
- **Instalable** en dispositivos móviles
- **Funcionalidad offline** básica
- **Service Worker** para cache inteligente
- **Notificaciones push** (preparado)
- **Manifest.json** completo

### 🎨 Diseño Moderno
- **Variables CSS** para temas personalizables
- **Gradientes** y efectos visuales
- **Iconos emoji** para mejor UX
- **Tarjetas de producto** atractivas

## 📁 Estructura de Archivos

```
alimento-del-cielo/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript funcional
├── manifest.json       # Manifiesto PWA
├── sw.js              # Service Worker
└── README.md          # Este archivo
```

## 🚀 Instalación y Uso

### 1. Configuración Básica

1. **Descargar los archivos** en una carpeta
2. **Abrir index.html** en un navegador web
3. **Servir desde un servidor HTTP** (recomendado para PWA)

### 2. Servidor Local (Recomendado)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npm install -g http-server
http-server

# Con PHP
php -S localhost:8000
```

### 3. Personalización

#### Cambiar Información de Contacto
En `script.js`, modifica:
```javascript
// Línea ~400 aproximadamente
const numeroWhatsApp = '573001234567'; // Tu número
const emailContacto = 'info@alimentodelcielo.com'; // Tu email
```

#### Modificar Productos
En `script.js`, edita el array `productos`:
```javascript
const productos = [
    {
        id: 1,
        nombre: 'Tu Producto',
        categoria: 'tu-categoria',
        precio: 25000,
        descripcion: 'Descripción del producto...',
        emoji: '🍗',
        etiqueta: 'Nuevo',
        tipoEtiqueta: 'etiqueta-nuevo'
    }
    // ... más productos
];
```

#### Personalizar Colores
En `styles.css`, modifica las variables:
```css
:root {
    --color-primario: #2563eb;    /* Azul principal */
    --color-secundario: #1e40af;  /* Azul secundario */
    --color-acento: #f59e0b;      /* Amarillo/naranja */
    --color-exito: #10b981;       /* Verde */
    --color-error: #ef4444;       /* Rojo */
}
```

## 📱 Funcionalidades del Carrito

### Agregar Productos
```javascript
// Desde código
window.AlimentoDelCielo.agregarProducto(1); // ID del producto

// Desde HTML
<button onclick="agregarAlCarrito(1)">Agregar</button>
```

### Modificar Cantidades
- **Botón +/-** para incrementar/decrementar
- **Validación automática** de cantidades mínimas
- **Actualización en tiempo real** del total

### Eliminar Productos
- **Botón de eliminar** (🗑️) en cada item
- **Confirmación visual** con notificación
- **Recálculo automático** del total

### Finalizar Pedido
1. **Click en "Finalizar por WhatsApp"**
2. **Genera mensaje estructurado**
3. **Abre WhatsApp** con el pedido
4. **Limpia el carrito** automáticamente

## 🔧 API JavaScript

La aplicación expone una API global:

```javascript
// Carrito
window.AlimentoDelCielo.agregarProducto(id);
window.AlimentoDelCielo.removerProducto(id);
window.AlimentoDelCielo.limpiarCarrito();
window.AlimentoDelCielo.obtenerCarrito();

// Productos
window.AlimentoDelCielo.obtenerProductos();
window.AlimentoDelCielo.buscarProductos(termino);

// Utilidades
window.AlimentoDelCielo.formatearPrecio(precio);
window.AlimentoDelCielo.mostrarNotificacion(mensaje, tipo);

// PWA
window.AlimentoDelCielo.instalar();
```

## 🎨 Personalización Visual

### Agregar Nuevas Categorías
1. **Agregar botón de filtro** en HTML:
```html
<button class="btn-filtro" onclick="filtrarPorCategoria('nueva-categoria', this)">
    🆕 Nueva Categoría
</button>
```

2. **Agregar productos** con esa categoría en `script.js`

### Cambiar Emojis
Modifica los emojis en los productos para cambiar los iconos:
```javascript
{
    emoji: '🥘', // Cambiar por el emoji deseado
    // ...
}
```

### Personalizar Combos
En `index.html`, modifica las secciones de combos:
```html
<div class="tarjeta-combo">
    <h3 class="titulo-combo">🎁 Tu Combo Especial</h3>
    <!-- ... contenido del combo ... -->
</div>
```

## 📊 Analytics y Tracking

La aplicación incluye función básica de analytics:
```javascript
// Enviar eventos personalizados
window.AlimentoDelCielo.analytics('evento', 'categoria', 'accion');
```

Para integrar Google Analytics:
1. **Agregar script** de GA4 en `index.html`
2. **Los eventos** se enviarán automáticamente

## 🔒 Seguridad

- **Validación** de datos en frontend
- **Sanitización** de inputs de búsqueda
- **LocalStorage** para persistencia segura
- **HTTPS requerido** para PWA completa

## 🐛 Troubleshooting

### PWA no se instala
- Verificar que se sirva por **HTTPS**
- Comprobar que **manifest.json** sea válido
- Revisar **Service Worker** en DevTools

### Carrito no persiste
- Verificar **LocalStorage** en DevTools
- Comprobar **permisos de almacenamiento**
- Limpiar cache si es necesario

### Notificaciones no funcionan
- **Permisos** de notificación denegados
- **Service Worker** no registrado
- **HTTPS requerido** para notificaciones

## 📈 Mejoras Futuras

### Funcionalidades Pendientes
- [ ] **Pagos en línea** (Wompi, Mercado Pago)
- [ ] **Sistema de usuarios** y autenticación
- [ ] **Historial de pedidos** expandido
- [ ] **Programa de puntos** y fidelización
- [ ] **Notificaciones push** activas

### Integraciones Posibles
- [ ] **Base de datos** (Firebase, Supabase)
- [ ] **CMS** para gestión de productos
- [ ] **Analytics avanzados** (GA4, Mixpanel)
- [ ] **Chat en vivo** (Tidio, Intercom)

## 📞 Soporte

Para soporte técnico o consultas:
- **WhatsApp**: +57 300 123 4567
- **Email**: info@alimentodelcielo.com

## 📄 Licencia

Este proyecto es de uso libre para fines comerciales y educativos.

---

**Desarrollado con ❤️ para Alimento del Cielo**
*Version 1.0.0 - 2024*