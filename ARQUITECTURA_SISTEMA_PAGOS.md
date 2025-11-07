# 🏗️ ARQUITECTURA DEL SISTEMA DE PAGOS

## 📊 DIAGRAMA DE FLUJO COMPLETO

```
┌─────────────────────────────────────────────────────────────────┐
│                      USUARIO FINAL                              │
│                    (Navegador Web)                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 1. Ve catálogo y agrega productos
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND - index.html                        │
│                    + script.js (Líneas 2230-2600)               │
│                                                                 │
│  • Muestra productos del catálogo                              │
│  • Gestiona carrito de compras (localStorage)                 │
│  • Captura datos del cliente (email, nombre, tel)             │
│  • Valida formularios                                          │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 2. Click en "Pagar con Wompi"
                 │ POST /api/crear-transaccion-wompi
                 │ Body: {monto, referencia, email, productos}
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              NETLIFY FUNCTION (Serverless)                      │
│         crear-transaccion-wompi.js                              │
│                                                                 │
│  • Recibe datos del pedido                                     │
│  • Valida datos requeridos                                     │
│  • Lee variables de entorno:                                   │
│    - WOMPI_PUBLIC_KEY                                          │
│    - WOMPI_PRIVATE_KEY                                         │
│    - URL (sitio)                                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 3. POST a Wompi API
                 │ https://production.wompi.co/v1/transactions
                 │ Headers: Authorization Bearer {PRIVATE_KEY}
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      WOMPI API                                  │
│              (Plataforma de pagos)                              │
│                                                                 │
│  • Valida credenciales                                         │
│  • Crea transacción                                            │
│  • Genera checkout_url                                         │
│  • Retorna: {id, status, checkout_url}                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 4. Retorna respuesta
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              NETLIFY FUNCTION                                   │
│         crear-transaccion-wompi.js                              │
│                                                                 │
│  • Recibe respuesta de Wompi                                   │
│  • Extrae checkout_url                                         │
│  • Retorna al frontend                                         │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 5. Retorna: {exito: true, checkout_url}
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND - script.js                         │
│                                                                 │
│  • Recibe checkout_url                                         │
│  • Guarda pedido en localStorage                              │
│  • Redirige al usuario                                         │
│    window.location.href = checkout_url                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 6. Redirección
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   WOMPI CHECKOUT                                │
│            (checkout.wompi.co)                                  │
│                                                                 │
│  • Formulario de pago seguro                                   │
│  • Usuario ingresa datos de tarjeta/PSE/Nequi                │
│  • Procesa el pago                                             │
│  • Valida con banco/entidad financiera                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 7. Pago procesado
                 │ Redirige a: tu-sitio/confirmacion-pago?id=XXXX
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              PÁGINA DE CONFIRMACIÓN                             │
│            confirmacion-pago.html                               │
│                                                                 │
│  • Captura parámetro ?id=TRANSACTION_ID de la URL             │
│  • Muestra loader "Verificando pago..."                       │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 8. GET /api/verificar-pago-wompi?id=XXXX
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              NETLIFY FUNCTION (Serverless)                      │
│         verificar-pago-wompi.js                                 │
│                                                                 │
│  • Recibe ID de transacción                                    │
│  • Consulta estado en Wompi API                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 9. GET a Wompi API
                 │ https://production.wompi.co/v1/transactions/{id}
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      WOMPI API                                  │
│                                                                 │
│  • Valida credenciales                                         │
│  • Consulta transacción                                        │
│  • Retorna estado completo                                     │
│    {id, status, amount, reference, ...}                       │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 10. Retorna estado
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              NETLIFY FUNCTION                                   │
│         verificar-pago-wompi.js                                 │
│                                                                 │
│  • Recibe estado de Wompi                                      │
│  • Retorna al frontend                                         │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 11. Retorna: {exito: true, data: {...}}
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              PÁGINA DE CONFIRMACIÓN                             │
│            confirmacion-pago.html                               │
│                                                                 │
│  • Recibe estado de la transacción                            │
│  • Muestra resultado según estado:                            │
│    ✅ APPROVED  → "¡Pago aprobado!"                           │
│    ❌ DECLINED  → "Pago rechazado"                            │
│    ⏳ PENDING   → "Pago pendiente"                            │
│    🚫 VOIDED    → "Pago anulado"                              │
│  • Muestra detalles (referencia, monto, etc.)                 │
│  • Limpia carrito si fue aprobado                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 SEGURIDAD

### Datos Sensibles (Backend)
```
┌──────────────────────────────┐
│ Variables de Entorno         │
│ (Netlify Dashboard)          │
│                              │
│ • WOMPI_PRIVATE_KEY         │
│   ❌ NUNCA en el frontend    │
│   ✅ Solo en Functions       │
│                              │
│ • WOMPI_PUBLIC_KEY          │
│   ✅ Se puede exponer        │
└──────────────────────────────┘
```

### Flujo de Autenticación
```
Frontend → Netlify Function → Wompi API
           ↑
           Usa WOMPI_PRIVATE_KEY
           (segura, no visible al usuario)
```

---

## 📦 COMPONENTES DEL SISTEMA

### 1. Frontend (Cliente)
| Archivo | Líneas | Función |
|---------|--------|---------|
| `index.html` | Todas | Catálogo de productos |
| `script.js` | 1-2229 | Lógica general (carrito, UI, etc) |
| `script.js` | 2230-2600 | **Integración Wompi** |
| `confirmacion-pago.html` | Todas | Página de confirmación |

### 2. Backend (Serverless)
| Archivo | Función |
|---------|---------|
| `crear-transaccion-wompi.js` | Crea transacción en Wompi |
| `verificar-pago-wompi.js` | Verifica estado del pago |

### 3. Configuración
| Archivo | Propósito |
|---------|-----------|
| `netlify.toml` | Config de despliegue y variables |
| `package.json` | Dependencias (node-fetch) |

---

## 🔄 ESTADOS DE PAGO

```
PENDING (⏳)
  ↓
  ├─→ APPROVED (✅)   → Pago exitoso
  ├─→ DECLINED (❌)   → Pago rechazado
  └─→ VOIDED (🚫)     → Pago anulado
```

### Tabla de Estados

| Estado | Descripción | Acción |
|--------|-------------|--------|
| `PENDING` | Pago en proceso | Esperar |
| `APPROVED` | Pago aprobado | ✅ Despachar pedido |
| `DECLINED` | Pago rechazado | ❌ Pedir otro método |
| `VOIDED` | Pago anulado | 🚫 Cancelar pedido |

---

## 🌐 ENDPOINTS

### Frontend → Backend (Netlify Functions)

```
POST /.netlify/functions/crear-transaccion-wompi
Content-Type: application/json

Body:
{
  "monto": 50000,
  "moneda": "COP",
  "referencia": "ADC-1699290847123-abc123",
  "email": "cliente@email.com",
  "nombre": "Juan Pérez",
  "telefono": "3001234567",
  "direccion": "Calle 123 #45-67",
  "productos": [
    {
      "nombre": "Pollo Semicriollo",
      "cantidad": 2,
      "precio": 25000
    }
  ]
}

Response:
{
  "exito": true,
  "checkout_url": "https://checkout.wompi.co/...",
  "referencia": "ADC-1699290847123-abc123"
}
```

```
GET /.netlify/functions/verificar-pago-wompi?id=TRANSACTION_ID

Response:
{
  "exito": true,
  "data": {
    "id": "26526-1699290847-12345",
    "status": "APPROVED",
    "amount_in_cents": 5000000,
    "reference": "ADC-1699290847123-abc123",
    "payment_method_type": "CARD",
    ...
  }
}
```

---

## 🔌 INTEGRACIONES EXTERNAS

### Wompi API

```
Base URL: https://production.wompi.co/v1

Endpoints usados:
1. POST /transactions
   - Crea nueva transacción
   - Requiere: Authorization Bearer {PRIVATE_KEY}

2. GET /transactions/{id}
   - Consulta estado de transacción
   - Requiere: Authorization Bearer {PUBLIC_KEY}
```

---

## 💾 ALMACENAMIENTO

### LocalStorage (Frontend)
```javascript
{
  // Carrito actual
  "carritoAlimentoDelCielo": [
    {
      "id": 1,
      "nombre": "Pollo",
      "precio": 25000,
      "cantidad": 2
    }
  ],
  
  // Historial de pedidos
  "pedidosWompi": [
    {
      "referencia": "ADC-1699290847123-abc123",
      "fecha": "2025-11-06T10:30:00.000Z",
      "estado": "pendiente",
      "datos": {...},
      "carrito": [...]
    }
  ],
  
  // Último pedido (para referencia rápida)
  "ultimoPedido": {...}
}
```

---

## ⚡ DEPENDENCIAS

### package.json
```json
{
  "dependencies": {
    "node-fetch": "^2.6.7",      // Para hacer requests HTTP
    "firebase-admin": "^11.11.1"  // Solo para reseñas (opcional)
  }
}
```

**Para Wompi solo necesitas**: `node-fetch`

---

## 🎯 RESUMEN DE RESPONSABILIDADES

| Componente | Responsable de |
|------------|----------------|
| **Frontend** | UI, validación de formularios, redirección |
| **Netlify Functions** | Comunicación segura con Wompi API |
| **Wompi API** | Procesar pagos, validar tarjetas |
| **Firebase** | ❌ NO usado para pagos. Solo reseñas (opcional) |

---

## 🔥 ¿POR QUÉ NO SE USA FIREBASE PARA PAGOS?

### Razones:
1. ✅ **Wompi es un servicio completo** de pagos
2. ✅ **No necesitas base de datos** para transacciones
3. ✅ **Wompi almacena** todo el historial de transacciones
4. ✅ **Más simple**: Menos servicios = menos complejidad

### Firebase solo se usa para:
- 📝 Sistema de reseñas de productos (opcional)
- 💬 Comentarios de clientes (opcional)

**Conclusión**: Pagos = Wompi solo. Firebase = Opcional para reseñas.

---

## 📈 ESCALABILIDAD

### Límites actuales:
- ✅ **Netlify Functions**: 125,000 invocaciones/mes (gratis)
- ✅ **Wompi**: Sin límite de transacciones
- ✅ **LocalStorage**: ~5MB por navegador

### Para escalar:
- Usar base de datos real (Firebase, MongoDB, PostgreSQL)
- Implementar webhooks de Wompi
- Sistema de notificaciones por email

---

**Versión**: 1.0  
**Fecha**: 6 de noviembre de 2025  
**Estado**: ✅ Producción
