"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";

export function RelatedPosts() {
  const relatedPosts = [
    {
      url: "/blog-entrada",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
        alt: "Artículo relacionado 1",
      },
      category: "Tecnología",
      readTime: "5 min lectura",
      title: "Optimización de procesos con Worksys",
      description:
        "Descubre cómo la digitalización de procesos puede transformar la eficiencia operativa de tu empresa.",
    },
    {
      url: "/blog-entrada",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
        alt: "Artículo relacionado 2",
      },
      category: "Gestión",
      readTime: "7 min lectura",
      title: "Implementación de ISO 9001 paso a paso",
      description:
        "Una guía completa para implementar sistemas de gestión de calidad en tu organización.",
    },
    {
      url: "/blog-entrada",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
        alt: "Artículo relacionado 3",
      },
      category: "Innovación",
      readTime: "6 min lectura",
      title: "Automatización inteligente de procesos",
      description:
        "Cómo la inteligencia artificial está revolucionando la gestión de procesos empresariales.",
    },
  ];

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Artículos relacionados
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post, index) => (
            <div key={index} className="flex flex-col">
              <Link to={post.url} className="mb-6">
                <div className="w-full overflow-hidden rounded-lg">
                  <img
                    src={post.image.src}
                    alt={post.image.alt}
                    className="aspect-[3/2] size-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="mb-4 flex items-center gap-4">
                <Badge>{post.category}</Badge>
                <p className="text-sm font-semibold">{post.readTime}</p>
              </div>
              <Link to={post.url} className="mb-4">
                <h3 className="text-2xl font-bold transition-colors hover:text-[#009CA6] md:text-3xl lg:text-4xl">
                  {post.title}
                </h3>
              </Link>
              <p className="mb-6 text-base md:text-lg">{post.description}</p>
              <div className="mt-auto">
                <Button
                  variant="link"
                  size="link"
                  className="flex items-center gap-2 p-0 text-base font-semibold text-[#009CA6] hover:text-[#093D53]"
                  asChild
                >
                  <Link to={post.url}>
                    Leer más
                    <RxChevronRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
