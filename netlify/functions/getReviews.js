/**
 * Netlify Function: getReviews.js
 * Obtiene reseñas públicas desde Firestore
 * GET /.netlify/functions/getReviews
 */

const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Cache simple en memoria (para producción usar Redis)
let reviewsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Inicializar Firebase Admin SDK
 */
function initFirebase() {
    if (getApps().length === 0) {
        try {
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
            
            console.log('✅ Firebase Admin SDK inicializado para getReviews');
        } catch (error) {
            console.error('❌ Error inicializando Firebase:', error.message);
            throw error;
        }
    }
    
    return getFirestore();
}

/**
 * Formatear reseña para respuesta
 */
function formatReview(doc) {
    const data = doc.data();
    
    return {
        id: doc.id,
        nombre: data.nombre,
        texto: data.texto,
        rating: data.rating,
        productoId: data.productoId,
        createdAt: data.createdAt,
        verified: data.verified || false
        // No exponer datos internos como IP, userAgent, etc.
    };
}

/**
 * Obtener reseñas desde cache o Firestore
 */
async function getReviews(useCache = true) {
    const now = Date.now();
    
    // Verificar cache
    if (useCache && reviewsCache && (now - cacheTimestamp) < CACHE_DURATION) {
        console.log('Retornando reseñas desde cache');
        return reviewsCache;
    }
    
    try {
        console.log('Obteniendo reseñas desde Firestore...');
        
        const db = initFirebase();
        
        // Query: solo reseñas publicadas, ordenadas por fecha descendente
        let snapshot;
        try {
            snapshot = await db.collection('reviews')
                .where('published', '==', true)
                .orderBy('createdAt', 'desc')
                .limit(50) // Máximo 50 reseñas
                .get();
        } catch (queryError) {
            console.warn('⚠️ Fallback: error usando orderBy(createdAt). Intentando sin orden explícito. Razón:', queryError.message);
            // Fallback sin orderBy (si índice no creado o campo faltante)
            snapshot = await db.collection('reviews')
                .where('published', '==', true)
                .limit(50)
                .get();
        }
        
        const reviews = [];
        snapshot.forEach(doc => {
            reviews.push(formatReview(doc));
        });
        
        // Actualizar cache
        reviewsCache = reviews;
        cacheTimestamp = now;
        
        console.log(`${reviews.length} reseñas obtenidas desde Firestore`);
        return reviews;
        
    } catch (error) {
        console.error('Error obteniendo reseñas:', error);
        
        // En caso de error, retornar cache si existe
        if (reviewsCache) {
            console.log('Error en Firestore, retornando cache existente');
            return reviewsCache;
        }
        
        // Propagar error con mensaje controlado
        throw new Error('Fallo al consultar reseñas en Firestore: ' + (error.message || 'desconocido'));
    }
}

/**
 * Calcular estadísticas de reseñas
 */
function calculateStats(reviews) {
    if (reviews.length === 0) {
        return {
            totalCount: 0,
            averageRating: 0,
            ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        };
    }
    
    const ratingDistribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    let totalRating = 0;
    
    reviews.forEach(review => {
        totalRating += review.rating;
        ratingDistribution[review.rating]++;
    });
    
    return {
        totalCount: reviews.length,
        averageRating: Number((totalRating / reviews.length).toFixed(1)),
        ratingDistribution
    };
}

/**
 * Función principal de Netlify
 */
exports.handler = async (event, context) => {
    // Headers CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // 5 minutos de cache en CDN
    };
    
    // Manejar preflight OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    // Solo permitir GET
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({
                ok: false,
                error: 'Método no permitido. Use GET.'
            })
        };
    }
    
    try {
        // Obtener parámetros de query
        const params = event.queryStringParameters || {};
        const includeStats = params.stats === 'true';
        const forceRefresh = params.refresh === 'true';
        const limit = Math.min(parseInt(params.limit) || 50, 100); // Max 100
        
        console.log(`Obteniendo reseñas - includeStats: ${includeStats}, forceRefresh: ${forceRefresh}, limit: ${limit}`);
        
        // Obtener reseñas
        const allReviews = await getReviews(!forceRefresh);
        
        // Aplicar límite
        const reviews = allReviews.slice(0, limit);
        
        // Preparar respuesta
        const response = {
            ok: true,
            reviews: reviews,
            count: reviews.length,
            totalCount: allReviews.length,
            cached: reviewsCache && !forceRefresh,
            timestamp: new Date().toISOString()
        };
        
        // Agregar estadísticas si se solicitan
        if (includeStats) {
            response.statistics = calculateStats(allReviews);
        }
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
        };
        
    } catch (error) {
        console.error('❌ Error obteniendo reseñas:', error.message);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                ok: false,
                error: 'Error interno del servidor',
                message: error.message || 'No se pudieron cargar las reseñas. Intenta de nuevo más tarde.',
                reviews: [], // Array vacío como fallback
                count: 0,
                timestamp: new Date().toISOString()
            })
        };
    }
};