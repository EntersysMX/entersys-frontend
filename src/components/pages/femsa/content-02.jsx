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
              alt="Solución FEMSA"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Un sistema centralizado que garantiza cumplimiento en tiempo real
            </h2>
            <p className="text-medium mb-6">
              Diseñamos e implementamos un ecosistema operativo en Smartsheets
              que digitalizó el 100% del proceso de gestión de contratistas:
              desde el onboarding inicial (verificación de documentación legal y
              técnica) hasta el seguimiento diario de trabajos de alto riesgo en
              cada una de las 225 unidades.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="heading-h6 mb-2 font-bold">
                  Qué implementamos:
                </h3>
                <p className="text-base">
                  Creamos tableros funcionales interconectados que estandarizan
                  la calificación de contratistas, el registro de competencias
                  laborales, la elaboración y aprobación de análisis de riesgos,
                  y el tracking en tiempo real del cumplimiento de protocolos de
                  seguridad. Todo centralizado en una plataforma que permite a
                  la dirección nacional tener visibilidad instantánea sobre el
                  estado de cualquier proyecto en cualquier unidad.
                </p>
              </div>
              <div>
                <p className="text-base">
                  El resultado: 714 proyectos de alto riesgo ejecutados sin un
                  solo accidente, certificación de cumplimiento normativo en
                  todas las unidades, y una reducción drástica en tiempos
                  administrativos. Lo que antes tomaba semanas en validaciones
                  manuales ahora se resuelve en minutos con flujos automáticos
                  que garantizan que ningún trabajo inicie sin cumplir el 100%
                  de los requisitos de seguridad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
