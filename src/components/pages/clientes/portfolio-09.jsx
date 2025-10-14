"use client";

import { Badge, Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Portfolio09({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Portafolio</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Nuestros casos de éxito
          </h2>
          <p className="md:text-md">
            Proyectos que demuestran nuestra capacidad de transformación
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 lg:gap-x-12">
          <Card className="mb-0">
            <div>
              <a href="/clientes/femsa">
                <OptimizedImage
                  src="/imagenes/clientes/peak_soda_expersys_qhse.webp"
                  className="w-full object-cover"
                  alt="Coca-Cola - Seguridad Industrial"
                  effect="blur"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                <a href="/clientes/femsa">Coca-Cola</a>
              </h3>
              <p>
                714 proyectos de alto riesgo ejecutados sin accidentes en 225 unidades operativas.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <Badge className="bg-blue-100 text-blue-800">Worksys</Badge>
                <Badge className="bg-green-100 text-green-800">Smartsheets</Badge>
                <Badge className="bg-purple-100 text-purple-800">Seguridad</Badge>
                <Badge className="bg-orange-100 text-orange-800">Automatización</Badge>
              </div>
              <Button
                title="Ver proyecto"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="/clientes/femsa">Ver proyecto</a>
              </Button>
            </div>
          </Card>
          <Card className="mb-0">
            <div>
              <a href="/clientes/ochoa">
                <OptimizedImage
                  src="/imagenes/clientes/peak_corn_expersys_PDMO.webp"
                  className="w-full object-cover"
                  alt="Productos de Maíz Ochoa - Control de Calidad"
                  effect="blur"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                <a href="/clientes/ochoa">Productos de Maíz Ochoa</a>
              </h3>
              <p>
                Del 56% al 95% de cumplimiento en calidad. Dashboards para el gerenciamiento visual en tiempo real.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <Badge className="bg-blue-100 text-blue-800">Worksys</Badge>
                <Badge className="bg-green-100 text-green-800">Smartsheets</Badge>
                <Badge className="bg-purple-100 text-purple-800">Gestión de calidad</Badge>
                <Badge className="bg-cyan-100 text-cyan-800">Dashboards</Badge>
              </div>
              <Button
                title="Ver proyecto"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="/clientes/ochoa">Ver proyecto</a>
              </Button>
            </div>
          </Card>
          <Card className="mb-0">
            <div>
              <a href="/clientes/qhse">
                <OptimizedImage
                  src="/imagenes/clientes/peak_office_expersys.webp"
                  className="w-full object-cover"
                  alt="QHSE - Crecimiento y ISO 9001"
                  effect="blur"
                />
              </a>
            </div>
            <div className="px-5 py-6 sm:px-6">
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                <a href="/clientes/qhse">QHSE</a>
              </h3>
              <p>
                De 11 a 253 millones de pesos en 6 años. Crecimiento del 2,000% y consolidación de procesos bajo la norma ISO 9001.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <Badge className="bg-blue-100 text-blue-800">Worksys</Badge>
                <Badge className="bg-teal-100 text-teal-800">Expersys</Badge>
                <Badge className="bg-purple-100 text-purple-800">ISO 9001</Badge>
                <Badge className="bg-orange-100 text-orange-800">Automatización</Badge>
              </div>
              <Button
                title="Ver proyecto"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-5 md:mt-6"
              >
                <a href="/clientes/qhse">Ver proyecto</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
