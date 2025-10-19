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
        title="Expersys - Certificación ISO 9001, 14001, 45001 y SMETA Digital México"
        description="Certificaciones ISO digitalizadas con Smartsheet. Auditorías sin estrés, documentación organizada, preparación express. Caso: Awalab 7 años certificado sin observaciones. Software ISO 9001."
        keywords="certificación ISO 9001 México, software ISO 9001, auditoría ISO, sistema gestión calidad digital, consultor ISO México, preparación auditoría ISO 9001, software SMETA"
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
