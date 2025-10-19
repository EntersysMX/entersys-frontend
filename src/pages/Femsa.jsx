import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Footer from '../components/layout/Footer';
import { Header37 } from '../components/pages/femsa/header-37';
import { Content17 } from '../components/pages/femsa/content-17';
import { Content2 } from '../components/pages/femsa/content-02';
import { Stats30 } from '../components/pages/femsa/stats-30';
import { Gallery1 } from '../components/pages/femsa/gallery-01';
import { Cta39 } from '../components/pages/femsa/cta-39';

const Femsa = () => {
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Clientes', url: '/clientes' },
    { name: 'Coca-Cola', url: '/clientes/coca-cola' }
  ];

  return (
    <div>
      <Helmet>
        <title>Caso Coca-Cola FEMSA: Worksys en Industria Alimentos y Bebidas México</title>
        <meta name="description" content="Dashboard ejecutivo Worksys para Coca-Cola FEMSA: ver si están ganando o perdiendo en 3 segundos. 714 proyectos sin accidentes. Trazabilidad y gestión calidad automatizada en industria alimentos y bebidas." />
        <meta name="keywords" content="software industria alimentos, software bebidas México, trazabilidad alimentos, caso éxito Coca-Cola, gestión calidad alimentos, software manufactura bebidas, dashboard ejecutivo alimentos" />
        <link rel="canonical" href="https://www.entersys.mx/clientes/coca-cola" />
      </Helmet>
      <Header />
      <div className="container mx-auto px-[5%] pt-4">
        <Breadcrumbs customItems={breadcrumbItems} />
      </div>
      <Header37 />
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
