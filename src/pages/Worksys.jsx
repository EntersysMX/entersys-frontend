import React from "react";
import Header from "../components/layout/Header";
import { Header30 } from "../components/pages/worksys/header-30";
import { Layout237 } from "../components/pages/worksys/layout-237";
import { Layout2371 } from "../components/pages/worksys/layout-237_1";
import { Layout243 } from "../components/pages/worksys/layout-243";
import { Layout421 } from "../components/pages/worksys/layout-421";
import { Faq05 } from "../components/pages/worksys/faq-05";
import { Cta39 } from "../components/pages/worksys/cta-39";
import Footer from "../components/layout/Footer";

export default function Worksys() {
  return (
    <div>
      <Header colorScheme={2} />
      <Header30 />
      <Layout237 />
      <Layout2371 />
      <Layout243 />
      <Layout421 />
      <Faq05 />
      <Cta39 />
      <Footer />
    </div>
  );
}
