# 🎉 Sistema de Referidos - Alimento del Cielo

## 📋 Descripción General

Sistema completo de referidos que permite a los usuarios compartir códigos y obtener descuentos en sus compras.

## ✨ Características Implementadas

### 1. Generación de Códigos
- ✅ Código único por usuario (formato: AMIGO-VIP-123)
- ✅ Persistencia en localStorage
- ✅ No regeneración automática

### 2. Captura de Referidos
- ✅ Detección automática desde URL (`?ref=CODIGO`)
- ✅ Validación anti-autorreferido
- ✅ Banner de bienvenida con descuento
- ✅ Limpieza de URL sin recargar página

### 3. Descuentos Automáticos
- ✅ 10% de descuento en primera compra
- ✅ Cálculo automático en el carrito
- ✅ Visualización del descuento aplicado
- ✅ Prevención de uso múltiple

### 4. Compartir Código
- ✅ Botón de compartir nativo (mobile)
- ✅ Copiar al portapapeles (desktop)
- ✅ Copiar enlace directo
- ✅ Mensaje predefinido con beneficios

### 5. Métricas y Seguimiento
- ✅ Contador de referidos activos
- ✅ Lista de pedidos por referido
- ✅ Historial de compartidos
- ✅ Fecha y monto de cada referido

## 🔄 Flujo de Uso

### Para el que Comparte (Referidor)

1. **Generar código**
   ```javascript
   // Se genera automáticamente al cargar la página
   // Formato: FAMILIA-PREMIUM-456
   ```

2. **Compartir código**
   - Click en "📱 Compartir mi código"
   - Click en "📋 Copiar enlace"
   - Se copia: `https://tudominio.com?ref=FAMILIA-PREMIUM-456`

3. **Ver métricas**
   - Sección "Programa de Referidos"
   - Contador actualizado en tiempo real
   - Lista de referidos con fechas y montos

### Para el que Usa el Código (Referido)

1. **Llegar con el enlace**
   - Click en enlace compartido
   - URL: `?ref=FAMILIA-PREMIUM-456`

2. **Banner de bienvenida**
   - Se muestra automáticamente
   - Mensaje: "¡Descuento Aplicado! 10% OFF"
   - Auto-cierra en 10 segundos

3. **Agregar productos al carrito**
   - Descuento se aplica automáticamente
   - Visible en el total del carrito

4. **Finalizar compra**
   - Descuento incluido en WhatsApp
   - Se guarda en historial

## 💾 Estructura de Datos

### localStorage Keys

```javascript
// Código propio del usuario
'miCodigoReferido': 'AMIGO-VIP-883'

// Código del referente (quien te invitó)
'referenteActivo': 'FAMILIA-PREMIUM-456'

// Timestamp de cuando se capturó el referido
'referenteTimestamp': '1701628800000'

// Flag de si ya se usó el descuento
'descuentoReferidoAplicado': 'false'

// Historial de pedidos con referidos
'historialPedidosAlimento': [{
  id: 'PED-1701628800000',
  items: [...],
  subtotal: 50000,
  descuentoReferido: 5000,
  total: 45000,
  referente: 'FAMILIA-PREMIUM-456',
  timestamp: '2024-12-03T...'
}]

// Conteo de referidos por código
'referidosConteo': {
  'AMIGO-VIP-883': 3,
  'FAMILIA-PREMIUM-456': 7
}

// Compartidos realizados
'referidosCompartidos': [{
  codigo: 'AMIGO-VIP-883',
  timestamp: 1701628800000
}]
```

## 🎨 UI/UX

### Banner de Descuento
- **Posición**: Fixed top center
- **Animación**: Slide down
- **Duración**: 10 segundos auto-close
- **Color**: Gradiente verde (#10b981)

### Descuento en Carrito
- **Ubicación**: Antes del total
- **Animación**: Pulse effect
- **Formato**: "🎁 Descuento (CODIGO): -$5,000"

### Sección de Referidos
- **Código visible**: Grande y centrado
- **Botones de compartir**: Azul y naranja
- **Métricas**: Contador animado
- **Lista**: Tarjetas con detalles

## 🔧 Funciones Principales

### `generarCodigoReferido()`
Genera un código único si no existe.

### `compartirCodigoReferido()`
Comparte el código usando Web Share API o clipboard.

### `copiarEnlaceReferido()`
Copia el enlace directo al portapapeles.

### `capturarCodigoReferenteDesdeURL()`
Detecta y guarda el código desde `?ref=`.

### `calcularDescuentoReferido(subtotal)`
Calcula el 10% de descuento si aplica.

### `actualizarMetricasReferidos()`
Actualiza contador y lista en la UI.

### `mostrarBannerDescuentoReferido(codigo)`
Muestra el banner de bienvenida.

## 📱 Responsive

- **Desktop**: Banner centrado, botones en línea
- **Mobile**: Banner 95% ancho, botones apilados
- **Tablet**: Adaptación automática

## 🎯 Validaciones

1. **Anti-autorreferido**: No puedes usar tu propio código
2. **Código único**: Un usuario solo puede tener un referente
3. **Descuento único**: Solo se aplica en la primera compra
4. **Formato válido**: Regex `^[A-Z0-9\-]{5,30}$`

## 🚀 Testing

### Probar el Sistema

1. **Generar código**
   ```javascript
   // Abre la consola
   localStorage.clear() // Limpiar datos
   location.reload()
   // Verifica que aparezca un código
   ```

2. **Simular referido**
   ```javascript
   // Agrega ?ref=AMIGO-VIP-123 a la URL
   location.href = location.origin + location.pathname + '?ref=AMIGO-VIP-123'
   ```

3. **Verificar descuento**
   ```javascript
   // Agrega productos al carrito
   // Verifica que aparezca el descuento
   console.log(calcularDescuentoReferido(10000)) // Debe retornar 1000
   ```

## 📊 Métricas Actuales

El sistema rastrea:
- ✅ Total de referidos por código
- ✅ Fecha de cada referido
- ✅ Monto de cada pedido referido
- ✅ Veces que se compartió el código

## 🔄 Mejoras Futuras

- [ ] Backend para sincronizar referidos
- [ ] Recompensas por cantidad de referidos
- [ ] Códigos promocionales personalizados
- [ ] Estadísticas avanzadas (gráficos)
- [ ] Notificaciones push cuando alguien usa tu código
- [ ] Sistema de niveles (Bronce, Plata, Oro)

## 🐛 Troubleshooting

### El descuento no se aplica
- Verifica que `descuentoReferidoAplicado` sea `'false'`
- Verifica que exista `referenteActivo` en localStorage
- Limpia localStorage y vuelve a usar el enlace

### El código no se genera
- Abre la consola y busca errores
- Verifica que `generarCodigoReferido()` se ejecute
- Revisa que el elemento `#codigoReferido` exista

### Las métricas no se actualizan
- Verifica que `actualizarMetricasReferidos()` se llame
- Revisa el formato de datos en localStorage
- Limpia y regenera los datos

## 📞 Soporte

Para dudas o problemas:
- WhatsApp: +57 313 521 2887
- Email: contacto@alimentodelcielo.com

---

**Última actualización**: 3 de diciembre de 2025
**Versión**: 1.0.0
