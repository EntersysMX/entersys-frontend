"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export function Cta39() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="heading-h2 mb-5 font-bold md:mb-6">
                Impulsa la transformación de tu negocio
              </h2>
              <p className="text-medium">
                Descubre cómo podemos simplificar tus procesos y llevar tu
                operación al siguiente nivel
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
              alt="Impulsa la transformación"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
