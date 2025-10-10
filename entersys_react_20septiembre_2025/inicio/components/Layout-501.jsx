"use client";

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt: string;
};

type Feature = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

type Tab = {
  value: string;
  trigger: string;
  content: Feature[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  defaultTabValue: string;
  tabs: Tab[];
};

export type Layout501Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout501 = (props: Layout501Props) => {
  const { tagline, heading, description, buttons, defaultTabValue, tabs } = {
    ...Layout501Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 md:w-auto lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
          <p className="md:text-md">{description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
        </div>
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-12 items-center gap-6 md:mb-16 md:justify-center">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
              >
                {tab.trigger}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="data-[state=active]:animate-tabs">
              {tab.content.map((feature, featureIndex) => (
                <Feature key={featureIndex} {...feature} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const Feature = (feature: Feature) => {
  return (
    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
      <div>
        <p className="mb-3 font-semibold md:mb-4">{feature.tagline}</p>
        <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
          {feature.heading}
        </h2>
        <p>{feature.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
          {feature.buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <img src={feature.image.src} className="w-full object-cover" alt={feature.image.alt} />
      </div>
    </div>
  );
};

export const Layout501Defaults: Props = {
  tagline: "Tecnologías",
  heading: "Herramientas que Entersyzan la transformación de tus operaciones",
  description:
    "Combinamos las mejores tecnologías para digitalizar tu operación. Smartsheet, IA y soluciones code y no-code. Nos adaptamos a tu ecosistema digital para hacerlo posible.",
  buttons: [],
  defaultTabValue: "smartsheet",
  tabs: [
    {
      value: "smartsheet",
      trigger: "Smartsheet",
      content: [
        {
          tagline: "Smartsheet",
          heading: "Plataforma líder en gestión de proyectos",
          description:
            "Mejoramos tu operación con Smartsheet, una plataforma que conocemos bien. Se destaca por ser flexible, permitiendo crear portales digitales y reportes sin límites. Está diseñada para adaptarse a las necesidades de tu negocio y hacer cada proceso más eficiente.",
          buttons: [{ title: "Solicitar una demo", variant: "secondary" }],
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
            alt: "Smartsheet demo",
          },
        },
      ],
    },
    {
      value: "nocode",
      trigger: "No Code",
      content: [
        {
          tagline: "No Code",
          heading: "Aplicaciones sin programación",
          description:
            "Desarrollamos soluciones personalizadas y adaptadas a las necesidades específicas de nuestros clientes, especialmente aquellos sin un equipo de TI en su empresa, ya que la adopción de opciones no-code facilita su implementación y uso en el día a día de las operaciones empresariales.",
          buttons: [{ title: "Conocer Smartsheets", variant: "secondary" }],
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
            alt: "Aplicaciones No Code",
          },
        },
      ],
    },
    {
      value: "ia",
      trigger: "IA",
      content: [
        {
          tagline: "IA",
          heading: "Automatización: la siguiente frontera",
          description:
            "Implementamos soluciones para automatizar tareas con agentes de IA y LLM para múltiples propósitos, así como el procesamiento de datos utilizando modelos entrenados, optimizando la eficiencia y mejorando la productividad en diversos sectores.",
          buttons: [{ title: "Más información", variant: "secondary" }],
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
            alt: "Inteligencia Artificial",
          },
        },
      ],
    },
  ],
};