import React, { useState, useEffect } from 'react';
import { useAnalytics, analyticsAPI } from '../hooks/useAnalytics';

/**
 * WhatsApp Float Button - Versión Corregida para Producción
 * Debugging habilitado para identificar problemas
 */
const WhatsAppFloatButton = () => {
  const { trackEvent, trackGoal, matomoLoaded } = useAnalytics();
  const [isVisible, setIsVisible] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});
  const [forceVisible, setForceVisible] = useState(true); // DEBUG: Force visibility

  // Debug info para troubleshooting
  useEffect(() => {
    const info = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      matomoLoaded: matomoLoaded,
      timestamp: new Date().toISOString()
    };
    setDebugInfo(info);
    console.log('🔍 WhatsApp Button Debug Info:', info);
  }, [matomoLoaded]);

  // Configuración WhatsApp
  const WHATSAPP_CONFIG = {
    number: '5219841372369',
    message: 'Hola! Me interesa conocer más sobre EnterSys y cómo pueden ayudar a optimizar los procesos de mi empresa. ¿Podrían brindarme más información? Gracias!'
  };

  const handleWhatsAppClick = async () => {
    try {
      console.log('📱 WhatsApp button clicked');

      // 1. Tracking inmediato
      if (window._paq) {
        window._paq.push(['trackEvent', 'WhatsApp', 'Click', 'Float Button', 1]);
        console.log('✅ Matomo event tracked');
      } else {
        console.warn('⚠️ Matomo not loaded');
      }

      // 2. Tracking en backend
      const trackResult = await analyticsAPI.trackEvent({
        category: 'WhatsApp',
        action: 'Float_Button_Click',
        name: 'WhatsApp Float Button',
        value: 1,
        url: window.location.href
      });
      console.log('📊 Backend tracking result:', trackResult);

      // 3. Update lead score si existe email
      const userEmail = localStorage.getItem('leadEmail') || sessionStorage.getItem('leadEmail');
      if (userEmail) {
        try {
          const scoreResponse = await fetch(`https://api.dev.entersys.mx/api/v1/crm/lead/${encodeURIComponent(userEmail)}/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'whatsapp_click',
              score_delta: 5,
              metadata: { source: 'float_button', page: window.location.pathname }
            })
          });

          if (scoreResponse.ok) {
            console.log('📈 Lead score updated');
          }
        } catch (scoreError) {
          console.warn('Score update failed:', scoreError);
        }
      }

      // 4. Abrir WhatsApp
      const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      console.log('✅ WhatsApp opened');

    } catch (error) {
      console.error('❌ WhatsApp click error:', error);

      // Fallback: abrir WhatsApp aunque falle el tracking
      const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Debug: Log cuando el componente se renderiza
  useEffect(() => {
    console.log('🔍 WhatsAppFloatButton mounted', { isVisible, forceVisible, debugInfo });
  }, [isVisible, forceVisible, debugInfo]);

  // DEBUG: Always show button for now
  const shouldShow = forceVisible || isVisible;

  if (!shouldShow) {
    console.log('🚫 WhatsApp button hidden', { isVisible, forceVisible });
    return null;
  }

  console.log('✅ WhatsApp button rendering', { shouldShow, isVisible, forceVisible });

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
      {/* Debug info - solo visible en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-2 p-2 bg-black text-white text-xs rounded">
          Debug: {JSON.stringify(debugInfo, null, 2)}
        </div>
      )}

      {/* Botón principal */}
      <button
        onClick={handleWhatsAppClick}
        className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
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