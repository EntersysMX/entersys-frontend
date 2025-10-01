import React from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { Header64 } from "../components/pages/servicios/header-64";
import { Layout423 } from "../components/pages/servicios/layout-423";
import { Layout362 } from "../components/pages/servicios/layout-362";
import { Layout395 } from "../components/pages/servicios/layout-395";
import { Layout239 } from "../components/pages/servicios/layout-239";
import { Testimonial17 } from "../components/pages/servicios/testimonial-17";
import { Faq05 } from "../components/pages/servicios/faq-05";
import { Cta39 } from "../components/pages/servicios/cta-39";

export function Servicios() {
  return (
    <>
      <Header />
      <main>
        <Header64 colorScheme={2} />
        <Layout423 colorScheme={1} />
        <Layout362 colorScheme={1} />
        <Layout395 colorScheme={1} />
        <Layout239 colorScheme={1} />
        <Testimonial17 colorScheme={3} />
        <Faq05 colorScheme={1} />
        <Cta39 colorScheme={3} />
      </main>
      <Footer />
    </>
  );
}

export default Servicios;
