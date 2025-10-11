"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Portfolio9() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Portafolio</p>
          <h2 className="heading-h2 mb-5 font-bold md:mb-6">
            Nuestros casos de éxito
          </h2>
          <p className="text-medium">
            Proyectos que demuestran nuestra capacidad de transformación
          </p>
        </div>
        <div className="columns-1 after:block md:columns-2 md:gap-x-8 lg:gap-x-12">
          <Card className="mb-12 break-inside-avoid">
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="heading-h5 mb-2 font-bold">
                <a href="#">FEMSA</a>
              </h3>
              <p>
                714 proyectos de alto riesgo ejecutados sin accidentes en 225
                unidades operativas.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <Badge>
                  <a href="#">Worksys</a>
                </Badge>
                <Badge>
                  <a href="#">Smartsheets</a>
                </Badge>
                <Badge>
                  <a href="#">Seguridad</a>
                </Badge>
                <Badge>
                  <a href="#">Automatización</a>
                </Badge>
              </div>
              <Button
                title="Ver proyecto"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="#">Ver proyecto</a>
              </Button>
            </div>
          </Card>
          <Card className="mb-12 break-inside-avoid">
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="heading-h5 mb-2 font-bold">
                <a href="#">QHSE</a>
              </h3>
              <p>
                De 11 a 253 millones de pesos en 6 años. Crecimiento del 2,000%
                y consolidación de procesos bajo la norma ISO 9001.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <Badge>
                  <a href="#">Worksys</a>
                </Badge>
                <Badge>
                  <a href="#">Expersys</a>
                </Badge>
                <Badge>
                  <a href="#">ISO 9001</a>
                </Badge>
                <Badge>
                  <a href="#">Automatización</a>
                </Badge>
              </div>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="#">View project</a>
              </Button>
            </div>
          </Card>
          <Card className="mb-12 break-inside-avoid">
            <div>
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="heading-h5 mb-2 font-bold">
                <a href="#">Productos de Maíz Ochoa</a>
              </h3>
              <p>
                Del 56% al 95% de cumplimiento en calidad. Dashboards para el
                gerenciamieinto visual en tiempo real.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <Badge>
                  <a href="#">Worksys</a>
                </Badge>
                <Badge>
                  <a href="#">Smartsheets</a>
                </Badge>
                <Badge>
                  <a href="#">Gestión de calidad</a>
                </Badge>
                <Badge>
                  <a href="#">Dashboards</a>
                </Badge>
              </div>
              <Button
                title="Ver proyecto"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="#">Ver proyecto</a>
              </Button>
            </div>
          </Card>
        </div>
        <div className="mt-6 flex justify-center md:mt-8">
          <Button title="Ver más" variant="secondary">
            Ver más
          </Button>
        </div>
      </div>
    </section>
  );
}
