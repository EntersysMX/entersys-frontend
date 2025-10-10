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
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
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
              <div className="mb-8 flex items-center justify-center">
                <div className="size-24 rounded-full bg-gray-400 flex items-center justify-center">
                  <svg className="size-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                ISO<br/>9001
              </p>
              <h3 className="heading-h6 font-bold">Sistema de gestión de calidad</h3>
              <p className="mt-2">Certificación de calidad obtenida mediante documentación estandarizada</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
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
              <div className="mb-8 flex items-center justify-center">
                <div className="aspect-video w-full rounded-lg bg-gray-300 flex items-center justify-center">
                  <svg className="size-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </Card>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
