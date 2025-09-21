import React from "react";
import Header from "../components/layout/Header";
import { BlogBlog30 } from "../components/pages/Blog/BlogBlog30";
import { BlogCta52 } from "../components/pages/Blog/BlogCta52";
import { BlogContact13 } from "../components/pages/Blog/BlogContact13";
import { BlogFaq05 } from "../components/pages/Blog/BlogFaq05";
import Footer from "../components/layout/Footer";

export default function Blog() {
  return (
    <div>
      <Header />
      <BlogBlog30 />
      <BlogCta52 />
      <BlogContact13 />
      <BlogFaq05 />
      <Footer />
    </div>
  );
}