import React from "react";
import Header from "../components/layout/Header";
import { BlogPostHeader04 } from "../components/pages/blog-entry/blog-post-header-04";
import { Content27 } from "../components/pages/blog-entry/content-27";
import { Blog30 } from "../components/pages/blog-entry/blog-30";
import Footer from "../components/layout/Footer";

export default function BlogEntry() {
  return (
    <div>
      <Header />
      <BlogPostHeader04 colorScheme={2} />
      <Content27 colorScheme={1} />
      <Blog30 colorScheme={2} />
      <Footer />
    </div>
  );
}
