import React, { useState, useEffect } from 'react';
import { mauticService } from '../services/mautic';
import { analyticsService } from '../services/analytics';

/**
 * WhatsApp Float Button - Versión Corregida para Producción
 * Debugging habilitado para identificar problemas
 */
const WhatsAppFloatButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});

  // Inicializar Mautic tracking
  useEffect(() => {
    mauticService.initializeTracking();
  }, []);

  // Debug info para troubleshooting
  useEffect(() => {
    const info = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    setDebugInfo(info);
    console.log('🔍 WhatsApp Button Debug Info:', info);
  }, []);

  // Configuración WhatsApp
  const WHATSAPP_CONFIG = {
    number: '5256256883662',
    message: 'Hola! Me interesa conocer más sobre EnterSys y cómo pueden ayudar a optimizar los procesos de mi empresa. ¿Podrían brindarme más información? Gracias!'
  };

  const handleWhatsAppClick = async () => {
    try {
      console.log('📱 WhatsApp button clicked');

      // 1. Obtener información del usuario si existe
      const userEmail = localStorage.getItem('leadEmail') || sessionStorage.getItem('leadEmail');
      const currentPage = window.location.pathname;
      const source = 'whatsapp_float_button';

      // 2. Tracking en Mautic y Matomo
      await mauticService.trackWhatsAppClick(userEmail, source);
      analyticsService.trackWhatsAppClick(source);

      // 3. Si no hay email registrado, crear un lead anónimo para tracking
      if (!userEmail) {
        const anonymousLead = {
          name: 'WhatsApp Lead',
          email: `whatsapp_${Date.now()}@anonymous.lead`,
          company: '',
          phone: '',
          interest: 'whatsapp_contact',
          message: `Click en WhatsApp desde ${currentPage}`,
          source: source
        };

        // Capturar lead anónimo para tracking
        try {
          await mauticService.captureLead(anonymousLead);
          console.log('📝 Anonymous WhatsApp lead captured');
        } catch (leadError) {
          console.warn('⚠️ Anonymous lead capture failed:', leadError);
        }
      }

      // 4. Tracking de conversión si hay email
      if (userEmail) {
        await mauticService.trackConversion(userEmail, 'whatsapp_click', 10);
      }

      // 5. Abrir WhatsApp
      const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      console.log('✅ WhatsApp opened successfully');

    } catch (error) {
      console.error('❌ WhatsApp click error:', error);

      // Fallback: abrir WhatsApp aunque falle el tracking
      const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      console.log('✅ WhatsApp opened (fallback)');
    }
  };

  // Debug: Log cuando el componente se renderiza
  useEffect(() => {
    console.log('🔍 WhatsAppFloatButton mounted', { isVisible, debugInfo });
  }, [isVisible, debugInfo]);

  if (!isVisible) {
    console.log('🚫 WhatsApp button hidden');
    return null;
  }

  console.log('✅ WhatsApp button rendering');

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999]"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >

      {/* Botón principal */}
      <button
        onClick={handleWhatsAppClick}
        className="whatsapp-float-button w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        aria-label="Contactar por WhatsApp"
        title="¿Tienes preguntas? Chatea con nosotros en WhatsApp"
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.backgroundColor = '#20BC5A';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = '#25D366';
        }}
      >
        {/* Icono WhatsApp - SVG inline para evitar problemas de carga */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: '32px', height: '32px' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.506z"/>
        </svg>
      </button>

      {/* Indicador de notificación */}
      <div
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
        style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '16px',
          height: '16px',
          backgroundColor: '#EF4444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          className="w-2 h-2 bg-white rounded-full animate-pulse"
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}
        />
      </div>
    </div>
  );
};

export default WhatsAppFloatButton;