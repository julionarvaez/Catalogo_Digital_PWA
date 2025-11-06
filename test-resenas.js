/**
 * Script de Prueba para Sistema de Reseñas
 * Este script agrega reseñas de demostración para verificar que el sistema funciona
 * 
 * INSTRUCCIONES:
 * 1. Abre la página index.html en tu navegador
 * 2. Abre la consola del navegador (F12)
 * 3. Copia y pega este script completo en la consola
 * 4. Presiona Enter
 * 5. Las reseñas de prueba aparecerán automáticamente
 */

(function() {
    console.log('🧪 Iniciando script de prueba de reseñas...');
    
    // Reseñas de demostración
    const resenasDemo = [
        {
            id: 'demo_1',
            nombre: 'María González',
            texto: 'Excelente calidad de los productos. El pollo siempre llega fresco y el servicio es impecable. 100% recomendado!',
            rating: 5,
            productoId: 1,
            published: true,
            verified: true,
            createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 2 } // Hace 2 días
        },
        {
            id: 'demo_2',
            nombre: 'Carlos Pérez',
            texto: 'Me encanta la variedad de productos congelados. Las empanadas hawaianas son mis favoritas. Entrega rápida y productos de calidad.',
            rating: 5,
            productoId: 80,
            published: true,
            verified: false,
            createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 5 } // Hace 5 días
        },
        {
            id: 'demo_3',
            nombre: 'Ana Martínez',
            texto: 'Muy buena atención al cliente. Los productos llegaron bien empacados y congelados. El pescado es fresco y de excelente sabor.',
            rating: 4,
            productoId: 40,
            published: true,
            verified: true,
            createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 7 } // Hace 7 días
        },
        {
            id: 'demo_4',
            nombre: 'Luis Rodríguez',
            texto: 'Excelente servicio. Las verduras congeladas mantienen su frescura y sabor. Precios justos y entregas puntuales.',
            rating: 5,
            productoId: 60,
            published: true,
            verified: false,
            createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 10 } // Hace 10 días
        },
        {
            id: 'demo_5',
            nombre: 'Sofia Hernández',
            texto: 'Me gusta que ofrecen productos de calidad a buen precio. La carne es tierna y bien porcionada. Definitivamente vuelvo a comprar.',
            rating: 4,
            productoId: 20,
            published: true,
            verified: true,
            createdAt: { seconds: Math.floor(Date.now() / 1000) - 86400 * 15 } // Hace 15 días
        }
    ];
    
    // Verificar que el sistema de reseñas existe
    if (!window.sistemaResenas) {
        console.error('❌ Sistema de reseñas no encontrado. Asegúrate de que la página esté completamente cargada.');
        console.log('💡 Intenta recargar la página y espera unos segundos antes de ejecutar este script.');
        return;
    }
    
    console.log('✅ Sistema de reseñas encontrado');
    
    // Cargar reseñas de demostración
    try {
        // Reemplazar el array de reseñas
        window.sistemaResenas.resenas = resenasDemo;
        
        // Re-renderizar
        window.sistemaResenas.renderReviews();
        window.sistemaResenas.updateStatistics();
        window.sistemaResenas.updateSchema();
        
        console.log('✅ Reseñas de demostración cargadas correctamente');
        console.log(`📊 Total de reseñas: ${resenasDemo.length}`);
        
        // Calcular promedio
        const promedio = resenasDemo.reduce((sum, r) => sum + r.rating, 0) / resenasDemo.length;
        console.log(`⭐ Promedio de calificación: ${promedio.toFixed(1)}/5`);
        
        // Mostrar mensaje de éxito
        const mensaje = `
🎉 ¡Reseñas de prueba cargadas correctamente!

📊 Estadísticas:
   • Total de reseñas: ${resenasDemo.length}
   • Promedio: ${promedio.toFixed(1)}/5 estrellas
   
👀 Desplázate hasta la sección de reseñas para verlas.

💡 Puedes:
    • Usar las flechas para navegar entre reseñas
    • Enviar una nueva reseña usando el formulario
    • Ver las estadísticas actualizadas
        `;
        
        console.log(mensaje);
        
        // Scroll suave hasta la sección de reseñas
        const seccionResenas = document.getElementById('reseñas');
        if (seccionResenas) {
            setTimeout(() => {
                seccionResenas.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('📍 Navegando a la sección de reseñas...');
            }, 500);
        }
        
    } catch (error) {
        console.error('❌ Error al cargar reseñas de demostración:', error);
        console.log('💡 Verifica que el sistema de reseñas esté completamente inicializado.');
    }
})();

console.log('📝 Script de prueba ejecutado. Revisa los mensajes arriba para ver los resultados.');
