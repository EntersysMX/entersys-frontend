"use client";

import { Card } from "@/components/ui/card";
import React, { Fragment } from "react";

export function Stats30() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h3 className="heading-h3 font-bold">
              Crecimiento exponencial con operación bajo control
            </h3>
          </div>
          <div>
            <p className="text-medium">
              La estandarización operativa no solo eliminó el caos interno,
              convirtió a QHSE en una empresa escalable capaz de multiplicar su
              facturación sin multiplicar la complejidad.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Fragment>
            <Card className="p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                2000%
              </p>
              <h3 className="heading-h6 font-bold mt-auto">
                Incremento en facturación
              </h3>
              <p className="mt-2">Crecimiento en facturación durante 6 años</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                100%
              </p>
              <h3 className="heading-h6 font-bold">Digitalización</h3>
              <p className="mt-2">De la operación en Smartsheets</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                ISO
              </p>
              <h3 className="heading-h6 font-bold">Certificación 9001</h3>
              <p className="mt-2">Calidad certificada internacionalmente</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                0
              </p>
              <h3 className="heading-h6 font-bold">
                Dependencia de personas clave
              </h3>
              <p className="mt-2">Procesos documentados y replicables</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 last:order-first last:md:order-none">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                11→253
              </p>
              <h3 className="heading-h6 font-bold">Millones de pesos</h3>
              <p className="mt-2">Evolución de ingresos en 6 años</p>
            </Card>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
