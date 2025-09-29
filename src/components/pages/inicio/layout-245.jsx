"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout245({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-between gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
            <div>
              <p className="mb-3 font-semibold md:mb-4">Propuesta de valor</p>
              <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
                Prueba hoy, comprométete después
              </h2>
            </div>
            <div>
              <p className="md:text-md">
                En Entersys, te ofrecemos la oportunidad de probar nuestras
                soluciones antes de comprometerte. Nuestro modelo comercial de
                'Try and Buy' te permite experimentar los beneficios de la
                digitalización de procesos sin riesgo. Además, garantizamos que
                cumplas con todas las normativas necesarias desde el primer día.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="group cursor-pointer">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo"
                  className="size-12"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl group-hover:text-primary transition-colors">
                Resultados visibles en semanas, no en meses
              </h3>
              <p>Comienza a ver cambios significativos rápidamente.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo"
                  className="size-12"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl group-hover:text-primary transition-colors">
                Soporte personalizado durante todo el proceso
              </h3>
              <p>Nuestro equipo está contigo en cada paso.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo"
                  className="size-12"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl group-hover:text-primary transition-colors">
                Equipo funcional que comprende tus operaciones
              </h3>
              <p>Sabemos lo que hacemos y podemos comprobarlo.</p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
            <Button variant="secondary">Solicitar</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Ver clientes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

