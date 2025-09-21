"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

const Hero = ({ colorScheme = 4, ...props }) => {
  return (
    <section id="relume" className={`relative px-[5%] color-scheme-${colorScheme}`} {...props}>
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl">
              Simplificamos la complejidad operativa con inteligencia digital
            </h1>
            <p className="text-white md:text-md">
              Convertimos procesos manuales en sistemas inteligentes que
              optimizan tu operación. Resultados visibles en semanas, no en
              meses.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Agendar demo" className="rounded-lg">Agendar demo</Button>
              <Button title="Conocer más" variant="secondary-alt" className="rounded-lg">
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};

export default Hero;
