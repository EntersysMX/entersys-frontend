import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  schemaData = null,
  additionalSchemas = []
}) => {
  const baseUrl = 'https://www.entersys.com.mx';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const defaultImage = `${baseUrl}/imagenes/og-default.webp`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Entersys" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Entersys" />
      <meta name="language" content="Spanish" />
      <meta name="geo.region" content="MX" />

      {/* Schema Markup */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}

      {/* Additional Schema Markups */}
      {additionalSchemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default MetaTags;

// Pre-configured meta tags for each page
export const HomePageMeta = () => (
  <MetaTags
    title="Entersys - Automatización Empresarial Worksys & Expersys | PYMES México"
    description="Transforma tu operación empresarial con Worksys y Expersys. Automatiza procesos, mejora eficiencia y obtén certificaciones de calidad. Demo gratuita."
    keywords="automatización empresarial, Worksys, Expersys, gestión procesos, PYMES México, software empresarial, certificaciones ISO"
    image="https://www.entersys.com.mx/imagenes/inicio/hero_office_inicio.webp"
    url="/"
  />
);

export const WorksysPageMeta = () => (
  <MetaTags
    title="Worksys - Sistema de Gestión de Procesos Empresariales | Entersys"
    description="Automatiza workflows, centraliza tareas y obtén dashboards ejecutivos en tiempo real. Reduce tareas manuales y mejora la eficiencia operativa."
    keywords="Worksys, automatización procesos, gestión empresarial, workflows, dashboards, PYMES, productividad"
    image="https://www.entersys.com.mx/imagenes/worksys/hero_process_worksys.webp"
    url="/worksys"
  />
);

export const ExpersysPageMeta = () => (
  <MetaTags
    title="Expersys - Certificaciones ISO y Gestión de Calidad | Entersys"
    description="Obtén certificaciones de calidad operativa: ISO 9001, SMETA, ECOVADIS, ISO 14001, ISO 45001. Acompañamiento inicio a fin."
    keywords="Expersys, certificaciones ISO, gestión calidad, SMETA, ECOVADIS, ISO 9001, ISO 14001, auditoría"
    image="https://www.entersys.com.mx/imagenes/expersys/hero_quality_expersys.webp"
    url="/expersys"
  />
);

export const NosotrosPageMeta = () => (
  <MetaTags
    title="Nosotros - Entersys | Innovación y Transformación Digital"
    description="Conoce la historia de Entersys y nuestro equipo. Ayudamos a empresas a automatizar operaciones y obtener certificaciones de calidad."
    keywords="Entersys, nosotros, equipo, innovación, transformación digital, historia empresa"
    image="https://www.entersys.com.mx/imagenes/nosotros/banner_leaders_entersys_nosotros.webp"
    url="/nosotros"
  />
);

export const ClientesPageMeta = () => (
  <MetaTags
    title="Clientes y Casos de Éxito - Entersys"
    description="Descubre cómo empresas mexicanas han transformado sus operaciones con Worksys y Expersys. Casos de éxito reales con resultados medibles."
    keywords="casos de éxito, clientes Entersys, testimonios, resultados, transformación digital, FEMSA, QHSE, Ochoa"
    image="https://www.entersys.com.mx/imagenes/clientes/hero_clients_clientes.webp"
    url="/clientes"
  />
);

export const ContactoPageMeta = () => (
  <MetaTags
    title="Contacto - Entersys | Solicita tu Demo Gratuita"
    description="Contacta a Entersys para una demo gratuita de Worksys o Expersys. CDMX y Monterrey. WhatsApp: 56 2568 3662"
    keywords="contacto Entersys, demo gratuita, agendar reunión, CDMX, Monterrey, WhatsApp"
    image="https://www.entersys.com.mx/imagenes/contacto/cdmx.jpg"
    url="/contacto"
  />
);
