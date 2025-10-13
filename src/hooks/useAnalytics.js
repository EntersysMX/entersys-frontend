import { useEffect } from 'react';
import { analyticsService } from '../services/analytics';

/**
 * Hook simplificado para analytics
 * REFACTORIZADO: Ahora es un wrapper del analyticsService para evitar código duplicado
 *
 * @deprecated Considerar usar analyticsService directamente en lugar de este hook
 */
export const useAnalytics = () => {
  useEffect(() => {
    // Inicializar analytics al montar el componente
    analyticsService.initialize();
  }, []);

  return {
    // Métodos básicos de tracking
    trackEvent: (category, action, name = '', value = 0) => {
      analyticsService.trackEvent(category, action, name, value);
    },
    trackPageView: (customTitle = null) => {
      analyticsService.trackPageView(customTitle);
    },
    trackFormSubmission: (formName) => {
      analyticsService.trackFormSubmission(formName);
    },
    trackWhatsAppClick: (source) => {
      analyticsService.trackWhatsAppClick(source);
    },
    trackButtonClick: (buttonName, section) => {
      analyticsService.trackButtonClick(buttonName, section);
    },

    // NUEVO: Custom Dimensions (Fase 2)
    setCustomDimension: (id, value) => {
      analyticsService.setCustomDimension(id, value);
    },
    setCustomDimensions: (dimensions) => {
      analyticsService.setCustomDimensions(dimensions);
    },
    trackUserContext: (userData) => {
      analyticsService.trackUserContext(userData);
    },

    // NUEVO: Content Tracking (Fase 2)
    trackDownload: (fileName, fileType = 'PDF') => {
      analyticsService.trackDownload(fileName, fileType);
    },
    trackVideo: (action, videoName, timeInSeconds = null) => {
      analyticsService.trackVideo(action, videoName, timeInSeconds);
    },
    trackMedia: (mediaType, action, mediaName, value = null) => {
      analyticsService.trackMedia(mediaType, action, mediaName, value);
    },

    // NUEVO: Navigation Tracking (Fase 2)
    trackLink: (url, linkType = 'outbound') => {
      analyticsService.trackLink(url, linkType);
    },

    // NUEVO: Scroll Tracking (Fase 2)
    // Nota: setupScrollTracking() se llama automáticamente en App.jsx
    trackScrollDepth: (percentage) => {
      analyticsService.trackScrollDepth(percentage);
    },

    // Propiedad de compatibilidad
    matomoLoaded: analyticsService.scriptLoaded
  };
};

// Mantener el analyticsAPI solo para compatibilidad hacia atrás
// Pero deprecado - usar mauticService en su lugar
export const analyticsAPI = {
  async captureLead(leadData) {
    console.warn('⚠️ analyticsAPI.captureLead is deprecated. Use mauticService.captureLead instead');
    // Fallback básico por si algo aún lo usa
    return {
      success: false,
      error: 'Deprecated - use mauticService instead',
      deprecated: true
    };
  }
};