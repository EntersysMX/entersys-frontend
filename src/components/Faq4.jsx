"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import { Card } from "./Card";
import React from "react";
import { RxPlus } from "react-icons/rx";
import { applyColorScheme } from '../design-tokens';

export function Faq4() {
  return (
    <section id="relume" className="faq-section">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="faq-title rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl" style={{color: 'var(--neutral-white)'}}>
            Preguntas más frecuentes
          </h2>
          <p className="faq-text md:text-md" style={{color: 'var(--neutral-lighter)'}}>
            Resolvemos tus dudas sobre transformación digital y nuestros
            servicios
          </p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <Card className="bg-neutral-darker border-neutral-darker">
            <AccordionItem value="item-0" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 transition-transform duration-300 md:size-8" style={{color: 'var(--primary)'}} />
                }
                className="md:py-5 text-neutral-white [&[data-state=open]>svg]:rotate-45"
              >
                ¿Qué es Entersys?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6 text-neutral-lighter">
                Somos una consultora de negocios que simplifica procesos
                empresariales mediante digitalización, automatización e
                inteligencia artificial.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card className="bg-neutral-darker border-neutral-darker">
            <AccordionItem value="item-1" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 transition-transform duration-300 md:size-8" style={{color: 'var(--primary)'}} />
                }
                className="md:py-5 text-neutral-white [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cómo funcionan sus metodologías?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6 text-neutral-lighter">
                Utilizamos Worksys para digitalizar procesos y Expersys para
                implementar sistemas de gestión y acreditaciones.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card className="bg-neutral-darker border-neutral-darker">
            <AccordionItem value="item-2" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 transition-transform duration-300 md:size-8" style={{color: 'var(--primary)'}} />
                }
                className="md:py-5 text-neutral-white [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cuánto tiempo toma un proyecto?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6 text-neutral-lighter">
                Garantizamos resultados visibles en semanas, no en meses, con un
                enfoque ágil y personalizado.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card className="bg-neutral-darker border-neutral-darker">
            <AccordionItem value="item-3" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 transition-transform duration-300 md:size-8" style={{color: 'var(--primary)'}} />
                }
                className="md:py-5 text-neutral-white [&[data-state=open]>svg]:rotate-45"
              >
                ¿Trabajan con empresas de todos los tamaños?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6 text-neutral-lighter">
                Sí, nuestras soluciones son escalables y se adaptan a las
                necesidades de pequeñas, medianas y grandes empresas.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card className="bg-neutral-darker border-neutral-darker">
            <AccordionItem value="item-4" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 transition-transform duration-300 md:size-8" style={{color: 'var(--primary)'}} />
                }
                className="md:py-5 text-neutral-white [&[data-state=open]>svg]:rotate-45"
              >
                ¿Ofrecen soporte después de la implementación?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6 text-neutral-lighter">
                Brindamos acompañamiento continuo para asegurar la óptima
                adopción de nuestras soluciones.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4" style={{color: 'var(--neutral-white)'}}>
            ¿Necesitas más información?
          </h4>
          <p className="text-lg" style={{color: 'var(--neutral-lighter)'}}>
            Nuestro equipo está listo para resolver todas tus dudas
          </p>
          <div className="mt-6 md:mt-8">
            <Button className="btn-secondary" title="Contactar" variant="secondary">
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
