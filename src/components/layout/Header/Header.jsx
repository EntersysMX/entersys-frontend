"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { Link } from "react-router-dom";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isClientsDropdownOpen, setIsClientsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Services dropdown handlers
  const openOnMobileServicesDropdownMenu = () => {
    setIsServicesDropdownOpen((prev) => !prev);
  };
  const openOnDesktopServicesDropdownMenu = () => {
    !isMobile && setIsServicesDropdownOpen(true);
  };
  const closeOnDesktopServicesDropdownMenu = () => {
    !isMobile && setIsServicesDropdownOpen(false);
  };

  // Clients dropdown handlers
  const openOnMobileClientsDropdownMenu = () => {
    setIsClientsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopClientsDropdownMenu = () => {
    !isMobile && setIsClientsDropdownOpen(true);
  };
  const closeOnDesktopClientsDropdownMenu = () => {
    !isMobile && setIsClientsDropdownOpen(false);
  };

  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateServicesDropdownMenu = isServicesDropdownOpen ? "open" : "close";
  const animateServicesDropdownMenuIcon = isServicesDropdownOpen ? "rotated" : "initial";
  const animateClientsDropdownMenu = isClientsDropdownOpen ? "open" : "close";
  const animateClientsDropdownMenuIcon = isClientsDropdownOpen ? "rotated" : "initial";

  return {
    toggleMobileMenu,
    // Services dropdown
    openOnDesktopServicesDropdownMenu,
    closeOnDesktopServicesDropdownMenu,
    openOnMobileServicesDropdownMenu,
    animateServicesDropdownMenu,
    animateServicesDropdownMenuIcon,
    // Clients dropdown
    openOnDesktopClientsDropdownMenu,
    closeOnDesktopClientsDropdownMenu,
    openOnMobileClientsDropdownMenu,
    animateClientsDropdownMenu,
    animateClientsDropdownMenuIcon,
    // Mobile menu
    animateMobileMenu,
    animateMobileMenuButtonSpan,
  };
};

const Header = ({ colorScheme = 1, ...props }) => {
  const useActive = useRelume();

  return (
    <header
      className={`bg-white text-black border-b border-gray-200 color-scheme-${colorScheme}`}
      {...props}
    >
      <section
        id="relume"
        className="z-[999] flex w-full items-center border-b md:min-h-18 lg:px-[5%]"
      >
        <div className="mx-auto size-full items-center justify-between lg:flex">
          <div className="grid min-h-16 grid-cols-2 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
            <Link to="/">
              <img
                src="/entersys_logo.png"
                alt="Entersys Logo"
                className="h-8"
              />
            </Link>
            <button
              className="-mr-2 flex size-12 flex-col items-center justify-center justify-self-end lg:hidden"
              onClick={useActive.toggleMobileMenu}
            >
              {useActive.animateMobileMenu === 'open' ? (
                <span className="material-symbols-outlined text-2xl">close</span>
              ) : (
                <span className="material-symbols-outlined text-2xl">menu</span>
              )}
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
              <Link
                to="/"
                className="block py-3 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 text-black"
              >
                Inicio
              </Link>
              <Link
                to="/sobre-nosotros"
                className="block py-3 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 text-black"
              >
                Nosotros
              </Link>
              <div
                onMouseEnter={useActive.openOnDesktopServicesDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopServicesDropdownMenu}
              >
                <button
                  className="flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base text-black"
                  onClick={useActive.openOnMobileServicesDropdownMenu}
                >
                  <span className="text-black">Servicios</span>
                  <AnimatePresence>
                    <motion.div
                      animate={useActive.animateServicesDropdownMenuIcon}
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
                    animate={useActive.animateServicesDropdownMenu}
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
                    className="z-50 bg-white lg:absolute lg:w-80 lg:border lg:border-neutral-300 lg:p-6 lg:[--y-close:25%]"
                  >
                    <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-2 py-3 md:py-3 lg:gap-y-4 lg:py-0">
                      <Link
                        to="/worksys"
                        className="block py-2 lg:py-1 text-black"
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-md font-semibold lg:text-base text-black">
                            Worksys
                          </p>
                          <p className="hidden text-sm md:block text-gray-600">
                            Implementación y digitalización de procesos
                            empresariales
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/expersys"
                        className="block py-2 lg:py-1 text-black"
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-md font-semibold lg:text-base text-black">
                            Expersys
                          </p>
                          <p className="hidden text-sm md:block text-gray-600">
                            Implementación y acreditación de sistemas de gestión
                            de calidad
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
              <div
                onMouseEnter={useActive.openOnDesktopClientsDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopClientsDropdownMenu}
              >
                <button
                  className="flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base text-black"
                  onClick={useActive.openOnMobileClientsDropdownMenu}
                >
                  <span className="text-black">Clientes</span>
                  <AnimatePresence>
                    <motion.div
                      animate={useActive.animateClientsDropdownMenuIcon}
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
                    animate={useActive.animateClientsDropdownMenu}
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
                    className="z-50 bg-white lg:absolute lg:w-80 lg:border lg:border-neutral-300 lg:p-6 lg:[--y-close:25%]"
                  >
                    <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-2 py-3 md:py-3 lg:gap-y-4 lg:py-0">
                      <Link
                        to="/awalab"
                        className="block py-2 lg:py-1 text-black"
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-md font-semibold lg:text-base text-black">
                            AQUALAB
                          </p>
                          <p className="hidden text-sm md:block text-gray-600">
                            Centro de investigación e innovación tecnológica
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
              <Link
                to="/blog"
                className="block py-3 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 text-black"
              >
                Blog
              </Link>
            </nav>
            <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:ml-4 lg:flex-row lg:items-center">
              <Link to="/contacto">
                <Button title="Contacto" size="sm">
                  Contacto
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </header>
  );
};

export default Header;