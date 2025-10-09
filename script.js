// === BASE DE DATOS DE PRODUCTOS ===
const productos = [
    // === POLLO ===
    {
        id: 1,
        nombre: 'Pollo Apanado Premium',
        categoria: 'pollo',
        precio: 28000,
        descripcion: 'Pollo apanado artesanal con empanizado crujiente, perfecto para airfryer. Listo en 12 minutos.',
        emoji: '🍗',
        etiqueta: 'Bestseller',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 2,
        nombre: 'Alitas BBQ Especiales',
        categoria: 'pollo',
        precio: 25000,
        descripcion: 'Alitas de pollo marinadas en nuestra salsa BBQ casera con toques ahumados.',
        emoji: '🔥',
        etiqueta: 'Especial',
        tipoEtiqueta: 'etiqueta-oferta'
    },
    {
        id: 3,
        nombre: 'Pechuga de Pavo Ahumada',
        categoria: 'pollo',
        precio: 33000,
        descripcion: 'Pechuga de pavo ahumada naturalmente, baja en grasa y alta en proteína.',
        emoji: '🦃',
        etiqueta: 'Fitness',
        tipoEtiqueta: 'etiqueta-producto'
    },

    // === CARNES ===
    {
        id: 20,
        nombre: 'Carne de Res Marinada',
        categoria: 'carnes',
        precio: 35000,
        descripcion: 'Carne de res tierna marinada en especias naturales y hierbas aromáticas. Corte premium.',
        emoji: '🥩',
        etiqueta: 'Nuevo',
        tipoEtiqueta: 'etiqueta-nuevo'
    },
    {
        id: 21,
        nombre: 'Hamburguesas Artesanales',
        categoria: 'carnes',
        precio: 32000,
        descripcion: 'Hamburguesas 100% carne de res, condimentadas artesanalmente. Pack x6 unidades.',
        emoji: '🍔',
        etiqueta: 'Familiar',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 22,
        nombre: 'Lomo de Cerdo Marinado',
        categoria: 'carnes',
        precio: 29000,
        descripcion: 'Lomo de cerdo tierno marinado con especias mediterráneas.',
        emoji: '🐷',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-oferta'
    },


    // === PESCADO ===
    {
        id: 40,
        nombre: 'Filete de Salmón Atlántico',
        categoria: 'pescado',
        precio: 42000,
        descripcion: 'Salmón fresco del Atlántico, rico en omega-3. Porciones de 200g cada una.',
        emoji: '🐟',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 41,
        nombre: 'Camarones Tigre Gigantes',
        categoria: 'pescado',
        precio: 38000,
        descripcion: 'Camarones tigre extra grandes del Caribe, pelados y desvenados. 500g.',
        emoji: '🦐',
        etiqueta: 'Gourmet',
        tipoEtiqueta: 'etiqueta-premium'
    },

    // === VERDURAS ===
    {
        id: 60,
        nombre: 'Mix de Verduras Gourmet',
        categoria: 'verduras',
        precio: 15000,
        descripcion: 'Mezcla selecta de verduras frescas: brócoli, zanahoria, apio y pimentón.',
        emoji: '🥬',
        etiqueta: 'Saludable',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 61,
        nombre: 'Papas Criollas Baby',
        categoria: 'verduras',
        precio: 12000,
        descripcion: 'Papas criollas pequeñas y tiernas, perfectas para acompañar cualquier plato.',
        emoji: '🥔',
        etiqueta: 'Tradicional',
        tipoEtiqueta: 'etiqueta-producto'
    },

    // === EMPANADAS ===

{
    id: 80,
    nombre: 'Empanadas de Carne x7',
    categoria: 'empanadas',
    precio: 8990,
    descripcion: 'Empanadas rellenas de carne molida sazonada con especias tradicionales. Pack x7 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 81,
    nombre: 'Empanadas de Carne x10',
    categoria: 'empanadas',
    precio: 11990,
    descripcion: 'Empanadas rellenas de carne, pollo y queso. Pack x10 unidades.',
    emoji: '🥟',
    etiqueta: 'Mixtas',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 82,
    nombre: 'Empanadas de Carne x12',
    categoria: 'empanadas',
    precio: 14990,
    descripcion: 'Empanadas rellenas de verduras frescas y queso. Pack x12 unidades.',
    emoji: '🥟',
    etiqueta: 'Vegetariano',
    tipoEtiqueta: 'etiqueta-producto'
},

{
    id: 83,
    nombre: 'Empanadas de Pollo x7',
    categoria: 'empanadas',
    precio: 8990,
    descripcion: 'Empanadas rellenas de pollo desmechado con un toque de especias. Pack x7 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 84,
    nombre: 'Empanadas de Pollo x10', 
    categoria: 'empanadas',
    precio: 11990,
    descripcion: 'Empanadas rellenas de pollo desmechado con un toque de especias. Pack x10 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 85,
    nombre: 'Empanadas de Pollo x15', 
    categoria: 'empanadas',
    precio: 14990,
    descripcion: 'Empanadas rellenas de pollo desmechado con un toque de especias. Pack x15 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},

{
    id: 86,
    nombre: 'Empanadas de Queso x7',
    categoria: 'empanadas',
    precio: 8990,
    descripcion: 'Empanadas rellenas de mezcla de quesos fundidos. Pack x7 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 87,
    nombre: 'Empanadas de Queso x10',
    categoria: 'empanadas',
    precio: 11990,
    descripcion: 'Empanadas rellenas de mezcla de quesos fundidos. Pack x10 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 88,
    nombre: 'Empanadas de Queso x10',
    categoria: 'empanadas',
    precio: 14990,
    descripcion: 'Empanadas rellenas de mezcla de quesos fundidos. Pack x15 unidades.',
    emoji: '🥟',
    etiqueta: 'Clásico',
    tipoEtiqueta: 'etiqueta-producto'
},

{
    id: 89,
    nombre: 'Empanadas de Jamón con Queso x7',
    categoria: 'empanadas',
    precio: 8990,
    descripcion: 'Empanadas rellenas de jamón y queso fundido. Pack x7 Unidades.',
    emoji: '🥟',
    etiqueta: 'Delicioso',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 90,
    nombre: 'Empanadas de Jamón con Queso x10',
    categoria: 'empanadas',
    precio: 11990,
    descripcion: 'Empanadas rellenas de jamón y queso fundido. Pack x10 Unidades.',
    emoji: '🥟',
    etiqueta: 'Delicioso',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 91,
    nombre: 'Empanadas de Jamón con Queso x15',
    categoria: 'empanadas',
    precio: 14990,
    descripcion: 'Empanadas rellenas de jamón y queso fundido. Pack x15 Unidades.',
    emoji: '🥟',
    etiqueta: 'Delicioso',
    tipoEtiqueta: 'etiqueta-producto'
},

{
    id: 92,
    nombre: 'Empanadas Hawaianas x7',
    categoria: 'empanadas',
    precio: 8990,
    descripcion: 'Empanadas rellenas de jamón, piña y queso fundido. Pack x7 Unidades.',
    emoji: '🥟',   
    etiqueta: 'Exótico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 93,
    nombre: 'Empanadas Hawaianas x10',
    categoria: 'empanadas',
    precio: 11990,
    descripcion: 'Empanadas rellenas de jamón, piña y queso fundido. Pack x10 Unidades.',
    emoji: '🥟',
    etiqueta: 'Exótico',
    tipoEtiqueta: 'etiqueta-producto'
},
{
    id: 94,
    nombre: 'Empanadas Hawaianas x15',
    categoria: 'empanadas',
    precio: 14990,
    descripcion: 'Empanadas rellenas de jamón, piña y queso fundido. Pack x15 Unidades.',
    emoji: '🥟',
    etiqueta: 'Exótico',
    tipoEtiqueta: 'etiqueta-producto'
},


    // === PASABOCAS ===
    {
        id: 100,
        nombre: 'Combo_01: 50 unidades',
        categoria: 'pasabocas',
        precio: 28000,
        descripcion: 'Incluye 25 deditos y 25 empanadas. Ideal para reuniones pequeñas.',
        imagen: './Imagenes/Productos/combo_1.png',
        emoji: '🥟',
        etiqueta: 'Económico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 101,
        nombre: 'Combo_02: 100 unidades',
        categoria: 'pasabocas',
        precio: 56000,
        descripcion: 'Incluye 50 deditos, 30 empanadas y 20 medallones. Perfecto para compartir.',
        imagen: './Imagenes/Productos/combo_2.png',
        emoji: '🍢',
        etiqueta: 'Popular',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 102,
        nombre: 'Combo_03: 150 unidades',
        categoria: 'pasabocas',
        precio: 84000,
        descripcion: 'Incluye 100 deditos, 30 empanadas y 20 medallones. Ideal para eventos medianos.',
        imagen: './Imagenes/Productos/combo_3.png',
        emoji: '🍴',
        etiqueta: 'Recomendado',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 103,
        nombre: 'Combo_04: 170 unidades',
        categoria: 'pasabocas',
        precio: 95000,
        descripcion: 'Incluye 100 deditos, 50 empanadas y 20 medallones. Excelente opción para celebraciones.',
        emoji: '🎉',
        imagen: './Imagenes/Productos/combo_4.png',
        etiqueta: 'Favorito',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 104,
        nombre: 'Combo_05: 200 unidades',
        categoria: 'pasabocas',
        precio: 112000,
        descripcion: 'Incluye 100 deditos, 50 empanadas y 50 medallones. Ideal para eventos grandes.',
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
        descripcion: 'Crujientes deditos rellenos de queso mozzarella. Pack x10 unidades.',
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
        descripcion: 'Crujientes deditos rellenos de queso mozzarella. Pack x13 unidades.',
        emoji: '🧀',
        etiqueta: 'Clásico',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 122,
        nombre: 'Deditos de Queso x18',
        categoria: 'deditos',
        precio: 16990,
        descripcion: 'Crujientes deditos rellenos de queso mozzarella. Pack x18 unidades.',
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
        emoji: '🧀',
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
        emoji: '🧀',
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
        nombre: 'Medallones de Carne x20',
        categoria: 'medallones',
        precio: 9990,
        descripcion: 'Medallones de carne molida sazonada con especias tradicionales. Pack x20 unidades.',
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
                    ${producto.etiqueta}
                </div>
            </div>
            <div class="info-producto">
                <h3 class="titulo-producto">${producto.nombre}</h3>
                <p class="descripcion-producto">${producto.descripcion}</p>
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