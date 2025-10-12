"use client";

import React from "react";

export function Layout109({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">
              Inteligencia de negocios para cualquier industria
            </p>
            <h3 className="text-5xl leading-[1.2] font-bold md:text-7xl lg:text-8xl">
              Worksys es para empresas que requieren precisión
            </h3>
          </div>
          <div>
            <p className="mb-5 md:mb-6 md:text-md">
              Hemos consolidado experiencia importante en diversas verticales de
              negocio y estamos orgullosos de poder llevar una solución a la
              medida en cada una
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>Retail</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Manufactura</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Logística</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Alimentos y bebidas</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Financiero</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Salud</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Educación</p>
              </li>
            </ul>
          </div>
        </div>
        <img
          src="/imagenes/worksys/section_industries_worksys.webp"
          className="w-full rounded-image object-cover"
          alt="Worksys para diversas industrias"
        />
      </div>
    </section>
  );
}
