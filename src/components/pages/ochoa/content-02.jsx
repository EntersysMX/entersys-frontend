"use client";

import React from "react";

export function Content2() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 color-scheme-2">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <img
              src="/images/ochoa/case_image_ochoa.webp"
              alt="Solución Productos de Maíz Ochoa"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="heading-h2 mb-5 font-bold md:mb-6">
              Digitalizar lo que ya hacían bien y hacerlo visible
            </h2>
            <p className="text-medium mb-6">
              Implementamos Worksys para transformar los análisis de calidad manuales en formularios digitales accesibles desde cualquier dispositivo, y Expersys para estructurar la cultura de revisión diaria de resultados mediante Daily Management.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="heading-h6 mb-2 font-bold">
                  Qué implementamos:
                </h3>
                <p className="text-base">
                  Digitalizamos los formatos de análisis de calidad existentes y creamos 120 formatos adicionales personalizados por tipo de producto, todos accesibles desde dispositivos móviles. Los operadores cargan los datos directamente en la nube, eliminando el papel y permitiendo cálculos automáticos de cumplimiento sin intervención manual.
                </p>
              </div>
              <div>
                <p className="text-base">
                  Creamos tableros operativos donde se visualiza en tiempo real el porcentaje de cumplimiento de estándares, la productividad de cada línea, los casos fuera de rango, y el estatus comparativo de ayer, hoy y tendencias. Los gerentes pueden ver en menos de 3 segundos si están ganando o perdiendo en calidad sin buscar entre carpetas ni hacer cálculos.
                </p>
              </div>
              <div>
                <p className="text-base">
                  Implementamos Daily Management mediante Expersys para generar la cultura de revisión diaria de resultados. Esto convirtió los dashboards en herramientas de decisión operativa diaria, no solo en reportes estáticos. Además, generamos controles para mantenimientos con tiempo récord de respuesta: no más de 15 minutos de tolerancia para atender una parada de línea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
