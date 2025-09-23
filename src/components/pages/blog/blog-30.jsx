"use client";

import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@relume_io/relume-ui";
import { Card } from "../../ui/Card";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronRight } from "react-icons/rx";

const useRelume = ({ defaultValue, selects }) => {
  const [activeSelect, setActiveSelect] = useState(defaultValue);
  const currentSelect = selects.find(function (select) {
    return select.value === activeSelect;
  });
  return { activeSelect, setActiveSelect, currentSelect };
};

export function Blog30({ colorScheme = 1, ...props }) {
  const useActive = useRelume({
    defaultValue: "all-posts",
    selects: [
      {
        value: "all-posts",
        trigger: "All Posts",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-one",
        trigger: "Category one",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-two",
        trigger: "Category two",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-three",
        trigger: "Category three",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-four",
        trigger: "Category four",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
    ],
  });
  return (
    <section id="relume" className={`px-[5%] py-16 md:py-24 lg:py-28 color-scheme-${colorScheme}`} {...props}>
      <div className="container flex max-w-lg flex-col">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Conocimiento que transforma
            </h1>
            <p className="md:text-md">
              Descubre ideas prácticas para optimizar tu operación empresarial
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="md:min-w- mb-10">
            <Select
              value={useActive.activeSelect}
              onValueChange={useActive.setActiveSelect}
            >
              <SelectTrigger className="min-w-[12.5rem] px-4 py-2 md:w-auto">
                Todos los posts
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-posts">Todos los posts</SelectItem>
                <SelectItem value="category-one">Procesos</SelectItem>
                <SelectItem value="category-two">Tecnología</SelectItem>
                <SelectItem value="category-three">Gestión</SelectItem>
                <SelectItem value="category-four">Innovación</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16">
                <Card className="flex flex-col">
                  <a
                    href="#"
                    className="inline-block w-full max-w-full overflow-hidden"
                  >
                    <div className="w-full overflow-hidden">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                        alt="Relume placeholder image"
                        className="aspect-video size-full object-cover"
                      />
                    </div>
                  </a>
                  <div className="px-5 py-6 md:px-6">
                    <div className="rb-4 mb-4 flex w-full items-center justify-start">
                      <Badge className="mr-4">Transformación</Badge>
                      <p className="inline text-sm font-semibold">
                        5 min de lectura
                      </p>
                    </div>
                    <a href="#" className="mb-2 block max-w-full">
                      <h5 className="text-2xl font-bold md:text-4xl">
                        Cómo digitalizar procesos sin morir en el intento
                      </h5>
                    </a>
                    <p>
                      Estrategias prácticas para convertir tareas manuales en
                      sistemas inteligentes
                    </p>
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="mt-6 flex items-center justify-center gap-x-2"
                    >
                      Leer más
                    </Button>
                  </div>
                </Card>
                <Card className="flex flex-col">
                  <a
                    href="#"
                    className="inline-block w-full max-w-full overflow-hidden"
                  >
                    <div className="w-full overflow-hidden">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                        alt="Relume placeholder image"
                        className="aspect-video size-full object-cover"
                      />
                    </div>
                  </a>
                  <div className="px-5 py-6 md:px-6">
                    <div className="rb-4 mb-4 flex w-full items-center justify-start">
                      <Badge className="mr-4">Procesos</Badge>
                      <p className="inline text-sm font-semibold">
                        5 min de lectura
                      </p>
                    </div>
                    <a href="#" className="mb-2 block max-w-full">
                      <h5 className="text-2xl font-bold md:text-4xl">
                        Inteligencia artificial en la gestión empresarial
                      </h5>
                    </a>
                    <p>
                      Descubre cómo la IA puede revolucionar tu modelo operativo
                    </p>
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="mt-6 flex items-center justify-center gap-x-2"
                    >
                      Leer más
                    </Button>
                  </div>
                </Card>
                <Card className="flex flex-col">
                  <a
                    href="#"
                    className="inline-block w-full max-w-full overflow-hidden"
                  >
                    <div className="w-full overflow-hidden">
                      <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                        alt="Relume placeholder image"
                        className="aspect-video size-full object-cover"
                      />
                    </div>
                  </a>
                  <div className="px-5 py-6 md:px-6">
                    <div className="rb-4 mb-4 flex w-full items-center justify-start">
                      <Badge className="mr-4">Tecnología</Badge>
                      <p className="inline text-sm font-semibold">
                        5 min de lectura
                      </p>
                    </div>
                    <a href="#" className="mb-2 block max-w-full">
                      <h5 className="text-2xl font-bold md:text-4xl">
                        Metodologías ágiles para equipos de alto rendimiento
                      </h5>
                    </a>
                    <p>
                      Claves para implementar cambios efectivos en tu
                      organización
                    </p>
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="mt-6 flex items-center justify-center gap-x-2"
                    >
                      Leer más
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
