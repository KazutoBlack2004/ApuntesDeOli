import React from "react";
import { GLOSSARY_TERMS } from "../utils/glossary.js";
import { Tooltip } from "@heroui/react";

/**
 * Componente Term
 * ───────────────
 * Envuelve una palabra técnica para mostrar su definición en un tooltip propio usando HeroUI (API Compuesta).
 * Automáticamente evita desbordamientos de pantalla cerca de los bordes.
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
    if (import.meta.env.DEV) {
      console.warn(`[Glosario] Término no definido en glossary.js: "${id}"`);
    }
    return <span>{children}</span>;
  }

  return (
    <Tooltip delay={0} closeDelay={0}>
      <Tooltip.Trigger>
        <span
          className="cursor-help border-b border-dashed font-medium transition-colors duration-150 focus:outline-none"
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
          {children || term.title}
        </span>
      </Tooltip.Trigger>

      <Tooltip.Content
        placement="top"
        showArrow={true}
        offset={10}
        className="p-0 bg-transparent border-none shadow-none z-[80]"
      >
        <div className="bg-neutral-900/95 border border-white/10 rounded-xl p-2.5 shadow-2xl backdrop-blur-md w-[min(280px,calc(100vw-2rem))] text-left text-white/90">
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
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
            </div>
            <span className="block text-[11px] text-white/75 leading-relaxed font-normal font-sans">
              {term.def}
            </span>
          </div>
        </div>
      </Tooltip.Content>
    </Tooltip>
  );
}
