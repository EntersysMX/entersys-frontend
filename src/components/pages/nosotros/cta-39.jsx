

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Cta39({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleCasosClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Casos - Nosotros CTA', 'nosotros-cta');
    navigate('/clientes');
  };

  const handleContactarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Contactar - Nosotros CTA', 'nosotros-cta');
    navigate('/contacto#formulario-contacto');
  };

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Descubre nuestros casos de éxito
              </h2>
              <p className="md:text-md">
                Conoce cómo hemos ayudado a empresas a optimizar sus procesos y
                alcanzar nuevos niveles de eficiencia.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Casos" onClick={handleCasosClick}>
                Casos
              </Button>
              <Button title="Contactar" onClick={handleContactarClick}>
                Contactar
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <OptimizedImage
              src="/imagenes/nosotros/casos_exitio_Entersys.webp"
              className="w-full object-cover rounded-r-image"
              alt="Casos de éxito Entersys"
              effect="blur"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
