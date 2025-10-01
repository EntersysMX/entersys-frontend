
import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout239({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Proceso</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Nuestro método de trabajo paso a paso
          </h2>
          <p className="md:text-md">
            Diseñamos una estrategia personalizada que se adapta a las necesidades únicas de tu
            empresa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Diagnóstico inicial"
              />
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Diagnóstico inicial
              </h3>
              <p>
                Analizamos tu operación actual para identificar áreas de mejora.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Diseño de solución"
              />
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Diseño de solución
              </h3>
              <p>
                Desarrollamos una estrategia integral y tecnológicamente adaptada.
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Implementación y seguimiento"
              />
            </div>
            <div>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Implementación y seguimiento
              </h3>
              <p>
                Ejecutamos la solución y monitoreamos su desempeño continuo.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 md:mt-14 lg:mt-16">
          <Button title="Agendar" variant="secondary">
            Agendar
          </Button>
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
    </section>
  );
}
