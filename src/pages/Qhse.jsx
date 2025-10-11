import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Header41 } from '../components/pages/qhse/header-41';
import { Content17 } from '../components/pages/qhse/content-17';
import { Content2 } from '../components/pages/qhse/content-02';
import { Stats30 } from '../components/pages/qhse/stats-30';
import { Gallery1 } from '../components/pages/qhse/gallery-01';
import { Cta39 } from '../components/pages/qhse/cta-39';

const Qhse = () => {
  return (
    <div>
      <Helmet>
        <title>Caso de éxito QHSE: 2,000% de crecimiento con Worksys y ISO 9001 | Entersys</title>
        <meta name="description" content="Descubre cómo QHSE pasó de 11 a 253 millones en 6 años mediante automatización de procesos operativos, certificación ISO 9001 y digitalización en Smartsheets." />
        <meta name="keywords" content="Logística, Worksys, Expersys, ISO 9001, Smartsheets, Automatización de procesos" />
        <link rel="canonical" href="https://entersys.com.mx/casos-exito/qhse-crecimiento-iso-9001-automatizacion" />
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

export default Qhse;
