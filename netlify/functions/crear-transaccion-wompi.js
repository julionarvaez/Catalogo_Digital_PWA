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
    // Construir checkout link (método recomendado por Wompi)
    const body = {
      public_key: WOMPI_PUBLIC_KEY,
      currency: moneda,
      amount_in_cents: Math.round(monto * 100),
      reference: referencia,
      redirect_url: `${process.env.URL || 'https://alimentodelcielo-congeladosmonteliban.netlify.app'}/confirmacion-pago.html`,
      customer_data: {
        email: email,
        full_name: nombre || 'Cliente',
        phone_number: telefono || '3135212887'
      }
    };

    console.log('📤 Creando payment link Wompi referencia', referencia, 'monto', body.amount_in_cents);
    const wompiResponse = await fetchFn('https://production.wompi.co/v1/payment_links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WOMPI_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const resultado = await wompiResponse.json();
    if (!wompiResponse.ok) {
      console.error('❌ Error Wompi:', wompiResponse.status, resultado);
      return { statusCode: wompiResponse.status, headers, body: JSON.stringify({ error: 'Error Wompi', detalles: resultado }) };
    }

    const checkoutUrl = resultado.data?.url || resultado.data?.payment_link_url || null;
    if (!checkoutUrl) {
      console.warn('⚠️ Respuesta sin URL de pago:', resultado);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'No se generó URL de pago', detalles: resultado }) };
    }

    console.log('✅ Payment link creado:', checkoutUrl);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ exito: true, referencia, checkout_url: checkoutUrl, transaccion: resultado.data })
    };
  } catch (e) {
    console.error('❌ Excepción creando transacción:', e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Error interno creando transacción', mensaje: e.message }) };
  }
};