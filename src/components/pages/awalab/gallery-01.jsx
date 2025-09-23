

import React from "react";

export function Gallery01({ colorScheme = 1, ...props }) {
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Galería multimedia
          </h2>
          <p className="md:text-md">
            Descubre más sobre nuestra implementación en Grupo industrial Nexus
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-8">
          <a href="#" className="size-full">
            <div className="w-full overflow-hidden">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="aspect-video size-full rounded-image object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
