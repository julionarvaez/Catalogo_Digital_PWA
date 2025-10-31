// === BASE DE DATOS DE PRODUCTOS ===
const productos = [
    // === POLLO ===
    {
        id: 1,
        nombre: 'Pollo Semicriollo Entero',
        categoria: 'pollo',
        precio: 7500, 
        descripcion: 'Pollo semicriollo entero, fresco y jugoso. Ideal para cualquier preparación. Precio por kilogramo 15.000 COP.',
        emoji: '🍗',
        etiqueta: 'Bestseller',
        tipoEtiqueta: 'etiqueta-producto',
        unidadMedida: 'Peso aproximado',
        pesoAproximado: '2400 - 3000 g',
        precioPorKg: 15000,
    },
    {
        id: 2,
        nombre: 'Bandeja de Menudencia 500g',
        categoria: 'pollo',
        precio: 4990,
        descripcion: 'Bandeja con menudencias de pollo, ideal para sopas, guisos y más.',
        emoji: '🔥',
        etiqueta: 'Especial',
        tipoEtiqueta: 'etiqueta-oferta'
    },
    {
        id: 3,
        nombre: 'Bandeja de Vicera 500g',
        categoria: 'pollo',
        precio: 4990,
        descripcion: 'Bandeja con vísceras de pollo, ideal para sopas, guisos y más.',
        emoji: '🦃',
        etiqueta: 'Fitness',
        tipoEtiqueta: 'etiqueta-producto'
    },

    // === CARNES ===
    {
        id: 20,
        nombre: 'Carne de Res 1000g',
        categoria: 'carnes',
        precio: 14990,
        descripcion: 'Carne de res fresca y jugosa, ideal para cualquier preparación.',
        emoji: '🥩',
        etiqueta: 'Nuevo',
        tipoEtiqueta: 'etiqueta-nuevo',
    },
    {
        id: 21,
        nombre: 'Carne de Cerdo 1000g',
        categoria: 'carnes',
        precio: 13990,
        descripcion: 'Carne de cerdo tierna y jugosa, ideal para cualquier preparación.',
        emoji: '🍔',
        etiqueta: 'Familiar',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 22,
        nombre: 'Carne Molida de Res 1000g',
        categoria: 'carnes',
        precio: 15490,
        descripcion: 'Carne molida de res, ideal para cualquier preparación.',
        emoji: '🐷',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-oferta'
    },
    {
        id: 23,
        nombre: 'Carne Molida de Cerdo 1000g',
        categoria: 'carnes',
        precio: 14490,
        descripcion: 'Carne molida de cerdo, ideal para cualquier preparación.',
        emoji: '🐷',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-oferta'
    },
    {
        id: 23,
        nombre: 'Carne Molida de Mixta 1000g',
        categoria: 'carnes',
        precio: 12990,
        descripcion: 'Carne molida mixta res y cerdo, ideal para cualquier preparación.',
        emoji: '🐷',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-oferta'
    },



    // === PESCADO ===
    {
        id: 40,
        nombre: 'Filete de Salmón',
        categoria: 'pescado',
        precio: 19990,
        descripcion: 'Salmón fresco, rico en omega-3. Porciones de 200g cada una.',
        emoji: '🐟',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 41,
        nombre: 'Camarones Precocido',
        categoria: 'pescado',
        precio: 21990,
        descripcion: 'Camarones precociso, pelados y desvenados.',
        emoji: '🦐',
        etiqueta: 'Gourmet',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 42,
        nombre: 'Cachama Entera x3 unidades',
        categoria: 'pescado',
        precio: 14990,
        descripcion: 'Cachama fresca y limpia, lista para cocinar. Su sabor suave y natural es perfecto para disfrutar en familia.',
        emoji: '🐟',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 43,
        nombre: 'Tilapia Roja Entera x3 unidades',
        categoria: 'pescado',
        precio: 15990,
        descripcion: 'Tilapia roja fresca y limpia, lista para cocinar. Ideal para cualquier preparación y disfrutar en familia.',
        emoji: '🐟',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 44,
        nombre: 'Mojarra Entera x3 unidades ',
        categoria: 'pescado',
        precio: 14990,
        descripcion: 'Mojarra fresca y limpia, lista para cocinar. Ideal para cualquier preparación y disfrutar en familia.',
        emoji: '🐟',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-premium'
    },

    // === VERDURAS ===
    {
        id: 60,
        nombre: 'Mix Gourmet - Verduras Congeladas 500g',
        categoria: 'verduras',
        precio: 6490,
        descripcion: 'Selección gourmet de brócoli, arveja, apio, cebollín y maíz tierno. Congelado al instante para preservar nutrientes, color y textura.',
        emoji: '🥬',
        etiqueta: 'Saludable',
        tipoEtiqueta: 'etiqueta-producto'
    },
        {
        id: 61,
        nombre: 'Mix Primavera - Verduras Congeladas 500g',
        categoria: 'verduras',
        precio: 6490,
        descripcion: 'Mezcla colorida de arveja, zanahoria, maíz y pimentón rojo, lista para saltear o acompañar tus comidas. Congelado al instante para mantener su frescura y sabor natural.',
        emoji: '🥬',
        etiqueta: 'Saludable',
        tipoEtiqueta: 'etiqueta-producto'
    },
        {
        id: 62,
        nombre: 'Salteado Campestre - Verduras Congeladas 500g',
        categoria: 'verduras',
        precio: 6490,
        descripcion: 'Deliciosa combinación de brócoli, zanahoria, pimentón y cebolla, perfecta para comidas saludables. Producto 100% natural sin conservantes.',
        emoji: '🥬',
        etiqueta: 'Saludable',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 63,
        nombre: 'Papas a la Francesa  1000g',
        categoria: 'verduras',
        precio: 12000,
        descripcion: 'Papas cortadas en bastones, listas para freír o hornear. ideal para acompañar tus comidas favoritas.',
        emoji: '🥔',
        etiqueta: 'Tradicional',
        tipoEtiqueta: 'etiqueta-producto'
    },

    // === EMPANADAS ===
    {
        id: 80,
        nombre: 'Empanadas Hawaianas x7',
        categoria: 'empanadas',
        precio: 8990,
        descripcion: 'Empanadas rellenas de jamón, piña y queso fundido. Pack x7 Unidades.',
        emoji: '🥟',   
        etiqueta: 'Exótico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 81,
        nombre: 'Empanadas Hawaianas x10',
        categoria: 'empanadas',
        precio: 11990,
        descripcion: 'Empanadas rellenas de jamón, piña y queso fundido. Pack x10 Unidades.',
        emoji: '🥟',
        etiqueta: 'Exótico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 82,
        nombre: 'Empanadas Hawaianas x15',
        categoria: 'empanadas',
        precio: 14990,
        descripcion: 'Empanadas rellenas de jamón, piña y queso fundido. Pack x15 Unidades.',
        emoji: '🥟',
        etiqueta: 'Exótico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    
    {
        id: 83,
        nombre: 'Empanadas de Jamón con Queso x7',
        categoria: 'empanadas',
        precio: 8990,
        descripcion: 'Empanadas rellenas de jamón y queso fundido. Pack x7 Unidades.',
        emoji: '🥟',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 84,
        nombre: 'Empanadas de Jamón con Queso x10',
        categoria: 'empanadas',
        precio: 11990,
        descripcion: 'Empanadas rellenas de jamón y queso fundido. Pack x10 Unidades.',
        emoji: '🥟',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 85,
        nombre: 'Empanadas de Jamón con Queso x15',
        categoria: 'empanadas',
        precio: 14990,
        descripcion: 'Empanadas rellenas de jamón y queso fundido. Pack x15 Unidades.',
        emoji: '🥟',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 86,
        nombre: 'Empanadas de Pollo x7',
        categoria: 'empanadas',
        precio: 8990,
        descripcion: 'Empanadas rellenas de pollo desmechado con un toque de especias. Pack x7 unidades.',
        emoji: '🥟',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 87,
        nombre: 'Empanadas de Pollo x10', 
        categoria: 'empanadas',
        precio: 11990,
        descripcion: 'Empanadas rellenas de pollo desmechado con un toque de especias. Pack x10 unidades.',
        emoji: '🥟',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 88,
        nombre: 'Empanadas de Pollo x15', 
        categoria: 'empanadas',
        precio: 14990,
        descripcion: 'Empanadas rellenas de pollo desmechado con un toque de especias. Pack x15 unidades.',
        emoji: '🥟',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 89,
        nombre: 'Empanadas de Carne x7',
        categoria: 'empanadas',
        precio: 8990,
        descripcion: 'Empanadas rellenas de carne molida sazonada con especias tradicionales. Pack x7 unidades.',
        emoji: '🥟',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 90,
        nombre: 'Empanadas de Carne x10',
        categoria: 'empanadas',
        precio: 11990,
        descripcion: 'Empanadas rellenas de carne molida sazonada con especias tradicionales. Pack x10 unidades.',
        emoji: '🥟',
        etiqueta: 'Mixtas',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 91,
        nombre: 'Empanadas de Carne x12',
        categoria: 'empanadas',
        precio: 14990,
        descripcion: 'Empanadas rellenas de carne molida sazonada con especias tradicionales. Pack x12 unidades.',
        emoji: '🥟',
        etiqueta: 'Vegetariano',
        tipoEtiqueta: 'etiqueta-producto'
    },
// === PASABOCAS SIN FRITOS===
    {
        id: 105,
        nombre: 'Combo_01: 50 unidades sin Fritar',
        categoria: 'pasabocas',
        precio: 28990,
        descripcion: 'Incluye 25 deditos y 25 empanadas en tamaño pasaboca sin Fritar. Ideal para reuniones pequeñas.',
        imagen: './Imagenes/Productos/combo_1.png',
        emoji: '🥟',
        etiqueta: 'Económico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 106,
        nombre: 'Combo_02: 100 unidades sin Fritar',
        categoria: 'pasabocas',
        precio: 55990,
        descripcion: 'Incluye 50 deditos, 30 empanadas y 20 medallones en tamaño pasaboca sin Fritar. Perfecto para compartir.',
        imagen: './Imagenes/Productos/combo_2.png',
        emoji: '🍢',
        etiqueta: 'Popular',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 107,
        nombre: 'Combo_03: 150 unidades sin Fritar',
        categoria: 'pasabocas',
        precio: 83990,
        descripcion: 'Incluye 100 deditos, 30 empanadas y 20 medallones en tamaño pasaboca sin Fritar. Ideal para eventos medianos.',
        imagen: './Imagenes/Productos/combo_3.png',
        emoji: '🍴',
        etiqueta: 'Recomendado',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 108,
        nombre: 'Combo_04: 170 unidades sin Fritar',
        categoria: 'pasabocas',
        precio: 94990,
        descripcion: 'Incluye 100 deditos, 50 empanadas y 20 medallones en tamaño pasaboca sin Fritar. Excelente opción para celebraciones.',
        emoji: '🎉',
        imagen: './Imagenes/Productos/combo_4.png',
        etiqueta: 'Favorito',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 109,
        nombre: 'Combo_05: 200 unidades sin Fritar',
        categoria: 'pasabocas',
        precio: 111990,
        descripcion: 'Incluye 100 deditos, 50 empanadas y 50 medallones en tamaño pasaboca sin Fritar. Ideal para eventos grandes.',
        emoji: '🥳',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 111,
        nombre: 'Combo_06: 300 unidades sin Fritar ',
        categoria: 'pasabocas',
        precio: 167990,
        descripcion: 'Incluye 200 deditos, 100 empanadas y 100 medallones en tamaño pasaboca sin Fritar. Ideal para eventos grandes.',
        emoji: '🥳',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-producto'
    },

        // === PASABOCAS FRITOS===
    {
        id: 100,
        nombre: 'Combo_01: 50 unidades Fritos',
        categoria: 'pasabocas',
        precio: 34990,
        descripcion: 'Incluye 25 deditos y 25 empanadas en tamaño pasaboca ya Fritos. Ideal para reuniones pequeñas.',
        imagen: './Imagenes/Productos/combo_1.png',
        emoji: '🥟',
        etiqueta: 'Económico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 101,
        nombre: 'Combo_02: 100 unidades Fritos',
        categoria: 'pasabocas',
        precio: 64990,
        descripcion: 'Incluye 50 deditos, 30 empanadas y 20 medallones en tamaño pasaboca ya Fritos. Perfecto para compartir.',
        imagen: './Imagenes/Productos/combo_2.png',
        emoji: '🍢',
        etiqueta: 'Popular',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 102,
        nombre: 'Combo_03: 150 unidades Fritos',
        categoria: 'pasabocas',
        precio: 97990,
        descripcion: 'Incluye 100 deditos, 30 empanadas y 20 medallones en tamaño pasaboca ya Fritos. Ideal para eventos medianos.',
        imagen: './Imagenes/Productos/combo_3.png',
        emoji: '🍴',
        etiqueta: 'Recomendado',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 103,
        nombre: 'Combo_04: 170 unidades Fritos',
        categoria: 'pasabocas',
        precio: 111990,
        descripcion: 'Incluye 100 deditos, 50 empanadas y 20 medallones en tamaño pasaboca ya Fritos. Excelente opción para celebraciones.',
        emoji: '🎉',
        imagen: './Imagenes/Productos/combo_4.png',
        etiqueta: 'Favorito',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 104,
        nombre: 'Combo_05: 200 unidades Fritos',
        categoria: 'pasabocas',
        precio: 128990,
        descripcion: 'Incluye 100 deditos, 50 empanadas y 50 medallones en tamaño pasaboca ya Fritos. Ideal para eventos grandes.',
        emoji: '🥳',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 110,
        nombre: 'Combo_06: 300 unidades Fritos',
        categoria: 'pasabocas',
        precio: 194990,
        descripcion: 'Incluye 200 deditos, 100 empanadas y 100 medallones en tamaño pasaboca ya Fritos. Ideal para eventos grandes.',
        emoji: '🥳',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-producto'
    },
    
    // === DEDITOS ===
    {
        id: 120,
        nombre: 'Deditos de Queso x10',
        categoria: 'deditos',
        precio: 8990,
        descripcion: 'Crujientes deditos rellenos de queso. Pack x10 unidades.',
        emoji: '🧀',
        imagen: './Imagenes/Productos/Deditos/deditos.png',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 121,
        nombre: 'Deditos de Queso x13',
        categoria: 'deditos',
        precio: 12990,
        descripcion: 'Crujientes deditos rellenos de queso. Pack x13 unidades.',
        emoji: '🧀',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 122,
        nombre: 'Deditos de Queso x18',
        categoria: 'deditos',
        precio: 16990,
        descripcion: 'Crujientes deditos rellenos de queso. Pack x18 unidades.',
        emoji: '🧀',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 123,
        nombre: 'Deditos Mixtos x10',
        categoria: 'deditos',
        precio: 8990,
        descripcion: 'Mezcla de deditos de queso y bocadillo. 5 queso y 5 bocadillo. Pack x10 unidades.',
        emoji: '🧀',
        imagen: './Imagenes/Productos/Deditos/deditos_mixtos.png',
        etiqueta: 'Mixto',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 124,
        nombre: 'Deditos Mixtos x13',
        categoria: 'deditos',
        precio: 11990,
        descripcion: 'Mezcla de deditos de queso y bocadillo. 6 o 7 queso y 6 o 7 bocadillo. Pack x13 unidades.',
        emoji: '🧀',
        imagen: './Imagenes/Productos/Deditos/deditos_mixtos.png',
        etiqueta: 'Mixto',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 125,
        nombre: 'Deditos Mixtos x18',
        categoria: 'deditos',
        precio: 16990,
        descripcion: 'Mezcla de deditos de queso y bocadillo. 9 queso y 9 bocadillo. Pack x18 unidades.',
        emoji: '🧀',
        imagen: './Imagenes/Productos/Deditos/deditos_mixtos.png',
        etiqueta: 'Mixto',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 126,
        nombre: 'Deditos de Combinados x10',
        categoria: 'deditos',
        precio: 8990,
        descripcion: 'Mezcla de queso y bocadillo en cada dedito. Pack x10 unidades.',
       
        imagen: './Imagenes/Productos/Deditos/deditos_combinados.png',
        etiqueta: 'Combinado',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 127,
        nombre: 'Deditos de Combinados x13',
        categoria: 'deditos',
        precio: 11990,
        descripcion: 'Mezcla de queso y bocadillo en cada dedito. Pack x13 unidades.',
        emoji: '🧀',
        imagen: './Imagenes/Productos/Deditos/deditos_combinados.png',
        etiqueta: 'Combinado',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 128,
        nombre: 'Deditos de Combinados x18',
        categoria: 'deditos',
        precio: 16990,
        descripcion: 'Mezcla de queso y bocadillo en cada dedito. Pack x18 unidades.',
       
        imagen: './Imagenes/Productos/Deditos/deditos_combinados.png',
        etiqueta: 'Combinado',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 129,
        nombre: 'Deditos de Bocadillo x10',
        categoria: 'deditos',
        precio: 8990,
        descripcion: 'Deditos rellenos de bocadillo. Pack x10 unidades.',
        emoji: '🍬',
        imagen: './Imagenes/Productos/Deditos/deditos_bocadillo.png',
        etiqueta: 'Dulce',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 130,
        nombre: 'Deditos de Bocadillo x13',
        categoria: 'deditos',
        precio: 11990,
        descripcion: 'Deditos rellenos de bocadillo. Pack x13 unidades.',
        emoji: '🍬',
        imagen: './Imagenes/Productos/Deditos/deditos_bocadillo.png',
        etiqueta: 'Dulce',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 131,
        nombre: 'Deditos de Bocadillo x18',
        categoria: 'deditos',
        precio: 16990,
        descripcion: 'Deditos rellenos de bocadillo. Pack x18 unidades.',
        emoji: '🍬',
        imagen: './Imagenes/Productos/Deditos/deditos_bocadillo.png',
        etiqueta: 'Dulce',
        tipoEtiqueta: 'etiqueta-producto'
    },

    // === MEDALLONES ===
    {
        id: 140,
        nombre: 'Medallones x20',
        categoria: 'medallones',
        precio: 11990,
        descripcion: 'Medallones tradicionales. Pack x20 unidades.',
        emoji: '🍖',
        imagen: './Imagenes/Productos/Medallones/medallones_carne.png',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 141,
        nombre: 'Medallones x30',
        categoria: 'medallones',
        precio: 16990,
        descripcion: 'Medallones tradicionales. Pack x20 unidades.',
        emoji: '🍖',
        imagen: './Imagenes/Productos/Medallones/medallones_carne.png',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },

];


// === VARIABLES GLOBALES ===
let carritoCompras = [];
let filtroActual = 'todos';
let deferredPrompt = null; // Variable global para capturar el evento de instalación

// === INICIALIZACIÓN DE LA APP ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Alimento del Cielo PWA...');
    renderizarProductos();
    cargarTema();
    cargarCarritoGuardado();
    mostrarPromptInstalacion();
    registrarServiceWorker();
    generarCodigoReferido();
    configurarBusqueda();
    configurarEventos();
});

// === RENDERIZADO DE PRODUCTOS ===
function renderizarProductos() {
    const grilla = document.getElementById('grillaProductos');
    let productosFiltrados = productos;

    // Aplicar filtro de categoría
    if (filtroActual !== 'todos') {
        productosFiltrados = productos.filter(producto => 
            producto.categoria === filtroActual
        );
    }

    // Aplicar filtro de búsqueda
    const terminoBusqueda = document.getElementById('campoBusqueda')?.value.toLowerCase();
    if (terminoBusqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoBusqueda) ||
            producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
            producto.categoria.toLowerCase().includes(terminoBusqueda)
        );
    }

    // Generar HTML
    if (productosFiltrados.length === 0) {
        grilla.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>😕 No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda o revisa otra categoría.</p>
                <button class="boton boton-primario" onclick="limpiarFiltros()">
                    🔄 Ver todos los productos
                </button>
            </div>
        `;
        return;
    }



    grilla.innerHTML = productosFiltrados.map(producto => `
        <article class="tarjeta-producto entrada-animada">
            <div class="imagen-producto">
                ${producto.imagen ? `
                    <img src="${producto.imagen}" 
                        alt="${producto.nombre}" 
                        class="producto-img"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="emoji-fallback" style="display: none;">${producto.emoji}</div>
                ` : `
                    <div class="emoji-fallback">${producto.emoji}</div>
                `}
                <div class="etiqueta-producto ${producto.tipoEtiqueta}">
                    ${producto.etiqueta || ''}
                </div>
            </div>
            <div class="info-producto">
                <h3 class="titulo-producto">${producto.nombre}</h3>
                <p class="descripcion-producto">${producto.descripcion}</p>

                <div class="meta-producto">
                    ${producto.unidadMedida ? `<span class="unidad-medida">${producto.unidadMedida}</span>` : ''}
                    ${producto.pesoAproximado ? `<span class="peso-aproximado">${producto.pesoAproximado}</span>` : ''}
                </div>

                <div class="precio-producto">
                    ${producto.precio.toLocaleString('es-CO')}
                </div>
                <div class="acciones-producto">
                    <button class="boton boton-primario" onclick="agregarAlCarrito(${producto.id})">
                        🛒 Agregar
                    </button>
                    <a href="${generarEnlaceWhatsApp(producto)}" 
                    class="boton boton-whatsapp" 
                    target="_blank">
                        💬 WhatsApp
                    </a>

                    <!-- BOTÓN DESTACADO solo para producto id 1 -->
                    ${producto.id === 1 ? `
                        <button class="boton boton-destacado" onclick="mostrarSimuladorPollo(${producto.id})">
                        🔢 Simular peso (Pollo)
                        </button>
                    ` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

// === AGREGAR PRODUCTO ===
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    const itemExistente = carritoCompras.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += 1; // suma cantidad
    } else {
        carritoCompras.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
}

// === ELIMINAR PRODUCTO ===
function removerDelCarrito(idProducto) {
    carritoCompras = carritoCompras.filter(item => item.id != idProducto); // Permite comparar string y número
    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion("🗑️ Producto eliminado del carrito");
}

// === CAMBIAR CANTIDAD ===
function cambiarCantidad(idProducto, nuevaCantidad) {
    const item = carritoCompras.find(item => item.id == idProducto); // Permite comparar string y número
    if (!item) return;

    if (nuevaCantidad <= 0) {
        removerDelCarrito(idProducto);
        return;
    }

    item.cantidad = nuevaCantidad;
    guardarCarrito();
    actualizarCarrito();
}

// === ACTUALIZAR VISTA DEL CARRITO ===
function actualizarCarrito() {
    const contadorCarrito = document.getElementById("contadorCarrito");
    const itemsCarrito = document.getElementById("itemsCarrito");
    const montoTotal = document.getElementById("montoTotal");
    const carritoVacio = document.getElementById("carritoVacio");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!contadorCarrito || !itemsCarrito || !montoTotal) {
        console.error("⚠️ Revisa que en tu HTML existan los IDs: contadorCarrito, itemsCarrito y montoTotal");
        return;
    }

    // contador
    const totalItems = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
    contadorCarrito.style.display = totalItems > 0 ? "flex" : "none";

    // carrito vacío
    if (carritoCompras.length === 0) {
        if (carritoVacio) carritoVacio.style.display = "block";
        if (totalCarrito) totalCarrito.style.display = "none";

        itemsCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h3>🛒 Tu carrito está vacío</h3>
                <p>¡Agrega algunos productos deliciosos!</p>
            </div>
        `;
        montoTotal.textContent = "0";
        return;
    }

    if (carritoVacio) carritoVacio.style.display = "none";
    if (totalCarrito) totalCarrito.style.display = "block";

    // lista de productos
    itemsCarrito.innerHTML = carritoCompras.map(item => `
<div class="item-carrito">
    <div class="imagen-item-carrito">
    <img src="${item.imagen ? item.imagen : ''}" 
        alt="${item.nombre}" 
        class="carrito-img"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <div class="emoji-fallback-carrito" style="display: ${item.imagen ? 'none' : 'flex'};">${item.emoji}</div>
    </div>
    <div class="info-item-carrito">
    <div class="titulo-item-carrito">${item.nombre}</div>
      <div class="precio-item-carrito">$${(item.precio * item.cantidad).toLocaleString("es-CO")}</div>
    <div class="controles-cantidad">
        <button class="btn-cantidad" onclick="cambiarCantidad('${item.id}', ${item.cantidad - 1})">−</button>
        <span class="cantidad-texto">${item.cantidad}</span>
        <button class="btn-cantidad" onclick="cambiarCantidad('${item.id}', ${item.cantidad + 1})">+</button>
        <button class="btn-cantidad btn-eliminar" onclick="removerDelCarrito('${item.id}')">🗑️</button>
    </div>
    </div>
</div>
`).join("");



    // total
    const total = carritoCompras.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    montoTotal.textContent = total.toLocaleString("es-CO");
}


// === LIMPIAR CARRITO ===

function limpiarCarrito() {
    carritoCompras = [];
    actualizarCarrito();
    guardarCarrito();
    mostrarNotificacion('🧹 Carrito vaciado');
}

// === COMBOS ===
function agregarComboAlCarrito(tipoCombo) {
    let combo = {};
    
    if (tipoCombo === 'combo-familiar') {
        combo = {
            id: 'combo-1',
            nombre: '🏠 Combo Familiar Completo',
            precio: 40000,
            cantidad: 1,
            emoji: '🎁',
            esCombo: true
        };
    } else if (tipoCombo === 'combo-airfryer') {
        combo = {
            id: 'combo-2',
            nombre: '⚡ Combo Express Airfryer',
            precio: 35000,
            cantidad: 1,
            emoji: '🔥',
            esCombo: true
        };
    }

    const itemExistente = carritoCompras.find(item => item.id === combo.id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carritoCompras.push(combo);
    }

    actualizarCarrito();
    guardarCarrito();
    mostrarNotificacion(`🎁 ${combo.nombre} agregado al carrito`);
}

// === FILTROS ===
function filtrarPorCategoria(categoria, boton) {
    filtroActual = categoria;
    
    // Actualizar botones de filtro
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('activo');
    });
    boton.classList.add('activo');

    renderizarProductos();
}

function filtrarProductos() {
    renderizarProductos();
}

function limpiarFiltros() {
    filtroActual = 'todos';
    document.getElementById('campoBusqueda').value = '';
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('activo');
    });
    document.querySelector('.btn-filtro').classList.add('activo');
    renderizarProductos();
}

// === WHATSAPP ===
function generarEnlaceWhatsApp(producto) {
    const mensaje = `¡Hola! 👋 
            
Estoy interesado en:
🛍️ *${producto.nombre}*
💰 Precio: $${producto.precio.toLocaleString('es-CO')}

${producto.descripcion}

¿Está disponible para entrega?`;

    return `https://wa.me/573135212887?text=${encodeURIComponent(mensaje)}`;
}

function finalizarPorWhatsApp() {
    if (carritoCompras.length === 0) {
        mostrarNotificacion('⚠️ Tu carrito está vacío', 'error');
        return;
    }

    let mensaje = `¡Hola! 👋 Quiero hacer el siguiente pedido:

🛒 *MI PEDIDO:*
`;

    carritoCompras.forEach(item => {
        mensaje += `
${item.emoji} *${item.nombre}*
   Cantidad: ${item.cantidad}
   Precio: $${(item.precio * item.cantidad).toLocaleString('es-CO')}
`;
    });

    const total = carritoCompras.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    mensaje += `
💰 *TOTAL: $${total.toLocaleString('es-CO')}*

📍 ¿Podrían confirmar disponibilidad y coordinar la entrega?

¡Gracias! 😊`;

    // Guardar pedido en historial
    guardarPedidoEnHistorial();

    window.open(`https://wa.me/573135212887?text=${encodeURIComponent(mensaje)}`, '_blank');
    
    // Limpiar carrito después de 3 segundos
    setTimeout(() => {
        limpiarCarrito();
        cerrarCarrito();
        mostrarNotificacion('✅ ¡Pedido enviado! Te contactaremos pronto');
    }, 3000);
}

// === PAGOS EN LÍNEA ===
function procesarPago() {
    if (carritoCompras.length === 0) {
        mostrarNotificacion('⚠️ Tu carrito está vacío', 'error');
        return;
    }

    // Simular proceso de pago
    mostrarNotificacion('💳 Procesando pago...');
    
    setTimeout(() => {
        mostrarNotificacion('🚧 Función en desarrollo. Usa WhatsApp por ahora.', 'error');
    }, 2000);
    
    // Aquí se integrarían las pasarelas de pago como:
    // - Wompi, Mercado Pago, Nequi, Daviplata
    
    console.log('💳 Procesando pago para:', carritoCompras);
}

// === PROGRAMA DE REFERIDOS ===
function generarCodigoReferido() {
    const prefijos = ['AMIGO', 'FAMILIA', 'CIELO', 'SABOR'];
    const sufijos = ['PREMIUM', 'VIP', 'ESPECIAL', 'GOLD'];
    const numero = Math.floor(Math.random() * 999) + 100;
    
    const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
    const sufijo = sufijos[Math.floor(Math.random() * sufijos.length)];
    
    const codigo = `${prefijo}-${sufijo}-${numero}`;
    document.getElementById('codigoReferido').textContent = codigo;
}

function compartirCodigoReferido() {
    const codigo = document.getElementById('codigoReferido').textContent;
    const mensaje = `🎉 ¡Te invito a conocer Alimento del Cielo! 

Usa mi código de referido: *${codigo}* 
y obtén 10% de descuento en tu primera compra.

🍽️ Los mejores alimentos congelados de Bogotá
⚡ Perfectos para airfryer
🚚 Entrega rápida y segura

¡No te pierdas esta oportunidad! 😋`;

    if (navigator.share) {
        navigator.share({
            title: 'Alimento del Cielo - Código de Referido',
            text: mensaje
        }).then(() => {
            mostrarNotificacion('📱 ¡Código compartido exitosamente!');
        });
    } else {
        navigator.clipboard.writeText(mensaje).then(() => {
            mostrarNotificacion('📋 ¡Código copiado! Compártelo con tus amigos');
        });
    }
}

// === TEMA CLARO/OSCURO ===
function alternarTema() {
    document.body.classList.toggle('modo-oscuro');
    const esModoOscuro = document.body.classList.contains('modo-oscuro');
    
    document.getElementById('iconoTema').textContent = esModoOscuro ? '☀️' : '🌙';
    localStorage.setItem('tema', esModoOscuro ? 'oscuro' : 'claro');
    
    mostrarNotificacion(`🎨 Tema ${esModoOscuro ? 'oscuro' : 'claro'} activado`);
}

function cargarTema() {
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        document.getElementById('iconoTema').textContent = '☀️';
    }
}

// === CARRITO SIDEBAR ===
function alternarCarrito() {
    const sidebar = document.getElementById('sidebarCarrito');
    const overlay = document.getElementById('overlay');
    
    const estaAbierto = sidebar.classList.contains('abierto');
    
    if (estaAbierto) {
        cerrarCarrito();
    } else {
        abrirCarrito();
    }
}

function abrirCarrito() {
    const sidebar = document.getElementById('sidebarCarrito');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.add('abierto');
    overlay.classList.add('mostrar');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

function cerrarCarrito() {
    const sidebar = document.getElementById('sidebarCarrito');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.remove('abierto');
    overlay.classList.remove('mostrar');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// === NOTIFICACIONES ===
function mostrarNotificacion(mensaje, tipo = 'exito') {
    const notificacion = document.getElementById('notificacion');
    const textoNotificacion = document.getElementById('textoNotificacion');
    
    textoNotificacion.textContent = mensaje;
    notificacion.className = `notificacion mostrar ${tipo === 'error' ? 'error' : ''}`;
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
    }, 3000);
}


// === PWA E INSTALACIÓN ===
function mostrarPromptInstalacion() {
    // Capturar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (evento) => {
        console.log('✅ Evento beforeinstallprompt capturado');
        
        // Prevenir que el navegador muestre su propio prompt
        evento.preventDefault();
        
        // Guardar el evento para usarlo después
        deferredPrompt = evento;
        
        // Mostrar el botón de instalación
        mostrarBotonFABInstalar();
        
        // Mostrar popup promocional (opcional) solo la primera vez
        setTimeout(() => {
            const popupCerrado = localStorage.getItem('popupInstalacionCerrado');
            if (!popupCerrado) {
                const promptElement = document.getElementById('promptInstalacion');
                if (promptElement) {
                    promptElement.classList.add('mostrar');
                }
            }
        }, 5000);
    });
    
    // Detectar si la app ya está instalada
    window.addEventListener('appinstalled', (evento) => {
        console.log('✅ PWA instalada exitosamente');
        deferredPrompt = null;
        mostrarNotificacion('🎉 ¡App instalada! Encuéntrala en tu pantalla de inicio');
    });
    
    // Verificar si ya está ejecutándose en modo standalone (instalada)
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        console.log('ℹ️ La app ya está instalada y ejecutándose en modo standalone');
    }
    
    // Mostrar el botón siempre (se ocultará solo si no hay soporte)
    mostrarBotonFABInstalar();
}

function mostrarBotonFABInstalar() {
    const btnFab = document.getElementById('btnFabInstalar');
    if (btnFab) {
        btnFab.classList.remove('oculto');
        
        // Animación de entrada
        setTimeout(() => {
            btnFab.style.opacity = '1';
            btnFab.style.visibility = 'visible';
            btnFab.style.transform = 'translateY(0)';
        }, 100);
    }
}

function ocultarBotonFABInstalar() {
    const btnFab = document.getElementById('btnFabInstalar');
    if (btnFab) {
        btnFab.style.opacity = '0';
        btnFab.style.visibility = 'hidden';
        btnFab.style.transform = 'translateY(100px)';
        
        setTimeout(() => {
            btnFab.classList.add('oculto');
        }, 300);
    }
}

function instalarPWA() {
    console.log('🚀 Intentando instalar PWA...');
    
    // Verificar si ya está ejecutándose como app instalada
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        mostrarNotificacion('ℹ️ La app ya está instalada. Puedes reinstalarla desde el menú del navegador si lo deseas.', 'exito');
        return;
    }
    
    // Si tenemos el evento de instalación guardado
    if (deferredPrompt) {
        console.log('✅ Mostrando prompt de instalación nativo');
        
        // Mostrar el prompt de instalación nativo
        deferredPrompt.prompt();
        
        // Esperar a que el usuario responda
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ Usuario aceptó la instalación');
                mostrarNotificacion('🎉 ¡Instalando la app! Búscala en tu pantalla de inicio');
            } else {
                console.log('❌ Usuario canceló la instalación');
                mostrarNotificacion('ℹ️ Instalación cancelada. Puedes instalarla cuando quieras', 'exito');
            }
            
            // Resetear el prompt (aunque el navegador lo hace automáticamente)
            deferredPrompt = null;
        }).catch((error) => {
            console.error('❌ Error al mostrar el prompt:', error);
            mostrarNotificacion('⚠️ Error al instalar. Intenta desde el menú del navegador', 'error');
        });
        
        // Cerrar el popup promocional si está abierto
        cerrarPromptInstalacion();
    } else {
        // No hay evento disponible
        console.log('⚠️ No hay evento beforeinstallprompt disponible');
        
        // Verificar el navegador y mostrar mensaje apropiado
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        const isEdge = /Edg/.test(navigator.userAgent);
        const isOpera = /OPR/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
        
        if (isIOS && isSafari) {
            mostrarNotificacion('📱 En iOS: Toca el botón "Compartir" y luego "Añadir a pantalla de inicio"', 'exito');
        } else if (isChrome || isEdge || isOpera) {
            mostrarNotificacion('💻 Busca el icono ⊕ "Instalar" en la barra de direcciones o en el menú del navegador', 'exito');
        } else {
            mostrarNotificacion('⚠️ Este navegador no soporta instalación automática de PWAs', 'error');
        }
    }
}

function cerrarPromptInstalacion() {
    const promptElement = document.getElementById('promptInstalacion');
    if (promptElement) {
        promptElement.classList.remove('mostrar');
    }
    localStorage.setItem('popupInstalacionCerrado', 'true');
}

// === SERVICE WORKER ===
function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('🔧 Service Worker registrado:', registration);
                
                // Verificar actualizaciones
                registration.addEventListener('updatefound', () => {
                    const nuevoWorker = registration.installing;
                    nuevoWorker.addEventListener('statechange', () => {
                        if (nuevoWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                mostrarNotificacion('🔄 Nueva versión disponible. Recarga la página.');
                            }
                        }
                    });
                });
            })
            .catch(error => console.log('❌ Error en Service Worker:', error));
    }
}

// === CONFIGURACIÓN DE BÚSQUEDA ===
function configurarBusqueda() {
    const campoBusqueda = document.getElementById('campoBusqueda');
    let tiempoBusqueda;
    
    campoBusqueda.addEventListener('input', function() {
        clearTimeout(tiempoBusqueda);
        tiempoBusqueda = setTimeout(() => {
            filtrarProductos();
        }, 300);
    });
}

// === CONFIGURAR EVENTOS ===
function configurarEventos() {
    // Cerrar carrito con tecla Escape
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            const carrito = document.getElementById('sidebarCarrito');
            if (carrito && carrito.classList.contains('abierto')) {
                cerrarCarrito();
            }
        }
    });

    // Cerrar notificación al hacer click
    const notificacion = document.getElementById('notificacion');
    if (notificacion) {
        notificacion.addEventListener('click', function() {
            this.classList.remove('mostrar');
        });
    }

    // Evento cuando la PWA se instala exitosamente
    window.addEventListener('appinstalled', (evento) => {
        console.log('✅ PWA instalada exitosamente');
        deferredPrompt = null;
        mostrarNotificacion('🎉 ¡App instalada! Búscala en tu pantalla de inicio');
    });
    
    // Detectar si se está ejecutando como PWA instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('ℹ️ La app está ejecutándose en modo standalone (instalada)');
    }
}

// === PERSISTENCIA DEL CARRITO ===
function guardarCarrito() {
    try {
        localStorage.setItem('carritoAlimentoDelCielo', JSON.stringify(carritoCompras));
    } catch (error) {
        console.error('Error al guardar carrito:', error);
    }
}

function cargarCarritoGuardado() {
    try {
        const carritoGuardado = localStorage.getItem('carritoAlimentoDelCielo');
        if (carritoGuardado) {
            carritoCompras = JSON.parse(carritoGuardado);
            actualizarCarrito();
        }
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        carritoCompras = [];
    }
}

// === HISTORIAL DE PEDIDOS ===
function guardarPedidoEnHistorial() {
    try {
        const historialPedidos = JSON.parse(localStorage.getItem('historialPedidos') || '[]');
        
        const nuevoPedido = {
            fecha: new Date().toISOString(),
            items: [...carritoCompras],
            total: carritoCompras.reduce((suma, item) => suma + (item.precio * item.cantidad), 0)
        };
        
        historialPedidos.push(nuevoPedido);
        
        // Mantener solo los últimos 10 pedidos
        if (historialPedidos.length > 10) {
            historialPedidos.splice(0, historialPedidos.length - 10);
        }
        
        localStorage.setItem('historialPedidos', JSON.stringify(historialPedidos));
    } catch (error) {
        console.error('Error al guardar historial:', error);
    }
}

function obtenerHistorialPedidos() {
    try {
        return JSON.parse(localStorage.getItem('historialPedidos') || '[]');
    } catch (error) {
        console.error('Error al obtener historial:', error);
        return [];
    }
}

// === FUNCIONES AUXILIARES ===
function scrollearAProductos() {
    const grilla = document.querySelector('.grilla-productos');
    if (grilla) {
        grilla.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function formatearPrecio(precio) {
    return `${precio.toLocaleString('es-CO')}`;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    const regex = /^(\+57|57)?[0-9]{10}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

// === ANALÍTICAS BÁSICAS ===
function enviarEventoAnalytics(evento, categoria, accion) {
    // Google Analytics 4 (gtag)
    if (typeof gtag !== 'undefined') {
        gtag('event', evento, {
            event_category: categoria,
            event_label: accion
        });
    }
    
    // Console log para desarrollo
    console.log(`📊 Analytics: ${categoria} - ${evento} - ${accion}`);
}

// === GESTIÓN DE ERRORES ===
window.addEventListener('error', function(evento) {
    console.error('❌ Error en la aplicación:', evento.error);
    mostrarNotificacion('⚠️ Ocurrió un error. Intenta recargar la página.', 'error');
});

window.addEventListener('unhandledrejection', function(evento) {
    console.error('❌ Promise rechazada:', evento.reason);
});

// === CONECTIVIDAD ===
function verificarConectividad() {
    if (navigator.onLine) {
        document.body.classList.remove('modo-offline');
        mostrarNotificacion('🌐 Conexión restaurada');
    } else {
        document.body.classList.add('modo-offline');
        mostrarNotificacion('📶 Sin conexión - Modo offline', 'error');
    }
}

window.addEventListener('online', verificarConectividad);
window.addEventListener('offline', verificarConectividad);

// === OPTIMIZACIONES DE RENDIMIENTO ===
function optimizarImagenes() {
    // Lazy loading para imágenes futuras
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        // Observar imágenes con data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// === FUNCIONES PÚBLICAS DE LA API ===
window.AlimentoDelCielo = {
    // Carrito
    agregarProducto: agregarAlCarrito,
    removerProducto: removerDelCarrito,
    limpiarCarrito: limpiarCarrito,
    obtenerCarrito: () => [...carritoCompras],
    
    // Productos
    obtenerProductos: () => [...productos],
    buscarProductos: (termino) => productos.filter(p => 
        p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(termino.toLowerCase())
    ),
    
    // Utilidades
    formatearPrecio: formatearPrecio,
    mostrarNotificacion: mostrarNotificacion,
    
    // Historial
    obtenerHistorial: obtenerHistorialPedidos,
    
    // PWA
    instalar: instalarPWA,
    
    // Analytics
    analytics: enviarEventoAnalytics
};



// === INICIALIZACIÓN FINAL ===
document.addEventListener('DOMContentLoaded', function() {
    // Optimizar imágenes
    optimizarImagenes();
    
    // Verificar conectividad inicial
    verificarConectividad();
    
    console.log('✅ Alimento del Cielo PWA completamente inicializada');
    console.log('📱 Funcionalidades disponibles:');
    console.log('  🛒 Carrito de compras completo');
    console.log('  💬 Integración WhatsApp Business');
    console.log('  🎁 Sistema de combos');
    console.log('  🔍 Búsqueda y filtros');
    console.log('  🌙 Modo claro/oscuro');
    console.log('  📱 PWA instalable');
    console.log('  💾 Persistencia de datos');
    console.log('  📊 Analytics básicas');
    console.log('Usa window.AlimentoDelCielo para acceder a la API');
});



// ========================================
// INTEGRACIÓN DE WOMPI - FRONTEND
// Agregar al final de script.js
// ========================================

// === CONFIGURACIÓN WOMPI ===
const WOMPI_CONFIG = {
    // ⚠️ CAMBIAR POR TU LLAVE PÚBLICA
    publicKey: 'pub_test_QhUoFSL5mYyzHcfweWwfHT4JNI3jHujU', // Ejemplo de llave de prueba
    apiUrl: 'https://production.wompi.co/v1',
    // URL de tu backend serverless (Netlify Functions)
    backendUrl: '/.netlify/functions', // O tu URL de producción
    moneda: 'COP'
};

// === PROCESAR PAGO CON WOMPI ===
async function procesarPago() {
    if (carritoCompras.length === 0) {
        mostrarNotificacion('⚠️ Tu carrito está vacío', 'error');
        return;
    }

    // Calcular total
    const total = carritoCompras.reduce((suma, item) => 
        suma + (item.precio * item.cantidad), 0
    );

    // Mostrar modal de pago
    mostrarModalDatosPago(total);
}

// === MODAL PARA DATOS DEL CLIENTE ===
function mostrarModalDatosPago(total) {
    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.id = 'modalPagoWompi';
    modal.innerHTML = `
        <div class="contenido-modal-instalacion" style="max-width: 500px;">
            <button class="cerrar-modal" onclick="cerrarModalPago()">✕</button>
            <h3>💳 Finalizar Compra</h3>
            <p style="margin-bottom: 1rem;">Total a pagar: <strong style="color: var(--color-primario); font-size: 1.5rem;">$${total.toLocaleString('es-CO')}</strong></p>
            
            <form id="formDatosPago" style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
                        📧 Correo Electrónico *
                    </label>
                    <input 
                        type="email" 
                        id="emailPago" 
                        class="caja-busqueda" 
                        placeholder="tu@email.com"
                        required
                        style="margin: 0;"
                    >
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
                        👤 Nombre Completo *
                    </label>
                    <input 
                        type="text" 
                        id="nombrePago" 
                        class="caja-busqueda" 
                        placeholder="Juan Pérez"
                        required
                        style="margin: 0;"
                    >
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
                        📱 Teléfono *
                    </label>
                    <input 
                        type="tel" 
                        id="telefonoPago" 
                        class="caja-busqueda" 
                        placeholder="3001234567"
                        required
                        pattern="[0-9]{10}"
                        style="margin: 0;"
                    >
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
                        📍 Dirección de Entrega
                    </label>
                    <textarea 
                        id="direccionPago" 
                        class="caja-busqueda" 
                        placeholder="Calle 123 #45-67, Barrio, Ciudad"
                        rows="2"
                        style="margin: 0; resize: vertical;"
                    ></textarea>
                </div>
                
                <button 
                    type="submit" 
                    class="boton boton-primario" 
                    style="width: 100%; margin-top: 1rem;"
                >
                    💳 Pagar con Wompi
                </button>
                
                <button 
                    type="button" 
                    class="boton boton-whatsapp" 
                    onclick="cerrarModalPago()"
                    style="width: 100%;"
                >
                    ❌ Cancelar
                </button>
            </form>
            
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(37, 99, 235, 0.1); border-radius: 0.5rem; font-size: 0.85rem;">
                <p style="margin: 0;"><strong>🔒 Pago seguro con Wompi</strong></p>
                <p style="margin: 0.5rem 0 0 0;">Acepta tarjetas débito/crédito, PSE, Nequi y más</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar evento al formulario
    document.getElementById('formDatosPago').addEventListener('submit', async (e) => {
        e.preventDefault();
        await iniciarPagoWompi(total);
    });
}

function cerrarModalPago() {
    const modal = document.getElementById('modalPagoWompi');
    if (modal) {
        modal.remove();
    }
}

// === INICIAR PROCESO DE PAGO CON WOMPI ===
function iniciarPagoWompi(total) {
    const email = document.getElementById('emailPago').value.trim();
    const nombre = document.getElementById('nombrePago').value.trim();
    const telefono = document.getElementById('telefonoPago').value.trim();
    const direccion = document.getElementById('direccionPago').value.trim();

    // validaciones...
    // Deshabilitar botón
    const botonPagar = document.querySelector('#formDatosPago button[type="submit"]');
    const textoOriginal = botonPagar.innerHTML;
    botonPagar.disabled = true;
    botonPagar.innerHTML = '⏳ Procesando...';

    (async () => {
        try {
            const referencia = `ADC-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;

            const datosPedido = {
                monto: total,
                moneda: WOMPI_CONFIG.moneda,
                referencia: referencia,
                email: email,
                nombre: nombre,
                telefono: telefono,
                direccion: direccion,
                productos: carritoCompras.map(item => ({ nombre: item.nombre, cantidad: item.cantidad, precio: item.precio }))
            };

            const response = await fetch(`${WOMPI_CONFIG.backendUrl}/crear-transaccion-wompi`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosPedido)
            });

            const text = await response.text();
            let resultado;
            try { resultado = JSON.parse(text); } catch { throw new Error(`Respuesta no JSON: ${text}`); }

            if (!response.ok || !resultado.exito) {
                const errMsg = resultado?.error || resultado?.message || JSON.stringify(resultado);
                throw new Error(errMsg);
            }

            // Guardar pedido
            guardarInfoPedido(referencia, datosPedido, resultado.transaccion || resultado.transaccion);

            cerrarModalPago();

            if (resultado.checkout_url) {
                mostrarNotificacion('✅ Redirigiendo a la pasarela de pago...');
                setTimeout(()=> window.location.href = resultado.checkout_url, 800);
            } else {
                throw new Error('No se recibió URL de checkout');
            }

        } catch (error) {
            console.error('Error al procesar pago:', error);
            mostrarNotificacion(`❌ Error: ${error.message || 'Error creando transacción'}`, 'error');
            botonPagar.disabled = false;
            botonPagar.innerHTML = textoOriginal;
        }
    })();
}

// === GUARDAR INFORMACIÓN DEL PEDIDO ===
function guardarInfoPedido(referencia, datosPedido, transaccion) {
    try {
        const pedido = {
            referencia: referencia,
            fecha: new Date().toISOString(),
            estado: 'pendiente',
            datos: datosPedido,
            transaccion: transaccion,
            carrito: [...carritoCompras]
        };

        // Guardar en localStorage
        const pedidosGuardados = JSON.parse(localStorage.getItem('pedidosWompi') || '[]');
        pedidosGuardados.push(pedido);
        
        // Mantener solo los últimos 20 pedidos
        if (pedidosGuardados.length > 20) {
            pedidosGuardados.splice(0, pedidosGuardados.length - 20);
        }
        
        localStorage.setItem('pedidosWompi', JSON.stringify(pedidosGuardados));
        localStorage.setItem('ultimoPedido', JSON.stringify(pedido));

        console.log('✅ Pedido guardado:', referencia);
    } catch (error) {
        console.error('Error al guardar pedido:', error);
    }
}

// === VERIFICAR ESTADO DE PAGO ===
async function verificarEstadoPago(transaccionId) {
    try {
        const response = await fetch(
            `${WOMPI_CONFIG.backendUrl}/verificar-pago-wompi?id=${transaccionId}`
        );
        
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error('Error al verificar pago:', error);
        return null;
    }
}

// === PÁGINA DE CONFIRMACIÓN ===
// Agregar esta función para manejar la confirmación después del pago
function manejarConfirmacionPago() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const transaccionId = urlParams.get('id');
    
    if (transaccionId) {
        verificarYMostrarEstadoPago(transaccionId);
    }
}

async function verificarYMostrarEstadoPago(transaccionId) {
    mostrarNotificacion('⏳ Verificando pago...');
    
    try {
        const estado = await verificarEstadoPago(transaccionId);
        
        if (estado && estado.data) {
            const status = estado.data.status;
            
            if (status === 'APPROVED') {
                mostrarNotificacion('✅ ¡Pago aprobado! Gracias por tu compra');
                limpiarCarrito();
                
                // Mostrar modal de éxito
                mostrarModalExitoPago(estado.data);
            } else if (status === 'DECLINED') {
                mostrarNotificacion('❌ Pago rechazado. Intenta con otro método', 'error');
            } else if (status === 'PENDING') {
                mostrarNotificacion('⏳ Pago pendiente. Te notificaremos cuando se confirme', 'exito');
            } else {
                mostrarNotificacion(`ℹ️ Estado del pago: ${status}`, 'exito');
            }
        }
    } catch (error) {
        console.error('Error al verificar estado:', error);
        mostrarNotificacion('⚠️ No se pudo verificar el estado del pago', 'error');
    }
}

function mostrarModalExitoPago(datos) {
    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.innerHTML = `
        <div class="contenido-modal-instalacion">
            <h3 style="color: var(--color-exito);">✅ ¡Pago Exitoso!</h3>
            <p style="font-size: 1.1rem; margin: 1rem 0;">
                Tu pedido ha sido confirmado
            </p>
            <div style="background: var(--fondo-claro); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                <p><strong>Referencia:</strong> ${datos.reference}</p>
                <p><strong>Monto:</strong> $${(datos.amount_in_cents / 100).toLocaleString('es-CO')}</p>
                <p><strong>Estado:</strong> Aprobado ✅</p>
            </div>
            <p style="margin: 1rem 0;">
                Recibirás un correo de confirmación con los detalles de tu pedido.
                Nos pondremos en contacto contigo pronto para coordinar la entrega.
            </p>
            <button 
                class="boton boton-primario" 
                onclick="this.closest('.modal-instalacion').remove(); window.location.href='/';"
                style="width: 100%; margin-top: 1rem;"
            >
                🏠 Volver al inicio
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// === WIDGET WOMPI (ALTERNATIVA) ===
// Si prefieres usar el widget embebido de Wompi en lugar de redirección
function mostrarWidgetWompi(total, email, referencia) {
    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.id = 'modalWidgetWompi';
    modal.innerHTML = `
        <div class="contenido-modal-instalacion" style="max-width: 600px;">
            <button class="cerrar-modal" onclick="cerrarWidgetWompi()">✕</button>
            <h3>💳 Pago Seguro con Wompi</h3>
            <div id="wompi-widget-container"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cargar script de Wompi
    if (!document.getElementById('wompi-script')) {
        const script = document.createElement('script');
        script.id = 'wompi-script';
        script.src = 'https://checkout.wompi.co/widget.js';
        script.setAttribute('data-render', 'button');
        script.setAttribute('data-public-key', WOMPI_CONFIG.publicKey);
        script.setAttribute('data-currency', WOMPI_CONFIG.moneda);
        script.setAttribute('data-amount-in-cents', total * 100);
        script.setAttribute('data-reference', referencia);
        script.setAttribute('data-customer-email', email);
        
        document.getElementById('wompi-widget-container').appendChild(script);
    }
}

function cerrarWidgetWompi() {
    const modal = document.getElementById('modalWidgetWompi');
    if (modal) {
        modal.remove();
    }
}

// === INICIALIZAR VERIFICACIÓN AL CARGAR ===
document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en la página de confirmación
    if (window.location.pathname.includes('confirmacion-pago')) {
        manejarConfirmacionPago();
    }
});

// === HELPERS DE VALIDACIÓN ===
// (Ya existen en tu código, pero los incluyo por completitud)
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]{10}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

console.log('✅ Integración de Wompi cargada correctamente');
console.log('🔑 Llave pública:', WOMPI_CONFIG.publicKey);


// === SIMULADOR DE PRECIO POR PESO (Pollo entero) ===

function mostrarSimuladorPollo() {
    // Buscar producto pollo (id 1)
    const producto = productos.find(p => p.id === 1) || productos.find(p => p.categoria === 'pollo');
    if (!producto) {
        mostrarNotificacion('❌ Producto pollo no encontrado', 'error');
        return;
    }

    // Intentar derivar peso medio desde pesoAproximado (ej: "2400 - 3000 g")
    const pesoMedioKg = obtenerPesoMedioKg(producto.pesoAproximado);
    // Derivar precio/kg si se puede (si producto.precio se refiere a unidad)
    const precioKgDerivado = pesoMedioKg ? (Number(producto.precio) / pesoMedioKg) : null;

    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.id = 'modalSimuladorPollo';
    modal.innerHTML = `
    <div class="contenido-modal-instalacion" style="max-width:720px;">
        <button class="cerrar-modal" onclick="cerrarSimuladorPollo()">✕</button>
        <h3>🔢 Simulador: Pollo Semicriollo Entero</h3>
        <p class="simulador-ayuda">Usa el control para elegir el peso estimado del pollo. Puedes editar el precio por kg si conoces el valor real.</p>

        <div class="simulador-grid" style="margin-top:1rem;">
            <div class="simulador-control">
            <label>Peso (kg): <strong id="sim-peso-valor">${pesoMedioKg ? pesoMedioKg.toFixed(2) : '2.70' } kg</strong></label>
            <input id="sim-peso" type="range" min="0.8" max="4.0" step="0.1" value="${pesoMedioKg ? pesoMedioKg.toFixed(2) : '2.7'}">
            <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                <input id="sim-peso-num" type="number" min="0.8" max="4.0" step="0.1" value="${pesoMedioKg ? pesoMedioKg.toFixed(2) : '2.7'}" style="flex:1; padding:0.5rem; border-radius:0.4rem; border:1px solid var(--borde-claro);">
                <button class="boton boton-whatsapp" onclick="simularPesoPorDefecto(${producto.id})" style="flex:0 0 auto;">🔄 Usar peso medio</button>
            </div>

            <label style="margin-top:0.75rem;">Precio por kg (COP):</label>
            <input id="sim-precio-kg" type="number" min="0" step="10" value="${precioKgDerivado ? Math.round(precioKgDerivado) : ''}" placeholder="Ej: 12000" style="padding:0.5rem; border-radius:0.4rem; border:1px solid var(--borde-claro);">
            <div class="simulador-ayuda">Precio derivado desde producto: ${precioKgDerivado ? `${Math.round(precioKgDerivado).toLocaleString('es-CO')} COP/kg` : 'no disponible'}</div>
            </div>

            <div>
            <div class="simulador-result">
                <div>Producto: <strong>${producto.nombre}</strong></div>
                <div style="margin-top:0.5rem;">Peso elegido: <strong id="sim-peso-resumen">${pesoMedioKg ? pesoMedioKg.toFixed(2) : '2.70'} kg</strong></div>
                <div style="margin-top:0.5rem;">Precio/kg usado: <strong id="sim-precio-kg-resumen">${precioKgDerivado ? Math.round(precioKgDerivado).toLocaleString('es-CO') : '—'} COP</strong></div>

                <div style="margin-top:1rem;">
                <div class="precio-final" id="sim-precio-final">$${'0'.toLocaleString('es-CO')}</div>
                <div class="simulador-ayuda" style="margin-top:0.5rem;">Estimación aproximada. La cotización final puede variar según peso real y surtido.</div>

                <div class="simulador-botones">
                    <button class="boton boton-primario" id="sim-calcular">Calcular estimado</button>
                    <button class="boton boton-whatsapp" onclick="cerrarSimuladorPollo()">Cerrar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Elementos
    const range = document.getElementById('sim-peso');
    const pesoNum = document.getElementById('sim-peso-num');
    const pesoTexto = document.getElementById('sim-peso-valor');
    const precioKgInput = document.getElementById('sim-precio-kg');
    const precioKgResumen = document.getElementById('sim-precio-kg-resumen');
    const pesoResumen = document.getElementById('sim-peso-resumen');
    const precioFinalEl = document.getElementById('sim-precio-final');
    const btnCalcular = document.getElementById('sim-calcular');

    function actualizarUI() {
      const peso = Number(pesoNum.value);
      pesoTexto.textContent = `${peso.toFixed(2)} kg`;
      pesoResumen.textContent = `${peso.toFixed(2)} kg`;
      const precioKg = Number(precioKgInput.value) || (precioKgDerivado ? Math.round(precioKgDerivado) : 0);
      precioKgResumen.textContent = precioKg ? `${precioKg.toLocaleString('es-CO')} COP` : '—';
      // actualizar cálculo automático
      const total = Math.round((precioKg * peso));
      precioFinalEl.textContent = `$${total.toLocaleString('es-CO')}`;
    }

    // enlazar controles
    range.addEventListener('input', () => {
      pesoNum.value = range.value;
      actualizarUI();
    });
    pesoNum.addEventListener('input', () => {
      range.value = pesoNum.value;
      actualizarUI();
    });
    precioKgInput.addEventListener('input', actualizarUI);

    btnCalcular.addEventListener('click', () => {
      // opción: animación / confirmación
      actualizarUI();
      mostrarNotificacion('✅ Estimación actualizada');
    });

    // cálculo inicial
    actualizarUI();
}

function cerrarSimuladorPollo() {
    const modal = document.getElementById('modalSimuladorPollo');
    if (modal) modal.remove();
}

// ayuda: poner peso medio desde producto
function simularPesoPorDefecto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const pesoMedioKg = obtenerPesoMedioKg(producto.pesoAproximado) || 2.7;
    const pesoNum = document.getElementById('sim-peso-num');
    const range = document.getElementById('sim-peso');
    if (pesoNum && range) {
        pesoNum.value = pesoMedioKg.toFixed(2);
        range.value = pesoMedioKg.toFixed(2);
        // disparar actualización manual
        document.getElementById('sim-precio-kg').dispatchEvent(new Event('input'));
    }
}

// parsea "2400 - 3000 g" -> devuelve kg medio (2.7)
function obtenerPesoMedioKg(text) {
    if (!text || typeof text !== 'string') return null;
    const nums = text.match(/(\d+(\.\d+)?)/g);
    if (!nums || nums.length === 0) return null;
    if (nums.length === 1) {
        // si está en gramos y es un solo número
        const n = Number(nums[0]);
        if (n > 10) return n / 1000;
        return n;
    }
    // tomar min y max
    const a = Number(nums[0]);
    const b = Number(nums[1]);
    const medio = ((a + b) / 2);
    // si parece gramos (mayor que 10), convertir a kg
    return medio > 10 ? medio / 1000 : medio;
}

// ===== BANNER PROMOCIONAL ANIMADO =====

// Inicializar banner cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarBannerPromocional();
});

/**
 * Inicializa el banner promocional
 * Solo se muestra una vez por sesión
 */
function inicializarBannerPromocional() {
    // Verificar si ya se mostró en esta sesión
    const bannerMostrado = sessionStorage.getItem('banner-promocional-mostrado');
    
    if (!bannerMostrado) {
        mostrarBannerPromocional();
    } else {
        // Si ya se mostró, ocultar el banner
        const banner = document.getElementById('bannerPromocional');
        if (banner) {
            banner.style.display = 'none';
        }
    }
}

/**
 * Muestra el banner promocional con animación
 */
function mostrarBannerPromocional() {
    const banner = document.getElementById('bannerPromocional');
    if (!banner) return;
    
    // Mostrar el banner
    banner.style.display = 'block';
    
    // Log para analytics
    console.log('📊 Banner promocional mostrado');
    
    // Marcar como mostrado en esta sesión
    sessionStorage.setItem('banner-promocional-mostrado', 'true');
    
    // Enviar evento personalizado
    dispatchEvent(new CustomEvent('bannerPromocionalMostrado', {
        detail: {
            timestamp: new Date().toISOString(),
            sessionId: generarIdSesion()
        }
    }));
}

/**
 * Cierra el banner promocional con animación suave
 */
function cerrarBanner() {
    const banner = document.getElementById('bannerPromocional');
    if (!banner) return;
    
    // Añadir clase de animación de salida
    banner.classList.add('cerrando');
    
    // Log para analytics
    console.log('📊 Banner promocional cerrado por el usuario');
    
    // Ocultar después de la animación
    setTimeout(() => {
        banner.style.display = 'none';
    }, 500);
    
    // Enviar evento personalizado
    dispatchEvent(new CustomEvent('bannerPromocionalCerrado', {
        detail: {
            timestamp: new Date().toISOString(),
            accion: 'boton_cerrar'
        }
    }));
}

/**
 * Acción del botón "Instalar App"
 * Integra con la función existente instalarPWA()
 */
function accionInstalarApp() {
    // Log para analytics
    console.log('📊 Click en botón "Instalar App" del banner promocional');
    
    // Ejecutar la función existente de instalación
    if (typeof instalarPWA === 'function') {
        instalarPWA();
    } else {
        // Fallback si la función no existe
        console.warn('⚠️ Función instalarPWA() no encontrada');
        mostrarNotificacion('Para instalar la app, usa el menú de tu navegador', 'info');
    }
    
    // Enviar evento personalizado
    dispatchEvent(new CustomEvent('bannerPromocionalInteraccion', {
        detail: {
            timestamp: new Date().toISOString(),
            accion: 'instalar_app',
            elemento: 'btn_instalar_banner'
        }
    }));
    
    // Cerrar el banner después de la acción
    setTimeout(() => {
        cerrarBanner();
    }, 1000);
}

/**
 * Acción del botón "Ver Promociones"
 * Integra con la función existente scrollearAProductos()
 */
function accionVerPromociones() {
    // Log para analytics
    console.log('📊 Click en botón "Ver Promociones" del banner promocional');
    
    // Ejecutar la función existente de scroll a productos
    if (typeof scrollearAProductos === 'function') {
        scrollearAProductos();
    } else {
        // Fallback si la función no existe
        console.warn('⚠️ Función scrollearAProductos() no encontrada');
        // Scroll manual al catálogo
        const grillaProductos = document.getElementById('grillaProductos');
        if (grillaProductos) {
            grillaProductos.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Enviar evento personalizado
    dispatchEvent(new CustomEvent('bannerPromocionalInteraccion', {
        detail: {
            timestamp: new Date().toISOString(),
            accion: 'ver_promociones',
            elemento: 'btn_ver_promociones'
        }
    }));
    
    // Cerrar el banner después de la acción
    setTimeout(() => {
        cerrarBanner();
    }, 800);
}

/**
 * Genera un ID único para la sesión
 * @returns {string} ID de sesión único
 */
function generarIdSesion() {
    let sessionId = sessionStorage.getItem('session-id');
    if (!sessionId) {
        sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('session-id', sessionId);
    }
    return sessionId;
}

/**
 * Reinicia el banner promocional (útil para desarrollo/testing)
 * Elimina la marca de "ya mostrado" del sessionStorage
 */
function reiniciarBannerPromocional() {
    sessionStorage.removeItem('banner-promocional-mostrado');
    console.log('🔄 Banner promocional reiniciado - se mostrará en la próxima carga');
}

// ===== EVENT LISTENERS ADICIONALES =====

// Escuchar eventos personalizados del banner (opcional para analytics)
addEventListener('bannerPromocionalMostrado', function(event) {
    // Aquí podrías enviar datos a Google Analytics, Facebook Pixel, etc.
    console.log('📈 Evento: Banner mostrado', event.detail);
});

addEventListener('bannerPromocionalCerrado', function(event) {
    // Aquí podrías enviar datos a Google Analytics, Facebook Pixel, etc.
    console.log('📈 Evento: Banner cerrado', event.detail);
});

addEventListener('bannerPromocionalInteraccion', function(event) {
    // Aquí podrías enviar datos a Google Analytics, Facebook Pixel, etc.
    console.log('📈 Evento: Interacción con banner', event.detail);
});

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Permite mostrar manualmente el banner (útil para testing)
 */
function forzarMostrarBanner() {
    sessionStorage.removeItem('banner-promocional-mostrado');
    const banner = document.getElementById('bannerPromocional');
    if (banner) {
        banner.classList.remove('cerrando');
        banner.style.display = 'block';
        console.log('🔧 Banner forzado a mostrarse');
    }
}

// ===== SECCIÓN BENEFICIOS VISUALES =====

/**
 * Configuración del Intersection Observer para animar beneficios
 */
class BeneficiosAnimator {
    constructor() {
        this.cards = [];
        this.observer = null;
        this.animationDelay = 100;
        this.init();
    }

    init() {
        // Verificar si el usuario prefiere animaciones reducidas
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            this.showAllCardsImmediately();
            return;
        }

        this.setupObserver();
        this.observeCards();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.2
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateCard(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    observeCards() {
        this.cards = document.querySelectorAll('.beneficio-card');
        this.cards.forEach(card => {
            this.observer.observe(card);
        });
    }

    animateCard(card) {
        const delay = Array.from(this.cards).indexOf(card) * this.animationDelay;
        
        setTimeout(() => {
            card.classList.add('visible');
            
            // Animación adicional del ícono
            const icono = card.querySelector('.beneficio-icono');
            if (icono) {
                icono.style.animation = 'iconoEntrada 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        }, delay);
    }

    showAllCardsImmediately() {
        this.cards = document.querySelectorAll('.beneficio-card');
        this.cards.forEach(card => {
            card.classList.add('visible');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
}

/**
 * Sistema de efectos adicionales para los beneficios
 */
class BeneficiosEffects {
    constructor() {
        this.cards = [];
        this.init();
    }

    init() {
        this.cards = document.querySelectorAll('.beneficio-card');
        this.addHoverEffects();
        this.addClickEffects();
    }

    addHoverEffects() {
        this.cards.forEach(card => {
            const icono = card.querySelector('.icono-emoji');
            
            card.addEventListener('mouseenter', () => {
                if (icono) {
                    icono.style.transform = 'scale(1.2) rotate(10deg)';
                    icono.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (icono) {
                    icono.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    addClickEffects() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                // Efecto de pulso al hacer click
                card.style.animation = 'pulsoBeneficio 0.3s ease-in-out';
                
                setTimeout(() => {
                    card.style.animation = '';
                }, 300);
            });
        });
    }
}

/**
 * Inicialización de los beneficios cuando el DOM esté listo
 */
function inicializarBeneficios() {
    // Esperar a que la sección de beneficios esté en el DOM
    const seccionBeneficios = document.querySelector('.seccion-beneficios');
    
    if (seccionBeneficios) {
        // Inicializar animaciones
        new BeneficiosAnimator();
        
        // Inicializar efectos adicionales
        new BeneficiosEffects();
        
        console.log('✨ Sección de beneficios inicializada correctamente');
    } else {
        // Si no se encuentra, intentar de nuevo en un momento
        setTimeout(inicializarBeneficios, 100);
    }
}

// Agregar las animaciones CSS dinámicamente
function agregarAnimacionesBeneficios() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconoEntrada {
            0% {
                transform: scale(0) rotate(-180deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.3) rotate(-90deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }

        @keyframes pulsoBeneficio {
            0% {
                transform: translateY(-8px) scale(1.02);
            }
            50% {
                transform: translateY(-12px) scale(1.05);
            }
            100% {
                transform: translateY(-8px) scale(1.02);
            }
        }

        @media (prefers-reduced-motion: reduce) {
            @keyframes iconoEntrada {
                0%, 100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes pulsoBeneficio {
                0%, 100% {
                    transform: none;
                }
            }
        }
    `;
    document.head.appendChild(style);
}

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        agregarAnimacionesBeneficios();
        inicializarBeneficios();
        inicializarRecetas();
        inicializarResenas();
    });
} else {
    // El DOM ya está cargado
    agregarAnimacionesBeneficios();
    inicializarBeneficios();
    inicializarRecetas();
    inicializarResenas();
}

// ===== SECCIÓN INSPIRACIÓN Y RECETAS =====

/**
 * Clase para manejar el carrusel de recetas
 */
class CarruselRecetas {
    constructor() {
        this.track = null;
        this.cards = [];
        this.indicadores = [];
        this.btnPrev = null;
        this.btnNext = null;
        this.currentIndex = 0;
        this.cardsVisible = 1;
        this.isAnimating = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        this.track = document.getElementById('recetasTrack');
        this.cards = document.querySelectorAll('.receta-card');
        this.btnPrev = document.getElementById('btnPrev');
        this.btnNext = document.getElementById('btnNext');
        
        if (!this.track || this.cards.length === 0) {
            console.warn('⚠️ Elementos del carrusel de recetas no encontrados');
            return;
        }

        this.calcularCardsVisible();
        this.crearIndicadores();
        this.setupEventListeners();
        this.actualizarEstado();
        
        // Configurar lazy loading y animaciones
        this.configurarAnimaciones();
        
        console.log('🎠 Carrusel de recetas inicializado');
    }

    calcularCardsVisible() {
        const width = window.innerWidth;
        if (width <= 480) {
            this.cardsVisible = 1;
        } else if (width <= 768) {
            this.cardsVisible = 2;
        } else if (width <= 1024) {
            this.cardsVisible = 3;
        } else {
            this.cardsVisible = 4;
        }
    }

    crearIndicadores() {
        const contenedor = document.getElementById('carruselIndicadores');
        if (!contenedor) return;

        contenedor.innerHTML = '';
        this.indicadores = [];

        const totalPaginas = Math.ceil(this.cards.length / this.cardsVisible);

        for (let i = 0; i < totalPaginas; i++) {
            const indicador = document.createElement('button');
            indicador.className = 'indicador';
            indicador.setAttribute('aria-label', `Ir a la página ${i + 1} de recetas`);
            indicador.addEventListener('click', () => this.irAPagina(i));
            
            contenedor.appendChild(indicador);
            this.indicadores.push(indicador);
        }
    }

    setupEventListeners() {
        // Botones de navegación
        if (this.btnPrev) {
            this.btnPrev.addEventListener('click', () => this.anterior());
        }
        
        if (this.btnNext) {
            this.btnNext.addEventListener('click', () => this.siguiente());
        }

        // Eventos de toque para móviles
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Redimensionar ventana
        window.addEventListener('resize', () => this.handleResize());

        // Navegación con teclado
        this.track.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const difference = this.touchStartX - this.touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                this.siguiente();
            } else {
                this.anterior();
            }
        }
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.anterior();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.siguiente();
                break;
        }
    }

    handleResize() {
        const oldVisible = this.cardsVisible;
        this.calcularCardsVisible();
        
        if (oldVisible !== this.cardsVisible) {
            this.crearIndicadores();
            this.currentIndex = 0;
            this.actualizarEstado();
        }
    }

    anterior() {
        if (this.isAnimating || this.currentIndex === 0) return;
        
        this.currentIndex--;
        this.actualizarCarrusel();
    }

    siguiente() {
        const maxIndex = Math.ceil(this.cards.length / this.cardsVisible) - 1;
        if (this.isAnimating || this.currentIndex >= maxIndex) return;
        
        this.currentIndex++;
        this.actualizarCarrusel();
    }

    irAPagina(pagina) {
        if (this.isAnimating) return;
        
        this.currentIndex = pagina;
        this.actualizarCarrusel();
    }

    actualizarCarrusel() {
        this.isAnimating = true;
        
        const cardWidth = this.cards[0].offsetWidth + 24; // incluir gap
        const translateX = -(this.currentIndex * this.cardsVisible * cardWidth);
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 400);

        this.actualizarEstado();
    }

    actualizarEstado() {
        const maxIndex = Math.ceil(this.cards.length / this.cardsVisible) - 1;
        
        // Actualizar botones
        if (this.btnPrev) {
            this.btnPrev.disabled = this.currentIndex === 0;
            this.btnPrev.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        }
        
        if (this.btnNext) {
            this.btnNext.disabled = this.currentIndex >= maxIndex;
            this.btnNext.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        }

        // Actualizar indicadores
        this.indicadores.forEach((indicador, index) => {
            if (index === this.currentIndex) {
                indicador.classList.add('activo');
            } else {
                indicador.classList.remove('activo');
            }
        });
    }

    configurarAnimaciones() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = Array.from(this.cards).indexOf(entry.target) * 100;
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Verificar si el usuario prefiere animaciones reducidas
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            this.cards.forEach(card => {
                card.classList.add('visible');
            });
        } else {
            this.cards.forEach(card => {
                observer.observe(card);
            });
        }
    }
}

/**
 * Función global para filtrar recetas y productos
 * Conecta las recetas con el sistema de filtrado del catálogo
 */
function filtrarReceta(categoria, nombreReceta) {
    console.log(`🔍 Filtrando productos para: ${nombreReceta} (categoría: ${categoria})`);
    
    // Actualizar el campo de búsqueda si existe
    const campoBusqueda = document.getElementById('campoBusqueda');
    if (campoBusqueda) {
        campoBusqueda.value = '';
    }
    
    // Llamar a la función de filtrado existente
    if (typeof filtrarPorCategoria === 'function') {
        // Buscar el botón de filtro correspondiente
        const btnFiltro = document.querySelector(`[onclick*="${categoria}"]`);
        
        if (btnFiltro) {
            filtrarPorCategoria(categoria, btnFiltro);
        } else {
            // Si no existe el filtro exacto, usar 'todos'
            const btnTodos = document.querySelector('[onclick*="todos"]');
            if (btnTodos) {
                filtrarPorCategoria('todos', btnTodos);
            }
        }
        
        // Hacer scroll al catálogo
        if (typeof scrollearAProductos === 'function') {
            setTimeout(() => {
                scrollearAProductos();
            }, 300);
        }
        
        // Mostrar notificación
        mostrarNotificacionReceta(nombreReceta, categoria);
    } else {
        console.warn('⚠️ Función filtrarPorCategoria no disponible');
    }
}

/**
 * Mostrar notificación cuando se filtra por receta
 */
function mostrarNotificacionReceta(nombreReceta, categoria) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-receta';
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <span class="notificacion-icono">🍽️</span>
            <span class="notificacion-texto">Mostrando productos para: <strong>${nombreReceta}</strong></span>
            <button class="notificacion-cerrar" onclick="cerrarNotificacion(this)">&times;</button>
        </div>
    `;
    
    // Agregar estilos dinámicamente si no existen
    if (!document.querySelector('#estilosNotificacionReceta')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilosNotificacionReceta';
        estilos.textContent = `
            .notificacion-receta {
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, var(--color-primario), var(--color-secundario));
                color: white;
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(37, 99, 235, 0.3);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 350px;
            }
            
            .notificacion-contenido {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notificacion-icono {
                font-size: 1.5rem;
            }
            
            .notificacion-texto {
                flex: 1;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .notificacion-cerrar {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            
            .notificacion-cerrar:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @media (max-width: 480px) {
                .notificacion-receta {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(estilos);
    }
    
    document.body.appendChild(notificacion);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            cerrarNotificacion(notificacion.querySelector('.notificacion-cerrar'));
        }
    }, 5000);
}

/**
 * Cerrar notificación de receta
 */
function cerrarNotificacion(btn) {
    const notificacion = btn.closest('.notificacion-receta');
    if (notificacion) {
        notificacion.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }
}

/**
 * Inicializar la sección de recetas
 */
function inicializarRecetas() {
    const seccionRecetas = document.querySelector('.seccion-recetas');
    
    if (seccionRecetas) {
        // Inicializar carrusel
        new CarruselRecetas();
        
        console.log('🍳 Sección de recetas inicializada correctamente');
    } else {
        // Si no se encuentra, intentar de nuevo en un momento
        setTimeout(inicializarRecetas, 100);
    }
}

// ===== SISTEMA DE RESEÑAS ===== 

/**
 * Sistema completo de reseñas conFirestore y Optimistic UI
 * Incluye carrusel, formularios, validación, offline sync y analytics
 */

class SistemaResenas {
    constructor() {
        // Configuración
        this.config = {
            dbName: 'AlimentoDelCieloReviews',
            dbVersion: 1,
            storeName: 'pendingReviews',
            apiBase: '/.netlify/functions',
            rateLimitDelay: 2000, // 2 segundos entre envíos
            maxRetries: 3
        };

        // Estado
        this.db = null;
        this.resenas = [];
        this.currentIndex = 0;
        this.isLoading = false;
        this.lastSubmit = 0;
        
        // Elementos del DOM
        this.elementos = {};
        
        // Bindings
        this.init = this.init.bind(this);
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.syncPendingReviews = this.syncPendingReviews.bind(this);
        
        this.init();
    }

    /**
     * Inicialización del sistema
     */
    async init() {
        try {
            // Inicializar IndexedDB
            await this.initDB();
            
            // Obtener elementos del DOM
            this.getElements();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            // Cargar productos en el select
            this.loadProductOptions();
            
            // Cargar reseñas públicas
            await this.loadReviews();
            
            // Sincronizar reseñas pendientes
            await this.syncPendingReviews();
            
            // Configurar monitoreo de conexión
            this.setupOnlineListener();
            
            // Disparar evento de analytics
            this.trackEvent('review_view', {
                section: 'reseñas',
                timestamp: Date.now()
            });
            
            console.log('✅ Sistema de reseñas inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando sistema de reseñas:', error);
            this.showError('Error inicializando el sistema de reseñas. Por favor, recarga la página.');
        }
    }

    /**
     * Inicializar IndexedDB para reseñas offline
     */
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.config.dbName, this.config.dbVersion);
            
            request.onerror = () => {
                console.warn('IndexedDB no disponible, usando localStorage como fallback');
                this.db = null;
                resolve();
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('📦 IndexedDB inicializado para reseñas');
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains(this.config.storeName)) {
                    const store = db.createObjectStore(this.config.storeName, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('status', 'status', { unique: false });
                    
                    console.log('🗄️ Store de reseñas pendientes creado');
                }
            };
        });
    }

    /**
     * Obtener referencias a elementos del DOM
     */
    getElements() {
        this.elementos = {
            // Carrusel
            track: document.getElementById('resenasTrack'),
            btnPrev: document.getElementById('btnPrevResenas'),
            btnNext: document.getElementById('btnNextResenas'),
            indicadores: document.getElementById('indicadoresResenas'),
            
            // Estadísticas
            totalResenas: document.getElementById('totalResenas'),
            ratingPromedio: document.getElementById('ratingPromedio'),
            estrellasPromedio: document.getElementById('estrellasPromedio'),
            
            // Formulario
            form: document.getElementById('resenaForm'),
            nombreInput: document.getElementById('nombreResena'),
            productoSelect: document.getElementById('productoResena'),
            textoTextarea: document.getElementById('textoResena'),
            ratingSelector: document.getElementById('ratingSelector'),
            contadorCaracteres: document.getElementById('contadorCaracteres'),
            btnEnviar: document.getElementById('btnEnviarResena'),
            btnCancelar: document.getElementById('btnCancelarResena'),
            
            // Estados y mensajes
            mensajeEstado: document.getElementById('mensajeEstado'),
            mensajeContenido: document.getElementById('mensajeContenido'),
            estadoOffline: document.getElementById('estadoOffline'),
            contadorPendientes: document.getElementById('contadorPendientes'),
            
            // Errores
            errorNombre: document.getElementById('errorNombre'),
            errorRating: document.getElementById('errorRating'),
            errorTexto: document.getElementById('errorTexto'),
            
            // Schema JSON-LD
            schemaScript: document.getElementById('schemaResenas')
        };
        
        // Verificar elementos críticos
        const elementosCriticos = ['track', 'form', 'btnEnviar'];
        const faltantes = elementosCriticos.filter(key => !this.elementos[key]);
        
        if (faltantes.length > 0) {
            throw new Error(`Elementos críticos no encontrados: ${faltantes.join(', ')}`);
        }
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Formulario
        if (this.elementos.form) {
            this.elementos.form.addEventListener('submit', this.handleSubmit);
        }
        
        // Contador de caracteres
        if (this.elementos.textoTextarea) {
            this.elementos.textoTextarea.addEventListener('input', (e) => {
                if (this.elementos.contadorCaracteres) {
                    this.elementos.contadorCaracteres.textContent = e.target.value.length;
                }
                this.clearError('errorTexto');
            });
        }
        
        // Rating selector
        if (this.elementos.ratingSelector) {
            this.elementos.ratingSelector.addEventListener('change', () => {
                this.clearError('errorRating');
                this.updateRatingDisplay();
            });
            
            // Hover effects para estrellas
            const estrellas = this.elementos.ratingSelector.querySelectorAll('.estrella');
            estrellas.forEach((estrella, index) => {
                estrella.addEventListener('mouseenter', () => {
                    this.highlightStars(index + 1);
                });
                
                estrella.addEventListener('mouseleave', () => {
                    this.resetStarHighlight();
                });
            });
        }
        
        // Limpiar errores al escribir
        if (this.elementos.nombreInput) {
            this.elementos.nombreInput.addEventListener('input', () => {
                this.clearError('errorNombre');
            });
        }
        
        // Navegación del carrusel
        if (this.elementos.btnPrev) {
            this.elementos.btnPrev.addEventListener('click', () => this.previousReview());
        }
        
        if (this.elementos.btnNext) {
            this.elementos.btnNext.addEventListener('click', () => this.nextReview());
        }
        
        // Touch/swipe para móviles en el carrusel
        if (this.elementos.track) {
            this.setupTouchEvents();
        }
        
        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.seccion-resenas')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousReview();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextReview();
                }
            }
        });
    }

    /**
     * Configurar eventos táctiles para móviles
     */
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.elementos.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.elementos.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const difference = startX - endX;
            const threshold = 50;
            
            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    this.nextReview();
                } else {
                    this.previousReview();
                }
            }
        }, { passive: true });
    }

    /**
     * Cargar opciones de productos en el select
     */
    loadProductOptions() {
        if (!this.elementos.productoSelect || typeof productos === 'undefined') {
            return;
        }
        
        // Limpiar opciones existentes excepto la primera
        while (this.elementos.productoSelect.children.length > 1) {
            this.elementos.productoSelect.removeChild(this.elementos.productoSelect.lastChild);
        }
        
        // Agregar productos
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = `${producto.emoji} ${producto.nombre}`;
            this.elementos.productoSelect.appendChild(option);
        });
    }

    /**
     * Cargar reseñas públicas desde el servidor
     */
    async loadReviews() {
        try {
            this.setLoadingState(true);
            
            const response = await this.obtenerResenasPublicas();
            
            if (response.ok && response.reviews) {
                this.resenas = response.reviews;
                this.renderReviews();
                this.updateStatistics();
                this.updateSchema();
            } else {
                console.warn('No se pudieron cargar las reseñas:', response.error);
                this.showPlaceholder();
            }
            
        } catch (error) {
            console.error('Error cargando reseñas:', error);
            this.showPlaceholder();
        } finally {
            this.setLoadingState(false);
        }
    }

    /**
     * Renderizar reseñas en el carrusel
     */
    renderReviews() {
        if (!this.elementos.track) return;
        
        this.elementos.track.innerHTML = '';
        
        if (this.resenas.length === 0) {
            this.showPlaceholder();
            return;
        }
        
        this.resenas.forEach((resena, index) => {
            const card = this.createReviewCard(resena, index);
            this.elementos.track.appendChild(card);
        });
        
        this.updateCarouselControls();
        this.createIndicators();
        
        // Mostrar primera reseña
        this.currentIndex = 0;
        this.showReview(0);
    }

    /**
     * Crear tarjeta de reseña
     */
    createReviewCard(resena, index) {
        const card = document.createElement('div');
        card.className = 'resena-card';
        card.setAttribute('data-index', index);
        
        // Avatar con iniciales
        const iniciales = resena.nombre.split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        
        // Producto si está disponible
        let productoInfo = '';
        if (resena.productoId && typeof productos !== 'undefined') {
            const producto = productos.find(p => p.id == resena.productoId);
            if (producto) {
                productoInfo = `<div class="resena-producto">${producto.emoji} ${producto.nombre}</div>`;
            }
        }
        
        // Fecha formateada
        const fecha = resena.createdAt ? new Date(resena.createdAt.seconds * 1000 || resena.createdAt) : new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Estado de la reseña
        let estadoInfo = '';
        if (resena.status) {
            const estados = {
                'pending': 'Enviando...',
                'offline': 'Pendiente (sin conexión)', 
                'published': 'Publicado',
                'moderation': 'En espera de moderación'
            };
            estadoInfo = `<div class="resena-estado ${resena.status}">${estados[resena.status] || 'Publicado'}</div>`;
        }
        
        card.innerHTML = `
            <div class="resena-header">
                <div class="resena-avatar">${iniciales}</div>
                <div class="resena-info">
                    <div class="resena-nombre">${this.sanitizeHTML(resena.nombre)}</div>
                    <div class="resena-fecha">${fechaFormateada}</div>
                    ${productoInfo}
                </div>
            </div>
            <div class="resena-rating">
                ${this.generateStars(resena.rating)}
            </div>
            <div class="resena-texto">${this.sanitizeHTML(resena.texto)}</div>
            ${estadoInfo}
        `;
        
        return card;
    }

    /**
     * Generar estrellas para rating
     */
    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const className = i <= rating ? 'estrella' : 'estrella empty';
            stars += `<span class="${className}">★</span>`;
        }
        return stars;
    }

    /**
     * Mostrar placeholder cuando no hay reseñas
     */
    showPlaceholder() {
        if (!this.elementos.track) return;
        
        this.elementos.track.innerHTML = `
            <div class="resena-placeholder">
                <div class="placeholder-icono">💬</div>
                <p>Sé el primero en compartir tu experiencia con nuestros productos.</p>
            </div>
        `;
        
        if (this.elementos.indicadores) {
            this.elementos.indicadores.innerHTML = '';
        }
        
        this.updateCarouselControls();
    }

    /**
     * Actualizar estadísticas de reseñas
     */
    updateStatistics() {
        const total = this.resenas.length;
        const promedio = total > 0 ? 
            this.resenas.reduce((sum, r) => sum + r.rating, 0) / total : 0;
        
        if (this.elementos.totalResenas) {
            this.elementos.totalResenas.textContent = total;
        }
        
        if (this.elementos.ratingPromedio) {
            const ratingNumber = this.elementos.ratingPromedio.querySelector('.rating-numero');
            if (ratingNumber) {
                ratingNumber.textContent = promedio.toFixed(1);
            }
        }
        
        if (this.elementos.estrellasPromedio) {
            this.elementos.estrellasPromedio.innerHTML = this.generateStars(Math.round(promedio));
        }
    }

    /**
     * Actualizar JSON-LD Schema
     */
    updateSchema() {
        if (!this.elementos.schemaScript) return;
        
        const total = this.resenas.length;
        const promedio = total > 0 ? 
            this.resenas.reduce((sum, r) => sum + r.rating, 0) / total : 0;
        
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Alimento del Cielo",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": promedio.toFixed(1),
                "reviewCount": total.toString()
            },
            "review": this.resenas.slice(0, 5).map(resena => ({
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": resena.nombre
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": resena.rating.toString()
                },
                "reviewBody": resena.texto,
                "datePublished": resena.createdAt ? 
                    new Date(resena.createdAt.seconds * 1000 || resena.createdAt).toISOString() : 
                    new Date().toISOString()
            }))
        };
        
        this.elementos.schemaScript.textContent = JSON.stringify(schema, null, 2);
    }

    /**
     * Manejar envío del formulario
     */
    async handleSubmit(event) {
        event.preventDefault();
        
        // Rate limiting
        const now = Date.now();
        if (now - this.lastSubmit < this.config.rateLimitDelay) {
            this.showError(`Por favor espera ${Math.ceil((this.config.rateLimitDelay - (now - this.lastSubmit)) / 1000)} segundos antes de enviar otra reseña.`);
            return;
        }
        
        // Validar formulario
        if (!this.validateForm()) {
            return;
        }
        
        // Recopilar datos
        const formData = new FormData(this.elementos.form);
        const resenaData = {
            nombre: formData.get('nombre').trim(),
            texto: formData.get('texto').trim(),
            rating: parseInt(formData.get('rating')),
            productoId: formData.get('productoId') || null,
            timestamp: Date.now(),
            status: 'pending'
        };
        
        // Optimistic UI - agregar inmediatamente a la vista
        this.addOptimisticReview(resenaData);
        
        // Intentar enviar al servidor
        try {
            this.setSubmitState(true);
            this.lastSubmit = now;
            
            const response = await this.enviarResenaAlServidor(resenaData);
            
            if (response.ok) {
                // Éxito - actualizar estado
                this.updateReviewStatus(resenaData.timestamp, 'published', response.id);
                this.showSuccess('¡Gracias por tu reseña! Se ha enviado correctamente.');
                this.resetForm();
                
                // Analytics
                this.trackEvent('review_submit', {
                    rating: resenaData.rating,
                    has_product: !!resenaData.productoId,
                    text_length: resenaData.texto.length
                });
                
            } else {
                throw new Error(response.error || 'Error desconocido');
            }
            
        } catch (error) {
            console.error('Error enviando reseña:', error);
            
            // Guardar para retry offline
            await this.saveForOffline(resenaData);
            this.updateReviewStatus(resenaData.timestamp, 'offline');
            
            this.showError('No se pudo enviar tu reseña ahora. Se guardó y se enviará automáticamente cuando tengas conexión.');
            
            // Analytics
            this.trackEvent('review_error', {
                error: error.message,
                offline: !navigator.onLine
            });
            
        } finally {
            this.setSubmitState(false);
        }
    }

    /**
     * Validar formulario
     */
    validateForm() {
        let isValid = true;
        
        // Limpiar errores previos
        this.clearAllErrors();
        
        // Validar nombre
        const nombre = this.elementos.nombreInput.value.trim();
        if (!nombre || nombre.length < 2) {
            this.showFieldError('errorNombre', 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        } else if (nombre.length > 50) {
            this.showFieldError('errorNombre', 'El nombre no puede exceder 50 caracteres');
            isValid = false;
        }
        
        // Validar rating
        const rating = this.elementos.form.querySelector('input[name="rating"]:checked');
        if (!rating) {
            this.showFieldError('errorRating', 'Por favor selecciona una calificación');
            isValid = false;
        }
        
        // Validar texto
        const texto = this.elementos.textoTextarea.value.trim();
        if (!texto || texto.length < 10) {
            this.showFieldError('errorTexto', 'Tu opinión debe tener al menos 10 caracteres');
            isValid = false;
        } else if (texto.length > 500) {
            this.showFieldError('errorTexto', 'Tu opinión no puede exceder 500 caracteres');
            isValid = false;
        }
        
        return isValid;
    }

    /**
     * Mostrar error de campo
     */
    showFieldError(errorId, message) {
        const errorElement = this.elementos[errorId];
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        }
    }

    /**
     * Limpiar error específico
     */
    clearError(errorId) {
        const errorElement = this.elementos[errorId];
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
    }

    /**
     * Limpiar todos los errores
     */
    clearAllErrors() {
        ['errorNombre', 'errorRating', 'errorTexto'].forEach(errorId => {
            this.clearError(errorId);
        });
    }

    /**
     * Agregar reseña con Optimistic UI
     */
    addOptimisticReview(resenaData) {
        // Agregar al principio del array
        this.resenas.unshift({
            ...resenaData,
            id: `temp_${resenaData.timestamp}`,
            createdAt: new Date()
        });
        
        // Re-renderizar
        this.renderReviews();
        this.updateStatistics();
    }

    /**
     * Actualizar estado de reseña
     */
    updateReviewStatus(timestamp, status, serverId = null) {
        const index = this.resenas.findIndex(r => 
            r.timestamp === timestamp || r.id === `temp_${timestamp}`
        );
        
        if (index !== -1) {
            this.resenas[index].status = status;
            if (serverId) {
                this.resenas[index].id = serverId;
                delete this.resenas[index].timestamp;
            }
            
            // Actualizar solo la tarjeta específica
            const card = this.elementos.track.querySelector(`[data-index="${index}"]`);
            if (card) {
                const estadoElement = card.querySelector('.resena-estado');
                if (estadoElement) {
                    const estados = {
                        'pending': 'Enviando...',
                        'offline': 'Pendiente (sin conexión)',
                        'published': 'Publicado',
                        'moderation': 'En espera de moderación'
                    };
                    estadoElement.textContent = estados[status] || 'Publicado';
                    estadoElement.className = `resena-estado ${status}`;
                }
            }
        }
    }

    /**
     * Guardar reseña para envío offline
     */
    async saveForOffline(resenaData) {
        try {
            if (this.db) {
                // Usar IndexedDB
                const transaction = this.db.transaction([this.config.storeName], 'readwrite');
                const store = transaction.objectStore(this.config.storeName);
                await store.add(resenaData);
            } else {
                // Fallback a localStorage
                const pendientes = JSON.parse(localStorage.getItem('reseñas_pendientes') || '[]');
                pendientes.push(resenaData);
                localStorage.setItem('reseñas_pendientes', JSON.stringify(pendientes));
            }
            
            this.updatePendingCounter();
            
        } catch (error) {
            console.error('Error guardando reseña offline:', error);
        }
    }

    /**
     * Sincronizar reseñas pendientes
     */
    async sincronizarResenasPendientes() {
        if (!navigator.onLine) {
            console.log('Sin conexión - sincronización aplazada');
            return;
        }
        
        let pendientes = [];
        
        try {
            if (this.db) {
                // Obtener de IndexedDB
                const transaction = this.db.transaction([this.config.storeName], 'readonly');
                const store = transaction.objectStore(this.config.storeName);
                const request = store.getAll();
                
                request.onsuccess = async () => {
                    pendientes = request.result;
                    await this.processPendingReviews(pendientes);
                };
            } else {
                // Obtener de localStorage
                pendientes = JSON.parse(localStorage.getItem('reseñas_pendientes') || '[]');
                await this.processPendingReviews(pendientes);
            }
        } catch (error) {
            console.error('Error sincronizando reseñas pendientes:', error);
        }
    }

    /**
     * Procesar reseñas pendientes
     */
    async processPendingReviews(pendientes) {
        if (pendientes.length === 0) return;
        
        console.log(`Sincronizando ${pendientes.length} reseñas pendientes...`);
        
        let synchronized = 0;
        
        for (const resena of pendientes) {
            try {
                const response = await this.enviarResenaAlServidor(resena);
                
                if (response.ok) {
                    // Eliminar de almacén offline
                    await this.removeFromOfflineStore(resena);
                    
                    // Actualizar estado en UI si está visible
                    this.updateReviewStatus(resena.timestamp, 'published', response.id);
                    
                    synchronized++;
                } else {
                    console.warn('No se pudo sincronizar reseña:', response.error);
                }
                
            } catch (error) {
                console.error('Error sincronizando reseña individual:', error);
            }
            
            // Pequeña pausa entre envíos
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        if (synchronized > 0) {
            console.log(`✅ ${synchronized} reseñas sincronizadas correctamente`);
            this.updatePendingCounter();
            
            // Recargar reseñas para mostrar las nuevas
            await this.loadReviews();
            
            // Analytics
            this.trackEvent('review_sync', {
                synchronized_count: synchronized,
                total_pending: pendientes.length
            });
        }
    }

    /**
     * Eliminar reseña del almacén offline
     */
    async removeFromOfflineStore(resena) {
        try {
            if (this.db) {
                const transaction = this.db.transaction([this.config.storeName], 'readwrite');
                const store = transaction.objectStore(this.config.storeName);
                
                // Buscar por timestamp ya que no tenemos el ID exacto
                const index = store.index('timestamp');
                const request = index.get(resena.timestamp);
                
                request.onsuccess = () => {
                    if (request.result) {
                        store.delete(request.result.id);
                    }
                };
            } else {
                const pendientes = JSON.parse(localStorage.getItem('reseñas_pendientes') || '[]');
                const filtered = pendientes.filter(p => p.timestamp !== resena.timestamp);
                localStorage.setItem('reseñas_pendientes', JSON.stringify(filtered));
            }
        } catch (error) {
            console.error('Error eliminando reseña del almacén offline:', error);
        }
    }

    /**
     * Actualizar contador de reseñas pendientes
     */
    updatePendingCounter() {
        if (!this.elementos.contadorPendientes) return;
        
        const getPendingCount = async () => {
            if (this.db) {
                const transaction = this.db.transaction([this.config.storeName], 'readonly');
                const store = transaction.objectStore(this.config.storeName);
                const request = store.count();
                
                request.onsuccess = () => {
                    this.elementos.contadorPendientes.textContent = request.result;
                    this.elementos.estadoOffline.style.display = request.result > 0 ? 'block' : 'none';
                };
            } else {
                const pendientes = JSON.parse(localStorage.getItem('reseñas_pendientes') || '[]');
                this.elementos.contadorPendientes.textContent = pendientes.length;
                this.elementos.estadoOffline.style.display = pendientes.length > 0 ? 'block' : 'none';
            }
        };
        
        getPendingCount();
    }

    /**
     * Configurar listener de conexión online/offline
     */
    setupOnlineListener() {
        window.addEventListener('online', async () => {
            console.log('🌐 Conexión restaurada - sincronizando reseñas...');
            await this.sincronizarResenasPendientes();
        });
        
        window.addEventListener('offline', () => {
            console.log('📡 Sin conexión - las reseñas se guardarán para envío posterior');
        });
    }

    // ===== FUNCIONES PÚBLICAS DE LA API =====

    /**
     * Enviar reseña al servidor (función pública)
     */
    async enviarResenaAlServidor(resenaData) {
        const url = `${this.config.apiBase}/reviews`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resenaData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }
            
            return data;
            
        } catch (error) {
            console.error('Error en enviarResenaAlServidor:', error);
            throw error;
        }
    }

    /**
     * Obtener reseñas públicas (función pública)
     */
    async obtenerResenasPublicas() {
        const url = `${this.config.apiBase}/getReviews`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }
            
            return data;
            
        } catch (error) {
            console.error('Error en obtenerResenasPublicas:', error);
            return { ok: false, error: error.message, reviews: [] };
        }
    }

    // ===== NAVEGACIÓN DEL CARRUSEL =====

    /**
     * Mostrar reseña anterior
     */
    previousReview() {
        if (this.resenas.length <= 1) return;
        
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.resenas.length - 1;
        this.showReview(this.currentIndex);
    }

    /**
     * Mostrar siguiente reseña
     */
    nextReview() {
        if (this.resenas.length <= 1) return;
        
        this.currentIndex = this.currentIndex < this.resenas.length - 1 ? this.currentIndex + 1 : 0;
        this.showReview(this.currentIndex);
    }

    /**
     * Mostrar reseña específica
     */
    showReview(index) {
        if (!this.elementos.track || index < 0 || index >= this.resenas.length) return;
        
        const cardWidth = 350 + 24; // ancho de card + gap
        const translateX = -(index * cardWidth);
        
        this.elementos.track.style.transform = `translateX(${translateX}px)`;
        this.currentIndex = index;
        
        this.updateCarouselControls();
        this.updateIndicators();
    }

    /**
     * Actualizar controles del carrusel
     */
    updateCarouselControls() {
        if (!this.elementos.btnPrev || !this.elementos.btnNext) return;
        
        const hasReviews = this.resenas.length > 1;
        
        this.elementos.btnPrev.disabled = !hasReviews;
        this.elementos.btnNext.disabled = !hasReviews;
    }

    /**
     * Crear indicadores
     */
    createIndicators() {
        if (!this.elementos.indicadores) return;
        
        this.elementos.indicadores.innerHTML = '';
        
        if (this.resenas.length <= 1) return;
        
        this.resenas.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicador';
            indicator.setAttribute('aria-label', `Ir a reseña ${index + 1}`);
            indicator.addEventListener('click', () => this.showReview(index));
            
            this.elementos.indicadores.appendChild(indicator);
        });
        
        this.updateIndicators();
    }

    /**
     * Actualizar indicadores
     */
    updateIndicators() {
        if (!this.elementos.indicadores) return;
        
        const indicators = this.elementos.indicadores.querySelectorAll('.indicador');
        indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('activo');
            } else {
                indicator.classList.remove('activo');
            }
        });
    }

    // ===== UTILIDADES =====

    /**
     * Establecer estado de carga
     */
    setLoadingState(loading) {
        this.isLoading = loading;
        // Aquí puedes agregar indicadores visuales de carga
    }

    /**
     * Establecer estado de envío
     */
    setSubmitState(submitting) {
        if (!this.elementos.btnEnviar) return;
        
        const btnTexto = this.elementos.btnEnviar.querySelector('.btn-texto');
        const btnLoading = this.elementos.btnEnviar.querySelector('.btn-loading');
        
        if (submitting) {
            btnTexto.style.display = 'none';
            btnLoading.style.display = 'flex';
            this.elementos.btnEnviar.disabled = true;
        } else {
            btnTexto.style.display = 'inline';
            btnLoading.style.display = 'none';
            this.elementos.btnEnviar.disabled = false;
        }
    }

    /**
     * Mostrar mensaje de éxito
     */
    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    /**
     * Mostrar mensaje de error
     */
    showError(message) {
        this.showMessage(message, 'error');
    }

    /**
     * Mostrar mensaje genérico
     */
    showMessage(message, type = 'info') {
        if (!this.elementos.mensajeEstado || !this.elementos.mensajeContenido) return;
        
        this.elementos.mensajeContenido.textContent = message;
        this.elementos.mensajeEstado.className = `mensaje-estado ${type}`;
        this.elementos.mensajeEstado.style.display = 'block';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            this.elementos.mensajeEstado.style.display = 'none';
        }, 5000);
    }

    /**
     * Resetear formulario
     */
    resetForm() {
        if (!this.elementos.form) return;
        
        this.elementos.form.reset();
        
        if (this.elementos.contadorCaracteres) {
            this.elementos.contadorCaracteres.textContent = '0';
        }
        
        this.clearAllErrors();
        this.resetStarHighlight();
    }

    /**
     * Resaltar estrellas en hover
     */
    highlightStars(count) {
        const estrellas = this.elementos.ratingSelector.querySelectorAll('.estrella');
        estrellas.forEach((estrella, index) => {
            if (index < count) {
                estrella.classList.add('active');
            } else {
                estrella.classList.remove('active');
            }
        });
    }

    /**
     * Resetear resaltado de estrellas
     */
    resetStarHighlight() {
        const checkedInput = this.elementos.ratingSelector.querySelector('input:checked');
        const checkedValue = checkedInput ? parseInt(checkedInput.value) : 0;
        
        const estrellas = this.elementos.ratingSelector.querySelectorAll('.estrella');
        estrellas.forEach((estrella, index) => {
            if (index < checkedValue) {
                estrella.classList.add('active');
            } else {
                estrella.classList.remove('active');
            }
        });
    }

    /**
     * Actualizar display de rating
     */
    updateRatingDisplay() {
        this.resetStarHighlight();
    }

    /**
     * Sanitizar HTML para prevenir XSS
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    /**
     * Disparar evento de analytics
     */
    trackEvent(eventName, parameters = {}) {
        try {
            // Google Analytics (gtag)
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    custom_parameter: parameters,
                    ...parameters
                });
            }
            
            // Sistema interno de analytics
            if (typeof window.AlimentoDelCielo !== 'undefined' && window.AlimentoDelCielo.analytics) {
                window.AlimentoDelCielo.analytics.track(eventName, parameters);
            }
            
            console.log(`📊 Analytics: ${eventName}`, parameters);
            
        } catch (error) {
            console.warn('Error enviando evento de analytics:', error);
        }
    }
}

// ===== INICIALIZACIÓN =====

/**
 * Inicializar sistema de reseñas cuando el DOM esté listo
 */
function inicializarResenas() {
    const seccionResenas = document.querySelector('.seccion-resenas');
    
    if (seccionResenas) {
        // Crear instancia global del sistema de reseñas
        window.sistemaResenas = new SistemaResenas();
        
        console.log('⭐ Sistema de reseñas inicializado correctamente');
    } else {
        // Si no se encuentra, intentar de nuevo en un momento
        setTimeout(inicializarResenas, 100);
    }
}

// ===== FUNCIONES GLOBALES PÚBLICAS =====

/**
 * Funciones públicas esperadas para integración externa
 */

// Enviar reseña al servidor (función global)
async function enviarResenaAlServidor(resenaData) {
    if (window.sistemaResenas) {
        return await window.sistemaResenas.enviarResenaAlServidor(resenaData);
    } else {
        throw new Error('Sistema de reseñas no inicializado');
    }
}

// Obtener reseñas públicas (función global)
async function obtenerResenasPublicas() {
    if (window.sistemaResenas) {
        return await window.sistemaResenas.obtenerResenasPublicas();
    } else {
        throw new Error('Sistema de reseñas no inicializado');
    }
}

// Sincronizar reseñas pendientes (función global)
async function sincronizarResenasPendientes() {
    if (window.sistemaResenas) {
        return await window.sistemaResenas.sincronizarResenasPendientes();
    } else {
        throw new Error('Sistema de reseñas no inicializado');
    }
}