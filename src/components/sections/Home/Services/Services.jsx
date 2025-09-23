"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import AnimatedSection, { AnimatedStaggerList, AnimatedStaggerItem } from "../../../AnimatedSection";
import { motion } from "framer-motion";

const Services = ({ colorScheme = 4, ...props }) => {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <AnimatedSection animation="fadeInUp">
              <p className="mb-3 font-semibold md:mb-4">Servicios</p>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Nuestras soluciones de transformación empresarial
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <p className="md:text-md">
                Entersyzamos negocios a partir de dos enfoques esenciales
              </p>
            </AnimatedSection>
          </div>
        </div>
        <AnimatedStaggerList className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-2">
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="grid grid-cols-1 items-start sm:grid-cols-2 overflow-hidden">
                <div className="flex size-full items-center justify-center">
                  <motion.img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    className="size-full object-cover"
                    alt="Relume placeholder image 1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex h-full flex-col justify-center p-6">
                  <p className="mb-2 text-sm font-semibold">Worksys</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Digitalización de procesos con tecnología inteligente
                  </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        title="Ver servicio"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Ver servicio
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatedStaggerItem>
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="grid grid-cols-1 items-start sm:grid-cols-2 overflow-hidden">
                <div className="flex size-full items-center justify-center">
                  <motion.img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    className="size-full object-cover"
                    alt="Relume placeholder image 1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex h-full flex-col justify-center p-6">
                  <p className="mb-2 text-sm font-semibold">Expersys</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Implementación de sistemas de gestión
                  </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        title="Ver servicio"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Ver servicio
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatedStaggerItem>
        </AnimatedStaggerList>
      </div>
    </section>
  );
};

export default Services;