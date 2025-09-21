import React from "react";
import Header from "../components/layout/Header";
import { ServiciosHeader64 } from "../components/pages/Servicios/ServiciosHeader64";
import { ServiciosLayout239 } from "../components/pages/Servicios/ServiciosLayout239";
import { ServiciosLayout362 } from "../components/pages/Servicios/ServiciosLayout362";
import { ServiciosLayout395 } from "../components/pages/Servicios/ServiciosLayout395";
import { ServiciosTestimonial17 } from "../components/pages/Servicios/ServiciosTestimonial17";
import { ServiciosFaq05 } from "../components/pages/Servicios/ServiciosFaq05";
import { ServiciosCta39 } from "../components/pages/Servicios/ServiciosCta39";
import Footer from "../components/layout/Footer";

export default function Servicios() {
  return (
    <div>
      <Header />
      <ServiciosHeader64 />
      <ServiciosLayout239 />
      <ServiciosLayout362 />
      <ServiciosLayout395 />
      <ServiciosTestimonial17 />
      <ServiciosFaq05 />
      <ServiciosCta39 />
      <Footer />
    </div>
  );
}
