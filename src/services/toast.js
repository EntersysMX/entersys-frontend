import toast from 'react-hot-toast';

/**
 * Toast Notification Service
 * Silicon Valley-style notifications para feedback inmediato al usuario
 *
 * Tipos de notificaciones:
 * - success: Operaciones exitosas
 * - error: Errores y problemas
 * - warning: Advertencias
 * - info: Información general
 * - loading: Operaciones en progreso
 * - promise: Para operaciones async con estados
 */

// Configuración base de estilos
const baseStyle = {
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  padding: '16px',
  maxWidth: '500px',
};

const toastService = {
  /**
   * Toast de éxito
   */
  success(message, options = {}) {
    return toast.success(message, {
      duration: 4000,
      style: {
        ...baseStyle,
        background: '#10b981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10b981',
      },
      ...options,
    });
  },

  /**
   * Toast de error
   */
  error(message, options = {}) {
    return toast.error(message, {
      duration: 5000,
      style: {
        ...baseStyle,
        background: '#ef4444',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
      ...options,
    });
  },

  /**
   * Toast de advertencia
   */
  warning(message, options = {}) {
    return toast(message, {
      duration: 4000,
      icon: '⚠️',
      style: {
        ...baseStyle,
        background: '#f59e0b',
        color: '#fff',
      },
      ...options,
    });
  },

  /**
   * Toast de información
   */
  info(message, options = {}) {
    return toast(message, {
      duration: 3000,
      icon: 'ℹ️',
      style: {
        ...baseStyle,
        background: '#3b82f6',
        color: '#fff',
      },
      ...options,
    });
  },

  /**
   * Toast de loading
   */
  loading(message, options = {}) {
    return toast.loading(message, {
      style: {
        ...baseStyle,
        background: '#6b7280',
        color: '#fff',
      },
      ...options,
    });
  },

  /**
   * Toast para operaciones async con Promise
   * Muestra loading, luego success o error según el resultado
   */
  promise(promise, messages = {}, options = {}) {
    const defaultMessages = {
      loading: 'Procesando...',
      success: '¡Completado!',
      error: 'Error al procesar',
    };

    return toast.promise(
      promise,
      {
        loading: messages.loading || defaultMessages.loading,
        success: messages.success || defaultMessages.success,
        error: messages.error || defaultMessages.error,
      },
      {
        style: baseStyle,
        success: {
          duration: 4000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
        loading: {
          style: {
            background: '#6b7280',
            color: '#fff',
          },
        },
        ...options,
      }
    );
  },

  /**
   * Toast personalizado con JSX
   */
  custom(Component, options = {}) {
    return toast.custom(Component, {
      duration: 4000,
      ...options,
    });
  },

  /**
   * Dismissal methods
   */
  dismiss(toastId) {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },

  /**
   * Remover todos los toasts
   */
  dismissAll() {
    toast.dismiss();
  },

  // ============================================
  // Notificaciones específicas de la aplicación
  // ============================================

  /**
   * Notificación de formulario enviado
   */
  formSubmitted(formName = 'Formulario') {
    return this.success(`${formName} enviado exitosamente. Te contactaremos pronto.`, {
      duration: 5000,
    });
  },

  /**
   * Notificación de error de formulario
   */
  formError(message = 'Error al enviar el formulario') {
    return this.error(message, {
      duration: 6000,
    });
  },

  /**
   * Notificación de campo requerido
   */
  fieldRequired(fieldName) {
    return this.warning(`El campo "${fieldName}" es requerido`);
  },

  /**
   * Notificación de email inválido
   */
  invalidEmail() {
    return this.warning('Por favor ingresa un email válido');
  },

  /**
   * Notificación de copiado al portapapeles
   */
  copied(item = 'Texto') {
    return this.success(`${item} copiado al portapapeles`);
  },

  /**
   * Notificación de descarga iniciada
   */
  downloadStarted(fileName = 'archivo') {
    return this.info(`Descargando ${fileName}...`);
  },

  /**
   * Notificación de descarga completada
   */
  downloadCompleted(fileName = 'archivo') {
    return this.success(`${fileName} descargado exitosamente`);
  },

  /**
   * Notificación de conexión perdida
   */
  connectionLost() {
    return this.error('Conexión perdida. Verifica tu internet.', {
      duration: 8000,
    });
  },

  /**
   * Notificación de conexión restaurada
   */
  connectionRestored() {
    return this.success('Conexión restaurada');
  },

  /**
   * Notificación de guardado automático
   */
  autoSaved() {
    return this.info('Guardado automáticamente', {
      duration: 2000,
    });
  },

  /**
   * Notificación de sesión por expirar
   */
  sessionExpiring(minutes = 5) {
    return this.warning(`Tu sesión expirará en ${minutes} minutos`, {
      duration: 6000,
    });
  },

  /**
   * Notificación de actualización disponible
   */
  updateAvailable() {
    return this.info('Nueva versión disponible. Recarga la página.', {
      duration: 10000,
    });
  },
};

export default toastService;

// Export del toast original por si se necesita
export { toast };
