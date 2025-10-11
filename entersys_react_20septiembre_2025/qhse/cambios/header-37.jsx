"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Header37() {
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0">
      <div className="order-2 lg:order-1">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          alt="Relume placeholder image"
          className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
        />
      </div>
      <div className="order-1 mx-[5%] sm:max-w-md md:justify-self-start lg:order-2 lg:mr-[5vw] lg:ml-20">
        <h1 className="heading-h1 mb-5 font-bold md:mb-6">
          De 11 a 253 millones en 6 años: cómo construir una operación escalable
          desde cero
        </h1>
        <p className="text-medium">
          Implementación de Worksys y Expersys para automatización de procesos
          operativos y certificación ISO 9001 en empresa líder en soluciones
          industriales. Crecimiento del 2,000% con estandarización y
          digitalización en Smartsheets.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          <Button title="Entersyzar empresa">Entersyzar empresa</Button>
        </div>
      </div>
    </section>
  );
}
