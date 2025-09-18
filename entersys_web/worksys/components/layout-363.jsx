"use client";

import { Button, Card } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout363() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Beneficios</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Transforma tu operación
            </h2>
            <p className="md:text-md">
              Mejora la eficiencia y toma de decisiones con soluciones
              tecnológicas inteligentes
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-2">
          <Card className="grid grid-cols-1 items-start sm:grid-cols-2">
            <div className="flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex h-full flex-col justify-center p-6">
              <p className="mb-2 text-sm font-semibold">Rapidez</p>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Decisiones en segundos
              </h3>
              <p>Toma decisiones estratégicas de manera inmediata</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                <Button
                  title="Contactar"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
          <Card className="grid grid-cols-1 items-start sm:grid-cols-2">
            <div className="flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex h-full flex-col justify-center p-6">
              <p className="mb-2 text-sm font-semibold">Escalabilidad</p>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Crece sin complicaciones
              </h3>
              <p>Implementa sistemas que se adaptan y escalan con tu empresa</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                <Button
                  title="Contactar"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
