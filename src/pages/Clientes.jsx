import React from "react";
import Header from "../components/layout/Header";
import { ClientesHeader64 } from "../components/pages/Clientes/ClientesHeader64";
import { ClientesPortfolio13 } from "../components/pages/Clientes/ClientesPortfolio13";
import { ClientesEvent23 } from "../components/pages/Clientes/ClientesEvent23";
import { ClientesCta39 } from "../components/pages/Clientes/ClientesCta39";
import Footer from "../components/layout/Footer";

export default function Clientes() {
  return (
    <div>
      <Header />
      <ClientesHeader64 />
      <ClientesPortfolio13 />
      <ClientesEvent23 />
      <ClientesCta39 />
      <Footer />
    </div>
  );
}
