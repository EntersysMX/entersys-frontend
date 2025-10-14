/**
 * Enhanced Web Vitals Tracking
 * Monitorea métricas de performance críticas usando web-vitals library de Google
 *
 * Core Web Vitals (2024):
 * - LCP (Largest Contentful Paint): Carga visual principal
 * - INP (Interaction to Next Paint): Interactividad (reemplaza FID desde 2024)
 * - CLS (Cumulative Layout Shift): Estabilidad visual
 *
 * Métricas Adicionales:
 * - FCP (First Contentful Paint): Primera pintura con contenido
 * - TTFB (Time to First Byte): Tiempo de respuesta del servidor
 *
 * Nota: FID fue deprecado en web-vitals v4 y reemplazado por INP
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { analyticsService } from '../services/analytics';
import { sentryService } from '../services/sentry';

// Thresholds para rating de métricas
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  INP: { good: 200, needsImprovement: 500 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

/**
 * Determina el rating de una métrica
 */
const getRating = (metricName, value) => {
  const threshold = THRESHOLDS[metricName];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

/**
 * Obtiene información del dispositivo y conexión
 */
const getDeviceInfo = () => {
  const info = {
    deviceType: 'desktop',
    connectionType: 'unknown',
    effectiveType: 'unknown',
  };

  // Detectar tipo de dispositivo
  if (/mobile/i.test(navigator.userAgent)) {
    info.deviceType = 'mobile';
  } else if (/tablet/i.test(navigator.userAgent)) {
    info.deviceType = 'tablet';
  }

  // Información de conexión (Network Information API)
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      info.effectiveType = connection.effectiveType || 'unknown';
      info.connectionType = connection.type || 'unknown';
    }
  }

  return info;
};

/**
 * Callback para enviar métricas a analytics y sentry
 */
const sendToAnalytics = (metric) => {
  const { name, value, rating, id, navigationType } = metric;
  const roundedValue = Math.round(value);
  const deviceInfo = getDeviceInfo();

  try {
    // 1. Enviar a Matomo Analytics
    analyticsService.trackEvent(
      'Web Vitals',
      name,
      rating,
      roundedValue
    );

    // 2. Enviar contexto adicional a analytics
    analyticsService.trackEvent(
      'Web Vitals Details',
      name,
      JSON.stringify({
        value: roundedValue,
        rating,
        device: deviceInfo.deviceType,
        connection: deviceInfo.effectiveType,
        navigationType,
      }),
      roundedValue
    );

    // 3. Si la métrica es pobre, reportar a Sentry para investigación
    if (rating === 'poor') {
      sentryService.captureMessage(
        `Poor ${name} detected`,
        'warning',
        {
          webVitals: {
            metric: name,
            value: roundedValue,
            rating,
            id,
            navigationType,
            ...deviceInfo,
          },
        }
      );
    }

    // 4. Log en desarrollo
    if (import.meta.env.DEV) {
      const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${emoji} ${name}:`, {
        value: roundedValue,
        rating,
        device: deviceInfo.deviceType,
        connection: deviceInfo.effectiveType,
      });
    }
  } catch (error) {
    // Silenciar errores para no afectar la experiencia del usuario
    if (import.meta.env.DEV) {
      console.error('Error sending web vitals:', error);
    }
  }
};

/**
 * Tracking adicional de métricas personalizadas
 */
const trackCustomMetrics = () => {
  // 1. Time to Interactive (TTI) aproximado
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input') {
            const tti = entry.startTime;
            analyticsService.trackEvent(
              'Web Vitals',
              'TTI',
              getRating('FID', tti),
              Math.round(tti)
            );
          }
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Browser doesn't support
    }
  }

  // 2. Page Load Time
  window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    analyticsService.trackEvent(
      'Web Vitals',
      'Page Load Time',
      pageLoadTime < 3000 ? 'good' : pageLoadTime < 5000 ? 'needs-improvement' : 'poor',
      Math.round(pageLoadTime)
    );
  });

  // 3. DOM Content Loaded
  window.addEventListener('DOMContentLoaded', () => {
    const perfData = performance.timing;
    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;

    analyticsService.trackEvent(
      'Web Vitals',
      'DOM Content Loaded',
      domContentLoaded < 1500 ? 'good' : domContentLoaded < 2500 ? 'needs-improvement' : 'poor',
      Math.round(domContentLoaded)
    );
  });
};

/**
 * Tracking de Resource Timing
 */
const trackResourceTiming = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Solo trackear recursos lentos
        if (entry.duration > 1000) {
          analyticsService.trackEvent(
            'Resource Timing',
            'Slow Resource',
            entry.name,
            Math.round(entry.duration)
          );
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  } catch (e) {
    // Browser doesn't support
  }
};

/**
 * Tracking de Long Tasks
 */
const trackLongTasks = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Long tasks son tareas que bloquean el thread principal por >50ms
        analyticsService.trackEvent(
          'Performance',
          'Long Task',
          'Main Thread Blocked',
          Math.round(entry.duration)
        );

        // Si es crítico (>200ms), reportar a Sentry
        if (entry.duration > 200) {
          sentryService.captureMessage(
            'Critical Long Task detected',
            'warning',
            {
              performance: {
                duration: Math.round(entry.duration),
                startTime: Math.round(entry.startTime),
              },
            }
          );
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Browser doesn't support
  }
};

/**
 * Inicializa el tracking de Web Vitals
 */
export const initWebVitals = () => {
  // Solo trackear si está habilitado
  const isEnabled = import.meta.env.VITE_ENABLE_WEB_VITALS === 'true' || import.meta.env.PROD;

  if (!isEnabled) {
    console.log('📊 Web Vitals tracking disabled');
    return;
  }

  try {
    // Core Web Vitals (oficiales de Google)
    onLCP(sendToAnalytics);  // Largest Contentful Paint
    onINP(sendToAnalytics);  // Interaction to Next Paint (reemplaza FID desde web-vitals v4)
    onCLS(sendToAnalytics);  // Cumulative Layout Shift

    // Métricas adicionales
    onFCP(sendToAnalytics);  // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte

    // Métricas personalizadas
    trackCustomMetrics();

    // Resource y Long Tasks (solo en producción para no saturar)
    if (import.meta.env.PROD) {
      trackResourceTiming();
      trackLongTasks();
    }

    if (import.meta.env.DEV) {
      console.log('✅ Web Vitals tracking initialized');
    }
  } catch (error) {
    // Silenciar errores en producción
    if (import.meta.env.DEV) {
      console.error('❌ Web Vitals initialization error:', error);
    }
  }
};

export default initWebVitals;
