import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { configureSEO, SITE_CONFIG, injectJSONLD } from '../utils/seo';

/**
 * SEOHead Component
 * Componente React para configurar SEO dinámicamente usando react-helmet-async
 */
const SEOHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  schema,
  breadcrumbs,
  keywords,
  author,
  noindex = false,
  nofollow = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name;
  const finalDescription = description || SITE_CONFIG.description;
  const finalImage = image || SITE_CONFIG.defaultImage;
  const finalUrl = url || `${SITE_CONFIG.url}${window.location.pathname}`;

  useEffect(() => {
    // Inyectar JSON-LD si se proporciona schema
    if (schema) {
      injectJSONLD(schema);
    }
  }, [schema]);

  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  if (nofollow) robotsContent.push('nofollow');
  const robotsMeta = robotsContent.length > 0 ? robotsContent.join(', ') : 'index, follow';

  return (
    <Helmet>
      {/* Título y meta básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsMeta} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitter} />
      <meta name="twitter:creator" content={SITE_CONFIG.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Additional meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0066cc" />
    </Helmet>
  );
};

export default SEOHead;
