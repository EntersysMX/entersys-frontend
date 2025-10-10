"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import AnimatedSection, { AnimatedStaggerList, AnimatedStaggerItem } from "../../AnimatedSection";
import { motion } from "framer-motion";
import { analyticsService } from "../../../services/analytics";

export function Layout363({ colorScheme = 2, ...props }) {
  const navigate = useNavigate();

  const handleWorksysClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Servicio Worksys', 'inicio-servicios');
    navigate('/worksys');
  };

  const handleExpersysClick = () => {
    analyticsService.trackEvent('CTA', 'Button Click', 'Ver Servicio Expersys', 'inicio-servicios');
    navigate('/expersys');
  };
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
        <AnimatedStaggerList className="grid grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-2">
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <div className="grid grid-cols-1 items-start sm:grid-cols-2 overflow-hidden bg-transparent border border-border-primary/20 rounded-lg shadow-sm h-full">
                <div className="bg-[#C5F0E8] h-full">
                  <motion.img
                    src="/imagenes/inicio/servicios_insignia_worksys_inicio.webp"
                    className="w-full h-full object-cover block"
                    alt="Digitalización de procesos Worksys"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex h-full flex-col justify-center p-6">
                  <p className="mb-2 text-sm font-semibold text-primary">Worksys</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Digitalización de procesos con tecnología inteligente
                  </h3>
                  <p>Optimizamos operaciones mediante automatización y análisis de datos para incrementar eficiencia operacional.</p>
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
                        onClick={handleWorksysClick}
                      >
                        Ver servicio
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedStaggerItem>
          <AnimatedStaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <div className="grid grid-cols-1 items-start sm:grid-cols-2 overflow-hidden bg-transparent border border-border-primary/20 rounded-lg shadow-sm h-full">
                <div className="bg-[#C5F0E8] h-full">
                  <motion.img
                    src="/imagenes/inicio/servicios_gestion_inicio.webp"
                    className="w-full h-full object-cover block"
                    alt="Implementación de sistemas Expersys"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex h-full flex-col justify-center p-6">
                  <p className="mb-2 text-sm font-semibold text-primary">Expersys</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Implementación de sistemas de gestión
                  </h3>
                  <p>Sistemas de gestión de calidad que garantizan acreditaciones normativas y mejoran la competitividad.</p>
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
                        onClick={handleExpersysClick}
                      >
                        Ver servicio
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedStaggerItem>
        </AnimatedStaggerList>
      </div>
    </section>
  );
};

