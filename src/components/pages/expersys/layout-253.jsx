"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { analyticsService } from "../../../services/analytics";

export function Layout253({ colorScheme = 1, ...props }) {
  const navigate = useNavigate();

  const handleContactarClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Contactar Agente - Expersys Layout253', 'expersys-casos-uso');
    navigate('/contacto#formulario-contacto');
  };
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 items-start justify-start gap-y-12 md:grid-cols-[0.5fr_1fr] md:gap-x-12 md:gap-y-16 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Casos de uso</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Entersys ya marca la diferencia aquí
            </h2>
            <p className="md:text-md">
              Nuestra amplia experiencia nos permite adaptar este servicio en
              función de diversos casos de trabajo.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <button type="button" className="light-teal-button-custom" onClick={handleContactarClick}>
                Contactar un agente
              </button>
            </div>
          </div>
          <div className="grid w-full auto-cols-fr grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:gap-x-12">
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <OptimizedImage src="/imagenes/expersys/icon_precision_manufacturing_expersys.svg" alt="Manufactura" className="h-12 w-12" effect="blur" />
              </div>
              <h1 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Manufactura
              </h1>
              <p>
                Certificación ISO 9001 para garantizar consistencia y calidad.
              </p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <OptimizedImage src="/imagenes/expersys/icon_storefront_expersys.svg" alt="Retail y franquicias" className="h-12 w-12" effect="blur" />
              </div>
              <h1 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Retail y franquicias
              </h1>
              <p>
                Acreditaciones SMETA para fortalecer reputación con clientes
                internacionales.
              </p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <OptimizedImage src="/imagenes/expersys/icon_fastfood_expersys.svg" alt="Alimentos y bebidas" className="h-12 w-12" effect="blur" />
              </div>
              <h1 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Alimentos y bebidas
              </h1>
              <p>
                Certificaciones de sostenibilidad (ECOVADIS) para entrar en
                nuevos mercados.
              </p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <OptimizedImage src="/imagenes/expersys/icon_delivery_truck_speed_expersys.svg" alt="Logística y distribución" className="h-12 w-12" effect="blur" />
              </div>
              <h1 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Logística y distribución
              </h1>
              <p>
                Cumplimiento normativo que asegura confianza en cadenas de
                suministro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
