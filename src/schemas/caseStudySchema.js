/**
 * Schema.org para Casos de Éxito (Case Studies)
 * Mejora SEO para páginas de clientes
 */

export function createCaseStudySchema({
  clientName,
  industry,
  challenge,
  solution,
  results,
  datePublished,
  image
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Caso de Éxito: ${clientName}`,
    "description": challenge,
    "author": {
      "@type": "Organization",
      "name": "Entersys"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Entersys",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.entersys.mx/imago-logo_entersys.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "image": image || "https://www.entersys.mx/imagenes/inicio/hero_principal_inicio-escritorio.webp",
    "articleBody": `${challenge} ${solution} ${results}`,
    "articleSection": "Case Study",
    "keywords": `${industry}, automatización, Smartsheet, caso de éxito`,
    "about": {
      "@type": "Thing",
      "name": industry
    }
  };
}

// Caso Awalab predefinido
export const awalab Schema = createCaseStudySchema({
  clientName: "Awalab",
  industry: "Laboratorio de Análisis Clínicos",
  challenge: "Gestión de muestras y certificaciones ISO en hojas de cálculo desorganizadas.",
  solution: "Implementación de Worksys para digitalizar procesos de laboratorio y Expersys para mantener certificación ISO.",
  results: "7 años operando con Worksys sin cambiar plataforma. 0 observaciones mayores en auditorías ISO.",
  datePublished: "2018-01-01", // Ajustar fecha real
  image: "https://www.entersys.mx/imagenes/clientes/awalab.webp" // Ajustar si existe
});

// Caso Coca-Cola predefinido
export const cocaColaSchema = createCaseStudySchema({
  clientName: "Coca-Cola FEMSA",
  industry: "Alimentos y Bebidas",
  challenge: "Falta de visibilidad en tiempo real de operaciones multi-planta.",
  solution: "Dashboard Worksys con KPIs ejecutivos. Automatización de reportes.",
  results: "Dashboard ejecutivo que permite ver si están ganando o perdiendo en 3 segundos.",
  datePublished: "2020-01-01", // Ajustar fecha real
  image: "https://www.entersys.mx/imagenes/clientes/coca-cola.webp" // Ajustar si existe
});
