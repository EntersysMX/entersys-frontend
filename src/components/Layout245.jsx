"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { applyColorScheme } from '../design-tokens';

export function Layout245() {
  return (
    <section id="relume" className="propuesta-section">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-between gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
            <div>
              <p className="mb-3 font-semibold md:mb-4" style={{color: 'var(--primary-lightest)'}}>Propuesta de valor</p>
              <h2 className="propuesta-title text-5xl font-bold md:text-7xl lg:text-8xl" style={{color: 'var(--neutral-white)'}}>
                Prueba hoy, comprométete después
              </h2>
            </div>
            <div>
              <p className="propuesta-text md:text-md" style={{color: 'var(--primary-lightest)'}}>
                En Entersys, te ofrecemos la oportunidad de probar nuestras
                soluciones antes de comprometerte. Nuestro modelo comercial de
                'Try and Buy' te permite experimentar los beneficios de la
                digitalización de procesos sin riesgo. Además, garantizamos que
                cumplas con todas las normativas necesarias desde el primer día.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo"
                  className="size-12 brightness-0 invert"
                />
              </div>
              <h3 className="mb-5 text-xl font-bold md:mb-6" style={{color: 'var(--neutral-white)'}}>
                Resultados visibles en semanas, no en meses
              </h3>
              <p style={{color: 'var(--neutral-white)'}}>Comienza a ver cambios significativos rápidamente.</p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo"
                  className="size-12 brightness-0 invert"
                />
              </div>
              <h3 className="mb-5 text-xl font-bold md:mb-6" style={{color: 'var(--neutral-white)'}}>
                Soporte personalizado durante todo el proceso
              </h3>
              <p style={{color: 'var(--neutral-white)'}}>Nuestro equipo está contigo en cada paso.</p>
            </div>
            <div>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo"
                  className="size-12 brightness-0 invert"
                />
              </div>
              <h3 className="mb-5 text-xl font-bold md:mb-6" style={{color: 'var(--neutral-white)'}}>
                Equipo funcional que comprende tus operaciones
              </h3>
              <p style={{color: 'var(--neutral-white)'}}>Sabemos lo que hacemos y podemos comprobarlo.</p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
            <Button className="btn-white" variant="secondary">Solicitar</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link" style={{color: 'var(--neutral-white)'}}>
              Ver clientes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
