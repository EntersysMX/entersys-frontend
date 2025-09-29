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

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Header5 colorScheme={4} />
      <Layout363 colorScheme={4} />
      <Layout241 colorScheme={2} />
      <Layout501 colorScheme={4} />
      <Layout245 colorScheme={2} />
      <Layout394 colorScheme={1} />
      <Faq04 colorScheme={1} />
      <Footer />
    </div>
  );
};

export default Home;