import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/layout/Header";
import { Header114 } from "../components/pages/nosotros/header-114";
import { Layout93 } from "../components/pages/nosotros/layout-93";
import { Layout141 } from "../components/pages/nosotros/layout-141";
import { Layout213 } from "../components/pages/nosotros/layout-213";
import { Timeline20 } from "../components/pages/nosotros/timeline-20";
import { Logo03 } from "../components/pages/nosotros/logo-03";
import { Cta39 } from "../components/pages/nosotros/cta-39";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";
import { nosotrosVideoSchema, ctaCasosExitoImageSchema } from "../components/SEO/schemas";

export default function Nosotros() {
  return (
    <div>
      <MetaTags
        title="Nosotros - Entersys | Innovación y Transformación Digital"
        description="Conoce la historia de Entersys y nuestro equipo. Ayudamos a empresas a automatizar operaciones y obtener certificaciones de calidad."
        keywords="Entersys, nosotros, equipo, innovación, transformación digital, historia empresa"
        image="https://www.entersys.mx/imagenes/nosotros/banner_leaders_entersys_nosotros.webp"
        url="/nosotros"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(nosotrosVideoSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(ctaCasosExitoImageSchema)}
        </script>
      </Helmet>
      <Header />
      <Header114 colorScheme={4} />
      <Layout141 colorScheme={2} />
      <Layout93 colorScheme={2} />
      <Timeline20 colorScheme={4} />
      <Layout213 colorScheme={1} />
      <Logo03 colorScheme={1} />
      <Cta39 colorScheme={1} />
      <Footer />
    </div>
  );
}
