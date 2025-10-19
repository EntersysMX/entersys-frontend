import React from "react";
import Header from "../components/layout/Header";
import { BlogPostHeader01 } from "../components/pages/awalab/blog-post-header-01";
import { Content27 } from "../components/pages/awalab/content-27";
import { Content271 } from "../components/pages/awalab/content-27_1";
import { Stats30 } from "../components/pages/awalab/stats-30";
import { Testimonial17 } from "../components/pages/awalab/testimonial-17";
import { Gallery01 } from "../components/pages/awalab/gallery-01";
import { Cta39 } from "../components/pages/awalab/cta-39";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";

export default function Awalab() {
  return (
    <div>
      <MetaTags
        title="Caso Awalab: 7 Años con Worksys - Software Gestión Laboratorio México"
        description="Awalab, laboratorio de análisis clínicos, usa Worksys desde 2018. 7 años manteniendo certificación ISO sin observaciones mayores. Software LIMS con Smartsheet."
        keywords="software gestión laboratorio, LIMS México, caso de éxito Worksys, certificación ISO laboratorio, software laboratorio clínico, gestión muestras laboratorio"
        image="https://www.entersys.mx/imagenes/clientes/awalab.webp"
        url="/awalab"
        type="article"
      />
      <Header />
      <BlogPostHeader01 colorScheme={1} />
      <Content27 colorScheme={1} />
      <Content271 colorScheme={1} />
      <Stats30 colorScheme={2} />
      <Testimonial17 colorScheme={1} />
      <Gallery01 colorScheme={4} />
      <Cta39 colorScheme={3} />
      <Footer />
    </div>
  );
}