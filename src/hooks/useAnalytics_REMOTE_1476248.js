import { useEffect, useState } from 'react';

export const useAnalytics = () => {
  const [matomoLoaded, setMatomoLoaded] = useState(false);

  useEffect(() => {
    if (!window._paq && !matomoLoaded) {
      window._paq = window._paq || [];
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setTrackerUrl', 'https://analytics.entersys.mx/matomo.php']);
      window._paq.push(['setSiteId', '1']);

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://analytics.entersys.mx/matomo.js';
      script.onload = () => setMatomoLoaded(true);

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }
  }, [matomoLoaded]);

  const trackEvent = (category, action, name = '', value = 0) => {
    if (window._paq && matomoLoaded) {
      window._paq.push(['trackEvent', category, action, name, value]);
    }
  };

  const trackGoal = (goalId, revenue = 0) => {
    if (window._paq && matomoLoaded) {
      window._paq.push(['trackGoal', goalId, revenue]);
    }
  };

  const trackPageView = () => {
    if (window._paq && matomoLoaded) {
      window._paq.push(['trackPageView']);
    }
  };

  // *** NUEVO *** Función específica para tracking de WhatsApp
  const trackWhatsAppClick = (source = 'unknown', additionalData = {}) => {
    // Track en Matomo frontend
    trackEvent('WhatsApp', 'Click', source, 1);

    // Track en backend API para CRM sync
    analyticsAPI.trackEvent({
      category: 'WhatsApp',
      action: 'Click',
      name: `WhatsApp Click - ${source}`,
      value: 1,
      url: window.location.href,
      ...additionalData
    });

    console.log('📱 WhatsApp click tracked:', source);
  };

  // *** NUEVO *** Función para actualizar score del lead
  const updateLeadScore = async (email, action, scoreDelta = 5) => {
    try {
      const response = await fetch(`https://api.dev.entersys.mx/api/v1/crm/lead/${encodeURIComponent(email)}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: action,
          score_delta: scoreDelta,
          metadata: {
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        })
      });

      const result = await response.json();
      console.log('📈 Lead score updated:', result);
      return result;
    } catch (error) {
      console.error('❌ Error updating lead score:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    trackEvent,
    trackGoal,
    trackPageView,
    trackWhatsAppClick,  // NUEVO
    updateLeadScore,     // NUEVO
    matomoLoaded
  };
};

export const analyticsAPI = {
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
  }
};