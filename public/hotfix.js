/**
 * HOTFIX TEMPORAL - Deshabilitar analytics problemático
 * Este archivo se debe eliminar una vez que el nuevo deploy esté funcionando
 */

// Interceptar y deshabilitar llamadas al API viejo
if (typeof window !== 'undefined') {
  // Override fetch para bloquear llamadas al API problemático
  const originalFetch = window.fetch;

  window.fetch = function(...args) {
    const url = args[0];

    // Bloquear llamadas al API analytics viejo
    if (typeof url === 'string' && url.includes('/api/v1/analytics/track-event')) {
      console.log('🚫 Blocked legacy analytics API call:', url);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: false, blocked: true })
      });
    }

    return originalFetch.apply(this, args);
  };

  console.log('🔧 Hotfix aplicado - Legacy analytics bloqueado');
}