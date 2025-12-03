# ⚡ SOLUCIÓN RÁPIDA - 3 PASOS

## 🎯 El error dice exactamente qué falta:

```
WOMPI_INTEGRITY_SECRET no configurada
```

---

## ✅ SOLUCIÓN (10 minutos)

### 1️⃣ Obtén las credenciales de Wompi

**Ve a:** https://comercios.wompi.co/

**Copia estas 3 cosas:**
- Public Key (empieza con `pub_`)
- Private Key (empieza con `prv_`)
- Integrity Secret (empieza con `prod_integrity_` o `test_integrity_`)

---

### 2️⃣ Configura en Netlify

**Ve a:** https://app.netlify.com

**Ruta:**
```
Tu sitio → Site settings → Environment variables → Add a variable
```

**Agrega estas 3 variables:**

```bash
WOMPI_PUBLIC_KEY = [tu public key]
WOMPI_PRIVATE_KEY = [tu private key]
WOMPI_INTEGRITY_SECRET = [tu integrity secret]  ← ⚠️ ESTA FALTA
```

---

### 3️⃣ Redeploy

En Netlify:
```
Deploys → Trigger deploy → Clear cache and deploy site
```

Espera 2 minutos hasta que diga "Published"

---

## ✅ Listo

Ahora prueba de nuevo y NO saldrá el error 500.

---

## 📺 Video Tutorial

Si prefieres ver un video, busca en YouTube:
"How to add environment variables in Netlify"

---

## 🆘 ¿Necesitas ayuda?

Revisa el archivo completo: `PASOS-CONFIGURACION.md`

---

**Estado actual:** ❌ Variables no configuradas  
**Después de configurar:** ✅ Todo funcionando  
**Tiempo:** 10 minutos
