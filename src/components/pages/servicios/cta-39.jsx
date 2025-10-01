
import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta39({ colorScheme = 3, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Transforma tu empresa hoy mismo
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Agenda una consulta gratuita y descubre cómo podemos impulsar tu eficiencia operativa
            </p>
            <div className="flex flex-wrap gap-4">
              <Button title="Agendar consulta" variant="primary">
                Agendar consulta
              </Button>
              <Button title="Contactar" variant="secondary">
                Contactar
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Transforma tu empresa"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
