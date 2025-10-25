// netlify/functions/verificar-pago-wompi.js
// Función serverless para verificar el estado de un pago en Wompi

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Solo permitir GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    // Obtener ID de transacción de los parámetros de la URL
    const { id } = event.queryStringParameters || {};
    
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'ID de transacción requerido',
          mensaje: 'Debes proporcionar el parámetro ?id=TRANSACTION_ID'
        })
      };
    }

    console.log('🔍 Verificando transacción:', id);

    // Obtener llave pública de variables de entorno
    const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY;

    if (!WOMPI_PUBLIC_KEY) {
      console.error('❌ Variable WOMPI_PUBLIC_KEY no configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuración del servidor incorrecta' 
        })
      };
    }

    // Consultar transacción en Wompi
    const wompiResponse = await fetch(
      `https://production.wompi.co/v1/transactions/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${WOMPI_PUBLIC_KEY}`
        }
      }
    );

    const resultado = await wompiResponse.json();

    console.log('📥 Estado de transacción:', {
      id: id,
      status: resultado.data?.status || 'DESCONOCIDO',
      httpStatus: wompiResponse.status
    });

    if (!wompiResponse.ok) {
      console.error('❌ Error al consultar Wompi:', resultado);
      return {
        statusCode: wompiResponse.status,
        headers,
        body: JSON.stringify({
          error: 'Error al consultar transacción',
          detalles: resultado.error || 'Error desconocido'
        })
      };
    }

    // Verificar que tengamos datos
    if (!resultado.data) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'Transacción no encontrada',
          id: id
        })
      };
    }

    console.log('✅ Transacción consultada exitosamente');

    // Responder con los datos de la transacción
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        exito: true,
        data: resultado.data,
        mensaje: 'Transacción consultada exitosamente'
      })
    };

  } catch (error) {
    console.error('❌ Error en función:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error interno del servidor',
        mensaje: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};