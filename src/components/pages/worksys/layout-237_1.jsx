"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { MdAssessment, MdScience, MdInventory } from 'react-icons/md';

export function Layout2371({ colorScheme = 1, ...props }) {
  return (
    <section id="casos-exito" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <p className="mb-3 font-semibold md:mb-4">Casos de éxito</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Resultados comprobables
            </h2>
            <p className="md:text-md">
              A través de Worksys, hemos introducido empresas 'al sistema' de
              éxito en términos de gestión y calidad. Estos son los clientes más
              destacados en este servicio.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <MdAssessment className="size-12 text-primary" />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Productos de Maíz Ochoa
              </h3>
              <p>Elaboración de productos de maíz con calidad e higiene ubicada en el bajío Querétaro.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <MdScience className="size-12 text-primary" />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                QHSE
              </h3>
              <p>Líder en soluciones industriales del sector laboratorio y tratamiento de agua.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <MdInventory className="size-12 text-primary" />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                SCRAM
              </h3>
              <p>Integradora de soluciones tecnológicas para empresas ubicada en Cuautitlán Izcalli.</p>
            </div>  
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <MdInventory className="size-12 text-primary" />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Chilango Garage
              </h3>
              <p>Empresa de servicios mecánicos automotrices ubicado en Cuajimalpa.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <MdInventory className="size-12 text-primary" />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                FEMSA
              </h3>
              <p>Digitalización de gestión y documentación de contratistas para trabajos de alto riesgo.</p>
            </div>
              <div className="flex w-full flex-col items-center text-center">
              <div className="rb-5 mb-5 md:mb-6">
                <MdInventory className="size-12 text-primary" />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                MLM
              </h3>
              <p>Empresa de manufactura volumétrica de materiales promocionales para marcas del país.</p>
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
