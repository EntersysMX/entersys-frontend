import React from "react";
import Header from "../components/layout/Header";
import { SobreNosotrosHeader64 } from "../components/pages/SobreNosotros/SobreNosotrosHeader64";
import { SobreNosotrosLayout93 } from "../components/pages/SobreNosotros/SobreNosotrosLayout93";
import { SobreNosotrosLayout149 } from "../components/pages/SobreNosotros/SobreNosotrosLayout149";
import { SobreNosotrosLayout213 } from "../components/pages/SobreNosotros/SobreNosotrosLayout213";
import { SobreNosotrosTimeline20 } from "../components/pages/SobreNosotros/SobreNosotrosTimeline20";
import { SobreNosotrosLogo03 } from "../components/pages/SobreNosotros/SobreNosotrosLogo03";
import { SobreNosotrosCta39 } from "../components/pages/SobreNosotros/SobreNosotrosCta39";
import Footer from "../components/layout/Footer";

export default function SobreNosotros() {
  return (
    <div>
      <Header />
      <SobreNosotrosHeader64 />
      <SobreNosotrosLayout93 />
      <SobreNosotrosLayout149 />
      <SobreNosotrosLayout213 />
      <SobreNosotrosTimeline20 />
      <SobreNosotrosLogo03 />
      <SobreNosotrosCta39 />
      <Footer />
    </div>
  );
}
