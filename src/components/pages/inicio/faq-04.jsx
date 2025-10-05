"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxPlus } from "react-icons/rx";

export function Faq04({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Preguntas más frecuentes
          </h2>
          <p className="md:text-md">
            Resolvemos tus dudas sobre transformación digital y nuestros
            servicios
          </p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <Card>
            <AccordionItem value="item-0" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Qué es Entersys?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Somos una consultora de negocios que simplifica procesos
                empresariales mediante digitalización, automatización e
                inteligencia artificial.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-1" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cómo funcionan sus metodologías?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Utilizamos Worksys para digitalizar procesos y Expersys para
                implementar sistemas de gestión y acreditaciones.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-2" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cuánto tiempo toma un proyecto?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Garantizamos resultados visibles en semanas, no en meses, con un
                enfoque ágil y personalizado.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-3" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Trabajan con empresas de todos los tamaños?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Sí, nuestras soluciones son escalables y se adaptan a las
                necesidades de pequeñas, medianas y grandes empresas.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-4" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Ofrecen soporte después de la implementación?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Brindamos acompañamiento continuo para asegurar la óptima
                adopción de nuestras soluciones.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            ¿Necesitas más información?
          </h4>
          <p className="md:text-md">
            Nuestro equipo está listo para resolver todas tus dudas
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contactar">
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

