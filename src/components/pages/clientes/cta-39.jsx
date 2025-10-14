"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Cta39({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleContactarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Contactar - Clientes CTA', 'clientes-cta');
    navigate('/contacto#formulario-contacto');
  };

  const handleDemoClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Agendar demo - Clientes CTA', 'clientes-cta');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Impulsa tu transformación digital
              </h2>
              <p className="md:text-md">
                Descubre cómo podemos simplificar tus procesos y llevar tu
                operación al siguiente nivel
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Contactar" variant="primary" onClick={handleContactarClick}>
                Contactar
              </Button>
              <Button title="Agendar demo" variant="secondary" onClick={handleDemoClick}>
                Agendar demo
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <OptimizedImage
              src="/imagenes/worksys/banner_meeting_worksys.webp"
              className="w-full object-cover rounded-r-image"
              alt="Reunión de transformación digital con Entersys"
              effect="blur"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
