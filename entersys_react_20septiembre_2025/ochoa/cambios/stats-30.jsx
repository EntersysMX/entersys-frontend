"use client";

import { Card } from "@/components/ui/card";
import React, { Fragment } from "react";

export function Stats30() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h3 className="heading-h3 font-bold">
              Calidad visible y medible cada día
            </h3>
          </div>
          <div>
            <p className="text-medium">
              La digitalización no solo eliminó el papel, convirtió la calidad
              en un proceso medible en tiempo real que permite decisiones
              inmediatas basadas en datos.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Fragment>
            <Card className="p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                95% de cumplimiento
              </p>
              <h3 className="heading-h6 font-bold mt-auto">
                Incremento en calidad monitoreada
              </h3>
              <p className="mt-2">Con información en tiempo real</p>
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
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                95% de cumplimiento
              </p>
              <h3 className="heading-h6 font-bold">
                Incremento en calidad monitoreada
              </h3>
              <p className="mt-2">Con información en tiempo real</p>
            </Card>
          </Fragment>
          <Fragment>
            <Card className="p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-8 text-[3.5rem] leading-[1.3] font-bold md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                95% de cumplimiento
              </p>
              <h3 className="heading-h6 font-bold">
                Incremento en calidad monitoreada
              </h3>
              <p className="mt-2">Con información en tiempo real</p>
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
