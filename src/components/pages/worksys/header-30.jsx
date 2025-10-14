"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Header30({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleVerMasClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Más - Worksys Header', 'worksys-header');
    // Scroll suave a la siguiente sección
    const nextSection = document.querySelector('#procesos-manuales');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="relume" className="relative px-[5%]" {...props}>
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center justify-center py-16 text-center md:py-24 lg:py-28">
          <div className="w-full max-w-lg">
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              Worksys: gestión de negocios inteligente
            </h1>
            <p className="text-text-alternative md:text-md">
              Un servicio que transforma y digitaliza operaciones confusas con
              metodologías de estandarízación de procesos y digitalización con
              software code, no-code e IA.
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
          src="/imagenes/worksys/hero_dashboard_worksys.webp"
          alt="Worksys: gestión de negocios inteligente"
          className="w-full h-full object-cover"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
