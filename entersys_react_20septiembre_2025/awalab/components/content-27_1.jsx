"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";

const useHash = (initialLinks) => {
  const [currentHash, setCurrentHash] = useState(
    window.location.hash || initialLinks[0]?.href,
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const isActiveLink = (href) => {
    if (!href) return false;

    const hrefWithoutHash = href.replace(/^#/, "");
    const currentHashWithoutHash = currentHash.replace(/^#/, "");

    return hrefWithoutHash === currentHashWithoutHash;
  };

  const getLinkClassNames = (href) => {
    return clsx("block px-4 py-3 text-medium", {
      "border border-scheme-border bg-scheme-foreground font-semibold":
        isActiveLink(href),
    });
  };

  const getLinkStyle = (index) => {
    return {
      marginLeft: index === 0 ? 0 : `${Math.min(index * 16, 80)}px`,
    };
  };

  return {
    currentHash,
    isActiveLink,
    getLinkClassNames,
    getLinkStyle,
  };
};

export function Content27_1() {
  const hashState = useHash([
    { title: "Heading 2", href: "#heading-2" },
    { title: "Heading 3", href: "#heading-3" },
    { title: "Heading 4", href: "#heading-4" },
    { title: "Heading 5", href: "#heading-5" },
    { title: "Heading 6", href: "#heading-6" },
  ]);
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[20rem_1fr] lg:gap-x-16 xxl:gap-x-48">
          <div>
            <div className="lg:sticky lg:top-24">
              <Accordion
                type="single"
                defaultValue="aside-menu"
                className="lg:block"
                collapsible={true}
              >
                <AccordionItem value="aside-menu" className="border-none">
                  <AccordionTrigger className="flex cursor-pointer items-center justify-between gap-3 border border-scheme-border px-4 py-3 lg:pointer-events-none lg:cursor-auto lg:border-none lg:p-0 [&_svg]:size-4 [&_svg]:lg:hidden">
                    <h3 className="heading-h5 leading-[1.4] font-bold">
                      Desarrollo
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="mt-3 md:mt-4">
                      <a
                        href="#heading-2"
                        className={hashState.getLinkClassNames("#heading-2")}
                        style={hashState.getLinkStyle(0)}
                      >
                        Heading 2
                      </a>
                      <a
                        href="#heading-3"
                        className={hashState.getLinkClassNames("#heading-3")}
                        style={hashState.getLinkStyle(1)}
                      >
                        Heading 3
                      </a>
                      <a
                        href="#heading-4"
                        className={hashState.getLinkClassNames("#heading-4")}
                        style={hashState.getLinkStyle(2)}
                      >
                        Heading 4
                      </a>
                      <a
                        href="#heading-5"
                        className={hashState.getLinkClassNames("#heading-5")}
                        style={hashState.getLinkStyle(3)}
                      >
                        Heading 5
                      </a>
                      <a
                        href="#heading-6"
                        className={hashState.getLinkClassNames("#heading-6")}
                        style={hashState.getLinkStyle(4)}
                      >
                        Heading 6
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="max-w-lg">
            <div className="prose-figcaption:border-l-border prose-base prose-headings:font-bold prose-h2:mt-6 prose-h2:mb-4 prose-h2:text-[2.25rem] prose-h2:md:text-[2.75rem] prose-h2:lg:text-[3rem] prose-h3:my-6 prose-h3:text-[2rem] prose-h3:md:text-[2.25rem] prose-h3:lg:text-[2.5rem] prose-h4:mt-6 prose-h4:mb-5 prose-h4:text-[1.5rem] prose-h4:md:text-[1.75rem] prose-h4:md:leading-[1.3] prose-h4:lg:text-[2rem] prose-h4:lg:leading-[1.3] prose-h5:mt-5 prose-h5:mb-4 prose-h5:text-[1.25rem] prose-h5:leading-[1.4] prose-h5:md:text-[1.5rem] prose-h6:mt-5 prose-h6:mb-4 prose-h6:text-[1.125rem] prose-h6:leading-[1.4] md:prose-h6:text-[1.25rem] prose-p:m-0 prose-p:mb-4 prose-p:leading-[1.5] prose-blockquote:my-6 prose-blockquote:border-l-[.1875rem] prose-blockquote:border-l-scheme-border prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-[1.25rem] prose-blockquote:italic prose-figure:my-10 prose-figure:md:my-12 prose-figcaption:mt-2 prose-figcaption:border-l-2 prose-figcaption:pl-2 prose-figcaption:text-[0.875rem] prose-figcaption:opacity-80 prose-strong:font-bold">
              <Fragment>
                <h2 id="heading-2">Heading 2</h2>
                <p>
                  <strong>
                    Dolor enim eu tortor urna sed duis nulla. Aliquam
                    vestibulum, nulla odio nisl vitae. In aliquet pellentesque
                    aenean hac vestibulum turpis mi bibendum diam. Tempor
                    integer aliquam in vitae malesuada fringilla.
                  </strong>
                </p>
                <p>
                  Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                  suspendisse morbi eleifend faucibus eget vestibulum felis.
                  Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                  Mauris posuere vulputate arcu amet, vitae nisi, tellus
                  tincidunt. At feugiat sapien varius id.
                </p>
                <h3 id="heading-3">Heading 3</h3>
                <p>
                  Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                  volutpat mollis at volutpat lectus velit, sed auctor.
                  Porttitor fames arcu quis fusce augue enim. Quis at habitant
                  diam at. Suscipit tristique risus, at donec. In turpis vel et
                  quam imperdiet. Ipsum molestie aliquet sodales id est ac
                  volutpat.
                </p>
                <p>
                  Tristique odio senectus nam posuere ornare leo metus,
                  ultricies. Blandit duis ultricies vulputate morbi feugiat cras
                  placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis
                  pellentesque suscipit accumsan. Cursus viverra aenean magna
                  risus elementum faucibus molestie pellentesque. Arcu ultricies
                  sed mauris vestibulum.
                </p>
                <h4 id="heading-4">Heading 4</h4>
                <p>
                  Morbi sed imperdiet in ipsum, adipiscing elit dui lectus.
                  Tellus id scelerisque est ultricies ultricies. Duis est sit
                  sed leo nisl, blandit elit sagittis. Quisque tristique
                  consequat quam sed. Nisl at scelerisque amet nulla purus
                  habitasse.
                </p>
                <figure>
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                  />
                  <figcaption>Image caption goes here</figcaption>
                </figure>
                <h5 id="heading-5">Heading 5</h5>
                <p>
                  Morbi sed imperdiet in ipsum, adipiscing elit dui lectus.
                  Tellus id scelerisque est ultricies ultricies. Duis est sit
                  sed leo nisl, blandit elit sagittis. Quisque tristique
                  consequat quam sed. Nisl at scelerisque amet nulla purus
                  habitasse.
                </p>
                <blockquote>
                  "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                  mauris id. Non pellentesque congue eget consectetur turpis.
                  Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                  aenean tempus."
                </blockquote>
                <h6 id="heading-5">Heading 6</h6>
                <p>
                  Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
                  condimentum mi massa. In tincidunt pharetra consectetur sed
                  duis facilisis metus. Etiam egestas in nec sed et. Quis
                  lobortis at sit dictum eget nibh tortor commodo cursus.
                </p>
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
