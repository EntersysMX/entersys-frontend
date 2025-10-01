"use client";

import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

export function Faq05({ colorScheme = 1, ...props }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Qué servicios ofrecen?",
      answer:
        "Ofrecemos servicios de digitalización de procesos, implementación de sistemas de gestión y consultoría estratégica para empresas de diversos sectores.",
    },
    {
      question: "¿Cuánto tiempo toma una implementación?",
      answer:
        "Nuestro objetivo es entregar resultados visibles en semanas, no en meses, con soluciones personalizadas.",
    },
    {
      question: "¿Trabajan con empresas de todos los tamaños?",
      answer:
        "Sí, nuestras soluciones están diseñadas para adaptarse a organizaciones pequeñas, medianas y grandes.",
    },
    {
      question: "¿Qué tecnologías utilizan?",
      answer:
        "Trabajamos con herramientas no-code, inteligencia artificial y plataformas como Smartsheet para optimizar procesos.",
    },
    {
      question: "¿Cómo comenzar?",
      answer:
        "Puedes agendar una consulta gratuita para evaluar las necesidades específicas de tu empresa.",
    },
  ];

  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Preguntas
          </h2>
          <p className="md:text-md">
            Resolvemos tus dudas sobre nuestros servicios de consultoría y transformación digital
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border-primary">
              <button
                className="flex w-full items-start justify-between py-5 text-left md:py-6"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-md font-bold md:text-xl">{faq.question}</span>
                <span className="ml-6 flex-none">
                  {openIndex === index ? (
                    <BiMinus className="size-7 md:size-8" />
                  ) : (
                    <BiPlus className="size-7 md:size-8" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-5 md:pb-6">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center md:mt-18 lg:mt-20">
          <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
            ¿Necesitas más información?
          </h3>
          <p className="md:text-md">
            Estamos listos para ayudarte a transformar tu operación
          </p>
        </div>
      </div>
    </section>
  );
}
