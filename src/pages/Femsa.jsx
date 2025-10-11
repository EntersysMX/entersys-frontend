import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Header41 } from '../components/pages/femsa/header-41';
import { Content17 } from '../components/pages/femsa/content-17';
import { Content2 } from '../components/pages/femsa/content-02';
import { Stats30 } from '../components/pages/femsa/stats-30';
import { Gallery1 } from '../components/pages/femsa/gallery-01';
import { Cta39 } from '../components/pages/femsa/cta-39';

const Femsa = () => {
  return (
    <div>
      <Helmet>
        <title>Caso de éxito FEMSA: 714 proyectos sin accidentes con Worksys | Entersys</title>
        <meta name="description" content="Descubre cómo FEMSA estandarizó la gestión de contratistas en 225 unidades operativas con automatización en Smartsheets, logrando 714 proyectos de alto riesgo sin accidentes." />
        <meta name="keywords" content="FEMSA, Worksys, Smartsheets, Seguridad Industrial, Gestión de Contratistas, Alto Riesgo, Automatización de Procesos" />
        <link rel="canonical" href="https://entersys.com.mx/casos-exito/femsa-seguridad-industrial-smartsheets" />
      </Helmet>
      <Header />
      <Header41 />
      <Content17 />
      <Content2 />
      <Stats30 />
      <Gallery1 />
      <Cta39 />
      <Footer />
    </div>
  );
};

export default Femsa;
