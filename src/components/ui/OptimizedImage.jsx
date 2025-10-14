import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * OptimizedImage Component
 * Silicon Valley-style image optimization con lazy loading, WebP support y blur-up effect
 *
 * Features:
 * - Lazy loading automático
 * - Soporte WebP con fallback
 * - Blur-up placeholder effect
 * - Responsive images con srcSet
 * - Performance optimizado
 */

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  style = {},
  threshold = 100, // Pixeles antes de entrar en viewport para comenzar carga
  effect = 'blur', // 'blur' | 'opacity' | 'black-and-white'
  placeholderSrc,
  wrapperClassName = '',
  ...props
}) => {
  // Si la imagen ya es WebP, usar tal cual
  // Si no, intentar cargar versión WebP si existe
  const getWebPSource = (imageSrc) => {
    if (!imageSrc) return null;

    // Si ya es WebP, retornar tal cual
    if (imageSrc.endsWith('.webp')) return imageSrc;

    // Si es URL absoluta (CDN), usar tal cual
    if (imageSrc.startsWith('http')) return imageSrc;

    // Para imágenes locales, intentar versión WebP
    const webpSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpSrc;
  };

  const webpSrc = getWebPSource(src);
  const originalSrc = src;

  // Placeholder por defecto - un data URL de 1x1 pixel gris claro
  const defaultPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%23f3f4f6" width="1" height="1"/%3E%3C/svg%3E';

  return (
    <picture className={`block ${wrapperClassName}`}>
      {/* WebP source para navegadores que lo soporten */}
      {webpSrc && webpSrc !== originalSrc && (
        <source srcSet={webpSrc} type="image/webp" />
      )}

      {/* Fallback a formato original */}
      <LazyLoadImage
        src={originalSrc}
        alt={alt}
        className={`block ${className}`}
        width={width}
        height={height}
        style={style}
        effect={effect}
        threshold={threshold}
        placeholderSrc={placeholderSrc || defaultPlaceholder}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
