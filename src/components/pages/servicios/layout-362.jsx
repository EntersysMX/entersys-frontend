
import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout362({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Metodología</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Cómo trabajamos en Entersys
          </h2>
          <p className="md:text-md">
            Un enfoque integral para transformar tu operación empresarial
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="w-full rounded-image object-cover"
                alt="Worksys"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Worksys</p>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Digitalización de procesos con tecnología inteligente
              </h3>
              <p className="mb-5 md:mb-6">Automatización de tareas repetitivas</p>
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
                alt="Expersys"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Expersys</p>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Implementación de sistemas de gestión certificados
              </h3>
              <p className="mb-5 md:mb-6">
                Acompañamiento en acreditaciones internacionales
              </p>
              <Button
                title="Conocer más"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
