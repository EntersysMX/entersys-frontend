"use client";

import React from "react";

export function Header114() {
  return (
    <section className="relative px-[5%]">
      <div className="container flex max-h-[60rem] min-h-svh">
        <div className="py-16 md:py-24 lg:py-28">
          <div className="relative z-10 grid h-full auto-cols-fr grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col justify-start md:justify-center">
              <h1 className="heading-h1 font-bold text-white">
                Entersyzamos empresas
              </h1>
            </div>
            <div className="mx-[7.5%] flex flex-col justify-end">
              <p className="text-medium text-white">
                Entersyzar es una manera a la que nos referimos cuándo una
                empresa acepta nuestro apoyo para sistematizar sus operaciones.
                Vivimos para eso, día con día y todo comienza 'entrando al
                sistema'.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-neutral-darkest/50" />
      </div>
    </section>
  );
}
