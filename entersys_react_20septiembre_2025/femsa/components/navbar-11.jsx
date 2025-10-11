"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

export function Navbar11() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClientesOpen, setIsClientesOpen] = useState(false);

  return (
    <nav className="flex w-full items-center border-b border-border-primary lg:min-h-18 lg:px-[5%]">
      <div className="mx-auto size-full lg:grid lg:grid-cols-[0.375fr_1fr_0.375fr] lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href="/">
            <img
              src="/entersys_isologotype_var2.png"
              alt="Entersys"
              className="h-8 md:h-10"
            />
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } px-[5%] lg:flex lg:items-center lg:justify-center lg:px-0`}
        >
          <div className="flex flex-col items-center lg:flex-row">
            <a
              href="/"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Inicio
            </a>
            <a
              href="/nosotros"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Nosotros
            </a>
            <div className="relative group">
              <button className="flex items-center gap-1 py-3 text-md lg:px-4 lg:py-2 lg:text-base">
                Servicios
                <RxChevronDown className="size-4" />
              </button>
            </div>
            <div className="relative group">
              <button
                className="flex items-center gap-1 py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                onMouseEnter={() => setIsClientesOpen(true)}
                onMouseLeave={() => setIsClientesOpen(false)}
              >
                Clientes
                <RxChevronDown className="size-4" />
              </button>
              {isClientesOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md border border-border-primary z-50"
                  onMouseEnter={() => setIsClientesOpen(true)}
                  onMouseLeave={() => setIsClientesOpen(false)}
                >
                  <a
                    href="/clientes"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Todos los clientes
                  </a>
                  <a
                    href="/clientes/qhse"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    QHSE
                  </a>
                  <a
                    href="/clientes/femsa"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    FEMSA
                  </a>
                  <a
                    href="/clientes/ochoa"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Productos de Maíz Ochoa
                  </a>
                </div>
              )}
            </div>
            <a
              href="/blog"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Blog
            </a>
            <a
              href="/contacto"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Contacto
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-4">
          <Button asChild>
            <a href="/contacto">Contacto</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
