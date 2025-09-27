"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout93() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Visión</p>
            <h3 className="heading-h2 font-bold">
              Nuestra estrategia hacia el futuro empresarial
            </h3>
          </div>
          <div>
            <p className="text-medium mb-6 md:mb-8">
              Desarrollamos nuestra visión con la metodología Hoshin Kanri,
              enfocándonos en transformar digitalmente las operaciones
              empresariales para llevar a Entersys a un nivel de estado ideal.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 lg:grid-cols-2">
              <div className="flex">
                <div>
                  <h6 className="heading-h6 mb-3 font-bold md:mb-4">Misión</h6>
                  <p>
                    Simplificar procesos complejos mediante tecnología
                    inteligente y consultoría especializada.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <h6 className="heading-h6 mb-3 font-bold md:mb-4">Valores</h6>
                  <p>
                    Compromiso con la innovación, eficiencia y acompañamiento
                    cercano a nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Quiero trabajar aquí" variant="secondary">
                Quiero trabajar aquí
              </Button>
            </div>
          </div>
        </div>
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
          className="w-full rounded-image object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}
