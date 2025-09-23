import React from "react";
import Header from "../components/layout/Header";
import { Header30 } from "../components/pages/expersys/header-30";
import { Layout16 } from "../components/pages/expersys/layout-16";
import { Layout239 } from "../components/pages/expersys/layout-239";
import { Layout253 } from "../components/pages/expersys/layout-253";
import { Layout492 } from "../components/pages/expersys/layout-492";
import { Faq05 } from "../components/pages/expersys/faq-05";
import { Cta39 } from "../components/pages/expersys/cta-39";
import Footer from "../components/layout/Footer";

export default function Expersys() {
  return (
    <div>
      <Header />
      <Header30 />
      <Layout16 />
      <Layout239 />
      <Layout253 />
      <Layout492 />
      <Faq05 />
      <Cta39 />
      <Footer />
    </div>
  );
}
