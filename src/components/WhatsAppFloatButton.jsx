import React, { useState, useEffect } from 'react';
import { useAnalytics, analyticsAPI } from '../hooks/useAnalytics';

/**
 * COMPONENTE WHATSAPP FLOAT BUTTON
 * Botón flotante para contacto directo via WhatsApp
 * Número: +52 984 137 2369 (n8n configurado)
 * Tracking completo de interacciones
 */
const WhatsAppFloatButton = () => {
  const { trackEvent, trackGoal } = useAnalytics();
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Configuración del botón
  const WHATSAPP_CONFIG = {
    number: '5219841372369',
    message: 'Hola, me interesa conocer más sobre EnterSys y cómo pueden ayudar a optimizar los procesos de mi empresa. ¿Podrían brindarme más información?'
  };

  // Animación pulse cada 5 segundos
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Manejar scroll para visibilidad
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Ocultar en footer (últimos 100px)
      if (scrollY + windowHeight > documentHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = async () => {
    try {
      // 1. Tracking inmediato en frontend (Matomo)
      trackEvent('WhatsApp', 'Click', 'Float Button', 1);
      trackGoal(3, 10); // Goal 3 podría ser "WhatsApp Contact", valor $10

      // 2. Tracking en backend API para CRM scoring
      await analyticsAPI.trackEvent({
        category: 'WhatsApp',
        action: 'Float_Button_Click',
        name: 'WhatsApp Float Button',
        value: 1,
        url: window.location.href
      });

      // 3. Actualizar score si hay email guardado
      const userEmail = localStorage.getItem('leadEmail') || sessionStorage.getItem('leadEmail');
      if (userEmail) {
        try {
          await fetch('https://api.dev.entersys.mx/api/v1/crm/lead/' + encodeURIComponent(userEmail) + '/score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action: 'whatsapp_click',
              score_delta: 5,
              metadata: {
                button_location: 'float_button',
                page_url: window.location.href,
                timestamp: new Date().toISOString()
              }
            })
          });

          console.log('📈 Lead score updated for WhatsApp click');
        } catch (scoreError) {
          console.warn('Score update failed:', scoreError);
        }
      }

      // 4. Abrir WhatsApp con mensaje personalizado
      const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;

      // Abrir en nueva ventana/tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      console.log('📱 WhatsApp clicked - Tracking completed');

    } catch (error) {
      console.error('Error en WhatsApp click tracking:', error);

      // Aún así abrir WhatsApp
      const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Botón flotante principal */}
      <div
        className={`
          fixed bottom-6 right-6 z-50
          transition-all duration-300 ease-in-out
          ${isAnimating ? 'animate-pulse' : ''}
          hover:scale-110 hover:shadow-2xl
          lg:bottom-8 lg:right-8
        `}
        style={{
          filter: 'drop-shadow(0 10px 20px rgba(37, 211, 102, 0.3))'
        }}
      >
        <button
          onClick={handleWhatsAppClick}
          className={`
            w-14 h-14 lg:w-16 lg:h-16
            bg-[#25D366] hover:bg-[#20BC5A]
            rounded-full
            flex items-center justify-center
            text-white
            shadow-lg hover:shadow-xl
            transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-[#25D366] focus:ring-opacity-50
            active:scale-95
          `}
          aria-label="Contactar por WhatsApp - Haga clic para abrir chat"
          title="¿Tienes preguntas? Chatea con nosotros en WhatsApp"
        >
          {/* Icono WhatsApp SVG */}
          <svg
            className="w-8 h-8 lg:w-9 lg:h-9"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.506z"/>
          </svg>
        </button>

        {/* Indicador de mensaje (opcional) */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Tooltip (aparece en hover en desktop) */}
      <div className="fixed bottom-6 right-24 z-40 lg:bottom-8 lg:right-28">
        <div className={`
          bg-gray-900 text-white px-3 py-2 rounded-lg text-sm
          opacity-0 scale-95 pointer-events-none
          transition-all duration-200
          hover:opacity-100 hover:scale-100
          hidden lg:block
        `}>
          ¿Tienes preguntas? ¡Chatea con nosotros!
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2">
            <div className="w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppFloatButton;