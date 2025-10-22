"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const useRelume = ({ defaultValue, selects }) => {
  const [activeSelect, setActiveSelect] = useState(defaultValue);
  const currentSelect = selects.find(function (select) {
    return select.value === activeSelect;
  });
  return { activeSelect, setActiveSelect, currentSelect };
};

export function Blog30({ tagline = "Blog", heading = "Conocimiento que transforma", tabs = [] }) {
  const useActive = useRelume({
    defaultValue: tabs.length > 0 ? tabs[0].value : "todos",
    selects: tabs,
  });

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex max-w-lg flex-col">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="heading-h1 mb-5 font-bold md:mb-6">
              {heading}
            </h1>
            <p className="text-medium">
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
                {tabs.find(t => t.value === useActive.activeSelect)?.trigger || "Todos"}
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem key={tab.value} value={tab.value}>
                    {tab.trigger}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={useActive.activeSelect}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16">
                {useActive.currentSelect?.content?.map((post, index) => (
                  <Card key={index} className="flex flex-col">
                    <Link
                      to={post.url}
                      className="inline-block w-full max-w-full overflow-hidden"
                    >
                      <div className="w-full overflow-hidden">
                        <img
                          src={post.image.src}
                          alt={post.image.alt}
                          className="aspect-video size-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="px-5 py-6 md:px-6">
                      <div className="mb-4 flex w-full items-center justify-start">
                        <Badge className="mr-4">{post.category}</Badge>
                        <p className="text-small inline font-semibold">
                          {post.readTime}
                        </p>
                      </div>
                      <Link to={post.url} className="mb-2 block max-w-full">
                        <h5 className="heading-h4 font-bold">
                          {post.title}
                        </h5>
                      </Link>
                      <p>{post.description}</p>
                      <Button
                        asChild
                        variant="link"
                        size="link"
                        iconRight={<RxChevronRight />}
                        className="mt-6 flex items-center justify-center gap-x-2"
                      >
                        <Link to={post.url}>Leer más</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
