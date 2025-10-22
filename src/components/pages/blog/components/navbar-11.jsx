"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar11() {
  const useActive = useRelume();
  return (
    <section className="z-[999] flex w-full items-center border-b border-scheme-border bg-scheme-background md:min-h-18 lg:px-[5%]">
      <div className="mx-auto size-full items-center justify-between lg:flex">
        <div className="grid min-h-16 grid-cols-2 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href="#">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Company logo"
            />
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center justify-self-end lg:hidden"
            onClick={useActive.toggleMobileMenu}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: 8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
                closed: {
                  translateY: 0,
                  rotate: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
              animate={useActive.animateMobileMenu}
              variants={{
                open: { width: 0, transition: { duration: 0.1 } },
                closed: {
                  width: "1.5rem",
                  transition: { delay: 0.3, duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: -8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
                closed: {
                  translateY: 0,
                  rotate: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: { height: "var(--height-open, 100dvh)" },
            close: { height: "var(--height-closed, 0)" },
          }}
          initial="close"
          exit="close"
          animate={useActive.animateMobileMenu}
          transition={{ duration: 0.3 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <nav className="lg:flex lg:items-center">
            <a
              href="#"
              className="text-regular block py-3 text-left first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-regular block py-3 text-left first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Nosotros
            </a>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <button
                className="text-regular flex w-full items-center justify-between gap-2 py-3 text-left lg:flex-none lg:justify-start lg:px-4 lg:py-2"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                <span>Servicios</span>
                <AnimatePresence>
                  <motion.div
                    animate={useActive.animateDropdownMenuIcon}
                    variants={{
                      rotated: { rotate: 180 },
                      initial: { rotate: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <RxChevronDown />
                  </motion.div>
                </AnimatePresence>
              </button>
              <AnimatePresence>
                <motion.nav
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  variants={{
                    open: {
                      visibility: "visible",
                      opacity: "var(--opacity-open, 100%)",
                      y: 0,
                      display: "block",
                    },
                    close: {
                      visibility: "hidden",
                      opacity: "var(--opacity-close, 0)",
                      y: "var(--y-close, 0%)",
                      display: "none",
                    },
                  }}
                  transition={{ duration: 0.3 }}
                  className="z-50 bg-scheme-background lg:absolute lg:w-80 lg:border lg:border-scheme-border lg:p-6 lg:[--y-close:25%]"
                >
                  <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-2 py-3 md:py-3 lg:gap-y-4 lg:py-0">
                    <a
                      href="#"
                      className="grid auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 lg:py-1"
                    >
                      <div>
                        <img
                          className="size-6"
                          src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                          alt="Icon 1"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-regular font-semibold">Worksys</p>
                        <p className="text-small hidden md:block">
                          Implementación y digitalización de procesos
                          empresariales
                        </p>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="grid auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 lg:py-1"
                    >
                      <div>
                        <img
                          className="size-6"
                          src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                          alt="Icon 2"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-regular font-semibold">Expersys</p>
                        <p className="text-small hidden md:block">
                          Implementación y acreditación de sistemas de gestión
                          de calidad
                        </p>
                      </div>
                    </a>
                  </div>
                </motion.nav>
              </AnimatePresence>
            </div>
            <a
              href="#"
              className="text-regular block py-3 text-left first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Clientes
            </a>
            <a
              href="#"
              className="text-regular block py-3 text-left first:pt-7 lg:px-4 lg:py-2 lg:first:pt-2"
            >
              Blog
            </a>
          </nav>
          <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:ml-4 lg:flex-row lg:items-center">
            <Button title="Contacto" size="sm">
              Contacto
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
