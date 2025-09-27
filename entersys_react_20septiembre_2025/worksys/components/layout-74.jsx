"use client";

import React from "react";

export function Layout74() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <h3 className="heading-h3 font-bold text-white">
            El resultado: una operación más eficiente, controlada y escalable
          </h3>
          <div>
            <p className="text-medium mb-5 text-white md:mb-6">
              Worksys no solo digitaliza tus procesos, sino que también optimiza
              la toma de decisiones. Con nuestra metodología, experimentarás una
              transformación operativa que impulsa la eficiencia y la agilidad
              en tu negocio.
            </p>
            <ul className="my-4 list-disc pl-5 text-white">
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
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="absolute inset-0 size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-neutral-darkest/50" />
      </div>
    </section>
  );
}
