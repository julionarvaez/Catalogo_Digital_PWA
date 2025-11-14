// netlify/functions/crear-transaccion-wompi.js
// Backend serverless para procesar pagos con Wompi (crear transacción)

// En Node 18+ fetch es global; si Netlify usa versión anterior se puede requerir node-fetch
const fetchFn = (typeof fetch !== 'undefined') ? fetch : require('node-fetch');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método no permitido. Use POST.' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'JSON inválido' }) };
  }

  const { monto, moneda = 'COP', referencia, email, telefono = '', nombre = '', productos = [] } = payload;

  // Validaciones básicas
  const errores = [];
  if (typeof monto !== 'number' || isNaN(monto) || monto <= 0) errores.push('monto debe ser un número positivo');
  if (!referencia) errores.push('referencia es requerida');
  if (!email) errores.push('email es requerido');

  if (errores.length) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Datos inválidos', detalles: errores }) };
  }

  const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY;
  const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY;

  if (!WOMPI_PRIVATE_KEY || !WOMPI_PUBLIC_KEY) {
    console.error('❌ Llaves Wompi no configuradas');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Servidor sin llaves Wompi configuradas' }) };
  }

  try {
    // Wompi requiere usar su widget de checkout, no crear transacciones directamente
    // Retornamos los datos para que el frontend abra el widget
    const amountInCents = Math.round(monto * 100);
    const redirectUrl = `${process.env.URL || 'https://alimentodelcielo-congeladosmonteliban.netlify.app'}/confirmacion-pago.html`;
    
    // Construir URL del widget de Wompi
    const checkoutUrl = `https://checkout.wompi.co/p/?` + new URLSearchParams({
      'public-key': WOMPI_PUBLIC_KEY,
      'currency': moneda,
      'amount-in-cents': amountInCents.toString(),
      'reference': referencia,
      'redirect-url': redirectUrl,
      'customer-data:email': email,
      'customer-data:full-name': nombre || 'Cliente',
      'customer-data:phone-number': telefono || '3135212887'
    }).toString();

    console.log('✅ URL de checkout generada para referencia:', referencia, 'monto:', amountInCents);
    
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
          customer_email: email
        }
      })
    };
  } catch (e) {
    console.error('❌ Excepción creando transacción:', e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Error interno creando transacción', mensaje: e.message }) };
  }
};