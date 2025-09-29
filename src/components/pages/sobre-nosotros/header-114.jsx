"use client";

import React from "react";
import { motion } from "framer-motion";

export function Header114({ colorScheme = 4, ...props }) {
  return (
    <section className={`relative px-[5%] color-scheme-${colorScheme}`} {...props}>
      <div className="container flex max-h-[60rem] min-h-svh">
        <div className="py-16 md:py-24 lg:py-28">
          <div className="relative z-10 grid h-full auto-cols-fr grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col justify-start md:justify-center">
              <motion.h1
                className="mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Entersyzamos empresas
              </motion.h1>
            </div>
            <div className="mx-[7.5%] flex flex-col justify-end">
              <motion.p
                className="text-white md:text-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Entersyzar es una manera a la que nos referimos cuando una
                empresa acepta nuestro apoyo para sistematizar sus operaciones.
                Vivimos para eso, día con día y todo comienza 'entrando al
                sistema'.
              </motion.p>
            </div>
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
          alt="Entersys transformación empresarial"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
    </section>
  );
}