"use client";

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import AnimatedSection, { AnimatedStaggerList, AnimatedStaggerItem } from "../../AnimatedSection";
import { motion } from "framer-motion";

export function Layout394({ colorScheme = 2, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <AnimatedSection animation="fadeInUp">
            <p className="mb-3 font-semibold md:mb-4">Diferenciadores clave</p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Por qué elegir Entersys
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <p className="md:text-md">
              Transformamos la complejidad operativa en oportunidades de
              crecimiento
            </p>
          </AnimatedSection>
        </div>
        <AnimatedStaggerList className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="flex flex-col">
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <div>
                    <p className="mb-2 font-semibold">Eficiencia</p>
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      Resultados medibles en semanas
                    </h2>
                    <p>
                      Optimizamos procesos para que tomes decisiones más rápidas
                    </p>
                  </div>
                  <div className="mt-5 md:mt-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        title="Comprobar"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Comprobar
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center self-start">
                  <motion.img
                    src="/imagenes/inicio/diferenciadores_eficiencia_inicio.webp"
                    alt="Resultados medibles en semanas"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatedStaggerItem>
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="flex flex-col">
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <div>
                    <p className="mb-2 font-semibold">Escalabilidad</p>
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      Sistemas que crecen con tu empresa
                    </h2>
                    <p>Soluciones flexibles y adaptables a tu crecimiento</p>
                  </div>
                  <div className="mt-5 md:mt-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        title="Quiero estos sistemas"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Quiero estos sistemas
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center self-start">
                  <motion.img
                    src="/imagenes/inicio/diferenciadores_escalabilidad_inicio.webp"
                    alt="Sistemas escalables"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatedStaggerItem>
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="flex flex-col">
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <div>
                    <p className="mb-2 font-semibold">Cumplimiento</p>
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      Protección normativa integral
                    </h2>
                    <p>
                      Garantizamos el cumplimiento de estándares internacionales
                    </p>
                  </div>
                  <div className="mt-5 md:mt-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        title="Estandarizar empresa"
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                      >
                        Estandarizar empresa
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center self-start">
                  <motion.img
                    src="/imagenes/inicio/diferenciadores_cumplimiento_inicio.webp"
                    alt="Protección normativa"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Card>
            </motion.div>
          </AnimatedStaggerItem>
        </AnimatedStaggerList>
      </div>
    </section>
  );
};
