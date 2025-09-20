"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "./Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { applyColorScheme } from '../design-tokens';

export function Layout363() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 servicios-section">
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Servicios</p>
            <h2 className="servicios-title rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Nuestras soluciones de transformación empresarial
            </h2>
            <p className="servicios-subtitle md:text-md">
              Entersyzamos negocios a partir de dos enfoques esenciales
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-2">
          <Card className="service-card worksys-card grid grid-cols-1 items-start sm:grid-cols-2">
            <div className="flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex h-full flex-col justify-center p-6">
              <h3 className="service-card-title mb-2 text-sm font-semibold">Worksys</h3>
              <h4 className="service-card-subtitle mb-2 text-xl font-bold md:text-2xl">
                Digitalización de procesos con tecnología inteligente
              </h4>
              <p className="service-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                <Button
                  className="service-link"
                  title="Ver servicio"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Ver servicio
                </Button>
              </div>
            </div>
          </Card>
          <Card className="service-card expersys-card grid grid-cols-1 items-start sm:grid-cols-2">
            <div className="flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex h-full flex-col justify-center p-6">
              <h3 className="service-card-title mb-2 text-sm font-semibold">Expersys</h3>
              <h4 className="service-card-subtitle mb-2 text-xl font-bold md:text-2xl">
                Implementación de sistemas de gestión
              </h4>
              <p className="service-card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                <Button
                  className="service-link"
                  title="Ver servicio"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Ver servicio
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
