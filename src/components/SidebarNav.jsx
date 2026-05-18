import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * SidebarNav — Aside colapsable para navegación rápida entre secciones.
 *
 * Props:
 *  - title: string          — Nombre de la categoría (ej: "Redes")
 *  - categoryPath: string   — Path raíz (ej: "/Redes")
 *  - topics: { label, path, badge? }[]
 *  - currentPath: string    — Path actual para resaltar el activo
 */
export default function SidebarNav({ title, categoryPath, topics = [], currentPath = "" }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? "48px" : "220px",
        minWidth: collapsed ? "48px" : "220px",
        transition: "width 0.28s cubic-bezier(0.4,0,0.2,1), min-width 0.28s cubic-bezier(0.4,0,0.2,1)",
        position: "sticky",
        top: "80px",
        height: "fit-content",
        alignSelf: "flex-start",
      }}
      className="flex-shrink-0"
    >
      <div
        className="rounded-2xl overflow-hidden border border-white/8"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-white/6">
          {!collapsed && (
            <a
              href={categoryPath}
              className="text-xs font-semibold text-pink-400 uppercase tracking-widest hover:text-pink-300 transition-colors truncate"
            >
              {title}
            </a>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="ml-auto flex items-center justify-center w-7 h-7 rounded-lg text-white/30 hover:text-pink-400 hover:bg-white/5 transition-all duration-150 flex-shrink-0"
            aria-label={collapsed ? "Expandir panel" : "Colapsar panel"}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* Topic list */}
        <nav className="py-2">
          {topics.map((topic, i) => {
            const isActive = currentPath === topic.path || currentPath.startsWith(topic.path + "/");
            return (
              <a
                key={i}
                href={topic.path}
                title={collapsed ? topic.label : undefined}
                className="group flex items-center gap-2.5 px-3 py-2 transition-all duration-150 relative no-underline"
                style={{
                  background: isActive ? "rgba(236,72,153,0.10)" : "transparent",
                }}
              >
                {/* Accent bar for active */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full"
                    style={{ background: "#ec4899" }}
                  />
                )}

                {/* Dot indicator */}
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors"
                  style={{ background: isActive ? "#ec4899" : "rgba(255,255,255,0.2)" }}
                />

                {/* Label */}
                {!collapsed && (
                  <span
                    className="text-sm truncate transition-colors"
                    style={{ color: isActive ? "#f9a8d4" : "rgba(255,255,255,0.55)" }}
                  >
                    {topic.label}
                  </span>
                )}

                {/* Badge */}
                {!collapsed && topic.badge && (
                  <span className="ml-auto flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20 font-medium">
                    {topic.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
