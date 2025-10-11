"use client";

import React from "react";

export function Gallery1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
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
                alt="Dashboard operativo"
                className="size-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Proceso digitalizado"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
              alt="Vista panorámica del sistema"
              className="size-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Certificación ISO"
                className="size-full object-cover"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Equipo de trabajo"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
