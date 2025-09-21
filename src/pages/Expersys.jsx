import React from "react";
import Header from "../components/layout/Header";
import { ExpersysHeader64 } from "../components/pages/Expersys/ExpersysHeader64";
import { ExpersysLayout406 } from "../components/pages/Expersys/ExpersysLayout406";
import { ExpersysLayout503 } from "../components/pages/Expersys/ExpersysLayout503";
import { ExpersysLayout503_1 } from "../components/pages/Expersys/ExpersysLayout503_1";
import { ExpersysTestimonial17 } from "../components/pages/Expersys/ExpersysTestimonial17";
import { ExpersysFaq05 } from "../components/pages/Expersys/ExpersysFaq05";
import { ExpersysCta39 } from "../components/pages/Expersys/ExpersysCta39";
import Footer from "../components/layout/Footer";

export default function Expersys() {
  return (
    <div>
      <Header />
      <ExpersysHeader64 />
      <ExpersysLayout406 />
      <ExpersysLayout503 />
      <ExpersysLayout503_1 />
      <ExpersysTestimonial17 />
      <ExpersysFaq05 />
      <ExpersysCta39 />
      <Footer />
    </div>
  );
}
