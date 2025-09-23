"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const useRelume = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const isMobile = useMediaQuery("(max-width: 479px)");
  const halfViewportHeight =
    typeof window !== "undefined" ? window.innerHeight * 0.5 : 100;
  const containerMotion = {
    opacity: useTransform(scrollY, [0, halfViewportHeight], [1, 0]),
    scale: useTransform(scrollY, [0, halfViewportHeight], [1, 0.95]),
  };
  const createTransform = (x, y, rotate) => ({
    translateX: useTransform(scrollYProgress, [0, 1], x),
    translateY: useTransform(scrollYProgress, [0, 1], y),
    rotateZ: useTransform(scrollYProgress, [0, 1], rotate),
  });
  const imageTransforms = (index) => {
    switch (index) {
      case 1:
        return isMobile
          ? createTransform(["13%", "90%"], ["12%", "80%"], ["0.6deg", "4deg"])
          : createTransform(["0%", "100%"], ["0%", "60%"], ["0deg", "-4deg"]);
      case 2:
        return isMobile
          ? createTransform(
              ["-12%", "-80%"],
              ["-12%", "-80%"],
              ["-3deg", "4deg"],
            )
          : createTransform(["0%", "-50%"], ["0%", "-90%"], ["4deg", "4deg"]);
      case 3:
        return isMobile
          ? createTransform(
              ["17.5%", "120%"],
              ["-6%", "-40%"],
              ["-0.6deg", "-6deg"],
            )
          : createTransform(["0%", "140%"], ["0%", "-40%"], ["0deg", "-12deg"]);
      case 4:
        return isMobile
          ? createTransform(
              ["-17.5%", "-120%"],
              ["9%", "60%"],
              ["4.6deg", "8deg"],
            )
          : createTransform(["0%", "-140%"], ["0%", "60%"], ["8deg", "8deg"]);
      default:
        return {};
    }
  };
  return {
    containerMotion,
    imageTransforms,
  };
};

export function Layout421({ colorScheme = 1, ...props }) {
  const useActive = useRelume();
  return (
    <section id="relume" className="relative flex flex-col" {...props}>
      <motion.div
        className="sticky top-0 z-0 mx-auto flex min-h-0 items-center justify-center md:min-h-[auto]"
        style={useActive.containerMotion}
      >
        <div className="py-16 text-center md:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-lg px-[5%]">
            <p className="mb-3 font-semibold md:mb-4">
              De procesos manuales a flujos estandarizados y digitales
            </p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Una metodología que convierte tu operación en un sistema
              inteligente
            </h1>
            <p className="relative z-20 md:text-md">
              Worksys es un servicio consultivo que transforma la manera en que
              gestionas tu operación. Iniciamos con una planeación estratégica
              clara, documentamos procesos críticos y los digitalizamos en
              herramientas prácticas como Smartsheet, aplicaciones code/no-code
              e inteligencia artificial aplicada.
            </p>
          </div>
        </div>
      </motion.div>
      <div className="sticky top-0 z-10 -mt-20 flex h-[60svh] flex-col justify-center sm:mt-0 sm:h-[80svh] md:h-[70svh] lg:h-[120vh] lg:justify-normal">
        <div className="relative flex size-full items-center justify-center overflow-hidden">
          <motion.div
            className="absolute w-full max-w-[55vw] md:max-w-[35vw] lg:max-w-[30vw]"
            style={useActive.imageTransforms(0)}
          >
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="size-full rounded-image"
            />
          </motion.div>
          <motion.div
            className="absolute w-full max-w-[55vw] md:max-w-[35vw] lg:max-w-[30vw]"
            style={useActive.imageTransforms(1)}
          >
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 2"
              className="size-full rounded-image"
            />
          </motion.div>
          <motion.div
            className="absolute w-full max-w-[55vw] md:max-w-[35vw] lg:max-w-[30vw]"
            style={useActive.imageTransforms(2)}
          >
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 3"
              className="size-full rounded-image"
            />
          </motion.div>
          <motion.div
            className="absolute w-full max-w-[55vw] md:max-w-[35vw] lg:max-w-[30vw]"
            style={useActive.imageTransforms(3)}
          >
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 4"
              className="size-full rounded-image"
            />
          </motion.div>
          <motion.div
            className="absolute w-full max-w-[55vw] md:max-w-[35vw] lg:max-w-[30vw]"
            style={useActive.imageTransforms(4)}
          >
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 5"
              className="size-full rounded-image"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 mt-[80vh] sm:mt-[100vh]" />
    </section>
  );
}
