/**
 * 🧪 SUITE COMPLETA DE PRUEBAS PARA EL SISTEMA DE RESEÑAS
 * Copiar y pegar en la consola del navegador para ejecutar
 */

console.log('🧪 Iniciando pruebas del sistema de reseñas...');

// ===== PRUEBAS DE CONEXIÓN =====

async function probarConexionFirebase() {
    console.log('\n📡 Probando conexión con Firebase/Netlify Functions...');
    
    try {
        const response = await fetch('/.netlify/functions/getReviews');
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Conexión exitosa con getReviews');
            console.log(`📊 Reseñas en Firebase: ${data.reviews?.length || 0}`);
            return true;
        } else {
            console.error('❌ Error en getReviews:', data.error);
            return false;
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return false;
    }
}

// ===== PRUEBAS DE UI =====

function probarElementosUI() {
    console.log('\n🎨 Verificando elementos de la UI...');
    
    const elementos = {
        'Track': document.getElementById('resenasTrack'),
        'Botón Prev': document.getElementById('btnPrevResenas'),
        'Botón Next': document.getElementById('btnNextResenas'),
        'Indicadores': document.getElementById('indicadoresResenas'),
        'Formulario': document.getElementById('resenaForm'),
        'Input nombre': document.getElementById('nombreResena'),
        'Textarea': document.getElementById('textoResena'),
        'Rating': document.getElementById('ratingSelector')
    };
    
    let todosPresentes = true;
    
    Object.entries(elementos).forEach(([nombre, elemento]) => {
        if (elemento) {
            console.log(`✅ ${nombre}: Presente`);
        } else {
            console.error(`❌ ${nombre}: NO encontrado`);
            todosPresentes = false;
        }
    });
    
    return todosPresentes;
}

// ===== EJECUTAR TODAS =====

async function ejecutarTodasLasPruebas() {
    console.log('🚀 INICIANDO PRUEBAS\n');
    console.log('═'.repeat(50));
    
    const ui = probarElementosUI();
    const firebase = await probarConexionFirebase();
    
    console.log('\n' + '═'.repeat(50));
    console.log('📊 RESUMEN:');
    console.log(`${ui ? '✅' : '❌'} UI: ${ui ? 'PASÓ' : 'FALLÓ'}`);
    console.log(`${firebase ? '✅' : '❌'} FIREBASE: ${firebase ? 'PASÓ' : 'FALLÓ'}`);
    console.log('═'.repeat(50) + '\n');
}

// Ejecutar
ejecutarTodasLasPruebas();
