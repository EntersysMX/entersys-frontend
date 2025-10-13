/**
 * Servicio de Analytics integrado con Matomo
 */

import { config } from '../config/environment';

// Configuración de Matomo desde variables de entorno
const MATOMO_CONFIG = {
  url: config.analytics.matomo.url ? `${config.analytics.matomo.url}/` : 'https://analytics.entersys.mx/',
  siteId: config.analytics.matomo.siteId || 1,
  enabled: config.analytics.enabled
};

class AnalyticsService {
  constructor() {
    this.initialized = false;
    this.scriptLoaded = false;
    // Solo debug en development o cuando esté explícitamente habilitado
    this.debug = config.app.env === 'development' || config.app.debug === true;
  }

  /**
   * Helper para logging condicional
   */
  log(...args) {
    if (this.debug) {
      console.log(...args);
    }
  }

  /**
   * Inicializar Matomo
   */
  async initialize() {
    if (this.initialized) {
      this.log('🔧 Matomo already initialized');
      return;
    }

    try {
      this.log('🚀 Initializing Matomo Analytics...');

      // Configurar _paq global para Matomo
      window._paq = window._paq || [];

      // Configuración de tracking
      window._paq.push(['setTrackerUrl', MATOMO_CONFIG.url + 'matomo.php']);
      window._paq.push(['setSiteId', MATOMO_CONFIG.siteId]);
      window._paq.push(['enableLinkTracking']);

      // Track página inicial solo si no se ha hecho
      if (!window._paq.trackingInitialized) {
        window._paq.push(['trackPageView']);
        window._paq.trackingInitialized = true;
      }

      // Cargar script de Matomo si no está cargado
      if (!this.scriptLoaded) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = MATOMO_CONFIG.url + 'matomo.js';

        script.onload = () => {
          this.scriptLoaded = true;
          this.log('✅ Matomo script loaded successfully');
        };

        script.onerror = () => {
          console.error('❌ Failed to load Matomo script');
        };

        document.head.appendChild(script);
      }

      this.initialized = true;
      this.log('✅ Matomo Analytics initialized successfully');
      this.log('🔧 Tracker URL:', MATOMO_CONFIG.url + 'matomo.php');
      this.log('🔧 Site ID:', MATOMO_CONFIG.siteId);

    } catch (error) {
      console.error('❌ Error initializing Matomo:', error);
    }
  }

  /**
   * Track page view
   */
  trackPageView(customTitle = null) {
    try {
      if (!window._paq) {
        this.log('⚠️ Matomo not ready for page view tracking');
        return;
      }

      if (customTitle) {
        window._paq.push(['setDocumentTitle', customTitle]);
      }
      window._paq.push(['trackPageView']);

      this.log('📊 Page view tracked:', customTitle || window.location.pathname);
    } catch (error) {
      console.error('❌ Error tracking page view:', error);
    }
  }

  /**
   * Track custom event
   */
  trackEvent(category, action, name = null, value = null) {
    try {
      if (!window._paq) {
        this.log('⚠️ Matomo not ready for event tracking');
        return;
      }

      const eventData = ['trackEvent', category, action];
      if (name) eventData.push(name);
      if (value) eventData.push(value);

      window._paq.push(eventData);

      this.log('📊 Event tracked:', { category, action, name, value });
      this.log('📊 _paq queue length:', window._paq.length);
    } catch (error) {
      console.error('❌ Error tracking event:', error);
    }
  }

  /**
   * Track WhatsApp click
   */
  trackWhatsAppClick(source = 'float_button') {
    this.trackEvent('CTA', 'WhatsApp Click', source);
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName = 'contact') {
    this.trackEvent('Form', 'Submit', formName);
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName, section = null) {
    this.trackEvent('CTA', 'Button Click', buttonName, section);
  }

  /**
   * Track conversion
   */
  trackConversion(conversionName, value = null) {
    this.trackEvent('Conversion', conversionName, null, value);
  }

  /**
   * Test Matomo connection
   */
  testConnection() {
    this.log('🧪 Testing Matomo connection...');
    this.log('🔧 Config:', MATOMO_CONFIG);
    this.log('🔧 Initialized:', this.initialized);
    this.log('🔧 Script loaded:', this.scriptLoaded);
    this.log('🔧 _paq available:', typeof window._paq !== 'undefined');
    this.log('🔧 _paq length:', window._paq ? window._paq.length : 'N/A');

    if (window._paq) {
      // Enviar un evento de prueba
      this.trackEvent('Test', 'Connection Test', 'Manual Debug', 1);
      this.log('🧪 Test event sent to Matomo');
    } else {
      console.error('❌ _paq not available for testing');
    }
  }
}

// Instancia singleton
export const analyticsService = new AnalyticsService();

// Auto-inicializar cuando se carga la página
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    analyticsService.initialize();
  });

  // Exponer para debug
  window.entersysAnalytics = {
    trackEvent: (category, action, name, value) => analyticsService.trackEvent(category, action, name, value),
    trackWhatsApp: (source) => analyticsService.trackWhatsAppClick(source),
    trackForm: (formName) => analyticsService.trackFormSubmission(formName),
    trackButton: (buttonName, section) => analyticsService.trackButtonClick(buttonName, section),
    trackPageView: (title) => analyticsService.trackPageView(title),
    testConnection: () => analyticsService.testConnection(),
    initialize: () => analyticsService.initialize(),
    getStatus: () => ({
      initialized: analyticsService.initialized,
      scriptLoaded: analyticsService.scriptLoaded,
      paqAvailable: typeof window._paq !== 'undefined',
      paqLength: window._paq ? window._paq.length : 0
    })
  };

  analyticsService.log('🔧 Analytics functions available in window.entersysAnalytics');
  analyticsService.log('🔧 Use window.entersysAnalytics.testConnection() to debug');
}

export default analyticsService;