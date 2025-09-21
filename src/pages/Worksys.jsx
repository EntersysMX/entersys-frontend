import React from "react";
import Header from "../components/layout/Header";
import { WorksysHeader64 } from "../components/pages/Worksys/WorksysHeader64";
import { WorksysLayout237 } from "../components/pages/Worksys/WorksysLayout237";
import { WorksysLayout363 } from "../components/pages/Worksys/WorksysLayout363";
import { WorksysLayout504 } from "../components/pages/Worksys/WorksysLayout504";
import { WorksysTestimonial17 } from "../components/pages/Worksys/WorksysTestimonial17";
import { WorksysFaq05 } from "../components/pages/Worksys/WorksysFaq05";
import { WorksysCta39 } from "../components/pages/Worksys/WorksysCta39";
import Footer from "../components/layout/Footer";

export default function Worksys() {
  return (
    <div>
      <Header />
      <WorksysHeader64 />
      <WorksysLayout237 />
      <WorksysLayout363 />
      <WorksysLayout504 />
      <WorksysTestimonial17 />
      <WorksysFaq05 />
      <WorksysCta39 />
      <Footer />
    </div>
  );
}
