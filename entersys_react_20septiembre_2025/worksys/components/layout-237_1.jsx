"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout237_1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <p className="mb-3 font-semibold md:mb-4">Casos de éxito</p>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Resultados comprobables
            </h2>
            <p className="text-medium">
              A través de Worksys, hemos introducido empresas 'al sistema' de
              éxito en términos de gestión y calidad. Estos son los clientes más
              destacados en este servicio.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="heading-h4 mb-5 font-bold md:mb-6">FEMSA</h3>
              <p>Tableros ejecutivos que muestran riesgos en segundos.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="heading-h4 mb-5 font-bold md:mb-6">AWALAB</h3>
              <p>7 años de excelencia operativa sustentada en Worksys.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="heading-h4 mb-5 font-bold md:mb-6">
                MercadoLibre
              </h3>
              <p>Digitalización de inventario con control estandarizado.</p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
            <Button variant="secondary">Ver casos de éxito</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
