import React from "react";
import Header from "../components/layout/Header";
import { ContactoHeader64 } from "../components/pages/Contacto/ContactoHeader64";
import { ContactoContact06 } from "../components/pages/Contacto/ContactoContact06";
import { ContactoContact13 } from "../components/pages/Contacto/ContactoContact13";
import { ContactoContact13_1 } from "../components/pages/Contacto/ContactoContact13_1";
import { ContactoContact26 } from "../components/pages/Contacto/ContactoContact26";
import Footer from "../components/layout/Footer";

export default function Contacto() {
  return (
    <div>
      <Header />
      <ContactoHeader64 />
      <ContactoContact06 />
      <ContactoContact13 />
      <ContactoContact13_1 />
      <ContactoContact26 />
      <Footer />
    </div>
  );
}
