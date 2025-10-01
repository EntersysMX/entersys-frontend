"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import AnimatedSection, { AnimatedStaggerList, AnimatedStaggerItem } from "../../AnimatedSection";
import { motion } from "framer-motion";

export function Layout241({ colorScheme = 4, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <AnimatedSection animation="fadeInUp">
              <p className="mb-3 font-semibold md:mb-4">Industrias</p>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Experiencia por industrias
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <p className="md:text-md">
                Expertos ença industrias para diversos sectores, optimizando procesos y mejorando la eficiencia. Transformamos la operación de tu negocio.
              </p>
            </AnimatedSection>
          </div>
        </div>
        <AnimatedStaggerList className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-3">
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/imagenes/inicio/icon_factory_inicio.svg" alt="Manufactura" className="h-10 w-10" />
                </motion.div>
                <h3 className="mb-3 text-xl font-bold md:text-2xl">
                  Experiencia en Manufactura
                </h3>
                <p className="text-sm">
                  Implementamos la metodología Visual Management para abastecer de qué parte de la línea productiva se generan los cuellos de botella mediante nuestras técnicas.
                </p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Ver casos de éxito
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedStaggerItem>
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/imagenes/inicio/icon_science_inicio.svg" alt="Tratamiento de agua" className="h-10 w-10" />
                </motion.div>
                <h3 className="mb-3 text-xl font-bold md:text-2xl">
                  Tratamiento de agua
                </h3>
                <p className="text-sm">
                  Implementamos un sistema de gestión de calidad para controlar procesos con NOM-014 de un operador dedicado al tratamiento de agua.
                </p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Auditoría
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedStaggerItem>
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/imagenes/inicio/icon_car_repair_inicio.svg" alt="Mantenimiento en flotillas" className="h-10 w-10" />
                </motion.div>
                <h3 className="mb-3 text-xl font-bold md:text-2xl">
                  Mantenimiento en flotillas
                </h3>
                <p className="text-sm">
                  Digitalizamos un portal digital capaz de brindar un mantenimiento preventivo de más de 70 unidades dedicadas al aprovisionamiento y almacenamiento de equipos automotrices.
                </p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Gestión flotillas
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedStaggerItem>
        </AnimatedStaggerList>
      </div>
    </section>
  );
};

