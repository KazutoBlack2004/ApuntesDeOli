import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import { GLOSSARY_TERMS } from "../../utils/glossary.js";

// Categorizations for Data Science glossary terms
const TERM_CATEGORIES = {
  // Machine Learning
  machine_learning: "Machine Learning",
  supervisado: "Machine Learning",
  no_supervisado: "Machine Learning",
  overfitting: "Machine Learning",
  underfitting: "Machine Learning",
  regresion: "Machine Learning",
  clasificacion: "Machine Learning",
  clustering: "Machine Learning",
  kmeans: "Machine Learning",
  pca: "Machine Learning",

  // Big Data
  big_data: "Big Data",
  hadoop: "Big Data",
  spark: "Big Data",
  pipeline: "Big Data",

  // Almacenamiento & BI
  data_warehouse: "Almacenamiento & BI",
  etl: "Almacenamiento & BI",
  star_schema: "Almacenamiento & BI",
  business_intelligence: "Almacenamiento & BI",
  kpi: "Almacenamiento & BI",

  // General
  ciencia_de_datos: "General",
  pandas: "General",
  numpy: "General",
  dataframe: "General",
  dataset: "General",
  eda: "General",
  outlier: "General",
  imputacion: "General",
};

export default function GlosarioCienciaDatos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Filter only Data Science related terms (those defined in TERM_CATEGORIES)
  const termsList = Object.entries(GLOSSARY_TERMS)
    .filter(([key]) => TERM_CATEGORIES[key] !== undefined)
    .map(([key, term]) => {
      return {
        id: key,
        title: term.title,
        def: term.def,
        category: TERM_CATEGORIES[key],
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

  const categories = ["Todos", "Machine Learning", "Big Data", "Almacenamiento & BI", "General"];

  return (
    <NoteLayout
      title="Glosario de Ciencia de Datos"
      category="Ciencia de Datos"
      categoryPath="/CienciaDeDatos"
      tags={["Glosario", "Términos", "Ciencia de Datos", "Estudio"]}
      previousNote={{
        label: "9. Python & Operaciones",
        path: "/CienciaDeDatos/PythonOperaciones",
      }}
    >
      <div className="callout">
        Este es el glosario interactivo completo para la sección de <strong>Ciencia de Datos</strong>. 
        Aquí puedes buscar rápidamente el significado de los conceptos clave de Machine Learning, Big Data, 
        Data Warehouse y Business Intelligence que aparecen a lo largo de los apuntes.
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
            className="w-full pl-10 pr-4 py-3 bg-neutral-900/60 border border-white/10 rounded-2xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--accent-color)]/50 focus:ring-1 focus:ring-[var(--accent-color)]/30 transition-all duration-300 backdrop-blur-sm shadow-md"
            placeholder="Buscar término o definición... (ej. ETL, clustering, KPI)"
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
              className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer"
              style={activeCategory === category ? {
                backgroundColor: 'var(--accent-light, rgba(168,85,247,0.15))',
                borderColor: 'var(--accent-color, #a855f7)',
                color: 'var(--accent-text, #c084fc)',
                boxShadow: '0 0 12px var(--accent-light, rgba(168,85,247,0.15))'
              } : {
                backgroundColor: 'rgba(23,23,23,0.4)',
                borderColor: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.6)'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }
              }}
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
              className="p-5 bg-neutral-900/60 border border-white/5 rounded-2xl transition-all duration-300 backdrop-blur-sm group flex flex-col justify-between"
              style={{
                borderColor: 'rgba(255,255,255,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-border, rgba(168,85,247,0.3))';
                e.currentTarget.style.boxShadow = '0 0 15px var(--accent-light, rgba(168,85,247,0.08))';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 
                    className="font-bold transition-colors text-base flex items-center gap-2"
                    style={{ color: 'var(--accent-text, #c084fc)' }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-pulse" 
                      style={{
                        backgroundColor: 'var(--accent-color, #a855f7)',
                        boxShadow: '0 0 6px var(--accent-color, #a855f7)'
                      }}
                    />
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
