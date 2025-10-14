import * as Sentry from "@sentry/react";

/**
 * Servicio de Error Tracking con Sentry
 * Configuración estilo Silicon Valley para monitoreo de errores en producción
 */

export const sentryService = {
  /**
   * Inicializa Sentry con configuración optimizada
   */
  initialize() {
    // Solo inicializar en producción o si está explícitamente habilitado
    const isProduction = import.meta.env.VITE_APP_ENV === 'production';
    const isEnabled = import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true';

    if (!isProduction && !isEnabled) {
      console.log('📊 Sentry: Disabled in development');
      return;
    }

    try {
      Sentry.init({
        // DSN se configurará cuando tengas cuenta de Sentry
        // dsn: import.meta.env.VITE_SENTRY_DSN,

        // Configuración de entorno
        environment: import.meta.env.VITE_APP_ENV || 'development',
        release: import.meta.env.VITE_APP_VERSION || 'unknown',

        // Integrations para mejor tracking
        integrations: [
          // Browser Tracing para performance monitoring
          new Sentry.BrowserTracing({
            // Trace todas las navegaciones
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
              window.history,
              window.location
            ),
          }),

          // Replay para grabar sesiones con errores
          new Sentry.Replay({
            maskAllText: true, // Privacidad: ocultar texto
            blockAllMedia: true, // Privacidad: bloquear media
          }),
        ],

        // Performance Monitoring
        tracesSampleRate: isProduction ? 0.1 : 1.0, // 10% en prod, 100% en dev

        // Session Replay (solo para sesiones con errores)
        replaysSessionSampleRate: 0.1, // 10% de sesiones normales
        replaysOnErrorSampleRate: 1.0, // 100% de sesiones con errores

        // Filtros de errores
        beforeSend(event, hint) {
          // Filtrar errores conocidos/ignorables
          const error = hint.originalException;

          // Ignorar errores de extensiones de navegador
          if (error && error.message && error.message.includes('chrome-extension://')) {
            return null;
          }

          // Ignorar errores de network timeout esperados
          if (error && error.message && error.message.includes('timeout')) {
            return null;
          }

          return event;
        },

        // Ignorar breadcrumbs innecesarios
        beforeBreadcrumb(breadcrumb, hint) {
          // Filtrar console logs en producción
          if (breadcrumb.category === 'console' && isProduction) {
            return null;
          }
          return breadcrumb;
        },
      });

      console.log('✅ Sentry initialized successfully');
    } catch (error) {
      console.error('❌ Sentry initialization failed:', error);
    }
  },

  /**
   * Captura error manualmente
   */
  captureError(error, context = {}) {
    Sentry.captureException(error, {
      contexts: context,
      level: 'error',
    });
  },

  /**
   * Captura mensaje (warning, info, etc)
   */
  captureMessage(message, level = 'info', context = {}) {
    Sentry.captureMessage(message, {
      level,
      contexts: context,
    });
  },

  /**
   * Setea contexto de usuario
   */
  setUser(userData) {
    Sentry.setUser({
      id: userData.id || userData.email,
      email: userData.email,
      username: userData.name,
      ...userData,
    });
  },

  /**
   * Limpia contexto de usuario
   */
  clearUser() {
    Sentry.setUser(null);
  },

  /**
   * Añade breadcrumb personalizado
   */
  addBreadcrumb(breadcrumb) {
    Sentry.addBreadcrumb({
      timestamp: Date.now() / 1000,
      ...breadcrumb,
    });
  },

  /**
   * Setea tags custom
   */
  setTag(key, value) {
    Sentry.setTag(key, value);
  },

  /**
   * Setea contexto adicional
   */
  setContext(name, context) {
    Sentry.setContext(name, context);
  },

  /**
   * Wrapper para funciones async con error handling
   */
  async wrapAsync(fn, errorContext = {}) {
    try {
      return await fn();
    } catch (error) {
      this.captureError(error, errorContext);
      throw error;
    }
  },

  /**
   * Performance monitoring manual
   */
  startTransaction(name, op = 'custom') {
    return Sentry.startTransaction({
      name,
      op,
    });
  },
};

// Export Sentry para uso directo si es necesario
export { Sentry };
