import React from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { Header30 } from "../components/pages/expersys/header-30";
import { Layout16 } from "../components/pages/expersys/layout-16";
import { Layout121 } from "../components/pages/expersys/layout-121";
import { Layout239 } from "../components/pages/expersys/layout-239";
import { Layout253 } from "../components/pages/expersys/layout-253";
import { Layout492 } from "../components/pages/expersys/layout-492";
// import { Blog37 } from "../components/pages/expersys/blog-37";
import { Faq05 } from "../components/pages/expersys/faq-05";
import { Cta39 } from "../components/pages/expersys/cta-39";
import MetaTags from "../components/SEO/MetaTags";
import { expersysServiceSchema } from "../components/SEO/schemas";

export default function Expersys() {
  return (
    <>
      <MetaTags
        title="Expersys - Certificaciones ISO y Gestión de Calidad | Entersys"
        description="Obtén certificaciones de calidad operativa: ISO 9001, SMETA, ECOVADIS, ISO 14001, ISO 45001. Acompañamiento inicio a fin."
        keywords="Expersys, certificaciones ISO, gestión calidad, SMETA, ECOVADIS, ISO 9001, ISO 14001, auditoría"
        image="https://www.entersys.mx/imagenes/expersys/hero_quality_expersys.webp"
        url="/expersys"
        schemaData={expersysServiceSchema}
      />
      <Header />
      <main>
        <Header30 colorScheme={2} />
        <Layout16 colorScheme={2} />
        <Layout492 colorScheme={4} />
        <Layout121 colorScheme={2} />
        <Layout253 colorScheme={1} />
        <Layout239 colorScheme={4} />
        {/* <Blog37 colorScheme={2} /> */}
        <Cta39 colorScheme={3} />
        <Faq05 colorScheme={1} />
      </main>
      <Footer />
    </>
  );
}
