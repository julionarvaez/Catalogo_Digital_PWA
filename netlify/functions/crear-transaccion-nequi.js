// =========================================
// FUNCIÓN NETLIFY: Crear Transacción Nequi
// =========================================
// Sistema de pago por Nequi con código QR y notificación push

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Método no permitido' })
        };
    }

    try {
        const { total, referencia, items, clienteInfo } = JSON.parse(event.body || '{}');

        if (!total || !referencia) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Faltan datos requeridos',
                    required: ['total', 'referencia']
                })
            };
        }

        // Generar transacción simulada
        // En producción, aquí se haría la integración con API de Nequi
        const transaccion = {
            id: `NEQ-${Date.now()}`,
            referencia: referencia,
            estado: 'PENDIENTE',
            total: total,
            numeroNequi: '3104915876', // Número de Nequi del negocio
            nombreNegocio: 'Alimento del Cielo',
            items: items || [],
            clienteInfo: clienteInfo || {},
            fechaCreacion: new Date().toISOString(),
            expiraEn: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutos
            instrucciones: [
                '1. Abre tu app Nequi',
                '2. Ve a "Enviar Plata"',
                '3. Ingresa el número: 310 491 5876',
                '4. Monto exacto: $' + total.toLocaleString('es-CO'),
                '5. En concepto escribe: ' + referencia,
                '6. Toma captura del comprobante',
                '7. Envíala por WhatsApp al 313 521 2887'
            ],
            whatsappLink: `https://wa.me/573135212887?text=${encodeURIComponent(
                `Hola! 👋\n\nAcabo de hacer un pago por Nequi:\n\n💰 Monto: $${total.toLocaleString('es-CO')}\n📝 Referencia: ${referencia}\n\n📸 Te envío el comprobante de pago.`
            )}`
        };

        console.log('✅ Transacción Nequi creada:', transaccion.id);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                transaccion: transaccion,
                mensaje: 'Transacción creada exitosamente'
            })
        };

    } catch (error) {
        console.error('❌ Error creando transacción Nequi:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Error interno del servidor',
                details: error.message 
            })
        };
    }
};
