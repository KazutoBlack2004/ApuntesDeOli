"use client";

import React from "react";
import { Tooltip } from "@heroui/react";
import { Header, mainCategories } from "./Navigation/Header.jsx";
import { Sidebar } from "./Navigation/Sidebar.jsx";
import { Footer } from "./Navigation/Footer.jsx";
import { resolvePath } from "../utils/path.js";

const categoryColors = {
  "fundamentos": {
    accent: "#06b6d4",
    accentRgb: "6,182,212",
    glow: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.2)",
    bgLight: "rgba(6,182,212,0.1)",
    textAccent: "#22d3ee"
  },
  "redes": {
    accent: "#ec4899",
    accentRgb: "236,72,153",
    glow: "rgba(236,72,153,0.15)",
    border: "rgba(236,72,153,0.2)",
    bgLight: "rgba(236,72,153,0.1)",
    textAccent: "#f9a8d4"
  },
  "ciencia-de-datos": {
    accent: "#a855f7",
    accentRgb: "168,85,247",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.2)",
    bgLight: "rgba(168,85,247,0.1)",
    textAccent: "#c084fc"
  },
  "desarrollo-software": {
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    glow: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.2)",
    bgLight: "rgba(59,130,246,0.1)",
    textAccent: "#60a5fa"
  },
  "bases-de-datos": {
    accent: "#10b981",
    accentRgb: "16,185,129",
    glow: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.2)",
    bgLight: "rgba(16,185,129,0.1)",
    textAccent: "#34d399"
  },
  "desarrollo-videojuegos": {
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.2)",
    bgLight: "rgba(245,158,11,0.1)",
    textAccent: "#fbbf24"
  }
};

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
      { id: "que-es-una-api", label: "¿Qué es una API?", path: "/Fundamentos/QueEsUnaAPI" },
      { id: "formato-json", label: "Formato JSON", path: "/Fundamentos/FormatoJSON" },
      { id: "que-es-npm", label: "¿Qué es NPM?", path: "/Fundamentos/QueEsNPM" },
      { id: "crud-operaciones", label: "Operaciones CRUD", path: "/Fundamentos/CrudOperaciones" },
      { id: "tokens-y-jwt", label: "Tokens y JWT", path: "/Fundamentos/TokensYJWT" },
    ],
    "/DesarrolloSoftware": [
      { id: "convenciones-commits", label: "Git y Convenciones", path: "/DesarrolloSoftware/ConvencionesCommits" },
      { id: "poo", label: "Programación Orientada a Objetos", path: "/DesarrolloSoftware/POO" },
      { id: "frameworks-librerias", label: "Frameworks y Librerías", path: "/DesarrolloSoftware/FrameworksYLibrerias" },
      { id: "seo", label: "SEO para Desarrollo Web", path: "/DesarrolloSoftware/SEO" },
      { id: "testing", label: "Testing de Software", path: "/DesarrolloSoftware/Testing" },
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
      { id: "codigos-http", label: "Códigos de estado HTTP", path: "/Redes/CodigosHTTP" },
    ],
    "/CienciaDeDatos": [
      { id: "introduccion", label: "Introducción", path: "/CienciaDeDatos/Introduccion" },
      { id: "pandas-numpy", label: "Pandas & NumPy", path: "/CienciaDeDatos/PandasNumPy" },
      { id: "eda", label: "EDA y Estadísticas", path: "/CienciaDeDatos/EDA" },
      { id: "supervisado", label: "ML: Supervisado", path: "/CienciaDeDatos/Supervisado" },
      { id: "no-supervisado", label: "ML: No Supervisado", path: "/CienciaDeDatos/NoSupervisado" },
      { id: "data-warehouse", label: "Data Warehouse", path: "/CienciaDeDatos/DataWarehouse" },
      { id: "big-data", label: "Big Data & Spark", path: "/CienciaDeDatos/BigData" },
      { id: "business-intelligence", label: "Business Intelligence", path: "/CienciaDeDatos/BusinessIntelligence" },
      { id: "python-operaciones", label: "Python & Operaciones", path: "/CienciaDeDatos/PythonOperaciones" },
      { id: "glosario", label: "Glosario", path: "/CienciaDeDatos/Glosario" }
    ]
  };

  const activeSubTopics = activeCategory ? subTopics[activeCategory.path] || [] : [];
  
  // Normalize key for videojuegos if needed
  const categoryKey = activeCategory
    ? (activeCategory.id === "desarrollo-videojuegos" ? "desarrollo-videojuegos" : activeCategory.id)
    : "redes";

  const themeColors = categoryColors[categoryKey] || categoryColors["redes"];

  const styleVariables = {
    "--accent-color": themeColors.accent,
    "--accent-glow": themeColors.glow,
    "--accent-border": themeColors.border,
    "--accent-light": themeColors.bgLight,
    "--accent-text": themeColors.textAccent,
  };

  return (
    <div 
      className="h-screen overflow-hidden flex flex-col bg-[#050505] text-white/90 font-sans relative" 
      style={styleVariables}
    >
      <style>{`
        ::selection {
          background-color: rgba(${themeColors.accentRgb}, 0.35) !important;
          color: #ffffff !important;
        }
      `}</style>

      <Header activeCategory={activeCategory} />

      <div className="flex flex-col md:flex-row min-h-0 flex-1 overflow-hidden">
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

      {/* Global Floating Glossary Button — Visible en Redes y Ciencia de Datos con tematización adaptativa */}
      {activeCategory && (activeCategory.path === "/Redes" || activeCategory.path === "/CienciaDeDatos") && (
        <div className="fixed bottom-6 right-6 z-50">
          <Tooltip delay={200} closeDelay={100}>
            <Tooltip.Trigger>
              <a
                href={resolvePath(`${activeCategory.path}/Glosario`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full text-white border border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95"
                style={{
                  background: `linear-gradient(to tr, ${themeColors.accent}, ${themeColors.textAccent})`,
                  boxShadow: `0 0 15px ${themeColors.glow}`
                }}
                aria-label={`Abrir Glosario completo de ${activeCategory.label}`}
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
                <span className="text-[11px] font-bold tracking-wide font-sans" style={{ color: themeColors.textAccent }}>
                  Recurso de Estudio
                </span>
                <p className="text-[10px] text-white/70 leading-relaxed font-normal font-sans">
                  Abrir Glosario completo de {activeCategory.label} en una nueva pestaña
                </p>
              </div>
            </Tooltip.Content>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
