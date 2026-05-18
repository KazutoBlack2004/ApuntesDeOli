"use client";

import React from "react";
import { Tooltip } from "@heroui/react";
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
      { id: "modelos-redes", label: "Modelos de red", path: "/Redes/ModelosRedes" },
      { id: "protocolos-dispositivos", label: "Dispositivos y protocolos", path: "/Redes/ProtocolosDispositivos" },
      { id: "calculo-de-redes", label: "Cálculo de redes", path: "/Redes/CalculoDeRedes" },
      { id: "vlans-enrutamiento", label: "VLANs y enrutamiento", path: "/Redes/VlansEnrutamiento" },
    ]
  };

  const activeSubTopics = activeCategory ? subTopics[activeCategory.path] || [] : [];

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#050505] text-white/90 selection:bg-pink-500/30 font-sans relative">
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

      {/* Global Floating Glossary Button — Solo visible en la sección de Redes */}
      {activeCategory && activeCategory.path === "/Redes" && (
        <div className="fixed bottom-6 right-6 z-50">
          <Tooltip delay={200} closeDelay={100}>
            <Tooltip.Trigger>
              <a
                href={resolvePath("/Redes/Glosario")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-fuchsia-500 text-white border border-white/20 shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_22px_rgba(236,72,153,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer"
                aria-label="Abrir Glosario en nueva pestaña"
              >
                <svg
                  className="w-5.5 h-5.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content
              placement="left"
              offset={12}
              showArrow
              className="p-0 bg-transparent border-none shadow-none z-[60]"
            >
              <div className="p-2.5 bg-neutral-900/95 text-white/90 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-pink-400 tracking-wide font-sans">
                  Recurso de Estudio
                </span>
                <p className="text-[10px] text-white/70 leading-relaxed font-normal font-sans">
                  Abrir Glosario completo de Redes en una nueva pestaña
                </p>
              </div>
            </Tooltip.Content>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
