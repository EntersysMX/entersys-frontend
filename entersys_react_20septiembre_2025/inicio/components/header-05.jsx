"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Header5() {
  return (
    <section className="relative px-[5%]">
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <h1 className="heading-h1 mb-5 font-bold text-white md:mb-6">
              Simplificamos la complejidad operativa con inteligencia digital
            </h1>
            <p className="text-medium text-white">
              Convertimos procesos manuales en sistemas inteligentes que
              optimizan tu operación. Resultados visibles en semanas, no en
              meses.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Agendar demo">Agendar demo</Button>
              <Button title="Conocer más" variant="secondary-alt">
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
        <div className="absolute inset-0 bg-neutral-darkest/50" />
      </div>
    </section>
  );
}
