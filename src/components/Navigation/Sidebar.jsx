import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { resolvePath } from "../../utils/path.js";
import { mainCategories } from "./Header.jsx";


export function Sidebar({ activeCategory, activeSubTopics, currentPath }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!activeCategory || activeSubTopics.length === 0) return null;

  const renderLinks = (collapsed = isCollapsed) => (
    <div className="flex flex-col gap-1">
      {activeSubTopics.map((sub) => {
        const resolvedSubPath = resolvePath(sub.path);
        const isActive = currentPath === resolvedSubPath || currentPath.startsWith(`${resolvedSubPath}/`);
        return (
          <a
            key={sub.id}
            href={resolvedSubPath}
            title={collapsed ? sub.label : undefined}
            className={`flex items-center gap-2 rounded-lg justify-start text-left w-full h-9 px-3 transition-colors ${
              collapsed ? "min-w-0 justify-center px-0" : ""
            } ${
              isActive
                ? "font-semibold border"
                : "text-white/60 hover:text-[var(--accent-text,#f9a8d4)] hover:bg-[var(--accent-light,rgba(236,72,153,0.05))]"
            }`}
            style={isActive ? {
              color: 'var(--accent-text, #f9a8d4)',
              backgroundColor: 'var(--accent-light, rgba(236,72,153,0.1))',
              borderColor: 'var(--accent-border, rgba(236,72,153,0.2))'
            } : undefined}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            {!collapsed && <span className="truncate">{sub.label}</span>}
            {!collapsed && sub.badge && (
              <span 
                className="ml-auto rounded-full border px-1.5 py-0.5 text-[10px] font-medium"
                style={{
                  borderColor: 'var(--accent-border, rgba(236,72,153,0.2))',
                  backgroundColor: 'var(--accent-light, rgba(236,72,153,0.15))',
                  color: 'var(--accent-text, #f9a8d4)'
                }}
              >
                {sub.badge}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Botón flotante para abrir menú en móvil */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 md:hidden"
        style={{
          borderColor: 'var(--accent-border, rgba(236,72,153,0.3))',
          color: 'var(--accent-color, #ec4899)',
          boxShadow: '0 0 15px var(--accent-light, rgba(236,72,153,0.25))'
        }}
        aria-label="Abrir menú"
      >
        <Menu size={22} />
      </button>

      {/* Backdrop del Drawer en móvil */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Drawer lateral en móvil */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[80vw] bg-[#050505]/95 border-r p-5 shadow-[5px_0_25px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out md:hidden flex flex-col backdrop-blur-md ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderRightColor: 'var(--accent-border, rgba(236,72,153,0.2))' }}
      >
        <div 
          className="flex items-center justify-between border-b pb-4 mb-4"
          style={{ borderBottomColor: 'var(--accent-border, rgba(236,72,153,0.2))' }}
        >
          <span 
            className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r font-sans"
            style={{ backgroundImage: 'linear-gradient(to right, var(--accent-text, #f9a8d4), var(--accent-color, #ec4899))' }}
          >
            {activeCategory.label}
          </span>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-[var(--accent-light,rgba(236,72,153,0.1))] hover:text-[var(--accent-text,#f9a8d4)] transition-colors"
            aria-label="Cerrar menú"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6">
          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent-color,#ec4899)] opacity-70">
              Temas
            </h3>
            {renderLinks(false)}
          </div>

          <div className="border-t border-white/5 pt-4">
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent-color,#ec4899)] opacity-70">
              Otras Secciones
            </h3>
            <div className="flex flex-col gap-1">
              {mainCategories.filter(cat => cat.id !== activeCategory.id).map((cat) => {
                const Icon = cat.icon;
                return (
                  <a
                    key={cat.id}
                    href={resolvePath(cat.path)}
                    className="flex items-center rounded-lg justify-start text-left w-full h-9 px-3 text-white/60 hover:text-[var(--accent-text,#f9a8d4)] hover:bg-[var(--accent-light,rgba(236,72,153,0.05))] transition-colors"
                  >
                    <Icon size={14} className="mr-2 text-[var(--accent-color,#ec4899)] opacity-75" />
                    <span className="truncate text-sm">{cat.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>

      <aside
        className={`hidden h-full shrink-0 overflow-y-auto border-r bg-black/40 p-4 transition-[width] duration-200 md:block ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        style={{ borderRightColor: 'var(--accent-border, rgba(236,72,153,0.2))' }}
      >
        <div className="mb-4 flex items-center justify-between gap-2 px-2">
          {!isCollapsed && (
            <h2 className="truncate text-xs font-bold uppercase tracking-widest text-[var(--accent-color,#ec4899)] opacity-70 font-sans">
              {activeCategory.label}
            </h2>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-[var(--accent-light,rgba(236,72,153,0.1))] hover:text-[var(--accent-text,#f9a8d4)]"
            aria-label={isCollapsed ? "Desplegar aside" : "Plegar aside"}
            title={isCollapsed ? "Desplegar aside" : "Plegar aside"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav>{renderLinks()}</nav>
      </aside>
    </>
  );
}
