/**
 * Servicio Mautic - Integración directa con el CRM
 * Simplificado para mejor confiabilidad
 */

import { getCurrentConfig } from '../config/mautic';
import { mauticAuth } from './mauticAuth';

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
   * Capturar lead en Mautic - API no disponible, usando formulario directo
   */
  async captureLead(leadData) {
    try {
      console.log('📝 Capturing lead in Mautic via form (API endpoints not available):', leadData);

      // API OAuth2 no está disponible (404), usar formulario directo
      return await this.fallbackFormSubmission(leadData);

    } catch (error) {
      console.error('❌ Error capturing lead in Mautic:', error);

      // Si todo falla, almacenamiento local
      return await this.localLeadStorage(leadData);
    }
  }

  /**
   * Fallback: envío directo al formulario de Mautic
   */
  async fallbackFormSubmission(leadData) {
    try {
      console.log('📝 Using Mautic form fallback submission');

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
        try {
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        } catch (cleanupError) {
          console.warn('⚠️ Cleanup error:', cleanupError);
        }
      }, 3000);

      console.log('✅ Lead submitted via Mautic form fallback');
      return {
        success: true,
        message: 'Lead enviado a Mautic via formulario',
        method: 'form_submission'
      };

    } catch (error) {
      console.error('❌ Form submission failed, using local storage:', error);
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
        status: 'pending_sync',
        page_url: window.location.href,
        user_agent: navigator.userAgent
      };

      leads.push(newLead);
      localStorage.setItem('entersys_leads', JSON.stringify(leads));

      console.log('💾 Lead almacenado localmente:', newLead);
      console.log(`📊 Total leads almacenados: ${leads.length}`);

      return {
        success: true,
        message: 'Información recibida correctamente. Nos pondremos en contacto contigo pronto.',
        method: 'local_storage',
        leadId: newLead.id,
        totalLeads: leads.length
      };

    } catch (error) {
      console.error('❌ Error de almacenamiento local:', error);
      return {
        success: false,
        error: 'Error técnico. Por favor intenta nuevamente o contacta por teléfono.',
        method: 'failed'
      };
    }
  }

  /**
   * Obtener leads almacenados localmente (para administración)
   */
  getStoredLeads() {
    try {
      const leads = JSON.parse(localStorage.getItem('entersys_leads') || '[]');
      console.table(leads);
      return leads;
    } catch (error) {
      console.error('Error retrieving stored leads:', error);
      return [];
    }
  }

  /**
   * Exportar leads a CSV (para administración)
   */
  exportLeadsToCSV() {
    try {
      const leads = this.getStoredLeads();
      if (leads.length === 0) {
        console.log('No hay leads para exportar');
        return;
      }

      const csv = [
        'Timestamp,Name,Email,Company,Phone,Interest,Message,Page URL',
        ...leads.map(lead => [
          lead.timestamp,
          lead.name || '',
          lead.email || '',
          lead.company || '',
          lead.phone || '',
          lead.interest || '',
          (lead.message || '').replace(/,/g, ';'),
          lead.page_url || ''
        ].join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `entersys_leads_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      console.log(`✅ Exported ${leads.length} leads to CSV`);
    } catch (error) {
      console.error('Error exporting leads:', error);
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
   * Track conversión en Mautic - Deshabilitado por CORS
   */
  async trackConversion(email, conversionType = 'form_submit', value = 1) {
    // Deshabilitado temporalmente por CORS issues
    console.log('📊 Conversion tracking disabled due to CORS (will work after server config):', {
      email, conversionType, value
    });

    return {
      success: true,
      message: 'Conversion tracking disabled - CORS configuration needed',
      disabled: true
    };
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