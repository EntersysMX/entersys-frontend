"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/header.css";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isClientesDropdownOpen, setIsClientesDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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

  // Clientes dropdown handlers
  const openOnMobileClientesDropdownMenu = () => {
    setIsClientesDropdownOpen((prev) => !prev);
  };
  const openOnDesktopClientesDropdownMenu = () => {
    !isMobile && setIsClientesDropdownOpen(true);
  };
  const closeOnDesktopClientesDropdownMenu = () => {
    !isMobile && setIsClientesDropdownOpen(false);
  };

  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateServicesDropdownMenu = isServicesDropdownOpen ? "open" : "close";
  const animateServicesDropdownMenuIcon = isServicesDropdownOpen ? "rotated" : "initial";
  const animateClientesDropdownMenu = isClientesDropdownOpen ? "open" : "close";
  const animateClientesDropdownMenuIcon = isClientesDropdownOpen ? "rotated" : "initial";

  return {
    toggleMobileMenu,
    closeMobileMenu,
    // Services dropdown
    openOnDesktopServicesDropdownMenu,
    closeOnDesktopServicesDropdownMenu,
    openOnMobileServicesDropdownMenu,
    animateServicesDropdownMenu,
    animateServicesDropdownMenuIcon,
    // Clientes dropdown
    openOnDesktopClientesDropdownMenu,
    closeOnDesktopClientesDropdownMenu,
    openOnMobileClientesDropdownMenu,
    animateClientesDropdownMenu,
    animateClientesDropdownMenuIcon,
    // Mobile menu
    animateMobileMenu,
    animateMobileMenuButtonSpan,
  };
};

const Header = ({ colorScheme = 1, ...props }) => {
  const useActive = useRelume();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/inicio';
    }
    return location.pathname === path;
  };

  const isServicesActive = () => {
    return location.pathname === '/worksys' || location.pathname === '/expersys';
  };

  const isClientesActive = () => {
    return location.pathname === '/clientes' || location.pathname.startsWith('/clientes/');
  };

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {useActive.animateMobileMenu === 'open' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden"
            onClick={useActive.closeMobileMenu}
          />
        )}
      </AnimatePresence>

      <header
        className={`header bg-white text-black border-b border-gray-200 color-scheme-${colorScheme} relative z-[999]`}
        {...props}
      >
        <section
          id="relume"
          className="flex w-full items-center border-b md:min-h-18 lg:px-[5%]"
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
              open: { height: "var(--height-open, calc(100vh - 4rem))" },
              close: { height: "var(--height-closed, 0)" },
            }}
            initial="close"
            exit="close"
            animate={useActive.animateMobileMenu}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden overflow-y-auto px-[5%] pb-6 lg:flex lg:items-center lg:px-0 lg:pb-0 lg:overflow-visible lg:[--height-closed:auto] lg:[--height-open:auto]"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <nav className="lg:flex lg:items-center">
              <Link
                to="/"
                onClick={useActive.closeMobileMenu}
                className={`block py-4 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 transition-colors touch-manipulation ${
                  isActive('/') ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/nosotros"
                onClick={useActive.closeMobileMenu}
                className={`block py-4 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 transition-colors touch-manipulation ${
                  isActive('/nosotros') ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}
              >
                Nosotros
              </Link>
              <div
                onMouseEnter={useActive.openOnDesktopServicesDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopServicesDropdownMenu}
              >
                <div className={`header-dropdown-button flex w-full items-center justify-between gap-2 py-4 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base transition-colors touch-manipulation ${
                  isServicesActive() ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}>
                  <span className="flex-1">Servicios</span>
                  <button
                    onClick={useActive.openOnMobileServicesDropdownMenu}
                    className="lg:hidden p-2 -mr-2"
                    aria-label="Toggle services menu"
                  >
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
                  <div className="hidden lg:block">
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
                  </div>
                </div>
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
                    <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-1 py-3 md:py-3 lg:gap-y-4 lg:py-0 border-l-2 border-gray-100 pl-4 lg:border-0 lg:pl-0">
                      <Link
                        to="/worksys"
                        onClick={useActive.closeMobileMenu}
                        className={`block py-3 lg:py-1 transition-colors touch-manipulation ${
                          isActive('/worksys') ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <p className={`text-md font-semibold lg:text-base ${
                            isActive('/worksys') ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            Worksys
                          </p>
                          <p className="text-sm text-gray-600">
                            Implementación y digitalización de procesos
                            empresariales
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/expersys"
                        onClick={useActive.closeMobileMenu}
                        className={`block py-3 lg:py-1 transition-colors touch-manipulation ${
                          isActive('/expersys') ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <p className={`text-md font-semibold lg:text-base ${
                            isActive('/expersys') ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            Expersys
                          </p>
                          <p className="text-sm text-gray-600">
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
                onMouseEnter={useActive.openOnDesktopClientesDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopClientesDropdownMenu}
              >
                <div className={`header-dropdown-button flex w-full items-center justify-between gap-2 py-4 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base transition-colors touch-manipulation ${
                  isClientesActive() ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}>
                  <Link to="/clientes" onClick={useActive.closeMobileMenu} className="flex-1">Clientes</Link>
                  <button
                    onClick={useActive.openOnMobileClientesDropdownMenu}
                    className="lg:hidden p-2 -mr-2"
                    aria-label="Toggle clients menu"
                  >
                    <AnimatePresence>
                      <motion.div
                        animate={useActive.animateClientesDropdownMenuIcon}
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
                  <div className="hidden lg:block">
                    <AnimatePresence>
                      <motion.div
                        animate={useActive.animateClientesDropdownMenuIcon}
                        variants={{
                          rotated: { rotate: 180 },
                          initial: { rotate: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <RxChevronDown />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <AnimatePresence>
                  <motion.nav
                    animate={useActive.animateClientesDropdownMenu}
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
                    <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-1 py-3 md:py-3 lg:gap-y-4 lg:py-0 border-l-2 border-gray-100 pl-4 lg:border-0 lg:pl-0">
                      <Link
                        to="/clientes/qhse"
                        onClick={useActive.closeMobileMenu}
                        className={`block py-3 lg:py-1 transition-colors touch-manipulation ${
                          location.pathname === '/clientes/qhse' ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <p className={`text-md font-semibold lg:text-base ${
                            location.pathname === '/clientes/qhse' ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            QHSE
                          </p>
                          <p className="text-sm text-gray-600">
                            De 11 a 253 millones. Crecimiento 2,000% con ISO 9001
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/clientes/coca-cola"
                        onClick={useActive.closeMobileMenu}
                        className={`block py-3 lg:py-1 transition-colors touch-manipulation ${
                          location.pathname === '/clientes/coca-cola' ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <p className={`text-md font-semibold lg:text-base ${
                            location.pathname === '/clientes/coca-cola' ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            Coca-Cola
                          </p>
                          <p className="text-sm text-gray-600">
                            714 proyectos sin accidentes en 195 unidades
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/clientes/ochoa"
                        onClick={useActive.closeMobileMenu}
                        className={`block py-3 lg:py-1 transition-colors touch-manipulation ${
                          location.pathname === '/clientes/ochoa' ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center gap-1">
                          <p className={`text-md font-semibold lg:text-base ${
                            location.pathname === '/clientes/ochoa' ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            Productos de Maíz Ochoa
                          </p>
                          <p className="text-sm text-gray-600">
                            Del 56% al 95% de cumplimiento en calidad
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
              <Link
                to="/blog"
                onClick={useActive.closeMobileMenu}
                className={`block py-4 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 transition-colors touch-manipulation ${
                  isActive('/blog') ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}
              >
                Blog
              </Link>
            </nav>
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col gap-4 lg:mt-0 lg:pt-0 lg:border-0 lg:ml-4 lg:flex-row lg:items-center">
              <Link to="/contacto" onClick={useActive.closeMobileMenu} className="w-full lg:w-auto">
                <button
                  className="w-full lg:w-auto contact-button-custom px-6 py-3 lg:px-4 lg:py-2 font-semibold text-base lg:font-medium lg:text-sm text-white rounded-lg transition-all duration-300 touch-manipulation bg-gradient-to-br from-[#009CA6] to-[#008A94] hover:from-[#008A94] hover:to-[#007A82] active:scale-95 shadow-lg shadow-[#009CA6]/30 hover:shadow-xl hover:shadow-[#009CA6]/40 lg:shadow-md lg:hover:shadow-lg"
                  title="Contacto"
                >
                  Contacto
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </header>
    </>
  );
};

export default Header;