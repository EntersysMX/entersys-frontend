"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Layout239({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleVerCasosClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Casos Éxito - Expersys Layout239', 'expersys-evidencias');
    navigate('/clientes');
  };
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Casos de éxito</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Evidencias de impacto
              </h2>
              <p className="md:text-md">
                Expersys ya ha permitido que empresas en distintos sectores
                logren certificaciones clave y fortalezcan su reputación frente
                a clientes, inversionistas y autoridades.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="/imagenes/expersys/peak_soda_expersys_qhse.webp"
                  alt="QHSE"
                  className="rounded-image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                QHSE
              </h3>
              <p>El caso más completo; desde adopción de metodologías, hasta la digitalización de procesos.</p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="/imagenes/expersys/peak_office_expersys.webp"
                  alt="FEMSA"
                  className="rounded-image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                FEMSA
              </h3>
              <p>
                Digitalización de gestión y documentación de contratistas para trabajos de alto riesgo
              </p>
            </div>
             <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="/imagenes/expersys/peak_corn_expersys_PDMO.webp"
                  alt="Productos de Maíz Ochoa"
                  className="rounded-image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Productos de Maíz Ochoa
              </h3>
              <p>
                Implementación de sistema de gestión de calidad en líneas productivas de alimentos.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary" onClick={handleVerCasosClick}>Ver casos de éxito</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
