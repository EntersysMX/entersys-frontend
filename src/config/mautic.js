/**
 * Configuración de Mautic CRM
 */

export const MAUTIC_CONFIG = {
  // URLs principales
  baseUrl: 'https://crm.entersys.mx',
  apiUrl: 'https://crm.entersys.mx/api',

  // Configuración de formulario
  formId: 1,

  // Tracking
  trackingPixel: 'https://crm.entersys.mx/mtracking.gif',

  // Configuración de desarrollo/producción
  environment: process.env.NODE_ENV || 'development',

  // Timeouts
  apiTimeout: 15000, // 15 segundos

  // Configuración por ambiente
  development: {
    baseUrl: 'https://crm.dev.entersys.mx',
    apiUrl: 'https://crm.dev.entersys.mx/api',
    formId: 1,
    debug: true
  },

  production: {
    baseUrl: 'https://crm.entersys.mx',
    apiUrl: 'https://crm.entersys.mx/api',
    formId: 1,
    debug: false
  }
};

// Obtener configuración actual basada en el ambiente
export const getCurrentConfig = () => {
  const env = MAUTIC_CONFIG.environment;
  const envConfig = MAUTIC_CONFIG[env] || MAUTIC_CONFIG.production;

  return {
    ...MAUTIC_CONFIG,
    ...envConfig
  };
};

export default MAUTIC_CONFIG;