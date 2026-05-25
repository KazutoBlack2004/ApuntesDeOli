import React from "react";
import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-pink-500/20 bg-black py-6 mt-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/50 flex items-center gap-1">
          Hecho con <Heart size={14} className="text-pink-500" /> para Apuntes de Oli
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/KazutoBlack2004/ApuntesDeOli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-pink-400 transition-colors"
            aria-label="Repositorio de ApuntesDeOli en GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
