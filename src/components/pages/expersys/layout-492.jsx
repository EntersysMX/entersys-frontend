"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Dialog, DialogContent, DialogTrigger, VideoIframe } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { FaCirclePlay } from "react-icons/fa6";

export const Layout492 = ({ colorScheme = 1, ...props }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      heading: "Experiencia en auditoría y mejora continua",
      description:
        "Auditores con trayectoria práctica que convierten los requisitos de la norma en ventajas reales para tu operación.",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Experiencia en auditoría",
      },
    },
    {
      heading: "Coaching directo a líderes y equipos clave",
      description:
        "Acompañamos a gerentes y colaboradores clave para que adopten y mantengan el sistema como parte de su cultura diaria.",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Coaching directo",
      },
    },
    {
      heading: "Respaldo técnico durante todo el proceso",
      description:
        "Soporte integral que asegura tanto el cumplimiento normativo como la mejora productiva de tu empresa.",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Respaldo técnico",
      },
    },
  ];

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">
            Auditoría con respaldo real
          </p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Expertos que garantizan confianza
          </h1>
          <p className="md:text-md">
            La implementación de Expersys está liderada por auditores
            certificados Six Sigma Green Belt, con experiencia comprobada en
            gestión de calidad. Su rol es asegurar que cada proceso cumpla con
            los estándares internacionales, pero también que funcione en la
            práctica de tu operación.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2 lg:gap-x-20">
          <div className="mb-6 flex max-h-full w-full items-center justify-center overflow-hidden md:mb-0">
            <AnimatePresence mode="wait" initial={false}>
              {tabs.map((tab, index) => {
                if (activeTab !== index) return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                  >
                    {tab.image && (
                      <img
                        src={tab.image.src}
                        alt={tab.image.alt}
                        className="w-full rounded-image object-cover"
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start md:items-stretch">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                className={clsx("cursor-pointer border-b border-border-primary py-6", {
                  "opacity-100": activeTab === index,
                  "opacity-25": activeTab !== index,
                })}
              >
                <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                  {tab.heading}
                </h2>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeTab === index ? "auto" : 0,
                    opacity: activeTab === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 md:mt-4">{tab.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
