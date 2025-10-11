"use client";

import React from "react";

export function Gallery1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-2">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="heading-h2 mb-5 font-bold md:mb-6">
            Así funciona hoy
          </h2>
          <p className="text-medium">
            Evidencias del sistema operativo en acción
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Dashboard de seguridad"
                className="size-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Gestión de contratistas"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              alt="Vista general del sistema"
              className="size-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Análisis de riesgos"
                className="size-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Certificaciones y cumplimiento"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
