"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { RxPlus } from "react-icons/rx";

export function Faq4() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="heading-h2 mb-5 font-bold md:mb-6">
            Preguntas más frecuentes
          </h2>
          <p className="text-medium">
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
                  <RxPlus className="size-7 shrink-0 text-scheme-text transition-transform duration-300 md:size-8" />
                }
                className="text-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
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
                  <RxPlus className="size-7 shrink-0 text-scheme-text transition-transform duration-300 md:size-8" />
                }
                className="text-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
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
                  <RxPlus className="size-7 shrink-0 text-scheme-text transition-transform duration-300 md:size-8" />
                }
                className="text-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
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
                  <RxPlus className="size-7 shrink-0 text-scheme-text transition-transform duration-300 md:size-8" />
                }
                className="text-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
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
                  <RxPlus className="size-7 shrink-0 text-scheme-text transition-transform duration-300 md:size-8" />
                }
                className="text-medium md:py-5 [&[data-state=open]>svg]:rotate-45"
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
          <h4 className="heading-h4 mb-3 font-bold md:mb-4">
            ¿Necesitas más información?
          </h4>
          <p className="text-medium">
            Nuestro equipo está listo para resolver todas tus dudas
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contactar" variant="secondary">
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
