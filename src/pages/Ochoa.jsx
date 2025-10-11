import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Header41 } from '../components/pages/ochoa/header-41';
import { Content17 } from '../components/pages/ochoa/content-17';
import { Content2 } from '../components/pages/ochoa/content-02';
import { Stats30 } from '../components/pages/ochoa/stats-30';
import { Gallery1 } from '../components/pages/ochoa/gallery-01';
import { Cta39 } from '../components/pages/ochoa/cta-39';

const Ochoa = () => {
  return (
    <div>
      <Helmet>
        <title>Caso de éxito Productos de Maíz Ochoa: 95% calidad con Worksys | Entersys</title>
        <meta name="description" content="Descubre cómo Productos de Maíz Ochoa pasó del 56% al 95% de cumplimiento en calidad mediante digitalización de análisis de producción con Smartsheets y Daily Management." />
        <meta name="keywords" content="Productos de Maíz Ochoa, Worksys, Expersys, Control de Calidad, Smartsheets, Daily Management, Industria Alimenticia, Análisis de Producción" />
        <link rel="canonical" href="https://entersys.com.mx/casos-exito/productos-maiz-ochoa-calidad-dashboards" />
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

export default Ochoa;
