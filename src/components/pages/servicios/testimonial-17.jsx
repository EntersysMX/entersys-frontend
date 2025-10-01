"use client";

import React, { useState } from "react";
import { MdStar } from "react-icons/md";

export function Testimonial17({ colorScheme = 3, ...props }) {
  const testimonials = [
    {
      quote:
        "Entersys nos ayudó a digitalizar completamente nuestros procesos en solo 4 semanas.",
      avatar: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      name: "María Rodríguez",
      position: "Directora, Grupo Empresarial Innovación",
      rating: 5,
    },
    {
      quote:
        "La implementación de sus sistemas nos permitió reducir costos operativos significativamente.",
      avatar: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      name: "Carlos Martínez",
      position: "Gerente, Soluciones Tecnológicas SA",
      rating: 5,
    },
    {
      quote:
        "Un acompañamiento profesional que realmente entiende las necesidades de las empresas.",
      avatar: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      name: "Laura Sánchez",
      position: "Líder de Operaciones, Estrategia Global",
      rating: 5,
    },
  ];

  return (
    <section
      id="relume"
      className={`overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`}
      {...props}
    >
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="md:text-md">Experiencias reales de transformación empresarial</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-5 flex text-primary md:mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <MdStar key={i} className="size-6" />
                ))}
              </div>
              <blockquote className="mb-5 text-md font-bold leading-[1.4] md:mb-6 md:text-xl">
                {testimonial.quote}
              </blockquote>
              <div className="mt-auto flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
