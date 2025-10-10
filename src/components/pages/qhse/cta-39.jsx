"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";

export function Cta39() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-3">
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="heading-h2 mb-5 font-bold md:mb-6">
                ¿Tu empresa necesita crecer sin perder el control?
              </h2>
              <p className="text-medium">
                En semanas, no en meses, construimos el sistema operativo que tu
                negocio necesita para escalar. Automatizamos lo que ya haces
                bien y lo convertimos en un proceso replicable que funciona sin
                ti.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Contactar">Contactar</Button>
              <Button title="Agendar demo" variant="secondary">
                Agendar demo
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg"
              className="w-full object-cover"
              alt="Transforma tu operación"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
