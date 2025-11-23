/**
 * Utilidad para verificación de versiones en tiempo real
 */

export class VersionChecker {
  constructor(checkInterval = 300000) { // 5 minutos por defecto
    this.checkInterval = checkInterval;
    this.intervalId = null;
    this.isChecking = false;
    this.lastKnownVersion = null;
  }

  /**
   * Obtener versión actual del servidor
   */
  async fetchServerVersion() {
    try {
      // Intentar obtener la versión de un endpoint específico o del HTML
      const response = await fetch(`${window.location.origin}/?v=${Date.now()}`, {
        cache: 'no-cache',
        method: 'HEAD'
      });

      // Buscar versión en headers o meta tags
      const versionHeader = response.headers.get('x-app-version') ||
                           response.headers.get('x-build-version');

      if (versionHeader) {
        return versionHeader;
      }

      // Si no hay header, intentar parsear desde HTML
      const htmlResponse = await fetch(`${window.location.origin}/?v=${Date.now()}`, {
        cache: 'no-cache'
      });

      const html = await htmlResponse.text();
      const versionMatch = html.match(/<meta name="app-version" content="([^"]+)"/);

      if (versionMatch) {
        return versionMatch[1];
      }

      return null;

    } catch (error) {
      console.warn('⚠️ Could not fetch server version:', error);
      return null;
    }
  }

  /**
   * Comparar versiones
   */
  compareVersions(version1, version2) {
    if (!version1 || !version2) return false;
    return version1 !== version2;
  }

  /**
   * Verificar si hay nueva versión disponible
   */
  async checkForUpdates() {
    if (this.isChecking) return;

    this.isChecking = true;

    try {
      const serverVersion = await this.fetchServerVersion();
      const currentVersion = window.versionManager?.getCurrentVersion() ||
                           document.querySelector('meta[name="app-version"]')?.content;

      if (!this.lastKnownVersion) {
        this.lastKnownVersion = currentVersion;
      }

      if (serverVersion && this.compareVersions(serverVersion, this.lastKnownVersion)) {
        console.log(`🔄 New version detected: ${serverVersion} (current: ${this.lastKnownVersion})`);
        this.lastKnownVersion = serverVersion;

        // Disparar evento personalizado
        const event = new CustomEvent('versionUpdate', {
          detail: {
            newVersion: serverVersion,
            currentVersion: currentVersion,
            timestamp: new Date().toISOString()
          }
        });

        window.dispatchEvent(event);

        // Mostrar notificación
        this.showUpdateAvailableNotification(serverVersion);

        return true;
      }

      return false;

    } catch (error) {
      console.warn('⚠️ Error checking for updates:', error);
      return false;

    } finally {
      this.isChecking = false;
    }
  }

  /**
   * Mostrar notificación de actualización disponible
   */
  showUpdateAvailableNotification(newVersion) {
    // Deshabilitado - no mostrar notificaciones de versión al usuario
    return;

    // Evitar mostrar múltiples notificaciones
    if (document.getElementById('update-available-notification')) {
      return;
    }

    const notification = document.createElement('div');
    notification.id = 'update-available-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 320px;
      animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      cursor: pointer;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">🚀</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">¡Nueva versión disponible!</div>
          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">v${newVersion}</div>
          <div style="display: flex; gap: 8px;">
            <button id="update-now-btn"
                    style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: background 0.2s;">
              Actualizar ahora
            </button>
            <button id="dismiss-update-btn"
                    style="background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: background 0.2s;">
              Más tarde
            </button>
          </div>
        </div>
        <button id="close-update-notification"
                style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; opacity: 0.7; hover: opacity: 1; padding: 0; width: 24px; height: 24px;">
          ×
        </button>
      </div>
    `;

    // Agregar estilos de animación
    if (!document.getElementById('update-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'update-notification-styles';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        #update-now-btn:hover { background: rgba(255,255,255,0.3) !important; }
        #dismiss-update-btn:hover { background: rgba(255,255,255,0.1) !important; }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Event listeners
    document.getElementById('update-now-btn').addEventListener('click', () => {
      window.location.reload(true);
    });

    document.getElementById('dismiss-update-btn').addEventListener('click', () => {
      notification.remove();
    });

    document.getElementById('close-update-notification').addEventListener('click', () => {
      notification.remove();
    });

    // Auto-remove después de 15 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 15000);
  }

  /**
   * Iniciar verificación automática
   */
  startAutoCheck() {
    if (this.intervalId) {
      this.stopAutoCheck();
    }

    // Primera verificación inmediata (después de 30 segundos)
    setTimeout(() => {
      this.checkForUpdates();
    }, 30000);

    // Verificaciones periódicas
    this.intervalId = setInterval(() => {
      this.checkForUpdates();
    }, this.checkInterval);

    console.log(`🔄 Version checking started (every ${this.checkInterval / 1000}s)`);
  }

  /**
   * Detener verificación automática
   */
  stopAutoCheck() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('🛑 Version checking stopped');
    }
  }

  /**
   * Verificación manual
   */
  async manualCheck() {
    console.log('🔍 Manual version check triggered...');
    const hasUpdate = await this.checkForUpdates();

    if (!hasUpdate) {
      // Mostrar mensaje de que ya está actualizado
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        z-index: 10002;
        font-size: 14px;
        animation: fadeIn 0.3s ease-out;
      `;
      toast.textContent = '✅ Ya tienes la versión más reciente';
      document.body.appendChild(toast);

      setTimeout(() => toast.remove(), 3000);
    }

    return hasUpdate;
  }
}

// Instancia global
export const versionChecker = new VersionChecker();

// Auto-inicializar en producción
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Iniciar después de que la app esté cargada
  window.addEventListener('load', () => {
    setTimeout(() => {
      versionChecker.startAutoCheck();
    }, 5000); // Esperar 5 segundos después del load
  });

  // Exponer para debug
  window.versionChecker = versionChecker;
}