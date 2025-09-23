import React from "react";
import Header from "../components/layout/Header";
import { BlogPostHeader01 } from "../components/pages/awalab/blog-post-header-01";
import { Content27 } from "../components/pages/awalab/content-27";
import { Content271 } from "../components/pages/awalab/content-27_1";
import { Stats30 } from "../components/pages/awalab/stats-30";
import { Testimonial17 } from "../components/pages/awalab/testimonial-17";
import { Gallery01 } from "../components/pages/awalab/gallery-01";
import { Cta39 } from "../components/pages/awalab/cta-39";
import Footer from "../components/layout/Footer";

export default function Awalab() {
  return (
    <div>
      <Header />
      <BlogPostHeader01 />
      <Content27 />
      <Content271 />
      <Stats30 />
      <Testimonial17 />
      <Gallery01 />
      <Cta39 />
      <Footer />
    </div>
  );
}