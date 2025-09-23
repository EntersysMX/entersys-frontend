"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Contact26() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mx-auto mb-12 flex max-w-lg flex-col justify-center text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Ubicaciones</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Sedes
          </h2>
          <p className="md:text-md">Encuentra nuestra oficina más cercana</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-6 aspect-[3/2] md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="h-full w-full rounded-image object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <h3 className="mb-3 text-2xl leading-[1.4] font-bold md:text-3xl lg:mb-4 lg:text-4xl">
              Ciudad de México
            </h3>
            <p className="text-center">
              Oficina principal en el corazón de la ciudad
            </p>
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
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-6 aspect-[3/2] md:mb-8">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="h-full w-full rounded-image object-cover"
                alt="Relume placeholder image"
              />
            </div>
            <h3 className="mb-3 text-2xl leading-[1.4] font-bold md:text-3xl lg:mb-4 lg:text-4xl">
              Monterrey
            </h3>
            <p className="text-center">
              Oficina de consultoría en el norte de México
            </p>
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
      </div>
    </section>
  );
}
