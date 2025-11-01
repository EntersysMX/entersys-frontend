import React from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { BlogDynamic } from "../components/pages/blog/components/BlogDynamic";
// import { Blog68 } from "../components/pages/blog/components/blog-68"; // Temporalmente oculto - Checklist and Whitepaper no está listo
// import { Contact13 } from "../components/pages/blog/components/contact-13"; // Temporalmente oculto - Sección de contacto
import { Faq5 } from "../components/pages/blog/components/faq-05";

export default function Blog() {
  return (
    <div>
      <Header />
      <div className="color-scheme-1">
        <BlogDynamic />
      </div>
      {/* Temporalmente oculto - Checklist and Whitepaper no está listo */}
      {/* <div className="color-scheme-2">
        <Blog68 />
      </div> */}
      {/* Temporalmente oculto - Sección de contacto */}
      {/* <div className="color-scheme-1">
        <Contact13 />
      </div> */}
      <div className="color-scheme-2">
        <Faq5 />
      </div>
      <Footer />
    </div>
  );
}