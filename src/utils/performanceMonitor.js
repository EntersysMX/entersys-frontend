/**
 * Performance Monitoring Utilities
 * Herramientas para monitorear y reportar métricas de performance
 */

import { analyticsService } from '../services/analytics';
import { sentryService } from '../services/sentry';

/**
 * Performance Budget Thresholds
 * Límites recomendados basados en Silicon Valley best practices
 */
export const PERFORMANCE_BUDGETS = {
  // Tiempo de carga (ms)
  pageLoad: 3000,
  domContentLoaded: 2000,
  timeToInteractive: 3500,

  // Tamaños de recursos (KB)
  totalJS: 400,
  totalCSS: 60,
  totalImages: 1500,
  totalFonts: 100,

  // Conteo de recursos
  scriptCount: 10,
  stylesheetCount: 5,
  imageCount: 50,
  fontCount: 4,

  // Core Web Vitals
  LCP: 2500,
  INP: 200,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 800,
};

/**
 * Calcula el tamaño total de recursos por tipo
 */
export const calculateResourceSizes = () => {
  const resources = performance.getEntriesByType('resource');

  const sizes = {
    js: 0,
    css: 0,
    images: 0,
    fonts: 0,
    other: 0,
  };

  const counts = {
    scripts: 0,
    stylesheets: 0,
    images: 0,
    fonts: 0,
  };

  resources.forEach((resource) => {
    const size = resource.transferSize || 0;
    const url = resource.name.toLowerCase();

    if (url.endsWith('.js') || url.includes('.js?')) {
      sizes.js += size;
      counts.scripts++;
    } else if (url.endsWith('.css') || url.includes('.css?')) {
      sizes.css += size;
      counts.stylesheets++;
    } else if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)(\?|$)/)) {
      sizes.images += size;
      counts.images++;
    } else if (url.match(/\.(woff|woff2|ttf|otf)(\?|$)/)) {
      sizes.fonts += size;
      counts.fonts++;
    } else {
      sizes.other += size;
    }
  });

  return { sizes, counts };
};

/**
 * Convierte bytes a kilobytes
 */
const bytesToKB = (bytes) => Math.round(bytes / 1024);

/**
 * Verifica si se cumplen los Performance Budgets
 */
export const checkPerformanceBudgets = () => {
  const { sizes, counts } = calculateResourceSizes();
  const violations = [];

  // Verificar tamaños
  const jsKB = bytesToKB(sizes.js);
  const cssKB = bytesToKB(sizes.css);
  const imagesKB = bytesToKB(sizes.images);
  const fontsKB = bytesToKB(sizes.fonts);

  if (jsKB > PERFORMANCE_BUDGETS.totalJS) {
    violations.push({
      type: 'size',
      resource: 'JavaScript',
      actual: jsKB,
      budget: PERFORMANCE_BUDGETS.totalJS,
      unit: 'KB',
    });
  }

  if (cssKB > PERFORMANCE_BUDGETS.totalCSS) {
    violations.push({
      type: 'size',
      resource: 'CSS',
      actual: cssKB,
      budget: PERFORMANCE_BUDGETS.totalCSS,
      unit: 'KB',
    });
  }

  if (imagesKB > PERFORMANCE_BUDGETS.totalImages) {
    violations.push({
      type: 'size',
      resource: 'Images',
      actual: imagesKB,
      budget: PERFORMANCE_BUDGETS.totalImages,
      unit: 'KB',
    });
  }

  if (fontsKB > PERFORMANCE_BUDGETS.totalFonts) {
    violations.push({
      type: 'size',
      resource: 'Fonts',
      actual: fontsKB,
      budget: PERFORMANCE_BUDGETS.totalFonts,
      unit: 'KB',
    });
  }

  // Verificar conteos
  if (counts.scripts > PERFORMANCE_BUDGETS.scriptCount) {
    violations.push({
      type: 'count',
      resource: 'Scripts',
      actual: counts.scripts,
      budget: PERFORMANCE_BUDGETS.scriptCount,
      unit: 'files',
    });
  }

  if (counts.stylesheets > PERFORMANCE_BUDGETS.stylesheetCount) {
    violations.push({
      type: 'count',
      resource: 'Stylesheets',
      actual: counts.stylesheets,
      budget: PERFORMANCE_BUDGETS.stylesheetCount,
      unit: 'files',
    });
  }

  if (counts.images > PERFORMANCE_BUDGETS.imageCount) {
    violations.push({
      type: 'count',
      resource: 'Images',
      actual: counts.images,
      budget: PERFORMANCE_BUDGETS.imageCount,
      unit: 'files',
    });
  }

  return {
    passed: violations.length === 0,
    violations,
    summary: {
      sizes: {
        js: jsKB,
        css: cssKB,
        images: imagesKB,
        fonts: fontsKB,
      },
      counts,
    },
  };
};

/**
 * Genera un reporte detallado de performance
 */
export const generatePerformanceReport = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByType('paint');
  const budgetCheck = checkPerformanceBudgets();

  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,

    // Timing metrics
    timing: {
      domContentLoaded: Math.round(navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart) || 0,
      loadComplete: Math.round(navigation?.loadEventEnd - navigation?.fetchStart) || 0,
      domInteractive: Math.round(navigation?.domInteractive - navigation?.fetchStart) || 0,
      TTFB: Math.round(navigation?.responseStart - navigation?.requestStart) || 0,
    },

    // Paint metrics
    paint: {
      FP: Math.round(paint.find((p) => p.name === 'first-paint')?.startTime) || 0,
      FCP: Math.round(paint.find((p) => p.name === 'first-contentful-paint')?.startTime) || 0,
    },

    // Resource metrics
    resources: budgetCheck.summary,

    // Budget violations
    budgetCheck: {
      passed: budgetCheck.passed,
      violations: budgetCheck.violations,
    },

    // Connection info
    connection: navigator.connection
      ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData,
        }
      : null,
  };

  return report;
};

/**
 * Reporta violaciones de Performance Budget a analytics y Sentry
 */
export const reportPerformanceViolations = () => {
  const budgetCheck = checkPerformanceBudgets();

  if (!budgetCheck.passed) {
    // Reportar a Analytics
    analyticsService.trackEvent(
      'Performance Budget',
      'Violation',
      'Multiple violations detected',
      budgetCheck.violations.length
    );

    // Reportar cada violación individualmente
    budgetCheck.violations.forEach((violation) => {
      analyticsService.trackEvent(
        'Performance Budget',
        `${violation.type.toUpperCase()}: ${violation.resource}`,
        `Actual: ${violation.actual}${violation.unit}, Budget: ${violation.budget}${violation.unit}`,
        violation.actual
      );

      // Si la violación es crítica (>50% sobre el budget), reportar a Sentry
      const overagePercent = ((violation.actual - violation.budget) / violation.budget) * 100;
      if (overagePercent > 50) {
        sentryService.captureMessage(
          `Critical Performance Budget Violation: ${violation.resource}`,
          'warning',
          {
            performance: {
              ...violation,
              overagePercent: Math.round(overagePercent),
            },
          }
        );
      }
    });

    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.warn('⚠️ Performance Budget Violations:', budgetCheck.violations);
    }
  }

  return budgetCheck;
};

/**
 * Monitorea performance de forma continua
 */
export const startPerformanceMonitoring = () => {
  // Verificar budgets cuando la página termina de cargar
  window.addEventListener('load', () => {
    setTimeout(() => {
      reportPerformanceViolations();

      // Generar reporte completo
      const report = generatePerformanceReport();

      // Log en desarrollo
      if (import.meta.env.DEV) {
        console.log('📊 Performance Report:', report);
      }

      // Enviar métricas a analytics
      analyticsService.trackEvent(
        'Performance Report',
        'Page Load Complete',
        window.location.pathname,
        report.timing.loadComplete
      );
    }, 3000); // Esperar 3 segundos para que todos los recursos terminen
  });
};

/**
 * Obtener métricas de memoria (si está disponible)
 */
export const getMemoryMetrics = () => {
  if (performance.memory) {
    return {
      usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
    };
  }
  return null;
};

/**
 * Detectar problemas de performance en tiempo real
 */
export const detectPerformanceIssues = () => {
  const issues = [];

  // Verificar Long Tasks (si está disponible)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 100) {
            issues.push({
              type: 'Long Task',
              duration: Math.round(entry.duration),
              startTime: Math.round(entry.startTime),
            });

            analyticsService.trackEvent(
              'Performance Issue',
              'Long Task Detected',
              `Duration: ${Math.round(entry.duration)}ms`,
              Math.round(entry.duration)
            );
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Browser doesn't support longtask
    }
  }

  return issues;
};

export default {
  PERFORMANCE_BUDGETS,
  calculateResourceSizes,
  checkPerformanceBudgets,
  generatePerformanceReport,
  reportPerformanceViolations,
  startPerformanceMonitoring,
  getMemoryMetrics,
  detectPerformanceIssues,
};
