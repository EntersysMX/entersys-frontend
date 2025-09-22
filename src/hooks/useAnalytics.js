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
<<<<<<< Updated upstream
  async captureLead(leadData) {
    console.warn('⚠️ analyticsAPI.captureLead is deprecated. Use mauticService.captureLead instead');
    // Fallback básico por si algo aún lo usa
    return {
      success: false,
      error: 'Deprecated - use mauticService instead',
      deprecated: true
    };
=======
  async captureLead(leadData, signal = null) {
    try {
      console.log('🔄 Sending lead to API:', leadData);

      // Create timeout promise for older browsers
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout after 15 seconds')), 15000);
      });

      // Create fetch promise - Use JSON with CORS headers
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(leadData)
      };

      // Add signal if supported and provided
      if (signal) {
        fetchOptions.signal = signal;
      }

      const fetchPromise = fetch('https://api.dev.entersys.mx/api/v1/analytics/lead-capture', fetchOptions);

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API Success Response:', result);

      return {
        ...result,
        success: result.success !== false // Ensure success is boolean
      };

    } catch (error) {
      console.error('❌ captureLead error:', error);

      // Return consistent error format
      return {
        success: false,
        error: error.message || 'Network error occurred',
        timestamp: new Date().toISOString()
      };
    }
  },

  // *** NUEVO *** Función para tracking de eventos específicos
  async trackEvent(eventData) {
    try {
      console.log('📊 Tracking event:', eventData);

      const response = await fetch('https://api.dev.entersys.mx/api/v1/analytics/track-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(eventData),
        signal: AbortSignal.timeout(10000) // 10 seconds
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Event tracked:', result);
        return result;
      } else {
        console.warn('⚠️ Event tracking failed:', response.status);
        return { success: false, error: `HTTP ${response.status}` };
      }

    } catch (error) {
      console.error('❌ Event tracking error:', error);
      return { success: false, error: error.message };
    }
  },

  // *** NUEVO *** Función para tracking de conversiones
  async trackConversion(conversionData) {
    try {
      const response = await fetch('https://api.dev.entersys.mx/api/v1/analytics/track-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversionData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error tracking conversion:', error);
      return { success: false, error: error.message };
    }
>>>>>>> Stashed changes
  }
};