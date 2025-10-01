import React from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { Header30 } from "../components/pages/expersys/header-30";
import { Layout16 } from "../components/pages/expersys/layout-16";
import { Layout121 } from "../components/pages/expersys/layout-121";
import { Layout239 } from "../components/pages/expersys/layout-239";
import { Layout253 } from "../components/pages/expersys/layout-253";
import { Layout492 } from "../components/pages/expersys/layout-492";
import { Blog37 } from "../components/pages/expersys/blog-37";
import { Faq05 } from "../components/pages/expersys/faq-05";
import { Cta39 } from "../components/pages/expersys/cta-39";

export default function Expersys() {
  return (
    <>
      <Header />
      <main>
        <Header30 colorScheme={2} />
        <Layout16 colorScheme={2} />
        <Layout492 colorScheme={4} />
        <Layout121 colorScheme={2} />
        <Layout253 colorScheme={1} />
        <Layout239 colorScheme={4} />
        <Blog37 colorScheme={2} />
        <Cta39 colorScheme={3} />
        <Faq05 colorScheme={1} />
      </main>
      <Footer />
    </>
  );
}
