"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout501({ colorScheme = 2, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Industrias</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Experiencia por industrias
              </h2>
              <p className="md:text-md">
                Entersys ofrece soluciones para diversos sectores, optimizando
                procesos y mejorando la eficiencia. Transformamos la operación
                de tu negocio.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Manufactura
              </h3>
              <p>
                Optimización de líneas de producción, control de calidad
                automatizado y gestión de inventarios en tiempo real.
              </p>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Servicios Financieros
              </h3>
              <p>
                Automatización de procesos de cumplimiento, gestión de riesgos
                y optimización de flujos de trabajo operativos.
              </p>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Salud y Farmacéutica
              </h3>
              <p>
                Sistemas de gestión de calidad, trazabilidad de productos
                y cumplimiento de normativas sanitarias.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary">Ver casos de éxito</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Contactar especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

