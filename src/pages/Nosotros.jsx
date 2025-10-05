import React from "react";
import Header from "../components/layout/Header";
import { Header114 } from "../components/pages/nosotros/header-114";
import { Layout93 } from "../components/pages/nosotros/layout-93";
import { Layout141 } from "../components/pages/nosotros/layout-141";
import { Layout213 } from "../components/pages/nosotros/layout-213";
import { Timeline20 } from "../components/pages/nosotros/timeline-20";
import { Logo03 } from "../components/pages/nosotros/logo-03";
import { Cta39 } from "../components/pages/nosotros/cta-39";
import Footer from "../components/layout/Footer";

export default function Nosotros() {
  return (
    <div>
      <Header />
      <Header114 colorScheme={4} />
      <Layout141 colorScheme={2} />
      <Layout93 colorScheme={2} />
      <Timeline20 colorScheme={4} />
      <Layout213 colorScheme={1} />
      <Logo03 colorScheme={3} />
      <Cta39 colorScheme={1} />
      <Footer />
    </div>
  );
}
