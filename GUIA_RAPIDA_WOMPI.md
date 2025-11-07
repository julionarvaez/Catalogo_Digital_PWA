# 🚀 GUÍA RÁPIDA: CONFIGURAR WOMPI EN 5 MINUTOS

## ✅ RESUMEN EJECUTIVO

Tu código de Wompi está **100% funcional**. Solo necesitas configurar las llaves API.

**¿Necesitas Firebase?** ❌ **NO** para pagos. Solo para reseñas (opcional).

---

## 📋 CHECKLIST DE CONFIGURACIÓN

### ✅ Paso 1: Obtener Llaves de Wompi (5 min)

1. Ve a [Wompi](https://wompi.co/) y crea una cuenta
2. Accede a [Comercios Wompi](https://comercios.wompi.co/)
3. Ve a **Configuración** → **API Keys**
4. Copia estas llaves:
   - **Llave pública de prueba**: `pub_test_XXXXXX`
   - **Llave privada de prueba**: `prv_test_XXXXXX`
   - **Llave pública de producción**: `pub_prod_XXXXXX`
   - **Llave privada de producción**: `prv_prod_XXXXXX`

---

### ✅ Paso 2: Configurar Variables en Netlify (2 min)

1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Selecciona tu sitio
3. Ve a **Site settings** → **Environment variables**
4. Agrega estas 3 variables:

```
Variable: WOMPI_PUBLIC_KEY
Valor: pub_prod_TU_LLAVE_PUBLICA_AQUI
```

```
Variable: WOMPI_PRIVATE_KEY
Valor: prv_prod_TU_LLAVE_PRIVADA_AQUI
```

```
Variable: URL
Valor: https://tu-sitio.netlify.app
```

---

### ✅ Paso 3: Actualizar script.js (1 min)

Abre `script.js` y busca la línea **2237** (busca `WOMPI_CONFIG`).

Cambia esto:

```javascript
const WOMPI_CONFIG = {
    publicKey: 'pub_test_QhUoFSL5mYyzHcfweWwfHT4JNI3jHujU', // ❌ Llave de prueba
    apiUrl: 'https://production.wompi.co/v1',
    backendUrl: '/.netlify/functions',
    moneda: 'COP'
};
```

Por esto:

```javascript
const WOMPI_CONFIG = {
    publicKey: 'pub_prod_TU_LLAVE_PUBLICA_REAL', // ✅ Tu llave de producción
    apiUrl: 'https://production.wompi.co/v1',
    backendUrl: '/.netlify/functions',
    moneda: 'COP'
};
```

---

### ✅ Paso 4: Desplegar (1 min)

```powershell
git add .
git commit -m "Configurar Wompi con llaves de producción"
git push origin main
```

Netlify desplegará automáticamente en 1-2 minutos.

---

### ✅ Paso 5: Probar Pago (1 min)

1. Ve a tu sitio: `https://tu-sitio.netlify.app`
2. Agrega productos al carrito
3. Haz clic en **"Pagar con Wompi"**
4. Completa tus datos
5. Usa tarjeta de prueba:
   - **Número**: `4242 4242 4242 4242`
   - **CVV**: `123`
   - **Fecha**: Cualquier fecha futura
   - **Nombre**: Tu nombre

---

## 🎯 ¿FUNCIONÓ?

### ✅ SI FUNCIONÓ
¡Perfecto! Ya puedes recibir pagos reales. Solo cambia las llaves de prueba por las de producción.

### ❌ SI NO FUNCIONÓ
Revisa estos puntos:

1. **Error en variables de entorno**
   - Ve a Netlify Dashboard → Environment variables
   - Verifica que `WOMPI_PUBLIC_KEY` y `WOMPI_PRIVATE_KEY` estén configuradas
   - ¡Sin espacios extras!

2. **Error de CORS**
   - Verifica que `netlify.toml` esté en la raíz del proyecto
   - Haz un nuevo deploy

3. **Error de llave inválida**
   - Verifica que las llaves sean correctas
   - Cópialas de nuevo desde el dashboard de Wompi

4. **Revisa los logs**
   - Ve a Netlify Dashboard → Functions
   - Revisa los logs de `crear-transaccion-wompi` y `verificar-pago-wompi`

---

## 🔥 FIREBASE (OPCIONAL)

### ¿Lo necesitas para PAGOS?
❌ **NO**. Firebase NO es necesario para Wompi.

### ¿Para qué sirve Firebase en tu proyecto?
✅ Solo para el **sistema de reseñas de productos** (opcional).

### ¿Cómo configurar Firebase? (si lo necesitas)
Lee el archivo: `CONFIGURACION_FIREBASE.md`

Variables de entorno adicionales:
```
FIREBASE_PROJECT_ID = tu-proyecto-id
FIREBASE_SERVICE_ACCOUNT_B64 = base64_de_tu_service_account
```

---

## 📊 ARQUITECTURA ACTUAL

```
FRONTEND (script.js)
    ↓
    Captura datos del cliente
    ↓
NETLIFY FUNCTION (crear-transaccion-wompi.js)
    ↓
    Crea transacción en Wompi API
    ↓
WOMPI CHECKOUT
    ↓
    Cliente paga con tarjeta/PSE/Nequi
    ↓
PÁGINA CONFIRMACIÓN (confirmacion-pago.html)
    ↓
NETLIFY FUNCTION (verificar-pago-wompi.js)
    ↓
    Verifica estado en Wompi API
    ↓
RESULTADO (Aprobado/Rechazado/Pendiente)
```

**Firebase NO está en este flujo** ✅

---

## 🆘 SOPORTE RÁPIDO

### Error: "WOMPI_PUBLIC_KEY no está configurado"
```
Solución: Configura la variable en Netlify Dashboard
```

### Error: "No se recibió URL de checkout"
```
Solución: Verifica que WOMPI_PRIVATE_KEY sea correcta
```

### El pago no se confirma
```
Solución: 
1. Espera 30 segundos después del pago
2. Recarga la página de confirmación
3. Revisa que la URL de tu sitio esté en las variables de entorno
```

### No aparece el botón de pago
```
Solución: Revisa la consola del navegador (F12)
Verifica que script.js se esté cargando correctamente
```

---

## 📞 CONTACTO WOMPI

- **Soporte**: soporte@wompi.co
- **WhatsApp**: +57 350 305 0569
- **Documentación**: https://docs.wompi.co

---

## ✅ CHECKLIST FINAL

- [ ] Cuenta en Wompi creada
- [ ] Llaves API copiadas
- [ ] Variables configuradas en Netlify
- [ ] script.js actualizado con llave pública
- [ ] Código desplegado con `git push`
- [ ] Pago de prueba realizado exitosamente
- [ ] ¡Listo para recibir pagos! 🎉

---

**Tiempo total de configuración**: ⏱️ **10 minutos**

**Nivel de dificultad**: ⭐ **Fácil**

**¿Necesitas ayuda?** Revisa los logs en Netlify Functions.
