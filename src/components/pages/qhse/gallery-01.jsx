"use client";

import OptimizedImage from "../../ui/OptimizedImage";
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
              <OptimizedImage
                src="/imagenes/qhse/sp_dashboard_qhse.webp"
                alt="Dashboard operativo QHSE"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/qhse/sp_control_qhse.webp"
                alt="Control de procesos"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
          </div>
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
            <OptimizedImage
              src="/imagenes/qhse/sp_smartsheets_qhse.webp"
              alt="Sistema Smartsheets QHSE"
              className="size-full object-cover"
              effect="blur"
              threshold={200}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/qhse/sp_ISO9001_qhse.webp"
                alt="Certificación ISO 9001"
                className="size-full object-cover"
                effect="blur"
                threshold={200}
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <OptimizedImage
                src="/imagenes/qhse/sp_dashboard_qhse.webp"
                alt="Dashboard de seguimiento"
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
