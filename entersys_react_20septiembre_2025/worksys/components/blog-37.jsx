"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Blog37() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Aprende más en nuestro blog
            </h2>
            <p className="md:text-md">
              Explora artículos prácticos que muestran cómo Worksys se aplica en
              distintos contextos:
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          <div>
            <a href="#" className="mb-6 inline-block w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </div>
            </a>
            <a
              href="#"
              className="mr-4 mb-2 inline-block max-w-full text-sm font-semibold"
            >
              Worksys
            </a>
            <a href="#" className="mb-2 block max-w-full">
              <h5 className="text-xl font-bold md:text-2xl">
                “Cómo saber si tu operación gana o pierde en 3 segundos.”
              </h5>
            </a>
            <p>
              Descubre cómo un tablero de control bien diseñado puede mostrar el
              estado de tu negocio en tiempo real y ayudarte a decidir con
              datos, no suposiciones.
            </p>
            <div className="mt-6 flex items-center">
              <div className="mr-4 shrink-0">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder avatar"
                  className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h6 className="text-sm font-semibold">Juan Pérez</h6>
                <div className="flex items-center">
                  <p className="text-sm">11 Ene 2022</p>
                  <span className="mx-2">•</span>
                  <p className="text-sm">5 min lectura</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="#" className="mb-6 inline-block w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </div>
            </a>
            <a
              href="#"
              className="mr-4 mb-2 inline-block max-w-full text-sm font-semibold"
            >
              Worksys
            </a>
            <a href="#" className="mb-2 block max-w-full">
              <h5 className="text-xl font-bold md:text-2xl">
                Del Excel al sistema: el paso a paso hacia la entersyzación
              </h5>
            </a>
            <p>
              Ejemplos concretos de cómo empresas de retail, manufactura y
              logística dejaron atrás procesos manuales y hoy operan con flujos
              digitales escalables.
            </p>
            <div className="mt-6 flex items-center">
              <div className="mr-4 shrink-0">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder avatar"
                  className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h6 className="text-sm font-semibold">Ana Gómez</h6>
                <div className="flex items-center">
                  <p className="text-sm">12 Ene 2022</p>
                  <span className="mx-2">•</span>
                  <p className="text-sm">6 min lectura</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="#" className="mb-6 inline-block w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="aspect-[3/2] size-full rounded-image object-cover"
                />
              </div>
            </a>
            <a
              href="#"
              className="mr-4 mb-2 inline-block max-w-full text-sm font-semibold"
            >
              Worksys
            </a>
            <a href="#" className="mb-2 block max-w-full">
              <h5 className="text-xl font-bold md:text-2xl">
                Visual management: lo que no te enseñan sobre analítica
              </h5>
            </a>
            <p>
              La reportería analítica es un básico para todo tipo de empresa que
              desea prosperar y hacer cada día mejor las cosas, pero hay más
              cosas que aprender sobre esto.
            </p>
            <div className="mt-6 flex items-center">
              <div className="mr-4 shrink-0">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder avatar"
                  className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h6 className="text-sm font-semibold">Luis Martínez</h6>
                <div className="flex items-center">
                  <p className="text-sm">13 Ene 2022</p>
                  <span className="mx-2">•</span>
                  <p className="text-sm">4 min lectura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            title="Ver todos"
            variant="secondary"
            className="mt-10 md:mt-14 lg:mt-16"
          >
            Ver todos
          </Button>
        </div>
      </div>
    </section>
  );
}
