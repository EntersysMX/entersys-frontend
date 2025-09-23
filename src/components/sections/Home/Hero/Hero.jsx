"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import AnimatedSection from "../../../AnimatedSection";
import { motion } from "framer-motion";

const Hero = ({ colorScheme = 4, ...props }) => {
  return (
    <section id="relume" className={`relative px-[5%] color-scheme-${colorScheme}`} {...props}>
      <div className="relative z-10 container">
        <div className="flex max-h-[60rem] min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <h1 className="mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl">
                Simplificamos la complejidad operativa con inteligencia digital
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <p className="text-white md:text-md">
                Convertimos procesos manuales en sistemas inteligentes que
                optimizan tu operación. Resultados visibles en semanas, no en
                meses.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.6}>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button title="Agendar demo" className="rounded-lg">Agendar demo</Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button title="Conocer más" variant="secondary-alt" className="rounded-lg">
                    Conocer más
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
