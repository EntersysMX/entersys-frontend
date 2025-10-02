#!/usr/bin/env node

/**
 * Real Browser Testing para CTAs de dev.entersys.mx
 * Testing automatizado con información detallada
 */

const puppeteer = require('puppeteer');

async function testDevEntersys() {
    console.log('🚀 Iniciando testing real en navegador para dev.entersys.mx\n');

    let browser;
    try {
        // Lanzar navegador
        browser = await puppeteer.launch({
            headless: false, // Visible para debugging
            devtools: false, // Sin DevTools automático
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
        });

        const page = await browser.newPage();

        // Configurar viewport
        await page.setViewport({ width: 1920, height: 1080 });

        // Capturar requests de red
        const networkRequests = [];
        await page.setRequestInterception(true);

        page.on('request', request => {
            const url = request.url();

            // Log relevante para analytics/CRM
            if (url.includes('crm.entersys.mx') ||
                url.includes('mautic') ||
                url.includes('analytics') ||
                url.includes('mtracking.gif')) {
                networkRequests.push({
                    timestamp: new Date().toISOString(),
                    url: url,
                    method: request.method(),
                    resourceType: request.resourceType()
                });
                console.log('📊 Analytics/CRM Request:', url);
            }

            request.continue();
        });

        // Capturar console logs
        const consoleLogs = [];
        page.on('console', msg => {
            const text = msg.text();
            consoleLogs.push({
                timestamp: new Date().toISOString(),
                type: msg.type(),
                text: text
            });

            // Log específicos de WhatsApp/Mautic
            if (text.includes('WhatsApp') ||
                text.includes('Mautic') ||
                text.includes('analytics') ||
                text.includes('🔍') ||
                text.includes('📱') ||
                text.includes('✅') ||
                text.includes('❌')) {
                console.log(`[${msg.type().toUpperCase()}] ${text}`);
            }
        });

        console.log('🌐 Navegando a dev.entersys.mx...');
        await page.goto('https://dev.entersys.mx', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Esperar a que la página cargue completamente
        await page.waitForTimeout(3000);

        console.log('\n🔍 VERIFICANDO ELEMENTOS...\n');

        // 1. Test WhatsApp Button
        console.log('📱 Testing WhatsApp Button...');
        try {
            // Buscar diferentes posibles selectores para WhatsApp
            const whatsappSelectors = [
                '.whatsapp-float-button',
                '[class*="whatsapp"]',
                'button[aria-label*="WhatsApp"]',
                'a[href*="wa.me"]',
                '[title*="WhatsApp"]'
            ];

            let whatsappButton = null;
            for (const selector of whatsappSelectors) {
                whatsappButton = await page.$(selector);
                if (whatsappButton) {
                    console.log(`✅ WhatsApp button encontrado con selector: ${selector}`);
                    break;
                }
            }

            if (whatsappButton) {
                // Verificar visibilidad
                const isVisible = await page.evaluate(button => {
                    const rect = button.getBoundingClientRect();
                    return rect.width > 0 && rect.height > 0 &&
                           getComputedStyle(button).visibility !== 'hidden' &&
                           getComputedStyle(button).display !== 'none';
                }, whatsappButton);

                if (isVisible) {
                    console.log('✅ WhatsApp button es visible');

                    // Simular click
                    console.log('🖱️ Simulando click en WhatsApp button...');
                    await page.evaluate(button => {
                        // Mock window.open para evitar abrir WhatsApp real
                        const originalOpen = window.open;
                        window.open = function(url) {
                            console.log('🔗 WhatsApp URL would open:', url);
                            return null;
                        };

                        button.click();

                        // Restaurar después de un momento
                        setTimeout(() => {
                            window.open = originalOpen;
                        }, 1000);
                    }, whatsappButton);

                    // Esperar a que se ejecuten los analytics
                    await page.waitForTimeout(2000);
                    console.log('✅ WhatsApp button click simulado exitosamente');
                } else {
                    console.log('❌ WhatsApp button no es visible');
                }
            } else {
                console.log('❌ WhatsApp button no encontrado');
            }

        } catch (error) {
            console.log('❌ Error testing WhatsApp button:', error.message);
        }

        // 2. Test Navigation to Contact page
        console.log('\n📧 Testing Contact Page...');
        try {
            await page.goto('https://dev.entersys.mx/contacto', {
                waitUntil: 'networkidle0',
                timeout: 15000
            });

            await page.waitForTimeout(2000);

            // Buscar formulario de contacto
            const formSelectors = [
                'form',
                '[role="form"]',
                '.contact-form',
                '[class*="contact"]',
                '[class*="form"]'
            ];

            let contactForm = null;
            for (const selector of formSelectors) {
                contactForm = await page.$(selector);
                if (contactForm) {
                    console.log(`✅ Contact form encontrado con selector: ${selector}`);
                    break;
                }
            }

            if (contactForm) {
                // Verificar campos del formulario
                const fields = await page.evaluate(() => {
                    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
                    return Array.from(inputs).map(input => ({
                        type: input.type || input.tagName.toLowerCase(),
                        name: input.name || input.id || 'unnamed',
                        placeholder: input.placeholder || '',
                        required: input.required
                    }));
                });

                console.log('✅ Campos del formulario encontrados:', fields.length);
                fields.forEach(field => {
                    console.log(`   - ${field.type}: ${field.name} (${field.placeholder})`);
                });

                // Buscar botón de submit
                const submitButton = await page.$('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                    console.log('✅ Submit button encontrado');
                } else {
                    console.log('❌ Submit button no encontrado');
                }

            } else {
                console.log('❌ Contact form no encontrado');
            }

        } catch (error) {
            console.log('❌ Error testing contact page:', error.message);
        }

        // 3. Test otras páginas principales
        const pages = [
            { name: 'Servicios', url: '/servicios' },
            { name: 'Sobre Nosotros', url: '/sobre-nosotros' },
            { name: 'Blog', url: '/blog' }
        ];

        for (const pageInfo of pages) {
            console.log(`\n🔍 Testing ${pageInfo.name} page...`);
            try {
                await page.goto(`https://dev.entersys.mx${pageInfo.url}`, {
                    waitUntil: 'networkidle0',
                    timeout: 10000
                });

                await page.waitForTimeout(1500);

                // Buscar CTAs generales
                const ctaElements = await page.evaluate(() => {
                    const selectors = ['button', 'a[class*="button"]', '[class*="cta"]', '[class*="btn"]'];
                    let elements = [];

                    selectors.forEach(selector => {
                        const found = document.querySelectorAll(selector);
                        Array.from(found).forEach(el => {
                            if (el.textContent.trim() &&
                                el.offsetParent !== null && // visible
                                !elements.some(existing => existing.text === el.textContent.trim())) {
                                elements.push({
                                    tag: el.tagName.toLowerCase(),
                                    text: el.textContent.trim(),
                                    href: el.href || '',
                                    className: el.className
                                });
                            }
                        });
                    });

                    return elements.slice(0, 10); // Limitar a 10 para no saturar
                });

                console.log(`✅ CTAs encontrados en ${pageInfo.name}:`, ctaElements.length);
                ctaElements.forEach(cta => {
                    console.log(`   - ${cta.tag}: "${cta.text}"`);
                });

            } catch (error) {
                console.log(`❌ Error testing ${pageInfo.name}:`, error.message);
            }
        }

        // Generar reporte final
        console.log('\n' + '='.repeat(60));
        console.log('📊 REPORTE FINAL DE TESTING');
        console.log('='.repeat(60));

        console.log(`\n🌐 URL Testeada: https://dev.entersys.mx`);
        console.log(`⏱️ Timestamp: ${new Date().toISOString()}`);

        console.log(`\n📊 Network Requests (Analytics/CRM): ${networkRequests.length}`);
        networkRequests.forEach(req => {
            console.log(`   - ${req.method} ${req.url}`);
        });

        console.log(`\n📝 Console Messages Relevantes: ${consoleLogs.filter(log =>
            log.text.includes('WhatsApp') || log.text.includes('Mautic') ||
            log.text.includes('analytics') || log.text.includes('🔍')).length}`);

        // Errores críticos
        const errors = consoleLogs.filter(log => log.type === 'error');
        if (errors.length > 0) {
            console.log(`\n❌ Errores encontrados: ${errors.length}`);
            errors.forEach(error => {
                console.log(`   - ${error.text}`);
            });
        } else {
            console.log(`\n✅ Sin errores críticos en console`);
        }

        console.log('\n✅ Testing completado exitosamente!');

    } catch (error) {
        console.error('❌ Error general en testing:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Verificar si Puppeteer está disponible
async function checkPuppeteer() {
    try {
        require.resolve('puppeteer');
        return true;
    } catch (error) {
        console.log('❌ Puppeteer no está instalado.');
        console.log('📦 Para instalar: npm install puppeteer');
        return false;
    }
}

// Ejecutar testing
async function main() {
    const puppeteerAvailable = await checkPuppeteer();

    if (puppeteerAvailable) {
        await testDevEntersys();
    } else {
        console.log('\n🔧 Alternativa: Testing manual recomendado');
        console.log('1. Abre https://dev.entersys.mx en Chrome');
        console.log('2. Presiona F12 para abrir DevTools');
        console.log('3. Ve a la pestaña Network');
        console.log('4. Haz click en el botón de WhatsApp');
        console.log('5. Busca requests a crm.entersys.mx');
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { testDevEntersys };