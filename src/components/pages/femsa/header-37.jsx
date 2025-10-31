"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";
import OptimizedImage from "../../ui/OptimizedImage";

export function Header37() {
  const navigate = useNavigate();

  const handleEntersyzarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Entersyzar empresa - Coca-Cola Hero', 'femsa-hero');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 color-scheme-2">
      <div className="order-2 lg:order-1">
        <OptimizedImage
          src="/imagenes/femsa/banner_worker_femsa.webp"
          alt="Coca-Cola - Trabajador en seguridad industrial"
          className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
          effect="blur"
          threshold={200}
        />
      </div>
      <div className="order-1 mx-[5%] sm:max-w-md md:justify-self-start lg:order-2 lg:mr-[5vw] lg:ml-20">
        <h1 className="heading-h1 mb-5 font-bold md:mb-6">
          714 proyectos de alto riesgo ejecutados sin accidentes en 195 unidades operativas
        </h1>
        <p className="text-medium mb-6 md:mb-8">
          Implementación de Worksys para digitalización y estandarización de gestión de contratistas en trabajos de alto riesgo. Automatización de procesos de seguridad industrial con Smartsheets en toda la operación nacional de Coca-Cola.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          <Button className="btn-primary" onClick={handleEntersyzarClick}>Entersyzar empresa</Button>
        </div>
      </div>
    </section>
  );
}
