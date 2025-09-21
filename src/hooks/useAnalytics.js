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

  return { trackEvent, trackGoal, matomoLoaded };
};

export const analyticsAPI = {
  async captureLead(leadData) {
    try {
      const response = await fetch('https://api.dev.entersys.mx/api/v1/analytics/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};