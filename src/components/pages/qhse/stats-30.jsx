"use client";

import { Card } from "../../ui/Card";
import React, { Fragment } from "react";

export function Stats30() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-4">
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
              <p className="mb-6 text-[2.5rem] leading-[1.2] font-bold md:mb-8 md:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
                ECOVADIS
              </p>
              <h3 className="heading-h6 font-bold mt-auto">
                Acreditación alcanzada
              </h3>
              <p className="mt-2">Un paso más hacia la excelencia en sostenibilidad y responsabilidad corporativa.</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="/imagenes/qhse/STATS_SUSTAINABILITY_QHSE.webp"
                  alt="Sostenibilidad QHSE"
                  className="w-full h-auto object-cover"
                />
              </div>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <p className="mb-6 text-[2.5rem] leading-[1.2] font-bold md:mb-8 md:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
                ISO<br/>9001
              </p>
              <h3 className="heading-h6 font-bold">Sistema de gestión de calidad</h3>
              <p className="mt-2">Certificación de calidad obtenida mediante documentación estandarizada</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-6 text-[2.5rem] leading-[1.2] font-bold md:mb-8 md:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
                253<br/>MDP
              </p>
              <h3 className="heading-h6 font-bold">
                Facturación
              </h3>
              <p className="mt-2">Alcanzada en el sexto año (vs. 11 millones el primero)</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 last:order-first last:md:order-none">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="/imagenes/qhse/STATS_ANUALREVENUE_QHSE.webp"
                  alt="Crecimiento anual QHSE"
                  className="w-full h-auto object-cover"
                />
              </div>
            </Card>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
