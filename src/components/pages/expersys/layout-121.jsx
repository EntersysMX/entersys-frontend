"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Layout121({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleVerCasosClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Casos Éxito - Expersys Layout121', 'expersys-certificaciones');
    navigate('/clientes');
  };

  const certifications = [
    {
      icon: "/imagenes/expersys/icon_security_expersys.svg",
      title: "ISO-9001 Gestión de calidad",
      description: "Gestión de calidad"
    },
    {
      icon: "/imagenes/expersys/icon_productivity_expersys.svg",
      title: "SMETA",
      description: "Responsabilidad social y ética en la cadena de suministro."
    },
    {
      icon: "/imagenes/expersys/icon_eco_expersys.svg",
      title: "ECOVADIS",
      description: "Sustentabilidad y criterios ESG."
    },
    {
      icon: "/imagenes/expersys/icon_temp_preferences_eco_expersys.svg",
      title: "Resultados Rápidos",
      description: "Implementaciones que generan resultados visibles en semanas, no en meses."
    },
    {
      icon: "/imagenes/expersys/icon_source_enviroment_expersys.svg",
      title: "ISO-14001",
      description: "Medio ambiente"
    },
    {
      icon: "/imagenes/expersys/icon_security_expersys.svg",
      title: "ISO-45001",
      description: "Seguridad laboral"
    }
  ];

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Stack de acreditación</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Certificaciones disponibles con Expersys
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button type="button" className="light-teal-button-custom" onClick={handleVerCasosClick}>
                Ver casos de éxito
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border-primary" />
            <div className="grid grid-cols-1 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="relative flex gap-4 pl-0">
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-background-primary text-primary">
                    <img src={cert.icon} alt={cert.title} className="h-6 w-6" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="mb-2 text-xl font-bold md:text-2xl">
                      {cert.title}
                    </h3>
                    <p className="text-sm md:text-base">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
