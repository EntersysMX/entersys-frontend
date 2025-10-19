/**
 * Schema.org Organization structured data
 * Para SEO: Ayuda a Google entender quién es Entersys
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Entersys",
  "legalName": "Entersys México",
  "url": "https://www.entersys.mx",
  "logo": "https://www.entersys.mx/imago-logo_entersys.png",
  "description": "Automatización de procesos operativos con Smartsheet (Worksys) y certificaciones ISO digitalizadas (Expersys). Partner oficial Smartsheet en México y LATAM.",
  "foundingDate": "2018",
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "addressCountry": "MX"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Monterrey",
      "addressRegion": "Nuevo León",
      "addressCountry": "MX"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contacto@entersys.mx",
    "availableLanguage": ["Spanish", "English"],
    "areaServed": ["MX", "LATAM"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/entersys",
    // Agregar otros perfiles sociales cuando estén disponibles
  ],
  "service": [
    {
      "@type": "Service",
      "name": "Worksys",
      "description": "Automatización de procesos operativos con Smartsheet",
      "provider": {
        "@type": "Organization",
        "name": "Entersys"
      },
      "areaServed": ["MX", "LATAM"],
      "serviceType": "Business Process Automation"
    },
    {
      "@type": "Service",
      "name": "Expersys",
      "description": "Certificaciones ISO 9001, 14001, 45001 y SMETA digitalizadas",
      "provider": {
        "@type": "Organization",
        "name": "Entersys"
      },
      "areaServed": ["MX", "LATAM"],
      "serviceType": "ISO Certification Consulting"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "15"
    // Actualizar con datos reales cuando tengas reviews públicas
  }
};
