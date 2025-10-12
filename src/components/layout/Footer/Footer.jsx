"use client";

import { Card } from "../../ui/Card";
import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { config } from "../../../config/environment";

const Footer = ({ colorScheme = 1, ...props }) => {
  return (
    <footer
      className={`color-scheme-${colorScheme}`}
      {...props}
    >
      <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20">
        <div className="container">
          <Card className="grid grid-cols-1 gap-x-[4vw] gap-y-12 p-8 md:gap-y-16 md:p-12 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4">
            <div>
              <div className="mb-6 md:mb-8">
                <a href="/">
                  <img
                    src="/entersys_logo.png"
                    alt="Entersys Logo"
                    className="inline-block h-8"
                  />
                </a>
              </div>
              <div className="mb-6 md:mb-8">
                <p className="mb-1 text-sm font-semibold">Dirección:</p>
                <p className="mb-5 text-sm md:mb-6">
                  Ciudad de México, México
                </p>
                <p className="mb-1 text-sm font-semibold">Contacto:</p>
                <a
                  href={`tel:${config.contact.phone}`}
                  className="block text-sm underline decoration-black underline-offset-1"
                >
                  {config.contact.phone}
                </a>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="block text-sm underline decoration-black underline-offset-1"
                >
                  {config.contact.email}
                </a>
              </div>
              <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
                <a
                  href={config.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <BiLogoFacebookCircle className="size-6" />
                </a>
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <BiLogoInstagram className="size-6" />
                </a>
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <BiLogoLinkedinSquare className="size-6" />
                </a>
                <a
                  href={config.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <BiLogoYoutube className="size-6" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-4">
              <ul>
                <li className="py-2 text-sm font-semibold">
                  <a href="/">Inicio</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="/worksys">Worksys</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="/expersys">Expersys</a>
                </li>
              </ul>
              <ul>
                <li className="py-2 text-sm font-semibold">
                  <a href="/nosotros">Nosotros</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="/clientes">Clientes</a>
                </li>
                <li className="py-2 text-sm font-semibold">
                  <a href="/contacto">Contacto</a>
                </li>
              </ul>
            </div>
          </Card>
          <div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
            <p className="mt-8 md:mt-0">© 2024 Entersys. Todos los derechos reservados.</p>
            <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
              <li className="underline">
                <a href="/politica-de-privacidad">Política de privacidad</a>
              </li>
              <li className="underline">
                <a href="/terminos-de-servicio">Términos de servicio</a>
              </li>
              <li className="underline">
                <a href="/configuracion-de-cookies">Configuración de cookies</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;