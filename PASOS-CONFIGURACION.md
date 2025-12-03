# 🚨 INSTRUCCIONES PASO A PASO - CONFIGURAR NETLIFY

## ✅ El código está CORRECTO - Solo falta configuración

---

## 📋 PASOS PARA SOLUCIONAR (10 minutos)

### 🔑 Paso 1: Obtener Credenciales de Wompi (3 minutos)

1. **Abre una nueva pestaña y ve a:**
   ```
   https://comercios.wompi.co/
   ```

2. **Inicia sesión** con tu cuenta de Wompi

3. **En el menú lateral, haz clic en:** ⚙️ Configuración

4. **Selecciona:**
   - Para pruebas: "Credenciales de prueba"
   - Para producción: "Credenciales de producción"

5. **Copia estas 3 llaves** (déjalas abiertas en otra pestaña):
   - ✅ **Public Key** (ejemplo: `pub_test_xxxxx` o `pub_prod_xxxxx`)
   - ✅ **Private Key** (ejemplo: `prv_test_xxxxx` o `prv_prod_xxxxx`)
   - ✅ **Integrity Secret** (ejemplo: `test_integrity_xxxxx` o `prod_integrity_xxxxx`)

---

### 🌐 Paso 2: Configurar Variables en Netlify (5 minutos)

1. **Abre Netlify Dashboard:**
   ```
   https://app.netlify.com
   ```

2. **Selecciona tu sitio:**
   - Busca: "Catalogo_Digital_PWA" o "alimentodelcielo-congeladosmonteliban"

3. **Ve a configuración:**
   - Haz clic en **"Site settings"** (arriba a la derecha)

4. **Ve a variables de entorno:**
   - En el menú lateral izquierdo, busca: **"Environment variables"**
   - O ve directamente a: Site settings > Build & deploy > Environment

5. **Agrega las variables:**

   **Haz clic en "Add a variable"** y agrega UNA POR UNA:

   #### Variable 1:
   ```
   Key: WOMPI_PUBLIC_KEY
   Value: [pega aquí tu Public Key de Wompi]
   ```
   - Scope: Selecciona "All deploys"
   - Haz clic en "Create variable"

   #### Variable 2:
   ```
   Key: WOMPI_PRIVATE_KEY
   Value: [pega aquí tu Private Key de Wompi]
   ```
   - Scope: Selecciona "All deploys"
   - Haz clic en "Create variable"

   #### Variable 3: ⚠️ **ESTA ES LA QUE FALTA Y CAUSA EL ERROR**
   ```
   Key: WOMPI_INTEGRITY_SECRET
   Value: [pega aquí tu Integrity Secret de Wompi]
   ```
   - Scope: Selecciona "All deploys"
   - Haz clic en "Create variable"

   #### Variable 4 (Opcional pero recomendada):
   ```
   Key: URL
   Value: https://alimentodelcielo-congeladosmonteliban.netlify.app
   ```
   - Scope: Selecciona "All deploys"
   - Haz clic en "Create variable"

---

### 🚀 Paso 3: Hacer Deploy (2 minutos)

1. **Ve a la pestaña "Deploys"** (arriba en Netlify)

2. **Haz clic en:** "Trigger deploy" (botón gris en la esquina superior derecha)

3. **Selecciona:** "Clear cache and deploy site"

4. **Espera** a que aparezca el estado "Published" (1-2 minutos)
   - Verás una animación de progreso
   - Cuando termine dirá "Published"

---

### ✅ Paso 4: Verificar que Funciona

1. **Abre tu sitio web:**
   ```
   https://alimentodelcielo-congeladosmonteliban.netlify.app
   ```

2. **Prueba el pago:**
   - Agrega productos al carrito
   - Haz clic en "Pagar con Wompi"
   - Completa el formulario
   - Haz clic en "💳 Pagar con Wompi"

3. **Resultado esperado:**
   - ✅ NO debe aparecer error 500
   - ✅ Debe abrirse el widget de Wompi
   - ✅ Debe redirigirte a la página de pago

---

## 📸 CAPTURAS DE PANTALLA GUÍA

### Cómo se ven las variables en Wompi Dashboard:

```
Credenciales de Producción
───────────────────────────
Public Key:           pub_prod_xxxxxxxxxxxxxxxxx
Private Key:          prv_prod_xxxxxxxxxxxxxxxxx  
Integrity Secret:     prod_integrity_xxxxxxxxxxx
```

### Cómo se ven las variables en Netlify:

```
Environment variables
─────────────────────────────────────────────────
WOMPI_PUBLIC_KEY              pub_prod_xxxxx        All deploys
WOMPI_PRIVATE_KEY             prv_prod_xxxxx        All deploys
WOMPI_INTEGRITY_SECRET        prod_integrity_xxx    All deploys  ← ⚠️ ESTA FALTA
URL                           https://tu-sitio...   All deploys
```

---

## 🐛 Si Aún Hay Problemas

### Verificar que las variables se guardaron:

1. En Netlify, ve a: **Site settings > Environment variables**
2. Deberías ver **4 variables** listadas:
   - ✅ WOMPI_PUBLIC_KEY
   - ✅ WOMPI_PRIVATE_KEY
   - ✅ WOMPI_INTEGRITY_SECRET
   - ✅ URL

### Ver logs del deploy:

1. En Netlify, ve a: **Deploys**
2. Haz clic en el deploy más reciente
3. Haz clic en **"Deploy log"**
4. Busca errores (texto en rojo)

### Ver logs de la función:

1. En Netlify, ve a: **Functions** (menú lateral)
2. Haz clic en: **crear-transaccion-wompi**
3. Ve el **Log**
4. Busca:
   - ✅ `✅ Transacción creada exitosamente` ← Esto es bueno
   - ❌ `❌ Errores de configuración` ← Esto significa que falta algo

---

## 🎯 Checklist de Verificación

Marca cada paso cuando lo completes:

- [ ] Obtuve las credenciales de Wompi Dashboard
- [ ] Agregué WOMPI_PUBLIC_KEY en Netlify
- [ ] Agregué WOMPI_PRIVATE_KEY en Netlify
- [ ] Agregué WOMPI_INTEGRITY_SECRET en Netlify ⚠️ **IMPORTANTE**
- [ ] Agregué URL en Netlify (opcional)
- [ ] Hice "Trigger deploy" en Netlify
- [ ] Esperé a que el deploy termine (status: Published)
- [ ] Probé hacer un pago en el sitio
- [ ] Ya NO aparece el error 500

---

## ❓ Preguntas Frecuentes

### ¿Debo usar credenciales de prueba o producción?

- **Para pruebas:** Usa credenciales de prueba (`pub_test_`, `prv_test_`, `test_integrity_`)
- **Para producción real:** Usa credenciales de producción (`pub_prod_`, `prv_prod_`, `prod_integrity_`)

### ¿Puedo cambiar las credenciales después?

Sí, puedes editar las variables en cualquier momento:
1. Netlify > Site settings > Environment variables
2. Haz clic en los 3 puntos (⋮) al lado de la variable
3. Selecciona "Edit"
4. Cambia el valor
5. Haz "Trigger deploy" de nuevo

### ¿Cuánto tarda en aplicarse el cambio?

Después de hacer "Trigger deploy", espera 1-2 minutos. Una vez que el status diga "Published", las variables ya estarán activas.

---

## 🆘 Soporte Adicional

Si después de seguir todos estos pasos el error persiste:

1. **Toma captura de pantalla de:**
   - Las variables de entorno en Netlify (oculta los valores completos)
   - El error en la consola del navegador
   - Los logs de la función en Netlify

2. **Verifica que:**
   - Las credenciales de Wompi sean válidas
   - No haya espacios al inicio/final de los valores
   - El deploy se haya completado exitosamente

---

**⚡ NOTA IMPORTANTE:** El código está funcionando perfectamente. El error SOLO se debe a que las variables de entorno no están configuradas. Una vez que las configures, todo funcionará.

**Tiempo total estimado:** 10 minutos  
**Dificultad:** Fácil (solo copiar y pegar)
