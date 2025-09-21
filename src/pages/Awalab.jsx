import React from "react";
import Header from "../components/layout/Header";
import { AwaBlogPostHeader01 } from "../components/pages/Awalab/AwaBlogPostHeader01";
import { AwaContent27 } from "../components/pages/Awalab/AwaContent27";
import { AwaContent271 } from "../components/pages/Awalab/AwaContent271";
import { AwaStats30 } from "../components/pages/Awalab/AwaStats30";
import { AwaTestimonial17 } from "../components/pages/Awalab/AwaTestimonial17";
import { AwaGallery01 } from "../components/pages/Awalab/AwaGallery01";
import { AwaCta39 } from "../components/pages/Awalab/AwaCta39";
import Footer from "../components/layout/Footer";

export default function Awalab() {
  return (
    <div>
      <Header />
      <AwaBlogPostHeader01 />
      <AwaContent27 />
      <AwaContent271 />
      <AwaStats30 />
      <AwaTestimonial17 />
      <AwaGallery01 />
      <AwaCta39 />
      <Footer />
    </div>
  );
}