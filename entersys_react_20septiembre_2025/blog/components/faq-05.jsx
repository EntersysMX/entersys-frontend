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
          <h2 className="heading-h2 mb-5 font-bold md:mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-medium">
            Resolvemos tus dudas sobre nuestro contenido y servicios
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
                ¿Cómo me puedo suscribir?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Puedes suscribirte fácilmente ingresando tu correo electrónico
                en el formulario de la sección de newsletter. Recibirás
                contenido exclusivo directamente en tu bandeja de entrada.
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
                ¿Es gratuito el blog?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Sí, todo nuestro contenido de blog es completamente gratuito.
                Buscamos compartir conocimiento que realmente agregue valor a
                los profesionales y empresas.
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
                ¿Puedo compartir los artículos?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Por supuesto, puedes compartir nuestros artículos en tus redes
                sociales y con tu equipo. Nos alegra que nuestro contenido sea
                útil para más personas.
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
                ¿Qué tipo de contenido publican?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Publicamos artículos sobre transformación digital, gestión de
                procesos, tecnología empresarial, metodologías ágiles e
                innovación operativa.
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
                ¿Cómo me contacto con ustedes?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Puedes escribirnos a contacto@entersys.com o utilizar el
                formulario de contacto en nuestra página. Estamos disponibles
                para responder tus preguntas.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="heading-h4 mb-3 font-bold md:mb-4">
            ¿Aún tienes dudas?
          </h4>
          <p className="text-medium">
            Nuestro equipo está listo para ayudarte con cualquier consulta
            adicional
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
