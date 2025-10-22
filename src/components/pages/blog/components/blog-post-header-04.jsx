"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";

export function BlogPostHeader4() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid gap-x-20 gap-y-12 md:grid-cols-[.5fr_1fr]">
          <div className="mx-auto flex size-full max-w-lg flex-col items-start justify-start">
            <div className="flex flex-col items-start justify-start">
              <div className="mb-5 flex w-full items-center justify-start md:mb-6">
                <Badge className="mr-4">Tecnología</Badge>
                <p className="text-small inline font-semibold">
                  Lectura de 5 min
                </p>
              </div>
              <h1 className="heading-h2 font-bold">
                Transformación digital de procesos operativos
              </h1>
              <div className="mt-6 flex size-full flex-col items-start md:mt-8">
                <div className="flex items-center sm:mb-8 md:mb-0">
                  <div className="mr-8 md:mr-10 lg:mr-12">
                    <p className="text-small">Publicado el 15 mar 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full overflow-hidden">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="aspect-[3/2] size-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
