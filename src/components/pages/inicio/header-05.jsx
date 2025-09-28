"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import AnimatedSection from "../../../AnimatedSection";
import { motion } from "framer-motion";

export function Header5({ colorScheme = 4, ...props }) {
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
                <motion.button
                  className="rounded-lg transition-all duration-300 agendar-demo-button"
                  style={{
                    backgroundColor: 'white',
                    color: '#000000 !important',
                    border: '2px solid white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    padding: '0.625rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.color = '#000000';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#000000';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                  title="Agendar demo"
                >
                  <span style={{ color: '#000000 !important' }}>Agendar demo</span>
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    title="Conocer más"
                    variant="secondary-alt"
                    className="rounded-md"
                    style={{ color: 'black', borderRadius: '8px' }}
                  >
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

