
import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout395({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Beneficios</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Valor agregado de nuestros servicios
          </h2>
          <p className="md:text-md">
            Soluciones que generan impacto real en tu organización
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Eficiencia"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Eficiencia</p>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Optimización de procesos y reducción de tiempos
              </h3>
              <p className="mb-5 md:mb-6">Aumenta la productividad hasta un 50%</p>
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
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Escalabilidad"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Escalabilidad</p>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Sistemas adaptables al crecimiento de tu empresa
              </h3>
              <p className="mb-5 md:mb-6">Tecnología flexible y modular</p>
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
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Cumplimiento"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Cumplimiento</p>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Garantía de conformidad con estándares internacionales
              </h3>
              <p className="mb-5 md:mb-6">Minimiza riesgos regulatorios y legales</p>
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
        </div>
      </div>
    </section>
  );
}
