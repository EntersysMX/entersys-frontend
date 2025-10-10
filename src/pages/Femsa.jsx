import React from 'react';
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
