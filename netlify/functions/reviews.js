/**
 * Netlify Function: reviews.js
 * Maneja el envío de nuevas reseñas a Firestore
 * POST /.netlify/functions/reviews
 */

const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// Rate limiting simple en memoria (para producción usar Redis/DB)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const MAX_REQUESTS = 3; // 3 reseñas por minuto por IP

/**
 * Inicializar Firebase Admin SDK
 */
function initFirebase() {
    if (getApps().length === 0) {
        try {
            // Decodificar service account desde variable de entorno
            const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
            if (!serviceAccountB64) {
                console.error('❌ FIREBASE_SERVICE_ACCOUNT_B64 no está configurado');
                throw new Error('Firebase no configurado - credenciales faltantes');
            }
            
            const serviceAccount = JSON.parse(
                Buffer.from(serviceAccountB64, 'base64').toString('utf8')
            );
            
            initializeApp({
                credential: cert(serviceAccount),
                projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id
            });
            
            console.log('✅ Firebase Admin SDK inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando Firebase:', error.message);
            throw error;
        }
    }
    
    return getFirestore();
}

/**
 * Verificar rate limiting por IP
 */
function checkRateLimit(clientIP) {
    const now = Date.now();
    const userRequests = rateLimitMap.get(clientIP) || [];
    
    // Limpiar requests antiguos
    const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (validRequests.length >= MAX_REQUESTS) {
        return false; // Límite excedido
    }
    
    // Agregar nueva request
    validRequests.push(now);
    rateLimitMap.set(clientIP, validRequests);
    
    // Limpiar entradas antiguas del mapa (cleanup básico)
    if (rateLimitMap.size > 1000) {
        const cutoff = now - RATE_LIMIT_WINDOW;
        for (const [ip, requests] of rateLimitMap.entries()) {
            if (requests.every(time => time < cutoff)) {
                rateLimitMap.delete(ip);
            }
        }
    }
    
    return true;
}

/**
 * Sanitizar y validar datos de entrada
 */
function validateReviewData(data) {
    const errors = [];
    
    // Nombre
    if (!data.nombre || typeof data.nombre !== 'string') {
        errors.push('Nombre es requerido');
    } else if (data.nombre.trim().length < 2) {
        errors.push('Nombre debe tener al menos 2 caracteres');
    } else if (data.nombre.trim().length > 50) {
        errors.push('Nombre no puede exceder 50 caracteres');
    }
    
    // Rating
    if (!data.rating || typeof data.rating !== 'number') {
        errors.push('Rating es requerido');
    } else if (data.rating < 1 || data.rating > 5 || !Number.isInteger(data.rating)) {
        errors.push('Rating debe ser un entero entre 1 y 5');
    }
    
    // Texto
    if (!data.texto || typeof data.texto !== 'string') {
        errors.push('Texto es requerido');
    } else if (data.texto.trim().length < 10) {
        errors.push('Texto debe tener al menos 10 caracteres');
    } else if (data.texto.trim().length > 500) {
        errors.push('Texto no puede exceder 500 caracteres');
    }
    
    // ProductoId (opcional)
    if (data.productoId !== null && data.productoId !== undefined) {
        if (typeof data.productoId !== 'string' && typeof data.productoId !== 'number') {
            errors.push('ProductoId debe ser string o número');
        }
    }
    
    return errors;
}

/**
 * Sanitizar texto para prevenir ataques
 */
function sanitizeText(text) {
    if (typeof text !== 'string') return text;
    
    return text
        .trim()
        .replace(/[<>]/g, '') // Remover < y >
        .replace(/javascript:/gi, '') // Remover javascript:
        .replace(/on\w+=/gi, '') // Remover handlers de eventos
        .substring(0, 500); // Limitar longitud
}

/**
 * Detectar contenido spam básico
 */
function detectSpam(text, nombre) {
    const spamKeywords = [
        'http://', 'https://', 'www.', '.com', '.net', '.org',
        'buy now', 'click here', 'free money', 'earn money',
        'viagra', 'casino', 'lottery', 'winner'
    ];
    
    const textLower = text.toLowerCase() + ' ' + nombre.toLowerCase();
    
    return spamKeywords.some(keyword => textLower.includes(keyword));
}

/**
 * Función principal de Netlify
 */
exports.handler = async (event, context) => {
    // Headers CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };
    
    // Manejar preflight OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    // Solo permitir POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({
                ok: false,
                error: 'Método no permitido. Use POST.'
            })
        };
    }
    
    try {
        // Obtener IP del cliente
        const clientIP = event.headers['x-forwarded-for'] || 
                        event.headers['x-real-ip'] || 
                        context.clientContext?.identity?.ip ||
                        'unknown';
        
        console.log(`Nueva reseña desde IP: ${clientIP}`);
        
        // Verificar rate limiting
        if (!checkRateLimit(clientIP)) {
            console.log(`Rate limit excedido para IP: ${clientIP}`);
            return {
                statusCode: 429,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'Demasiadas reseñas. Intenta de nuevo en un minuto.',
                    retryAfter: 60
                })
            };
        }
        
        // Parsear datos
        let reviewData;
        try {
            reviewData = JSON.parse(event.body);
        } catch (error) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'JSON inválido'
                })
            };
        }
        
        // Validar datos
        const validationErrors = validateReviewData(reviewData);
        if (validationErrors.length > 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    ok: false,
                    error: 'Datos inválidos',
                    details: validationErrors
                })
            };
        }
        
        // Sanitizar datos
        const sanitizedData = {
            nombre: sanitizeText(reviewData.nombre),
            texto: sanitizeText(reviewData.texto),
            rating: reviewData.rating,
            productoId: reviewData.productoId || null,
            createdAt: Timestamp.now(),
            published: false, // Por defecto requiere moderación
            verified: false,
            clientIP: clientIP.split(',')[0].trim(), // Solo primera IP
            userAgent: event.headers['user-agent'] || 'unknown'
        };
        
        // Detección básica de spam
        if (detectSpam(sanitizedData.texto, sanitizedData.nombre)) {
            console.log(`Posible spam detectado de IP: ${clientIP}`);
            sanitizedData.flagged = true;
            sanitizedData.flagReason = 'Posible spam detectado';
        }
        
        // Auto-aprobar reseñas que parecen legítimas
        // Cambio: Usar OR en lugar de AND para ser más permisivo
        // Aprobar si: NO es spam Y (rating alto O texto largo)
        const autoApprove = !sanitizedData.flagged && 
                          (sanitizedData.rating >= 3 || sanitizedData.texto.length >= 20);
        
        if (autoApprove) {
            sanitizedData.published = true;
            console.log(`Auto-aprobada: rating=${sanitizedData.rating}, textLength=${sanitizedData.texto.length}`);
        } else {
            console.log(`Requiere moderación: rating=${sanitizedData.rating}, textLength=${sanitizedData.texto.length}, flagged=${!!sanitizedData.flagged}`);
        }
        
        // Inicializar Firestore
        const db = initFirebase();
        
        // Guardar en Firestore
        const docRef = await db.collection('reviews').add(sanitizedData);
        
        console.log(`Reseña guardada con ID: ${docRef.id}, Published: ${sanitizedData.published}`);
        
        // Respuesta exitosa
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ok: true,
                id: docRef.id,
                published: sanitizedData.published,
                message: sanitizedData.published ? 
                    'Reseña publicada exitosamente' : 
                    'Reseña recibida y en espera de moderación'
            })
        };
        
    } catch (error) {
        console.error('Error procesando reseña:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                ok: false,
                error: 'Error interno del servidor',
                message: 'No se pudo procesar tu reseña. Intenta de nuevo más tarde.'
            })
        };
    }
};