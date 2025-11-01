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
            <div className="overflow-hidden rounded-lg bg-white p-4">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH1_Coca-Cola.webp"
                alt="Dashboard de seguridad Coca-Cola"
                className="w-full h-auto object-contain"
                effect="blur"
                threshold={200}
              />
            </div>
            <div className="overflow-hidden rounded-lg bg-white p-4">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH2_Coca-Cola.webp"
                alt="Gestión de contratistas Coca-Cola"
                className="w-full h-auto object-contain"
                effect="blur"
                threshold={200}
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white p-4">
            <OptimizedImage
              src="/imagenes/femsa/SP_DASH3_Coca-Cola.webp"
              alt="Vista general del sistema Coca-Cola"
              className="w-full h-auto object-contain"
              effect="blur"
              threshold={200}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="overflow-hidden rounded-lg bg-white p-4">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH4_Coca-Cola.webp"
                alt="Análisis de riesgos Coca-Cola"
                className="w-full h-auto object-contain"
                effect="blur"
                threshold={200}
              />
            </div>
            <div className="overflow-hidden rounded-lg bg-white p-4">
              <OptimizedImage
                src="/imagenes/femsa/SP_DASH5_Coca-Cola.webp"
                alt="Certificaciones y cumplimiento Coca-Cola"
                className="w-full h-auto object-contain"
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
