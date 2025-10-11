"use client";

import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export function Footer11() {
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          <div>
            <div className="mb-6 md:mb-8">
              <img
                src="/entersys_isologotype_var2.png"
                alt="Entersys"
                className="h-10"
              />
            </div>
            <div className="mb-6 md:mb-8">
              <p className="mb-2 font-semibold">Dirección:</p>
              <p>Nivel 1, 12 Sample St, Sydney NSW 2000</p>
            </div>
            <div>
              <p className="mb-2 font-semibold">Contacto:</p>
              <p className="mb-1">1800 123 4567</p>
              <p>
                <a href="mailto:email@example.com" className="underline">
                  email@example.com
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
            <div>
              <h3 className="mb-3 font-semibold md:mb-4">Inicio</h3>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <a href="/" className="underline-offset-1">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="/worksys" className="underline-offset-1">
                    Worksys
                  </a>
                </li>
                <li>
                  <a href="/expersys" className="underline-offset-1">
                    Expersys
                  </a>
                </li>
                <li>
                  <a href="/nosotros" className="underline-offset-1">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="/clientes" className="underline-offset-1">
                    Clientes
                  </a>
                </li>
                <li>
                  <a href="/blog" className="underline-offset-1">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contacto" className="underline-offset-1">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-border-primary"></div>
        <div className="flex flex-col-reverse items-start justify-between pt-6 text-sm md:flex-row md:items-center md:pt-8">
          <p className="mt-6 md:mt-0">
            © 2024 Entersys. Todos los derechos reservados.
          </p>
          <ul className="grid grid-flow-row grid-cols-[max-content] items-start justify-center justify-items-center gap-x-0 gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <a href="#">Política de privacidad</a>
            </li>
            <li className="underline">
              <a href="#">Términos de servicio</a>
            </li>
            <li className="underline">
              <a href="#">Configuración de cookies</a>
            </li>
          </ul>
        </div>
        <div className="mt-6 flex gap-3 md:mt-8">
          <a href="#" aria-label="Facebook">
            <BiLogoFacebookCircle className="size-6" />
          </a>
          <a href="#" aria-label="Instagram">
            <BiLogoInstagram className="size-6" />
          </a>
          <a href="#" aria-label="X (Twitter)">
            <FaXTwitter className="size-6 p-0.5" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <BiLogoLinkedinSquare className="size-6" />
          </a>
          <a href="#" aria-label="YouTube">
            <BiLogoYoutube className="size-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
