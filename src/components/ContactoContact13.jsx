

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

export function ContactoContact13() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Información</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Datos de contacto
          </h2>
          <p className="md:text-md">
            Estamos disponibles para ayudarte en cualquier momento
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:grid-cols-[0.5fr_1fr]">
          <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-10">
            <div>
              <div className="mb-3 md:mb-4">
                <BiEnvelope className="size-8" />
              </div>
              <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                Correo
              </h3>
              <p className="mb-2">Contáctanos para más información</p>
              <a className="underline" href="#">
                hello@relume.io
              </a>
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <BiPhone className="size-8" />
              </div>
              <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                Teléfono
              </h3>
              <p className="mb-2">Comunícate con nuestro equipo</p>
              <a className="underline" href="#">
                +52 55 1234 5678
              </a>
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <BiMap className="size-8" />
              </div>
              <h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
                Oficina
              </h3>
              <p className="mb-2">Ubicación principal en Ciudad de México</p>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Ver dirección"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Ver dirección
                </Button>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              alt="Relume placeholder image"
              className="size-full rounded-image object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
