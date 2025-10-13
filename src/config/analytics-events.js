/**
 * Taxonomía de Eventos de Analytics
 *
 * Este archivo define la estructura estándar de eventos para Matomo Analytics.
 * Mantener consistencia en nombres y categorías facilita el análisis de datos.
 *
 * Formato de eventos:
 * analyticsService.trackEvent(category, action, name, value)
 */

// ============================================
// CATEGORÍAS DE EVENTOS
// ============================================

export const CATEGORIES = {
  CTA: 'CTA',                      // Llamados a la acción
  FORM: 'Form',                    // Formularios
  NAVIGATION: 'Navigation',        // Navegación
  ENGAGEMENT: 'Engagement',        // Engagement del usuario
  CONTENT: 'Content',              // Interacción con contenido
  CONVERSION: 'Conversion',        // Conversiones
  ERROR: 'Error'                   // Errores
};

// ============================================
// EVENTOS DE CTA (Call To Action)
// ============================================

export const CTA_EVENTS = {
  // WhatsApp
  WHATSAPP_FLOAT: {
    category: CATEGORIES.CTA,
    action: 'WhatsApp Click',
    name: 'float_button'
  },
  WHATSAPP_HEADER: {
    category: CATEGORIES.CTA,
    action: 'WhatsApp Click',
    name: 'header'
  },
  WHATSAPP_FOOTER: {
    category: CATEGORIES.CTA,
    action: 'WhatsApp Click',
    name: 'footer'
  },
  WHATSAPP_CTA_SECTION: {
    category: CATEGORIES.CTA,
    action: 'WhatsApp Click',
    name: 'cta_section'
  },

  // Botones generales
  BUTTON_CONTACT: {
    category: CATEGORIES.CTA,
    action: 'Button Click',
    name: 'contact_button'
  },
  BUTTON_QUOTE: {
    category: CATEGORIES.CTA,
    action: 'Button Click',
    name: 'quote_button'
  },
  BUTTON_DEMO: {
    category: CATEGORIES.CTA,
    action: 'Button Click',
    name: 'demo_button'
  },
  BUTTON_LEARN_MORE: {
    category: CATEGORIES.CTA,
    action: 'Button Click',
    name: 'learn_more'
  }
};

// ============================================
// EVENTOS DE FORMULARIOS
// ============================================

export const FORM_EVENTS = {
  // Contact form
  CONTACT_START: {
    category: CATEGORIES.FORM,
    action: 'Form Start',
    name: 'contact_form'
  },
  CONTACT_SUBMIT: {
    category: CATEGORIES.FORM,
    action: 'Submit',
    name: 'contact_form'
  },
  CONTACT_SUCCESS: {
    category: CATEGORIES.FORM,
    action: 'Success',
    name: 'contact_form'
  },
  CONTACT_ERROR: {
    category: CATEGORIES.FORM,
    action: 'Error',
    name: 'contact_form'
  },

  // Quote form
  QUOTE_START: {
    category: CATEGORIES.FORM,
    action: 'Form Start',
    name: 'quote_form'
  },
  QUOTE_SUBMIT: {
    category: CATEGORIES.FORM,
    action: 'Submit',
    name: 'quote_form'
  },
  QUOTE_SUCCESS: {
    category: CATEGORIES.FORM,
    action: 'Success',
    name: 'quote_form'
  },

  // Newsletter
  NEWSLETTER_SUBMIT: {
    category: CATEGORIES.FORM,
    action: 'Submit',
    name: 'newsletter_form'
  }
};

// ============================================
// EVENTOS DE NAVEGACIÓN
// ============================================

export const NAVIGATION_EVENTS = {
  // Links internos
  INTERNAL_LINK: {
    category: CATEGORIES.NAVIGATION,
    action: 'Link Click',
    name: 'internal'
  },

  // Links externos
  EXTERNAL_LINK: {
    category: CATEGORIES.NAVIGATION,
    action: 'Link Click',
    name: 'outbound'
  },

  // Menu
  MENU_OPEN: {
    category: CATEGORIES.NAVIGATION,
    action: 'Menu',
    name: 'open'
  },
  MENU_CLOSE: {
    category: CATEGORIES.NAVIGATION,
    action: 'Menu',
    name: 'close'
  },

  // Footer
  FOOTER_LINK: {
    category: CATEGORIES.NAVIGATION,
    action: 'Link Click',
    name: 'footer'
  },

  // Social Media
  SOCIAL_FACEBOOK: {
    category: CATEGORIES.NAVIGATION,
    action: 'Social Click',
    name: 'facebook'
  },
  SOCIAL_INSTAGRAM: {
    category: CATEGORIES.NAVIGATION,
    action: 'Social Click',
    name: 'instagram'
  },
  SOCIAL_LINKEDIN: {
    category: CATEGORIES.NAVIGATION,
    action: 'Social Click',
    name: 'linkedin'
  },
  SOCIAL_YOUTUBE: {
    category: CATEGORIES.NAVIGATION,
    action: 'Social Click',
    name: 'youtube'
  }
};

// ============================================
// EVENTOS DE ENGAGEMENT
// ============================================

export const ENGAGEMENT_EVENTS = {
  // Scroll depth
  SCROLL_25: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Scroll Depth',
    name: '25%'
  },
  SCROLL_50: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Scroll Depth',
    name: '50%'
  },
  SCROLL_75: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Scroll Depth',
    name: '75%'
  },
  SCROLL_100: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Scroll Depth',
    name: '100%'
  },

  // Time on page
  TIME_30S: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Time on Page',
    name: '30_seconds'
  },
  TIME_1M: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Time on Page',
    name: '1_minute'
  },
  TIME_3M: {
    category: CATEGORIES.ENGAGEMENT,
    action: 'Time on Page',
    name: '3_minutes'
  }
};

// ============================================
// EVENTOS DE CONTENIDO
// ============================================

export const CONTENT_EVENTS = {
  // Downloads
  DOWNLOAD_PDF: (fileName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Download',
    name: `PDF: ${fileName}`
  }),
  DOWNLOAD_BROCHURE: {
    category: CATEGORIES.CONTENT,
    action: 'Download',
    name: 'brochure'
  },
  DOWNLOAD_CASE_STUDY: {
    category: CATEGORIES.CONTENT,
    action: 'Download',
    name: 'case_study'
  },

  // Videos
  VIDEO_PLAY: (videoName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Video Play',
    name: videoName
  }),
  VIDEO_PAUSE: (videoName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Video Pause',
    name: videoName
  }),
  VIDEO_COMPLETE: (videoName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Video Complete',
    name: videoName
  }),
  VIDEO_25: (videoName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Video 25%',
    name: videoName
  }),
  VIDEO_50: (videoName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Video 50%',
    name: videoName
  }),
  VIDEO_75: (videoName) => ({
    category: CATEGORIES.CONTENT,
    action: 'Video 75%',
    name: videoName
  }),

  // Images
  IMAGE_GALLERY_VIEW: {
    category: CATEGORIES.CONTENT,
    action: 'Gallery View',
    name: 'image'
  },
  IMAGE_ZOOM: {
    category: CATEGORIES.CONTENT,
    action: 'Image Zoom',
    name: 'zoom'
  }
};

// ============================================
// EVENTOS DE CONVERSIÓN
// ============================================

export const CONVERSION_EVENTS = {
  // Leads
  LEAD_CAPTURED: {
    category: CATEGORIES.CONVERSION,
    action: 'Lead Captured',
    name: 'contact_form'
  },
  LEAD_QUALIFIED: {
    category: CATEGORIES.CONVERSION,
    action: 'Lead Qualified',
    name: 'mautic'
  },

  // Quote requests
  QUOTE_REQUEST: {
    category: CATEGORIES.CONVERSION,
    action: 'Quote Request',
    name: 'quote_form'
  },

  // Demo requests
  DEMO_REQUEST: {
    category: CATEGORIES.CONVERSION,
    action: 'Demo Request',
    name: 'demo_form'
  },

  // WhatsApp conversation started
  WHATSAPP_CONVERSATION: {
    category: CATEGORIES.CONVERSION,
    action: 'WhatsApp Conversation Started',
    name: 'float_button'
  }
};

// ============================================
// EVENTOS DE ERROR
// ============================================

export const ERROR_EVENTS = {
  FORM_VALIDATION: {
    category: CATEGORIES.ERROR,
    action: 'Form Validation',
    name: 'validation_error'
  },
  FORM_SUBMISSION: {
    category: CATEGORIES.ERROR,
    action: 'Form Submission',
    name: 'submission_error'
  },
  API_ERROR: {
    category: CATEGORIES.ERROR,
    action: 'API Error',
    name: 'api_request_failed'
  },
  RESOURCE_LOAD: {
    category: CATEGORIES.ERROR,
    action: 'Resource Load',
    name: 'resource_failed'
  }
};

// ============================================
// CUSTOM DIMENSIONS
// ============================================

export const CUSTOM_DIMENSIONS = {
  USER_TYPE: 1,         // visitor, lead, customer
  INDUSTRY: 2,          // manufacturing, retail, services, etc.
  COMPANY_SIZE: 3,      // small, medium, large
  LEAD_SOURCE: 4,       // organic, paid, referral, direct
  MAUTIC_LEAD_ID: 5,    // ID del lead en Mautic
  JOURNEY_STAGE: 6      // awareness, consideration, decision, retention
};

// ============================================
// USER JOURNEY STAGES
// ============================================

export const JOURNEY_STAGES = {
  AWARENESS: 'awareness',           // Conociendo la marca
  CONSIDERATION: 'consideration',   // Evaluando soluciones
  DECISION: 'decision',            // Listo para comprar
  RETENTION: 'retention'           // Cliente existente
};

// ============================================
// USER TYPES
// ============================================

export const USER_TYPES = {
  VISITOR: 'visitor',       // Visitante anónimo
  LEAD: 'lead',            // Lead identificado
  CUSTOMER: 'customer',    // Cliente activo
  PARTNER: 'partner'       // Socio/Partner
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Helper para crear eventos personalizados manteniendo la estructura
 */
export const createCustomEvent = (category, action, name = null, value = null) => {
  return {
    category,
    action,
    name,
    value
  };
};

/**
 * Helper para track de eventos con la estructura correcta
 */
export const trackEventFromConfig = (analyticsService, eventConfig, value = null) => {
  const { category, action, name } = eventConfig;
  analyticsService.trackEvent(category, action, name, value);
};

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  CATEGORIES,
  CTA_EVENTS,
  FORM_EVENTS,
  NAVIGATION_EVENTS,
  ENGAGEMENT_EVENTS,
  CONTENT_EVENTS,
  CONVERSION_EVENTS,
  ERROR_EVENTS,
  CUSTOM_DIMENSIONS,
  JOURNEY_STAGES,
  USER_TYPES,
  createCustomEvent,
  trackEventFromConfig
};
