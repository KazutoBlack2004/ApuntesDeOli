import React from "react";
import { Tooltip } from "@heroui/react";
import { GLOSSARY_TERMS } from "../utils/glossary.js";

/**
 * Componente Term
 * ───────────────
 * Envuelve una palabra técnica para mostrar su definición en un Tooltip premium de HeroUI v3.
 *
 * Props:
 *   - id: string        — Clave del diccionario (ej: "ip", "vlan", "switch")
 *   - children: node    — El texto visible sobre el que se hace hover. Si se omite, se usa el título del término.
 */
export default function Term({ id, children }) {
  if (!id) return <span>{children}</span>;

  const key = id.toLowerCase().trim();
  const term = GLOSSARY_TERMS[key];

  // Si no se encuentra el término en el diccionario, se muestra el texto normal como salvaguarda
  if (!term) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Glosario] Término no definido en glossary.js: "${id}"`);
    }
    return <span>{children}</span>;
  }

  return (
    <Tooltip delay={150} closeDelay={100}>
      <Tooltip.Trigger className="cursor-help border-b border-dashed border-pink-400/50 hover:text-pink-300 hover:border-pink-400 transition-colors duration-150 font-medium inline">
        <span>{children || term.title}</span>
      </Tooltip.Trigger>
      <Tooltip.Content
        placement="top"
        showArrow
        offset={6}
        className="p-0 bg-transparent border-none shadow-none z-50"
      >
        <div className="p-2.5 max-w-[280px] bg-neutral-900/95 text-white/90 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2 mb-1.5 border-b border-white/10 pb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            <span className="text-xs font-bold text-pink-400 tracking-wide font-sans">
              {term.title}
            </span>
          </div>
          <p className="text-[11px] text-white/75 leading-relaxed font-normal font-sans">
            {term.def}
          </p>
        </div>
      </Tooltip.Content>
    </Tooltip>
  );
}
