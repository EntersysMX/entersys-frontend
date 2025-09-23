"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import AnimatedSection, { AnimatedStaggerList, AnimatedStaggerItem } from "../../../AnimatedSection";
import AnimatedCounter from "../../../AnimatedCounter";
import { motion } from "framer-motion";

const Technology = ({ colorScheme = 4, ...props }) => {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <AnimatedSection animation="fadeInUp">
                <p className="mb-3 font-semibold md:mb-4">Industrias</p>
                <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                  Experiencia por industrias
                </h2>
                <p className="md:text-md">
                  Entersys ofrece soluciones para diversos sectores, optimizando
                  procesos y mejorando la eficiencia. Transformamos la operación
                  de tu negocio.
                </p>
              </AnimatedSection>
            </div>
          </div>
          {/* Statistics Section with Counter Animations */}
          <AnimatedSection animation="fadeInUp" className="mb-16 md:mb-20">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              <div className="text-center">
                <AnimatedCounter
                  to={150}
                  suffix="+"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                />
                <p className="mt-2 text-sm md:text-base">Proyectos completados</p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  to={95}
                  suffix="%"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                />
                <p className="mt-2 text-sm md:text-base">Satisfacción del cliente</p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  to={12}
                  suffix=" años"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                />
                <p className="mt-2 text-sm md:text-base">Experiencia</p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  to={24}
                  suffix="/7"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                />
                <p className="mt-2 text-sm md:text-base">Soporte disponible</p>
              </div>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col">
              <div className="mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  className="size-12"
                  alt="Relume logo"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Medium length section heading goes here
              </h3>
              <p>
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
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Medium length section heading goes here
              </h3>
              <p>
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
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Medium length section heading goes here
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary">Ver casos de éxito</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Button
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;