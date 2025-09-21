import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Home/Hero';
import Services from '../components/sections/Home/Services';
import Differentiators from '../components/sections/Home/Differentiators';
import Value from '../components/sections/Home/Value';
import Technology from '../components/sections/Home/Technology';
import Industries from '../components/sections/Home/Industries';
import FAQ from '../components/sections/Home/FAQ';
import Footer from '../components/layout/Footer';

export default function Inicio() {
  return (
    <div className="home-page">
      <Header colorScheme={4} />
      <Hero colorScheme={4} />
      <Services colorScheme={4} />
      <Differentiators colorScheme={1} />
      <Value colorScheme={2} />
      <Technology colorScheme={4} />
      <Industries colorScheme={2} />
      <FAQ colorScheme={1} />
      <Footer colorScheme={5} />
    </div>
  );
}
