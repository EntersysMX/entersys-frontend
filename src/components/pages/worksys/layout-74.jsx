"use client";

import OptimizedImage from "../../ui/OptimizedImage";
import React from "react";

export function Layout74({ colorScheme = 1, ...props }) {
  return (
    <section id="operacion-eficiente" className={`relative px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <h3 className="text-4xl leading-[1.2] font-bold text-text-alternative md:text-5xl lg:text-6xl">
            El resultado: una operación más eficiente, controlada y escalable
          </h3>
          <div>
            <p className="mb-5 text-text-alternative md:mb-6 md:text-md">
              Worksys no solo digitaliza tus procesos, sino que también optimiza
              la toma de decisiones. Con nuestra metodología, experimentarás una
              transformación operativa que impulsa la eficiencia y la agilidad
              en tu negocio.
            </p>
            <ul className="my-4 list-disc pl-5 text-text-alternative">
              <li className="my-1 self-start pl-2">
                <p>Eficiencia mejorada en cada aspecto de tu operación</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Decisiones rápidas que impulsan el crecimiento inmediato</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Adaptabilidad que acompaña el crecimiento de tu empresa</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/imagenes/worksys/banner_resultados_worksys.webp"
          className="absolute inset-0 size-full object-cover"
          alt="Operación eficiente y escalable"
          effect="blur"
          threshold={200}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
