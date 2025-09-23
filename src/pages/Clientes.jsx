import React from "react";
import Header from "../components/layout/Header";
import { Header64 } from "../components/pages/clientes/header-64";
import { Portfolio09 } from "../components/pages/clientes/portfolio-09";
import { Event23 } from "../components/pages/clientes/event-23";
import { Cta39 } from "../components/pages/clientes/cta-39";
import Footer from "../components/layout/Footer";

export default function Clientes() {
  return (
    <div>
      <Header />
      <Header64 colorScheme={2} />
      <Portfolio09 colorScheme={1} />
      <Event23 colorScheme={1} />
      <Cta39 colorScheme={3} />
      <Footer />
    </div>
  );
}
