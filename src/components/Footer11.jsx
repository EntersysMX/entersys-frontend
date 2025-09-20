"use client";

import { Card } from "./Card";
import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { applyColorScheme } from '../design-tokens';

export function Footer11() {
  return (
    <footer id="relume" className="footer-section">
      <div className="container">
        <Card className="grid grid-cols-1 gap-x-[4vw] gap-y-12 p-8 md:gap-y-16 md:p-12 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4" style={{backgroundColor: 'var(--neutral-darkest)', borderColor: 'var(--neutral-dark)'}}>
          <div>
            <div className="mb-6 md:mb-8">
              <a href="#">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                  alt="Logo image"
                  className="inline-block"
                />
              </a>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="mb-1 text-sm font-semibold" style={{color: 'var(--neutral-lighter)'}}>Dirección:</p>
              <p className="mb-5 text-sm md:mb-6" style={{color: 'var(--neutral-light)'}}>
                Nivel 1, 12 Sample St, Sydney NSW 2000
              </p>
              <p className="mb-1 text-sm font-semibold" style={{color: 'var(--neutral-lighter)'}}>Contacto:</p>
              <a
                href="tel:1800 123 4567"
                className="block text-sm underline underline-offset-1 transition-colors" style={{color: 'var(--primary)', textDecorationColor: 'var(--primary)'}}
              >
                1800 123 4567
              </a>
              <a
                href="mailto:info@relume.io"
                className="block text-sm underline underline-offset-1 transition-colors" style={{color: 'var(--primary)', textDecorationColor: 'var(--primary)'}}
              >
                info@relume.io
              </a>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
              <a href="#">
                <BiLogoFacebookCircle className="size-6" />
              </a>
              <a href="#">
                <BiLogoInstagram className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <BiLogoYoutube className="size-6" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-4">
            <ul>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links">Inicio</a>
              </li>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Servicios</a>
              </li>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Worksys</a>
              </li>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Expersys</a>
              </li>
            </ul>
            <ul>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Nosotros</a>
              </li>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Clientes</a>
              </li>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Blog</a>
              </li>
              <li className="py-2 text-sm font-semibold">
                <a href="#" className="footer-links transition-colors">Contacto</a>
              </li>
            </ul>
          </div>
        </Card>
        <div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 md:flex-row md:items-center md:pt-8 md:pb-0">
          <p className="mt-8 text-sm md:mt-0" style={{color: 'var(--neutral)'}}>© 2024 Relume. All rights reserved.</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="text-sm underline">
              <a href="#" className="footer-links transition-colors">Política de privacidad</a>
            </li>
            <li className="text-sm underline">
              <a href="#" className="footer-links transition-colors">Términos de servicio</a>
            </li>
            <li className="text-sm underline">
              <a href="#" className="footer-links transition-colors">Configuración de cookies</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
