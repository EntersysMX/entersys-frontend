import React from 'react';
import { analyticsService } from '../services/analytics';

/**
 * TrackedLink - Componente para links con tracking automático
 *
 * Facilita agregar tracking de analytics a cualquier link sin código duplicado.
 * Soporta: links externos, descargas de PDFs, redes sociales, etc.
 *
 * @example
 * // Link externo
 * <TrackedLink href="https://example.com" type="external">
 *   Visitar sitio
 * </TrackedLink>
 *
 * // Descarga de PDF
 * <TrackedLink href="/brochure.pdf" type="download" fileName="Brochure Worksys">
 *   Descargar brochure
 * </TrackedLink>
 *
 * // Red social
 * <TrackedLink href="https://facebook.com/entersys" type="social" socialNetwork="facebook">
 *   Síguenos en Facebook
 * </TrackedLink>
 */
export const TrackedLink = ({
  href,
  type = 'external', // 'external', 'download', 'social', 'internal'
  fileName = null,
  fileType = 'PDF',
  socialNetwork = null,
  trackingName = null,
  children,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props
}) => {

  const handleClick = (e) => {
    try {
      // Determinar qué tipo de tracking aplicar
      switch (type) {
        case 'download':
          const downloadName = fileName || href.split('/').pop();
          analyticsService.trackDownload(downloadName, fileType);

          // Track user engagement con download
          analyticsService.trackEvent('Content', 'Download', `${fileType}: ${downloadName}`);
          break;

        case 'social':
          const network = socialNetwork || 'unknown';
          analyticsService.trackEvent('Navigation', 'Social Click', network);
          analyticsService.trackLink(href, 'social_media');
          break;

        case 'external':
          const linkName = trackingName || new URL(href).hostname;
          analyticsService.trackLink(href, 'outbound');
          analyticsService.trackEvent('Navigation', 'External Link', linkName);
          break;

        case 'internal':
          analyticsService.trackLink(href, 'internal');
          analyticsService.trackEvent('Navigation', 'Internal Link', href);
          break;

        default:
          analyticsService.trackLink(href, type);
      }
    } catch (error) {
      console.error('Error tracking link:', error);
      // No bloquear la navegación si falla el tracking
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={type === 'internal' ? '_self' : target}
      rel={type === 'internal' ? undefined : rel}
      {...props}
    >
      {children}
    </a>
  );
};

/**
 * TrackedButton - Botón con tracking automático
 *
 * @example
 * <TrackedButton
 *   category="CTA"
 *   action="Demo Request"
 *   name="Hero CTA"
 *   onClick={() => handleDemoRequest()}
 * >
 *   Solicitar Demo
 * </TrackedButton>
 */
export const TrackedButton = ({
  category = 'CTA',
  action = 'Button Click',
  name = null,
  value = null,
  onClick = null,
  children,
  className = '',
  ...props
}) => {

  const handleClick = (e) => {
    try {
      // Track el evento
      analyticsService.trackEvent(category, action, name, value);

      // Ejecutar el onClick original si existe
      if (onClick) {
        onClick(e);
      }
    } catch (error) {
      console.error('Error tracking button:', error);
      // No bloquear la acción si falla el tracking
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * useTrackPageView - Hook para trackear page views automáticamente
 *
 * @example
 * function MyPage() {
 *   useTrackPageView('Product Page - Worksys');
 *   return <div>...</div>;
 * }
 */
export const useTrackPageView = (pageName) => {
  React.useEffect(() => {
    analyticsService.trackPageView(pageName);
  }, [pageName]);
};

/**
 * useTrackUserContext - Hook para trackear contexto del usuario al montar el componente
 *
 * @example
 * function ProductPage() {
 *   useTrackUserContext({
 *     journeyStage: 'consideration',
 *     leadSource: 'organic'
 *   });
 *   return <div>...</div>;
 * }
 */
export const useTrackUserContext = (userData) => {
  React.useEffect(() => {
    if (userData) {
      analyticsService.trackUserContext(userData);
    }
  }, [JSON.stringify(userData)]);
};

export default TrackedLink;
