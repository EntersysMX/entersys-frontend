"use client";

import React from "react";
import { motion } from "framer-motion";

export function Header64({ colorScheme = 2, ...props }) {
  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mx-auto max-w-lg text-center">
          <motion.h1
            className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Simplificamos tu operación
          </motion.h1>
          <motion.p
            className="md:text-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transformamos procesos complejos en sistemas inteligentes que impulsan la eficiencia
            de tu empresa
          </motion.p>
        </div>
      </div>
    </section>
  );
}
