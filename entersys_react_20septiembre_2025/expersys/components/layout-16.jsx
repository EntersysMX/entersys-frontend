"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout16() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Características</p>
            <h1 className="heading-h2 mb-5 font-bold md:mb-6">
              Acreditaciones que fortalecen tu operación
            </h1>
            <p className="text-medium mb-5 md:mb-6">
              Expersys es el servicio de Entersys diseñado para que tu empresa
              obtenga y mantenga certificaciones de calidad y cumplimiento
              normativo sin complicaciones innecesarias. Acompañamos a tus
              equipos desde la planeación hasta la auditoría final, con sistemas
              digitales y documentación clara que convierten la certificación en
              una herramienta útil para la operación diaria.
            </p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo 1"
                    className="size-6"
                  />
                </div>
                <span>Cumplimiento normativo sin estrés ni burocracia.</span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo 1"
                    className="size-6"
                  />
                </div>
                <span>
                  Procesos listos para competir en mercados más exigentes.
                </span>
              </li>
              <li className="flex self-start">
                <div className="mr-4 flex-none self-start">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume logo 1"
                    className="size-6"
                  />
                </div>
                <span>
                  Documentación completa y funcional para el día a día.
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Me interesa" variant="secondary">
                Me interesa
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
