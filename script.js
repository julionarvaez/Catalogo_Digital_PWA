
let productos = []; // Se llena al cargar desde productos.json


// === SISTEMA DE CARGA DINÁMICA DE PRODUCTOS ===
// Función para cargar productos desde JSON
async function cargarProductos() {
    try {
        console.log('📦 Cargando productos desde productos.json...');
        const response = await fetch('/productos.json', {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        productos = data.productos;
        
        console.log(`✅ ${productos.length} productos cargados correctamente`);
        console.log(`📅 Versión del catálogo: ${data.version}`);
        console.log(`🕐 Última actualización: ${data.lastUpdate}`);
        
        // Guardar versión en localStorage para detectar cambios
        const versionAnterior = localStorage.getItem('catalogoVersion');
        if (versionAnterior && versionAnterior !== data.version) {
            console.log('🆕 Nueva versión del catálogo detectada!');
            mostrarNotificacion('🆕 Catálogo actualizado con nuevos productos', 'info');
        }
        localStorage.setItem('catalogoVersion', data.version);
        localStorage.setItem('catalogoLastUpdate', data.lastUpdate);
        
        return true;
    } catch (error) {
        console.error('❌ Error cargando productos:', error);
        console.warn('⚠️ Intentando cargar desde cache local');
        
        // Intentar cargar desde localStorage si existe
        const productosGuardados = localStorage.getItem('productosCache');
        if (productosGuardados) {
            try {
                const cache = JSON.parse(productosGuardados);
                productos = cache.productos;
                console.log('✅ Productos cargados desde cache local');
                return true;
            } catch (e) {
                console.error('Error parseando cache:', e);
            }
        }
        
        mostrarNotificacion('⚠️ Error cargando productos. Por favor recarga la página.', 'warning');
        return false;
    }
}

// Escuchar mensajes del Service Worker sobre actualizaciones
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'DATA_UPDATED') {
            console.log('🔄 Datos actualizados detectados:', event.data.url);
            
            // Si se actualizó productos.json, recargar
            if (event.data.url.includes('productos.json')) {
                cargarProductos().then(() => {
                    // Refrescar vista de productos si está visible
                    if (document.getElementById('productos')) {
                        mostrarProductos(filtroActual);
                        console.log('🔄 Vista de productos actualizada');
                    }
                });
            }
        }
    });
}


// === VARIABLES GLOBALES ===
let carritoCompras = [];
let filtroActual = 'todos';
let deferredPrompt = null; // Variable global para capturar el evento de instalación

// === SISTEMA DE INSTALACIÓN PWA ===
// Captura el evento beforeinstallprompt para diferir el prompt nativo
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e; // Guardamos para usarlo cuando el usuario haga clic
    console.log('📲 Evento beforeinstallprompt capturado');
    actualizarEstadoBotonInstalacion(true);
    // Mostrar prompt visual si el usuario aún no instaló
    mostrarPromptInstalacion();
});

// Detectar instalación exitosa
window.addEventListener('appinstalled', () => {
    console.log('✅ Aplicación instalada');
    deferredPrompt = null; // ya no necesitamos el prompt diferido
    ocultarPromptInstalacion();
    actualizarEstadoBotonInstalacion(false);
    mostrarNotificacion('🎉 Aplicación instalada correctamente', 'success');
    
    // Actualizar botón del banner
    const btnInstalar = document.querySelector('.btn-instalar-banner');
    if (btnInstalar) {
        btnInstalar.innerHTML = '✅ App Instalada';
        btnInstalar.classList.add('instalada');
    }
    
    // Cerrar banner después de mostrar éxito
    setTimeout(() => {
        const cerrarBtn = document.querySelector('.btn-cerrar-banner');
        if (cerrarBtn) cerrarBtn.click();
    }, 3000);
});

// Verificar si ya está instalada al cargar
function verificarAppInstalada() {
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        console.log('✅ App ya instalada - ejecutándose en modo standalone');
        
        const btnInstalar = document.querySelector('.btn-instalar-banner');
        if (btnInstalar) {
            btnInstalar.innerHTML = '✅ App Instalada';
            btnInstalar.classList.add('instalada');
        }
        
        // Ocultar botón FAB si existe
        actualizarEstadoBotonInstalacion(false);
        return true;
    }
    return false;
}

function instalarPWA() {
    // Si no tenemos el evento diferido, ofrecer instrucciones manuales
    if (!deferredPrompt) {
        console.warn('⚠️ No hay prompt de instalación disponible');
        mostrarNotificacion('💡 Instala desde el menú de tu navegador (⋮ → Instalar app)', 'info');
        return;
    }
    try {
        console.log('📲 Mostrando prompt de instalación nativo');
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            console.log('📊 Resultado instalación:', choice.outcome);
            
            const btnInstalar = document.querySelector('.btn-instalar-banner');
            
            if (choice.outcome === 'accepted') {
                mostrarNotificacion('🎉 ¡App instalada exitosamente!', 'success');
                
                // Actualizar botón del banner
                if (btnInstalar) {
                    btnInstalar.innerHTML = '✅ App Instalada';
                    btnInstalar.classList.remove('instalando');
                    btnInstalar.classList.add('instalada');
                }
                
                // Cerrar banner después de 3 segundos
                setTimeout(() => {
                    cerrarBanner();
                }, 3000);
            } else {
                mostrarNotificacion('Instalación cancelada', 'info');
                
                // Restaurar botón
                if (btnInstalar) {
                    btnInstalar.innerHTML = '📱 Instalar App';
                    btnInstalar.classList.remove('instalando');
                }
            }
            
            deferredPrompt = null; // limpiar referencia
            ocultarPromptInstalacion();
            actualizarEstadoBotonInstalacion(false);
        });
    } catch (error) {
        console.error('❌ Error mostrando prompt de instalación:', error);
        mostrarNotificacion('❌ Error al instalar. Intenta desde el menú del navegador', 'error');
        
        const btnInstalar = document.querySelector('.btn-instalar-banner');
        if (btnInstalar) {
            btnInstalar.innerHTML = '📱 Instalar App';
            btnInstalar.classList.remove('instalando');
        }
    }
}

function mostrarPromptInstalacion() {
    // Mostrar solo si hay deferredPrompt y no está instalada (heurística sencilla)
    const prompt = document.getElementById('promptInstalacion');
    if (!prompt) return;
    if (!deferredPrompt) {
        prompt.style.display = 'none';
        return;
    }
    prompt.style.display = 'block';
}

function cerrarPromptInstalacion() {
    ocultarPromptInstalacion();
}

function ocultarPromptInstalacion() {
    const prompt = document.getElementById('promptInstalacion');
    if (prompt) prompt.style.display = 'none';
}

function actualizarEstadoBotonInstalacion(disponible) {
    const fab = document.getElementById('btnFabInstalar');
    if (!fab) return;
    if (disponible) {
        fab.style.display = 'flex';
        fab.classList.add('pwa-disponible');
    } else {
        fab.style.display = 'none';
        fab.classList.remove('pwa-disponible');
    }
}

// === INICIALIZACIÓN DE LA APP ===
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Iniciando Alimento del Cielo PWA...');

    // Filtro para silenciar errores conocidos de extensiones (Grammarly / Iterable)
    // Suprimir errores de extensiones del navegador (Grammarly, etc.)
    const originalConsoleError = console.error;
    console.error = function(...args) {
        const errorStr = args.map(a => {
            if (typeof a === 'string') return a;
            if (a && a.message) return a.message;
            if (a && a.stack) return a.stack;
            return String(a);
        }).join(' ');
        
        // Filtrar errores de extensiones del navegador
        if (
            /grm ERROR/i.test(errorStr) ||
            /\[iterable\]/i.test(errorStr) ||
            /Not supported: in app messages from Iterable/i.test(errorStr) ||
            /Iterable/i.test(errorStr)
        ) {
            // Silenciar completamente estos errores
            return;
        }
        
        originalConsoleError.apply(console, args);
    };
    
    // ⭐ CARGAR PRODUCTOS DINÁMICAMENTE PRIMERO
    await cargarProductos();
    
    renderizarProductos();
    cargarTema();
    cargarCarritoDesdeLocalStorage();
    verificarAppInstalada(); // Verificar si ya está instalada
    mostrarPromptInstalacion();
    registrarServiceWorker();
    generarCodigoReferido();
    configurarBusqueda();
    configurarEventos();
    inicializarBotonWhatsApp();
    inicializarContadorNotificaciones(); // Inicializar contador de notificaciones
    
    // Inicializar sistema de reseñas
    window.reviewsManager = new ReviewsManager();
    await reviewsManager.init();
    
    // Inicializar sistema de notificaciones
    setTimeout(() => {
        inicializarNotificaciones();
    }, 2000); // Esperar 2 segundos después de cargar la página
});

// Función para registrar Service Worker
function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Error al registrar Service Worker:', error);
            });
    }
}

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
    
    // NUEVO: Aplicar ordenamiento
    productosFiltrados = ordenarProductos(productosFiltrados);

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
        ocultarMensajeResultados();
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
                ${obtenerBadgePopularidad(producto.id)}
            </div>
            <div class="info-producto">
                <h3 class="titulo-producto">${producto.nombre}</h3>
                <p class="descripcion-producto">${producto.descripcion}</p>

                <div class="meta-producto">
                    ${producto.unidadMedida ? `<span class="unidad-medida">${producto.unidadMedida}</span>` : ''}
                    ${producto.pesoAproximado ? `<span class="peso-aproximado">${producto.pesoAproximado}</span>` : ''}
                </div>

                <div class="precio-popularidad-wrapper">
                    <div class="precio-producto">
                        ${producto.precio.toLocaleString('es-CO')}
                    </div>
                    ${datosPopularidad[producto.id] ? `
                        <div class="info-popularidad">
                            <span class="info-ventas" title="Unidades vendidas">
                                📦 ${datosPopularidad[producto.id].ventas}
                            </span>
                            <span class="info-valoracion" title="Valoración promedio">
                                ⭐ ${datosPopularidad[producto.id].valoracion}
                            </span>
                        </div>
                    ` : ''}
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
    
    // Mostrar mensaje de resultados si hay ordenamiento activo
    if (ordenamientoActual.precio || ordenamientoActual.popularidad) {
        mostrarMensajeResultados();
    }
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
    
    // Notificación push para primer producto
    if (carritoCompras.length === 1 && !itemExistente) {
        notificarProductoAgregado(producto.nombre);
    }
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
    const subtotal = carritoCompras.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    const descuentoReferido = calcularDescuentoReferidoSync(subtotal);
    const tipoDescuento = obtenerTipoDescuento();
    const total = subtotal - descuentoReferido;
    
    // Mostrar descuento si aplica
    let htmlDescuento = '';
    if (descuentoReferido > 0 && tipoDescuento) {
        htmlDescuento = `
            <div class="descuento-referido-carrito">
                <span>🎁 ${tipoDescuento.mensaje}:</span>
                <span class="descuento-monto">-$${descuentoReferido.toLocaleString("es-CO")}</span>
            </div>
        `;
    }
    
    // Insertar descuento antes del total si existe contenedor
    const descuentoContainer = document.getElementById('descuentoReferidoContainer');
    if (descuentoContainer) {
        descuentoContainer.innerHTML = htmlDescuento;
    }
    
    montoTotal.textContent = total.toLocaleString("es-CO");
}


// === LIMPIAR CARRITO ===

function limpiarCarrito() {
    carritoCompras = [];
    actualizarCarrito();
    guardarCarrito();
    mostrarNotificacion('🧹 Carrito vaciado');
}

// === CARGAR CARRITO DESDE LOCALSTORAGE ===
function cargarCarritoDesdeLocalStorage() {
    try {
        const carritoGuardado = localStorage.getItem('carritoAlimentoDelCielo');
        if (carritoGuardado) {
            carritoCompras = JSON.parse(carritoGuardado);
            actualizarCarrito();
            console.log('✅ Carrito cargado desde localStorage:', carritoCompras.length, 'items');
        }
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        carritoCompras = [];
    }
}

// === GUARDAR CARRITO EN LOCALSTORAGE ===
function guardarCarrito() {
    try {
        if (!Array.isArray(carritoCompras)) {
            console.warn('⚠️ carritoCompras no es un array, abortando guardado');
            return;
        }
        localStorage.setItem('carritoAlimentoDelCielo', JSON.stringify(carritoCompras));
        // Emitir evento para otros módulos (analytics, sincronización)
        dispatchEvent(new CustomEvent('carritoActualizado', {
            detail: {
                totalItems: carritoCompras.reduce((t,i)=>t+i.cantidad,0),
                totalPrecio: carritoCompras.reduce((t,i)=>t+i.precio*i.cantidad,0),
                timestamp: Date.now()
            }
        }));
        // Log ligero
        // console.log('🗂️ Carrito guardado:', carritoCompras.length, 'items'); // (silenciado para no saturar)
    } catch (error) {
        console.error('❌ Error guardando carrito:', error);
    }
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

function scrollearAProductos() {
    const grillaProductos = document.getElementById('grillaProductos');
    if (grillaProductos) {
        grillaProductos.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    } else {
        console.warn('⚠️ No se encontró la sección de productos');
    }
}

function limpiarFiltros() {
    filtroActual = 'todos';
    document.getElementById('campoBusqueda').value = '';
    
    // Limpiar también los filtros de ordenamiento
    limpiarFiltrosOrdenamiento();
    
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('activo');
    });
    document.querySelector('.btn-filtro').classList.add('activo');
    renderizarProductos();
}

// === SISTEMA DE FILTROS Y ORDENAMIENTO AVANZADO ===

// Variables globales para ordenamiento
let ordenamientoActual = {
    precio: '',
    popularidad: ''
};

// Datos de popularidad simulados (en producción vendrían de tu backend/analytics)
const datosPopularidad = {
    1: { ventas: 450, valoracion: 4.8 },
    2: { ventas: 320, valoracion: 4.6 },
    3: { ventas: 280, valoracion: 4.5 },
    20: { ventas: 380, valoracion: 4.7 },
    21: { ventas: 340, valoracion: 4.6 },
    22: { ventas: 420, valoracion: 4.8 },
    23: { ventas: 300, valoracion: 4.5 },
    40: { ventas: 260, valoracion: 4.9 },
    41: { ventas: 240, valoracion: 4.8 },
    42: { ventas: 290, valoracion: 4.7 },
    43: { ventas: 310, valoracion: 4.7 },
    44: { ventas: 270, valoracion: 4.6 },
    60: { ventas: 350, valoracion: 4.6 },
    61: { ventas: 330, valoracion: 4.5 },
    62: { ventas: 320, valoracion: 4.5 },
    63: { ventas: 480, valoracion: 4.9 },
    80: { ventas: 390, valoracion: 4.7 },
    81: { ventas: 410, valoracion: 4.8 },
    82: { ventas: 360, valoracion: 4.7 },
    83: { ventas: 370, valoracion: 4.6 },
    84: { ventas: 400, valoracion: 4.7 },
    85: { ventas: 380, valoracion: 4.7 },
    86: { ventas: 420, valoracion: 4.8 },
    87: { ventas: 450, valoracion: 4.8 },
    88: { ventas: 430, valoracion: 4.8 },
    89: { ventas: 410, valoracion: 4.7 },
    90: { ventas: 440, valoracion: 4.8 },
    91: { ventas: 420, valoracion: 4.7 },
    100: { ventas: 520, valoracion: 4.9 },
    101: { ventas: 490, valoracion: 4.9 },
    102: { ventas: 470, valoracion: 4.8 },
    103: { ventas: 510, valoracion: 4.9 },
    104: { ventas: 530, valoracion: 5.0 },
    105: { ventas: 450, valoracion: 4.8 },
    106: { ventas: 480, valoracion: 4.8 },
    107: { ventas: 500, valoracion: 4.9 },
    108: { ventas: 520, valoracion: 4.9 },
    109: { ventas: 540, valoracion: 5.0 },
    110: { ventas: 560, valoracion: 5.0 },
    111: { ventas: 580, valoracion: 5.0 },
    120: { ventas: 440, valoracion: 4.8 },
    121: { ventas: 460, valoracion: 4.8 },
    122: { ventas: 470, valoracion: 4.8 },
    123: { ventas: 450, valoracion: 4.7 },
    124: { ventas: 460, valoracion: 4.7 },
    125: { ventas: 480, valoracion: 4.8 },
    126: { ventas: 490, valoracion: 4.8 },
    127: { ventas: 500, valoracion: 4.9 },
    128: { ventas: 510, valoracion: 4.9 },
    129: { ventas: 420, valoracion: 4.7 },
    130: { ventas: 430, valoracion: 4.7 },
    131: { ventas: 440, valoracion: 4.8 },
    140: { ventas: 360, valoracion: 4.6 },
    141: { ventas: 380, valoracion: 4.6 }
};

/**
 * Aplicar filtros de ordenamiento
 */
function aplicarFiltrosOrdenamiento() {
    const selectPrecio = document.getElementById('ordenPrecio');
    const selectPopularidad = document.getElementById('ordenPopularidad');
    
    ordenamientoActual.precio = selectPrecio ? selectPrecio.value : '';
    ordenamientoActual.popularidad = selectPopularidad ? selectPopularidad.value : '';
    
    // Añadir clase de carga visual
    const grilla = document.getElementById('grillaProductos');
    if (grilla) {
        grilla.classList.add('filtrando');
    }
    
    // Aplicar filtros con pequeño delay para transición suave
    setTimeout(() => {
        renderizarProductos();
        if (grilla) {
            grilla.classList.remove('filtrando');
        }
        mostrarMensajeResultados();
        
        // Analytics
        if (window.AlimentoDelCielo && window.AlimentoDelCielo.analytics) {
            window.AlimentoDelCielo.analytics.track('filtro_aplicado', {
                tipo: 'ordenamiento',
                precio: ordenamientoActual.precio,
                popularidad: ordenamientoActual.popularidad
            });
        }
    }, 150);
}

/**
 * Limpiar todos los filtros de ordenamiento
 */
function limpiarFiltrosOrdenamiento() {
    const selectPrecio = document.getElementById('ordenPrecio');
    const selectPopularidad = document.getElementById('ordenPopularidad');
    
    if (selectPrecio) selectPrecio.value = '';
    if (selectPopularidad) selectPopularidad.value = '';
    
    ordenamientoActual = {
        precio: '',
        popularidad: ''
    };
    
    renderizarProductos();
    ocultarMensajeResultados();
    mostrarNotificacion('🔄 Filtros limpiados', 'exito');
    
    // Analytics
    if (window.AlimentoDelCielo && window.AlimentoDelCielo.analytics) {
        window.AlimentoDelCielo.analytics.track('filtros_limpiados', {
            tipo: 'ordenamiento'
        });
    }
}

/**
 * Ordenar productos según criterios seleccionados
 */
function ordenarProductos(productos) {
    let productosOrdenados = [...productos];
    
    // Ordenar por precio
    if (ordenamientoActual.precio === 'asc') {
        productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (ordenamientoActual.precio === 'desc') {
        productosOrdenados.sort((a, b) => b.precio - a.precio);
    }
    
    // Ordenar por popularidad
    if (ordenamientoActual.popularidad === 'ventas') {
        productosOrdenados.sort((a, b) => {
            const ventasA = datosPopularidad[a.id]?.ventas || 0;
            const ventasB = datosPopularidad[b.id]?.ventas || 0;
            return ventasB - ventasA;
        });
    } else if (ordenamientoActual.popularidad === 'valoracion') {
        productosOrdenados.sort((a, b) => {
            const valoracionA = datosPopularidad[a.id]?.valoracion || 0;
            const valoracionB = datosPopularidad[b.id]?.valoracion || 0;
            return valoracionB - valoracionA;
        });
    }
    
    return productosOrdenados;
}

/**
 * Mostrar mensaje con resultados de filtros
 */
function mostrarMensajeResultados() {
    const grilla = document.getElementById('grillaProductos');
    if (!grilla) return;
    
    // Remover mensaje anterior si existe
    ocultarMensajeResultados();
    
    const tieneOrden = ordenamientoActual.precio || ordenamientoActual.popularidad;
    if (!tieneOrden) return;
    
    const totalProductos = grilla.children.length;
    
    let textoOrden = '';
    if (ordenamientoActual.precio === 'asc') {
        textoOrden = 'Ordenados por precio: menor a mayor';
    } else if (ordenamientoActual.precio === 'desc') {
        textoOrden = 'Ordenados por precio: mayor a menor';
    } else if (ordenamientoActual.popularidad === 'ventas') {
        textoOrden = 'Ordenados por: más vendidos';
    } else if (ordenamientoActual.popularidad === 'valoracion') {
        textoOrden = 'Ordenados por: mejor valorados';
    }
    
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-resultados';
    mensaje.id = 'mensajeResultados';
    mensaje.innerHTML = `
        <span class="icono-resultado">🎯</span>
        <span class="texto-resultado">${textoOrden}</span>
        <span class="contador-resultado">${totalProductos} producto${totalProductos !== 1 ? 's' : ''}</span>
    `;
    
    grilla.parentNode.insertBefore(mensaje, grilla);
}

/**
 * Ocultar mensaje de resultados
 */
function ocultarMensajeResultados() {
    const mensajeExistente = document.getElementById('mensajeResultados');
    if (mensajeExistente) {
        mensajeExistente.remove();
    }
}

/**
 * Obtener badge de popularidad para mostrar en tarjeta
 */
function obtenerBadgePopularidad(productoId) {
    const datos = datosPopularidad[productoId];
    if (!datos) return '';
    
    const esTopVentas = datos.ventas > 400;
    const esTopValoracion = datos.valoracion >= 4.8;
    
    if (esTopVentas && esTopValoracion) {
        return '<div class="badge-top-producto" aria-label="Top producto">🏆 Top Producto</div>';
    } else if (esTopVentas) {
        return '<div class="badge-popularidad badge-ventas" aria-label="Más vendido">🔥 Más Vendido</div>';
    } else if (esTopValoracion) {
        return '<div class="badge-popularidad badge-valoracion" aria-label="Mejor valorado">⭐ Mejor Valorado</div>';
    }
    
    return '';
}

// === RENDERIZADO DE PRODUCTOS (ACTUALIZADO) ===
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
    
    // NUEVO: Aplicar ordenamiento
    productosFiltrados = ordenarProductos(productosFiltrados);

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
        ocultarMensajeResultados();
        return;
    }

    grilla.innerHTML = productosFiltrados.map(producto => `
        <article class="tarjeta-producto product-card entrada-animada">
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
                ${producto.etiqueta === 'Delicioso' ? `<div class="badge-delicioso">${producto.etiqueta}</div>` : producto.etiqueta ? `<div class="etiqueta-producto ${producto.tipoEtiqueta}">${producto.etiqueta}</div>` : ''}
                ${obtenerBadgePopularidad(producto.id)}
            </div>
            <div class="info-producto">
                <h3 class="titulo-producto">${producto.nombre}</h3>
                <p class="descripcion-producto">${producto.descripcion}</p>

                <div class="meta-producto">
                    ${producto.unidadMedida ? `<span class="unidad-medida">${producto.unidadMedida}</span>` : ''}
                    ${producto.pesoAproximado ? `<span class="peso-aproximado">${producto.pesoAproximado}</span>` : ''}
                </div>

                <div class="precio-popularidad-wrapper">
                    <div class="precio-producto">
                        ${producto.precio.toLocaleString('es-CO')}
                    </div>
                    ${datosPopularidad[producto.id] ? `
                        <div class="info-popularidad">
                            <span class="info-ventas" title="Unidades vendidas">
                                📦 ${datosPopularidad[producto.id].ventas}
                            </span>
                            <span class="info-valoracion" title="Valoración promedio">
                                ⭐ ${datosPopularidad[producto.id].valoracion}
                            </span>
                        </div>
                    ` : ''}
                </div>
                <div class="acciones-producto" onclick="event.stopPropagation()">
                    <button class="boton boton-primario" onclick="agregarAlCarrito(${producto.id}); event.stopPropagation()">
                        🛒 Agregar
                    </button>
                    <a href="${generarEnlaceWhatsApp(producto)}" 
                    class="boton boton-whatsapp" 
                    target="_blank"
                    onclick="event.stopPropagation()">
                        💬 WhatsApp
                    </a>

                    <!-- BOTÓN DESTACADO solo para producto id 1 -->
                    ${producto.id === 1 ? `
                        <button class="boton boton-destacado" onclick="mostrarSimuladorPollo(${producto.id}); event.stopPropagation()">
                        🔢 Simular peso (Pollo)
                        </button>
                    ` : ''}
                </div>
            </div>
        </article>
    `).join('');
    
    // Agregar listeners de clic a las tarjetas
    setTimeout(() => {
        document.querySelectorAll('.tarjeta-producto').forEach((tarjeta, index) => {
            tarjeta.addEventListener('click', () => {
                abrirModalProducto(productosFiltrados[index].id);
            });
        });
    }, 0);
    
    // Mostrar mensaje de resultados si hay ordenamiento activo
    if (ordenamientoActual.precio || ordenamientoActual.popularidad) {
        mostrarMensajeResultados();
    }
}

// === LIMPIAR FILTROS (ACTUALIZADO) ===
function limpiarFiltros() {
    filtroActual = 'todos';
    document.getElementById('campoBusqueda').value = '';
    
    // Limpiar también los filtros de ordenamiento
    limpiarFiltrosOrdenamiento();
    
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

    const subtotal = carritoCompras.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    const descuentoReferido = calcularDescuentoReferido(subtotal);
    const tipoDescuento = obtenerTipoDescuento();
    const total = subtotal - descuentoReferido;
    
    mensaje += `
-------------------
💵 *SUBTOTAL:* $${subtotal.toLocaleString('es-CO')}`;

    // Adjuntar info de descuento
    if (descuentoReferido > 0 && tipoDescuento) {
        mensaje += `
🎁 *DESCUENTO (${tipoDescuento.mensaje}):* -$${descuentoReferido.toLocaleString('es-CO')}`;
    }
    
    mensaje += `
💰 *TOTAL A PAGAR:* $${total.toLocaleString('es-CO')}

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

// === PAGO POR NEQUI ===

/**
 * Procesa el pago por Nequi
 */
async function pagarPorNequi() {
    if (carritoCompras.length === 0) {
        mostrarNotificacion('⚠️ Tu carrito está vacío', 'error');
        return;
    }

    try {
        // Calcular totales
        const subtotal = carritoCompras.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        const descuentoReferido = calcularDescuentoReferidoSync(subtotal);
        const total = subtotal - descuentoReferido;
        
        // Generar referencia única
        const referencia = `PED-${Date.now()}`;
        
        // Preparar datos
        const datosTransaccion = {
            total: total,
            referencia: referencia,
            items: carritoCompras.map(item => ({
                nombre: item.nombre,
                cantidad: item.cantidad,
                precio: item.precio
            })),
            clienteInfo: {
                descuentoAplicado: descuentoReferido > 0,
                montoDescuento: descuentoReferido
            }
        };

        // Mostrar loading
        mostrarNotificacion('💰 Generando instrucciones de pago Nequi...', 'info');

        // Llamar a Netlify Function
        const response = await fetch('/.netlify/functions/crear-transaccion-nequi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosTransaccion)
        });

        if (!response.ok) {
            throw new Error('Error creando transacción Nequi');
        }

        const data = await response.json();
        
        if (data.success && data.transaccion) {
            // Guardar transacción en localStorage
            const transacciones = JSON.parse(localStorage.getItem('transaccionesNequi') || '[]');
            transacciones.push(data.transaccion);
            localStorage.setItem('transaccionesNequi', JSON.stringify(transacciones));

            // Mostrar modal con instrucciones
            mostrarModalInstruccionesNequi(data.transaccion);
            
            // Guardar pedido en historial
            guardarPedidoEnHistorial();
            
            console.log('✅ Transacción Nequi creada:', data.transaccion);
        } else {
            throw new Error('Respuesta inválida del servidor');
        }

    } catch (error) {
        console.error('❌ Error procesando pago Nequi:', error);
        mostrarNotificacion('❌ Error al procesar pago. Intenta de nuevo.', 'error');
    }
}

/**
 * Muestra modal con instrucciones de pago Nequi
 */
function mostrarModalInstruccionesNequi(transaccion) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay-nequi';
    modal.id = 'modalNequi';
    
    // Cerrar al hacer click en el overlay (fondo)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModalNequi();
        }
    });
    
    modal.innerHTML = `
        <div class="modal-contenido modal-nequi">
            <button class="btn-cerrar-modal" onclick="cerrarModalNequi()">×</button>
            
            <div class="header-modal-nequi">
                <div class="icono-nequi-grande">💰</div>
                <h2>Pago por Nequi</h2>
                <p class="monto-destacado">$${transaccion.total.toLocaleString('es-CO')}</p>
            </div>
            
            <div class="instrucciones-nequi">
                <h3>📋 Instrucciones:</h3>
                <ol>
                    ${transaccion.instrucciones.map(inst => `<li>${inst}</li>`).join('')}
                </ol>
            </div>
            
            <div class="info-importante">
                <p><strong>⏰ Esta referencia expira en 15 minutos</strong></p>
                <p class="codigo-referencia">Referencia: <strong>${transaccion.referencia}</strong></p>
            </div>
            
            <div class="acciones-modal-nequi">
                <button class="boton boton-whatsapp" onclick="abrirWhatsAppNequi('${transaccion.whatsappLink}')">
                    💬 Enviar comprobante por WhatsApp
                </button>
                <button class="boton boton-secundario" onclick="copiarReferencia('${transaccion.referencia}')">
                    📋 Copiar referencia
                </button>
                <button class="boton boton-outline" onclick="cerrarModalNequi()">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animar entrada y asegurar que esté por encima de todo
    setTimeout(() => {
        modal.classList.add('active');
        modal.style.zIndex = '99999';
    }, 10);
}

/**
 * Cierra el modal de Nequi
 */
function cerrarModalNequi() {
    const modal = document.getElementById('modalNequi');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

/**
 * Abre WhatsApp con el enlace preconfigurado
 */
function abrirWhatsAppNequi(link) {
    window.open(link, '_blank');
    cerrarModalNequi();
    
    // Limpiar carrito después de enviar
    setTimeout(() => {
        if (confirm('¿Deseas vaciar el carrito?')) {
            carritoCompras = [];
            actualizarCarrito();
            cerrarCarrito();
            mostrarNotificacion('✅ ¡Gracias por tu pedido! Te contactaremos pronto.', 'success');
        }
    }, 1000);
}

/**
 * Copia la referencia al portapapeles
 */
function copiarReferencia(referencia) {
    navigator.clipboard.writeText(referencia).then(() => {
        mostrarNotificacion('📋 Referencia copiada: ' + referencia, 'success');
    }).catch(() => {
        mostrarNotificacion('❌ Error al copiar', 'error');
    });
}

// === PROGRAMA DE REFERIDOS ===

/**
 * Genera un código de referido único para el usuario
 */
function generarCodigoReferido() {
    const prefijos = ['AMIGO', 'FAMILIA', 'CIELO', 'SABOR'];
    const sufijos = ['PREMIUM', 'VIP', 'ESPECIAL', 'GOLD'];
    const numero = Math.floor(Math.random() * 999) + 100;
    
    const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
    const sufijo = sufijos[Math.floor(Math.random() * sufijos.length)];
    
    // Si ya existe mi código, no regenerar
    let codigo = localStorage.getItem('miCodigoReferido');
    if (!codigo) {
        codigo = `${prefijo}-${sufijo}-${numero}`;
        localStorage.setItem('miCodigoReferido', codigo);
        console.log('✅ Código de referido generado:', codigo);
    }
    const el = document.getElementById('codigoReferido');
    if (el) el.textContent = codigo;
    
    return codigo;
}

/**
 * Comparte el código de referido del usuario
 */
function compartirCodigoReferido() {
    let codigo = (document.getElementById('codigoReferido')?.textContent || localStorage.getItem('miCodigoReferido') || '').trim();
    
    if (!codigo) {
        codigo = generarCodigoReferido();
    }
    
    const enlaceLanding = `${location.origin}${location.pathname}?ref=${encodeURIComponent(codigo)}`;
    const mensaje = `🎉 ¡Te invito a conocer Alimento del Cielo! \n\nUsa mi código de referido: *${codigo}* \ny obtén 10% de descuento en tu primera compra.\n\n🍽️ Los mejores alimentos congelados de Bogotá\n⚡ Perfectos para airfryer\n🚚 Entrega rápida y segura\n\nEntra aquí: ${enlaceLanding}\n\n¡No te pierdas esta oportunidad! 😋`;

    if (navigator.share) {
        navigator.share({
            title: 'Alimento del Cielo - Código de Referido',
            text: mensaje,
            url: enlaceLanding
        }).then(() => {
            mostrarNotificacion('📱 ¡Código compartido exitosamente!');
            registrarCompartidoReferido(codigo);
        }).catch(err => {
            console.log('Compartir cancelado:', err);
        });
    } else {
        navigator.clipboard.writeText(mensaje).then(() => {
            mostrarNotificacion('📋 ¡Código copiado! Compártelo con tus amigos');
            registrarCompartidoReferido(codigo);
        }).catch(err => {
            mostrarNotificacion('❌ Error al copiar', 'error');
        });
    }
}

/**
 * Copia el enlace de referido al portapapeles
 */
function copiarEnlaceReferido() {
    let codigo = localStorage.getItem('miCodigoReferido');
    if (!codigo) {
        codigo = generarCodigoReferido();
    }
    
    const enlaceLanding = `${location.origin}${location.pathname}?ref=${encodeURIComponent(codigo)}`;
    
    navigator.clipboard.writeText(enlaceLanding).then(() => {
        mostrarNotificacion('📋 ¡Enlace copiado al portapapeles!');
        registrarCompartidoReferido(codigo);
    }).catch(err => {
        mostrarNotificacion('❌ Error al copiar enlace', 'error');
    });
}

/**
 * Registra que se compartió el código de referido
 */
function registrarCompartidoReferido(codigo) {
    try {
        const compartidos = JSON.parse(localStorage.getItem('referidosCompartidos') || '[]');
        compartidos.push({
            codigo: codigo,
            timestamp: Date.now()
        });
        localStorage.setItem('referidosCompartidos', JSON.stringify(compartidos));
    } catch (e) {
        console.error('Error registrando compartido:', e);
    }
}

// === CAPTURAR ?ref= DE LA URL Y GUARDARLO ===

/**
 * Captura el código de referido desde la URL
 */
function capturarCodigoReferenteDesdeURL() {
    try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        
        if (ref && /^[A-Z0-9\-]{5,30}$/.test(ref)) {
            const miCodigo = localStorage.getItem('miCodigoReferido');
            
            // Evitar auto-referido
            if (miCodigo && miCodigo === ref) {
                console.warn('⚠️ No puedes usar tu propio código de referido');
                mostrarNotificacion('⚠️ No puedes usar tu propio código', 'warning');
                return;
            }
            
            // Verificar si ya tiene un referente activo
            const referenteExistente = localStorage.getItem('referenteActivo');
            if (referenteExistente && referenteExistente !== ref) {
                console.log('ℹ️ Ya tienes un código de referido activo:', referenteExistente);
                return;
            }
            
            // Guardar referente
            localStorage.setItem('referenteActivo', ref);
            localStorage.setItem('referenteTimestamp', String(Date.now()));
            localStorage.setItem('descuentoReferidoAplicado', 'false');
            
            // Mostrar notificación de bienvenida
            mostrarNotificacion('🎉 ¡Código de referido aplicado! 10% de descuento en tu primera compra');
            mostrarBannerDescuentoReferido(ref);
            
            console.log('✅ Referente capturado:', ref);
            
            // Registrar el referido para el que compartió
            registrarReferidoCapturado(ref);
            
            // Limpiar URL sin recargar
            const url = new URL(window.location);
            url.searchParams.delete('ref');
            window.history.replaceState({}, '', url);
        }
    } catch (e) {
        console.error('❌ Error procesando ref de URL:', e.message);
    }
}

/**
 * Registra que alguien usó tu código de referido
 */
function registrarReferidoCapturado(codigo) {
    try {
        const miCodigo = localStorage.getItem('miCodigoReferido');
        if (!miCodigo || miCodigo !== codigo) {
            // Este registro es para el que USÓ el código
            const misReferentes = JSON.parse(localStorage.getItem('misReferentesUsados') || '[]');
            misReferentes.push({
                codigo: codigo,
                timestamp: Date.now(),
                usado: false
            });
            localStorage.setItem('misReferentesUsados', JSON.stringify(misReferentes));
        }
    } catch (e) {
        console.error('Error registrando referido capturado:', e);
    }
}

/**
 * Muestra un banner con el descuento de referido
 */
function mostrarBannerDescuentoReferido(codigo) {
    // Eliminar banner anterior si existe
    const bannerAnterior = document.querySelector('.banner-descuento-referido');
    if (bannerAnterior) {
        bannerAnterior.remove();
    }

    const banner = document.createElement('div');
    banner.className = 'banner-descuento-referido';
    banner.innerHTML = `
        <div class="banner-referido-contenido">
            <span class="icono-regalo">🎁</span>
            <div class="texto-banner">
                <strong>¡Descuento Disponible!</strong>
                <p>10% OFF en tu próxima compra</p>
            </div>
            <span class="badge-activo">ACTIVO</span>
            <button class="btn-cerrar-banner-ref" onclick="cerrarBannerReferido()" aria-label="Cerrar banner">×</button>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Auto-cerrar después de 12 segundos
    setTimeout(() => {
        cerrarBannerReferido();
    }, 12000);
}

/**
 * Cierra el banner de descuento
 */
function cerrarBannerReferido() {
    const banner = document.querySelector('.banner-descuento-referido');
    if (banner) {
        banner.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => banner.remove(), 300);
    }
}

// === HISTORIAL DE PEDIDOS (LOCAL) ===

/**
 * Guarda el pedido en el historial local
 */
function guardarPedidoEnHistorial() {
    try {
        const subtotal = carritoCompras.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        const descuentoReferido = calcularDescuentoReferidoSync(subtotal);
        const tipoDescuento = obtenerTipoDescuento();
        const total = subtotal - descuentoReferido;
        
        const referente = localStorage.getItem('referenteActivo');
        
        const pedido = {
            id: 'PED-' + Date.now(),
            items: carritoCompras.map(i => ({ id: i.id, nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
            subtotal,
            descuentoReferido,
            total,
            referente: referente || null,
            timestamp: new Date().toISOString()
        };
        
        const arr = JSON.parse(localStorage.getItem('historialPedidosAlimento') || '[]');
        arr.push(pedido);
        localStorage.setItem('historialPedidosAlimento', JSON.stringify(arr));

        // CASO 1: Usuario que RECIBIÓ un código de referido
        if (referente && tipoDescuento?.tipo === 'referido') {
            // Incrementar contador del que compartió
            const m = JSON.parse(localStorage.getItem('referidosConteo') || '{}');
            m[referente] = (m[referente] || 0) + 1;
            localStorage.setItem('referidosConteo', JSON.stringify(m));
            
            // Marcar descuento como usado
            localStorage.setItem('descuentoReferidoAplicado', 'true');
            
            // Notificar al que compartió (simulado - en producción sería servidor)
            notificarReferidoExitoso(referente);
            
            console.log('✅ Pedido con código referido guardado:', referente);
        }
        
        // CASO 2: Usuario que COMPARTIÓ su código y está usando su recompensa
        if (tipoDescuento?.tipo === 'recompensa') {
            // Marcar un descuento de recompensa como usado
            const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
            const pendiente = misReferidosExitosos.find(r => !r.descuentoUsado);
            if (pendiente) {
                pendiente.descuentoUsado = true;
                pendiente.fechaUso = new Date().toISOString();
                localStorage.setItem('misReferidosExitosos', JSON.stringify(misReferidosExitosos));
                console.log('✅ Descuento de recompensa usado');
            }
        }
        
        actualizarMetricasReferidos();
    } catch (e) {
        console.error('❌ Error guardando historial de pedido:', e);
    }
}

/**
 * Notifica que alguien usó tu código exitosamente
 * Ahora usa Netlify Functions para sincronizar entre usuarios
 */
async function notificarReferidoExitoso(codigoUsado) {
    try {
        const miCodigo = localStorage.getItem('miCodigoReferido');
        
        // Registrar en servidor (Netlify Function)
        const response = await fetch('/.netlify/functions/registrar-referido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigoReferente: codigoUsado,
                pedidoId: 'PED-' + Date.now(),
                total: carritoCompras.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Referido registrado en servidor:', data);
            
            // Si es MI código, actualizar métricas locales
            if (miCodigo === codigoUsado) {
                const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
                misReferidosExitosos.push({
                    timestamp: Date.now(),
                    descuentoUsado: false,
                    fechaUso: null
                });
                localStorage.setItem('misReferidosExitosos', JSON.stringify(misReferidosExitosos));
                
                // Mostrar notificación de recompensa
                mostrarNotificacion('🎉 ¡Ganaste 10% de descuento! Alguien usó tu código');
            }
        } else {
            console.warn('⚠️ Error registrando referido en servidor');
            // Continuar con registro local
            registrarReferidoLocal(codigoUsado);
        }
    } catch (e) {
        console.error('Error notificando referido exitoso:', e);
        // Fallback: registro local
        registrarReferidoLocal(codigoUsado);
    }
}

/**
 * Registro local como fallback
 */
function registrarReferidoLocal(codigoUsado) {
    const miCodigo = localStorage.getItem('miCodigoReferido');
    if (miCodigo === codigoUsado) {
        const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
        misReferidosExitosos.push({
            timestamp: Date.now(),
            descuentoUsado: false,
            fechaUso: null
        });
        localStorage.setItem('misReferidosExitosos', JSON.stringify(misReferidosExitosos));
    }
}

/**
 * Calcula el descuento por referido
 * - 10% para quien USA el código (primera compra)
 * - 10% para quien COMPARTIÓ el código (en su próxima compra)
 * Consulta el servidor para verificar descuentos disponibles
 */
async function calcularDescuentoReferido(subtotal) {
    // Descuento para quien RECIBIÓ el código (primera compra)
    const referente = localStorage.getItem('referenteActivo');
    const descuentoYaAplicado = localStorage.getItem('descuentoReferidoAplicado') === 'true';
    
    if (referente && !descuentoYaAplicado) {
        return Math.round(subtotal * 0.10); // 10% de descuento
    }
    
    // Descuento para quien COMPARTIÓ el código (recompensa)
    const miCodigo = localStorage.getItem('miCodigoReferido');
    if (!miCodigo) return 0;
    
    try {
        // Consultar servidor para verificar descuentos disponibles
        const response = await fetch(`/.netlify/functions/registrar-referido?codigo=${encodeURIComponent(miCodigo)}`);
        
        if (response.ok) {
            const data = await response.json();
            const descuentosDisponibles = data.descuentosDisponibles || 0;
            
            if (descuentosDisponibles > 0) {
                return Math.round(subtotal * 0.10); // 10% de descuento por haber referido
            }
        } else {
            // Fallback: usar datos locales
            const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
            const descuentosDisponibles = misReferidosExitosos.filter(r => !r.descuentoUsado).length;
            
            if (descuentosDisponibles > 0) {
                return Math.round(subtotal * 0.10);
            }
        }
    } catch (e) {
        console.error('Error consultando descuentos:', e);
        // Fallback local
        const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
        const descuentosDisponibles = misReferidosExitosos.filter(r => !r.descuentoUsado).length;
        
        if (descuentosDisponibles > 0) {
            return Math.round(subtotal * 0.10);
        }
    }
    
    return 0;
}

// Función síncrona para compatibilidad (se ejecutará async internamente)
function calcularDescuentoReferidoSync(subtotal) {
    const referente = localStorage.getItem('referenteActivo');
    const descuentoYaAplicado = localStorage.getItem('descuentoReferidoAplicado') === 'true';
    
    if (referente && !descuentoYaAplicado) {
        return Math.round(subtotal * 0.10);
    }
    
    const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
    const descuentosDisponibles = misReferidosExitosos.filter(r => !r.descuentoUsado).length;
    
    if (descuentosDisponibles > 0) {
        return Math.round(subtotal * 0.10);
    }
    
    return 0;
}

/**
 * Obtiene el tipo de descuento aplicado
 */
function obtenerTipoDescuento() {
    const referente = localStorage.getItem('referenteActivo');
    const descuentoYaAplicado = localStorage.getItem('descuentoReferidoAplicado') === 'true';
    
    // Descuento por haber usado un código
    if (referente && !descuentoYaAplicado) {
        return {
            tipo: 'referido',
            codigo: referente,
            mensaje: `Código ${referente}`
        };
    }
    
    // Descuento por haber compartido tu código
    const miCodigo = localStorage.getItem('miCodigoReferido');
    const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
    const descuentosDisponibles = misReferidosExitosos.filter(r => !r.descuentoUsado);
    
    if (descuentosDisponibles.length > 0 && miCodigo) {
        return {
            tipo: 'recompensa',
            codigo: miCodigo,
            mensaje: `Recompensa por referir (${descuentosDisponibles.length} disponible${descuentosDisponibles.length > 1 ? 's' : ''})`
        };
    }
    
    return null;
}

/**
 * Actualiza las métricas de referidos en la UI
 * Ahora consulta el servidor para obtener datos reales
 */
async function actualizarMetricasReferidos() {
    try {
        const miCodigo = localStorage.getItem('miCodigoReferido');
        if (!miCodigo) return;
        
        // Consultar servidor
        const response = await fetch(`/.netlify/functions/registrar-referido?codigo=${encodeURIComponent(miCodigo)}`);
        
        let totalReferidos = 0;
        let descuentosDisponibles = 0;
        let referidos = [];
        
        if (response.ok) {
            const data = await response.json();
            totalReferidos = data.totalReferidos || 0;
            descuentosDisponibles = data.descuentosDisponibles || 0;
            referidos = data.referidos || [];
            
            console.log('✅ Métricas obtenidas del servidor:', data);
        } else {
            // Fallback: usar datos locales
            const conteoReferidos = JSON.parse(localStorage.getItem('referidosConteo') || '{}');
            totalReferidos = conteoReferidos[miCodigo] || 0;
            
            const misReferidosExitosos = JSON.parse(localStorage.getItem('misReferidosExitosos') || '[]');
            descuentosDisponibles = misReferidosExitosos.filter(r => !r.descuentoUsado).length;
            
            console.log('⚠️ Usando métricas locales (servidor no disponible)');
        }
        
        // Actualizar contador
        const contadorEl = document.getElementById('contadorReferidos');
        if (contadorEl) {
            contadorEl.textContent = totalReferidos;
        }
        
        // Actualizar lista de referidos
        const listaEl = document.getElementById('listaReferidos');
        if (listaEl) {
            if (totalReferidos === 0) {
                listaEl.innerHTML = '<li><small>(¡Aún no hay referidos!)</small></li>';
            } else {
                let html = '';
                
                // Mostrar descuentos disponibles
                if (descuentosDisponibles > 0) {
                    html += `
                        <li class="descuento-disponible">
                            <strong>🎁 ${descuentosDisponibles} Descuento${descuentosDisponibles > 1 ? 's' : ''} Disponible${descuentosDisponibles > 1 ? 's' : ''}</strong>
                            <small>¡Úsalo${descuentosDisponibles > 1 ? 's' : ''} en tu próxima compra!</small>
                            <span class="badge-activo">ACTIVO</span>
                        </li>
                    `;
                }
                
                // Mostrar referidos desde servidor o local
                if (referidos.length > 0) {
                    html += referidos.map((r, i) => `
                        <li>
                            <strong>Referido #${i + 1}</strong>
                            <small>${new Date(r.timestamp).toLocaleDateString('es-CO')}</small>
                            <span>$${(r.total || 0).toLocaleString('es-CO')}</span>
                        </li>
                    `).join('');
                } else {
                    // Fallback: mostrar desde historial local
                    const pedidos = JSON.parse(localStorage.getItem('historialPedidosAlimento') || '[]');
                    const misReferidos = pedidos.filter(p => p.referente === miCodigo);
                    
                    html += misReferidos.map((p, i) => `
                        <li>
                            <strong>Referido #${i + 1}</strong>
                            <small>${new Date(p.timestamp).toLocaleDateString('es-CO')}</small>
                            <span>$${p.total.toLocaleString('es-CO')}</span>
                        </li>
                    `).join('');
                }
                
                listaEl.innerHTML = html;
            }
        }
    } catch (e) {
        console.error('Error actualizando métricas:', e);
    }
}

// Inicializar captura de ref al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Generar código de referido si no existe
    generarCodigoReferido();
    
    // Capturar código de referido de la URL
    capturarCodigoReferenteDesdeURL();
    
    // Actualizar métricas de referidos
    setTimeout(() => {
        actualizarMetricasReferidos();
    }, 500);
});

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

// === CENTRO DE NOTIFICACIONES ===

/**
 * Alterna la visibilidad del panel de notificaciones
 */
function alternarCentroNotificaciones() {
    const panel = document.getElementById('panelNotificaciones');
    const overlay = document.getElementById('overlay');
    
    if (!panel) {
        console.error('❌ Panel de notificaciones no encontrado');
        return;
    }
    
    const estaAbierto = panel.classList.contains('abierto');
    
    if (estaAbierto) {
        cerrarCentroNotificaciones();
    } else {
        abrirCentroNotificaciones();
    }
}

/**
 * Abre el centro de notificaciones
 */
function abrirCentroNotificaciones() {
    const panel = document.getElementById('panelNotificaciones');
    const overlay = document.getElementById('overlay');
    
    // Cerrar carrito si está abierto
    const carritoAbierto = document.getElementById('sidebarCarrito');
    if (carritoAbierto && carritoAbierto.classList.contains('abierto')) {
        cerrarCarrito();
    }
    
    panel.classList.add('abierto');
    overlay.classList.add('mostrar');
    document.body.style.overflow = 'hidden';
    
    // Cargar notificaciones guardadas
    cargarNotificacionesGuardadas();
    
    // Marcar contador como leído
    actualizarContadorNotificaciones(0);
}

/**
 * Cierra el centro de notificaciones
 */
function cerrarCentroNotificaciones() {
    const panel = document.getElementById('panelNotificaciones');
    const overlay = document.getElementById('overlay');
    
    panel.classList.remove('abierto');
    overlay.classList.remove('mostrar');
    document.body.style.overflow = 'auto';
}

/**
 * Cierra paneles (carrito, centro de notificaciones) que estén abiertos.
 * Usado por el overlay para un comportamiento consistente.
 */
function cerrarPanelesAbiertos() {
    const sidebar = document.getElementById('sidebarCarrito');
    const panel = document.getElementById('panelNotificaciones');
    const overlay = document.getElementById('overlay');

    let algunoCerrado = false;

    if (sidebar && sidebar.classList.contains('abierto')) {
        sidebar.classList.remove('abierto');
        algunoCerrado = true;
    }

    if (panel && panel.classList.contains('abierto')) {
        panel.classList.remove('abierto');
        algunoCerrado = true;
    }

    if (overlay && overlay.classList.contains('mostrar')) {
        overlay.classList.remove('mostrar');
    }

    if (algunoCerrado) {
        document.body.style.overflow = 'auto';
    }
}

/**
 * Carga y muestra las notificaciones guardadas en localStorage
 */
function cargarNotificacionesGuardadas() {
    const notificacionesGuardadas = obtenerNotificacionesGuardadas();
    const listaNotificaciones = document.getElementById('listaNotificaciones');
    const notificacionesVacias = document.getElementById('notificacionesVacias');
    const btnMarcarLeidas = document.querySelector('.btn-marcar-leidas');
    const btnLimpiar = document.querySelector('.btn-limpiar-notificaciones');
    
    if (!listaNotificaciones || !notificacionesVacias) {
        console.error('❌ Elementos del panel de notificaciones no encontrados');
        return;
    }
    
    if (notificacionesGuardadas.length === 0) {
        listaNotificaciones.style.display = 'none';
        notificacionesVacias.style.display = 'block';
        if (btnMarcarLeidas) btnMarcarLeidas.style.display = 'none';
        if (btnLimpiar) btnLimpiar.style.display = 'none';
        return;
    }
    
    // Mostrar lista de notificaciones
    listaNotificaciones.style.display = 'flex';
    notificacionesVacias.style.display = 'none';
    if (btnMarcarLeidas) btnMarcarLeidas.style.display = 'block';
    if (btnLimpiar) btnLimpiar.style.display = 'block';
    
    // Limpiar lista actual
    listaNotificaciones.innerHTML = '';
    
    // Ordenar notificaciones por fecha (más recientes primero)
    notificacionesGuardadas.sort((a, b) => b.timestamp - a.timestamp);
    
    // Renderizar cada notificación
    notificacionesGuardadas.forEach((notif, index) => {
        const notifElement = crearElementoNotificacion(notif, index);
        listaNotificaciones.appendChild(notifElement);
    });
}

/**
 * Crea el elemento HTML de una notificación
 */
function crearElementoNotificacion(notificacion, index) {
    const div = document.createElement('div');
    div.className = `notificacion-item ${!notificacion.leida ? 'no-leida' : ''}`;
    div.dataset.index = index;
    
    const tiempoRelativo = obtenerTiempoRelativo(notificacion.timestamp);
    
    div.innerHTML = `
        <div class="notificacion-header">
            <span class="notificacion-titulo">${notificacion.titulo}</span>
            <span class="notificacion-tiempo">${tiempoRelativo}</span>
        </div>
        <p class="notificacion-mensaje">${notificacion.mensaje}</p>
    `;
    
    // Click para marcar como leída y navegar si tiene URL
    div.addEventListener('click', () => {
        marcarNotificacionLeida(index);
        if (notificacion.url) {
            window.location.href = notificacion.url;
        }
    });
    
    return div;
}

/**
 * Obtiene el tiempo relativo desde una fecha
 */
function obtenerTiempoRelativo(timestamp) {
    const ahora = Date.now();
    const diferencia = ahora - timestamp;
    
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    
    if (dias > 0) return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    if (horas > 0) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    if (minutos > 0) return `Hace ${minutos} min`;
    return 'Ahora';
}

/**
 * Obtiene las notificaciones guardadas del localStorage
 */
function obtenerNotificacionesGuardadas() {
    try {
        const notificaciones = localStorage.getItem('notificaciones_guardadas');
        return notificaciones ? JSON.parse(notificaciones) : [];
    } catch (error) {
        console.error('❌ Error al obtener notificaciones:', error);
        return [];
    }
}

/**
 * Guarda una notificación en localStorage
 */
function guardarNotificacion(titulo, mensaje, url = null) {
    try {
        const notificaciones = obtenerNotificacionesGuardadas();
        
        const nuevaNotificacion = {
            titulo,
            mensaje,
            url,
            timestamp: Date.now(),
            leida: false
        };
        
        notificaciones.unshift(nuevaNotificacion); // Agregar al inicio
        
        // Limitar a las últimas 50 notificaciones
        if (notificaciones.length > 50) {
            notificaciones.splice(50);
        }
        
        localStorage.setItem('notificaciones_guardadas', JSON.stringify(notificaciones));
        
        // Actualizar contador
        const noLeidas = notificaciones.filter(n => !n.leida).length;
        actualizarContadorNotificaciones(noLeidas);
        
    } catch (error) {
        console.error('❌ Error al guardar notificación:', error);
    }
}

/**
 * Marca una notificación como leída
 */
function marcarNotificacionLeida(index) {
    try {
        const notificaciones = obtenerNotificacionesGuardadas();
        if (notificaciones[index]) {
            notificaciones[index].leida = true;
            localStorage.setItem('notificaciones_guardadas', JSON.stringify(notificaciones));
            
            // Actualizar contador
            const noLeidas = notificaciones.filter(n => !n.leida).length;
            actualizarContadorNotificaciones(noLeidas);
            
            // Recargar vista
            cargarNotificacionesGuardadas();
        }
    } catch (error) {
        console.error('❌ Error al marcar notificación como leída:', error);
    }
}

/**
 * Marca todas las notificaciones como leídas
 */
function marcarTodasLeidas() {
    try {
        const notificaciones = obtenerNotificacionesGuardadas();
        notificaciones.forEach(n => n.leida = true);
        localStorage.setItem('notificaciones_guardadas', JSON.stringify(notificaciones));
        
        actualizarContadorNotificaciones(0);
        cargarNotificacionesGuardadas();
        
        mostrarNotificacion('✅ Todas las notificaciones marcadas como leídas');
    } catch (error) {
        console.error('❌ Error al marcar todas como leídas:', error);
    }
}

/**
 * Limpia todas las notificaciones
 */
function limpiarNotificaciones() {
    if (!confirm('¿Estás seguro de que deseas eliminar todas las notificaciones?')) {
        return;
    }
    
    try {
        localStorage.removeItem('notificaciones_guardadas');
        actualizarContadorNotificaciones(0);
        cargarNotificacionesGuardadas();
        
        mostrarNotificacion('🗑️ Todas las notificaciones han sido eliminadas');
    } catch (error) {
        console.error('❌ Error al limpiar notificaciones:', error);
    }
}

/**
 * Actualiza el contador de notificaciones no leídas
 */
function actualizarContadorNotificaciones(cantidad) {
    const contador = document.getElementById('contadorNotif');
    if (!contador) return;
    
    if (cantidad > 0) {
        contador.textContent = cantidad > 9 ? '9+' : cantidad;
        contador.style.display = 'flex';
    } else {
        contador.style.display = 'none';
    }
}

/**
 * Inicializa el contador de notificaciones al cargar la página
 */
function inicializarContadorNotificaciones() {
    const notificaciones = obtenerNotificacionesGuardadas();
    const noLeidas = notificaciones.filter(n => !n.leida).length;
    actualizarContadorNotificaciones(noLeidas);
}

// === NOTIFICACIONES ===
function mostrarNotificacion(mensaje, tipo = 'exito') {
    const notificacion = document.getElementById('notificacion');
    const textoNotificacion = document.getElementById('textoNotificacion');
    
    if (!notificacion || !textoNotificacion) {
        console.warn('⚠️ Elementos de notificación no encontrados');
        return;
    }
    
    textoNotificacion.textContent = mensaje;
    notificacion.className = `notificacion mostrar ${tipo === 'error' ? 'error' : ''}`;
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
    }, 3000);
}

// === SISTEMA DE NOTIFICACIONES PUSH ===

/**
 * Solicita permiso para mostrar notificaciones
 * @returns {Promise<string>} Estado del permiso ('granted', 'denied', 'default')
 */
async function solicitarPermisoNotificaciones() {
    if (!('Notification' in window)) {
        console.log('❌ Este navegador no soporta notificaciones');
        return 'denied';
    }

    // Si ya tenemos permiso
    if (Notification.permission === 'granted') {
        console.log('✅ Permisos de notificación ya concedidos');
        
        // Obtener token FCM si está disponible
        if (typeof solicitarPermisoNotificacionesFCM === 'function') {
            await solicitarPermisoNotificacionesFCM();
        }
        
        return 'granted';
    }

    // Si el usuario ya rechazó
    if (Notification.permission === 'denied') {
        console.log('❌ Permisos de notificación denegados previamente');
        return 'denied';
    }

    // Solicitar permiso
    try {
        const permission = await Notification.requestPermission();
        console.log(`📬 Permiso de notificaciones: ${permission}`);
        
        if (permission === 'granted') {
            mostrarNotificacion('🔔 ¡Notificaciones activadas! Te avisaremos de ofertas especiales');
            
            // Guardar en localStorage
            localStorage.setItem('notificaciones_activadas', 'true');
            
            // Obtener token FCM para notificaciones push
            if (typeof solicitarPermisoNotificacionesFCM === 'function') {
                const token = await solicitarPermisoNotificacionesFCM();
                if (token) {
                    console.log('✅ Token FCM obtenido y guardado');
                }
            } else {
                // Fallback al sistema antiguo si Firebase no está disponible
                suscribirseAPush();
            }
            
            // Enviar notificación de prueba después de 3 segundos
            setTimeout(() => {
                mostrarNotificacionPush(
                    '🎉 ¡Bienvenido!',
                    'Gracias por activar las notificaciones. Te mantendremos informado de nuestras mejores ofertas.',
                    '/index.html'
                );
            }, 3000);
        } else {
            mostrarNotificacion('ℹ️ Notificaciones desactivadas. Puedes activarlas más tarde.', 'error');
        }
        
        return permission;
    } catch (error) {
        console.error('❌ Error al solicitar permisos:', error);
        return 'denied';
    }
}

/**
 * Suscribe al usuario a notificaciones push
 */
async function suscribirseAPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('❌ Push notifications no soportadas');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        console.log('🔧 Service Worker listo para suscripción push');

        // Verificar si ya está suscrito
        let subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
            console.log('✅ Ya existe una suscripción push:', subscription.endpoint);
            return subscription;
        }

        // Crear nueva suscripción
        // NOTA: En producción necesitarías una clave VAPID del servidor
        // Por ahora usamos suscripción local para demostración
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: null // En producción: convertirVapidKey(VAPID_PUBLIC_KEY)
        });

        console.log('✅ Suscripción push creada:', subscription.endpoint);
        
        // Aquí enviarías la suscripción a tu servidor
        // await enviarSuscripcionAlServidor(subscription);
        
        return subscription;
    } catch (error) {
        console.error('❌ Error al suscribirse a push:', error);
        
        // Si falla por falta de VAPID key, continuar de todos modos
        if (error.message.includes('applicationServerKey')) {
            console.log('ℹ️ Continuando sin clave VAPID (modo demo)');
        }
    }
}

/**
 * Muestra una notificación push nativa del navegador
 * @param {string} titulo - Título de la notificación
 * @param {string} mensaje - Cuerpo del mensaje
 * @param {string} url - URL a abrir al hacer clic (opcional)
 */
function mostrarNotificacionPush(titulo, mensaje, url = '/') {
    if (!('Notification' in window)) {
        console.log('❌ Notificaciones no soportadas');
        return;
    }

    if (Notification.permission !== 'granted') {
        console.log('⚠️ No hay permisos para mostrar notificaciones');
        return;
    }

    // Guardar notificación en el centro de notificaciones
    guardarNotificacion(titulo, mensaje, url);

    // Opciones de la notificación
    const opciones = {
        body: mensaje,
        icon: './Imagenes/logo/Logo.png',
        badge: './Imagenes/iconos/96x96/96x96.png',
        image: './Imagenes/logo/Logo.png', // Imagen grande
        vibrate: [200, 100, 200], // Patrón de vibración
        tag: 'alimento-cielo-' + Date.now(), // ID único
        requireInteraction: false, // Se cierra automáticamente
        silent: false, // Con sonido
        data: {
            url: url,
            timestamp: Date.now()
        },
        actions: [
            {
                action: 'ver',
                title: '👀 Ver Ahora',
                icon: './Imagenes/iconos/96x96/96x96.png'
            },
            {
                action: 'cerrar',
                title: '✖️ Cerrar'
            }
        ]
    };

    // Crear la notificación
    const notificacion = new Notification(titulo, opciones);

    // Manejar clic en la notificación
    notificacion.onclick = function(event) {
        event.preventDefault(); // Prevenir comportamiento por defecto
        
        // Abrir/enfocar la ventana
        if (url && url !== '/') {
            window.open(url, '_blank');
        } else {
            window.focus();
        }
        
        notificacion.close();
    };

    // Auto-cerrar después de 10 segundos
    setTimeout(() => {
        notificacion.close();
    }, 10000);

    console.log('✅ Notificación push mostrada:', titulo);
}

/**
 * Verifica el estado de las notificaciones
 */
function verificarEstadoNotificaciones() {
    if (!('Notification' in window)) {
        return {
            soportado: false,
            permiso: 'denied',
            mensaje: 'Tu navegador no soporta notificaciones'
        };
    }

    return {
        soportado: true,
        permiso: Notification.permission,
        mensaje: Notification.permission === 'granted' 
            ? '✅ Notificaciones activadas' 
            : Notification.permission === 'denied'
            ? '❌ Notificaciones bloqueadas'
            : 'ℹ️ Notificaciones disponibles'
    };
}

/**
 * Envía notificación de bienvenida al primer ingreso
 */
function notificacionBienvenida() {
    const esPrimeraVisita = !localStorage.getItem('primera_visita');
    
    if (esPrimeraVisita && Notification.permission === 'granted') {
        setTimeout(() => {
            mostrarNotificacionPush(

                '🎉 ¡Bienvenido a Alimento del Cielo!',
                'Descubre nuestros productos frescos y congelados de la mejor calidad. ¡Ofertas especiales cada semana!',
                '/index.html'
            );
        }, 5000);
        
        localStorage.setItem('primera_visita', 'true');
    }
}

/**
 * Notificación cuando se agrega al carrito
 */
function notificarProductoAgregado(nombreProducto) {
    if (Notification.permission === 'granted') {
        const cantidadItems = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
        
        if (cantidadItems === 1) {
            // Primera compra
            mostrarNotificacionPush(
                '🛒 Primer producto agregado',
                `${nombreProducto} está en tu carrito. ¡Sigue comprando!`,
                '/index.html#carrito'
            );
        }
    }
}

/**
 * Inicializa el sistema de notificaciones
 */
function inicializarNotificaciones() {
    console.log('🔔 Inicializando sistema de notificaciones...');
    
    const estado = verificarEstadoNotificaciones();
    console.log('📊 Estado notificaciones:', estado);
    
    // Si el usuario nunca fue preguntado, preguntar después de 30 segundos
    if (estado.soportado && estado.permiso === 'default') {
        const yaPreguntoNotificaciones = localStorage.getItem('pregunto_notificaciones');
        
        if (!yaPreguntoNotificaciones) {
            setTimeout(() => {
                mostrarPromptNotificaciones();
            }, 30000); // Esperar 30 segundos antes de preguntar
        }
    }
    
    // Si ya tiene permisos, verificar suscripción
    if (estado.permiso === 'granted') {
        suscribirseAPush();
        notificacionBienvenida();
    }
    
    // Actualizar estado visual del botón
    actualizarEstadoBotonNotificaciones();
}

// ========================================
// SISTEMA PROFESIONAL DE NOTIFICACIONES PUSH
// ========================================

/**
 * CONFIGURACIÓN DE NOTIFICACIONES
 */
const NOTIFICACIONES_CONFIG = {
    // Tipos de notificaciones
    tipos: {
        PROMOCION: 'promocion',
        LANZAMIENTO: 'lanzamiento',
        RECORDATORIO: 'recordatorio',
        COMBO: 'combo',
        OFERTA_FLASH: 'oferta_flash',
        CARRITO_ABANDONADO: 'carrito_abandonado',
        ACTUALIZACION: 'actualizacion',
        PEDIDO: 'pedido'
    },
    
    // Prioridades
    prioridades: {
        ALTA: 'alta',
        MEDIA: 'media',
        BAJA: 'baja'
    },
    
    // Intervalos mínimos entre notificaciones (en ms)
    intervalos: {
        promocion: 24 * 60 * 60 * 1000, // 24 horas
        lanzamiento: 12 * 60 * 60 * 1000, // 12 horas
        recordatorio: 6 * 60 * 60 * 1000, // 6 horas
        combo: 24 * 60 * 60 * 1000, // 24 horas
        oferta_flash: 2 * 60 * 60 * 1000, // 2 horas
        carrito_abandonado: 30 * 60 * 1000, // 30 minutos
        actualizacion: 7 * 24 * 60 * 60 * 1000, // 7 días
        pedido: 0 // Sin límite
    },
    
    // Configuración de sonidos
    sonidos: {
        alta: true,
        media: true,
        baja: false
    }
};

/**
 * CLASE GESTORA DE NOTIFICACIONES
 */
class GestorNotificaciones {
    constructor() {
        this.ultimasNotificaciones = this.cargarUltimasNotificaciones();
        this.preferencias = this.cargarPreferencias();
        this.cola = [];
    }
    
    /**
     * Carga las últimas notificaciones enviadas
     */
    cargarUltimasNotificaciones() {
        try {
            const data = localStorage.getItem('ultimas_notificaciones');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error al cargar últimas notificaciones:', error);
            return {};
        }
    }
    
    /**
     * Guarda las últimas notificaciones
     */
    guardarUltimasNotificaciones() {
        try {
            localStorage.setItem('ultimas_notificaciones', JSON.stringify(this.ultimasNotificaciones));
        } catch (error) {
            console.error('Error al guardar últimas notificaciones:', error);
        }
    }
    
    /**
     * Carga preferencias del usuario
     */
    cargarPreferencias() {
        try {
            const data = localStorage.getItem('preferencias_notificaciones');
            return data ? JSON.parse(data) : {
                promocion: true,
                lanzamiento: true,
                recordatorio: true,
                combo: true,
                oferta_flash: true,
                carrito_abandonado: true,
                actualizacion: true,
                pedido: true,
                horaInicio: '08:00',
                horaFin: '22:00',
                noMolestar: false
            };
        } catch (error) {
            console.error('Error al cargar preferencias:', error);
            return {};
        }
    }
    
    /**
     * Guarda preferencias del usuario
     */
    guardarPreferencias(preferencias) {
        try {
            this.preferencias = { ...this.preferencias, ...preferencias };
            localStorage.setItem('preferencias_notificaciones', JSON.stringify(this.preferencias));
            console.log('✅ Preferencias guardadas:', this.preferencias);
        } catch (error) {
            console.error('Error al guardar preferencias:', error);
        }
    }
    
    /**
     * Verifica si se puede enviar una notificación de un tipo
     */
    puedeEnviar(tipo) {
        // Verificar permisos del navegador
        if (Notification.permission !== 'granted') {
            console.log('⚠️ No hay permisos de notificación');
            return false;
        }
        
        // Verificar preferencias del usuario
        if (!this.preferencias[tipo]) {
            console.log(`⚠️ Usuario desactivó notificaciones de tipo: ${tipo}`);
            return false;
        }
        
        // Verificar modo no molestar
        if (this.preferencias.noMolestar) {
            console.log('⚠️ Modo no molestar activado');
            return false;
        }
        
        // Verificar horario permitido
        if (!this.estaEnHorarioPermitido()) {
            console.log('⚠️ Fuera del horario permitido');
            return false;
        }
        
        // Verificar intervalo mínimo
        const ultimaNotif = this.ultimasNotificaciones[tipo];
        const intervaloMinimo = NOTIFICACIONES_CONFIG.intervalos[tipo] || 0;
        
        if (ultimaNotif && (Date.now() - ultimaNotif) < intervaloMinimo) {
            console.log(`⚠️ Intervalo mínimo no cumplido para tipo: ${tipo}`);
            return false;
        }
        
        return true;
    }
    
    /**
     * Verifica si está en horario permitido
     */
    estaEnHorarioPermitido() {
        const ahora = new Date();
        const horaActual = ahora.getHours() * 60 + ahora.getMinutes();
        
        const [horaIni, minIni] = this.preferencias.horaInicio.split(':').map(Number);
        const [horaFin, minFin] = this.preferencias.horaFin.split(':').map(Number);
        
        const minutosInicio = horaIni * 60 + minIni;
        const minutosFin = horaFin * 60 + minFin;
        
        return horaActual >= minutosInicio && horaActual <= minutosFin;
    }
    
    /**
     * Envía una notificación
     */
    async enviar(config) {
        const {
            tipo,
            titulo,
            mensaje,
            url = '/',
            imagen = null,
            prioridad = 'media',
            datos = {}
        } = config;
        
        // Verificar si se puede enviar
        if (!this.puedeEnviar(tipo)) {
            console.log(`❌ No se puede enviar notificación de tipo: ${tipo}`);
            return false;
        }
        
        // Registrar envío
        this.ultimasNotificaciones[tipo] = Date.now();
        this.guardarUltimasNotificaciones();
        
        // Configurar opciones según prioridad
        const opciones = {
            body: mensaje,
            icon: './Imagenes/logo/Logo.png',
            badge: './Imagenes/iconos/96x96/96x96.png',
            vibrate: prioridad === 'alta' ? [300, 100, 300] : [200, 100, 200],
            tag: `${tipo}-${Date.now()}`,
            requireInteraction: prioridad === 'alta',
            silent: prioridad === 'baja',
            data: {
                tipo,
                url,
                timestamp: Date.now(),
                prioridad,
                ...datos
            }
        };
        
        // Agregar imagen si se proporciona
        if (imagen) {
            opciones.image = imagen;
        }
        
        // Guardar en centro de notificaciones
        guardarNotificacion(titulo, mensaje, url);
        
        // Mostrar notificación
        try {
            const notificacion = new Notification(titulo, opciones);
            
            notificacion.onclick = function(event) {
                event.preventDefault();
                window.focus();
                if (url && url !== '/') {
                    window.location.href = url;
                }
                notificacion.close();
                
                // Registrar click (analytics)
                registrarEventoNotificacion('click', tipo);
            };
            
            // Auto-cerrar según prioridad
            const tiempoCierre = prioridad === 'alta' ? 15000 : (prioridad === 'media' ? 10000 : 5000);
            setTimeout(() => {
                notificacion.close();
            }, tiempoCierre);
            
            // Registrar envío (analytics)
            registrarEventoNotificacion('enviada', tipo);
            
            console.log(`✅ Notificación ${tipo} enviada:`, titulo);
            return true;
            
        } catch (error) {
            console.error('❌ Error al enviar notificación:', error);
            return false;
        }
    }
    
    /**
     * Programa una notificación para enviar después
     */
    programar(config, delay) {
        setTimeout(() => {
            this.enviar(config);
        }, delay);
        console.log(`📅 Notificación programada para dentro de ${delay}ms`);
    }
    
    /**
     * Envía múltiples notificaciones respetando intervalos
     */
    async enviarLote(notificaciones, intervalo = 5000) {
        for (const config of notificaciones) {
            await this.enviar(config);
            if (notificaciones.indexOf(config) < notificaciones.length - 1) {
                await new Promise(resolve => setTimeout(resolve, intervalo));
            }
        }
    }
}

// Instancia global del gestor
const gestorNotificaciones = new GestorNotificaciones();


/**
 * TEMPLATES DE NOTIFICACIONES PREDEFINIDOS
 */
const TEMPLATES_NOTIFICACIONES = {
    /**
     * Promoción de producto
     */
    promocionProducto: (nombreProducto, descuento) => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.PROMOCION,
        titulo: `🔥 ¡${descuento}% OFF en ${nombreProducto}!`,
        mensaje: `Aprovecha este descuento exclusivo. ¡Por tiempo limitado!`,
        url: '/index.html#productos',
        prioridad: 'media',
        datos: { producto: nombreProducto, descuento }
    }),
    
    /**
     * Lanzamiento de producto nuevo
     */
    nuevoProducto: (nombreProducto) => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.LANZAMIENTO,
        titulo: `🆕 ¡Nuevo! ${nombreProducto}`,
        mensaje: `Ya disponible en nuestro catálogo. ¡Sé el primero en probarlo!`,
        url: '/index.html#productos',
        prioridad: 'media',
        datos: { producto: nombreProducto }
    }),
    
    /**
     * Combo especial
     */
    comboEspecial: (nombreCombo, precio) => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.COMBO,
        titulo: `🎁 ${nombreCombo}`,
        mensaje: `Ahorra más con este combo por solo $${precio.toLocaleString()}. ¡Oferta especial!`,
        url: '/index.html#combos',
        prioridad: 'alta',
        datos: { combo: nombreCombo, precio }
    }),
    
    /**
     * Oferta flash
     */
    ofertaFlash: (duracion) => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.OFERTA_FLASH,
        titulo: `⚡ ¡FLASH SALE! ${duracion}`,
        mensaje: `Descuentos increíbles por tiempo limitado. ¡Aprovecha ahora!`,
        url: '/index.html#productos',
        prioridad: 'alta',
        datos: { duracion }
    }),
    
    /**
     * Carrito abandonado
     */
    carritoAbandonado: (cantidadItems) => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.CARRITO_ABANDONADO,
        titulo: `🛒 ¡No olvides tu carrito!`,
        mensaje: `Tienes ${cantidadItems} producto${cantidadItems > 1 ? 's' : ''} esperándote. ¡Completa tu compra!`,
        url: '/index.html#carrito',
        prioridad: 'media',
        datos: { cantidadItems }
    }),
    
    /**
     * Recordatorio de pedido
     */
    recordatorioPedido: () => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.RECORDATORIO,
        titulo: `💭 ¿Ya pensaste en tu pedido?`,
        mensaje: `Tenemos productos frescos esperándote. ¡Haz tu pedido hoy!`,
        url: '/index.html#productos',
        prioridad: 'baja',
        datos: {}
    }),
    
    /**
     * Envío gratis
     */
    envioGratis: () => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.PROMOCION,
        titulo: `🚚 ¡Envío GRATIS en todo Montelíbano!`,
        mensaje: `Hoy todos los pedidos tienen envío sin costo. ¡Aprovecha!`,
        url: '/index.html#productos',
        prioridad: 'alta',
        datos: { promocion: 'envio_gratis' }
    }),
    
    /**
     * Fin de semana especial
     */
    finDeSemana: () => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.PROMOCION,
        titulo: `🎉 ¡Ofertas de Fin de Semana!`,
        mensaje: `Descuentos especiales en productos seleccionados. ¡Solo hoy!`,
        url: '/index.html#productos',
        prioridad: 'media',
        datos: { evento: 'fin_de_semana' }
    }),
    
    /**
     * Actualización de la app
     */
    actualizacionApp: () => ({
        tipo: NOTIFICACIONES_CONFIG.tipos.ACTUALIZACION,
        titulo: `🔄 Nueva versión disponible`,
        mensaje: `Actualiza la app para disfrutar de nuevas funciones y mejoras.`,
        url: '/index.html',
        prioridad: 'baja',
        datos: { tipo_actualizacion: 'app' }
    })
};


/**
 * FUNCIONES PÚBLICAS PARA ENVIAR NOTIFICACIONES
 */

/**
 * Notifica sobre una promoción
 */
function notificarPromocion(nombreProducto, descuento) {
    const config = TEMPLATES_NOTIFICACIONES.promocionProducto(nombreProducto, descuento);
    return gestorNotificaciones.enviar(config);
}

/**
 * Notifica sobre un nuevo producto
 */
function notificarNuevoProducto(nombreProducto) {
    const config = TEMPLATES_NOTIFICACIONES.nuevoProducto(nombreProducto);
    return gestorNotificaciones.enviar(config);
}

/**
 * Notifica sobre un combo especial
 */
function notificarComboEspecial(nombreCombo, precio) {
    const config = TEMPLATES_NOTIFICACIONES.comboEspecial(nombreCombo, precio);
    return gestorNotificaciones.enviar(config);
}

/**
 * Notifica sobre oferta flash
 */
function notificarOfertaFlash(duracion = "2 horas") {
    const config = TEMPLATES_NOTIFICACIONES.ofertaFlash(duracion);
    return gestorNotificaciones.enviar(config);
}

/**
 * Notifica sobre carrito abandonado
 */
function notificarCarritoAbandonado() {
    const cantidadItems = carritoCompras.reduce((total, item) => total + item.cantidad, 0);
    if (cantidadItems > 0) {
        const config = TEMPLATES_NOTIFICACIONES.carritoAbandonado(cantidadItems);
        // Programar para 30 minutos después
        gestorNotificaciones.programar(config, 30 * 60 * 1000);
    }
}

/**
 * Notifica recordatorio general
 */
function notificarRecordatorio() {
    const config = TEMPLATES_NOTIFICACIONES.recordatorioPedido();
    return gestorNotificaciones.enviar(config);
}

/**
 * Notifica envío gratis
 */
function notificarEnvioGratis() {
    const config = TEMPLATES_NOTIFICACIONES.envioGratis();
    return gestorNotificaciones.enviar(config);
}

/**
 * Notifica ofertas de fin de semana
 */
function notificarFinDeSemana() {
    const config = TEMPLATES_NOTIFICACIONES.finDeSemana();
    return gestorNotificaciones.enviar(config);
}


/**
 * SISTEMA DE ANALYTICS PARA NOTIFICACIONES
 */
function registrarEventoNotificacion(evento, tipo) {
    try {
        const analytics = JSON.parse(localStorage.getItem('analytics_notificaciones') || '{}');
        
        if (!analytics[tipo]) {
            analytics[tipo] = {
                enviadas: 0,
                clicks: 0,
                tasa_click: 0
            };
        }
        
        if (evento === 'enviada') {
            analytics[tipo].enviadas++;
        } else if (evento === 'click') {
            analytics[tipo].clicks++;
        }
        
        // Calcular tasa de click
        if (analytics[tipo].enviadas > 0) {
            analytics[tipo].tasa_click = ((analytics[tipo].clicks / analytics[tipo].enviadas) * 100).toFixed(2);
        }
        
        localStorage.setItem('analytics_notificaciones', JSON.stringify(analytics));
    } catch (error) {
        console.error('Error al registrar evento:', error);
    }
}

/**
 * Obtiene estadísticas de notificaciones
 */
function obtenerEstadisticasNotificaciones() {
    try {
        return JSON.parse(localStorage.getItem('analytics_notificaciones') || '{}');
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        return {};
    }
}


/**
 * SISTEMA DE NOTIFICACIONES INTELIGENTES
 */

/**
 * Detecta carrito abandonado y programa notificación
 */
function inicializarDeteccionCarritoAbandonado() {
    let timeoutCarrito = null;
    
    // Observar cambios en el carrito
    const observer = new MutationObserver(() => {
        if (timeoutCarrito) clearTimeout(timeoutCarrito);
        
        if (carritoCompras.length > 0) {
            timeoutCarrito = setTimeout(() => {
                notificarCarritoAbandonado();
            }, 30 * 60 * 1000); // 30 minutos
        }
    });
    
    // Observar el carrito
    const carritoElement = document.getElementById('itemsCarrito');
    if (carritoElement) {
        observer.observe(carritoElement, {
            childList: true,
            subtree: true
        });
    }
}

/**
 * Programa notificaciones periódicas
 */
function programarNotificacionesPeriodicas() {
    // Verificar día de la semana para ofertas de fin de semana
    const verificarFinDeSemana = () => {
        const hoy = new Date().getDay();
        // 5 = Viernes, 6 = Sábado
        if (hoy === 5 || hoy === 6) {
            notificarFinDeSemana();
        }
    };
    
    // Verificar cada 6 horas
    setInterval(verificarFinDeSemana, 6 * 60 * 60 * 1000);
    verificarFinDeSemana(); // Verificar inmediatamente
}

/**
 * Inicializar sistema de notificaciones inteligentes
 */
function inicializarNotificacionesInteligentes() {
    if (Notification.permission === 'granted') {
        inicializarDeteccionCarritoAbandonado();
        programarNotificacionesPeriodicas();
        console.log('🤖 Sistema de notificaciones inteligentes activado');
    }
}


/**
 * PANEL DE CONFIGURACIÓN DE NOTIFICACIONES
 */
function mostrarConfiguracionNotificaciones() {
    const preferencias = gestorNotificaciones.preferencias;
    
    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="contenido-modal-instalacion" style="max-width: 600px;">
            <button class="cerrar-modal" onclick="this.parentElement.parentElement.remove()">✕</button>
            
            <h3 style="margin-bottom: 2rem;">⚙️ Configuración de Notificaciones</h3>
            
            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem;">📬 Tipos de notificaciones</h4>
                
                <label class="toggle-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem; background: rgba(241,248,255,0.7); border-radius: 8px;">
                    <span>🔥 Promociones y ofertas</span>
                    <label class="toggle-switch" aria-label="Promociones y ofertas">
                        <input type="checkbox" id="pref_promocion" ${preferencias.promocion ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </label>
                
                <label class="toggle-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem; background: rgba(241,248,255,0.7); border-radius: 8px;">
                    <span>🆕 Nuevos productos</span>
                    <label class="toggle-switch" aria-label="Nuevos productos">
                        <input type="checkbox" id="pref_lanzamiento" ${preferencias.lanzamiento ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </label>
                
                <label class="toggle-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem; background: rgba(241,248,255,0.7); border-radius: 8px;">
                    <span>🎁 Combos especiales</span>
                    <label class="toggle-switch" aria-label="Combos especiales">
                        <input type="checkbox" id="pref_combo" ${preferencias.combo ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </label>
                
                <label class="toggle-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem; background: rgba(241,248,255,0.7); border-radius: 8px;">
                    <span>⚡ Ofertas flash</span>
                    <label class="toggle-switch" aria-label="Ofertas flash">
                        <input type="checkbox" id="pref_oferta_flash" ${preferencias.oferta_flash ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </label>
                
                <label class="toggle-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem; background: rgba(241,248,255,0.7); border-radius: 8px;">
                    <span>🛒 Recordatorios de carrito</span>
                    <label class="toggle-switch" aria-label="Recordatorios de carrito">
                        <input type="checkbox" id="pref_carrito_abandonado" ${preferencias.carrito_abandonado ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </label>
                
                <label class="toggle-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem; background: rgba(241,248,255,0.7); border-radius: 8px;">
                    <span>💭 Recordatorios generales</span>
                    <label class="toggle-switch" aria-label="Recordatorios generales">
                        <input type="checkbox" id="pref_recordatorio" ${preferencias.recordatorio ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </label>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem;">⏰ Horario de notificaciones</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem;">Desde:</label>
                        <input type="time" id="pref_horaInicio" value="${preferencias.horaInicio}" 
                               style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ddd;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem;">Hasta:</label>
                        <input type="time" id="pref_horaFin" value="${preferencias.horaFin}" 
                               style="width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ddd;">
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <div style="padding: 1rem; background: linear-gradient(90deg,#ff6b6b,#e63946); border-radius: 8px; color: white; display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="font-size:1.2rem;">🔕</div>
                        <div style="font-weight:600;">Modo No Molestar</div>
                    </div>
                    <label class="toggle-switch" aria-label="Modo No Molestar">
                        <input type="checkbox" id="pref_noMolestar" ${preferencias.noMolestar ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button class="boton boton-primario" onclick="guardarConfiguracionNotificaciones()" style="flex: 1;">
                    💾 Guardar Configuración
                </button>
                <button class="boton" onclick="this.closest('.modal-instalacion').remove()" style="flex: 1; background: #6c757d;">
                    Cancelar
                </button>
            </div>
            
            <div style="margin-top: 2rem; padding: 1rem; background: var(--color-info); border-radius: 8px; opacity: 0.8;">
                <p style="margin: 0; font-size: 0.9rem;">
                    ℹ️ Tus preferencias se guardan localmente y solo afectan a este dispositivo.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

/**
 * Guarda la configuración de notificaciones
 */
function guardarConfiguracionNotificaciones() {
    const preferencias = {
        promocion: document.getElementById('pref_promocion').checked,
        lanzamiento: document.getElementById('pref_lanzamiento').checked,
        recordatorio: document.getElementById('pref_recordatorio').checked,
        combo: document.getElementById('pref_combo').checked,
        oferta_flash: document.getElementById('pref_oferta_flash').checked,
        carrito_abandonado: document.getElementById('pref_carrito_abandonado').checked,
        actualizacion: true,
        pedido: true,
        horaInicio: document.getElementById('pref_horaInicio').value,
        horaFin: document.getElementById('pref_horaFin').value,
        noMolestar: document.getElementById('pref_noMolestar').checked
    };
    
    gestorNotificaciones.guardarPreferencias(preferencias);
    mostrarNotificacion('✅ Configuración guardada correctamente');
    
    // Cerrar modal
    document.querySelector('.modal-instalacion').remove();
}


// ========================================
// INICIALIZACIÓN AL CARGAR
// ========================================

// Modificar la función inicializarNotificaciones existente
const inicializarNotificacionesOriginal = inicializarNotificaciones;

function inicializarNotificaciones() {
    // Llamar a la función original
    inicializarNotificacionesOriginal();
    
    // Agregar funcionalidad profesional
    if (Notification.permission === 'granted') {
        inicializarNotificacionesInteligentes();
    }
}

// Agregar botón de configuración al panel de notificaciones
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const accionesNotif = document.querySelector('.acciones-notificaciones');
        if (accionesNotif) {
            const btnConfig = document.createElement('button');
            btnConfig.className = 'btn-configurar-notificaciones';
            btnConfig.innerHTML = '⚙️ Configurar';
            btnConfig.onclick = mostrarConfiguracionNotificaciones;
            accionesNotif.appendChild(btnConfig);
        }
    }, 1000);
});


console.log('✅ Sistema profesional de notificaciones cargado');
console.log('📊 Funciones disponibles:');
console.log('  - notificarPromocion(producto, descuento)');
console.log('  - notificarNuevoProducto(producto)');
console.log('  - notificarComboEspecial(combo, precio)');
console.log('  - notificarOfertaFlash(duracion)');
console.log('  - notificarEnvioGratis()');
console.log('  - mostrarConfiguracionNotificaciones()');
console.log('  - obtenerEstadisticasNotificaciones()');

// ========================================
// INTEGRACIÓN DE WOMPI - FRONTEND
// Agregar al final de script.js
// ========================================

// === CONFIGURACIÓN WOMPI ===
const WOMPI_CONFIG = {
    // ⚠️ IMPORTANTE: Verifica que esta llave pública esté configurada correctamente
    // Debe comenzar con pub_test_ (pruebas) o pub_prod_ (producción)
    publicKey: 'pub_prod_oBaaR0X7Wr4IAHkaFEWbZU1orcnq9vNf',
    apiUrl: 'https://production.wompi.co/v1',
    // URL de tu backend serverless (Netlify Functions)
    backendUrl: '/.netlify/functions',
    moneda: 'COP'
};

// Validar configuración de Wompi al cargar
function validarConfiguracionWompi() {
    if (!WOMPI_CONFIG.publicKey || WOMPI_CONFIG.publicKey === 'TU_LLAVE_PUBLICA_AQUI') {
        console.error('❌ ERROR CRÍTICO: WOMPI_CONFIG.publicKey no está configurada');
        console.error('📝 Edita script.js línea ~3210 y agrega tu llave pública de Wompi');
        return false;
    }
    if (!WOMPI_CONFIG.publicKey.startsWith('pub_')) {
        console.error('❌ ERROR: La llave pública de Wompi debe comenzar con "pub_"');
        return false;
    }
    console.log('✅ Configuración de Wompi validada correctamente');
    return true;
}

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
    // Validar configuración antes de procesar
    if (!validarConfiguracionWompi()) {
        mostrarNotificacion('❌ Error de configuración. Contacta al administrador.', 'error');
        console.error('La aplicación no está configurada correctamente para procesar pagos');
        return;
    }

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
            
            try { 
                resultado = JSON.parse(text); 
            } catch { 
                console.error('Error parseando respuesta:', text);
                throw new Error(`Error del servidor: ${text.substring(0, 100)}`); 
            }

            if (!response.ok || !resultado.exito) {
                // Mostrar error detallado del servidor
                let mensajeError = resultado?.error || 'Error desconocido';
                
                // Si hay detalles, agregarlos
                if (resultado?.detalles && Array.isArray(resultado.detalles)) {
                    mensajeError += '\n\nDetalles:\n• ' + resultado.detalles.join('\n• ');
                }
                
                // Si hay ayuda, agregarla
                if (resultado?.ayuda) {
                    mensajeError += '\n\n' + resultado.ayuda;
                }
                
                console.error('Error del servidor:', resultado);
                throw new Error(mensajeError);
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
            console.error('❌ Error al procesar pago:', error);
            
            // Mostrar error de forma más amigable
            let mensajeUsuario = error.message;
            
            // Si el mensaje es muy largo, mostrarlo en consola y dar uno resumido
            if (mensajeUsuario.length > 300) {
                console.error('Mensaje de error completo:', mensajeUsuario);
                mensajeUsuario = 'Error al procesar el pago. Revisa la consola para más detalles o contacta al administrador.';
            }
            
            mostrarNotificacion(`❌ ${mensajeUsuario}`, 'error');
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
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]{10}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

console.log('✅ Integración de Wompi cargada correctamente');


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
    // Usar precio por kg del producto si existe, sino usar 15000 por defecto
    const precioKgDerivado = producto.precioPorKg || 15000;

    const modal = document.createElement('div');
    modal.className = 'modal-instalacion';
    modal.id = 'modalSimuladorPollo';
    modal.innerHTML = `
    <div class="contenido-modal-instalacion" style="max-width:720px;">
        <button class="cerrar-modal" onclick="cerrarSimuladorPollo()">✕</button>
        <h3>Simulador: Pollo Semicriollo Entero</h3>
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
            <input id="sim-precio-kg" type="number" min="0" step="10" value="${precioKgDerivado}" placeholder="Ej: 15000" style="padding:0.5rem; border-radius:0.4rem; border:1px solid var(--borde-claro);">
            <div class="simulador-ayuda">Precio por kg: ${precioKgDerivado.toLocaleString('es-CO')} COP/kg</div>
            </div>

            <div>
            <div class="simulador-result">
                <div>Producto: <strong>${producto.nombre}</strong></div>
                <div style="margin-top:0.5rem;">Peso elegido: <strong id="sim-peso-resumen">${pesoMedioKg ? pesoMedioKg.toFixed(2) : '2.70'} kg</strong></div>
                <div style="margin-top:0.5rem;">Precio/kg usado: <strong id="sim-precio-kg-resumen">${precioKgDerivado.toLocaleString('es-CO')} COP</strong></div>

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
    
    // Mostrar el banner y limpiar estilos inline que puedan ocultarlo
    banner.style.display = 'block';
    banner.style.height = 'auto';
    banner.style.maxHeight = 'none';
    banner.style.minHeight = 'auto';
    banner.style.overflow = 'visible';
    
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
    
    // Ocultar después de la animación y agregar clase al body
    setTimeout(() => {
        banner.style.display = 'none';
        banner.style.margin = '0';
        banner.style.padding = '0';
        banner.style.minHeight = '0';
        banner.style.maxHeight = '0';
        banner.style.height = '0';
        
        // Agregar clase al body para ajustar el espaciado del contenedor
        document.body.classList.add('banner-oculto');
    }, 600);
    
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
    
    const btnInstalar = document.querySelector('.btn-instalar-banner');
    
    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
        mostrarNotificacion('✅ La app ya está instalada', 'success');
        if (btnInstalar) {
            btnInstalar.innerHTML = '✅ App Instalada';
            btnInstalar.classList.add('instalada');
        }
        return;
    }
    
    // Verificar si hay prompt disponible
    if (!deferredPrompt) {
        console.warn('⚠️ Prompt de instalación no disponible');
        mostrarNotificacion('💡 Instala desde el menú de tu navegador (⋮ → Instalar app)', 'info');
        if (btnInstalar) {
            btnInstalar.classList.add('no-disponible');
        }
        return;
    }
    
    // Cambiar estado a "instalando"
    if (btnInstalar) {
        btnInstalar.innerHTML = '⏳ Instalando...';
        btnInstalar.classList.add('instalando');
    }
    
    // Ejecutar instalación
    if (typeof instalarPWA === 'function') {
        instalarPWA();
        
        // Esperar resultado
        setTimeout(() => {
            if (btnInstalar && !btnInstalar.classList.contains('instalada')) {
                btnInstalar.innerHTML = '📱 Instalar App';
                btnInstalar.classList.remove('instalando');
            }
        }, 3000);
    } else {
        console.warn('⚠️ Función instalarPWA() no encontrada');
        mostrarNotificacion('Para instalar la app, usa el menú de tu navegador', 'info');
        if (btnInstalar) {
            btnInstalar.innerHTML = '📱 Instalar App';
            btnInstalar.classList.remove('instalando');
        }
    }
    
    // Enviar evento personalizado
    dispatchEvent(new CustomEvent('bannerPromocionalInteraccion', {
        detail: {
            timestamp: new Date().toISOString(),
            accion: 'instalar_app',
            elemento: 'btn_instalar_banner'
        }
    }));
    
    // NO cerrar el banner inmediatamente - dejar que el usuario vea el resultado
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
        banner.style.height = 'auto';
        banner.style.maxHeight = 'none';
        banner.style.minHeight = 'auto';
        banner.style.margin = '';
        banner.style.padding = '';
        banner.style.overflow = 'visible';
        document.body.classList.remove('banner-oculto');
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
 * Inicializar la sección de beneficios cuando el DOM esté listo
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
        this.track = document.getElementById('resenasTrack');
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
     * Convertir timestamp de Firebase a objeto Date de forma segura
     * Maneja: Firestore Timestamp, objetos Date, strings ISO, números timestamp, null/undefined
     */
    convertirFechaSegura(fechaFirebase) {
        try {
            // Si es null o undefined, retornar fecha actual
            if (!fechaFirebase) {
                return new Date();
            }

            // Si ya es un objeto Date válido
            if (fechaFirebase instanceof Date && !isNaN(fechaFirebase.getTime())) {
                return fechaFirebase;
            }

            // Si es un Firestore Timestamp (tiene propiedad seconds o _seconds)
            if (fechaFirebase.seconds !== undefined || fechaFirebase._seconds !== undefined) {
                const seconds = fechaFirebase.seconds || fechaFirebase._seconds;
                const timestamp = seconds * 1000;
                const fecha = new Date(timestamp);
                
                // Validar que el timestamp genera una fecha válida
                if (!isNaN(fecha.getTime())) {
                    return fecha;
                }
            }

            // Si es un número (timestamp en milisegundos)
            if (typeof fechaFirebase === 'number') {
                const fecha = new Date(fechaFirebase);
                if (!isNaN(fecha.getTime())) {
                    return fecha;
                }
            }

            // Si es un string (ISO date)
            if (typeof fechaFirebase === 'string') {
                const fecha = new Date(fechaFirebase);
                if (!isNaN(fecha.getTime())) {
                    return fecha;
                }
            }

            // Si nada funcionó, retornar fecha actual
            console.warn('⚠️ Fecha inválida detectada, usando fecha actual:', fechaFirebase);
            return new Date();

        } catch (error) {
            console.error('❌ Error convirtiendo fecha:', error, fechaFirebase);
            return new Date();
        }
    }

    /**
     * Formatear fecha de forma segura para mostrar al usuario
     */
    formatearFecha(fecha, locale = 'es-CO') {
        try {
            const fechaValida = this.convertirFechaSegura(fecha);
            return fechaValida.toLocaleDateString(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error('❌ Error formateando fecha:', error);
            return 'Fecha no disponible';
        }
    }

    /**
     * Convertir fecha a ISO String de forma segura
     */
    formatearFechaISO(fecha) {
        try {
            const fechaValida = this.convertirFechaSegura(fecha);
            return fechaValida.toISOString();
        } catch (error) {
            console.error('❌ Error generando ISO String:', error);
            return new Date().toISOString();
        }
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
     * Configurar listener para cambios de conectividad
     */
    setupOnlineListener() {
        window.addEventListener('online', async () => {
            console.log('🌐 Conexión restaurada, sincronizando reseñas pendientes...');
            await this.syncPendingReviews();
        });
        
        window.addEventListener('offline', () => {
            console.log('📡 Sin conexión. Las reseñas se guardarán localmente.');
        });
    }

    /**
     * Obtener referencias a elementos del DOM
     */
    getElements() {
        this.elementos = {
            // Carrusel
            track: document.getElementById('resenasTrack'),
            btnPrev: document.getElementById('btnPrevResenas'), // Corregido
            btnNext: document.getElementById('btnNextResenas'), // Corregido
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
            
            // Schema JSON-LD (opcional)
            schemaScript: document.getElementById('schemaResenas')
        };
        
        // Verificar elementos críticos
        const elementosCriticos = ['track', 'form', 'btnEnviar'];
        const faltantes = elementosCriticos.filter(key => !this.elementos[key]);
        
        if (faltantes.length > 0) {
            console.warn(`⚠️ Elementos críticos no encontrados: ${faltantes.join(', ')}`);
            throw new Error(`Elementos críticos no encontrados: ${faltantes.join(', ')}`);
        }
        
        // Advertir sobre elementos opcionales faltantes
        if (!this.elementos.schemaScript) {
            console.log('ℹ️ Elemento opcional schemaScript no encontrado');
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
     * Estado de carga
     */
    setLoadingState(isLoading) {
        this.isLoading = isLoading;
        
        if (this.elementos.track) {
            if (isLoading) {
                this.elementos.track.innerHTML = `
                    <div class="loading-reviews">
                        <div class="spinner"></div>
                        <p>Cargando reseñas...</p>
                    </div>
                `;
            }
        }
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
                productoInfo = `
                    <div class="resena-producto-tag">
                        <span class="producto-emoji">${producto.emoji}</span>
                        <span class="producto-nombre">${producto.nombre}</span>
                    </div>`;
            }
        }
        
        // Fecha formateada usando función segura
        const fechaFormateada = this.formatearFecha(resena.createdAt);
        
        // Calcular hace cuánto tiempo
        const tiempoAtras = this.calcularTiempoAtras(resena.createdAt);
        
        card.innerHTML = `
            <div class="resena-decoracion-top"></div>
            
            <div class="resena-header">
                <div class="resena-avatar-wrapper">
                    <div class="resena-avatar">${iniciales}</div>
                    <div class="avatar-badge-verificado">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    </div>
                </div>
                <div class="resena-info">
                    <h4 class="resena-nombre">${this.sanitizeHTML(resena.nombre)}</h4>
                    <div class="resena-metadata">
                        <span class="resena-tiempo">${tiempoAtras}</span>
                        <span class="metadata-separator">•</span>
                        <span class="resena-fecha-corta">${fechaFormateada}</span>
                    </div>
                </div>
            </div>
            
            <div class="resena-rating-wrapper">
                <div class="resena-rating">
                    ${this.generateStars(resena.rating)}
                </div>
                <div class="rating-numero-badge">${resena.rating}.0</div>
            </div>
            
            <div class="resena-texto-wrapper">
                <p class="resena-texto">"${this.sanitizeHTML(resena.texto)}"</p>
            </div>
            
            ${productoInfo}
            
            <div class="resena-acciones">
                <button class="accion-util" title="Útil">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span>Útil</span>
                </button>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Calcular tiempo transcurrido
     */
    calcularTiempoAtras(fecha) {
        const ahora = new Date();
        const fechaResena = fecha?.toDate ? fecha.toDate() : new Date(fecha);
        const diff = Math.floor((ahora - fechaResena) / 1000);
        
        if (diff < 60) return 'Hace un momento';
        if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
        if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
        if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;
        if (diff < 2592000) return `Hace ${Math.floor(diff / 604800)} semanas`;
        return `Hace ${Math.floor(diff / 2592000)} meses`;
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
        // Verificar que el elemento exista antes de actualizar
        if (!this.elementos.schemaScript) {
            console.log('ℹ️ Elemento schemaScript no encontrado, omitiendo actualización de schema');
            return;
        }
        
        try {
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
                    "datePublished": this.formatearFechaISO(resena.createdAt)
                }))
            };
            
            this.elementos.schemaScript.textContent = JSON.stringify(schema, null, 2);
        } catch (error) {
            console.warn('⚠️ Error actualizando schema:', error);
        }
    }

    /**
     * Crear indicadores del carrusel
     */
    createIndicators() {
        if (!this.elementos.indicadores || this.resenas.length === 0) return;
        
        this.elementos.indicadores.innerHTML = '';
        
        this.resenas.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Ver reseña ${index + 1}`);
            dot.onclick = () => this.showReview(index);
            
            if (index === this.currentIndex) {
                dot.classList.add('active');
            }
            
            this.elementos.indicadores.appendChild(dot);
        });
    }

    /**
     * Mostrar una reseña específica
     */
    showReview(index) {
        if (!this.elementos.track || this.resenas.length === 0) return;
        
        // Asegurar que el índice esté en rango
        if (index < 0) index = this.resenas.length - 1;
        if (index >= this.resenas.length) index = 0;
        
        this.currentIndex = index;
        
        // Hacer scroll a la tarjeta específica
        const cards = this.elementos.track.querySelectorAll('.resena-card');
        if (cards[index]) {
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        
        // Actualizar indicadores
        const dots = this.elementos.indicadores?.querySelectorAll('.carousel-dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Actualizar controles
        this.updateCarouselControls();
    }

    /**
     * Actualizar estado de controles del carrusel
     */
    updateCarouselControls() {
        if (!this.elementos.btnPrev || !this.elementos.btnNext) return;
        
        const hasReviews = this.resenas.length > 0;
        const hasManyReviews = this.resenas.length > 1;
        
        // Habilitar/deshabilitar botones
        this.elementos.btnPrev.disabled = !hasManyReviews;
        this.elementos.btnNext.disabled = !hasManyReviews;
        
        // Actualizar visibilidad de indicadores
        if (this.elementos.indicadores) {
            this.elementos.indicadores.style.display = hasManyReviews ? 'flex' : 'none';
        }
    }

    /**
     * Navegar a la reseña anterior
     */
    previousReview() {
        this.showReview(this.currentIndex - 1);
    }

    /**
     * Navegar a la siguiente reseña
     */
    nextReview() {
        this.showReview(this.currentIndex + 1);
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
                // Determinar estado basado en si fue publicada o va a moderación
                const status = response.published ? 'published' : 'moderation';
                this.updateReviewStatus(resenaData.timestamp, status, response.id);
                
                // Mensaje personalizado según el estado
                const mensaje = response.published 
                    ? '¡Gracias por tu reseña! Se ha publicado correctamente.' 
                    : '¡Gracias por tu reseña! Se publicará después de la revisión. Puedes verla arriba mientras esperas.';
                
                this.showSuccess(mensaje);
                this.resetForm();
                
                // Analytics
                this.trackEvent('review_submit', {
                    rating: resenaData.rating,
                    has_product: !!resenaData.productoId,
                    text_length: resenaData.texto.length,
                    auto_published: response.published // Nuevo: rastrear auto-aprobación
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
                        'pending': '⏳ Enviando...',
                        'offline': '📡 Pendiente (sin conexión)',
                        'published': '✅ Publicado',
                        'moderation': '⏳ En revisión'
                    };
                    estadoElement.textContent = estados[status] || '✅ Publicado';
                    estadoElement.className = `resena-estado ${status}`;
                }
            }
        }
    }

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
        
        // Reset del formulario HTML
        this.elementos.form.reset();
        
        // Desmarcar todos los radio buttons de rating manualmente
        const ratingInputs = this.elementos.ratingSelector.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => {
            input.checked = false;
        });
        
        // Resetear contador de caracteres
        if (this.elementos.contadorCaracteres) {
            this.elementos.contadorCaracteres.textContent = '0';
        }
        
        // Limpiar errores
        this.clearAllErrors();
        
        // Resetear estrellas visuales
        this.resetStarHighlight();
        
        // Remover clases activas de las estrellas
        const estrellas = this.elementos.ratingSelector.querySelectorAll('.estrella');
        estrellas.forEach(estrella => {
            estrella.classList.remove('active');
        });
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
            // Verificar si window.AlimentoDelCielo está disponible
            if (typeof window.AlimentoDelCielo !== 'undefined' && 
                window.AlimentoDelCielo.analytics && 
                typeof window.AlimentoDelCielo.analytics.track === 'function') {
                window.AlimentoDelCielo.analytics.track(eventName, parameters);
            } else {
                // Fallback: usar gtag directamente si está disponible
                if (typeof gtag !== 'undefined') {
                    gtag('event', eventName, {
                        custom_parameter: parameters,
                        ...parameters
                    });
                }
                
                console.log(`📊 Analytics: ${eventName}`, parameters);
            }
            
        } catch (error) {
            console.warn('⚠️ Error enviando evento de analytics:', error);
        }
    }

    /**
     * Obtener reseñas públicas desde Netlify Functions
     */
    async obtenerResenasPublicas() {
        try {
            const response = await fetch('/.netlify/functions/getReviews?stats=true&limit=50', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const text = await response.text();
            let data = {};
            try { data = text ? JSON.parse(text) : {}; } catch (_) {}

            if (!response.ok) {
                const msg = data.message || data.error || `HTTP ${response.status}`;
                throw new Error(msg);
            }

            // Guardar copia local para fallback
            try {
                localStorage.setItem('ultima_lista_resenas', JSON.stringify({
                    reviews: data.reviews || [],
                    timestamp: Date.now()
                }));
            } catch (_) {}

            return {
                ok: true,
                reviews: data.reviews || [],
                total: data.totalCount || data.total || (data.reviews?.length ?? 0)
            };

        } catch (error) {
            console.error('Error obteniendo reseñas:', error);
            // Fallback: usar última lista guardada si existe
            try {
                const cache = JSON.parse(localStorage.getItem('ultima_lista_resenas') || 'null');
                if (cache && Array.isArray(cache.reviews) && cache.reviews.length > 0) {
                    console.warn('Usando reseñas cacheadas en localStorage como fallback');
                    return { ok: true, reviews: cache.reviews, total: cache.reviews.length, cached: true };
                }
            } catch (_) {}
            return {
                ok: false,
                error: error.message,
                reviews: []
            };
        }
    }

    /**
     * Enviar reseña al servidor
     */
    async enviarResenaAlServidor(resenaData) {
        try {
            const response = await fetch('/.netlify/functions/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: resenaData.nombre,
                    texto: resenaData.texto, // Corregido: texto en lugar de comentario
                    rating: resenaData.rating, // Corregido: rating en lugar de calificacion
                    productoId: resenaData.productoId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            return {
                ok: true,
                id: data.id || data.reviewId,
                message: data.message || 'Reseña enviada correctamente'
            };

        } catch (error) {
            console.error('Error enviando reseña:', error);
            return {
                ok: false,
                error: error.message
            };
        }
    }

    /**
     * Guardar reseña para envío offline
     */
    async saveForOffline(resenaData) {
        if (!this.db) {
            console.warn('IndexedDB no disponible, usando localStorage');
            this.saveToLocalStorage(resenaData);
            return;
        }

        try {
            const transaction = this.db.transaction(['pendingReviews'], 'readwrite');
            const objectStore = transaction.objectStore('pendingReviews');
            
            const reviewToSave = {
                nombre: resenaData.nombre,
                comentario: resenaData.texto,
                calificacion: resenaData.rating,
                productoId: resenaData.productoId,
                fecha: new Date(resenaData.timestamp).toISOString(),
                timestamp: resenaData.timestamp,
                status: 'pending'
            };

            objectStore.add(reviewToSave);
            
            console.log('📦 Reseña guardada para envío offline');

        } catch (error) {
            console.error('Error guardando reseña offline:', error);
            this.saveToLocalStorage(resenaData);
        }
    }

    /**
     * Guardar en localStorage como fallback
     */
    saveToLocalStorage(resenaData) {
        try {
            const key = 'pendingReviews';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            existing.push({
                ...resenaData,
                comentario: resenaData.texto,
                calificacion: resenaData.rating,
                fecha: new Date(resenaData.timestamp).toISOString()
            });
            localStorage.setItem(key, JSON.stringify(existing));
            console.log('💾 Reseña guardada en localStorage');
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
        }
    }

    /**
     * Sincronizar reseñas pendientes con el servidor
     * Se ejecuta cuando hay conexión para enviar reseñas guardadas offline
     */
    async syncPendingReviews() {
        try {
            // Verificar si hay conexión
            if (!navigator.onLine) {
                console.log('📡 Sin conexión. Sincronización pendiente.');
                return;
            }

            // Obtener reseñas pendientes de IndexedDB
            const transaction = this.db.transaction(['pendingReviews'], 'readonly');
            const objectStore = transaction.objectStore('pendingReviews');
            const request = objectStore.getAll();

            request.onsuccess = async () => {
                const pendingReviews = request.result;
                
                if (pendingReviews.length === 0) {
                    console.log('✅ No hay reseñas pendientes de sincronizar');
                    return;
                }

                console.log(`🔄 Sincronizando ${pendingReviews.length} reseñas pendientes...`);

                // Intentar enviar cada reseña pendiente
                for (const review of pendingReviews) {
                    try {
                        // Intentar enviar al servidor
                        const response = await fetch('/.netlify/functions/reviews', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nombre: review.nombre,
                                texto: review.comentario || review.texto, // Corregido: texto
                                rating: review.calificacion || review.rating, // Corregido: rating
                                productoId: review.productoId
                            })
                        });

                        if (response.ok) {
                            // Si se envió exitosamente, eliminar de pendientes
                            const deleteTransaction = this.db.transaction(['pendingReviews'], 'readwrite');
                            const deleteStore = deleteTransaction.objectStore('pendingReviews');
                            deleteStore.delete(review.id);
                            
                            console.log(`✅ Reseña ${review.id} sincronizada exitosamente`);
                        } else {
                            console.warn(`⚠️ Error al sincronizar reseña ${review.id}:`, response.statusText);
                        }
                    } catch (error) {
                        console.warn(`⚠️ Error al enviar reseña ${review.id}:`, error);
                        // Mantener en pendientes para próximo intento
                    }
                }

                // Actualizar contador de pendientes
                this.updatePendingCount();
                
                console.log('✅ Sincronización completada');
            };

            request.onerror = () => {
                console.error('❌ Error al obtener reseñas pendientes:', request.error);
            };

        } catch (error) {
            console.error('❌ Error en sincronización de reseñas:', error);
        }
    }

    /**
     * Actualizar contador de reseñas pendientes en la UI
     */
    async updatePendingCount() {
        try {
            const transaction = this.db.transaction(['pendingReviews'], 'readonly');
            const objectStore = transaction.objectStore('pendingReviews');
            const countRequest = objectStore.count();

            countRequest.onsuccess = () => {
                const count = countRequest.result;
                
                // Actualizar badge si existe
                const badge = document.querySelector('.pending-reviews-badge');
                if (badge) {
                    if (count > 0) {
                        badge.textContent = count;
                        badge.style.display = 'inline-block';
                    } else {
                        badge.style.display = 'none';
                    }
                }
            };
        } catch (error) {
            console.error('Error actualizando contador de pendientes:', error);
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

// === GESTIÓN DEL BOTÓN FLOTANTE DE WHATSAPP ===

/**
 * Inicializa el botón flotante de WhatsApp
 * Gestiona el badge de notificación y el tracking de interacciones
 */
function inicializarBotonWhatsApp() {
    const btnWhatsApp = document.getElementById('btnWhatsAppFlotante');
    const badge = document.getElementById('badgeWhatsapp');
    
    if (!btnWhatsApp) {
        console.warn('⚠️ Botón de WhatsApp no encontrado');
        return;
    }
    
    // Verificar si el usuario ya interactuó con WhatsApp
    const whatsappClicked = localStorage.getItem('whatsapp_clicked');
    
    // Ocultar el badge si ya fue clickeado
    if (whatsappClicked === 'true' && badge) {
        badge.style.display = 'none';
    }
    
    // Evento al hacer clic en el botón
    btnWhatsApp.addEventListener('click', function() {
        // Ocultar el badge permanentemente
        if (badge) {
            badge.style.display = 'none';
            localStorage.setItem('whatsapp_clicked', 'true');
        }
        
        // Tracking de analytics (si está disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': 'Botón Flotante',
                'value': 1
            });
        }
        
        // Log para debugging
        console.log('📱 Usuario contactó vía WhatsApp');
    });
    
    // Efecto de entrada con retraso (aparece suavemente después de 2 segundos)
    setTimeout(() => {
        btnWhatsApp.style.opacity = '0';
        btnWhatsApp.style.visibility = 'visible';
        btnWhatsApp.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        requestAnimationFrame(() => {
            btnWhatsApp.style.opacity = '1';
        });
    }, 2000);
    
    // Mostrar mensaje tooltip después de 5 segundos (solo la primera vez)
    const tooltipMostrado = localStorage.getItem('whatsapp_tooltip_shown');
    if (!tooltipMostrado && !whatsappClicked) {
        setTimeout(() => {
            mostrarTooltipWhatsApp();
            localStorage.setItem('whatsapp_tooltip_shown', 'true');
        }, 5000);
    }
}

/**
 * Muestra un tooltip temporal sobre el botón de WhatsApp
 */
function mostrarTooltipWhatsApp() {
    const btnWhatsApp = document.getElementById('btnWhatsAppFlotante');
    if (!btnWhatsApp) return;
    
    // Crear tooltip dinámicamente
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-whatsapp';
    tooltip.innerHTML = `
        <div class="tooltip-whatsapp-contenido">
            💬 ¿Necesitas ayuda? Chatea con nosotros
            <button class="tooltip-whatsapp-cerrar" onclick="cerrarTooltipWhatsApp()">✕</button>
        </div>
    `;
    
    // Insertar en el body
    document.body.appendChild(tooltip);
    
    // Animar entrada
    setTimeout(() => {
        tooltip.classList.add('mostrar');
    }, 100);
    
    // Auto-ocultar después de 8 segundos
    setTimeout(() => {
        cerrarTooltipWhatsApp();
    }, 8000);
}

/**
 * Cierra el tooltip de WhatsApp
 */
function cerrarTooltipWhatsApp() {
    const tooltip = document.querySelector('.tooltip-whatsapp');
    if (tooltip) {
        tooltip.classList.remove('mostrar');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}

/**
 * Actualiza el contador del badge (útil para notificaciones)
 * @param {number} cantidad - Número a mostrar en el badge (0 para ocultar)
 */
function actualizarBadgeWhatsApp(cantidad) {
    const badge = document.getElementById('badgeWhatsapp');
    if (!badge) return;
    
    if (cantidad > 0) {
        badge.textContent = cantidad > 9 ? '9+' : cantidad;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Exponer funciones globalmente para uso externo
window.actualizarBadgeWhatsApp = actualizarBadgeWhatsApp;
window.cerrarTooltipWhatsApp = cerrarTooltipWhatsApp;

// === LISTENER PARA MENSAJES DEL SERVICE WORKER ===
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'GUARDAR_NOTIFICACION') {
            const { titulo, mensaje, url } = event.data.data;
            guardarNotificacion(titulo, mensaje, url);
            console.log('📬 Notificación guardada desde Service Worker:', titulo);
        }
    });
}

// ========================================
// MODAL DE DETALLES DEL PRODUCTO
// ========================================

let productoModalActual = null;
let cantidadModal = 1;

// Abrir modal del producto
function abrirModalProducto(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;
    
    productoModalActual = producto;
    cantidadModal = 1;
    
    const modal = document.getElementById('modalProducto');
    const modalImagen = document.getElementById('modalImagen');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalPrecio = document.getElementById('modalPrecio');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalEtiqueta = document.getElementById('modalEtiqueta');
    const modalMeta = document.getElementById('modalMeta');
    const modalPopularidad = document.getElementById('modalPopularidad');
    const modalCantidad = document.getElementById('modalCantidad');
    
    // Actualizar imagen
    if (producto.imagen) {
        modalImagen.src = producto.imagen;
        modalImagen.alt = producto.nombre;
        modalImagen.style.display = 'block';
    } else {
        modalImagen.style.display = 'none';
    }
    
    // Actualizar etiqueta
    if (producto.etiqueta) {
        modalEtiqueta.textContent = producto.etiqueta;
        modalEtiqueta.className = `modal-etiqueta ${producto.tipoEtiqueta}`;
        modalEtiqueta.style.display = 'block';
    } else {
        modalEtiqueta.style.display = 'none';
    }
    
    // Actualizar contenido
    modalTitulo.textContent = producto.nombre;
    modalPrecio.textContent = producto.precio.toLocaleString('es-CO');
    modalDescripcion.textContent = producto.descripcion;
    modalCantidad.textContent = cantidadModal;
    
    // Meta información
    let metaHTML = '';
    if (producto.unidadMedida) {
        metaHTML += `<span class="modal-badge">📏 ${producto.unidadMedida}</span>`;
    }
    if (producto.pesoAproximado) {
        metaHTML += `<span class="modal-badge">⚖️ ${producto.pesoAproximado}</span>`;
    }
    modalMeta.innerHTML = metaHTML;
    
    // Popularidad
    const datos = datosPopularidad[producto.id];
    if (datos) {
        modalPopularidad.innerHTML = `
            <div class="modal-stat">
                <span>📦</span>
                <span>${datos.ventas} ventas</span>
            </div>
            <div class="modal-stat">
                <span>⭐</span>
                <span>${datos.valoracion}</span>
            </div>
        `;
    } else {
        modalPopularidad.innerHTML = '';
    }
    
    // Mostrar modal
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden';
    
    // Agregar listener para cerrar con ESC
    document.addEventListener('keydown', cerrarModalConEsc);
    
    // Cargar reseñas del producto
    cargarResenasProducto(idProducto);
}

// Cerrar modal
function cerrarModalProducto() {
    const modal = document.getElementById('modalProducto');
    modal.classList.remove('activo');
    document.body.style.overflow = '';
    productoModalActual = null;
    cantidadModal = 1;
    
    // Remover listener
    document.removeEventListener('keydown', cerrarModalConEsc);
}

// Cerrar con tecla ESC
function cerrarModalConEsc(e) {
    if (e.key === 'Escape') {
        cerrarModalProducto();
    }
}

// Cambiar cantidad en el modal
function cambiarCantidadModal(delta) {
    cantidadModal = Math.max(1, cantidadModal + delta);
    document.getElementById('modalCantidad').textContent = cantidadModal;
}

// Agregar al carrito desde el modal
function agregarDesdeModal() {
    if (!productoModalActual) return;
    
    const itemExistente = carritoCompras.find(item => item.id === productoModalActual.id);
    
    if (itemExistente) {
        itemExistente.cantidad += cantidadModal;
    } else {
        carritoCompras.push({ ...productoModalActual, cantidad: cantidadModal });
    }
    
    guardarCarrito();
    actualizarCarrito();
    
    const mensaje = cantidadModal > 1 
        ? `✅ ${cantidadModal} x ${productoModalActual.nombre} agregados al carrito`
        : `✅ ${productoModalActual.nombre} agregado al carrito`;
    
    mostrarNotificacion(mensaje);
    
    // Cerrar modal después de agregar
    setTimeout(() => {
        cerrarModalProducto();
    }, 500);
}

// Comprar por WhatsApp desde el modal
function comprarWhatsAppModal() {
    if (!productoModalActual) return;
    
    const producto = productoModalActual;
    const cantidad = cantidadModal;
    const precioTotal = producto.precio * cantidad;
    
    let mensaje = `¡Hola! 👋 Estoy interesado en:\n\n`;
    mensaje += `🛒 *${producto.nombre}*\n`;
    mensaje += `📦 Cantidad: ${cantidad}\n`;
    mensaje += `💰 Precio unitario: $${producto.precio.toLocaleString('es-CO')}\n`;
    mensaje += `💵 Total: $${precioTotal.toLocaleString('es-CO')}\n\n`;
    
    if (producto.pesoAproximado) {
        mensaje += `⚖️ ${producto.pesoAproximado}\n\n`;
    }
    
    mensaje += `¿Está disponible? 😊`;
    
    const url = `https://wa.me/573209319916?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    cerrarModalProducto();
}

// Ver productos similares desde el modal
function verProductosSimilares() {
    if (!productoModalActual) return;
    
    const categoria = productoModalActual.categoria;
    
    // Cerrar el modal primero
    cerrarModalProducto();
    
    // Esperar a que se cierre el modal y luego filtrar
    setTimeout(() => {
        // Buscar el botón de filtro correspondiente a la categoría
        const botones = document.querySelectorAll('.btn-filtro');
        let botonCategoria = null;
        
        botones.forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes(`'${categoria}'`)) {
                botonCategoria = btn;
            }
        });
        
        // Si se encuentra el botón, simular el filtrado
        if (botonCategoria) {
            filtrarPorCategoria(categoria, botonCategoria);
            scrollearAProductos();
            mostrarNotificacion(`Mostrando productos de: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`, 'info');
        } else {
            // Si no se encuentra el botón, filtrar directamente
            filtroActual = categoria;
            renderizarProductos();
            scrollearAProductos();
            mostrarNotificacion(`Mostrando productos de: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`, 'info');
        }
    }, 300);
}

// ===== SISTEMA DE RESEÑAS EN MODAL DE PRODUCTO =====

let ratingModalSeleccionado = 0;

/**
 * Cargar reseñas específicas de un producto
 */
async function cargarResenasProducto(productoId) {
    const listContainer = document.getElementById('modalResenasList');
    const statsContainer = document.getElementById('modalResenasStats');
    
    if (!listContainer || !statsContainer) return;
    
    try {
        // Obtener reseñas del producto desde el sistema existente
        const resenasProducto = await obtenerResenasProducto(productoId);
        
        // Actualizar estadísticas
        actualizarStatsModalResenas(resenasProducto);
        
        // Renderizar lista de reseñas
        renderizarResenasModal(resenasProducto, listContainer);
        
    } catch (error) {
        console.error('Error cargando reseñas del producto:', error);
        mostrarPlaceholderResenasModal(listContainer);
    }
}

/**
 * Obtener reseñas filtradas por producto
 */
async function obtenerResenasProducto(productoId) {
    // Usar el sistema de reseñas existente
    if (typeof reviewsManager !== 'undefined' && reviewsManager.resenas) {
        return reviewsManager.resenas.filter(r => r.productoId == productoId);
    }
    return [];
}

/**
 * Actualizar estadísticas en el modal
 */
function actualizarStatsModalResenas(resenas) {
    const statRating = document.getElementById('modalStatRating');
    const statEstrellas = document.getElementById('modalStatEstrellas');
    const statTotal = document.getElementById('modalStatTotal');
    
    if (!resenas || resenas.length === 0) {
        statRating.textContent = '0.0';
        statEstrellas.innerHTML = '';
        statTotal.textContent = '0 reseñas';
        return;
    }
    
    const promedio = resenas.reduce((sum, r) => sum + r.rating, 0) / resenas.length;
    const promedioRedondeado = Math.round(promedio);
    
    statRating.textContent = promedio.toFixed(1);
    statEstrellas.innerHTML = generarEstrellasHTML(promedioRedondeado);
    statTotal.textContent = `${resenas.length} ${resenas.length === 1 ? 'reseña' : 'reseñas'}`;
}

/**
 * Generar HTML de estrellas
 */
function generarEstrellasHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span style="color: ${i <= rating ? '#fbbf24' : '#d1d5db'}">★</span>`;
    }
    return html;
}

/**
 * Renderizar reseñas en el modal
 */
function renderizarResenasModal(resenas, container) {
    if (!resenas || resenas.length === 0) {
        mostrarPlaceholderResenasModal(container);
        return;
    }
    
    container.innerHTML = resenas.map(resena => {
        const iniciales = resena.nombre.split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        
        const fechaFormateada = formatearFechaResena(resena.createdAt);
        
        return `
            <div class="resena-card-mini">
                <div class="resena-card-mini-header">
                    <div class="resena-mini-autor">
                        <div class="resena-mini-avatar">${iniciales}</div>
                        <div class="resena-mini-info">
                            <h5>${sanitizeHTML(resena.nombre)}</h5>
                            <p class="resena-mini-fecha">${fechaFormateada}</p>
                        </div>
                    </div>
                    <div class="resena-mini-rating">
                        ${generarEstrellasHTML(resena.rating)}
                    </div>
                </div>
                <p class="resena-mini-texto">"${sanitizeHTML(resena.texto)}"</p>
            </div>
        `;
    }).join('');
}

/**
 * Mostrar placeholder cuando no hay reseñas
 */
function mostrarPlaceholderResenasModal(container) {
    container.innerHTML = `
        <div class="resenas-placeholder-mini">
            <span class="placeholder-icono-mini">💭</span>
            <p>Aún no hay opiniones para este producto.<br>¡Sé el primero en compartir tu experiencia!</p>
        </div>
    `;
}

/**
 * Formatear fecha para reseña
 */
function formatearFechaResena(fecha) {
    if (!fecha) return 'Reciente';
    
    const fechaObj = fecha?.toDate ? fecha.toDate() : new Date(fecha);
    const ahora = new Date();
    const diff = Math.floor((ahora - fechaObj) / 1000);
    
    if (diff < 60) return 'Hace un momento';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;
    
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    return fechaObj.toLocaleDateString('es-ES', opciones);
}

/**
 * Sanitizar HTML para prevenir XSS
 */
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Cambiar entre tabs de reseñas
 */
function cambiarTabResenas(tab) {
    const tabs = document.querySelectorAll('.resenas-tab');
    const contents = document.querySelectorAll('.modal-resenas-tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(tab === 'lista' ? 'tabListaResenas' : 'tabFormularioResena').classList.add('active');
}

/**
 * Seleccionar rating en el modal
 */
function seleccionarRatingModal(rating) {
    ratingModalSeleccionado = rating;
    document.getElementById('modalResenaRating').value = rating;
    
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((star) => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

/**
 * Contador de caracteres en textarea
 */
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('modalResenaTexto');
    const counter = document.getElementById('modalCharCounter');
    
    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.textContent = `${length}/300`;
            
            if (length > 280) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#94a3b8';
            }
        });
    }
});

/**
 * Clase para manejar el sistema de reseñas
 */
class ReviewsManager {
    constructor() {
        this.resenas = [];
        this.apiUrl = '/.netlify/functions/reviews';
    }
    
    async init() {
        try {
            await this.loadReviews();
            console.log('✅ Sistema de reseñas inicializado correctamente');
        } catch (error) {
            console.warn('⚠️ No se pudieron cargar reseñas:', error);
        }
    }
    
    async loadReviews() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                const data = await response.json();
                this.resenas = data.reviews || [];
            }
        } catch (error) {
            console.warn('No se pudieron cargar reseñas desde el servidor');
            this.resenas = [];
        }
    }
    
    async submitReview(reviewData) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al enviar reseña');
            }
            
            const result = await response.json();
            
            // Crear objeto de reseña con la estructura correcta
            const newReview = {
                id: result.id,
                nombre: reviewData.nombre,
                rating: reviewData.rating,
                texto: reviewData.texto,
                productoId: reviewData.productoId,
                createdAt: reviewData.createdAt || new Date(),
                published: result.published || true
            };
            
            // Agregar al cache local
            this.resenas.push(newReview);
            
            return result;
        } catch (error) {
            console.error('Error al enviar reseña:', error);
            throw error;
        }
    }
}

/**
 * Enviar reseña desde el modal
 */
async function enviarResenaProducto(event) {
    event.preventDefault();
    
    if (!productoModalActual) {
        mostrarNotificacion('⚠️ Error: No se pudo identificar el producto', 'error');
        return;
    }
    
    const nombre = document.getElementById('modalResenaNombre').value.trim();
    const rating = parseInt(document.getElementById('modalResenaRating').value);
    const texto = document.getElementById('modalResenaTexto').value.trim();
    
    // Validaciones
    if (!nombre || nombre.length < 2) {
        mostrarNotificacion('⚠️ Por favor ingresa tu nombre', 'error');
        return;
    }
    
    if (!rating || rating < 1 || rating > 5) {
        mostrarNotificacion('⚠️ Por favor selecciona una calificación', 'error');
        return;
    }
    
    if (!texto || texto.length < 10) {
        mostrarNotificacion('⚠️ La opinión debe tener al menos 10 caracteres', 'error');
        return;
    }
    
    const btnEnviar = event.target.querySelector('button[type="submit"]');
    const textoOriginal = btnEnviar.innerHTML;
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Enviando...';
    
    try {
        // Crear objeto de reseña
        const nuevaResena = {
            nombre: nombre,
            rating: rating,
            texto: texto,
            productoId: productoModalActual.id,
            createdAt: new Date(),
            status: 'pending'
        };
        
        // Usar el sistema de reseñas existente
        if (typeof reviewsManager !== 'undefined' && reviewsManager) {
            await reviewsManager.submitReview(nuevaResena);
            
            mostrarNotificacion('✅ ¡Gracias por tu opinión!', 'exito');
            
            // Limpiar formulario
            document.getElementById('modalResenaForm').reset();
            ratingModalSeleccionado = 0;
            document.querySelectorAll('.star-btn').forEach(s => s.classList.remove('active'));
            document.getElementById('modalCharCounter').textContent = '0/300';
            
            // Cambiar a la tab de lista
            cambiarTabResenas('lista');
            
            // Recargar reseñas
            setTimeout(() => {
                cargarResenasProducto(productoModalActual.id);
            }, 500);
            
        } else {
            console.error('Sistema de reseñas no disponible');
            mostrarNotificacion('⚠️ Sistema de reseñas no disponible. Intenta recargar la página.', 'error');
            throw new Error('Sistema de reseñas no disponible');
        }
        
    } catch (error) {
        console.error('Error al enviar reseña:', error);
        mostrarNotificacion('❌ Error al enviar la opinión. Intenta de nuevo', 'error');
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = textoOriginal;
    }
}