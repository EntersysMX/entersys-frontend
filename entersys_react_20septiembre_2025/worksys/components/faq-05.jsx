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

export function Faq5() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="heading-h2 mb-5 font-bold md:mb-6">Preguntas</h2>
          <p className="text-medium">
            Resolvemos tus dudas sobre cómo Worksys puede impulsar la
            transformación digital de tu empresa
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
                ¿Qué es Worksys?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Worksys es una solución tecnológica que digitaliza procesos
                utilizando Smartsheet, aplicaciones no-code e inteligencia
                artificial para mejorar la eficiencia operativa.
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
                ¿Cómo funciona?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Realizamos un diagnóstico inicial, diseñamos una solución
                personalizada y la implementamos con tecnologías innovadoras.
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
                ¿Qué empresas pueden beneficiarse?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Cualquier empresa que busque optimizar sus procesos, desde
                pequeñas organizaciones hasta grandes corporaciones.
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
                ¿Requiere conocimientos técnicos?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                No, nuestras soluciones no-code están diseñadas para ser
                intuitivas y fáciles de usar sin conocimientos de programación.
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
                ¿Cuánto tiempo toma la implementación?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Nuestro objetivo es ofrecer resultados visibles en semanas, no
                en meses, con un acompañamiento personalizado.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="heading-h4 mb-3 font-bold md:mb-4">¿Más dudas?</h4>
          <p className="text-medium">Nuestro equipo está listo para ayudarte</p>
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
