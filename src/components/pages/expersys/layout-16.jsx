"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Layout16({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleMeInteresaClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Me Interesa - Expersys Layout16', 'expersys-caracteristicas');
    navigate('/contacto#formulario-contacto');
  };
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Características</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Acreditaciones que fortalecen tu operación
            </h1>
            <p className="mb-5 text-base md:mb-6 md:text-md">
              Expersys es el servicio de Entersys diseñado para que tu empresa
              obtenga y mantenga certificaciones de calidad y cumplimiento
              normativo sin complicaciones innecesarias. Acompañamos a tus
              equipos desde la planeación hasta la auditoría final, con sistemas
              digitales y documentación clara que convierten la certificación en
              una herramienta útil para la operación diaria.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img src="/imagenes/expersys/icon_star_expersys.svg" alt="Cumplimiento" className="h-6 w-6" />
                </div>
                <span>Cumplimiento normativo sin estrés ni burocracia.</span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img src="/imagenes/expersys/icon_checklist_expersys.svg" alt="Procesos" className="h-6 w-6" />
                </div>
                <span>
                  Procesos listos para competir en mercados más exigentes.
                </span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img src="/imagenes/expersys/icon_docs_expersys.svg" alt="Documentación" className="h-6 w-6" />
                </div>
                <span>
                  Documentación completa y funcional para el día a día.
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button type="button" className="light-teal-button-custom" onClick={handleMeInteresaClick}>
                Me interesa
              </button>
            </div>
          </div>
          <div>
            <img
              src="/imagenes/expersys/servicios_insignia_inicio.webp"
              className="w-full rounded-image object-cover"
              alt="Acreditaciones de calidad"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
