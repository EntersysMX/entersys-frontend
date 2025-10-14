"use client";

import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";

export function Gallery1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-2">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="heading-h2 mb-5 font-bold md:mb-6">
            Sistema operativo en acción
          </h2>
          <p className="text-medium">
            Así se gestionan 714 proyectos de alto riesgo sin accidentes
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH1_FEMSA.webp"
                alt="Dashboard de seguridad FEMSA"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH2_FEMSA.webp"
                alt="Gestión de contratistas FEMSA"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
          </div>
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
            <OptimizedImage
              src="/imagenes/femsa/SP_DASH3_FEMSA.webp"
              alt="Vista general del sistema FEMSA"
              className="size-full object-cover"
              effect="blur"
              threshold={200}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH4_FEMSA.webp"
                alt="Análisis de riesgos FEMSA"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH5_FEMSA.webp"
                alt="Certificaciones y cumplimiento FEMSA"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
