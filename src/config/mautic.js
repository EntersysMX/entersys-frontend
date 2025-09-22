/**
 * Configuración de Mautic CRM
 */

export const MAUTIC_CONFIG = {
  // URLs principales
  baseUrl: 'https://crm.entersys.mx',
  apiUrl: 'https://crm.entersys.mx/api',

  // Configuración de formulario
  formId: 1, // ID del formulario configurado en Mautic

  // OAuth2 Credentials
  clientId: '1_2psjjg30m7s4ogs8goswsksos0s8scgk0k8wc484gwoww8sw4c',
  clientSecret: '3iv9w2alzdes8s8skgkg4co80gsggos8gg0co4k404cks4gosg',

  // URLs OAuth2 - Mautic v4 standard paths
  authUrl: 'https://crm.entersys.mx/oauth/authorize',
  tokenUrl: 'https://crm.entersys.mx/oauth/token',

  // Tracking
  trackingPixel: 'https://crm.entersys.mx/mtracking.gif',

  // Configuración de desarrollo/producción
  environment: process.env.NODE_ENV || 'development',

  // Timeouts
  apiTimeout: 15000, // 15 segundos

  // Configuración por ambiente
  development: {
    baseUrl: 'https://crm.entersys.mx',
    apiUrl: 'https://crm.entersys.mx/api',
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