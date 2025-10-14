/**
 * Advanced Analytics Utilities
 * Tracking avanzado de funnels, conversiones, y user journeys
 */

import { analyticsService } from '../services/analytics';

/**
 * Funnel Tracking
 * Sistema para trackear funnels de conversión paso a paso
 */
export class FunnelTracker {
  constructor(funnelName, steps) {
    this.funnelName = funnelName;
    this.steps = steps; // Array de nombres de pasos
    this.currentStep = 0;
    this.startTime = Date.now();
    this.stepTimes = {};
  }

  /**
   * Registra entrada a un paso del funnel
   */
  enterStep(stepName) {
    const stepIndex = this.steps.indexOf(stepName);

    if (stepIndex === -1) {
      console.warn(`Step "${stepName}" not found in funnel "${this.funnelName}"`);
      return;
    }

    this.currentStep = stepIndex;
    this.stepTimes[stepName] = {
      start: Date.now(),
      end: null,
    };

    analyticsService.trackEvent(
      'Funnel',
      `${this.funnelName} - Enter Step`,
      stepName,
      stepIndex + 1
    );
  }

  /**
   * Completa el paso actual
   */
  completeStep(stepName) {
    if (this.stepTimes[stepName]) {
      this.stepTimes[stepName].end = Date.now();
      const duration = this.stepTimes[stepName].end - this.stepTimes[stepName].start;

      analyticsService.trackEvent(
        'Funnel',
        `${this.funnelName} - Complete Step`,
        stepName,
        Math.round(duration / 1000) // Segundos
      );
    }
  }

  /**
   * Abandona el funnel en un paso específico
   */
  abandon(stepName, reason = '') {
    analyticsService.trackEvent(
      'Funnel',
      `${this.funnelName} - Abandoned`,
      `${stepName}${reason ? ` - ${reason}` : ''}`,
      this.currentStep + 1
    );
  }

  /**
   * Completa todo el funnel exitosamente
   */
  complete() {
    const totalTime = Date.now() - this.startTime;

    analyticsService.trackEvent(
      'Funnel',
      `${this.funnelName} - Completed`,
      'Success',
      Math.round(totalTime / 1000) // Segundos totales
    );

    // Enviar resumen de tiempos por paso
    Object.entries(this.stepTimes).forEach(([stepName, times]) => {
      if (times.start && times.end) {
        const duration = times.end - times.start;
        analyticsService.trackEvent(
          'Funnel Step Time',
          this.funnelName,
          stepName,
          Math.round(duration / 1000)
        );
      }
    });
  }
}

/**
 * Funnels predefinidos
 */
export const FUNNELS = {
  CONTACT_FORM: ['view', 'start', 'fill', 'submit', 'success'],
  PRODUCT_INQUIRY: ['view', 'info', 'demo', 'contact', 'quote'],
  SIGNUP: ['landing', 'form', 'verify', 'complete'],
  PURCHASE: ['browse', 'select', 'cart', 'checkout', 'payment', 'confirm'],
};

/**
 * User Journey Tracking
 * Rastrea el journey completo del usuario
 */
export class JourneyTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.journey = [];
    this.startTime = Date.now();

    // Track page visibility
    this.setupVisibilityTracking();
  }

  /**
   * Genera ID único de sesión
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Agrega un touchpoint al journey
   */
  addTouchpoint(type, data = {}) {
    const touchpoint = {
      type,
      data,
      timestamp: Date.now(),
      url: window.location.pathname,
      referrer: document.referrer,
    };

    this.journey.push(touchpoint);

    analyticsService.trackEvent(
      'User Journey',
      type,
      JSON.stringify(data),
      this.journey.length
    );

    return touchpoint;
  }

  /**
   * Track page view como touchpoint
   */
  trackPageView(pageName) {
    this.addTouchpoint('page_view', {
      page: pageName,
      title: document.title,
    });
  }

  /**
   * Track interaction
   */
  trackInteraction(action, element) {
    this.addTouchpoint('interaction', {
      action,
      element,
    });
  }

  /**
   * Track conversión
   */
  trackConversion(conversionType, value = 0) {
    this.addTouchpoint('conversion', {
      type: conversionType,
      value,
    });
  }

  /**
   * Obtener resumen del journey
   */
  getSummary() {
    const duration = Date.now() - this.startTime;
    const pages = this.journey.filter((t) => t.type === 'page_view').length;
    const interactions = this.journey.filter((t) => t.type === 'interaction').length;
    const conversions = this.journey.filter((t) => t.type === 'conversion').length;

    return {
      sessionId: this.sessionId,
      duration: Math.round(duration / 1000),
      touchpoints: this.journey.length,
      pages,
      interactions,
      conversions,
      journey: this.journey,
    };
  }

  /**
   * Setup tracking de visibilidad de la página
   */
  setupVisibilityTracking() {
    let hidden, visibilityChange;

    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    if (typeof document[hidden] !== 'undefined') {
      document.addEventListener(visibilityChange, () => {
        if (document[hidden]) {
          this.addTouchpoint('page_hidden', {
            duration: Date.now() - this.startTime,
          });
        } else {
          this.addTouchpoint('page_visible', {});
        }
      });
    }
  }
}

/**
 * Conversion Tracking
 * Helpers para trackear diferentes tipos de conversiones
 */
export const ConversionTracker = {
  /**
   * Track formulario enviado
   */
  formSubmission(formName, formData = {}) {
    analyticsService.trackEvent('Conversion', 'Form Submission', formName, 1);

    // Track campos completados
    const filledFields = Object.keys(formData).filter(
      (key) => formData[key] && formData[key].toString().trim() !== ''
    ).length;

    analyticsService.trackEvent(
      'Conversion Details',
      'Form Fields Completed',
      formName,
      filledFields
    );
  },

  /**
   * Track descarga
   */
  download(fileName, fileType) {
    analyticsService.trackEvent('Conversion', 'Download', `${fileName} (${fileType})`, 1);
  },

  /**
   * Track click en CTA
   */
  ctaClick(ctaName, location) {
    analyticsService.trackEvent('Conversion', 'CTA Click', `${ctaName} - ${location}`, 1);
  },

  /**
   * Track suscripción newsletter
   */
  newsletterSignup(email) {
    analyticsService.trackEvent('Conversion', 'Newsletter Signup', 'Email Subscribed', 1);
  },

  /**
   * Track demo request
   */
  demoRequest(product) {
    analyticsService.trackEvent('Conversion', 'Demo Request', product, 1);
  },

  /**
   * Track quote request
   */
  quoteRequest(product, value = 0) {
    analyticsService.trackEvent('Conversion', 'Quote Request', product, value);
  },

  /**
   * Track phone call
   */
  phoneCall(number) {
    analyticsService.trackEvent('Conversion', 'Phone Call', number, 1);
  },

  /**
   * Track WhatsApp click
   */
  whatsappClick(message = '') {
    analyticsService.trackEvent('Conversion', 'WhatsApp Click', message || 'Generic', 1);
  },

  /**
   * Track video play
   */
  videoPlay(videoName, duration = 0) {
    analyticsService.trackEvent('Engagement', 'Video Play', videoName, Math.round(duration));
  },

  /**
   * Track video complete
   */
  videoComplete(videoName, duration) {
    analyticsService.trackEvent('Engagement', 'Video Complete', videoName, Math.round(duration));
  },
};

/**
 * Ecommerce Tracking (para futuro)
 * Preparado para tracking de comercio electrónico
 */
export const EcommerceTracker = {
  /**
   * Track product view
   */
  viewProduct(product) {
    analyticsService.trackEvent('Ecommerce', 'Product View', product.name, product.price || 0);
  },

  /**
   * Track add to cart
   */
  addToCart(product, quantity = 1) {
    analyticsService.trackEvent(
      'Ecommerce',
      'Add to Cart',
      product.name,
      (product.price || 0) * quantity
    );
  },

  /**
   * Track remove from cart
   */
  removeFromCart(product) {
    analyticsService.trackEvent('Ecommerce', 'Remove from Cart', product.name, product.price || 0);
  },

  /**
   * Track purchase
   */
  purchase(orderId, products, totalValue) {
    analyticsService.trackEvent('Ecommerce', 'Purchase', orderId, totalValue);

    // Track cada producto
    products.forEach((product) => {
      analyticsService.trackEvent(
        'Ecommerce Product',
        'Purchased',
        product.name,
        product.price || 0
      );
    });
  },
};

/**
 * A/B Test Tracking
 */
export const ABTestTracker = {
  /**
   * Registra que variante vió el usuario
   */
  trackVariant(testName, variantName) {
    analyticsService.trackEvent('AB Test', 'Variant Shown', `${testName}: ${variantName}`, 1);
  },

  /**
   * Registra conversión en una variante
   */
  trackConversion(testName, variantName) {
    analyticsService.trackEvent(
      'AB Test',
      'Variant Conversion',
      `${testName}: ${variantName}`,
      1
    );
  },
};

/**
 * Custom Dashboard Helper
 * Crea eventos personalizados para dashboards
 */
export const DashboardMetrics = {
  /**
   * Track métrica custom
   */
  track(category, metric, value) {
    analyticsService.trackEvent('Custom Metric', category, metric, value);
  },

  /**
   * Track engagement score
   */
  trackEngagement(score) {
    analyticsService.trackEvent('Engagement', 'Score', 'User Engagement', score);
  },

  /**
   * Track time on page (más preciso que el default)
   */
  trackTimeOnPage(pageName, seconds) {
    analyticsService.trackEvent('Time on Page', pageName, 'Seconds', Math.round(seconds));
  },

  /**
   * Track feature usage
   */
  trackFeatureUsage(featureName, count = 1) {
    analyticsService.trackEvent('Feature Usage', featureName, 'Count', count);
  },
};

/**
 * Inicializar journey tracker global
 */
let globalJourneyTracker = null;

export const initJourneyTracking = () => {
  if (!globalJourneyTracker) {
    globalJourneyTracker = new JourneyTracker();

    // Track unload para enviar resumen
    window.addEventListener('beforeunload', () => {
      const summary = globalJourneyTracker.getSummary();
      analyticsService.trackEvent(
        'Session Summary',
        'Session End',
        JSON.stringify(summary),
        summary.duration
      );
    });
  }

  return globalJourneyTracker;
};

export const getJourneyTracker = () => {
  if (!globalJourneyTracker) {
    return initJourneyTracking();
  }
  return globalJourneyTracker;
};

export default {
  FunnelTracker,
  FUNNELS,
  JourneyTracker,
  ConversionTracker,
  EcommerceTracker,
  ABTestTracker,
  DashboardMetrics,
  initJourneyTracking,
  getJourneyTracker,
};
