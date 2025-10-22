import React from "react";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import { BlogPostHeader4 } from "../components/pages/blog/components/blog-post-header-04";
import { Content27 } from "../components/pages/blog/components/content-27";
import { RelatedPosts } from "../components/pages/blog/components/related-posts";
import { Blog68 } from "../components/pages/blog/components/blog-68";

export default function BlogEntrada() {
  return (
    <div>
      <Header />
      <div className="color-scheme-1">
        <BlogPostHeader4 />
      </div>
      <div className="color-scheme-2">
        <Content27 />
      </div>
      <div className="color-scheme-1">
        <RelatedPosts />
      </div>
      <div className="color-scheme-2">
        <Blog68 />
      </div>
      <Footer />
    </div>
  );
}
