"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Header41() {
  const navigate = useNavigate();

  const handleEntersyzarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Entersyzar empresa - FEMSA Header', 'femsa-header');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-2">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#5A7A7A]">
              <button className="absolute inset-0 flex items-center justify-center z-10">
                <div className="rounded-full bg-white p-6 shadow-lg hover:scale-110 transition-transform">
                  <svg
                    className="size-12 text-[#009CA6]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail-landscape.svg"
                alt="Video FEMSA"
                className="size-full object-cover opacity-70"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-5 font-bold md:mb-6 leading-tight">
              714 proyectos de alto riesgo ejecutados sin accidentes en 225 unidades operativas
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
              Implementación de Worksys para digitalización y estandarización de gestión de contratistas en trabajos de alto riesgo. Automatización de procesos de seguridad industrial con Smartsheets en toda la operación nacional de FEMSA.
            </p>
            <Button className="btn-primary" onClick={handleEntersyzarClick}>Entersyzar empresa</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
