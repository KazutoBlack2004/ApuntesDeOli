import React from "react";
import { GLOSSARY_TERMS } from "../utils/glossary.js";

/**
 * Componente Term
 * ───────────────
 * Envuelve una palabra técnica para mostrar su definición en un tooltip propio.
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
    <span
      className="group/term relative inline-block cursor-help border-b border-dashed font-medium transition-colors duration-150 focus:outline-none"
      tabIndex={0}
      style={{
        borderBottomColor: 'var(--accent-border, rgba(236, 72, 153, 0.4))',
        color: 'var(--accent-text, #f9a8d4)',
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.color = 'var(--accent-color, #ec4899)';
        event.currentTarget.style.borderBottomColor = 'var(--accent-color, #ec4899)';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.color = 'var(--accent-text, #f9a8d4)';
        event.currentTarget.style.borderBottomColor = 'var(--accent-border, rgba(236, 72, 153, 0.4))';
      }}
      onFocus={(event) => {
        event.currentTarget.style.color = 'var(--accent-color, #ec4899)';
        event.currentTarget.style.borderBottomColor = 'var(--accent-color, #ec4899)';
      }}
      onBlur={(event) => {
        event.currentTarget.style.color = 'var(--accent-text, #f9a8d4)';
        event.currentTarget.style.borderBottomColor = 'var(--accent-border, rgba(236, 72, 153, 0.4))';
      }}
    >
      <span>{children || term.title}</span>
      <span
        className="pointer-events-none invisible absolute bottom-[calc(100%+0.55rem)] left-1/2 z-[80] w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 translate-y-1 rounded-xl border border-white/10 bg-neutral-900/95 p-2.5 text-left text-white/90 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-150 group-hover/term:visible group-hover/term:translate-y-0 group-hover/term:opacity-100 group-focus/term:visible group-focus/term:translate-y-0 group-focus/term:opacity-100"
        role="tooltip"
      >
        <span className="mb-1.5 flex items-center gap-2 border-b border-white/10 pb-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: 'var(--accent-color, #ec4899)',
              boxShadow: '0 0 8px var(--accent-color, #ec4899)'
            }}
          />
          <span
            className="text-xs font-bold tracking-wide font-sans"
            style={{ color: 'var(--accent-text, #f9a8d4)' }}
          >
            {term.title}
          </span>
        </span>
        <span className="block text-[11px] text-white/75 leading-relaxed font-normal font-sans">
          {term.def}
        </span>
        <span
          className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-neutral-900/95"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
