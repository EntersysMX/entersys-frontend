import { useEffect, useState } from 'react';

/**
 * Hook simplificado para analytics básico
 * Mantiene solo Matomo para tracking básico de páginas
 */
export const useAnalytics = () => {
  const [matomoLoaded, setMatomoLoaded] = useState(false);

  useEffect(() => {
    // Solo cargar si analytics está habilitado
    if (process.env.REACT_APP_DISABLE_ANALYTICS === 'true') {
      console.log('📊 Analytics disabled by env variable');
      return;
    }

    if (!window._paq && !matomoLoaded) {
      window._paq = window._paq || [];
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setTrackerUrl', 'https://analytics.entersys.mx/matomo.php']);
      window._paq.push(['setSiteId', '1']);

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://analytics.entersys.mx/matomo.js';
      script.onload = () => {
        setMatomoLoaded(true);
        console.log('✅ Matomo analytics loaded');
      };
      script.onerror = () => {
        console.warn('⚠️ Matomo analytics failed to load');
      };

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }
  }, [matomoLoaded]);

  const trackEvent = (category, action, name = '', value = 0) => {
    if (window._paq && matomoLoaded) {
      window._paq.push(['trackEvent', category, action, name, value]);
      console.log(`📊 Event tracked: ${category} - ${action}`);
    } else {
      console.log(`📊 Event not tracked (Matomo not ready): ${category} - ${action}`);
    }
  };

  const trackPageView = (customTitle = null) => {
    if (window._paq && matomoLoaded) {
      if (customTitle) {
        window._paq.push(['setDocumentTitle', customTitle]);
      }
      window._paq.push(['trackPageView']);
      console.log('📊 Page view tracked');
    }
  };

  return {
    trackEvent,
    trackPageView,
    matomoLoaded
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