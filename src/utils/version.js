/**
 * Sistema de versionado y cache busting
 * Gestiona versiones de la aplicación y fuerza actualización de caché
 */

export class VersionManager {
  constructor() {
    this.currentVersion = import.meta.env.VITE_APP_VERSION || this.generateVersion();
    this.versionKey = 'entersys_app_version';
    this.lastUpdateKey = 'entersys_last_update';
  }

  /**
   * Generar versión basada en timestamp
   */
  generateVersion() {
    const now = new Date();
    return `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
  }

  /**
   * Obtener versión actual
   */
  getCurrentVersion() {
    return this.currentVersion;
  }

  /**
   * Obtener versión almacenada en localStorage
   */
  getStoredVersion() {
    return localStorage.getItem(this.versionKey);
  }

  /**
   * Verificar si hay una nueva versión
   */
  hasNewVersion() {
    const storedVersion = this.getStoredVersion();
    return !storedVersion || storedVersion !== this.currentVersion;
  }

  /**
   * Actualizar versión almacenada
   */
  updateStoredVersion() {
    localStorage.setItem(this.versionKey, this.currentVersion);
    localStorage.setItem(this.lastUpdateKey, new Date().toISOString());
    console.log(`🔄 App version updated to: ${this.currentVersion}`);
  }

  /**
   * Limpiar caché y cookies de versiones anteriores
   */
  clearOldCache() {
    try {
      // Limpiar Service Worker cache si existe
      if ('serviceWorker' in navigator && 'caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName.includes('entersys') || cacheName.includes('app')) {
              caches.delete(cacheName);
              console.log(`🗑️ Cleared cache: ${cacheName}`);
            }
          });
        });
      }

      // Limpiar datos específicos de versiones anteriores
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('entersys_') && !key.includes('leads') && key !== this.versionKey && key !== this.lastUpdateKey)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`🗑️ Cleared old data: ${key}`);
      });

      // Actualizar timestamp del documento para cache busting
      this.updateDocumentCache();

    } catch (error) {
      console.warn('⚠️ Error clearing old cache:', error);
    }
  }

  /**
   * Actualizar caché del documento
   */
  updateDocumentCache() {
    try {
      // Agregar timestamp a meta tags para cache busting
      const existingMeta = document.querySelector('meta[name="cache-version"]');
      if (existingMeta) {
        existingMeta.setAttribute('content', this.currentVersion);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'cache-version');
        meta.setAttribute('content', this.currentVersion);
        document.head.appendChild(meta);
      }

      // Actualizar favicon con timestamp para forzar refresh
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        const url = new URL(favicon.href, window.location.origin);
        url.searchParams.set('v', this.currentVersion);
        favicon.href = url.toString();
      }

    } catch (error) {
      console.warn('⚠️ Error updating document cache:', error);
    }
  }

  /**
   * Mostrar notificación de nueva versión
   */
  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.id = 'version-update-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 300px;
      animation: slideInRight 0.3s ease-out;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">🚀</span>
        <div>
          <div style="font-weight: bold; margin-bottom: 5px;">¡Nueva versión disponible!</div>
          <div style="font-size: 12px; opacity: 0.9;">v${this.currentVersion}</div>
          <button onclick="window.location.reload()"
                  style="margin-top: 8px; background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">
            Actualizar ahora
          </button>
        </div>
      </div>
    `;

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto-remover después de 10 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 10000);
  }

  /**
   * Inicializar sistema de versionado
   */
  initialize() {
    console.log(`🚀 Entersys App v${this.currentVersion}`);

    // Guardar la versión anterior ANTES de actualizar
    const previousVersion = this.getStoredVersion();

    if (this.hasNewVersion()) {
      console.log(`📱 New version detected: ${this.currentVersion} (was: ${previousVersion || 'none'})`);

      // Limpiar caché anterior
      this.clearOldCache();

      // Actualizar versión
      this.updateStoredVersion();

      // Mostrar notificación SOLO si había una versión anterior diferente
      // NO mostrar si es la primera visita (previousVersion === null)
      if (previousVersion !== null && previousVersion !== this.currentVersion) {
        this.showUpdateNotification();
      }
    } else {
      console.log(`✅ App version ${this.currentVersion} is current`);
    }

    // Actualizar caché del documento
    this.updateDocumentCache();
  }

  /**
   * Forzar actualización completa
   */
  forceUpdate() {
    this.clearOldCache();
    this.updateStoredVersion();
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }

  /**
   * Obtener información de versión para debug
   */
  getVersionInfo() {
    return {
      current: this.currentVersion,
      stored: this.getStoredVersion(),
      lastUpdate: localStorage.getItem(this.lastUpdateKey),
      hasNewVersion: this.hasNewVersion(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
  }
}

// Instancia singleton
export const versionManager = new VersionManager();

// Auto-inicializar cuando se carga el módulo
if (typeof window !== 'undefined') {
  // Inicializar después de que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      versionManager.initialize();
    });
  } else {
    versionManager.initialize();
  }

  // Exponer en window para debug
  window.versionManager = versionManager;
}