import React from 'react';
import Header from '../../components/layout/Header';
import { Header5 } from '../../components/pages/inicio/header-05';
import { Layout241 } from '../../components/pages/inicio/layout-241';
import { Layout245 } from '../../components/pages/inicio/layout-245';
import { Layout363 } from '../../components/pages/inicio/layout-363';
import { Layout394 } from '../../components/pages/inicio/layout-394';
import { Layout501 } from '../../components/pages/inicio/layout-501';
import { Faq04 } from '../../components/pages/inicio/faq-04';
import Footer from '../../components/layout/Footer';
import { HomePageMeta } from '../../components/SEO/MetaTags';
import { organizationSchema, websiteSchema } from '../../components/SEO/schemas';
import MetaTags from '../../components/SEO/MetaTags';

const Home = () => {
  return (
    <div className="home-page">
      <MetaTags
        title="Entersys - Automatización Operativa y Certificaciones ISO México"
        description="Worksys: Automatización de procesos con Smartsheet. Expersys: Certificación ISO 9001, 14001, 45001 digital. Partner oficial Smartsheet México. Casos: Awalab, Coca-Cola FEMSA."
        keywords="automatización procesos operativos, Smartsheet México, certificación ISO 9001 México, software manufactura México, implementación Smartsheet, software ISO 9001, trazabilidad alimentos, dashboard operativo tiempo real"
        image="https://www.entersys.mx/imagenes/inicio/hero_office_inicio.webp"
        url="/"
        schemaData={organizationSchema}
        additionalSchemas={[websiteSchema]}
      />
      <Header />
      <Header5 colorScheme={4} />
      <Layout363 colorScheme={4} />
      <Layout394 colorScheme={1} />
      <Layout245 colorScheme={2} />
      <Layout501 colorScheme={4} />
      <Layout241 colorScheme={2} />
      <Faq04 colorScheme={1} />
      <Footer />
    </div>
  );
};

export default Home;