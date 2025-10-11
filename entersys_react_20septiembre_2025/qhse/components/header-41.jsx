"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Header41() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-500">
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white p-6 shadow-lg">
                  <svg
                    className="size-12 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail-landscape.svg"
                alt="Video placeholder"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="heading-h1 mb-5 font-bold md:mb-6">
              De 11 a 253 millones en 6 años: cómo construir una operación
              escalable desde cero
            </h1>
            <p className="text-medium mb-6 md:mb-8">
              Implementación de Worksys y Expersys para automatización de
              procesos operativos y certificación ISO 9001 en empresa líder en
              soluciones industriales. Crecimiento del 2,000% con
              estandarización y digitalización en Smartsheets.
            </p>
            <Button>Entersyzar empresa</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
