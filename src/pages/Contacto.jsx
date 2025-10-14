import React from "react";
import Header from "../components/layout/Header";
import { Header64 } from "../components/pages/contacto/header-64";
import { Contact06 } from "../components/pages/contacto/contact-06";
import { Contact13 } from "../components/pages/contacto/contact-13";
import { Contact26 } from "../components/pages/contacto/contact-26";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";
import { cdmxOfficeSchema, monterreyOfficeSchema } from "../components/SEO/schemas";

export default function Contacto() {
  return (
    <div>
      <MetaTags
        title="Contacto - Entersys | Solicita tu Demo Gratuita"
        description="Contacta a Entersys para una demo gratuita de Worksys o Expersys. CDMX y Monterrey. Tel: +52 56 2568 3662"
        keywords="contacto Entersys, demo gratuita, agendar reunión, CDMX, Monterrey, WhatsApp"
        image="https://www.entersys.mx/imagenes/contacto/cdmx.webp"
        url="/contacto"
        additionalSchemas={[cdmxOfficeSchema, monterreyOfficeSchema]}
      />
      <Header />
      <Header64 colorScheme={4} />
      <Contact06 colorScheme={2} />
      <Contact13 colorScheme={3} />
      <Contact26 colorScheme={1} />
      <Footer />
    </div>
  );
}
