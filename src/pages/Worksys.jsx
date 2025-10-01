import React from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { Header30 } from "../components/pages/worksys/header-30";
import { Layout421 } from "../components/pages/worksys/layout-421";
import { Layout74 } from "../components/pages/worksys/layout-74";
import { Layout243 } from "../components/pages/worksys/layout-243";
import { Layout109 } from "../components/pages/worksys/layout-109";
import { Layout237 } from "../components/pages/worksys/layout-237";
import { Faq3 } from "../components/pages/worksys/faq-03";
import { Layout2371 } from "../components/pages/worksys/layout-237_1";
import { Blog37 } from "../components/pages/worksys/blog-37";
import { Faq05 } from "../components/pages/worksys/faq-05";
import { Cta39 } from "../components/pages/worksys/cta-39";

export default function Worksys() {
  return (
    <>
      <Header />
      <main>
        <Header30 colorScheme={2} />
        <Layout421 colorScheme={1} />
        <Layout74 colorScheme={1} />
        <Layout243 colorScheme={1} />
        <Layout109 colorScheme={1} />
        <Layout237 colorScheme={1} />
        <Faq3 colorScheme={1} />
        <Layout2371 colorScheme={4} />
        <Blog37 colorScheme={1} />
        <Faq05 colorScheme={1} />
        <Cta39 colorScheme={3} />
      </main>
      <Footer />
    </>
  );
}
