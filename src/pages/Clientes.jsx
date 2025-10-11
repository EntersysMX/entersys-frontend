import React from "react";
import Header from "../components/layout/Header";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import { Header64 } from "../components/pages/clientes/header-64";
import { Portfolio09 } from "../components/pages/clientes/portfolio-09";
import { Event23 } from "../components/pages/clientes/event-23";
import { Cta39 } from "../components/pages/clientes/cta-39";
import Footer from "../components/layout/Footer";
import MetaTags from "../components/SEO/MetaTags";

export default function Clientes() {
  return (
    <div>
      <MetaTags
        title="Clientes y Casos de Éxito - Entersys"
        description="Descubre cómo empresas mexicanas han transformado sus operaciones con Worksys y Expersys. Casos de éxito reales con resultados medibles."
        keywords="casos de éxito, clientes Entersys, testimonios, resultados, transformación digital, FEMSA, QHSE, Ochoa"
        image="https://www.entersys.com.mx/imagenes/clientes/hero_clients_clientes.webp"
        url="/clientes"
      />
      <Header />
      <div className="container mx-auto px-[5%] pt-4">
        <Breadcrumbs />
      </div>
      <Header64 colorScheme={2} />
      <Portfolio09 colorScheme={1} />
      <Event23 colorScheme={1} />
      <Cta39 colorScheme={3} />
      <Footer />
    </div>
  );
}
