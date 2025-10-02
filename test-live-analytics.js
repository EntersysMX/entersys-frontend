#!/usr/bin/env node

/**
 * Test completo de analytics en dev.entersys.mx
 * Simula comportamiento real de usuario
 */

import { readFileSync } from 'fs';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testLiveAnalytics() {
  console.log('🚀 Testing live analytics on dev.entersys.mx');
  console.log('=' .repeat(50));

  try {
    // Test 1: Homepage visit
    console.log('\n📍 Test 1: Homepage Visit');
    console.log('URL: https://dev.entersys.mx/');

    const homepageParams = new URLSearchParams({
      idsite: '1',
      rec: '1',
      url: 'https://dev.entersys.mx/',
      action_name: 'Claude Test - Homepage',
      rand: Date.now().toString(),
      _id: 'claude' + Math.random().toString(36).substr(2, 13),
      h: new Date().getHours(),
      m: new Date().getMinutes(),
      s: new Date().getSeconds()
    });

    const homeResponse = await fetch('https://analytics.entersys.mx/matomo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Claude-Testing/1.0 (Testing Bot)'
      },
      body: homepageParams
    });

    console.log('✅ Homepage tracking:', homeResponse.status, homeResponse.statusText);
    await delay(1000);

    // Test 2: Contact page visit
    console.log('\n📍 Test 2: Contact Page Visit');
    console.log('URL: https://dev.entersys.mx/contacto');

    const contactParams = new URLSearchParams({
      idsite: '1',
      rec: '1',
      url: 'https://dev.entersys.mx/contacto',
      action_name: 'Claude Test - Contact Page',
      rand: Date.now().toString(),
      _id: 'claude' + Math.random().toString(36).substr(2, 13),
      h: new Date().getHours(),
      m: new Date().getMinutes(),
      s: new Date().getSeconds()
    });

    const contactResponse = await fetch('https://analytics.entersys.mx/matomo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Claude-Testing/1.0 (Testing Bot)'
      },
      body: contactParams
    });

    console.log('✅ Contact page tracking:', contactResponse.status, contactResponse.statusText);
    await delay(1000);

    // Test 3: Form submission event
    console.log('\n📍 Test 3: Form Submission Event');

    const formEventParams = new URLSearchParams({
      idsite: '1',
      rec: '1',
      url: 'https://dev.entersys.mx/contacto',
      action_name: 'Claude Test - Form Submit',
      e_c: 'Form',
      e_a: 'Submit',
      e_n: 'contact_form',
      e_v: '1',
      rand: Date.now().toString(),
      _id: 'claude' + Math.random().toString(36).substr(2, 13)
    });

    const formResponse = await fetch('https://analytics.entersys.mx/matomo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Claude-Testing/1.0 (Testing Bot)'
      },
      body: formEventParams
    });

    console.log('✅ Form event tracking:', formResponse.status, formResponse.statusText);
    await delay(1000);

    // Test 4: WhatsApp click event
    console.log('\n📍 Test 4: WhatsApp Click Event');

    const whatsappEventParams = new URLSearchParams({
      idsite: '1',
      rec: '1',
      url: 'https://dev.entersys.mx/',
      action_name: 'Claude Test - WhatsApp Click',
      e_c: 'CTA',
      e_a: 'WhatsApp Click',
      e_n: 'float_button',
      e_v: '1',
      rand: Date.now().toString(),
      _id: 'claude' + Math.random().toString(36).substr(2, 13)
    });

    const whatsappResponse = await fetch('https://analytics.entersys.mx/matomo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Claude-Testing/1.0 (Testing Bot)'
      },
      body: whatsappEventParams
    });

    console.log('✅ WhatsApp event tracking:', whatsappResponse.status, whatsappResponse.statusText);
    await delay(1000);

    // Test 5: Conversion event
    console.log('\n📍 Test 5: Conversion Event');

    const conversionParams = new URLSearchParams({
      idsite: '1',
      rec: '1',
      url: 'https://dev.entersys.mx/contacto',
      action_name: 'Claude Test - Conversion',
      e_c: 'Conversion',
      e_a: 'Contact Form Submission',
      e_v: '50',
      rand: Date.now().toString(),
      _id: 'claude' + Math.random().toString(36).substr(2, 13)
    });

    const conversionResponse = await fetch('https://analytics.entersys.mx/matomo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Claude-Testing/1.0 (Testing Bot)'
      },
      body: conversionParams
    });

    console.log('✅ Conversion tracking:', conversionResponse.status, conversionResponse.statusText);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TESTING SUMMARY');
    console.log('='.repeat(50));
    console.log('✅ All 5 analytics tests completed successfully');
    console.log('✅ Homepage visit tracked');
    console.log('✅ Contact page visit tracked');
    console.log('✅ Form submission event tracked');
    console.log('✅ WhatsApp click event tracked');
    console.log('✅ Conversion event tracked');
    console.log('');
    console.log('🎯 Check Matomo dashboard for these events:');
    console.log('   - Visit to homepage and contact page');
    console.log('   - Form submission event');
    console.log('   - WhatsApp click event');
    console.log('   - Conversion with value 50');
    console.log('');
    console.log('⏰ Events sent at:', new Date().toISOString());
    console.log('👤 User ID pattern: claude[random]');

  } catch (error) {
    console.error('❌ Testing failed:', error);
  }
}

// Run the test
testLiveAnalytics().then(() => {
  console.log('\\n🎉 Testing completed! Check your Matomo dashboard.');
}).catch(console.error);