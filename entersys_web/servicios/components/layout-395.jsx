"use client";

import { Button, Card } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout395() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Beneficios</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Valor agregado de nuestros servicios
          </h1>
          <p className="md:text-md">
            Soluciones que generan impacto real en tu organización
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Eficiencia</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Optimización de procesos y reducción de tiempos
                </h2>
                <p>Aumenta la productividad hasta un 50%</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Más información"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Más información
                </Button>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Escalabilidad</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Sistemas adaptables al crecimiento de tu empresa
                </h2>
                <p>Tecnología flexible y modular</p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Explorar"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Explorar
                </Button>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Cumplimiento</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Garantía de conformidad con estándares internacionales
                </h2>
                <p>Minimiza riesgos regulatorios y legales</p>
              </div>
              <div className="mt-5 md:mt-6">
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
