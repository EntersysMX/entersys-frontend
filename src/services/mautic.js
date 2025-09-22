/**
 * Servicio Mautic - Integración directa con el CRM
 * Simplificado para mejor confiabilidad
 */

import { getCurrentConfig } from '../config/mautic';

const config = getCurrentConfig();

export class MauticService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialized = false;
  }

  generateSessionId() {
    return 'entersys_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Inicializar tracking de Mautic
   */
  async initializeTracking() {
    if (this.initialized) return;

    try {
      // Cargar script de tracking de Mautic
      if (!window.MauticJS) {
        const script = document.createElement('script');
        script.src = `${config.baseUrl}/media/js/mautic-form.js`;
        script.async = true;
        document.head.appendChild(script);
      }

      // Pixel de tracking
      const trackingImg = new Image();
      trackingImg.src = `${config.trackingPixel}?d=${encodeURIComponent(document.domain)}&url=${encodeURIComponent(window.location.href)}`;

      this.initialized = true;

      if (config.debug) {
        console.log('✅ Mautic tracking initialized with config:', config);
      }
    } catch (error) {
      console.error('❌ Error initializing Mautic tracking:', error);
    }
  }

  /**
   * Capturar lead en Mautic
   */
  async captureLead(leadData) {
    try {
      console.log('📝 Capturing lead in Mautic:', leadData);

      // Preparar datos para Mautic
      const mauticData = {
        formId: config.formId,
        firstname: leadData.name?.split(' ')[0] || leadData.name,
        lastname: leadData.name?.split(' ').slice(1).join(' ') || '',
        email: leadData.email,
        company: leadData.company || '',
        phone: leadData.phone || '',
        message: leadData.message || '',
        tags: this.generateTags(leadData),
        lead_source: leadData.source || 'website_form',
        interest_area: leadData.interest || 'general',
        page_url: window.location.href,
        referrer: document.referrer || '',
        user_agent: navigator.userAgent,
        session_id: this.sessionId,
        timestamp: new Date().toISOString()
      };

      if (config.debug) {
        console.log('📝 Capturing lead in Mautic:', mauticData);
      }

      // Enviar a Mautic via API
      const response = await fetch(`${config.apiUrl}/contacts/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(mauticData),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Lead captured in Mautic:', result);

        // Tracking adicional
        this.trackPageAction('form_submit', leadData.email);

        return {
          success: true,
          leadId: result.contact?.id,
          message: 'Lead capturado exitosamente en Mautic'
        };
      } else {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

    } catch (error) {
      console.error('❌ Error capturing lead in Mautic:', error);

      // Fallback: enviar via POST directo al formulario
      return await this.fallbackFormSubmission(leadData);
    }
  }

  /**
   * Fallback: envío directo al formulario de Mautic
   */
  async fallbackFormSubmission(leadData) {
    try {
      const formData = new FormData();
      formData.append('mauticform[firstname]', leadData.name?.split(' ')[0] || leadData.name);
      formData.append('mauticform[lastname]', leadData.name?.split(' ').slice(1).join(' ') || '');
      formData.append('mauticform[email]', leadData.email);
      formData.append('mauticform[company]', leadData.company || '');
      formData.append('mauticform[phone]', leadData.phone || '');
      formData.append('mauticform[message]', leadData.message || '');
      formData.append('mauticform[formId]', config.formId);
      formData.append('mauticform[return]', window.location.href);

      const response = await fetch(`${config.baseUrl}/form/submit`, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Para evitar CORS issues
      });

      console.log('✅ Fallback form submission completed');
      return {
        success: true,
        message: 'Lead enviado via formulario directo'
      };

    } catch (error) {
      console.error('❌ Fallback submission failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generar tags basados en los datos del lead
   */
  generateTags(leadData) {
    const tags = ['website', 'contact_form'];

    if (leadData.interest) {
      tags.push(`interest_${leadData.interest}`);
    }

    if (leadData.source) {
      tags.push(`source_${leadData.source}`);
    }

    if (leadData.company) {
      tags.push('has_company');
    }

    return tags;
  }

  /**
   * Track acción de página en Mautic
   */
  trackPageAction(action, email = null) {
    try {
      const trackingData = {
        action: action,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        session_id: this.sessionId
      };

      if (email) {
        trackingData.email = email;
      }

      // Enviar via pixel tracking
      const trackingImg = new Image();
      const params = new URLSearchParams(trackingData);
      trackingImg.src = `${config.trackingPixel}?${params.toString()}`;

      if (config.debug) {
        console.log('📊 Mautic page action tracked:', action);
      }
    } catch (error) {
      console.error('❌ Error tracking page action:', error);
    }
  }

  /**
   * Track conversión en Mautic
   */
  async trackConversion(email, conversionType = 'form_submit', value = 1) {
    try {
      const conversionData = {
        email: email,
        conversion_type: conversionType,
        conversion_value: value,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        session_id: this.sessionId
      };

      const response = await fetch(`${config.apiUrl}/conversions/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversionData)
      });

      if (response.ok) {
        console.log('✅ Conversion tracked in Mautic');
        return { success: true };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }

    } catch (error) {
      console.error('❌ Error tracking conversion:', error);
      // No fallar el proceso principal por esto
      return { success: false, error: error.message };
    }
  }

  /**
   * Track click de WhatsApp
   */
  async trackWhatsAppClick(email = null, source = 'float_button') {
    try {
      this.trackPageAction('whatsapp_click', email);

      if (email) {
        await this.trackConversion(email, 'whatsapp_click', 5);
      }

      console.log('📱 WhatsApp click tracked in Mautic');
    } catch (error) {
      console.error('❌ Error tracking WhatsApp click:', error);
    }
  }
}

// Instancia singleton
export const mauticService = new MauticService();

// Auto-inicializar cuando se carga la página
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    mauticService.initializeTracking();
  });
}