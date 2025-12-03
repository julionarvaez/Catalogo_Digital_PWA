# ⚠️ CONFIGURACIÓN URGENTE REQUERIDA

## 🚨 ERROR ACTUAL: "Servidor no configurado correctamente"

Este error ocurre porque **las variables de entorno NO están configuradas en Netlify**.

---

## ✅ SOLUCIÓN INMEDIATA (5 minutos)

### Paso 1: Ir a Netlify Dashboard

1. Ve a: https://app.netlify.com
2. Selecciona tu sitio: **Catalogo_Digital_PWA**
3. Ve a: **Site Settings** → **Environment Variables**

### Paso 2: Agregar Variables de Entorno

Haz clic en **"Add a variable"** y agrega estas 3 variables:

#### Variable 1: WOMPI_PUBLIC_KEY
```
Key: WOMPI_PUBLIC_KEY
Value: pub_prod_oBaaR0X7Wr4IAHkaFEWbZU1orcnq9vNf
Scopes: All deploys
```

#### Variable 2: WOMPI_PRIVATE_KEY
```
Key: WOMPI_PRIVATE_KEY
Value: [OBTENER DE WOMPI DASHBOARD]
Scopes: All deploys
```

#### Variable 3: WOMPI_INTEGRITY_SECRET
```
Key: WOMPI_INTEGRITY_SECRET
Value: [OBTENER DE WOMPI DASHBOARD]
Scopes: All deploys
```

#### Variable 4: URL (opcional pero recomendada)
```
Key: URL
Value: https://alimentodelcielo-congeladosmonteliban.netlify.app
Scopes: All deploys
```

---

## 🔑 Cómo Obtener las Credenciales de Wompi

### Para Ambiente de PRODUCCIÓN

1. **Ve a:** https://comercios.wompi.co/
2. **Inicia sesión** con tu cuenta de Wompi
3. **Ve a:** Configuración → **Credenciales de producción**
4. **Copia:**
   - **Public Key** (comienza con `pub_prod_`)
   - **Private Key** (comienza con `prv_prod_`)
   - **Integrity Secret** (comienza con `prod_integrity_`)

### Para Ambiente de PRUEBAS (Testing)

Si primero quieres probar con credenciales de prueba:

1. **Ve a:** https://comercios.wompi.co/
2. **Ve a:** Configuración → **Credenciales de prueba**
3. **Copia:**
   - **Public Key** (comienza con `pub_test_`)
   - **Private Key** (comienza con `prv_test_`)
   - **Integrity Secret** (comienza con `test_integrity_`)

---

## 📋 Ejemplo de Variables Configuradas

```bash
WOMPI_PUBLIC_KEY=pub_prod_oBaaR0X7Wr4IAHkaFEWbZU1orcnq9vNf
WOMPI_PRIVATE_KEY=prv_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxx
WOMPI_INTEGRITY_SECRET=prod_integrity_xxxxxxxxxxxxxxxxx
URL=https://alimentodelcielo-congeladosmonteliban.netlify.app
NODE_ENV=production
```

---

## 🚀 Paso 3: Hacer Deploy

Después de agregar las variables:

1. **Ve a:** Deploys
2. **Haz clic en:** "Trigger deploy"
3. **Selecciona:** "Clear cache and deploy site"
4. **Espera** a que termine el deploy (1-2 minutos)

---

## ✅ Paso 4: Verificar que Funciona

1. **Abre tu sitio:** https://alimentodelcielo-congeladosmonteliban.netlify.app
2. **Agrega productos al carrito**
3. **Haz clic en "Pagar con Wompi"**
4. **Deberías ver** el widget de Wompi (NO el error 500)

---

## 🐛 Si Aún Hay Errores

### Ver Logs de la Función

1. **Netlify Dashboard** → tu sitio
2. **Functions** en el menú lateral
3. **Selecciona:** `crear-transaccion-wompi`
4. **Ve el Log** para ver el error exacto

### Verificar Variables

En los logs, deberías ver:
```
✅ Transacción creada exitosamente: { referencia, monto, email }
```

Si ves:
```
❌ Errores de configuración: [ 'WOMPI_INTEGRITY_SECRET no configurada' ]
```

Significa que falta configurar esa variable.

---

## 📞 Soporte

### Documentación Completa
- `CONFIGURACION-NETLIFY-WOMPI.md` - Guía detallada paso a paso
- `RESUMEN-CORRECCIONES.md` - Resumen técnico
- `EJEMPLOS-USO.md` - Ejemplos de código

### Enlaces Útiles
- **Wompi Dashboard:** https://comercios.wompi.co/
- **Netlify Dashboard:** https://app.netlify.com
- **Documentación Wompi:** https://docs.wompi.co/

---

## ⏱️ Tiempo Estimado

- **Obtener credenciales:** 2 minutos
- **Configurar variables:** 2 minutos
- **Deploy:** 1-2 minutos
- **Total:** ~5 minutos

---

## 🎯 Checklist Rápido

- [ ] Obtener credenciales de Wompi Dashboard
- [ ] Agregar WOMPI_PUBLIC_KEY en Netlify
- [ ] Agregar WOMPI_PRIVATE_KEY en Netlify
- [ ] Agregar WOMPI_INTEGRITY_SECRET en Netlify
- [ ] Agregar URL en Netlify (opcional)
- [ ] Trigger deploy en Netlify
- [ ] Probar pago en el sitio web
- [ ] Verificar que no hay error 500

---

**🚨 IMPORTANTE:** Sin estas variables configuradas, **NO FUNCIONARÁN LOS PAGOS**.

**Última actualización:** 26 de noviembre de 2025
