"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Layout421({ colorScheme = 1, ...props }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transformaciones suaves para las imágenes
  const image1Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const image2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const image3Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const image1Rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const image2Rotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const image3Rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <section
      ref={containerRef}
      id="procesos-manuales"
      className="relative px-[5%] py-16 md:py-24 lg:py-28 overflow-hidden"
      {...props}
    >
      <div className="container">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="mx-auto w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">
              De procesos manuales a flujos estandarizados y digitales
            </p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Una metodología que convierte tu operación en un sistema
              inteligente
            </h1>
            <p className="md:text-md">
              Worksys es un servicio consultivo que transforma la manera en que
              gestionas tu operación. Iniciamos con una planeación estratégica
              clara, documentamos procesos críticos y los digitalizamos en
              herramientas prácticas como Smartsheet, aplicaciones code/no-code
              e inteligencia artificial aplicada.
            </p>
          </div>
        </div>

        {/* Mobile: Collage adaptado similar a desktop */}
        <div className="md:hidden relative h-[550px] max-w-md mx-auto">
          {/* Imagen 1 - Izquierda superior (Procesos) */}
          <motion.div
            className="absolute left-[5%] top-[8%] w-[42%] z-30"
            style={{ y: image1Y }}
          >
            <img
              src="/imagenes/worksys/section_process_worksys.webp"
              alt="Digitalización de procesos"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 2 - Derecha superior (Cascade/IA) */}
          <motion.div
            className="absolute right-[3%] top-[12%] w-[45%] z-50"
            style={{ y: image3Y }}
          >
            <img
              src="/imagenes/worksys/section_cascade_worksys.webp"
              alt="Inteligencia artificial"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 3 - Centro (Dashboard) */}
          <motion.div
            className="absolute left-[15%] top-[38%] w-[48%] z-40"
            style={{ y: image2Y }}
          >
            <img
              src="/imagenes/worksys/section_dashboard_worksys.webp"
              alt="Dashboards y analytics"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 4 - Derecha inferior (Manual/Workspace) */}
          <motion.div
            className="absolute right-[8%] bottom-[5%] w-[40%] z-20"
            style={{ y: image1Y }}
          >
            <img
              src="/imagenes/worksys/section_manual_worksys.webp"
              alt="Workspace digital"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Desktop: Collage de imágenes superpuestas - Todas del mismo tamaño */}
        <div className="hidden md:block relative h-[500px] lg:h-[550px] max-w-7xl mx-auto">
          {/* Imagen 1 - Izquierda inferior (documentos con notas) */}
          <motion.div
            className="absolute left-[2%] bottom-[12%] w-[28%] z-20"
            style={{ y: image1Y }}
          >
            <img
              src="/imagenes/worksys/section_documentation_worksys.webp"
              alt="Worksys documentos"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 2 - Centro (monitor con diagrama de flujo) */}
          <motion.div
            className="absolute left-[25%] top-[5%] w-[28%] z-40"
            style={{ y: image2Y }}
          >
            <img
              src="/imagenes/worksys/section_process_worksys.webp"
              alt="Worksys diagrama"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 3 - Derecha superior (red neuronal azul) */}
          <motion.div
            className="absolute right-[5%] top-[8%] w-[28%] z-50"
            style={{ y: image3Y }}
          >
            <img
              src="/imagenes/worksys/section_cascade_worksys.webp"
              alt="Worksys red neuronal"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 4 - Centro inferior (escritorio workspace) */}
          <motion.div
            className="absolute left-[32%] top-[52%] w-[28%] z-30"
            style={{ y: image1Y }}
          >
            <img
              src="/imagenes/worksys/section_manual_worksys.webp"
              alt="Worksys escritorio"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>

          {/* Imagen 5 - Derecha inferior (monitor con analytics/gráficas) */}
          <motion.div
            className="absolute left-[51%] top-[44%] w-[28%] z-60"
            style={{ y: image2Y }}
          >
            <img
              src="/imagenes/worksys/section_dashboard_worksys.webp"
              alt="Worksys analytics"
              className="w-full h-auto object-cover rounded-md shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
