// netlify/functions/crear-transaccion-wompi.js
// Backend serverless para procesar pagos con Wompi (crear transacción)
// 
// CONFIGURACIÓN REQUERIDA EN NETLIFY:
// Variables de entorno necesarias:
// - WOMPI_PUBLIC_KEY: Llave pública de Wompi (comienza con pub_)
// - WOMPI_PRIVATE_KEY: Llave privada de Wompi (comienza con prv_)
// - WOMPI_INTEGRITY_SECRET: Secret para firma de integridad (requerido para Nequi y otros medios)
// - URL: URL base de tu sitio en Netlify (ej: https://tu-sitio.netlify.app)

const fetchFn = (typeof fetch !== 'undefined') ? fetch : require('node-fetch');
const crypto = require('crypto');

/**
 * Validar que todas las variables de entorno estén configuradas
 */
function validarConfiguracion() {
    const errores = [];
    const advertencias = [];
    
    if (!process.env.WOMPI_PUBLIC_KEY) {
        errores.push('WOMPI_PUBLIC_KEY no configurada');
    } else if (!process.env.WOMPI_PUBLIC_KEY.startsWith('pub_')) {
        advertencias.push('WOMPI_PUBLIC_KEY no comienza con "pub_" - verifica que sea correcta');
    }
    
    if (!process.env.WOMPI_PRIVATE_KEY) {
        errores.push('WOMPI_PRIVATE_KEY no configurada');
    } else if (!process.env.WOMPI_PRIVATE_KEY.startsWith('prv_')) {
        advertencias.push('WOMPI_PRIVATE_KEY no comienza con "prv_" - verifica que sea correcta');
    }
    
    if (!process.env.WOMPI_INTEGRITY_SECRET) {
        errores.push('WOMPI_INTEGRITY_SECRET no configurada - Requerida para Nequi y otros medios de pago');
    } else if (!process.env.WOMPI_INTEGRITY_SECRET.includes('integrity')) {
        advertencias.push('WOMPI_INTEGRITY_SECRET no contiene "integrity" - verifica que sea correcta (debe ser test_integrity_... o prod_integrity_...)');
    }
    
    // Log de advertencias si las hay
    if (advertencias.length > 0) {
        console.warn('⚠️ Advertencias de configuración:', advertencias);
    }
    
    return errores;
}

/**
 * Generar firma de integridad según documentación de Wompi
 * Formato: SHA256(referencia + amountInCents + moneda + integritySecret)
 * IMPORTANTE: El orden es crítico: reference + amount_in_cents + currency + integrity_secret
 */
function generarFirmaIntegridad(referencia, amountInCents, moneda, integritySecret) {
    try {
        // Concatenar en el orden exacto que requiere Wompi
        const signatureString = `${referencia}${amountInCents}${moneda}${integritySecret}`;
        const signature = crypto.createHash('sha256').update(signatureString).digest('hex');
        
        console.log('🔐 Generando firma de integridad:');
        console.log('   Referencia:', referencia);
        console.log('   Monto (centavos):', amountInCents);
        console.log('   Moneda:', moneda);
        console.log('   String a firmar (sin secret):', `${referencia}${amountInCents}${moneda}[SECRET]`);
        console.log('   Firma generada:', signature);
        
        return signature;
    } catch (error) {
        console.error('❌ Error generando firma de integridad:', error);
        throw new Error('Error generando firma de seguridad');
    }
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Preflight CORS
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Solo permitir POST
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            headers, 
            body: JSON.stringify({ error: 'Método no permitido. Use POST.' }) 
        };
    }

    // Validar configuración del servidor antes de procesar
    const erroresConfig = validarConfiguracion();
    if (erroresConfig.length > 0) {
        console.error('❌ Errores de configuración:', erroresConfig);
        console.error('📋 Variables de entorno requeridas:');
        console.error('   - WOMPI_PUBLIC_KEY (pub_test_... o pub_prod_...)');
        console.error('   - WOMPI_PRIVATE_KEY (prv_test_... o prv_prod_...)');
        console.error('   - WOMPI_INTEGRITY_SECRET (test_integrity_... o prod_integrity_...)');
        console.error('🔧 Configúralas en: Netlify Dashboard > Site Settings > Environment Variables');
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Servidor no configurado correctamente',
                detalles: erroresConfig,
                ayuda: 'Configure las variables de entorno en Netlify: Site Settings > Environment Variables',
                variables_requeridas: [
                    'WOMPI_PUBLIC_KEY (pub_test_... o pub_prod_...)',
                    'WOMPI_PRIVATE_KEY (prv_test_... o prv_prod_...)',
                    'WOMPI_INTEGRITY_SECRET (test_integrity_... o prod_integrity_...)'
                ],
                guia: 'Ver archivo CONFIGURACION-NETLIFY-WOMPI.md para instrucciones detalladas'
            })
        };
    }

    // Parsear payload
    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch (e) {
        return { 
            statusCode: 400, 
            headers, 
            body: JSON.stringify({ error: 'JSON inválido' }) 
        };
    }

    const { monto, moneda = 'COP', referencia, email, telefono = '', nombre = '', productos = [] } = payload;

    // Validaciones de datos de entrada
    const errores = [];
    if (typeof monto !== 'number' || isNaN(monto) || monto <= 0) {
        errores.push('monto debe ser un número positivo');
    }
    if (!referencia || typeof referencia !== 'string') {
        errores.push('referencia es requerida y debe ser texto');
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        errores.push('email es requerido y debe ser válido');
    }
    if (moneda !== 'COP' && moneda !== 'USD') {
        errores.push('moneda debe ser COP o USD');
    }

    if (errores.length) {
        return { 
            statusCode: 400, 
            headers, 
            body: JSON.stringify({ 
                error: 'Datos inválidos', 
                detalles: errores 
            }) 
        };
    }

    // Obtener variables de entorno (ya validadas arriba)
    const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY;
    const WOMPI_INTEGRITY_SECRET = process.env.WOMPI_INTEGRITY_SECRET;

    try {
        // Wompi utiliza su widget de checkout con firma de integridad
        const amountInCents = Math.round(monto * 100);
        const redirectUrl = `${process.env.URL || 'https://alimentodelcielo-congeladosmonteliban.netlify.app'}/confirmacion-pago.html`;
        
        // Generar firma de integridad (CRÍTICO para seguridad)
        const signature = generarFirmaIntegridad(
            referencia, 
            amountInCents, 
            moneda, 
            WOMPI_INTEGRITY_SECRET
        );
        
        // Construir URL del widget de Wompi con todos los parámetros
        // CRÍTICO: Wompi requiere parámetros específicos sin encoding de los dos puntos (:)
        const checkoutParams = new URLSearchParams();
        checkoutParams.append('public-key', WOMPI_PUBLIC_KEY);
        checkoutParams.append('currency', moneda);
        checkoutParams.append('amount-in-cents', amountInCents.toString());
        checkoutParams.append('reference', referencia);
        checkoutParams.append('redirect-url', redirectUrl);
        
        // Construir la URL base con parámetros estándar
        let checkoutUrl = 'https://checkout.wompi.co/p/?' + checkoutParams.toString();
        
        // Agregar parámetros con : de forma manual (sin encoding del :)
        checkoutUrl += `&signature:integrity=${signature}`;
        checkoutUrl += `&customer-data:email=${encodeURIComponent(email)}`;
        checkoutUrl += `&customer-data:full-name=${encodeURIComponent(nombre || 'Cliente')}`;
        checkoutUrl += `&customer-data:phone-number=${encodeURIComponent(telefono || '3135212887')}`;

        console.log('✅ Transacción creada exitosamente:');
        console.log('   Referencia:', referencia);
        console.log('   Monto (centavos):', amountInCents);
        console.log('   Moneda:', moneda);
        console.log('   Email:', email);
        console.log('   URL de checkout generada (primeros 150 chars):', checkoutUrl.substring(0, 150) + '...');
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                exito: true, 
                referencia, 
                checkout_url: checkoutUrl,
                transaccion: {
                    reference: referencia,
                    amount_in_cents: amountInCents,
                    currency: moneda,
                    customer_email: email,
                    signature: signature,
                    timestamp: new Date().toISOString()
                }
            })
        };
    } catch (e) {
        console.error('❌ Error procesando transacción:', e);
        return { 
            statusCode: 500, 
            headers, 
            body: JSON.stringify({ 
                error: 'Error interno procesando transacción', 
                mensaje: e.message 
            }) 
        };
    }
};