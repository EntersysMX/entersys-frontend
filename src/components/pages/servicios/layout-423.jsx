
import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout423({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Servicios</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Nuestras soluciones estratégicas
          </h2>
          <p className="md:text-md">
            Metodologías innovadoras para transformar tu operación
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col overflow-hidden rounded-image bg-[#5a5a5a] text-white p-6">
            <div className="flex h-full flex-col justify-end">
              <p className="mb-2 text-sm font-semibold">Worksys</p>
              <h3 className="mb-3 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                Digitalización de procesos con tecnología inteligente
              </h3>
              <p className="mb-5 md:mb-6">
                Convertimos operaciones manuales en sistemas automatizados utilizando
                herramientas no-code e inteligencia artificial
              </p>
              <Button
                title="Explorar"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="text-white"
              >
                Explorar
              </Button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-image bg-[#5a5a5a] text-white p-6">
            <div className="flex h-full flex-col justify-end">
              <p className="mb-2 text-sm font-semibold">Expersys</p>
              <h3 className="mb-3 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                Implementación de sistemas de gestión certificados
              </h3>
              <p className="mb-5 md:mb-6">
                Acompañamos tu proceso de acreditación en estándares internacionales como ISO y SMETA
              </p>
              <Button
                title="Conocer más"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="text-white"
              >
                Conocer más
              </Button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-image bg-[#5a5a5a] text-white p-6">
            <div className="flex h-full flex-col justify-end">
              <p className="mb-2 text-sm font-semibold">Consultoría</p>
              <h3 className="mb-3 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                Análisis y optimización de procesos empresariales
              </h3>
              <p className="mb-5 md:mb-6">
                Identificamos oportunidades de mejora y diseñamos estrategias para aumentar
                tu productividad
              </p>
              <Button
                title="Contactar"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="text-white"
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
