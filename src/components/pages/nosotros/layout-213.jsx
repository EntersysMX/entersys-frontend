

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Layout213({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleConocerloClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Quiero conocerlo - Voces Líderes', 'nosotros-lideres');
    navigate('/contacto');
  };

  const handleExplorarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Explorar - Voces Líderes', 'nosotros-lideres');
    navigate('/clientes');
  };

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <OptimizedImage
              src="/imagenes/nosotros/image_rodrigo_lay_entersys_nosotros2.webp"
              className="w-full rounded-image object-cover"
              alt="Rodrigo Lay - Fundador Entersys"
              effect="blur"
              threshold={200}
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="mb-5 md:mb-6">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
                <OptimizedImage src="/imagenes/inicio/icon_support_agent_inicio.svg" alt="Voces líderes" className="h-16 w-16" effect="blur" />
              </div>
            </div>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Voces de nuestros líderes
            </h2>
            <p className="md:text-md">
              Conoce la visión y pasión detrás de Entersys directamente de sus
              fundadores. Esto es lo que Rodrigo Lay ha conversado por años a
              líderes de empresas en diferentes sectores e industrias.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Quiero conocerlo" onClick={handleConocerloClick}>
                Quiero conocerlo
              </Button>
              <Button
                title="Explorar"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                onClick={handleExplorarClick}
              >
                Explorar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
