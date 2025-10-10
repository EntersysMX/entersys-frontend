"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { VideoIframe } from "@/components/ui/video-iframe";
import React from "react";
import { FaCirclePlay } from "react-icons/fa6";

export function Header41() {
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 overflow-x-auto pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0">
      <div className="order-last lg:order-first">
        <div className="w-full object-cover lg:h-screen lg:max-h-[60rem]">
          <Dialog>
            <DialogTrigger className="relative flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail.svg"
                alt="Relume placeholder image"
                className="size-full object-cover"
              />
              <span className="absolute inset-0 z-10 bg-neutral-darkest/50" />
              <FaCirclePlay className="absolute z-20 size-16 text-white" />
            </DialogTrigger>
            <DialogContent>
              <VideoIframe video="https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-[5vw] lg:ml-20 lg:justify-self-start">
        <h1 className="heading-h1 mb-5 font-bold md:mb-6">
          De 11 a 253 millones en 6 años: cómo construir una operación escalable
          desde cero
        </h1>
        <p className="text-medium">
          Implementación de Worksys y Expersys para automatización de procesos
          operativos y certificación ISO 9001 en empresa de logística
          especializada. Crecimiento del 2,000% con estandarización y
          digitalización en Smartsheets.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-4 md:mt-8">
          <Button title="Entersyzar empresa">Entersyzar empresa</Button>
        </div>
      </div>
    </section>
  );
}
