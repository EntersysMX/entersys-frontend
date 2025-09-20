"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { applyColorScheme } from '../design-tokens';

export function Layout241() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 bg-neutral-white" style={applyColorScheme(1)}>
      <div className="container">
        <div className="flex flex-col">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4" style={{color: 'var(--primary)'}}>Industrias</p>
              <h2 className="mb-5 text-3xl font-bold md:mb-6" style={{color: 'var(--neutral-darkest)'}}>
                Experiencia por industrias
              </h2>
              <p className="text-lg" style={{color: 'var(--neutral-dark)'}}>
                Entersys ofrece soluciones para diversos sectores, optimizando
                procesos y mejorando la eficiencia. Transformamos la operación
                de tu negocio.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-xl font-bold md:mb-6" style={{color: 'var(--neutral-darkest)'}}>
                Medium length section heading goes here
              </h3>
              <p style={{color: 'var(--neutral)'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-xl font-bold md:mb-6" style={{color: 'var(--neutral-darkest)'}}>
                Medium length section heading goes here
              </h3>
              <p style={{color: 'var(--neutral)'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-xl font-bold md:mb-6" style={{color: 'var(--neutral-darkest)'}}>
                Medium length section heading goes here
              </h3>
              <p style={{color: 'var(--neutral)'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button className="btn-secondary" variant="secondary">Ver casos de éxito</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link" style={{color: 'var(--primary)'}}>
              Ver más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
