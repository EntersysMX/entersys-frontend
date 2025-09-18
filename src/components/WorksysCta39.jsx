

import { Button } from "@relume_io/relume-ui";
import { Card } from "./Card";

import React from "react";

export function WorksysCta39() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Lleva tu operación al siguiente nivel
              </h2>
              <p className="md:text-md">
                Descubre cómo Worksys puede transformar la eficiencia de tu
                empresa con soluciones tecnológicas inteligentes
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Solicitar demo" variant="primary">
                Solicitar demo
              </Button>
              <Button title="Contactar" variant="secondary">
                Contactar
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
