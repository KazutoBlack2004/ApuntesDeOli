"use client";

import React from "react";
import { Header, mainCategories } from "./Navigation/Header.jsx";
import { Sidebar } from "./Navigation/Sidebar.jsx";
import { Footer } from "./Navigation/Footer.jsx";

export function AppLayout({ children, currentPath = "" }) {
  // Determine which category is active based on the URL path
  const activeCategory = mainCategories.find(c => currentPath.startsWith(c.path));

  // Example dynamic subtopics based on the active category
  const subTopics = {
    "/Fundamentos": [
      { id: "unidades-de-informacion", label: "Unidades de información", path: "/Fundamentos/UnidadesDeInformacion", badge: "Nuevo" },
    ],
    "/DesarrolloVideoJuegos": [
      { id: "conceptos-unity", label: "Conceptos Unity", path: "/DesarrolloVideoJuegos/ConceptosUnity" },
      { id: "matematicas-3d", label: "Matemáticas 3D", path: "/DesarrolloVideoJuegos/Matematicas3D" },
    ],
    "/CienciaDeDatos": [
      { id: "machine-learning", label: "Machine Learning", path: "/CienciaDeDatos/MachineLearning" },
      { id: "estadistica", label: "Estadística", path: "/CienciaDeDatos/Estadistica" },
    ],
    "/Redes": [
      { id: "tipos-de-ip", label: "Tipos de IP", path: "/Redes/TiposDeIP", badge: "Nuevo" },
      { id: "mascara-gateway", label: "Máscara y gateway", path: "/Redes/MascaraGateway", badge: "Nuevo" },
      { id: "interfaces-de-red", label: "Interfaces de red", path: "/Redes/InterfacesDeRed", badge: "Nuevo" },
      { id: "calculo-de-redes", label: "Cálculo de redes", path: "/Redes/CalculoDeRedes", badge: "Nuevo" },
      { id: "modelo-osi", label: "Modelo OSI", path: "/Redes/ModeloOSI" },
      { id: "tcp-ip", label: "TCP/IP", path: "/Redes/TCPIP" },
      { id: "subnetting-cidr", label: "Subnetting y CIDR", path: "/Redes/Subnetting" },
    ]
  };

  const activeSubTopics = activeCategory ? subTopics[activeCategory.path] || [] : [];

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#050505] text-white/90 selection:bg-pink-500/30 font-sans">
      <Header activeCategory={activeCategory} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar 
          activeCategory={activeCategory} 
          activeSubTopics={activeSubTopics} 
          currentPath={currentPath} 
        />

        <div className="min-h-0 flex-1 overflow-y-auto flex flex-col">
          <main className="flex-1 p-6 md:p-10">
            <div className="w-full max-w-8xl mx-auto">
              {children}
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
}
