

import { Button, Input } from "@relume_io/relume-ui";
import { Card } from "./Card";

import React from "react";

export function BlogCta52() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Card className="flex flex-col items-center p-8 md:p-12 lg:p-16">
          <div className="max-w-lg text-center">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Mantente actualizado con Entersys
            </h2>
            <p className="md:text-md">
              Recibe contenido exclusivo, estrategias de transformación y
              consejos prácticos directamente en tu correo
            </p>
          </div>
          <div className="mx-auto mt-6 max-w-sm md:mt-8">
            <form className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
              <Input id="email" type="email" placeholder="Ingresa tu email" />
              <Button
                title="Suscribirse"
                variant="primary"
                size="sm"
                className="items-center justify-center px-6 py-3"
              >
                Suscribirse
              </Button>
            </form>
            <p className="text-xs">
              Al suscribirte, aceptas nuestros términos y condiciones de
              privacidad
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
