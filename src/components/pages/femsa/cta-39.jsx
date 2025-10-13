"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Cta39() {
  const navigate = useNavigate();

  const handleContactarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Contactar - FEMSA CTA', 'femsa-cta');
    navigate('/contacto#formulario-contacto');
  };

  const handleDemoClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Agendar demo - FEMSA CTA', 'femsa-cta');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-3">
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="heading-h2 mb-5 font-bold md:mb-6">
                ¿Operas a escala nacional sin estándares unificados?
              </h2>
              <p className="text-medium">
                Construimos sistemas operativos que garantizan cumplimiento al
                100% en todas tus unidades. Digitaliza, estandariza y obtén
                visibilidad total de tu operación en tiempo real.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Contactar" onClick={handleContactarClick}>Contactar</Button>
              <Button title="Agendar demo" variant="secondary" onClick={handleDemoClick}>
                Agendar demo
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/imagenes/femsa/banner_meeting_worksys.webp"
              className="w-full object-cover"
              alt="Estandariza tu operación con Worksys"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
