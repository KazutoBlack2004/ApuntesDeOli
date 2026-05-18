import React from "react";
import { Button, Link } from "@heroui/react";
import { BookOpen, Code, Database, Network, Gamepad2 } from "lucide-react";

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
        <span className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
          ApuntesDeOli
        </span>
      </div>
      
      <nav className="hidden md:flex items-center gap-2">
        {mainCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory?.id === cat.id;
          return (
            <Button
              key={cat.id}
              variant={isActive ? "primary" : "ghost"}
              size="sm"
              className={`text-sm font-medium transition-all ${isActive ? "shadow-[0_0_10px_rgba(236,72,153,0.3)]" : "text-white/70 hover:text-pink-300"}`}
              onPress={() => window.location.href = cat.path}
            >
              <Icon size={16} className="mr-2" />
              {cat.label}
            </Button>
          );
        })}
      </nav>
    </header>
  );
}
