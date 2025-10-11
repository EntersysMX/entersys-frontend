"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../../AnimatedSection";
import { motion } from "framer-motion";
import { analyticsService } from "../../../services/analytics";

export function Header5({ colorScheme = 4, ...props }) {
  const navigate = useNavigate();

  const handleAgendarDemoClick = () => {
    // Track evento en Analytics
    analyticsService.trackEvent('CTA', 'Button Click', 'Agendar Demo - Hero', 'inicio');
    // Navegar
    navigate('/contacto#formulario-contacto');
  };

  const handleConocerMasClick = () => {
    // Track evento en Analytics
    analyticsService.trackEvent('CTA', 'Button Click', 'Conocer Más - Hero', 'inicio');
    // Navegar
    navigate('/nosotros#origen');
  };
  return (
    <section id="relume" className={`relative mt-16 md:mt-18 color-scheme-${colorScheme}`} {...props}>
      <div className="relative z-10 container px-[5%]">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  title="Agendar demo"
                  onClick={handleAgendarDemoClick}
                >
                  Agendar demo
                </motion.button>
                <Button
                  title="Conocer más"
                  onClick={handleConocerMasClick}
                >
                  Conocer más
                </Button>
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
            backgroundImage: 'url(/imagenes/inicio/hero_principal_inicio-movil.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Desktop (768px - 1919px) */}
        <div
          className="hero-desktop-bg hidden md:block absolute inset-0"
          style={{
            backgroundImage: 'url(/imagenes/inicio/hero_principal_inicio-escritorio.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Large Desktop (≥1920px) - Using CSS media query for precise control */}
        <style>{`
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
            backgroundImage: 'url(/imagenes/inicio/hero_principal_inicio-escritorio-2x.webp)',
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

