import React from "react";
import { Navbar11 } from "../components/Navbar11";
import { ClientesHeader64 } from "../components/ClientesHeader64";
import { ClientesPortfolio13 } from "../components/ClientesPortfolio13";
import { ClientesEvent23 } from "../components/ClientesEvent23";
import { ClientesCta39 } from "../components/ClientesCta39";
import { Footer11 } from "../components/Footer11";

export default function Clientes() {
  return (
    <div>
      <Navbar11 />
      <ClientesHeader64 />
      <ClientesPortfolio13 />
      <ClientesEvent23 />
      <ClientesCta39 />
      <Footer11 />
    </div>
  );
}
