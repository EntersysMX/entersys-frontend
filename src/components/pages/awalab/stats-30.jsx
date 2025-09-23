


import React, { Fragment } from "react";
import { Card } from "../../ui/Card";

export function Stats30({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h3 className="text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              Resultados tangibles de la transformación digital
            </h3>
          </div>
          <div>
            <p className="md:text-md">
              La implementación de Worksys generó mejoras significativas en la
              eficiencia operativa de Grupo industrial Nexus.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Fragment>
            <Card className="p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
              <p className="mb-8 text-10xl leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                45%
              </p>
              <h3 className="text-md leading-[1.4] font-bold md:text-xl mt-auto">
                Reducción de tiempos
              </h3>
              <p className="mt-2">
                Disminución en tiempos de producción y gestión
              </p>
            </Card>
          </Fragment>
          <Fragment>
            <div>
              <img
                className="aspect-[3/2] size-full rounded-image object-cover"
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
              />
            </div>
          </Fragment>
          <Fragment>
            <Card className="p-8">
              <p className="mb-8 text-10xl leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                45%
              </p>
              <h3 className="text-md leading-[1.4] font-bold md:text-xl">
                Reducción de tiempos
              </h3>
              <p className="mt-2">
                Disminución en tiempos de producción y gestión
              </p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-8 text-10xl leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                45%
              </p>
              <h3 className="text-md leading-[1.4] font-bold md:text-xl">
                Reducción de tiempos
              </h3>
              <p className="mt-2">
                Disminución en tiempos de producción y gestión
              </p>
            </Card>
          </Fragment>
          <Fragment>
            <div>
              <img
                className="aspect-[3/2] size-full rounded-image object-cover"
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
              />
            </div>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
