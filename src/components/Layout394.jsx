"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "./Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout394() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Diferenciadores clave</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Por qué elegir Entersys
          </h1>
          <p className="md:text-md">
            Transformamos la complejidad operativa en oportunidades de
            crecimiento
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <Card className="flex flex-col">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Eficiencia</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Resultados medibles en semanas
                </h2>
                <p>
                  Optimizamos procesos para que tomes decisiones más rápidas
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Comprobar"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Comprobar
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Escalabilidad</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Sistemas que crecen con tu empresa
                </h2>
                <p>Soluciones flexibles y adaptables a tu crecimiento</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Quiero estos sistemas"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Quiero estos sistemas
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Cumplimiento</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Protección normativa integral
                </h2>
                <p>
                  Garantizamos el cumplimiento de estándares internacionales
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Estandarizar empresa"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Estandarizar empresa
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
