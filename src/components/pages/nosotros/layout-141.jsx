

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import { analyticsService } from "../../../services/analytics";

export function Layout141({ colorScheme = 2, ...props }) {
  const navigate = useNavigate();

  const handleConocerClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Conocer - Nosotros Origen', 'nosotros');
    // Ya estamos en la sección #origen, solo hacer scroll suave
    const origenSection = document.getElementById('origen');
    if (origenSection) {
      origenSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExplorarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Explorar - Nosotros', 'nosotros');
    navigate('/worksys');
  };

  return (
    <section id="origen" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto flex max-w-lg flex-col items-center text-center">
              <p className="mb-3 font-semibold md:mb-4">Origen</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Nuestra historia de innovación y transformación
              </h2>
              <p className="mb-5 md:mb-6 md:text-md">
                Fundamos Entersys con la convicción de que cada empresa puede
                automatizar su operación, consolidando metodologías de gestión
                eficientes y con tecnología de vanguardia. Se 'afinan' para
                funcionar como un reloj suizo.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
                <Button title="Conocer" onClick={handleConocerClick}>
                  Conocer
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
        <div className="w-full mx-auto max-w-5xl">
          <OptimizedImage
            src="/imagenes/nosotros/banner_leaders_entersys_nosotros.webp"
            className="w-full rounded-image object-cover"
            alt="Entersys equipo de liderazgo"
            effect="blur"
            threshold={200}
          />
        </div>
      </div>
    </section>
  );
}
