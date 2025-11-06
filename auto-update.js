/**
 * ========================================
 * SISTEMA DE ACTUALIZACIÓN AUTOMÁTICA
 * Alimento del Cielo PWA
 * ========================================
 * 
 * Características:
 * - Detección automática de nuevas versiones
 * - Limpieza inteligente de cache
 * - Notificación elegante al usuario
 * - Actualización sin interrupciones
 * - Sincronización automática
 */

class AutoUpdateManager {
    constructor() {
        this.config = {
            checkInterval: 60000, // Verificar cada 60 segundos
            updateCheckUrl: '/sw.js',
            autoReloadDelay: 3000, // 3 segundos antes de recargar
            showNotifications: true,
            forceUpdate: false
        };
        
        this.currentVersion = null;
        this.updateAvailable = false;
        this.registration = null;
        
        this.init();
    }
    
    /**
     * Inicializar el sistema de actualizaciones
     */
    async init() {
        if (!('serviceWorker' in navigator)) {
            console.warn('⚠️ Service Worker no soportado');
            return;
        }
        
        try {
            // Registrar Service Worker
            this.registration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker registrado');
            
            // Configurar listeners
            this.setupListeners();
            
            // Verificar actualizaciones periódicamente
            this.startUpdateCheck();
            
            // Escuchar mensajes del Service Worker
            this.listenToServiceWorker();
            
            // Obtener versión actual
            await this.getCurrentVersion();
            
            console.log('🔄 Sistema de actualización automática iniciado');
            
        } catch (error) {
            console.error('❌ Error iniciando auto-update:', error);
        }
    }
    
    /**
     * Configurar event listeners
     */
    setupListeners() {
        // Detectar cuando hay un nuevo SW esperando
        this.registration.addEventListener('updatefound', () => {
            const newWorker = this.registration.installing;
            console.log('🆕 Nueva versión detectada');
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Nueva versión disponible
                    this.handleUpdateAvailable();
                }
            });
        });
        
        // Detectar cuando el SW toma control
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            console.log('🔄 Nueva versión activa, recargando...');
            window.location.reload();
        });
        
        // Detectar cambios de conectividad
        window.addEventListener('online', () => {
            console.log('🌐 Conexión restaurada, verificando actualizaciones...');
            this.checkForUpdates();
        });
    }
    
    /**
     * Escuchar mensajes del Service Worker
     */
    listenToServiceWorker() {
        navigator.serviceWorker.addEventListener('message', (event) => {
            const { type, version, timestamp } = event.data;
            
            switch (type) {
                case 'SW_UPDATED':
                    console.log('📣 SW actualizado a versión:', version);
                    this.currentVersion = version;
                    this.showUpdateNotification(version);
                    break;
                    
                case 'CACHE_CLEARED':
                    console.log('🧹 Cache limpiado automáticamente');
                    break;
                    
                case 'UPDATE_AVAILABLE':
                    console.log('🆕 Actualización disponible:', version);
                    this.handleUpdateAvailable();
                    break;
            }
        });
    }
    
    /**
     * Obtener versión actual del SW
     */
    async getCurrentVersion() {
        try {
            const response = await fetch(`${this.config.updateCheckUrl}?ts=${Date.now()}`, {
                cache: 'no-store'
            });
            const text = await response.text();
            const versionMatch = text.match(/CACHE_VERSION\s*=\s*['"]([^'"]+)['"]/);
            if (versionMatch) {
                this.currentVersion = versionMatch[1];
                console.log('📊 Versión actual:', this.currentVersion);
            }
        } catch (error) {
            console.warn('⚠️ No se pudo obtener versión:', error);
        }
    }
    
    /**
     * Verificar actualizaciones periódicamente
     */
    startUpdateCheck() {
        // Verificar inmediatamente
        this.checkForUpdates();
        // Luego verificar periódicamente
        setInterval(() => {
            this.checkForUpdates();
        }, this.config.checkInterval);
    }
    
    /**
     * Verificar si hay actualizaciones disponibles
     */
    async checkForUpdates() {
        if (!this.registration) return;
        if (!navigator.onLine) {
            // Evita ruido cuando no hay conexión
            console.log('📴 Offline: se omite verificación de actualización');
            return;
        }

        try {
            // Pide al navegador buscar un SW nuevo
            await this.registration.update();

            // Chequeo extra: comparar la versión del SW remoto (sin cache)
            const res = await fetch(`${this.config.updateCheckUrl}?ts=${Date.now()}`, { cache: 'no-store' });
            const text = await res.text();
            const match = text.match(/CACHE_VERSION\s*=\s*['"]([^'"]+)['"]/);

            if (match) {
                const remoteVersion = match[1];
                if (this.currentVersion && remoteVersion !== this.currentVersion) {
                    console.log(`🆕 Detectada nueva versión remota: ${remoteVersion} (actual: ${this.currentVersion})`);
                    this.currentVersion = remoteVersion;
                    this.handleUpdateAvailable();
                }
            }

            console.log('✅ Verificación de actualización completada');
        } catch (error) {
            console.warn('⚠️ Error verificando actualizaciones:', error);
        }
    }
    
    /**
     * Manejar actualización disponible
     */
    handleUpdateAvailable() {
        this.updateAvailable = true;
        
        if (this.config.forceUpdate) {
            // Actualizar inmediatamente sin preguntar
            this.applyUpdate();
        } else if (this.config.showNotifications) {
            // Mostrar notificación elegante
            this.showUpdateNotification();
        }
    }
    
    /**
     * Mostrar notificación de actualización
     */
    showUpdateNotification(version = null) {
        // Verificar si ya existe una notificación
        if (document.getElementById('update-notification')) return;
        
        const notification = document.createElement('div');
        notification.id = 'update-notification';
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <div class="update-icon">🎉</div>
                <div class="update-text">
                    <strong>¡Nueva versión disponible!</strong>
                    <p>Actualiza para obtener las últimas mejoras${version ? ` (v${version})` : ''}</p>
                </div>
                <div class="update-actions">
                    <button class="btn-update" onclick="autoUpdateManager.applyUpdate()">
                        Actualizar ahora
                    </button>
                    <button class="btn-dismiss" onclick="autoUpdateManager.dismissNotification()">
                        Más tarde
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-actualizar después de 30 segundos si no hay respuesta
        setTimeout(() => {
            if (document.getElementById('update-notification')) {
                console.log('⏰ Auto-actualizando después del timeout...');
                this.applyUpdate();
            }
        }, 30000);
    }
    
    /**
     * Aplicar actualización
     */
    async applyUpdate() {
        console.log('🔄 Aplicando actualización...');
        this.showLoadingIndicator();

        try {
            await this.clearOldCache();

            // Intentar activar el worker que está esperando o instalándose
            const waitingOrInstalling = this.registration.waiting || this.registration.installing;
            if (waitingOrInstalling) {
                waitingOrInstalling.postMessage({ type: 'SKIP_WAITING' });
            } else {
                // Si no hay ninguno, pide una actualización
                await this.registration.update().catch(() => {});
            }

            setTimeout(() => {
                window.location.reload(true);
            }, this.config.autoReloadDelay);
        } catch (error) {
            console.error('❌ Error aplicando actualización:', error);
            this.hideLoadingIndicator();
        }
    }
    
    /**
     * Limpiar cache antiguo
     */
    async clearOldCache() {
        try {
            const cacheNames = await caches.keys();
            const currentCache = `alimento-del-cielo-v${this.currentVersion}`;
            
            const deletePromises = cacheNames
                .filter(name => name !== currentCache)
                .map(name => {
                    console.log('🗑️ Eliminando cache:', name);
                    return caches.delete(name);
                });
            
            await Promise.all(deletePromises);
            console.log('✅ Cache antiguo eliminado');
            
        } catch (error) {
            console.warn('⚠️ Error limpiando cache:', error);
        }
    }
    
    /**
     * Descartar notificación
     */
    dismissNotification() {
        const notification = document.getElementById('update-notification');
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }
    
    /**
     * Mostrar indicador de carga
     */
    showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'update-loader';
        loader.className = 'update-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Actualizando aplicación...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }
    
    /**
     * Ocultar indicador de carga
     */
    hideLoadingIndicator() {
        const loader = document.getElementById('update-loader');
        if (loader) loader.remove();
    }
    
    /**
     * Forzar actualización inmediata
     */
    forceUpdateNow() {
        this.config.forceUpdate = true;
        this.applyUpdate();
    }
}

// ========================================
// ESTILOS PARA EL SISTEMA DE ACTUALIZACIÓN
// ========================================

const updateStyles = `
<style>
    /* Notificación de actualización */
    .update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(500px);
        transition: transform 0.3s ease;
    }
    
    .update-notification.show {
        transform: translateX(0);
    }
    
    .update-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .update-icon {
        font-size: 32px;
        text-align: center;
    }
    
    .update-text strong {
        display: block;
        font-size: 18px;
        margin-bottom: 5px;
    }
    
    .update-text p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
    }
    
    .update-actions {
        display: flex;
        gap: 10px;
    }
    
    .update-actions button {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .btn-update {
        background: white;
        color: #667eea;
    }
    
    .btn-update:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255,255,255,0.3);
    }
    
    .btn-dismiss {
        background: rgba(255,255,255,0.2);
        color: white;
    }
    
    .btn-dismiss:hover {
        background: rgba(255,255,255,0.3);
    }
    
    /* Indicador de carga */
    .update-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    }
    
    .loader-content {
        text-align: center;
        color: white;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .loader-content p {
        font-size: 18px;
        margin: 0;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .update-notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .update-actions {
            flex-direction: column;
        }
    }
</style>
`;

// Inyectar estilos
if (!document.getElementById('auto-update-styles')) {
    document.head.insertAdjacentHTML('beforeend', updateStyles);
    const styleTag = document.head.lastElementChild;
    styleTag.id = 'auto-update-styles';
}

// ========================================
// INICIALIZACIÓN AUTOMÁTICA
// ========================================

let autoUpdateManager;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        autoUpdateManager = new AutoUpdateManager();
    });
} else {
    autoUpdateManager = new AutoUpdateManager();
}

// Exponer globalmente para uso manual
window.autoUpdateManager = autoUpdateManager;

console.log('🚀 Sistema de actualización automática cargado');
