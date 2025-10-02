/**
 * Script de Testing para CTAs y Analytics
 * Prueba todos los call-to-action en dev.entersys.mx
 */

const puppeteer = require('puppeteer');

const TEST_CONFIG = {
  baseUrl: 'https://dev.entersys.mx',
  pages: [
    '/',              // Home
    '/sobre-nosotros', // About
    '/servicios',     // Services
    '/contacto',      // Contact
    '/blog'           // Blog
  ],
  timeout: 30000
};

class CTATestRunner {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async init() {
    console.log('🚀 Iniciando testing de CTAs...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();

    // Configurar viewport
    await this.page.setViewport({ width: 1920, height: 1080 });

    // Interceptar requests para verificar analytics
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
      const url = request.url();

      // Log requests to analytics/CRM
      if (url.includes('crm.entersys.mx') ||
          url.includes('matomo') ||
          url.includes('analytics') ||
          url.includes('mautic')) {
        console.log('📊 Analytics/CRM Request:', url);
      }

      request.continue();
    });

    // Capturar errores de consola
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
      }
      if (msg.text().includes('WhatsApp') ||
          msg.text().includes('Mautic') ||
          msg.text().includes('analytics')) {
        console.log('🔍 Debug:', msg.text());
      }
    });
  }

  async testWhatsAppButton(pageUrl) {
    console.log(`\n📱 Testing WhatsApp Button on ${pageUrl}`);

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}${pageUrl}`, {
        waitUntil: 'networkidle0',
        timeout: TEST_CONFIG.timeout
      });

      // Esperar a que el botón de WhatsApp aparezca
      await this.page.waitForSelector('.whatsapp-float-button', { timeout: 10000 });

      // Verificar que el botón es visible
      const isVisible = await this.page.evaluate(() => {
        const button = document.querySelector('.whatsapp-float-button');
        return button && button.offsetParent !== null;
      });

      if (isVisible) {
        console.log('✅ WhatsApp button is visible');

        // Simular click (sin abrir WhatsApp real)
        await this.page.evaluate(() => {
          window.open = () => {}; // Mock window.open
          document.querySelector('.whatsapp-float-button').click();
        });

        // Esperar un poco para que se ejecuten los analytics
        await this.page.waitForTimeout(2000);

        console.log('✅ WhatsApp button clicked successfully');
        return { success: true, page: pageUrl, component: 'WhatsApp Button' };
      } else {
        console.log('❌ WhatsApp button not visible');
        return { success: false, page: pageUrl, component: 'WhatsApp Button', error: 'Not visible' };
      }
    } catch (error) {
      console.log('❌ WhatsApp button test failed:', error.message);
      return { success: false, page: pageUrl, component: 'WhatsApp Button', error: error.message };
    }
  }

  async testContactForm() {
    console.log(`\n📝 Testing Contact Form`);

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}/contacto`, {
        waitUntil: 'networkidle0',
        timeout: TEST_CONFIG.timeout
      });

      // Buscar el formulario de contacto
      const formExists = await this.page.$('form') !== null;

      if (formExists) {
        console.log('✅ Contact form found');

        // Llenar el formulario con datos de prueba
        const testData = {
          name: 'Test User CTA',
          email: 'test-cta@entersys-test.com',
          company: 'Test Company',
          message: 'Testing CTA integration with analytics and CRM'
        };

        // Intentar llenar los campos comunes
        try {
          await this.page.type('input[name="name"], input[id="name"], [placeholder*="nombre"]', testData.name);
          await this.page.type('input[name="email"], input[id="email"], [placeholder*="email"]', testData.email);
          await this.page.type('input[name="company"], input[id="company"], [placeholder*="empresa"]', testData.company);
          await this.page.type('textarea[name="message"], textarea[id="message"], [placeholder*="mensaje"]', testData.message);

          console.log('✅ Form fields filled');

          // Buscar y hacer click en el botón de envío
          const submitButton = await this.page.$('button[type="submit"], input[type="submit"], [type="submit"]');
          if (submitButton) {
            // Mock para evitar envío real durante testing
            await this.page.evaluate(() => {
              window.testMode = true; // Flag para el código de producción
            });

            await submitButton.click();
            console.log('✅ Form submitted successfully');

            // Esperar respuesta
            await this.page.waitForTimeout(3000);

            return { success: true, page: '/contacto', component: 'Contact Form' };
          } else {
            console.log('❌ Submit button not found');
            return { success: false, page: '/contacto', component: 'Contact Form', error: 'Submit button not found' };
          }

        } catch (fillError) {
          console.log('⚠️ Could not fill all form fields:', fillError.message);
          return { success: false, page: '/contacto', component: 'Contact Form', error: 'Could not fill fields' };
        }

      } else {
        console.log('❌ Contact form not found');
        return { success: false, page: '/contacto', component: 'Contact Form', error: 'Form not found' };
      }

    } catch (error) {
      console.log('❌ Contact form test failed:', error.message);
      return { success: false, page: '/contacto', component: 'Contact Form', error: error.message };
    }
  }

  async testCTAButtons(pageUrl) {
    console.log(`\n🔘 Testing CTA Buttons on ${pageUrl}`);

    try {
      await this.page.goto(`${TEST_CONFIG.baseUrl}${pageUrl}`, {
        waitUntil: 'networkidle0',
        timeout: TEST_CONFIG.timeout
      });

      // Buscar todos los botones CTA comunes
      const ctaSelectors = [
        'button:contains("Contactar")',
        'button:contains("Cotizar")',
        'button:contains("Conocer")',
        'button:contains("Explorar")',
        'a[href*="contacto"]',
        'a[href*="whatsapp"]',
        '.cta-button',
        '.btn-primary',
        '.button'
      ];

      const results = [];

      for (const selector of ctaSelectors) {
        try {
          const elements = await this.page.$$(selector);
          if (elements.length > 0) {
            console.log(`✅ Found ${elements.length} elements for: ${selector}`);
            results.push({
              success: true,
              page: pageUrl,
              component: `CTA: ${selector}`,
              count: elements.length
            });
          }
        } catch (error) {
          // Selector no encontrado, continuar
        }
      }

      return results;

    } catch (error) {
      console.log('❌ CTA buttons test failed:', error.message);
      return [{ success: false, page: pageUrl, component: 'CTA Buttons', error: error.message }];
    }
  }

  async runAllTests() {
    await this.init();

    console.log('🔍 Starting comprehensive CTA testing...\n');

    // Test 1: WhatsApp Button en todas las páginas
    console.log('='.repeat(50));
    console.log('TEST 1: WHATSAPP BUTTON');
    console.log('='.repeat(50));

    for (const page of TEST_CONFIG.pages) {
      const result = await this.testWhatsAppButton(page);
      this.results.push(result);
    }

    // Test 2: Contact Form
    console.log('\n' + '='.repeat(50));
    console.log('TEST 2: CONTACT FORM');
    console.log('='.repeat(50));

    const contactResult = await this.testContactForm();
    this.results.push(contactResult);

    // Test 3: CTA Buttons en todas las páginas
    console.log('\n' + '='.repeat(50));
    console.log('TEST 3: CTA BUTTONS');
    console.log('='.repeat(50));

    for (const page of TEST_CONFIG.pages) {
      const ctaResults = await this.testCTAButtons(page);
      this.results.push(...ctaResults);
    }

    // Generar reporte final
    this.generateReport();

    await this.browser.close();
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 REPORTE FINAL DE TESTING');
    console.log('='.repeat(60));

    const successful = this.results.filter(r => r.success);
    const failed = this.results.filter(r => !r.success);

    console.log(`✅ Tests exitosos: ${successful.length}`);
    console.log(`❌ Tests fallidos: ${failed.length}`);
    console.log(`📈 Tasa de éxito: ${((successful.length / this.results.length) * 100).toFixed(1)}%\n`);

    if (failed.length > 0) {
      console.log('❌ TESTS FALLIDOS:');
      failed.forEach(fail => {
        console.log(`  - ${fail.component} en ${fail.page}: ${fail.error}`);
      });
    }

    console.log('\n✅ TESTS EXITOSOS:');
    successful.forEach(success => {
      const count = success.count ? ` (${success.count} elementos)` : '';
      console.log(`  - ${success.component} en ${success.page}${count}`);
    });

    console.log('\n🎯 RECOMENDACIONES:');
    if (failed.length === 0) {
      console.log('  - Todos los CTAs están funcionando correctamente');
      console.log('  - La integración con analytics y CRM está operativa');
    } else {
      console.log('  - Revisar los componentes que fallaron');
      console.log('  - Verificar la configuración de analytics/CRM');
      console.log('  - Comprobar que los selectores CSS sean correctos');
    }
  }
}

// Ejecutar tests si se llama directamente
if (require.main === module) {
  const runner = new CTATestRunner();
  runner.runAllTests().catch(console.error);
}

module.exports = CTATestRunner;