"use client";

import React from "react";

export function Layout243() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">
                Control y escalabilidad en distintas industrias
              </p>
              <h2 className="heading-h2 mb-5 font-bold md:mb-6">
                Un servicio para empresas que buscan control y crecimiento real
              </h2>
              <p className="text-medium">
                Worksys está diseñado para empresas que necesitan ordenar y
                escalar su operación:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full gap-6">
              <div className="flex-none self-start">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <div>
                <h3 className="heading-h4 mb-5 font-bold md:mb-6">
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
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <div>
                <h3 className="heading-h4 mb-5 font-bold md:mb-6">
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
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <div>
                <h3 className="heading-h4 mb-5 font-bold md:mb-6">
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
