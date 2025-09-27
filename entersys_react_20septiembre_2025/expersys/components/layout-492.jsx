"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIframe } from "@/components/ui/video-iframe";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

const useActiveValue = (initialValue) => {
  const [activeValue, setActiveValue] = useState(initialValue);
  const getActiveValue = (tabValue) => {
    return {
      height: activeValue === tabValue ? "auto" : 0,
      opacity: activeValue === tabValue ? 1 : 0,
    };
  };
  return {
    setActiveValue,
    getActiveValue,
  };
};

export function Layout492() {
  const activeValueState = useActiveValue("tab-one");
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">
            Auditoría con respaldo real
          </p>
          <h1 className="heading-h2 mb-5 font-bold md:mb-6">
            Expertos que garantizan confianza
          </h1>
          <p className="text-medium">
            La implementación de Expersys está liderada por auditores
            certificados Six Sigma Green Belt, con experiencia comprobada en
            gestión de calidad. Su rol es asegurar que cada proceso cumpla con
            los estándares internacionales, pero también que funcione en la
            práctica de tu operación.
          </p>
        </div>
        <Tabs
          defaultValue="tab-one"
          onValueChange={activeValueState.setActiveValue}
        >
          <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2 lg:gap-x-20">
            <div className="mb-6 flex max-h-full w-full items-center justify-center overflow-hidden md:mb-0">
              <TabsContent
                value="tab-one"
                className="w-full data-[state=active]:animate-tabs"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 1"
                      className="size-full rounded-image object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
              <TabsContent
                value="tab-two"
                className="w-full data-[state=active]:animate-tabs"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                  >
                    <Dialog>
                      <DialogTrigger className="relative flex w-full items-center justify-center overflow-hidden rounded-image">
                        <img
                          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail.svg"
                          alt="Relume placeholder image 2"
                          className="size-full object-cover"
                        />
                        <span className="absolute inset-0 z-10 bg-neutral-darkest/50" />
                        <FaCirclePlay className="absolute z-20 size-16 text-white" />
                      </DialogTrigger>
                      <DialogContent>
                        <VideoIframe video="https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW" />
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
              <TabsContent
                value="tab-three"
                className="w-full data-[state=active]:animate-tabs"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 3"
                      className="size-full rounded-image object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            </div>
            <TabsList className="relative grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start md:items-stretch">
              <TabsTrigger
                value="tab-one"
                className="flex-col items-start justify-start rounded-none border-0 border-b px-0 py-6 text-left whitespace-normal data-[state=active]:bg-transparent data-[state=inactive]:border-scheme-border data-[state=inactive]:opacity-25"
              >
                <h2 className="heading-h4 font-bold">
                  Experiencia en auditoría y mejora continua
                </h2>
                <motion.div
                  initial={false}
                  animate={activeValueState.getActiveValue("tab-one")}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 md:mt-4">
                    Auditores con trayectoria práctica que convierten los
                    requisitos de la norma en ventajas reales para tu operación.
                  </p>
                </motion.div>
              </TabsTrigger>
              <TabsTrigger
                value="tab-two"
                className="flex-col items-start justify-start border-0 border-b px-0 py-6 text-left whitespace-normal data-[state=active]:bg-transparent data-[state=inactive]:border-scheme-border data-[state=inactive]:opacity-25"
              >
                <h2 className="heading-h4 font-bold">
                  Coaching directo a líderes y equipos clave
                </h2>
                <motion.div
                  initial={false}
                  animate={activeValueState.getActiveValue("tab-two")}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 md:mt-4">
                    Acompañamos a gerentes y colaboradores clave para que
                    adopten y mantengan el sistema como parte de su cultura
                    diaria.
                  </p>
                </motion.div>
              </TabsTrigger>
              <TabsTrigger
                value="tab-three"
                className="flex-col items-start justify-start border-0 border-b px-0 py-6 text-left whitespace-normal data-[state=active]:bg-transparent data-[state=inactive]:border-scheme-border data-[state=inactive]:opacity-25"
              >
                <h2 className="heading-h4 font-bold">
                  Respaldo técnico durante todo el proceso
                </h2>
                <motion.div
                  initial={false}
                  animate={activeValueState.getActiveValue("tab-three")}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 md:mt-4">
                    Soporte integral que asegura tanto el cumplimiento normativo
                    como la mejora productiva de tu empresa.
                  </p>
                </motion.div>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
