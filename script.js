// === BASE DE DATOS DE PRODUCTOS ===
const productos = [
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
        nombre: 'Carne de Res Marinada',
        categoria: 'carnes',
        precio: 35000,
        descripcion: 'Carne de res tierna marinada en especias naturales y hierbas aromáticas. Corte premium.',
        emoji: '🥩',
        etiqueta: 'Nuevo',
        tipoEtiqueta: 'etiqueta-nuevo'
    },
    {
        id: 3,
        nombre: 'Filete de Salmón Atlántico',
        categoria: 'pescado',
        precio: 42000,
        descripcion: 'Salmón fresco del Atlántico, rico en omega-3. Porciones de 200g cada una.',
        emoji: '🐟',
        etiqueta: 'Premium',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 4,
        nombre: 'Mix de Verduras Gourmet',
        categoria: 'verduras',
        precio: 15000,
        descripcion: 'Mezcla selecta de verduras frescas: brócoli, zanahoria, apio y pimentón.',
        emoji: '🥬',
        etiqueta: 'Saludable',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 5,
        nombre: 'Alitas BBQ Especiales',
        categoria: 'pollo',
        precio: 25000,
        descripcion: 'Alitas de pollo marinadas en nuestra salsa BBQ casera con toques ahumados.',
        emoji: '🔥',
        etiqueta: 'Especial',
        tipoEtiqueta: 'etiqueta-oferta'
    },
    {
        id: 6,
        nombre: 'Hamburguesas Artesanales',
        categoria: 'carnes',
        precio: 32000,
        descripcion: 'Hamburguesas 100% carne de res, condimentadas artesanalmente. Pack x6 unidades.',
        emoji: '🍔',
        etiqueta: 'Familiar',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 7,
        nombre: 'Camarones Tigre Gigantes',
        categoria: 'pescado',
        precio: 38000,
        descripcion: 'Camarones tigre extra grandes del Caribe, pelados y desvenados. 500g.',
        emoji: '🦐',
        etiqueta: 'Gourmet',
        tipoEtiqueta: 'etiqueta-premium'
    },
    {
        id: 8,
        nombre: 'Papas Criollas Baby',
        categoria: 'verduras',
        precio: 12000,
        descripcion: 'Papas criollas pequeñas y tiernas, perfectas para acompañar cualquier plato.',
        emoji: '🥔',
        etiqueta: 'Tradicional',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 9,
        nombre: 'Pechuga de Pavo Ahumada',
        categoria: 'pollo',
        precio: 33000,
        descripcion: 'Pechuga de pavo ahumada naturalmente, baja en grasa y alta en proteína.',
        emoji: '🦃',
        etiqueta: 'Fitness',
        tipoEtiqueta: 'etiqueta-producto'
    },
    {
        id: 10,
        nombre: 'Lomo de Cerdo Marinado',
        categoria: 'carnes',
        precio: 29000,
        descripcion: 'Lomo de cerdo tierno marinado con especias mediterráneas.',
        emoji: '🐷',
        etiqueta: 'Delicioso',
        tipoEtiqueta: 'etiqueta-oferta'
    }
    
];

// === VARIABLES GLOBALES ===
let carritoCompras = [];
let filtroActual = 'todos';
let eventoInstalacion = null;

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
                ${producto.emoji}
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
            <div class="imagen-item-carrito">${item.emoji}</div>
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

// === PWA INSTALACIÓN ===
function mostrarPromptInstalacion() {
    window.addEventListener('beforeinstallprompt', (evento) => {
        evento.preventDefault();
        eventoInstalacion = evento;
        
        // Mostrar el botón FAB siempre
        mostrarBotonFABInstalar();
        
        // Mostrar popup solo si no se ha cerrado antes y no está instalada
        setTimeout(() => {
            const popupCerrado = localStorage.getItem('popupInstalacionCerrado');
            const pwaInstalada = localStorage.getItem('pwaInstalada');
            
            if (!popupCerrado && !pwaInstalada) {
                document.getElementById('promptInstalacion').classList.add('mostrar');
            }
        }, 5000);
    });
    
    // Verificar si la PWA ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
        localStorage.setItem('pwaInstalada', 'true');
        ocultarBotonFABInstalar();
    }
}

function mostrarBotonFABInstalar() {
    const btnFab = document.getElementById('btnFabInstalar');
    if (btnFab && !localStorage.getItem('pwaInstalada')) {
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
        btnFab.classList.add('oculto');
    }
}

function instalarPWA() {
    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
        mostrarNotificacion('✅ La app ya está instalada', 'exito');
        ocultarBotonFABInstalar();
        return;
    }

    // Si tenemos el evento de instalación nativo
    if (eventoInstalacion) {
        eventoInstalacion.prompt();
        eventoInstalacion.userChoice.then((resultado) => {
            if (resultado.outcome === 'accepted') {
                mostrarNotificacion('🎉 ¡App instalada exitosamente!');
                localStorage.setItem('pwaInstalada', 'true');
                ocultarBotonFABInstalar();
            } else {
                mostrarNotificacion('ℹ️ Instalación cancelada');
            }
            eventoInstalacion = null;
        });
    } else {
        // Si no hay evento nativo, mostrar instrucciones por navegador
        mostrarInstruccionesInstalacion();
    }
    cerrarPromptInstalacion();
}

function mostrarInstruccionesInstalacion() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let mensaje = '';
    
    if (isIOS) {
        mensaje = '📱 En Safari iOS:\n1. Toca el botón "Compartir" (cuadrado con flecha)\n2. Selecciona "Añadir a pantalla de inicio"';
    } else if (isAndroid) {
        mensaje = '📱 Para instalar:\n1. Abre el menú (⋮) del navegador\n2. Selecciona "Instalar app" o "Añadir a pantalla de inicio"';
    } else {
        mensaje = '💻 Para instalar:\n1. Busca el icono ⊕ o "Instalar" en la barra de direcciones\n2. O abre el menú del navegador (⋮) y selecciona "Instalar"';
    }
    
    // Mostrar modal con instrucciones
    mostrarModalInstalacion(mensaje);
}

function mostrarModalInstalacion(mensaje) {
    // Crear modal temporal
    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.innerHTML = `
        <div class="contenido-modal-instalacion">
            <button class="cerrar-modal" onclick="this.parentElement.parentElement.remove()">✕</button>
            <h3>📱 Cómo instalar la app</h3>
            <p style="white-space: pre-line; text-align: left; margin: 1.5rem 0;">${mensaje}</p>
            <button class="boton boton-primario" onclick="this.parentElement.parentElement.remove()">
                Entendido
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Auto-eliminar después de 10 segundos
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 10000);
}
function cerrarPromptInstalacion() {
    document.getElementById('promptInstalacion').classList.remove('mostrar');
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
            if (carrito.classList.contains('abierto')) {
                cerrarCarrito();
            }
        }
    });

    // Cerrar notificación al hacer click
    document.getElementById('notificacion').addEventListener('click', function() {
        this.classList.remove('mostrar');
    });

    // Detectar si la app está instalada
    window.addEventListener('appinstalled', (evento) => {
        console.log('📱 PWA instalada exitosamente');
        localStorage.setItem('pwaInstalada', 'true');
        cerrarPromptInstalacion();
        ocultarBotonFABInstalar();
        mostrarNotificacion('🎉 ¡App instalada! Búscala en tu pantalla de inicio');
    });
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

// === MANIFEST.JSON DINÁMICO ===
function crearManifestoDinamico() {
    const manifestJson = {
        "name": "Alimento del Cielo - Catálogo Digital",
        "short_name": "Alimento del Cielo",
        "description": "Catálogo digital de alimentos congelados premium",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#f8fafc",
        "theme_color": "#2563eb",
        "orientation": "portrait-primary",
        "categories": ["food", "shopping", "business"],
        "screenshots": [
            {
                "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 393 852'><rect width='393' height='852' fill='%23f8fafc'/><text x='196' y='100' font-size='24' text-anchor='middle' fill='%232563eb'>Alimento del Cielo</text><rect x='20' y='150' width='353' height='200' fill='%232563eb' rx='10'/><text x='196' y='260' font-size='18' text-anchor='middle' fill='white'>Catálogo de Productos</text></svg>",
                "sizes": "393x852",
                "type": "image/svg+xml",
                "form_factor": "narrow"
            }
        ],
        "icons": [
            {
                "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' fill='%232563eb' rx='20'/><text x='96' y='120' font-size='80' text-anchor='middle' fill='white'>🍽️</text></svg>",
                "sizes": "192x192",
                "type": "image/svg+xml",
                "purpose": "any maskable"
            },
            {
                "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='%232563eb' rx='50'/><text x='256' y='320' font-size='200' text-anchor='middle' fill='white'>🍽️</text></svg>",
                "sizes": "512x512",
                "type": "image/svg+xml",
                "purpose": "any maskable"
            }
        ]
    };

    // Crear y configurar el archivo manifest dinámicamente
    const manifestBlob = new Blob([JSON.stringify(manifestJson, null, 2)], {type: 'application/json'});
    const manifestURL = URL.createObjectURL(manifestBlob);
    
    const linkManifest = document.querySelector('link[rel="manifest"]');
    if (linkManifest) {
        linkManifest.href = manifestURL;
    }
}

// === INICIALIZACIÓN FINAL ===
document.addEventListener('DOMContentLoaded', function() {
    // Crear manifest dinámico
    crearManifestoDinamico();
    
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