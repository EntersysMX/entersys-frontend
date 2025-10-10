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
    <header
      className={`header bg-white text-black border-b border-gray-200 color-scheme-${colorScheme}`}
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
                className={`block py-3 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 transition-colors ${
                  isActive('/') ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/nosotros"
                className={`block py-3 text-left text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 transition-colors ${
                  isActive('/nosotros') ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}
              >
                Nosotros
              </Link>
              <div
                onMouseEnter={useActive.openOnDesktopServicesDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopServicesDropdownMenu}
              >
                <div className={`header-dropdown-button flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base transition-colors ${
                  isServicesActive() ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}>
                  <span className="flex-1">Servicios</span>
                  <button
                    onClick={useActive.openOnMobileServicesDropdownMenu}
                    className="lg:hidden"
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
                    <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-2 py-3 md:py-3 lg:gap-y-4 lg:py-0">
                      <Link
                        to="/worksys"
                        className={`block py-2 lg:py-1 transition-colors ${
                          isActive('/worksys') ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className={`text-md font-semibold lg:text-base ${
                            isActive('/worksys') ? 'text-[#009CA6]' : 'text-black'
                          }`}>
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
                        className={`block py-2 lg:py-1 transition-colors ${
                          isActive('/expersys') ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className={`text-md font-semibold lg:text-base ${
                            isActive('/expersys') ? 'text-[#009CA6]' : 'text-black'
                          }`}>
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
                onMouseEnter={useActive.openOnDesktopClientesDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopClientesDropdownMenu}
              >
                <div className={`header-dropdown-button flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base transition-colors ${
                  isClientesActive() ? 'text-[#009CA6] font-semibold' : 'text-black hover:text-[#009CA6]'
                }`}>
                  <Link to="/clientes" className="flex-1">Clientes</Link>
                  <button
                    onClick={useActive.openOnMobileClientesDropdownMenu}
                    className="lg:hidden"
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
                    <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-2 py-3 md:py-3 lg:gap-y-4 lg:py-0">
                      <Link
                        to="/clientes/qhse"
                        className={`block py-2 lg:py-1 transition-colors ${
                          location.pathname === '/clientes/qhse' ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className={`text-md font-semibold lg:text-base ${
                            location.pathname === '/clientes/qhse' ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            QHSE
                          </p>
                          <p className="hidden text-sm md:block text-gray-600">
                            De 11 a 253 millones. Crecimiento 2,000% con ISO 9001
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/clientes/femsa"
                        className={`block py-2 lg:py-1 transition-colors ${
                          location.pathname === '/clientes/femsa' ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className={`text-md font-semibold lg:text-base ${
                            location.pathname === '/clientes/femsa' ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            FEMSA
                          </p>
                          <p className="hidden text-sm md:block text-gray-600">
                            714 proyectos sin accidentes en 225 unidades
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/clientes/ochoa"
                        className={`block py-2 lg:py-1 transition-colors ${
                          location.pathname === '/clientes/ochoa' ? 'text-[#009CA6]' : 'text-black hover:text-[#009CA6]'
                        }`}
                      >
                        <div className="flex flex-col items-start justify-center">
                          <p className={`text-md font-semibold lg:text-base ${
                            location.pathname === '/clientes/ochoa' ? 'text-[#009CA6]' : 'text-black'
                          }`}>
                            Productos de Maíz Ochoa
                          </p>
                          <p className="hidden text-sm md:block text-gray-600">
                            Del 56% al 95% de cumplimiento en calidad
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
            </nav>
            <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:ml-4 lg:flex-row lg:items-center">
              <Link to="/contacto">
                <button
                  className="contact-button-custom px-4 py-2 font-medium text-sm rounded-md transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95]"
                  style={{
                    backgroundColor: '#009CA6',
                    color: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 156, 166, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #009CA6 0%, #008A94 100%)',
                    position: 'relative',
                    zIndex: 1000,
                    minWidth: '80px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #008A94 0%, #007A82 100%)';
                    e.target.style.boxShadow = '0 6px 12px rgba(0, 156, 166, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15)';
                    e.target.style.transform = 'translateY(-1px) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #009CA6 0%, #008A94 100%)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 156, 166, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(1px) scale(0.95)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 156, 166, 0.2), inset 0 1px 2px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-1px) scale(1.05)';
                    e.target.style.boxShadow = '0 6px 12px rgba(0, 156, 166, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15)';
                  }}
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
  );
};

export default Header;