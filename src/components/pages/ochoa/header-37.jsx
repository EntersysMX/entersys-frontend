"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header37() {
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 color-scheme-2">
      <div className="order-2 lg:order-1">
        <img
          src="/images/ochoa/banner_qa_ochoa.webp"
          alt="Ochoa - Control de calidad en producción de alimentos"
          className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
        />
      </div>
      <div className="order-1 mx-[5%] sm:max-w-md md:justify-self-start lg:order-2 lg:mr-[5vw] lg:ml-20">
        <h1 className="heading-h1 mb-5 font-bold md:mb-6">
          Del 56% al 95% de cumplimiento en calidad: dashboards en tiempo real
          que funcionan
        </h1>
        <p className="text-medium mb-6 md:mb-8">
          Implementación de Worksys y Expersys para digitalización de análisis
          de calidad en líneas de producción de alimentos. Control de estándares
          en tiempo real con Smartsheets y metodología Daily Management.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          <Button className="btn-primary">Entersyzar empresa</Button>
        </div>
      </div>
    </section>
  );
}
