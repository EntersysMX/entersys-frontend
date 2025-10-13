/**
 * Script de Testing para Matomo Analytics
 *
 * Este script facilita el testing manual y automático de todas las funciones
 * de analytics implementadas en el sitio.
 *
 * USO:
 * 1. Abrir la consola del navegador (F12)
 * 2. Ejecutar: window.testAnalytics.runAll()
 * 3. O ejecutar tests individuales
 */

import { analyticsService } from '../services/analytics';
import { CUSTOM_DIMENSIONS, JOURNEY_STAGES, USER_TYPES } from '../config/analytics-events';

class AnalyticsTestSuite {
  constructor() {
    this.results = [];
    this.startTime = null;
  }

  /**
   * Log test result
   */
  log(testName, status, message = '') {
    const result = {
      test: testName,
      status: status ? '✅ PASS' : '❌ FAIL',
      message,
      timestamp: new Date().toISOString()
    };

    this.results.push(result);

    const color = status ? 'green' : 'red';
    console.log(
      `%c${result.status} ${testName}`,
      `color: ${color}; font-weight: bold;`,
      message
    );

    return status;
  }

  /**
   * Test 1: Verificar que Analytics está cargado
   */
  testInitialization() {
    console.group('📊 Test 1: Initialization');

    const initialized = analyticsService.initialized;
    this.log('Analytics Initialized', initialized,
      initialized ? 'Service is ready' : 'Service not initialized');

    const scriptLoaded = analyticsService.scriptLoaded;
    this.log('Matomo Script Loaded', scriptLoaded,
      scriptLoaded ? 'Script loaded successfully' : 'Script not loaded');

    const paqAvailable = typeof window._paq !== 'undefined';
    this.log('_paq Global Available', paqAvailable,
      paqAvailable ? `Queue length: ${window._paq.length}` : '_paq not defined');

    console.groupEnd();

    return initialized && scriptLoaded && paqAvailable;
  }

  /**
   * Test 2: Page View Tracking
   */
  testPageView() {
    console.group('📄 Test 2: Page View Tracking');

    try {
      analyticsService.trackPageView('Test Page View');
      this.log('Track Page View', true, 'Page view event sent');
      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Track Page View', false, `Error: ${error.message}`);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 3: Event Tracking
   */
  testEventTracking() {
    console.group('🎯 Test 3: Event Tracking');

    const tests = [
      ['Test', 'Test Event', 'Test Name', null],
      ['Form', 'Submit', 'test_form', null],
      ['CTA', 'Button Click', 'test_button', 1],
    ];

    let allPassed = true;
    tests.forEach(([category, action, name, value]) => {
      try {
        analyticsService.trackEvent(category, action, name, value);
        this.log(`Event: ${category}/${action}`, true, `Name: ${name || 'none'}, Value: ${value || 'none'}`);
      } catch (error) {
        this.log(`Event: ${category}/${action}`, false, error.message);
        allPassed = false;
      }
    });

    console.groupEnd();
    return allPassed;
  }

  /**
   * Test 4: Custom Dimensions
   */
  testCustomDimensions() {
    console.group('🔍 Test 4: Custom Dimensions');

    try {
      // Test individual dimension
      analyticsService.setCustomDimension(1, 'test_user');
      this.log('Set Single Dimension', true, 'Dimension 1 = test_user');

      // Test multiple dimensions
      analyticsService.setCustomDimensions({
        1: USER_TYPES.LEAD,
        2: 'test_industry',
        3: 'medium',
        4: 'test_source',
        6: JOURNEY_STAGES.CONSIDERATION
      });
      this.log('Set Multiple Dimensions', true, '5 dimensions set');

      // Test user context (full integration)
      analyticsService.trackUserContext({
        userType: USER_TYPES.LEAD,
        industry: 'testing',
        companySize: 'small',
        leadSource: 'automated_test',
        mauticLeadId: '999999',
        journeyStage: JOURNEY_STAGES.DECISION
      });
      this.log('Track User Context', true, 'Full user context tracked');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Custom Dimensions', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 5: Form Tracking
   */
  testFormTracking() {
    console.group('📝 Test 5: Form Tracking');

    try {
      analyticsService.trackEvent('Form', 'Form Start', 'test_form');
      this.log('Form Start', true, 'Form start event sent');

      analyticsService.trackFormSubmission('test_form');
      this.log('Form Submission', true, 'Form submission event sent');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Form Tracking', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 6: Conversion Tracking
   */
  testConversions() {
    console.group('💰 Test 6: Conversion Tracking');

    try {
      analyticsService.trackConversion('Test Conversion', 100);
      this.log('Conversion', true, 'Conversion tracked with value 100');

      analyticsService.trackButtonClick('test_button', 'test_section');
      this.log('Button Click', true, 'Button click tracked');

      analyticsService.trackWhatsAppClick('automated_test');
      this.log('WhatsApp Click', true, 'WhatsApp click tracked');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Conversion Tracking', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 7: Content Tracking
   */
  testContentTracking() {
    console.group('📦 Test 7: Content Tracking');

    try {
      analyticsService.trackDownload('test-document.pdf', 'PDF');
      this.log('Download Tracking', true, 'PDF download tracked');

      analyticsService.trackVideo('Play', 'Test Video', 0);
      this.log('Video Play', true, 'Video play tracked');

      analyticsService.trackVideo('Pause', 'Test Video', 30);
      this.log('Video Pause', true, 'Video pause tracked at 30s');

      analyticsService.trackVideo('Complete', 'Test Video', 120);
      this.log('Video Complete', true, 'Video complete tracked');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Content Tracking', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 8: Scroll Tracking
   */
  testScrollTracking() {
    console.group('📜 Test 8: Scroll Tracking');

    try {
      const isEnabled = analyticsService.scrollTrackingEnabled;
      this.log('Scroll Tracking Enabled', isEnabled,
        isEnabled ? 'Auto scroll tracking is active' : 'Not enabled');

      // Manual scroll depth tracking
      [25, 50, 75, 100].forEach(percentage => {
        analyticsService.trackScrollDepth(percentage);
      });
      this.log('Manual Scroll Depths', true, '4 scroll milestones tracked');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Scroll Tracking', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 9: Link Tracking
   */
  testLinkTracking() {
    console.group('🔗 Test 9: Link Tracking');

    try {
      analyticsService.trackLink('https://example.com', 'outbound');
      this.log('External Link', true, 'Outbound link tracked');

      analyticsService.trackLink('/test', 'internal');
      this.log('Internal Link', true, 'Internal link tracked');

      analyticsService.trackLink('https://facebook.com', 'social_media');
      this.log('Social Media Link', true, 'Social link tracked');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Link Tracking', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 10: Global Window API
   */
  testWindowAPI() {
    console.group('🌐 Test 10: Window API');

    const hasAPI = typeof window.entersysAnalytics !== 'undefined';
    this.log('Window API Available', hasAPI,
      hasAPI ? 'window.entersysAnalytics exists' : 'API not exposed');

    if (hasAPI) {
      const methods = [
        'trackEvent',
        'trackWhatsApp',
        'trackForm',
        'trackButton',
        'trackPageView',
        'trackDownload',
        'trackVideo',
        'setCustomDimension',
        'trackUserContext',
        'setupScrollTracking',
        'testConnection',
        'initialize',
        'getStatus'
      ];

      let allPresent = true;
      methods.forEach(method => {
        const exists = typeof window.entersysAnalytics[method] === 'function';
        if (!exists) {
          this.log(`Method: ${method}`, false, 'Method not found');
          allPresent = false;
        }
      });

      if (allPresent) {
        this.log('All API Methods', true, `${methods.length} methods available`);
      }

      console.groupEnd();
      return allPresent;
    }

    console.groupEnd();
    return false;
  }

  /**
   * Test 11: Real-time Status Check
   */
  testStatus() {
    console.group('ℹ️  Test 11: Status Check');

    try {
      const status = {
        initialized: analyticsService.initialized,
        scriptLoaded: analyticsService.scriptLoaded,
        scrollTrackingEnabled: analyticsService.scrollTrackingEnabled,
        paqAvailable: typeof window._paq !== 'undefined',
        paqQueueLength: window._paq ? window._paq.length : 0,
        debugMode: analyticsService.debug
      };

      console.table(status);

      const allGood = status.initialized &&
                      status.scriptLoaded &&
                      status.paqAvailable;

      this.log('Status Check', allGood,
        allGood ? 'All systems operational' : 'Some issues detected');

      console.groupEnd();
      return allGood;
    } catch (error) {
      this.log('Status Check', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Test 12: Error Handling
   */
  testErrorHandling() {
    console.group('⚠️  Test 12: Error Handling');

    try {
      // Test with invalid parameters
      analyticsService.trackEvent(null, null, null, null);
      this.log('Null Parameters', true, 'Handled gracefully');

      analyticsService.setCustomDimension(999, 'invalid_id');
      this.log('Invalid Dimension ID', true, 'Handled gracefully');

      console.groupEnd();
      return true;
    } catch (error) {
      this.log('Error Handling', false, error.message);
      console.groupEnd();
      return false;
    }
  }

  /**
   * Run all tests
   */
  runAll() {
    console.clear();
    console.log('%c🧪 MATOMO ANALYTICS TEST SUITE',
      'font-size: 24px; font-weight: bold; color: #0066CC;');
    console.log('%c═══════════════════════════════════════',
      'color: #0066CC;');
    console.log('');

    this.startTime = Date.now();
    this.results = [];

    const tests = [
      () => this.testInitialization(),
      () => this.testPageView(),
      () => this.testEventTracking(),
      () => this.testCustomDimensions(),
      () => this.testFormTracking(),
      () => this.testConversions(),
      () => this.testContentTracking(),
      () => this.testScrollTracking(),
      () => this.testLinkTracking(),
      () => this.testWindowAPI(),
      () => this.testStatus(),
      () => this.testErrorHandling()
    ];

    const passed = tests.filter(test => test()).length;
    const total = tests.length;
    const duration = Date.now() - this.startTime;

    console.log('');
    console.log('%c═══════════════════════════════════════',
      'color: #0066CC;');
    console.log('%c📊 TEST SUMMARY',
      'font-size: 18px; font-weight: bold; color: #0066CC;');
    console.log('');
    console.log(`%c${passed}/${total} tests passed`,
      `font-weight: bold; color: ${passed === total ? 'green' : 'orange'};`);
    console.log(`Duration: ${duration}ms`);
    console.log('');

    // Show failed tests
    const failed = this.results.filter(r => r.status.includes('FAIL'));
    if (failed.length > 0) {
      console.log('%c❌ FAILED TESTS:', 'color: red; font-weight: bold;');
      failed.forEach(f => {
        console.log(`  - ${f.test}: ${f.message}`);
      });
      console.log('');
    }

    console.log('%cNext steps:', 'font-weight: bold;');
    console.log('1. Check Matomo Real-time: https://analytics.entersys.mx');
    console.log('2. Navigate to: Visitors → Real-time → Visitor Log');
    console.log('3. Verify all events are appearing');
    console.log('4. Check Custom Dimensions in: Visitors → Custom Dimensions');
    console.log('');

    return {
      passed,
      total,
      success: passed === total,
      duration,
      results: this.results
    };
  }

  /**
   * Run specific test
   */
  run(testName) {
    const methodName = `test${testName}`;
    if (typeof this[methodName] === 'function') {
      return this[methodName]();
    } else {
      console.error(`Test "${testName}" not found`);
      return false;
    }
  }

  /**
   * Get test results
   */
  getResults() {
    return this.results;
  }

  /**
   * Export results as JSON
   */
  exportResults() {
    const json = JSON.stringify(this.results, null, 2);
    console.log(json);
    return json;
  }
}

// Create singleton instance
export const testAnalytics = new AnalyticsTestSuite();

// Expose to window for console access
if (typeof window !== 'undefined') {
  window.testAnalytics = testAnalytics;

  console.log('%c🧪 Analytics Test Suite Loaded',
    'background: #0066CC; color: white; padding: 4px 8px; border-radius: 3px;');
  console.log('');
  console.log('Available commands:');
  console.log('  window.testAnalytics.runAll()          - Run all tests');
  console.log('  window.testAnalytics.run("TestName")   - Run specific test');
  console.log('  window.testAnalytics.getResults()      - Get test results');
  console.log('  window.testAnalytics.exportResults()   - Export as JSON');
  console.log('');
  console.log('Available tests:');
  console.log('  Initialization, PageView, EventTracking, CustomDimensions,');
  console.log('  FormTracking, Conversions, ContentTracking, ScrollTracking,');
  console.log('  LinkTracking, WindowAPI, Status, ErrorHandling');
  console.log('');
}

export default testAnalytics;
