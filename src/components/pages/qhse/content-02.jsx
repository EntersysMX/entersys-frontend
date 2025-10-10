"use client";

import React from "react";

export function Content2() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-2">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Solución implementada"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Construir desde los cimientos con metodología probada
            </h2>
            <p className="text-medium mb-6">
              Implementamos Worksys para digitalizar el 100% de la operación y
              Expersys para certificar la calidad bajo ISO 9001. El resultado
              fue un ecosistema operativo interconectado donde cada proceso
              alimenta al siguiente sin fricción.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="heading-h6 mb-2 font-bold">Qué implementamos:</h3>
                <p className="text-base">
                  Estandarizamos y digitalizamos los procesos críticos de punta
                  a punta: prospección de clientes, calificación de prospectos,
                  CRM y seguimiento a cotizaciones, booking, compras, expedición
                  de compras, recolecciones, recepciones de mercancía,
                  logística, facturación, cuentas por cobrar y por pagar. Todos
                  estos flujos quedaron interconectados entre áreas mediante
                  tableros funcionales en Smartsheets.
                </p>
              </div>
              <div>
                <p className="text-base">
                  Una vez que la operación estaba sistematizada, creamos la
                  documentación formal bajo los estándares de ISO 9001 mediante
                  Expersys. Esto no solo garantizó control de calidad, sino que
                  convirtió el conocimiento operativo en un activo replicable
                  que permitió escalar sin depender de personas específicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
