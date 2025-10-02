"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import AnimatedSection from "../../AnimatedSection";
import { motion } from "framer-motion";

export function Header5({ colorScheme = 4, ...props }) {
  return (
    <section id="relume" className={`relative px-[5%] color-scheme-${colorScheme}`} {...props}>
      <div className="relative z-10 container">
        <div className="flex h-screen max-h-[900px] items-center py-8">
          <div className="max-w-xl lg:max-w-2xl">
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <h1 className="mb-5 text-5xl font-bold text-white md:mb-6 md:text-7xl lg:text-8xl leading-tight">
                Simplificamos la complejidad operativa con inteligencia digital
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.4}>
              <p className="text-white md:text-lg max-w-md">
                Convertimos procesos manuales en sistemas inteligentes que
                optimizan tu operación. Resultados visibles en semanas, no en
                meses.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.6}>
              <div className="mt-8 flex flex-wrap gap-4">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Mobile (<768px) */}
        <div
          className="block md:hidden absolute inset-0"
          style={{
            backgroundImage: 'url(/imagenes/inicio/hero_main_inicio-mobile.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Desktop (768px - 1919px) */}
        <div
          className="hero-desktop-bg hidden md:block absolute inset-0"
          style={{
            backgroundImage: 'url(/imagenes/inicio/hero_main_inicio-desktop.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Large Desktop (≥1920px) - Using CSS media query for precise control */}
        <style jsx>{`
          @media (min-width: 1920px) {
            .hero-large-bg {
              display: block !important;
            }
            .hero-desktop-bg {
              display: none !important;
            }
          }
        `}</style>
        <div
          className="hero-large-bg hidden absolute inset-0"
          style={{
            backgroundImage: 'url(/imagenes/inicio/hero_main_inicio-desktop-2x.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1828]/95 via-[#0a1828]/60 to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
};

