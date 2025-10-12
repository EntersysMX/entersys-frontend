/**
 * Configuración de Mautic CRM
 */

import { config } from './environment';

const MAUTIC_BASE_URL = config.analytics.mautic.url || 'https://crm.entersys.mx';

export const MAUTIC_CONFIG = {
  // URLs principales
  baseUrl: MAUTIC_BASE_URL,
  apiUrl: `${MAUTIC_BASE_URL}/api`,

  // Configuración de formulario
  formId: 1, // ID del formulario configurado en Mautic

  // OAuth2 Credentials
  clientId: '1_2psjjg30m7s4ogs8goswsksos0s8scgk0k8wc484gwoww8sw4c',
  clientSecret: '3iv9w2alzdes8s8skgkg4co80gsggos8gg0co4k404cks4gosg',

  // URLs OAuth2 - Mautic v4 standard paths
  authUrl: `${MAUTIC_BASE_URL}/oauth/authorize`,
  tokenUrl: `${MAUTIC_BASE_URL}/oauth/token`,

  // Tracking
  trackingPixel: `${MAUTIC_BASE_URL}/mtracking.gif`,

  // Configuración de desarrollo/producción
  environment: config.app.env || 'development',

  // Timeouts
  apiTimeout: 15000, // 15 segundos

  // Configuración por ambiente
  development: {
    baseUrl: MAUTIC_BASE_URL,
    apiUrl: `${MAUTIC_BASE_URL}/api`,
    formId: 1,
    debug: true
  },

  production: {
    baseUrl: MAUTIC_BASE_URL,
    apiUrl: `${MAUTIC_BASE_URL}/api`,
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