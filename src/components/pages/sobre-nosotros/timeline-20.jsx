

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React, { Fragment } from "react";
import { RxChevronRight } from "react-icons/rx";

export function Timeline20() {
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 scheme-4"
    >
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Trayectoria</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Nuestros principales logros y momentos destacados
            </h2>
            <p className="md:text-md">
              Cada hito representa un paso más en nuestra misión de transformar
              operaciones empresariales.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Conocer" variant="secondary">
                Conocer
              </Button>
              <Button
                title="Explorar"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Explorar
              </Button>
            </div>
          </div>
        </div>
        <div className="relative grid auto-cols-fr grid-flow-row grid-cols-1 items-center justify-center md:grid-flow-col md:grid-cols-[max-content_1fr] md:justify-normal">
          <div className="relative hidden md:grid md:grid-cols-1 md:gap-4">
            <div className="flex flex-col items-center md:w-full md:flex-row">
              <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
            </div>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="mb-8 flex flex-col items-start md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2018</h3>
                <p>
                  Fundación de Entersys con el objetivo de revolucionar la
                  consultoría tecnológica para empresas.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="order-last mb-8 flex flex-col items-start md:order-none md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2020</h3>
                <p>
                  Desarrollo de la metodología Worksys, que integra
                  digitalización inteligente con herramientas no-code.
                </p>
              </div>
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="hidden md:block" />
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="mb-8 flex flex-col items-start md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2021</h3>
                <p>
                  Implementación de primera solución de IA para optimización de
                  procesos en empresas medianas.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="order-last mb-8 flex flex-col items-start md:order-none md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2022</h3>
                <p>
                  Expansión nacional con más de 50 clientes y reconocimiento
                  como consultora líder en transformación digital.
                </p>
              </div>
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full" />
              </div>
              <div className="hidden md:block" />
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="hidden md:block" />
              <div className="flex flex-col items-center md:w-full md:flex-row">
                <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-black shadow-[0_0_0_8px_white]" />
                <div className="h-full w-[3px] bg-black md:h-[3px] md:w-full hidden md:block" />
              </div>
              <div className="mb-8 flex flex-col items-start md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2023</h3>
                <p>
                  Lanzamiento de plataforma Expersys para gestión integral de
                  certificaciones y cumplimiento normativo.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="absolute right-0 z-0 h-1 w-16 bg-gradient-to-r from-transparent to-white" />
        </div>
      </div>
    </section>
  );
}
