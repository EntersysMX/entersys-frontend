/**
 * SEO Utilities
 * Advanced SEO helpers para Open Graph, Twitter Cards, y Schema.org
 */

/**
 * Configuración base del sitio
 */
export const SITE_CONFIG = {
  name: 'Entersys',
  url: 'https://www.entersys.mx',
  description: 'Transformamos operaciones empresariales con Worksys y Expersys. Automatización de procesos, gestión de calidad y certificaciones ISO para PYMES en México.',
  locale: 'es_MX',
  twitter: '@entersysmx',
  facebook: 'https://www.facebook.com/entersysmx',
  instagram: '@entersysmx',
  linkedin: 'https://www.linkedin.com/company/entersysmx',
  logo: 'https://www.entersys.mx/imago-logo_entersys.png',
  defaultImage: 'https://www.entersys.mx/imagenes/og-image-default.png',
};

/**
 * Genera meta tags de Open Graph
 */
export const generateOpenGraphTags = ({
  title,
  description,
  image = SITE_CONFIG.defaultImage,
  url,
  type = 'website',
  locale = SITE_CONFIG.locale,
}) => {
  return {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url || `${SITE_CONFIG.url}${window.location.pathname}`,
    'og:type': type,
    'og:locale': locale,
    'og:site_name': SITE_CONFIG.name,
  };
};

/**
 * Genera meta tags de Twitter Cards
 */
export const generateTwitterCardTags = ({
  title,
  description,
  image = SITE_CONFIG.defaultImage,
  card = 'summary_large_image',
}) => {
  return {
    'twitter:card': card,
    'twitter:site': SITE_CONFIG.twitter,
    'twitter:creator': SITE_CONFIG.twitter,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
};

/**
 * Genera JSON-LD para Organization
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    description: SITE_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
      addressLocality: 'México',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-56-2568-3662',
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      SITE_CONFIG.facebook,
      SITE_CONFIG.linkedin,
      `https://www.instagram.com/${SITE_CONFIG.instagram}`,
      `https://twitter.com/${SITE_CONFIG.twitter}`,
    ],
  };
};

/**
 * Genera JSON-LD para WebSite
 */
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/buscar?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Genera JSON-LD para BreadcrumbList
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
};

/**
 * Genera JSON-LD para Article/BlogPosting
 */
export const generateArticleSchema = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = SITE_CONFIG.name,
  url,
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || SITE_CONFIG.defaultImage,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url || `${SITE_CONFIG.url}${window.location.pathname}`,
    },
  };
};

/**
 * Genera JSON-LD para Product
 */
export const generateProductSchema = ({
  name,
  description,
  image,
  brand = SITE_CONFIG.name,
  url,
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: image || SITE_CONFIG.defaultImage,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    url: url || `${SITE_CONFIG.url}${window.location.pathname}`,
  };
};

/**
 * Genera JSON-LD para Service
 */
export const generateServiceSchema = ({
  name,
  description,
  provider = SITE_CONFIG.name,
  areaServed = 'MX',
  url,
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed: {
      '@type': 'Country',
      name: areaServed,
    },
    url: url || `${SITE_CONFIG.url}${window.location.pathname}`,
  };
};

/**
 * Genera JSON-LD para FAQPage
 */
export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Inyecta JSON-LD en el head del documento
 */
export const injectJSONLD = (schema) => {
  // Remover script anterior si existe
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Crear nuevo script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Actualiza meta tags dinámicamente
 */
export const updateMetaTags = (tags) => {
  Object.entries(tags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[property="${name}"]`);

    if (!meta) {
      meta = document.querySelector(`meta[name="${name}"]`);
    }

    if (meta) {
      meta.setAttribute('content', content);
    } else {
      // Crear nuevo meta tag
      meta = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('fb:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  });
};

/**
 * Configuración SEO completa para una página
 */
export const configureSEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  schema,
  breadcrumbs,
}) => {
  // Actualizar título
  document.title = `${title} | ${SITE_CONFIG.name}`;

  // Meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url || `${SITE_CONFIG.url}${window.location.pathname}`);

  // Open Graph tags
  const ogTags = generateOpenGraphTags({ title, description, image, url, type });
  updateMetaTags(ogTags);

  // Twitter Card tags
  const twitterTags = generateTwitterCardTags({ title, description, image });
  updateMetaTags(twitterTags);

  // JSON-LD Schema
  if (schema) {
    injectJSONLD(schema);
  }

  // Breadcrumbs
  if (breadcrumbs) {
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
    injectJSONLD(breadcrumbSchema);
  }
};

/**
 * Helper para páginas de producto
 */
export const configureProductSEO = ({ name, description, image, url }) => {
  const schema = generateProductSchema({ name, description, image, url });

  configureSEO({
    title: name,
    description: description,
    image: image,
    url: url,
    type: 'product',
    schema: schema,
  });
};

/**
 * Helper para páginas de servicio
 */
export const configureServiceSEO = ({ name, description, url }) => {
  const schema = generateServiceSchema({ name, description, url });

  configureSEO({
    title: name,
    description: description,
    url: url,
    type: 'website',
    schema: schema,
  });
};

/**
 * Helper para artículos/blog
 */
export const configureArticleSEO = ({
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
}) => {
  const schema = generateArticleSchema({
    title,
    description,
    image,
    url,
    datePublished,
    dateModified,
  });

  configureSEO({
    title: title,
    description: description,
    image: image,
    url: url,
    type: 'article',
    schema: schema,
  });
};

export default {
  SITE_CONFIG,
  generateOpenGraphTags,
  generateTwitterCardTags,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateProductSchema,
  generateServiceSchema,
  generateFAQSchema,
  injectJSONLD,
  updateMetaTags,
  configureSEO,
  configureProductSEO,
  configureServiceSEO,
  configureArticleSEO,
};
