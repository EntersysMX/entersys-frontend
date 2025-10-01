

import { Button } from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout141({ colorScheme = 2, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto flex max-w-lg flex-col items-center text-center">
              <p className="mb-3 font-semibold md:mb-4">Origen</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Nuestra historia de innovación y transformación
              </h2>
              <p className="mb-5 md:mb-6 md:text-md">
                Fundamos Entersys con la convicción de que cada empresa puede
                automatizar su operación, consolidando metodologías de gestión
                eficientes y con tecnología de vanguardia. Se 'afinan' para
                funcionar como un reloj suizo.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
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
        </div>
        <div>
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
            className="size-full rounded-image object-cover"
            alt="Relume placeholder image"
          />
        </div>
      </div>
    </section>
  );
}
