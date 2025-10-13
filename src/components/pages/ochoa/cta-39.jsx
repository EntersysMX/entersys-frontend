"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Cta39() {
  const navigate = useNavigate();

  const handleContactarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Contactar - Ochoa CTA', 'ochoa-cta');
    navigate('/contacto#formulario-contacto');
  };

  const handleDemoClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Agendar demo - Ochoa CTA', 'ochoa-cta');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-3">
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="heading-h2 mb-5 font-bold md:mb-6">
                ¿Tu producción opera sin control en tiempo real?
              </h2>
              <p className="text-medium">
                En semanas, no en meses, digitalizamos lo que ya haces bien y lo convertimos en información que funciona. Automatizamos controles manuales y los transformamos en dashboards que responden en 3 segundos.
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
              src="/imagenes/ochoa/banner_meeting_worksys.webp"
              className="w-full object-cover"
              alt="Digitaliza tu producción con Worksys"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
