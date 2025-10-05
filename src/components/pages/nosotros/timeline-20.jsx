

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React, { Fragment } from "react";
import { RxChevronRight } from "react-icons/rx";

export function Timeline20({ colorScheme = 4, ...props }) {
  return (
    <section
      id="relume"
      className={`overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`}
      {...props}
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
              operaciones empresariales. Cada paso es un líder de negocio más que se 'jubila' de la operación para
              expandir sus horizontes.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Conocer">
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
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2019</h3>
                <p>
                  Fundamos Consultoría en Gestión de Negocios.
                </p>
              </div>
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="order-last mb-8 flex flex-col items-start md:order-none md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2020</h3>
                <p>
                  Nos convertimos en Partners en México de Smartsheets.
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
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2021-2022</h3>
                <p>
                  Implementación: Módulos de Control de Calidad en Alimentos y
                  Sistema de gestión de calidad en empresa de Suplementos
                </p>
              </div>
            </Fragment>
          </div>
          <div className="relative grid auto-cols-fr grid-cols-[max-content_1fr] gap-4 md:grid-cols-1 md:grid-rows-[1fr_max-content_1fr]">
            <Fragment>
              <div className="order-last mb-8 flex flex-col items-start md:order-none md:mr-4 md:mb-0">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2023</h3>
                <p>
                  Incorporación Auditor Líder Internacional Lean Six Sigma Green Belt, Sistema de Gestión Integral: ISO9001:2015, ISO14001:2015, ISO45001:2018, CER2022-01/FPMX/18895 APPLUS
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
                <h3 className="mb-2 text-xl font-bold md:text-2xl">2024</h3>
                <p>
                  Alcanzamos una comunidad que asciende a los 500 usuarios.
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
