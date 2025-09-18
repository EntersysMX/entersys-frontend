"use client";

import { Badge, Button } from "@relume_io/relume-ui";
import React from "react";
import { BiCalendarAlt, BiMap } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

export function Event23() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid auto-cols-fr grid-cols-1 items-end gap-12 md:mb-18 md:grid-cols-[1fr_max-content] lg:mb-20 lg:gap-20">
          <div className="max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Explorar</p>
            <h1 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
              Casos
            </h1>
            <p className="md:text-md">
              Navega por nuestros proyectos clasificados por industria y tipo de
              servicio
            </p>
          </div>
          <Button
            variant="secondary"
            size="primary"
            title="Ver todos"
            className="hidden md:flex"
          >
            Ver todos
          </Button>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col items-start">
            <a href="#" className="relative block aspect-[3/2] w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
                className="absolute size-full rounded-image object-cover"
              />
              <Badge className="absolute top-4 right-4">Worksys</Badge>
            </a>
            <div className="mt-5 flex flex-col items-start md:mt-6">
              <div className="mb-3 flex flex-wrap gap-4 text-sm md:mb-4">
                <div className="flex items-center gap-2">
                  <BiCalendarAlt className="size-6 flex-none" />
                  10 Feb 2024
                </div>
                <div className="flex items-center gap-2">
                  <BiMap className="size-6 flex-none" />
                  <span>Digital</span>
                </div>
              </div>
            </div>
            <a href="#" className="mb-2">
              <h2 className="text-xl font-bold md:text-2xl">
                Transformación en manufactura
              </h2>
            </a>
            <p>
              Caso de éxito que muestra la implementación de sistemas
              inteligentes en procesos industriales
            </p>
            <Button
              title="Ver caso"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-5 md:mt-6"
            >
              Ver caso
            </Button>
          </div>
          <div className="flex flex-col items-start">
            <a href="#" className="relative block aspect-[3/2] w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
                className="absolute size-full rounded-image object-cover"
              />
              <Badge className="absolute top-4 right-4">Expersys</Badge>
            </a>
            <div className="mt-5 flex flex-col items-start md:mt-6">
              <div className="mb-3 flex flex-wrap gap-4 text-sm md:mb-4">
                <div className="flex items-center gap-2">
                  <BiCalendarAlt className="size-6 flex-none" />
                  11 Feb 2024
                </div>
                <div className="flex items-center gap-2">
                  <BiMap className="size-6 flex-none" />
                  <span>Consultoría</span>
                </div>
              </div>
            </div>
            <a href="#" className="mb-2">
              <h2 className="text-xl font-bold md:text-2xl">
                Optimización de cumplimiento normativo
              </h2>
            </a>
            <p>
              Estrategias para mejorar la gestión de certificaciones y
              estándares internacionales
            </p>
            <Button
              title="Ver caso"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-5 md:mt-6"
            >
              Ver caso
            </Button>
          </div>
        </div>
        <div className="mt-12 flex justify-end md:hidden">
          <Button variant="secondary" size="primary" title="Ver todos">
            Ver todos
          </Button>
        </div>
      </div>
    </section>
  );
}
