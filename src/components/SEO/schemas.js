// Schema markup definitions for SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Entersys",
  "url": "https://www.entersys.com.mx",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.entersys.com.mx/imagenes/logo-entersys.png",
    "width": 400,
    "height": 200
  },
  "image": [
    "https://www.entersys.com.mx/imagenes/inicio/hero_office_inicio.webp",
    "https://www.entersys.com.mx/imagenes/nosotros/banner_leaders_entersys_nosotros.webp"
  ],
  "description": "Entersys transforma operaciones empresariales con Worksys y Expersys. Automatización de procesos, gestión de calidad y sistemas de certificación para PYMES en México.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ciudad de México",
    "addressRegion": "CDMX",
    "addressCountry": "MX"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+52-56-2568-3662",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"],
      "serviceArea": {
        "@type": "Country",
        "name": "México"
      }
    }
  ],
  "sameAs": [
    "https://www.facebook.com/entersysmx",
    "https://www.linkedin.com/company/entersysmx",
    "https://www.youtube.com/@EntersysMX",
    "https://wa.me/5625683662"
  ]
};

// WorkSys Service Schema
export const worksysServiceSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Worksys - Sistema de Gestión de Procesos Empresariales",
  "description": "Plataforma integral que automatiza workflows empresariales, centraliza tareas y proporciona dashboards ejecutivos para PYMES. Reduce tareas manuales y mejora eficiencia operativa.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "Consultar",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Entersys",
    "url": "https://www.entersys.com.mx"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 25,
    "bestRating": 5
  }
};

// ExperSys Service Schema
export const expersysServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Expersys - Sistema de Gestión de Calidad y Certificaciones",
  "description": "Servicio de acompañamiento para certificaciones de calidad y cumplimiento normativo. ISO 9001, SMETA, ECOVADIS, ISO 14001, ISO 45001.",
  "serviceType": "Quality Management System",
  "provider": {
    "@type": "Organization",
    "name": "Entersys",
    "url": "https://www.entersys.com.mx"
  },
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 18,
    "bestRating": 5
  }
};

// FAQ Schema generator
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// WebSite Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Entersys",
  "alternateName": "Entersys México",
  "url": "https://www.entersys.com.mx",
  "description": "Plataforma de automatización empresarial y gestión de calidad para PYMES en México",
  "publisher": {
    "@type": "Organization",
    "name": "Entersys",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.entersys.com.mx/imagenes/logo-entersys.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.entersys.com.mx/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "es-MX"
};

// BreadcrumbList Schema generator
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url ? `https://www.entersys.com.mx${item.url}` : undefined
  }))
});

// LocalBusiness Schema para las oficinas
export const cdmxOfficeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Entersys CDMX",
  "image": "https://www.entersys.com.mx/imagenes/contacto/cdmx.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Paseo de la Reforma",
    "addressLocality": "Ciudad de México",
    "addressRegion": "CDMX",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.4326",
    "longitude": "-99.1332"
  },
  "telephone": "+52-56-2568-3662",
  "email": "contacto@entersys.com",
  "url": "https://www.entersys.com.mx",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00"
};

export const monterreyOfficeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Entersys Monterrey",
  "image": "https://www.entersys.com.mx/imagenes/contacto/monterrey_skyline.webp",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Monterrey",
    "addressRegion": "Nuevo León",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.6866",
    "longitude": "-100.3161"
  },
  "telephone": "+52-56-2568-3662",
  "email": "contacto@entersys.com",
  "url": "https://www.entersys.com.mx",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00"
};

// Video Schema para YouTube (Página Nosotros)
export const nosotrosVideoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Entersys - Nuestra Historia de Transformación Digital",
  "description": "Conoce la historia de Entersys y cómo ayudamos a empresas a automatizar operaciones y obtener certificaciones de calidad mediante Worksys y Expersys.",
  "thumbnailUrl": "https://img.youtube.com/vi/IgAEUzW6Yis/maxresdefault.jpg",
  "uploadDate": "2024-01-01T00:00:00Z",
  "contentUrl": "https://www.youtube.com/watch?v=IgAEUzW6Yis",
  "embedUrl": "https://www.youtube.com/embed/IgAEUzW6Yis",
  "duration": "PT3M",
  "publisher": {
    "@type": "Organization",
    "name": "Entersys",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.entersys.com.mx/imagenes/logo-entersys.png"
    }
  },
  "inLanguage": "es-MX"
};

// ItemList Schema para Casos de Éxito (Worksys)
export const casosExitoSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Casos de Éxito Entersys - Worksys",
  "description": "Empresas que han transformado sus operaciones con Worksys",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Organization",
        "name": "Productos de Maíz Ochoa",
        "description": "Elaboración de productos de maíz con calidad e higiene ubicada en el bajío Querétaro.",
        "url": "https://www.entersys.com.mx/clientes/ochoa",
        "image": "https://www.entersys.com.mx/imagenes/worksys/icon_grass_worksys.svg"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Organization",
        "name": "QHSE",
        "description": "Líder en soluciones industriales del sector laboratorio y tratamiento de agua.",
        "url": "https://www.entersys.com.mx/clientes/qhse",
        "image": "https://www.entersys.com.mx/imagenes/worksys/icon_water_bottle_worksys.svg"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Organization",
        "name": "SCRAM",
        "description": "Integradora de soluciones tecnológicas para empresas ubicada en Cuautitlán Izcalli.",
        "image": "https://www.entersys.com.mx/imagenes/worksys/icon_devices_worksys.svg"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Organization",
        "name": "Chilango Garage",
        "description": "Empresa de servicios mecánicos automotrices ubicado en Cuajimalpa.",
        "image": "https://www.entersys.com.mx/imagenes/worksys/icon_cargear_worksys.svg"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Organization",
        "name": "FEMSA",
        "description": "Digitalización de gestión y documentación de contratistas para trabajos de alto riesgo.",
        "url": "https://www.entersys.com.mx/clientes/femsa",
        "image": "https://www.entersys.com.mx/imagenes/worksys/icon_brandfamily_worksys.svg"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Organization",
        "name": "MLM",
        "description": "Empresa de manufactura volumétrica de materiales promocionales para marcas del país.",
        "image": "https://www.entersys.com.mx/imagenes/worksys/icon_brandfamily_worksys.svg"
      }
    }
  ]
};

// ImageObject Schema para Casos de Éxito CTA
export const ctaCasosExitoImageSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "Casos de Éxito Entersys",
  "description": "Empresas que han transformado sus operaciones con las soluciones de Entersys",
  "contentUrl": "https://www.entersys.com.mx/imagenes/nosotros/casos_exitio_Entersys.webp",
  "url": "https://www.entersys.com.mx/imagenes/nosotros/casos_exitio_Entersys.webp",
  "width": 1200,
  "height": 900,
  "encodingFormat": "image/webp",
  "author": {
    "@type": "Organization",
    "name": "Entersys"
  }
};
