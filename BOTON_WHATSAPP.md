# 📱 Botón Flotante de WhatsApp - Documentación Técnica

## 📋 Resumen General

Se ha implementado un **botón flotante de WhatsApp (FAB - Floating Action Button)** profesional, moderno y completamente funcional para el catálogo digital "Alimento del Cielo". El botón está diseñado con las mejores prácticas de UX/UI, accesibilidad y performance.

---

## ✨ Características Principales

### 🎨 Diseño Visual Premium

#### **Ubicación Estratégica**
- **Posición**: Inferior izquierda (fixed)
- **Coordenadas Desktop**: `bottom: 30px`, `left: 30px`
- **Z-index**: 999 (sin conflictos con otros elementos)
- **No interfiere**: Posicionado estratégicamente para no chocar con el botón de instalación PWA

#### **Estilos Profesionales**
- **Gradiente de marca WhatsApp**: `#25D366` → `#128C7E`
- **Sombras múltiples**: Efecto de elevación 3D realista
- **Animación de pulso**: Llama la atención sutilmente cada 2.5s
- **Efecto de ondas**: Círculos concéntricos que se expanden (elegante)
- **Hover effect**: Se expande mostrando texto "Chatea con nosotros"
- **Icono SVG**: Vector escalable de alta calidad

#### **Badge de Notificación**
- **Indicador visual**: Círculo rojo con número
- **Posición**: Esquina superior derecha del botón
- **Animación**: Pulso suave para llamar la atención
- **Smart**: Se oculta automáticamente después del primer clic
- **Persistente**: Usa `localStorage` para recordar el estado

### 🚀 Funcionalidades Avanzadas

#### **1. Sistema de Tooltip Inteligente**
```javascript
// Se muestra automáticamente después de 5 segundos (solo la primera vez)
// Mensaje: "💬 ¿Necesitas ayuda? Chatea con nosotros"
// Duración: 8 segundos
// Auto-cierre: Con botón X o automático
```

#### **2. Tracking y Analytics**
```javascript
// Integración con Google Analytics
gtag('event', 'click', {
    'event_category': 'WhatsApp',
    'event_label': 'Botón Flotante',
    'value': 1
});
```

#### **3. Persistencia de Estado**
```javascript
// LocalStorage tracking
- 'whatsapp_clicked': true/false
- 'whatsapp_tooltip_shown': true/false
```

#### **4. Mensaje Pre-configurado**
```
URL: https://wa.me/573135212887?text=Hola!%20Estoy%20interesado%20en%20sus%20productos%20congelados%20🍗
```

### 📱 Diseño 100% Responsive

#### **Desktop (>768px)**
- Tamaño: 60x60px
- Hover: Expande a 200px mostrando texto
- Icono: 32x32px
- Todas las animaciones activas

#### **Tablet (≤768px)**
- Tamaño: 56x56px
- Hover: Expande a 180px
- Icono: 28x28px
- Posición ajustada: `left: 20px`

#### **Móvil (≤480px)**
- Tamaño: 54x54px
- **NO expande** en hover (mejor UX táctil)
- Texto oculto (solo icono)
- Posición: `bottom: 90px` (evita conflicto con botón instalación)
- Badge más pequeño: 20x20px

#### **Ultra Móvil (≤360px)**
- Tamaño: 50x50px
- Icono: 24x24px
- Optimizado para pantallas pequeñas

### ♿ Accesibilidad (WCAG 2.1)

#### **Atributos ARIA**
```html
aria-label="Contactar por WhatsApp"
title="Chatea con nosotros por WhatsApp"
rel="noopener noreferrer"
target="_blank"
```

#### **Navegación por Teclado**
- ✅ Focusable con Tab
- ✅ Activable con Enter/Space
- ✅ Outline visible en focus
- ✅ Skip links compatible

#### **Táctil**
- ✅ Área mínima: 56x56px (Android guidelines)
- ✅ `touch-action: manipulation` (previene zoom)
- ✅ `-webkit-tap-highlight-color` personalizado
- ✅ Feedback visual inmediato

#### **Preferencias de Usuario**
```css
@media (prefers-reduced-motion: reduce) {
    /* Todas las animaciones deshabilitadas */
}
```

### 🌙 Modo Oscuro Completo

#### **Botón Principal**
- Sombras intensificadas para mejor contraste
- Gradiente mantiene colores de marca
- Bordes sutiles ajustados

#### **Tooltip**
- Fondo: `#1e293b` → `#0f172a`
- Texto: `#e2e8f0`
- Borde: `rgba(37, 211, 102, 0.3)`
- Sombras más profundas

#### **Badge**
- Box-shadow ajustado al fondo oscuro
- Contraste óptimo

---

## 🎯 Animaciones y Efectos

### **1. Pulso del Botón**
```css
@keyframes pulsoWhatsApp {
    0%, 100% { /* Sombra normal */ }
    50% { /* Sombra expandida */ }
}
/* Duración: 2.5s | Infinite */
```

### **2. Ondas Concéntricas**
```css
@keyframes ondasWhatsApp {
    0% { scale(1), opacity: 1 }
    100% { scale(1.8), opacity: 0 }
}
/* Efecto elegante de radar */
```

### **3. Expansión en Hover**
```css
width: 60px → 200px
border-radius: 50% → 30px
/* Transición suave con cubic-bezier */
```

### **4. Pulso del Badge**
```css
@keyframes pulsoNotificacionWA {
    0%, 100% { scale(1) }
    50% { scale(1.15) }
}
```

### **5. Entrada Suave**
```javascript
// Aparece con fade-in después de 2 segundos
opacity: 0 → 1 (0.6s ease)
```

---

## 🔧 API JavaScript

### **Funciones Públicas**

#### `inicializarBotonWhatsApp()`
```javascript
// Se ejecuta automáticamente al cargar la página
// Gestiona: badge, eventos, localStorage, animaciones
```

#### `actualizarBadgeWhatsApp(cantidad)`
```javascript
// Actualiza el número del badge
// Ejemplo:
actualizarBadgeWhatsApp(5); // Muestra "5"
actualizarBadgeWhatsApp(0); // Oculta el badge
actualizarBadgeWhatsApp(15); // Muestra "9+"
```

#### `mostrarTooltipWhatsApp()`
```javascript
// Muestra el tooltip manualmente
// Auto-cierra después de 8 segundos
```

#### `cerrarTooltipWhatsApp()`
```javascript
// Cierra el tooltip manualmente
// Útil para eventos personalizados
```

### **Eventos Personalizados**

```javascript
// Detectar clic en WhatsApp
document.getElementById('btnWhatsAppFlotante').addEventListener('click', () => {
    console.log('Usuario contactó por WhatsApp');
    // Tu código aquí
});
```

---

## 📊 Tracking y Métricas

### **Eventos de Analytics Capturados**

1. **Click en botón**
   - Event: `click`
   - Category: `WhatsApp`
   - Label: `Botón Flotante`
   - Value: `1`

2. **Visualización de tooltip**
   - Implícito (después de 5 segundos)

3. **Cierre de tooltip**
   - Manual o automático

### **LocalStorage Keys**

```javascript
// Estado del badge
localStorage.getItem('whatsapp_clicked') // 'true' | null

// Estado del tooltip
localStorage.getItem('whatsapp_tooltip_shown') // 'true' | null
```

---

## 🎨 Variables CSS Personalizables

```css
/* Ubicación */
--whatsapp-bottom: 30px;
--whatsapp-left: 30px;

/* Colores */
--whatsapp-primary: #25D366;
--whatsapp-secondary: #128C7E;

/* Tamaños */
--whatsapp-size: 60px;
--whatsapp-icon-size: 32px;

/* Animaciones */
--whatsapp-animation-duration: 2.5s;
```

---

## 🔄 Personalización Fácil

### **Cambiar Número de WhatsApp**

**HTML:**
```html
<a href="https://wa.me/[TU_NUMERO]?text=[TU_MENSAJE]"
```

**Ejemplo:**
```html
https://wa.me/573001234567?text=Hola!%20Quiero%20información
```

### **Cambiar Mensaje Predeterminado**

```javascript
// URL encode: espacios = %20, ! = %21, ? = %3F
const mensaje = encodeURIComponent("Tu mensaje aquí");
const url = `https://wa.me/573135212887?text=${mensaje}`;
```

### **Cambiar Posición del Botón**

```css
.btn-whatsapp-flotante {
    /* Opciones de posición */
    bottom: 30px; /* Superior: top: 30px */
    left: 30px;   /* Derecha: right: 30px */
}
```

### **Ocultar Badge Permanentemente**

```css
.badge-whatsapp {
    display: none !important;
}
```

### **Cambiar Colores**

```css
.btn-whatsapp-flotante {
    background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

---

## ⚡ Performance

### **Optimizaciones Implementadas**

1. **CSS Transform**: Usa GPU acceleration para animaciones
2. **will-change**: Preparación de capas para transiciones
3. **Lazy Loading**: Tooltip se carga solo cuando es necesario
4. **Event Delegation**: Minimiza listeners
5. **LocalStorage**: Evita re-renderizados innecesarios
6. **SVG Inline**: Reduce peticiones HTTP
7. **CSS Containment**: `contain: layout paint` (implícito)

### **Métricas Esperadas**

- **First Paint**: Sin impacto (<5ms)
- **TTI (Time to Interactive)**: Sin bloqueo
- **CLS (Cumulative Layout Shift)**: 0 (fixed positioning)
- **FCP (First Contentful Paint)**: Sin retraso
- **Animaciones**: 60fps consistentes

---

## 🧪 Tests Recomendados

### **Funcionales**
- [ ] Clic abre WhatsApp en nueva pestaña
- [ ] Badge desaparece después del primer clic
- [ ] Tooltip aparece a los 5 segundos
- [ ] Tooltip cierra automáticamente a los 8 segundos
- [ ] Hover muestra texto en desktop
- [ ] No interfiere con botón de instalación

### **Responsive**
- [ ] Funciona en desktop (>768px)
- [ ] Funciona en tablet (768px)
- [ ] Funciona en móvil (480px)
- [ ] Funciona en ultra móvil (360px)
- [ ] No se superpone con otros elementos

### **Accesibilidad**
- [ ] Focusable con teclado (Tab)
- [ ] Activable con Enter/Space
- [ ] Screen reader anuncia correctamente
- [ ] Contraste WCAG AA mínimo 4.5:1
- [ ] Área táctil mínima 44x44px

### **Performance**
- [ ] Animaciones a 60fps
- [ ] Sin reflows innecesarios
- [ ] Sin memory leaks en localStorage
- [ ] Carga sin bloquear rendering

### **Compatibilidad**
- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Opera 76+
- [ ] Navegadores móviles iOS/Android

---

## 🐛 Troubleshooting

### **Problema: El botón no aparece**

**Solución:**
```javascript
// Verificar en consola:
const btn = document.getElementById('btnWhatsAppFlotante');
console.log(btn); // Debe existir

// Verificar CSS:
console.log(getComputedStyle(btn).display); // No debe ser 'none'
```

### **Problema: El badge no se oculta**

**Solución:**
```javascript
// Limpiar localStorage:
localStorage.removeItem('whatsapp_clicked');
location.reload();
```

### **Problema: Animaciones no funcionan**

**Solución:**
```javascript
// Verificar prefers-reduced-motion:
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
console.log(prefersReduced.matches); // Si es true, animaciones deshabilitadas
```

### **Problema: WhatsApp no abre**

**Solución:**
```javascript
// Verificar URL:
const url = document.getElementById('btnWhatsAppFlotante').href;
console.log(url); // Debe empezar con https://wa.me/

// Formato correcto:
// https://wa.me/[CÓDIGO_PAÍS][NÚMERO]?text=[MENSAJE]
```

---

## 📱 Integración con CMS

### **Campos Sugeridos**

```json
{
  "whatsapp": {
    "enabled": true,
    "phoneNumber": "573135212887",
    "defaultMessage": "Hola! Estoy interesado en sus productos congelados 🍗",
    "badgeCount": 1,
    "showTooltip": true,
    "tooltipDelay": 5000,
    "position": {
      "desktop": { "bottom": 30, "left": 30 },
      "mobile": { "bottom": 90, "left": 15 }
    }
  }
}
```

---

## 🎯 Roadmap / Mejoras Futuras

### **Fase 1 (Implementado) ✅**
- ✅ Botón flotante básico
- ✅ Animaciones y efectos
- ✅ Badge de notificación
- ✅ Tooltip inteligente
- ✅ Responsive completo
- ✅ Modo oscuro
- ✅ Accesibilidad

### **Fase 2 (Sugerido) 🚧**
- [ ] Chat preview (últimos mensajes)
- [ ] Horario de atención dinámico
- [ ] Multiple agents (selector)
- [ ] Respuestas rápidas
- [ ] Historial de conversación
- [ ] Notificaciones push

### **Fase 3 (Futuro) 💡**
- [ ] Integración con CRM
- [ ] Bot automático (primera respuesta)
- [ ] A/B testing de mensajes
- [ ] Heatmap de clics
- [ ] Análisis de conversión

---

## 📚 Referencias

### **Guías de Diseño**
- [Material Design - FAB](https://material.io/components/buttons-floating-action-button)
- [WhatsApp Brand Guidelines](https://www.whatsapp.com/brand)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### **Accesibilidad**
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### **Performance**
- [Web.dev - Performance](https://web.dev/performance/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

## 📄 Changelog

### **v1.0.0 - 6 de noviembre de 2025**
- ✨ Implementación inicial
- 🎨 Diseño profesional con gradientes
- 🚀 Animaciones suaves (pulso, ondas)
- 📱 Responsive completo
- ♿ Accesibilidad WCAG 2.1
- 🌙 Soporte modo oscuro
- 💾 Persistencia con localStorage
- 📊 Integración Google Analytics
- 🔔 Sistema de badge inteligente
- 💬 Tooltip contextual

---

## 👥 Créditos

**Desarrollado por**: GitHub Copilot  
**Fecha**: 6 de noviembre de 2025  
**Proyecto**: Alimento del Cielo - Catálogo Digital PWA  
**Cliente**: Congelados Montelíbano  
**Versión**: 1.0.0  

---

## 📞 Soporte

Para modificaciones, dudas o soporte técnico, contactar al equipo de desarrollo.

**WhatsApp Empresa**: +57 313 521 2887  
**Email**: [A COMPLETAR]  
**Documentación**: Este archivo (BOTON_WHATSAPP.md)

---

**Estado**: ✅ **Completado y listo para producción**
