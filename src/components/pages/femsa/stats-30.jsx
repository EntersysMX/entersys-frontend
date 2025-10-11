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
              Cero accidentes en operación nacional de alto riesgo
            </h3>
          </div>
          <div>
            <p className="text-medium">
              La estandarización y digitalización de procesos de seguridad
              transformó la operación de FEMSA: de inconsistencia operativa a
              excelencia certificada sin margen de error.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Fragment>
            <Card className="p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
              <p className="mb-6 text-[2.5rem] leading-[1.2] font-bold md:mb-8 md:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
                714
              </p>
              <h3 className="heading-h6 font-bold mt-auto">
                Proyectos sin accidentes
              </h3>
              <p className="mt-2">
                Proyectos de alto riesgo ejecutados con cero incidentes
              </p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="/images/femsa/STATS_COVERAGE_FEMSA.webp"
                  alt="Cobertura nacional FEMSA"
                  className="w-full h-auto object-cover"
                />
              </div>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <p className="mb-6 text-[2.5rem] leading-[1.2] font-bold md:mb-8 md:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
                225
              </p>
              <h3 className="heading-h6 font-bold">Unidades operativas</h3>
              <p className="mt-2">
                Estandarizadas en toda la operación nacional
              </p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-6 text-[2.5rem] leading-[1.2] font-bold md:mb-8 md:text-[3rem] lg:mb-10 lg:text-[3.5rem]">
                100%
              </p>
              <h3 className="heading-h6 font-bold">
                Cumplimiento certificado
              </h3>
              <p className="mt-2">
                Visibilidad total de protocolos de seguridad
              </p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 last:order-first last:md:order-none">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="/images/femsa/STATS_DIGITAL_FEMSA.webp"
                  alt="Digitalización FEMSA"
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
