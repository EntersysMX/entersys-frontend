import { Helmet } from 'react-helmet-async';

/**
 * Componente para SEO meta tags por página
 * Uso: <SEOHead title="..." description="..." keywords="..." />
 */
export default function SEOHead({
  title = "Entersys - Automatización Operativa y Certificaciones ISO",
  description = "Worksys: Automatización de procesos con Smartsheet. Expersys: Certificación ISO 9001, 14001, 45001 y SMETA digital. Partner oficial Smartsheet México.",
  keywords = "automatización procesos, Smartsheet México, certificación ISO 9001, software manufactura, Worksys, Expersys",
  ogImage = "https://www.entersys.mx/imagenes/inicio/hero_principal_inicio-escritorio.webp",
  ogType = "website",
  canonical,
  noindex = false,
  schema
}) {
  const siteUrl = "https://www.entersys.mx";
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Entersys" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="author" content="Entersys" />
      <meta name="geo.region" content="MX" />
      <meta name="geo.placename" content="México" />
      <meta name="language" content="Spanish" />

      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
