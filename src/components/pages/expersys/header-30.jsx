"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Header30({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleVerMasClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Más - Expersys Header', 'expersys-header');
    // Scroll suave a la siguiente sección
    const nextSection = document.querySelector('#relume');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-[5%]" {...props}>
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center justify-center py-16 text-center md:py-24 lg:py-28">
          <div className="w-full max-w-lg">
            <h1 className="mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl">
              Expersys: calidad operativa
            </h1>
            <p className="text-white md:text-md">
              Un servicio de acompañamiento inicio a fin para garantizar que su
              empresa cumpla con los requisitos necesarios para acreditaciones
              en materia de sistemas de gestión de calidad.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              <button type="button" className="white-button-custom" onClick={handleVerMasClick}>
                Ver más
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/imagenes/expersys/hero_quality_expersys.webp"
          className="size-full object-cover"
          alt="Expersys: calidad operativa"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
