"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Cta39({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleDiagnosticoClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Quiero un diagnóstico - Worksys CTA', 'worksys-cta');
    navigate('/contacto#formulario-contacto');
  };

  const handleDemoClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Quiero una demo - Worksys CTA', 'worksys-cta');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Empieza un diagnóstico o una demo
              </h2>
              <p className="md:text-md">
                Agenda una sesión de diagnóstico con nuestro equipo, ya sea para
                conocer desde dónde puedes comenzar o, incluso, solicitar la
                digitalización de tu caso de uso para probarla sin compromisos.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Quiero un diagnóstico" onClick={handleDiagnosticoClick}>
                Quiero un diagnóstico
              </Button>
              <Button title="Quiero una demo" onClick={handleDemoClick}>
                Quiero una demo
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <OptimizedImage
              src="/imagenes/worksys/banner_meeting_worksys.webp"
              className="w-full object-cover"
              alt="Diagnóstico o demo Worksys"
              effect="blur"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
