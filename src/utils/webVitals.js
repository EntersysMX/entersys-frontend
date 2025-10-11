/**
 * Web Vitals Tracking
 * Monitorea métricas de performance críticas (Core Web Vitals)
 * LCP, FID, CLS, FCP, TTFB
 */

import { analyticsService } from '../services/analytics';

/**
 * Envía métricas de Web Vitals a analytics
 */
const sendToAnalytics = (metric) => {
  // Formato de la métrica
  const { name, value, id, rating } = metric;

  // Enviar a analytics service
  try {
    analyticsService.trackEvent('Web Vitals', name, rating, Math.round(value));
  } catch (error) {
    // Silenciar errores
  }

  // Log solo en desarrollo si está habilitado explícitamente
  if (process.env.NODE_ENV === 'development' && process.env.VITE_WEB_VITALS_DEBUG === 'true') {
    console.log(`📊 ${name}:`, {
      value: Math.round(value),
      rating,
      id
    });
  }
};

/**
 * Obtiene FCP (First Contentful Paint)
 */
const getFCP = () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        const metric = {
          name: 'FCP',
          value: entry.startTime,
          id: entry.entryType,
          rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
        };
        sendToAnalytics(metric);
        observer.disconnect();
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    // Browser doesn't support this API
  }
};

/**
 * Obtiene LCP (Largest Contentful Paint)
 */
const getLCP = () => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    const metric = {
      name: 'LCP',
      value: lastEntry.renderTime || lastEntry.loadTime,
      id: lastEntry.id || lastEntry.url,
      rating: lastEntry.renderTime < 2500 ? 'good' : lastEntry.renderTime < 4000 ? 'needs-improvement' : 'poor'
    };

    sendToAnalytics(metric);
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Browser doesn't support this API
  }
};

/**
 * Obtiene FID (First Input Delay)
 */
const getFID = () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const metric = {
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        id: entry.entryType,
        rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
      };
      sendToAnalytics(metric);
    }
  });

  try {
    observer.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // Browser doesn't support this API
  }
};

/**
 * Obtiene CLS (Cumulative Layout Shift)
 */
const getCLS = () => {
  let clsValue = 0;
  let clsEntries = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Browser doesn't support this API
  }

  // Enviar CLS cuando la página se oculta
  const sendCLS = () => {
    const metric = {
      name: 'CLS',
      value: clsValue,
      id: 'layout-shift',
      rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
    };
    sendToAnalytics(metric);
    observer.disconnect();
  };

  // Enviar al salir de la página
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendCLS();
    }
  });

  // Enviar antes de unload
  window.addEventListener('pagehide', sendCLS);
};

/**
 * Obtiene TTFB (Time to First Byte)
 */
const getTTFB = () => {
  try {
    const [navigationEntry] = performance.getEntriesByType('navigation');
    if (navigationEntry) {
      const metric = {
        name: 'TTFB',
        value: navigationEntry.responseStart,
        id: 'navigation',
        rating: navigationEntry.responseStart < 800 ? 'good' : navigationEntry.responseStart < 1800 ? 'needs-improvement' : 'poor'
      };
      sendToAnalytics(metric);
    }
  } catch (e) {
    // Browser doesn't support this API
  }
};

/**
 * Inicializa el tracking de Web Vitals
 */
export const initWebVitals = () => {
  // Solo en producción
  if (process.env.NODE_ENV === 'production') {
    // Log solo en desarrollo para depuración
    if (process.env.NODE_ENV !== 'production') {
      console.log('📊 Web Vitals tracking initialized');
    }

    try {
      getFCP();
      getLCP();
      getFID();
      getCLS();
      getTTFB();
    } catch (error) {
      // Silenciar errores en producción
      if (process.env.NODE_ENV !== 'production') {
        console.error('Web Vitals error:', error);
      }
    }
  }
};

export default initWebVitals;
