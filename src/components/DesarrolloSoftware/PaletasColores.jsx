import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Palette, 
  Copy, 
  Check, 
  Info,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

const PALETTES = {
  cyberpunk_sweet: {
    name: "Cyberpunk Sweet",
    description: "Fondo oscuro profundo contrastado con un rosa chicle neón dulce. Ideal para interfaces de tecnología atrevidas, apps de música o landings cyberpunk.",
    bg: "#0D0D0D",
    cardBg: "#1A1A1A",
    accent: "#F7A6C1",
    text: "#FFFFFF",
    subText: "#8A8FA3",
    tailwind: `colors: {
  dark: '#0D0D0D',
  card: '#1A1A1A',
  pinkAccent: '#F7A6C1',
}`,
    prompt: "Diseña un componente con temática Cyberpunk Sweet. Usa #0D0D0D como color de fondo dominante (60%), #1A1A1A para los contenedores y tarjetas secundarias (30%), y #F7A6C1 como color de acento brillante para botones activos, bordes de enfoque y detalles de luces (10%). El texto principal debe ser blanco puro (#FFFFFF)."
  },
  velvet_wine: {
    name: "Velvet Wine / Plum Sage",
    description: "Una mezcla sofisticada de vino profundo y berenjena, acentuada con un verde menta brillante y textos en gris pizarra/lavanda.",
    bg: "#2B0D1E",
    cardBg: "#32292F",
    accent: "#99E1D9",
    text: "#FFFFFF",
    subText: "#8A8FA3",
    tailwind: `colors: {
  wine: '#2B0D1E',
  plumCard: '#32292F',
  mintAccent: '#99E1D9',
  slateGray: '#8A8FA3',
}`,
    prompt: "Diseña una interfaz premium elegante con estilo Velvet Wine. Usa un fondo de color ciruela/vino profundo (#2B0D1E), secciones internas y tarjetas en berenjena oscuro (#32292F), textos informativos en gris pizarra (#8A8FA3), y botones de llamada a la acción en verde menta brillante (#99E1D9) para un contraste de alta gama."
  },
  midnight_gold: {
    name: "Midnight Gold",
    description: "Azul Oxford corporativo de alta gama emparejado con detalles dorados/ocre. Transmite lujo, seriedad, finanzas y exclusividad.",
    bg: "#0B0F19",
    cardBg: "#151E33",
    accent: "#D4AF37",
    text: "#F1F5F9",
    subText: "#94A3B8",
    tailwind: `colors: {
  midnight: '#0B0F19',
  navyCard: '#151E33',
  goldAccent: '#D4AF37',
}`,
    prompt: "Diseña un portafolio de lujo con temática Midnight Gold. Usa azul Oxford #0B0F19 para el fondo, azul marino oscuro #151E33 para tarjetas, y oro metálico #D4AF37 como color de acento para iconos importantes y botones activos."
  },
  nordic_sage: {
    name: "Nordic Sage",
    description: "Una paleta clara y relajante inspirada en la decoración escandinava. Utiliza un fondo grisáceo pálido con acentos verde sabio natural.",
    bg: "#F4F6F4",
    cardBg: "#E1E7E1",
    accent: "#5F7D6B",
    text: "#1C2B22",
    subText: "#4A5A50",
    tailwind: `colors: {
  sageBg: '#F4F6F4',
  sageCard: '#E1E7E1',
  sageAccent: '#5F7D6B',
  darkForest: '#1C2B22',
}`,
    prompt: "Diseña una aplicación minimalista de estilo nórdico claro. Usa un fondo blanco pálido #F4F6F4, tarjetas y barras en verde sabio claro #E1E7E1, botones y acentos en verde sabio profundo #5F7D6B, y texto en verde bosque oscuro #1C2B22 para cumplir con el contraste de lectura."
  }
};

export default function PaletasColores() {
  const [activeTab, setActiveTab] = useState("cyberpunk_sweet");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);

  const current = PALETTES[activeTab];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(current.prompt).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(current.tailwind).then(() => {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    });
  };

  return (
    <NoteLayout
      title="Paletas de Colores para Diseño Web"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Diseño", "Colores", "Variables CSS", "Tailwind", "Accesibilidad", "Prompts"]}
      previousNote={{ label: "Estilos de Interfaz (UI)", path: "/DesarrolloSoftware/EstilosUI" }}
      nextNote={{ label: "Convenciones de Nombres", path: "/DesarrolloSoftware/ConvencionesNombres" }}
    >
      <div className="callout">
        Definir una <strong>Paleta de Colores Armónica</strong> es el primer paso para crear un producto digital profesional. 
        Al trabajar con agentes de IA, proporcionar los códigos hexadecimales exactos y sus roles previene que la IA elija 
        colores apagados o mal combinados por defecto.
      </div>

      <h2>La Regla de Oro: 60-30-10</h2>
      <p>
        Para que una interfaz sea visualmente atractiva, equilibrada y fácil de leer, los diseñadores web aplican 
        la <Term id="regla_60_30_10">Regla 60-30-10</Term>, que divide el peso de color en tres capas:
      </p>
      <ul>
        <li>
          <strong>60% Color Dominante (Fondo):</strong> Usualmente el color de fondo general de la aplicación. Establece el tono (claro u oscuro).
        </li>
        <li>
          <strong>30% Color Secundario (Estructura):</strong> Utilizado en tarjetas, barras de navegación, bordes o elementos estructurales que diferencian las secciones.
        </li>
        <li>
          <strong>10% Color de Acento (Interacción):</strong> Reservado para botones de llamada a la acción (CTA), enlaces, estados activos o alertas. Debe destacar inmediatamente sobre los otros dos.
        </li>
      </ul>

      <h2>Contraste y Accesibilidad (WCAG)</h2>
      <p>
        No basta con elegir colores estéticos. El texto de tu aplicación debe ser legible para todos. 
        Las pautas W3C exigen mantener un estándar mínimo de <Term id="accesibilidad_color">Accesibilidad del Color</Term>.
        Por ejemplo, si utilizas un fondo claro, el color de tu fuente debe ser lo suficientemente oscuro para leerse sin esfuerzo. 
        La relación de contraste mínima recomendada para texto normal es de **4.5:1** (escala AA).
      </p>

      <h2>Showcase: Simulador de Temas en Vivo</h2>
      <p>
        Haz clic en las paletas del catálogo para ver cómo se aplican los colores hexadecimales en tiempo real sobre un 
        módulo de control mock y copia los códigos o el prompt estructurado para dárselo a tu agente de IA:
      </p>

      {/* Simulator Playground */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        
        {/* Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="text-pink-500 w-5 h-5" />
            <h3 className="font-bold text-white text-sm md:text-base font-sans m-0">Paletas de Colores e Impacto Visual</h3>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono font-bold">
            Recolor Simulator
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {Object.entries(PALETTES).map(([key, value]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setCopiedPrompt(false);
                  setCopiedConfig(false);
                }}
                className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                  isActive 
                    ? "border-pink-500 bg-white/[0.02] text-white" 
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {value.name}
              </button>
            );
          })}
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-col lg:flex-row min-h-[440px] w-full">
          
          {/* Column 1: Recolor Mockup Dashboard (45% width) */}
          <div 
            className="w-full lg:w-[45%] p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[260px] transition-colors duration-300"
            style={{ backgroundColor: current.bg }}
          >
            {/* The Live Rendered Component */}
            <div 
              style={{ backgroundColor: current.cardBg, color: current.text }}
              className="w-full max-w-[270px] rounded-2xl p-5 shadow-2xl transition-colors duration-300 border border-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <span style={{ color: current.subText }} className="text-[9px] font-bold uppercase tracking-widest">
                  Dashboard
                </span>
                <span 
                  style={{ backgroundColor: current.accent + "15", color: current.accent, borderColor: current.accent + "30" }}
                  className="text-[9px] font-mono px-2 py-0.5 rounded border"
                >
                  Activo
                </span>
              </div>

              <h4 className="text-sm font-bold mb-1 font-sans leading-snug">
                Panel de Control
              </h4>
              
              <p style={{ color: current.subText }} className="text-[10.5px] leading-relaxed mb-4">
                Este bloque simula la distribución de color. Puedes ver el contraste entre fondo, tarjeta y acento.
              </p>

              {/* Action Button styled dynamically with the accent */}
              <button 
                style={{ backgroundColor: current.accent, color: activeTab === "nordic_sage" ? "#ffffff" : "#000000" }}
                className="w-full py-2 rounded-lg font-bold text-xs cursor-pointer shadow-md hover:opacity-90 transition-all border-none font-sans"
              >
                Ejecutar Proceso
              </button>

              <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accent }} />
                <span style={{ color: current.subText }} className="text-[8px] font-mono leading-none">
                  Filtro de Contraste Correcto
                </span>
              </div>
            </div>

            {/* Color circles indicators on preview */}
            <div className="flex gap-2.5 mt-4 text-[9px] font-mono font-bold text-white/50 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: current.bg }} />
                <span>60%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: current.cardBg }} />
                <span>30%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: current.accent }} />
                <span>10%</span>
              </div>
            </div>
          </div>

          {/* Column 2: Prompt Templates & CSS Config (55% width) */}
          <div className="flex-1 p-5 flex flex-col justify-between bg-black/20 gap-4">
            
            {/* Description & Hex Codes */}
            <div>
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-1">
                {current.name}
              </span>
              <p className="text-xs text-white/70 leading-relaxed m-0 mb-3">
                {current.description}
              </p>
              
              <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-1">
                Códigos de Color (<Term id="hex_code">Hexadecimal</Term>)
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/80">
                <span className="px-2.5 py-1 rounded bg-black/40 border border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.bg }} />
                  Fondo: {current.bg}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.cardBg }} />
                  Tarjetas: {current.cardBg}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.accent }} />
                  Acento: {current.accent}
                </span>
              </div>
            </div>

            {/* Tailwind theme config snippet */}
            <div className="relative">
              <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-1">
                Configuración de Temas (Tailwind CSS)
              </span>
              <pre className="m-0 p-3 bg-neutral-900 border border-white/5 rounded-lg text-[10px] font-mono text-white/60 overflow-x-auto leading-relaxed">
                {current.tailwind}
              </pre>
              <button
                onClick={handleCopyConfig}
                className="absolute top-6 right-2.5 flex items-center gap-1 text-[9px] border border-white/10 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-all text-white/60 hover:text-white"
              >
                {copiedConfig ? <CheckCircle2 size={10} className="text-emerald-400" /> : <Copy size={10} />}
                <span>{copiedConfig ? "Copiado" : "Copiar"}</span>
              </button>
            </div>

            {/* Prompt suggestion */}
            <div className="relative p-3.5 rounded-xl border border-pink-500/10 bg-pink-500/[0.02]">
              <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest block mb-1.5">
                Prompt para ordenar la paleta a tu Agente de IA
              </span>
              <p className="text-[11px] text-white/75 leading-relaxed m-0 pr-12">
                "{current.prompt}"
              </p>
              <button
                onClick={handleCopyPrompt}
                className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 cursor-pointer transition-all"
                title="Copiar prompt completo"
              >
                {copiedPrompt ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>

          </div>

        </div>

      </div>

      <h2>Consejos para Configurar Colores en tu Editor</h2>
      <p>
        Para trabajar cómodamente mientras programas, también es vital ajustar los colores de tu editor de código:
      </p>
      <ul>
        <li>
          <strong>Identificación de Sintaxis:</strong> Utiliza temas de color que tengan un contraste claro para diferenciar palabras reservadas de variables y textos strings.
        </li>
        <li>
          <strong>Filtros de Luz Azul:</strong> Si programas de noche, utiliza la herramienta nativa del sistema operativo (Luz Nocturna) o herramientas en tu editor para reducir el brillo de la pantalla.
        </li>
      </ul>
    </NoteLayout>
  );
}
