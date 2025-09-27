"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Layout213() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                className="size-20"
                alt="Relume logo"
              />
            </div>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Voces de nuestros líderes
            </h2>
            <p className="text-medium">
              Conoce la visión y pasión detrás de Entersys directamente de sus
              fundadores. Esto es lo que Rodrigo Lay ha conversado por años a
              líderes de empresas en diferentes sectores e industrias.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Quiero conocerlo" variant="secondary">
                Quiero conocerlo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
