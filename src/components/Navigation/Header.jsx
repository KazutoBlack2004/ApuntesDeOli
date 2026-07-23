import React from "react";
import { BookOpen, Code, Database, Network, Gamepad2 } from "lucide-react";
import { resolvePath } from "../../utils/path.js";


export const mainCategories = [
  { id: "fundamentos", label: "Fundamentos", path: "/Fundamentos", icon: BookOpen },
  { id: "ciencia-de-datos", label: "Ciencia de Datos", path: "/CienciaDeDatos", icon: BookOpen },
  { id: "desarrollo-software", label: "Software", path: "/DesarrolloSoftware", icon: Code },
  { id: "bases-de-datos", label: "Bases de Datos", path: "/BasesDeDatos", icon: Database },
  { id: "redes", label: "Redes", path: "/Redes", icon: Network },
  { id: "desarrollo-videojuegos", label: "Videojuegos", path: "/DesarrolloVideoJuegos", icon: Gamepad2 },
];

export function Header({ activeCategory }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-500/20 bg-black/80 backdrop-blur-md px-6 h-16 flex items-center justify-between shadow-[0_4px_30px_rgba(236,72,153,0.1)]">
      <div className="flex items-center gap-2">
        <a
          href={resolvePath("/")}
          className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 transition-opacity hover:opacity-80 flex items-center gap-1.5"
          aria-label="Ir al inicio"
        >
          <span className="font-mono text-3xl font-black select-none tracking-normal">&lt;/&gt;</span>
          <span>ApuntesDeOli</span>
        </a>
      </div>
      
      <nav className="hidden md:flex items-center gap-2">
        {mainCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory?.id === cat.id;
          return (
            <a
              key={cat.id}
              href={resolvePath(cat.path)}
              className={`inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[var(--accent-color,#ec4899)] text-white shadow-[0_0_10px_var(--accent-glow,rgba(236,72,153,0.3))]"
                  : "text-white/70 hover:bg-white/5 hover:text-[var(--accent-text,#f9a8d4)]"
              }`}
            >
              <Icon size={16} className="mr-2" />
              {cat.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
