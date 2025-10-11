

import React from "react";

export function Logo03({ colorScheme = 3, ...props }) {
  const logos = [
    { src: "/imagenes/nosotros/logo_femsa_nosotros.webp", alt: "FEMSA", url: "https://www.femsa.com" },
    { src: "/imagenes/nosotros/logo_ochoa_nosotros.webp", alt: "Productos de Maíz Ochoa", url: "https://www.productosochoa.com" },
    { src: "/imagenes/nosotros/logo_chilando_nosotros.webp", alt: "Chilango Garage", url: "https://chilangogarage.com" },
    { src: "/imagenes/nosotros/logo_mlm_nosotros.webp", alt: "MLM", url: "https://www.mlm.com.mx" },
    { src: "/imagenes/nosotros/logo_nd_nosotros.webp", alt: "ND", url: "https://www.ndinnl.com" },
    { src: "/imagenes/nosotros/logo_raxya_nosotros.webp", alt: "Raxya", url: "https://www.raxya.com" },
    { src: "/imagenes/nosotros/logo_rymmex_nosotros.webp", alt: "Rymmex", url: "https://www.rymmex.com" },
    { src: "/imagenes/nosotros/logo_saludvida_nosotros.webp", alt: "Salud Vida", url: "https://www.amazon.com.mx/Salud-Vida-MX-Suplemento-Absorción/dp/B089RV6Z7F" }
  ];
  return (
    <section id="relume" className={`overflow-hidden py-12 md:py-16 lg:py-20 color-scheme-${colorScheme}`} {...props}>
      <div className="container mb-8 w-full max-w-lg px-[5%] md:mb-10 lg:mb-12">
        <h1 className="text-center text-base leading-[1.2] font-bold md:text-md md:leading-[1.2]">
          Empresas que confían en nuestra transformación
        </h1>
      </div>
      <style>{`
        .animate-loop-horizontally {
          animation-duration: 80s !important;
        }

        @media (max-width: 768px) {
          .animate-loop-horizontally {
            animation-duration: 100s !important;
          }
        }

        /* Contenedor de logo con tamaño fijo para balance visual */
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 60px;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .logo-container {
            width: 160px;
            height: 80px;
          }
        }

        .logo-container img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
      `}</style>
      <div className="flex items-center pt-7 md:pt-0">
        <div className="flex shrink-0 animate-loop-horizontally items-center">
          {logos.map((logo, index) => (
            <a
              key={`logo-1-${index}`}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-7 md:mx-10 transition-opacity hover:opacity-70 logo-container"
            >
              <img
                src={logo.src}
                alt={logo.alt}
              />
            </a>
          ))}
        </div>
        <div className="flex shrink-0 animate-loop-horizontally items-center">
          {logos.map((logo, index) => (
            <a
              key={`logo-2-${index}`}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-7 md:mx-10 transition-opacity hover:opacity-70 logo-container"
            >
              <img
                src={logo.src}
                alt={logo.alt}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
