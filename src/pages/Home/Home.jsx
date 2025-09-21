import React from 'react';
import Header from '../../components/layout/Header';
import Hero from '../../components/sections/Home/Hero';
import Services from '../../components/sections/Home/Services';
import Differentiators from '../../components/sections/Home/Differentiators';
import Value from '../../components/sections/Home/Value';
import Technology from '../../components/sections/Home/Technology';
import FAQ from '../../components/sections/Home/FAQ';
import Footer from '../../components/layout/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header colorScheme={4} />
      <Hero colorScheme={4} />
      <Services colorScheme={4} />
      <Differentiators colorScheme={1} />
      <Value colorScheme={2} />
      <Technology colorScheme={4} />
      <FAQ colorScheme={1} />
      <Footer colorScheme={1} />
    </div>
  );
};

export default Home;