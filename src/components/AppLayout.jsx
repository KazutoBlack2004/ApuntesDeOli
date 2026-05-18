"use client";

import React from "react";
import { Header, mainCategories } from "./Navigation/Header.jsx";
import { Sidebar } from "./Navigation/Sidebar.jsx";
import { Footer } from "./Navigation/Footer.jsx";
import { resolvePath } from "../utils/path.js";

export function AppLayout({ children, currentPath = "" }) {
  // Determine which category is active based on the URL path
  const activeCategory = mainCategories.find(c => {
    const resolvedPath = resolvePath(c.path);
    // Exact match or subpath match
    return currentPath === resolvedPath || currentPath.startsWith(resolvedPath + "/");
  });

  // Example dynamic subtopics based on the active category
  const subTopics = {
    "/Fundamentos": [
      { id: "unidades-de-informacion", label: "Unidades de información", path: "/Fundamentos/UnidadesDeInformacion" },
    ],
    "/DesarrolloVideoJuegos": [
      { id: "conceptos-unity", label: "Conceptos Unity", path: "/DesarrolloVideoJuegos" },
    ],
    "/Redes": [
      { id: "tipos-de-ip", label: "Tipos de IP", path: "/Redes/TiposDeIP" },
      { id: "mascara-gateway", label: "Máscara y gateway", path: "/Redes/MascaraGateway" },
      { id: "interfaces-de-red", label: "Interfaces de red", path: "/Redes/InterfacesDeRed" },
      { id: "calculo-de-redes", label: "Cálculo de redes", path: "/Redes/CalculoDeRedes" },
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
