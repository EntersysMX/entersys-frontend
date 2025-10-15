/**
 * Servicio Mautic - Integración via Backend API
 * Arquitectura escalable para futuras integraciones
 */

import { config } from '../config/environment';

// URL del backend - FORZAR CACHE BUST v2
const USE_BACKEND = true; // BACKEND ESTÁ FUNCIONANDO - v2.0
const API_BASE = config.urls.api || 'http://34.134.14.202:8000';
const CRM_ENDPOINT = `${API_BASE}/v1/crm`; // API_BASE ya incluye /api
const MAUTIC_URL = config.analytics.mautic.url || 'https://crm.entersys.mx';

export class MauticService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialized = false;
  }

  generateSessionId() {
    return 'entersys_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Inicializar tracking de Mautic (sin tracking automático)
   */
  async initializeTracking() {
    if (this.initialized) return;

    try {
      // Solo marcar como inicializado, sin tracking automático para evitar CORS
      this.initialized = true;
      console.log('✅ Mautic service initialized (tracking disabled to avoid CORS)');
    } catch (error) {
      console.error('❌ Error initializing Mautic service:', error);
    }
  }

  /**
   * Capturar lead via formulario directo de Mautic
   */
  async captureLead(leadData) {
    try {
      console.log('📝 Capturing lead via Mautic form:', leadData);

      // Intentar envío directo al formulario de Mautic
      const mauticFormData = new FormData();

      // Mapear campos a los nombres exactos de Mautic (con guiones bajos)
      if (leadData.firstName) mauticFormData.append('mauticform[first_name]', leadData.firstName);
      if (leadData.lastName) mauticFormData.append('mauticform[last_name]', leadData.lastName);
      if (leadData.email) mauticFormData.append('mauticform[email]', leadData.email);
      if (leadData.company) mauticFormData.append('mauticform[company]', leadData.company);
      if (leadData.phone) mauticFormData.append('mauticform[phone]', leadData.phone);
      if (leadData.message) mauticFormData.append('mauticform[message]', leadData.message);
      if (leadData.interest) mauticFormData.append('mauticform[interest]', leadData.interest);

      // Campos del sistema de Mautic
      mauticFormData.append('mauticform[formId]', '1');
      mauticFormData.append('mauticform[return]', '');
      mauticFormData.append('mauticform[messenger]', '1');

      console.log('🔗 Submitting to Mautic form endpoint...');

      const response = await fetch(`${MAUTIC_URL}/form/submit`, {
        method: 'POST',
        body: mauticFormData,
        mode: 'no-cors' // Para evitar problemas de CORS
      });

      console.log('✅ Form submitted to Mautic (no-cors mode)');

      // También almacenar localmente para backup
      const localResult = await this.localLeadStorage(leadData);

      return {
        success: true,
        message: '¡Gracias por contactarnos! Hemos recibido tu información y nos pondremos en contacto contigo muy pronto.',
        method: 'mautic_form_direct',
        leadId: localResult.leadId,
        backup: 'stored_locally'
      };

    } catch (error) {
      console.error('❌ Error submitting to Mautic form:', error);

      // Fallback a localStorage
      console.log('📦 Fallback: usando localStorage');
      return await this.localLeadStorage(leadData);
    }
  }

  /**
   * Mapear interesse del frontend al formato esperado por el backend
   */
  mapInterestToBackend(interest) {
    const interestMap = {
      'general': 'general',
      'worksys': 'worksys',
      'expersys': 'expersys',
      'demo': 'demo',
      'partnership': 'partnership',
      'website': 'general',
      'contact': 'general',
      'pricing': 'demo',
      'solutions': 'general',
      'automation': 'automation',
    };

    return interestMap[interest.toLowerCase()] || 'general';
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
        message: '✅ ¡Gracias por contactarnos! Hemos recibido tu información y nos pondremos en contacto contigo muy pronto.',
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
      console.log('📋 Leads almacenados localmente:', leads.length);
      console.table(leads);
      return leads;
    } catch (error) {
      console.error('Error retrieving stored leads:', error);
      return [];
    }
  }

  /**
   * Obtener leads en formato para envío manual a Mautic
   */
  getLeadsForManualSync() {
    try {
      const leads = this.getStoredLeads();
      const formatted = leads.map(lead => ({
        firstname: lead.name?.split(' ')[0] || lead.name || '',
        lastname: lead.name?.split(' ').slice(1).join(' ') || '',
        email: lead.email || '',
        company: lead.company || '',
        phone: lead.phone || '',
        message: lead.message || '',
        date_captured: lead.timestamp || '',
        source: 'website_local_storage',
        page_url: lead.page_url || ''
      }));

      console.log('📤 Leads formateados para Mautic:', formatted);
      return formatted;
    } catch (error) {
      console.error('Error formatting leads:', error);
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
   * Track acción de página via Backend
   */
  async trackPageAction(action, email = null) {
    if (!email || !USE_BACKEND) {
      console.log('📊 Page action tracking skipped (no email or backend disabled):', action);
      return Promise.resolve();
    }

    try {
      // Mapear acción a score
      const scoreMapping = {
        'page_view': 2,
        'solutions_page_visit': 3,
        'pricing_page_visit': 8,
        'contact_page_visit': 5,
        'whatsapp_click': 5,
        'phone_click': 3,
        'email_click': 4
      };

      const scoreValue = scoreMapping[action] || 1;

      const response = await fetch(`${CRM_ENDPOINT}/lead/${email}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: action,
          score_delta: scoreValue,
          metadata: {
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`📊 Score updated for ${email}: ${action} (+${scoreValue})`, result.score_change);
        return result;
      } else {
        console.warn(`⚠️ Score update failed for ${email}:`, response.status);
      }

    } catch (error) {
      console.warn('⚠️ Page action tracking failed (non-critical):', error);
    }

    return Promise.resolve();
  }

  /**
   * Track conversión via Backend
   */
  async trackConversion(email, conversionType = 'form_submit', value = 10) {
    if (!email || !USE_BACKEND) {
      console.log('📊 Conversion tracking skipped (no email or backend disabled)');
      return { success: false, message: 'No email provided' };
    }

    try {
      // Usar el endpoint de score con valores altos para conversiones
      const response = await fetch(`${CRM_ENDPOINT}/lead/${email}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: `conversion_${conversionType}`,
          score_delta: value,
          metadata: {
            conversion_type: conversionType,
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`📊 Conversion tracked for ${email}: ${conversionType} (+${value})`, result.score_change);

        return {
          success: true,
          message: 'Conversion tracked successfully',
          method: 'backend_crm_api',
          score_change: result.score_change
        };
      } else {
        console.warn(`⚠️ Conversion tracking failed for ${email}:`, response.status);
        return { success: false, message: `HTTP ${response.status}` };
      }

    } catch (error) {
      console.error('❌ Error tracking conversion:', error);
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

  // Exponer funciones útiles para debug/administración
  window.entersysLeads = {
    getAll: () => mauticService.getStoredLeads(),
    export: () => mauticService.exportLeadsToCSV(),
    forSync: () => mauticService.getLeadsForManualSync(),
    count: () => {
      const leads = mauticService.getStoredLeads();
      console.log(`📊 Total leads almacenados: ${leads.length}`);
      return leads.length;
    },
    clear: () => {
      if (confirm('¿Estás seguro de que quieres eliminar todos los leads almacenados localmente?')) {
        localStorage.removeItem('entersys_leads');
        console.log('🗑️ Leads eliminados');
        return true;
      }
      return false;
    }
  };

  console.log('🔧 Funciones de administración disponibles en window.entersysLeads');
}