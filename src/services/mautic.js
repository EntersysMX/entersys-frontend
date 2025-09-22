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
   * Capturar lead en Mautic usando formulario directo (más confiable)
   */
  async captureLead(leadData) {
    try {
      console.log('📝 Capturing lead via Mautic form submission:', leadData);

      // Usar directamente el método de formulario que siempre funciona
      return await this.fallbackFormSubmission(leadData);

    } catch (error) {
      console.error('❌ Error capturing lead in Mautic:', error);

      // Si todo falla, al menos registramos localmente
      return this.localLeadStorage(leadData);
    }
  }

  /**
   * Fallback: envío directo al formulario de Mautic
   */
  async fallbackFormSubmission(leadData) {
    try {
      // Crear un iframe oculto para envío sin CORS
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'mautic_submit_' + Date.now();
      document.body.appendChild(iframe);

      // Crear formulario dinámico
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${config.baseUrl}/form/submit`;
      form.target = iframe.name;

      // Añadir campos del formulario
      const fields = {
        'mauticform[firstname]': leadData.name?.split(' ')[0] || leadData.name,
        'mauticform[lastname]': leadData.name?.split(' ').slice(1).join(' ') || '',
        'mauticform[email]': leadData.email,
        'mauticform[company]': leadData.company || '',
        'mauticform[phone]': leadData.phone || '',
        'mauticform[message]': leadData.message || '',
        'mauticform[formId]': config.formId,
        'mauticform[return]': window.location.href
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      });

      // Enviar formulario
      document.body.appendChild(form);
      form.submit();

      // Limpiar después de un momento
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 3000);

      console.log('✅ Lead submitted via hidden form to Mautic');
      return {
        success: true,
        message: 'Lead enviado a Mautic via formulario directo',
        method: 'form_submission'
      };

    } catch (error) {
      console.error('❌ Form submission failed:', error);
      return await this.localLeadStorage(leadData);
    }
  }

  /**
   * Almacenamiento local de emergencia
   */
  async localLeadStorage(leadData) {
    try {
      const leads = JSON.parse(localStorage.getItem('entersys_leads') || '[]');
      const newLead = {
        ...leadData,
        timestamp: new Date().toISOString(),
        id: Date.now(),
        status: 'pending_sync'
      };

      leads.push(newLead);
      localStorage.setItem('entersys_leads', JSON.stringify(leads));

      console.log('💾 Lead stored locally for later sync:', newLead);
      return {
        success: true,
        message: 'Lead guardado localmente',
        method: 'local_storage',
        leadId: newLead.id
      };

    } catch (error) {
      console.error('❌ Local storage failed:', error);
      return {
        success: false,
        error: 'No se pudo guardar el lead',
        method: 'failed'
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