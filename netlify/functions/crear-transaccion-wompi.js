// netlify/functions/crear-transaccion-wompi.js
// Backend serverless para procesar pagos con Wompi

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    // Parsear datos del pedido
    const datos = JSON.parse(event.body);
    const { monto, moneda, referencia, email, telefono, nombre, productos } = datos;

    // Validar datos requeridos
    if (!monto || !referencia || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Faltan datos requeridos: monto, referencia, email' 
        })
      };
    }

    // ⚠️ IMPORTANTE: Cambiar estas llaves por las tuyas
    const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY || 'pub_test_tu_llave_publica_aqui';
    const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY || 'prv_test_tu_llave_privada_aqui';

    // Crear transacción en Wompi
    const wompiResponse = await fetch('https://production.wompi.co/v1/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WOMPI_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount_in_cents: monto * 100, // Wompi usa centavos
        currency: moneda || 'COP',
        customer_email: email,
        reference: referencia,
        redirect_url: `${process.env.URL || 'https://tu-sitio.netlify.app'}/confirmacion-pago`,
        customer_data: {
          phone_number: telefono || '',
          full_name: nombre || 'Cliente Alimento del Cielo'
        },
        payment_method: {
          type: 'CARD',
          installments: 1
        },
        shipping_address: {
          address_line_1: 'Montelíbano, Córdoba',
          country: 'CO',
          phone_number: telefono || '3135212887'
        }
      })
    });

    const resultado = await wompiResponse.json();

    if (!wompiResponse.ok) {
      console.error('Error Wompi:', resultado);
      return {
        statusCode: wompiResponse.status,
        headers,
        body: JSON.stringify({
          error: 'Error al crear transacción en Wompi',
          detalles: resultado
        })
      };
    }

    // Guardar transacción en base de datos (opcional)
    // await guardarTransaccion(referencia, resultado);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        exito: true,
        transaccion: resultado,
        checkout_url: resultado.data?.checkout_url || null,
        referencia: referencia
      })
    };

  } catch (error) {
    console.error('Error en función:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error interno del servidor',
        mensaje: error.message
      })
    };
  }
};

// ============================================
// FUNCIÓN ADICIONAL: Verificar estado de pago
// ============================================
// Crear archivo: netlify/functions/verificar-pago-wompi.js

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const { id } = event.queryStringParameters;
    
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'ID de transacción requerido' })
      };
    }

    const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY || 'pub_test_tu_llave_publica_aqui';

    const response = await fetch(
      `https://production.wompi.co/v1/transactions/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${WOMPI_PUBLIC_KEY}`
        }
      }
    );

    const resultado = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(resultado)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};