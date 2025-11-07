# 🌐 INSTRUCCIONES ESPECÍFICAS PARA NETLIFY

## 📋 PASO A PASO: CONFIGURAR VARIABLES DE ENTORNO

### 1️⃣ Acceder al Dashboard de Netlify

1. Ve a [Netlify](https://app.netlify.com/)
2. Inicia sesión
3. Selecciona tu sitio de la lista

---

### 2️⃣ Navegar a Variables de Entorno

```
Dashboard de tu sitio
    ↓
Site settings (botón en la parte superior)
    ↓
Build & deploy (menú izquierdo)
    ↓
Environment (submenu)
    ↓
Environment variables
    ↓
Add a variable (botón verde)
```

---

### 3️⃣ Agregar Variables una por una

#### Variable 1: WOMPI_PUBLIC_KEY

```
Key: WOMPI_PUBLIC_KEY
Value: pub_prod_TU_LLAVE_PUBLICA_AQUI
Scopes: 
  ✅ Production
  ✅ Deploy previews
  ✅ Branch deploys

[Save variable]
```

#### Variable 2: WOMPI_PRIVATE_KEY

```
Key: WOMPI_PRIVATE_KEY
Value: prv_prod_TU_LLAVE_PRIVADA_AQUI
Scopes: 
  ✅ Production
  ✅ Deploy previews
  ✅ Branch deploys

[Save variable]
```

#### Variable 3: URL (Opcional pero recomendado)

```
Key: URL
Value: https://tu-sitio.netlify.app
Scopes: 
  ✅ Production

[Save variable]
```

---

### 4️⃣ Variables Opcionales (Solo si usas Firebase para reseñas)

#### Variable 4: FIREBASE_PROJECT_ID

```
Key: FIREBASE_PROJECT_ID
Value: tu-proyecto-firebase
Scopes: 
  ✅ Production
  ✅ Deploy previews
  ✅ Branch deploys

[Save variable]
```

#### Variable 5: FIREBASE_SERVICE_ACCOUNT_B64

```
Key: FIREBASE_SERVICE_ACCOUNT_B64
Value: [Base64 del JSON de service account]
Scopes: 
  ✅ Production
  ✅ Deploy previews
  ✅ Branch deploys

[Save variable]
```

**Para obtener el Base64 del service account:**

```powershell
# En PowerShell
$json = Get-Content -Path "ruta-al-service-account.json" -Raw
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json))
```

---

## 🔄 REDESPLEGAR DESPUÉS DE CONFIGURAR

Después de agregar las variables, debes redesplegar:

### Opción 1: Desde el Dashboard

```
Deploys (menú superior)
    ↓
Trigger deploy (botón)
    ↓
Deploy site
```

### Opción 2: Desde Git

```powershell
# Hacer un cambio cualquiera y pushear
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## ✅ VERIFICAR QUE LAS VARIABLES ESTÉN CONFIGURADAS

### 1. Ver Variables Configuradas

```
Site settings
    ↓
Environment variables
    ↓
Deberías ver listadas:
  - WOMPI_PUBLIC_KEY
  - WOMPI_PRIVATE_KEY
  - URL
```

### 2. Revisar Logs de Functions

```
Functions (menú superior)
    ↓
Selecciona: crear-transaccion-wompi
    ↓
Revisa los logs recientes
    ↓
Busca mensajes como:
  ✅ "Transacción creada exitosamente"
  ❌ "WOMPI_PUBLIC_KEY no está configurado"
```

---

## 🔍 CÓMO LEER LOS LOGS

### Acceder a Logs de Functions

```
Dashboard → Functions → Nombre de la función
```

### Logs exitosos (crear-transacción):

```
10:30:15 PM: ✅ Transacción creada en Wompi
10:30:15 PM: Status: 200
10:30:15 PM: Response: {"exito":true,"checkout_url":"https://checkout.wompi.co/..."}
```

### Logs con error (falta variable):

```
10:30:15 PM: ❌ WOMPI_PUBLIC_KEY no está configurado
10:30:15 PM: Error: Configuración del servidor incorrecta
```

---

## 🚀 CONFIGURACIÓN AVANZADA

### Diferentes llaves para diferentes contextos

#### Para Producción (pagos reales):

```
Context: Production
WOMPI_PUBLIC_KEY = pub_prod_XXXXX
WOMPI_PRIVATE_KEY = prv_prod_XXXXX
```

#### Para Deploy Previews (testing):

```
Context: Deploy previews
WOMPI_PUBLIC_KEY = pub_test_XXXXX
WOMPI_PRIVATE_KEY = prv_test_XXXXX
```

#### Para Branch Deploys:

```
Context: Branch deploys
WOMPI_PUBLIC_KEY = pub_test_XXXXX
WOMPI_PRIVATE_KEY = prv_test_XXXXX
```

---

## 🔐 SEGURIDAD DE VARIABLES

### ✅ Buenas prácticas:

1. **Nunca expongas variables privadas**
   - ❌ No las pongas en el código
   - ❌ No las subas a GitHub
   - ❌ No las compartas en capturas de pantalla

2. **Usa contextos diferentes**
   - ✅ Test keys para development
   - ✅ Production keys solo para production

3. **Revisa acceso**
   - Solo administradores del sitio pueden ver las variables completas
   - Los colaboradores ven solo nombres, no valores

---

## 📊 MONITOREAR EL SITIO

### Dashboard de Netlify - Información Útil

#### 1. Analytics (si está activado)

```
Analytics (menú superior)
    ↓
Ver:
  - Visitas al sitio
  - Páginas más visitadas
  - Bandwidth usado
```

#### 2. Functions Usage

```
Functions (menú superior)
    ↓
Ver:
  - Número de invocaciones
  - Tiempo de ejecución
  - Errores
```

#### 3. Logs en tiempo real

```
Deploys → [Último deploy] → Deploy log
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS ESPECÍFICOS DE NETLIFY

### Error: "Function not found"

**Causa**: Las funciones no se desplegaron correctamente.

**Solución**:
```
1. Verifica que netlify.toml esté en la raíz
2. Verifica que functions = "netlify/functions"
3. Verifica que los archivos .js estén en netlify/functions/
4. Redesplega
```

### Error: "Build failed"

**Causa**: Problemas en package.json o dependencias.

**Solución**:
```
1. Revisa el deploy log completo
2. Verifica que package.json tenga node-fetch
3. Verifica que node version >= 14
4. Limpia cache: Site settings → Build & deploy → Clear cache
```

### Error: "CORS policy"

**Causa**: Headers CORS mal configurados.

**Solución**:
```
1. Verifica netlify.toml tenga los headers CORS
2. Verifica que las funciones retornen headers correctos
3. Redesplega
```

### Error: Variables no se aplican

**Causa**: Cambios de variables requieren redeploy.

**Solución**:
```
1. Después de cambiar variables, haz redeploy
2. Espera 1-2 minutos
3. Verifica en los logs que las variables se lean correctamente
```

---

## 📞 SOPORTE NETLIFY

### Recursos oficiales:

- **Documentación**: https://docs.netlify.com/
- **Foro**: https://answers.netlify.com/
- **Status**: https://www.netlifystatus.com/
- **Support**: support@netlify.com (planes pagos)

### Preguntas frecuentes:

1. **¿Cuántas variables puedo tener?**
   - No hay límite práctico

2. **¿Las variables son seguras?**
   - Sí, están encriptadas y no se exponen en el frontend

3. **¿Puedo usar .env local?**
   - Sí, pero solo para desarrollo local con `netlify dev`
   - En producción se usan las variables del dashboard

4. **¿Las funciones tienen límites?**
   - Free tier: 125,000 invocaciones/mes
   - 10 segundos de timeout por función

---

## ✅ CHECKLIST FINAL

```
[ ] Variables configuradas en Netlify Dashboard
[ ] Todas las variables tienen los 3 scopes (Production, Deploy previews, Branch)
[ ] Redespliegue realizado
[ ] Logs revisados (sin errores)
[ ] Pago de prueba realizado exitosamente
[ ] Variables de producción configuradas (cuando estés listo)
```

---

## 🎯 PRÓXIMOS PASOS

Una vez configurado todo:

1. ✅ Hacer deploy
2. ✅ Probar con tarjeta de prueba
3. ✅ Verificar logs
4. ✅ Si todo funciona, cambiar a llaves de producción
5. ✅ ¡Empezar a recibir pagos! 🎉

---

**Última actualización**: 6 de noviembre de 2025  
**Documentación oficial Netlify**: https://docs.netlify.com/environment-variables/overview/
