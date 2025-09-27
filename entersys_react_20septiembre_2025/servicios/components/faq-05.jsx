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
            Resolvemos tus dudas sobre nuestros servicios de consultoría y
            transformación digital
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
                ¿Qué servicios ofrecen?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Ofrecemos servicios de digitalización de procesos,
                implementación de sistemas de gestión y consultoría estratégica
                para empresas de diversos sectores.
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
                ¿Cuánto tiempo toma una implementación?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Nuestro objetivo es entregar resultados visibles en semanas, no
                en meses, con soluciones personalizadas.
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
                ¿Trabajan con empresas de todos los tamaños?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Sí, nuestras soluciones están diseñadas para adaptarse a
                organizaciones pequeñas, medianas y grandes.
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
                ¿Qué tecnologías utilizan?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Trabajamos con herramientas no-code, inteligencia artificial y
                plataformas como Smartsheet para optimizar procesos.
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
                ¿Cómo comenzar?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Puedes agendar una consulta gratuita para evaluar las
                necesidades específicas de tu empresa.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="heading-h4 mb-3 font-bold md:mb-4">
            ¿Necesitas más información?
          </h4>
          <p className="text-medium">
            Estamos listos para ayudarte a transformar tu operación
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
