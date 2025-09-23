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

export function Faq3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Casos de uso comunes
          </h2>
          <p className="md:text-md">
            Estos son algunos ejemplos de cómo es que Worksys puede contribuir
            hacia la transformación de tu negocio.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Me interesa" variant="secondary">
              Me interesa
            </Button>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              Inventario y activos
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Control digital en tiempo real, portales financieros para validar
              movimientos, integración con compras y reposiciones automáticas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:py-5 md:text-md">
              Producción
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Estandarización de procesos para reducir errores y desperdicio,
              control de lotes y calidad, tableros de eficiencia por línea de
              producción.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              Logística
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Seguimiento de entregas en tiempo real, trazabilidad de rutas,
              coordinación de almacenes y transportistas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              Compliance
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Reportes automáticos listos para auditoría, evidencias
              documentales de normativas (ISO, SMETA, ECOVADIS), gestión de
              políticas internas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Mantenimiento técnico
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Tableros de mantenimiento preventivo, control de tickets
              correctivos, registro de historial por equipo o sucursal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              Franquicias
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Operación homogénea en todas las sucursales, seguimiento de ventas
              diarias por punto, checklist digitales de estandarización.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
