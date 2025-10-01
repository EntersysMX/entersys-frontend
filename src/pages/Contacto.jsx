import React from "react";
import Header from "../components/layout/Header";
import { Header64 } from "../components/pages/contacto/header-64";
import { Contact06 } from "../components/pages/contacto/contact-06";
import { Contact13 } from "../components/pages/contacto/contact-13";
import { Contact26 } from "../components/pages/contacto/contact-26";
import Footer from "../components/layout/Footer";

export default function Contacto() {
  return (
    <div>
      <Header />
      <Header64 colorScheme={4} />
      <Contact06 colorScheme={2} />
      <Contact13 colorScheme={3} />
      <Contact26 colorScheme={1} />
      <Footer />
    </div>
  );
}
