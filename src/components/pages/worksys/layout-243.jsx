"use client";

import React from "react";

export function Layout243({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28" {...props}>
      <div className="container">
        <div className="flex flex-col">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">
                Control y escalabilidad en distintas industrias
              </p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Un servicio para empresas que buscan control y crecimiento real
              </h2>
              <p className="md:text-md">
                Worksys está diseñado para empresas que necesitan ordenar y
                escalar su operación:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full gap-6">
              <div className="flex-none self-start">
                <img src="/imagenes/worksys/icon_enterprise_worksys.svg" alt="PYMES en expansión" className="h-12 w-12" />
              </div>
              <div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  PYMES en expansión
                </h3>
                <p>
                  Negocios que crecen y necesitan dejar atrás la dependencia de
                  Excel.
                </p>
              </div>
            </div>
            <div className="flex w-full gap-6">
              <div className="flex-none self-start">
                <img src="/imagenes/worksys/icon_corporate_fare_worksys.svg" alt="Corporativos" className="h-12 w-12" />
              </div>
              <div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Corporativos con operación compleja
                </h3>
                <p>
                  Compañías que requieren control, productividad y cumplimiento
                  normativo.
                </p>
              </div>
            </div>
            <div className="flex w-full gap-6">
              <div className="flex-none self-start">
                <img src="/imagenes/worksys/icon_tapas_worksys.svg" alt="Franquicias" className="h-12 w-12" />
              </div>
              <div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Franquicias y cadenas
                </h3>
                <p>
                  Modelos de negocio que necesitan estandarización para escalar
                  sin perder consistencia.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20" />
        </div>
      </div>
    </section>
  );
}
