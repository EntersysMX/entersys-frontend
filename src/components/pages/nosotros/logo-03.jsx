

import React, { useRef } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

export function Logo03({ colorScheme = 3, ...props }) {
  const scrollContainerRef = useRef(null);

  const logos = [
    { src: "/imagenes/nosotros/logo_coca.webp", alt: "Coca-Cola", url: "https://www.femsa.com/es/" },
    { src: "/imagenes/nosotros/logo_ochoa_nosotros.webp", alt: "Productos de Maíz Ochoa", url: "https://www.productosochoa.com.mx/index.html" },
    { src: "/imagenes/nosotros/logo_chilando_nosotros.webp", alt: "Chilango Garage", url: "https://www.chilangogarage.mx/" },
    { src: "/imagenes/nosotros/logo_mlm_nosotros.webp", alt: "MLM", url: "https://mlmproductos.com/" },
    { src: "/imagenes/nosotros/logo_nd_nosotros.webp", alt: "ND", url: "https://www.ndinnl.com" },
    { src: "/imagenes/nosotros/logo_raxya_nosotros.webp", alt: "Raxya", url: "https://raxya.com.mx/" },
    { src: "/imagenes/nosotros/logo_rymmex_nosotros.webp", alt: "Rymmex", url: "https://www.rymmex.mx/" },
    { src: "/imagenes/nosotros/logo_saludvida_nosotros.webp", alt: "Salud Vida", url: "https://saludvida.com.mx/" }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="relume" className={`overflow-hidden py-12 md:py-16 lg:py-20 color-scheme-${colorScheme}`} {...props}>
      <div className="container mb-8 w-full max-w-lg px-[5%] md:mb-10 lg:mb-12">
        <h1 className="text-center text-base leading-[1.2] font-bold md:text-md md:leading-[1.2]">
          Empresas que confían en nuestra transformación
        </h1>
      </div>
      <style>{`
        .logo-scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
          padding: 20px 0;
          cursor: grab;
        }

        .logo-scroll-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .logo-scroll-container:active {
          cursor: grabbing;
        }

        /* Contenedor de logo con tamaño fijo para balance visual */
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 60px;
          flex-shrink: 0;
          margin: 0 28px;
        }

        @media (min-width: 768px) {
          .logo-container {
            width: 160px;
            height: 80px;
            margin: 0 40px;
          }
        }

        .logo-container img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s;
        }

        .nav-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .nav-button-left {
          left: 10px;
        }

        .nav-button-right {
          right: 10px;
        }

        @media (max-width: 768px) {
          .nav-button {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
      <div className="relative px-[5%]">
        <button
          className="nav-button nav-button-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <RxChevronLeft size={24} />
        </button>
        <div
          ref={scrollContainerRef}
          className="logo-scroll-container"
        >
          {logos.map((logo, index) => (
            <a
              key={`logo-${index}`}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70 logo-container"
            >
              <img
                src={logo.src}
                alt={logo.alt}
              />
            </a>
          ))}
        </div>
        <button
          className="nav-button nav-button-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <RxChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
