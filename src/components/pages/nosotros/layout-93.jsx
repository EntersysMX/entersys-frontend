

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout93({ colorScheme = 2, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Visión</p>
            <h3 className="text-5xl leading-[1.2] font-bold md:text-7xl lg:text-8xl">
              Nuestra estrategia hacia el futuro empresarial
            </h3>
          </div>
          <div>
            <p className="mb-6 md:mb-8 md:text-md">
              Desarrollamos nuestra visión con la metodología Hoshin Kanri,
              enfocándonos en transformar digitalmente las operaciones
              empresariales para llevar a Entersys a un nivel de estado ideal.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                  <img src="/imagenes/inicio/icon_factory_inicio.svg" alt="Misión" className="h-8 w-8" />
                </div>
                <div>
                  <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                    Misión
                  </h6>
                  <p>
                    Simplificar procesos complejos mediante tecnología
                    inteligente y consultoría especializada.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                  <img src="/imagenes/inicio/icon_speed_inicio.svg" alt="Valores" className="h-8 w-8" />
                </div>
                <div>
                  <h6 className="mb-3 text-md leading-[1.4] font-bold md:mb-4 md:text-xl">
                    Valores
                  </h6>
                  <p>
                    Compromiso con la innovación, eficiencia y acompañamiento
                    cercano a nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Conocer">
                Conocer
              </Button>
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
        </div>
        <div className="w-full mx-auto max-w-5xl">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-image"
              src="https://www.youtube.com/embed/IgAEUzW6Yis?cc_load_policy=1&cc_lang_pref=es-MX&hl=es-MX"
              title="Video Entersys - Nuestra Historia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
