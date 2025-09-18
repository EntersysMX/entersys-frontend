

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import React from "react";

export function ExpersysLayout406() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Proceso</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Cómo implementamos tu sistema de gestión
          </h2>
          <p className="md:text-md">
            Desarrollamos una metodología personalizada que se adapta a las
            necesidades específicas de cada organización.
          </p>
        </div>
        <Tabs defaultValue="tab-one">
          <TabsList className="mb-12 flex-col md:mb-16 md:flex-row">
            <TabsTrigger
              value="tab-one"
              className="flex w-full flex-col gap-1 border-0 border-b-[1.5px] border-border-alternative px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
            >
              <h3 className="text-md leading-[1.4] font-bold md:text-xl">
                Diagnóstico inicial
              </h3>
              <p>
                Analizamos tu operación actual para identificar áreas de mejora
                y oportunidades de optimización.
              </p>
            </TabsTrigger>
            <TabsTrigger
              value="tab-two"
              className="flex w-full flex-col gap-1 border-0 border-b-[1.5px] border-border-alternative px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
            >
              <h3 className="text-md leading-[1.4] font-bold md:text-xl">
                Diagnóstico inicial
              </h3>
              <p>
                Analizamos tu operación actual para identificar áreas de mejora
                y oportunidades de optimización.
              </p>
            </TabsTrigger>
            <TabsTrigger
              value="tab-three"
              className="flex w-full flex-col gap-1 border-0 border-b-[1.5px] border-border-alternative px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
            >
              <h3 className="text-md leading-[1.4] font-bold md:text-xl">
                Diagnóstico inicial
              </h3>
              <p>
                Analizamos tu operación actual para identificar áreas de mejora
                y oportunidades de optimización.
              </p>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="tab-one"
            className="data-[state=active]:animate-tabs"
          >
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="size-full rounded-image object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
          </TabsContent>
          <TabsContent
            value="tab-two"
            className="data-[state=active]:animate-tabs"
          >
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="size-full rounded-image object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
          </TabsContent>
          <TabsContent
            value="tab-three"
            className="data-[state=active]:animate-tabs"
          >
            <div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                className="size-full rounded-image object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
