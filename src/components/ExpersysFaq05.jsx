

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

export function ExpersysFaq05() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Preguntas
          </h2>
          <p className="md:text-md">
            Resolvemos tus dudas sobre Expersys y nuestras soluciones de
            gestión.
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
                ¿Qué certificaciones cubrimos?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Trabajamos con acreditaciones ISO, SMETA, ECOVADIS y otras
                normas internacionales de gestión de calidad y sostenibilidad.
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
                ¿Cuánto tiempo toma la implementación?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Nuestro proceso está diseñado para generar resultados en
                semanas, no en meses.
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
                ¿Es adecuado para mi empresa?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Nuestras soluciones son escalables y se adaptan a organizaciones
                de diferentes tamaños y sectores.
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
                ¿Requiere conocimientos técnicos?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Utilizamos herramientas no-code que no requieren conocimientos
                de programación avanzados.
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
                ¿Ofrecen soporte posterior?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Brindamos acompañamiento continuo para garantizar la efectividad
                de la implementación.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            ¿Más dudas?
          </h4>
          <p className="md:text-md">Nuestro equipo está listo para ayudarte</p>
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
