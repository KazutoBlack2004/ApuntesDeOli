import React, { useState } from "react";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

export function Sidebar({ activeCategory, activeSubTopics, currentPath }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!activeCategory || activeSubTopics.length === 0) return null;

  const renderLinks = (collapsed = isCollapsed) => (
    <div className="flex flex-col gap-1">
      {activeSubTopics.map((sub) => {
        const isActive = currentPath === sub.path || currentPath.startsWith(`${sub.path}/`);
        return (
          <Button
            key={sub.id}
            variant={isActive ? "flat" : "light"}
            color={isActive ? "primary" : "default"}
            title={collapsed ? sub.label : undefined}
            className={`justify-start text-left w-full h-9 px-3 transition-colors ${
              collapsed ? "min-w-0 justify-center px-0" : ""
            } ${
              isActive
                ? "font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/20"
                : "text-white/60 hover:text-pink-300 hover:bg-pink-500/5"
            }`}
            onPress={() => window.location.href = sub.path}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            {!collapsed && <span className="truncate">{sub.label}</span>}
            {!collapsed && sub.badge && (
              <span className="ml-auto rounded-full border border-pink-500/20 bg-pink-500/15 px-1.5 py-0.5 text-[10px] font-medium text-pink-400">
                {sub.badge}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="shrink-0 border-b border-pink-500/20 bg-black/50 p-3 md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((open) => !open)}
          className="flex w-full items-center justify-between rounded-lg border border-pink-500/20 bg-pink-500/10 px-3 py-2 text-left text-sm font-semibold text-pink-300"
          aria-expanded={isMobileOpen}
        >
          <span className="flex items-center gap-2">
            <Menu size={16} />
            {activeCategory.label}
          </span>
          {isMobileOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {isMobileOpen && (
          <nav className="mt-3 rounded-lg border border-white/10 bg-black/40 p-2">
            {renderLinks(false)}
          </nav>
        )}
      </div>

      <aside
        className={`hidden h-full shrink-0 overflow-y-auto border-r border-pink-500/20 bg-black/40 p-4 transition-[width] duration-200 md:block ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-2 px-2">
          {!isCollapsed && (
            <h2 className="truncate text-xs font-bold uppercase tracking-widest text-pink-500/70">
              {activeCategory.label}
            </h2>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-pink-500/10 hover:text-pink-300"
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
