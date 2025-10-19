/**
 * Schema.org para Servicios (Worksys y Expersys)
 * Para páginas /worksys y /expersys
 */

export const worksysSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Business Process Automation",
  "name": "Worksys",
  "description": "Automatización de procesos operativos con Smartsheet. Migración de Excel a dashboards colaborativos en tiempo real. Implementación rápida para manufactura, franquicias y multi-site.",
  "provider": {
    "@type": "Organization",
    "name": "Entersys",
    "url": "https://www.entersys.mx"
  },
  "areaServed": {
    "@type": "Place",
    "name": "México y LATAM"
  },
  "audience": {
    "@type": "BusinessAudience",
    "name": "Empresas de manufactura, alimentos, laboratorios y franquicias"
  },
  "offers": {
    "@type": "Offer",
    "price": "12000",
    "priceCurrency": "USD",
    "priceRange": "$8,000 - $50,000 USD",
    "description": "Implementación de Worksys. Precio según complejidad y alcance del proyecto."
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios Worksys",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Migración de Excel a Smartsheet"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dashboard operativo tiempo real"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Integraciones ERP (SAP, Oracle, Salesforce)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Capacitación y soporte técnico"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "12"
  }
};

export const expersysSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "ISO Certification Consulting",
  "name": "Expersys",
  "description": "Certificación ISO 9001, ISO 14001, ISO 45001 y SMETA con plataforma digital. Auditorías sin estrés, documentación organizada, preparación express.",
  "provider": {
    "@type": "Organization",
    "name": "Entersys",
    "url": "https://www.entersys.mx"
  },
  "areaServed": {
    "@type": "Place",
    "name": "México"
  },
  "audience": {
    "@type": "BusinessAudience",
    "name": "Empresas que buscan certificación ISO o mantener certificaciones existentes"
  },
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "USD",
    "priceRange": "$10,000 - $30,000 USD",
    "description": "Implementación de Expersys y acompañamiento a certificación ISO."
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Certificaciones Expersys",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Certificación ISO 9001 (Sistema de Gestión de Calidad)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Certificación ISO 14001 (Gestión Ambiental)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Certificación ISO 45001 (Seguridad y Salud Ocupacional)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Auditoría SMETA"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "8"
  }
};
