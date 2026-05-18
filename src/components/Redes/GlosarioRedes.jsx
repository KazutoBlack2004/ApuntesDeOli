import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import { GLOSSARY_TERMS } from "../../utils/glossary.js";

// Helper categorizations for the glossary terms to make search & filtering beautiful
const TERM_CATEGORIES = {
  // Protocolos
  ip: "Protocolos",
  ipv4: "Protocolos",
  ipv6: "Protocolos",
  tcp: "Protocolos",
  udp: "Protocolos",
  arp: "Protocolos",
  dns: "Protocolos",
  dhcp: "Protocolos",
  icmp: "Protocolos",
  ospf: "Protocolos",
  http: "Protocolos",
  https: "Protocolos",
  ssh: "Protocolos",
  ftp: "Protocolos",
  smtp: "Protocolos",
  bgp: "Protocolos",
  rip: "Protocolos",
  nat: "Protocolos",

  // Dispositivos
  router: "Dispositivos",
  switch: "Dispositivos",
  hub: "Dispositivos",
  gateway: "Dispositivos",
  firewall: "Dispositivos",
  nic: "Dispositivos",
  svi: "Dispositivos",

  // Conceptos y direccionamiento
  bit: "Conceptos",
  octeto: "Conceptos",
  subred: "Conceptos",
  mascara: "Conceptos",
  broadcast: "Conceptos",
  collision: "Conceptos",
  vlan: "Conceptos",
  trunk: "Conceptos",
  roas: "Conceptos",
  vpn: "Conceptos",
};

export default function GlosarioRedes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Format terms into a filterable list
  const termsList = Object.entries(GLOSSARY_TERMS).map(([key, term]) => {
    return {
      id: key,
      title: term.title,
      def: term.def,
      category: TERM_CATEGORIES[key] || "Conceptos",
    };
  });

  // Filter terms by category and search text
  const filteredTerms = termsList.filter((term) => {
    const matchesCategory =
      activeCategory === "Todos" || term.category === activeCategory;
    const matchesSearch =
      term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.def.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["Todos", "Protocolos", "Dispositivos", "Conceptos"];

  return (
    <NoteLayout
      title="Glosario de Redes"
      category="Redes"
      categoryPath="/Redes"
      tags={["Glosario", "Términos", "Redes", "Cisco CCNA"]}
      previousNote={{
        label: "VLANs y enrutamiento",
        path: "/Redes/VlansEnrutamiento",
      }}
    >
      <div className="callout">
        Este es el glosario interactivo completo y unificado para la sección de <strong>Redes</strong>. 
        Aquí puedes buscar rápidamente el significado de cualquiera de los conceptos y acrónimos clave 
        que aparecen a lo largo de los apuntes de Cisco CCNA y Network+.
      </div>

      {/* Search and Filters Section */}
      <div className="my-8 space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-neutral-900/60 border border-white/10 rounded-2xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all duration-300 backdrop-blur-sm shadow-md"
            placeholder="Buscar término o definición... (ej. DHCP, router, máscara)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.2)]"
                  : "bg-neutral-900/40 border-white/5 text-white/60 hover:border-white/15 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Glossary Cards */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="p-5 bg-neutral-900/60 border border-white/5 rounded-2xl hover:border-pink-500/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.08)] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-pink-400 font-bold group-hover:text-pink-300 transition-colors text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899] animate-pulse" />
                    {term.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/40 uppercase tracking-wider font-semibold">
                    {term.category}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {term.def}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl bg-neutral-900/20 my-6">
          <svg
            className="w-12 h-12 mx-auto text-white/20 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-white/40">No se encontraron términos coincidentes.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("Todos");
            }}
            className="mt-3 px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs text-white/80 transition-colors cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </NoteLayout>
  );
}
