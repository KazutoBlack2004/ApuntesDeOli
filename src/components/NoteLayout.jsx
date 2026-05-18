import React from "react";
import { Chip } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * NoteLayout — Template base para todos los apuntes del portafolio.
 *
 * Props:
 *  - title: string          — Título del apunte
 *  - category: string       — Categoría padre (ej: "Redes")
 *  - categoryPath: string   — Path de la categoría (ej: "/Redes")
 *  - tags: string[]         — Tags/etiquetas del apunte
 *  - previousNote: object   — Apunte anterior { label, path }
 *  - nextNote: object       — Apunte siguiente { label, path }
 *  - children: ReactNode    — Contenido del apunte
 */
export default function NoteLayout({
  title,
  category,
  categoryPath,
  tags = [],
  previousNote,
  nextNote,
  children,
}) {
  return (
    <article className="w-full max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-white/30 mb-6">
        <a href="/" className="hover:text-pink-400 transition-colors">Inicio</a>
        <ChevronRight size={14} />
        <a href={categoryPath} className="hover:text-pink-400 transition-colors">{category}</a>
        <ChevronRight size={14} />
        <span className="text-white/60 truncate">{title}</span>
      </nav>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">{title}</h1>
      <div className="h-px w-24 bg-pink-500/50 mb-8 rounded-full" />

      {/* Contenido */}
      <div className="note-content space-y-6 text-white/75 leading-relaxed">
        {children}
      </div>

      {(previousNote || nextNote) && (
        <nav className="mt-12 grid gap-3 border-t border-white/10 pt-6 md:grid-cols-2">
          {previousNote ? (
            <a
              href={previousNote.path}
              className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white/70 transition-colors hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-200"
            >
              <ChevronLeft size={18} className="shrink-0 text-pink-400" />
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/35">
                  Anterior
                </span>
                <span className="font-semibold">{previousNote.label}</span>
              </span>
            </a>
          ) : (
            <span />
          )}

          {nextNote && (
            <a
              href={nextNote.path}
              className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white/70 transition-colors hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-200 md:text-right"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/35">
                  Siguiente
                </span>
                <span className="font-semibold">{nextNote.label}</span>
              </span>
              <ChevronRight size={18} className="shrink-0 text-pink-400" />
            </a>
          )}
        </nav>
      )}

      <style>{`
        /* Tipografía del contenido */
        .note-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
          border-left: 3px solid #ec4899;
        }
        .note-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .note-content p { margin-bottom: 0.75rem; }
        .note-content strong { color: white; font-weight: 600; }
        .note-content em { color: #f9a8d4; font-style: italic; }
        .note-content ul {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0 1rem 0;
        }
        .note-content ul li {
          padding: 0.3rem 0 0.3rem 1.25rem;
          position: relative;
          color: rgba(255,255,255,0.7);
        }
        .note-content ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #ec4899;
        }
        /* Bloques de código inline */
        .note-content code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.85em;
          background: rgba(236,72,153,0.1);
          border: 1px solid rgba(236,72,153,0.2);
          color: #f9a8d4;
          padding: 0.15em 0.45em;
          border-radius: 0.3rem;
        }
        /* Bloques de código multilinea */
        .note-content pre {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .note-content pre code {
          background: transparent;
          border: none;
          padding: 0;
          color: rgba(255,255,255,0.85);
          font-size: 0.875rem;
        }
        /* Tablas */
        .note-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          font-size: 0.875rem;
        }
        .note-content th {
          background: rgba(236,72,153,0.08);
          color: #f9a8d4;
          font-weight: 600;
          padding: 0.6rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(236,72,153,0.2);
        }
        .note-content td {
          padding: 0.55rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
        }
        .note-content tr:hover td {
          background: rgba(255,255,255,0.02);
        }
        /* Callout/Nota destacada */
        .note-content .callout {
          background: rgba(236,72,153,0.06);
          border-left: 3px solid #ec4899;
          border-radius: 0 0.5rem 0.5rem 0;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          color: rgba(255,255,255,0.75);
        }
      `}</style>
    </article>
  );
}
