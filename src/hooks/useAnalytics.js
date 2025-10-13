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