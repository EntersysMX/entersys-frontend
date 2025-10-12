/**
 * Error Handler Utilities
 * Suppresses browser extension errors and other non-critical issues
 */

/**
 * Suppress browser extension errors that are not caused by our application
 * Common errors from Chrome extensions, AdBlockers, etc.
 */
export const setupErrorSuppression = () => {
  // Suppress runtime.lastError messages (Chrome extension errors)
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args) => {
    const message = args.join(' ').toLowerCase();

    // List of patterns to suppress
    const suppressPatterns = [
      'the message port closed before a response was received',
      'unchecked runtime.lasterror',
      'chrome.runtime',
      'extension context invalidated',
      'could not establish connection',
      'receiving end does not exist'
    ];

    // Check if this is a browser extension error
    const shouldSuppress = suppressPatterns.some(pattern =>
      message.includes(pattern)
    );

    if (shouldSuppress) {
      // Log to console for debugging but don't display as error
      console.debug('🔇 Suppressed browser extension error:', ...args);
      return;
    }

    // For all other errors, use original console.error
    originalConsoleError.apply(console, args);
  };

  // Suppress React warnings from third-party libraries
  console.warn = (...args) => {
    const message = args.join(' ').toLowerCase();

    // List of warning patterns to suppress
    const suppressWarningPatterns = [
      'received `true` for a non-boolean attribute `jsx`',
      'received true for a non-boolean attribute jsx'
    ];

    // Check if this is a third-party library warning
    const shouldSuppress = suppressWarningPatterns.some(pattern =>
      message.includes(pattern)
    );

    if (shouldSuppress) {
      // Suppress warning from Relume UI library
      console.debug('🔇 Suppressed third-party library warning:', ...args);
      return;
    }

    // For all other warnings, use original console.warn
    originalConsoleWarn.apply(console, args);
  };

  // Global error handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message?.toLowerCase() || '';

    if (message.includes('message port closed') ||
        message.includes('chrome.runtime')) {
      console.debug('🔇 Suppressed unhandled promise rejection from extension:', event.reason);
      event.preventDefault(); // Prevent default browser error handling
      return;
    }
  });

  // Global error handler for general errors
  window.addEventListener('error', (event) => {
    const message = event.message?.toLowerCase() || '';

    if (message.includes('message port closed') ||
        message.includes('chrome.runtime')) {
      console.debug('🔇 Suppressed global error from extension:', event.message);
      event.preventDefault();
      return;
    }
  });

  console.log('🛡️ Error suppression initialized');
};

/**
 * Initialize error tracking for our application
 * This tracks only legitimate errors, not extension errors
 */
export const initializeErrorTracking = () => {
  window.addEventListener('error', (event) => {
    // Only track errors from our domain
    if (event.filename &&
        (event.filename.includes('dev.entersys.mx') ||
         event.filename.includes('localhost'))) {

      console.error('🐛 Application Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });

      // Here you could send to analytics/monitoring service
      // analyticsAPI.trackEvent({
      //   category: 'Error',
      //   action: 'JavaScript Error',
      //   name: event.message,
      //   value: 1
      // });
    }
  });
};