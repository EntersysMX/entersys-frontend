import React from "react";
import Header from "../components/layout/Header";
import { Blog30 } from "../components/pages/blog/blog-30";
import { Contact13 } from "../components/pages/blog/contact-13";
import { Faq05 } from "../components/pages/blog/faq-05";
import Footer from "../components/layout/Footer";

export default function Blog() {
  return (
    <div>
      <Header />
      <Blog30 />
      <Contact13 />
      <Faq05 />
      <Footer />
    </div>
  );
}