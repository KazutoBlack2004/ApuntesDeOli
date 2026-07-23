import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Info,
  ExternalLink,
  Code,
  Palette
} from "lucide-react";

const DESIGN_STYLES = {
  glassmorphism: {
    name: "Glasmorfismo (Glassmorphism)",
    tabLabel: "Glasmorfismo",
    termId: "glasmorfismo",
    desc: "Simula el efecto de vidrio esmerilado translúcido flotando sobre un fondo colorido. Es el estilo insignia del diseño premium moderno (usado en macOS y Windows 11).",
    css: `background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
border-radius: 16px;`,
    tailwind: "bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl",
    prompt: "Diseña un componente con estilo Glasmorfismo (Glassmorphism). Usa un fondo translúcido blanco muy claro con opacidad del 5%, aplica un desenfoque de fondo pronunciado (backdrop-filter blur de 12px), un borde fino blanco semitransparente para simular el brillo del vidrio, y sombras oscuras suaves. Asegúrate de colocar elementos de color con gradientes detrás para que se note el efecto esmerilado.",
    previewBg: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)",
    renderStyle: {
      background: "rgba(255, 255, 255, 0.06)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.35)",
      borderRadius: "20px",
      padding: "24px",
      color: "#ffffff"
    }
  },
  liquid_glass: {
    name: "Vidrio Líquido (Liquid Glass / Aurora)",
    tabLabel: "Vidrio Líquido",
    termId: "vidrio_liquido",
    desc: "Una evolución del glasmorfismo donde formas líquidas orgánicas con gradientes extremadamente vibrantes ('aurora blobs') se mueven por detrás del vidrio, dando una sensación orgánica y dinámica.",
    css: `/* Vidrio */
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
border-radius: 24px;
/* Fondo de auroras */
background: radial-gradient(circle, #f43f5e 10%, #7c3aed 50%, #06b6d4 100%);`,
    tailwind: "bg-white/[0.04] backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl relative overflow-hidden",
    prompt: "Crea un componente usando Vidrio Líquido (Liquid/Aurora Glass). Añade un contenedor de vidrio translúcido con desenfoque extremo (blur de 20px) y bordes finos. Por detrás del vidrio, posiciona de forma absoluta 2 o 3 círculos/auroras con colores de gradiente intensos (como rosa, morado y turquesa) y añade animaciones lentas de rotación o pulso en CSS para simular auroras fluidas en movimiento constante.",
    previewBg: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
    renderStyle: {
      background: "rgba(255, 255, 255, 0.04)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
      borderRadius: "24px",
      padding: "24px",
      color: "#ffffff",
      position: "relative",
      overflow: "hidden"
    }
  },
  bento_grid: {
    name: "Bento Grid (Rejilla Bento)",
    tabLabel: "Bento Grid",
    termId: "bento_grid",
    desc: "Layout estructurado inspirado en las cajas de bento japonesas. Organiza el contenido en bloques rectangulares y cuadrados de diferentes tamaños encajados de forma asimétrica pero armoniosa.",
    css: `/* Contenedor Grid */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;

/* Tarjeta Bento */
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 20px;
padding: 20px;`,
    tailwind: "grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4",
    prompt: "Diseña una sección utilizando Bento Grid. Organiza las tarjetas en una rejilla CSS Grid (de 3 columnas en desktop). Haz que algunas tarjetas ocupen una sola celda, mientras que los widgets más importantes deben expandirse a 2 columnas (col-span-2) o 2 filas (row-span-2) para crear jerarquía y asimetría visual. Usa tarjetas con esquinas muy redondeadas (border-radius 16px o 20px), sombras sutiles y espaciados limpios.",
    previewBg: "#050505",
    renderStyle: {
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "20px",
      padding: "16px",
      color: "#ffffff",
      width: "100%",
      maxWidth: "320px"
    }
  },
  ui_espacial: {
    name: "UI Espacial (Spatial UI)",
    tabLabel: "UI Espacial",
    termId: "ui_espacial",
    desc: "Diseño creado para entornos tridimensionales y realidad mixta (estilo Apple Vision Pro). Se caracteriza por vidrios oscuros muy translúcidos, bordes que refractan la luz y sombras de profundidad extremas.",
    css: `background: rgba(30, 30, 35, 0.35);
backdrop-filter: blur(30px);
border: 1.5px solid rgba(255, 255, 255, 0.22);
box-shadow: 0 35px 70px rgba(0, 0, 0, 0.7), 
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
border-radius: 32px;`,
    tailwind: "bg-neutral-900/35 backdrop-blur-3xl border-1.5 border-white/20 shadow-[0_35px_70px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)] rounded-[32px]",
    prompt: "Diseña un componente con estilo UI Espacial (Spatial computing / VisionOS). Usa un fondo de vidrio grisáceo muy translúcido y oscuro con desenfoque de fondo ultraprofundo (blur de 30px). Aplica bordes finos blancos reflectantes y sombras proyectadas extremadamente oscuras y difusas para dar la sensación de que la interfaz está flotando físicamente en el aire. Añade micro-destellos en los botones al hacer hover para simular el foco de la mirada.",
    previewBg: "radial-gradient(circle at center, #1f2937 0%, #030712 100%)",
    renderStyle: {
      background: "rgba(30, 30, 35, 0.35)",
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      border: "1.5px solid rgba(255, 255, 255, 0.22)",
      boxShadow: "0 35px 70px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
      borderRadius: "32px",
      padding: "24px",
      color: "#ffffff"
    }
  },
  neumorphism: {
    name: "Neumorfismo (Neumorphism)",
    tabLabel: "Neumorfismo",
    termId: "neumorfismo",
    desc: "Crea interfaces que parecen esculpidas directamente sobre el color de fondo. Utiliza sombras paralelas dobles (una clara y una oscura) para dar volumen extruido o hendido.",
    css: `background: #1e2026;
box-shadow: 9px 9px 16px #131518, 
            -9px -9px 16px #292b34;
border-radius: 24px;
border: none;`,
    tailwind: "bg-[#1e2026] shadow-[9px_9px_16px_#131518,-9px_-9px_16px_#292b34] rounded-3xl",
    prompt: "Diseña un botón estilo Neumorfismo (Neumorphism / Soft UI). El fondo de la caja debe ser exactamente idéntico al del contenedor padre (ej. un gris oscuro o crema). Usa una doble sombra: una sombra oscura en la esquina inferior derecha para la profundidad, y una sombra blanca translúcida en la esquina superior izquierda para simular el brillo de la luz del botón sobresaliendo.",
    previewBg: "#1e2026",
    renderStyle: {
      background: "#1e2026",
      boxShadow: "8px 8px 16px #111215, -8px -8px 16px #2b2e37",
      borderRadius: "24px",
      padding: "24px",
      color: "#f3f4f6"
    }
  },
  claymorphism: {
    name: "Claymorfismo (Claymorphism)",
    tabLabel: "Claymorfismo",
    termId: "claymorfismo",
    desc: "Estilo amigable e infantil que imita figuras hechas de arcilla 3D o plastilina. Combina esquinas muy redondeadas con sombras internas para simular inflado.",
    css: `background: #a5b4fc; /* Color pastel */
border-radius: 28px;
box-shadow: 8px 12px 24px rgba(0, 0, 0, 0.15), 
            inset -6px -6px 12px rgba(0, 0, 0, 0.2), 
            inset 6px 6px 12px rgba(255, 255, 255, 0.4);`,
    tailwind: "bg-indigo-300 rounded-[28px] shadow-[8px_12px_24px_rgba(0,0,0,0.15)] shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.2)] shadow-[inset_6px_6px_12px_rgba(255,255,255,0.4)]",
    prompt: "Diseña una tarjeta con estilo Claymorfismo (Claymorphism / 3D inflado). Usa colores pastel (como azul o rosa pastel). Aplica esquinas muy redondeadas, una sombra proyectada en el fondo para dar flotación, y sombras internas (inset shadow): una oscura abajo a la derecha para dar relieve 3D, y una clara arriba a la izquierda para reflejar la luz como plastilina inflada.",
    previewBg: "linear-gradient(135deg, #1e1e24 0%, #111115 100%)",
    renderStyle: {
      background: "#a5b4fc",
      borderRadius: "30px",
      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.25), inset -8px -8px 16px rgba(0, 0, 0, 0.25), inset 8px 8px 16px rgba(255, 255, 255, 0.45)",
      padding: "24px",
      color: "#1e1b4b"
    }
  },
  brutalism: {
    name: "Brutalismo Web (Neobrutalism)",
    tabLabel: "Brutalismo",
    termId: "brutalismo",
    desc: "Desafía las reglas convencionales usando colores primarios neón de alto contraste, tipografías monoespaciadas rígidas, bordes negros gruesos y sombras duras sin degradados.",
    css: `background: #facc15; /* Neón */
border: 3px solid #000000;
box-shadow: 6px 6px 0px #000000;
border-radius: 8px;
color: #000000;`,
    tailwind: "bg-yellow-400 border-3 border-black shadow-[6px_6px_0px_#000000] text-black rounded-lg",
    prompt: "Diseña un componente con estilo Neobrutalismo (Brutalismo Web). Usa colores de alto contraste como amarillo neón o cian, un borde negro sólido y grueso de 3px, y una sombra paralela rígida y dura (offset 5px, sin desenfoque / blur 0px) de color negro. Utiliza tipografías monoespaciadas y botones con efectos de desplazamiento lineales al hacer hover.",
    previewBg: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
    renderStyle: {
      background: "#facc15",
      border: "4px solid #000000",
      boxShadow: "8px 8px 0px #000000",
      borderRadius: "8px",
      padding: "24px",
      color: "#000000",
      fontFamily: "monospace"
    }
  },
  skeuomorphism: {
    name: "Esqueumorfismo (Skeuomorphism)",
    tabLabel: "Esqueumorfismo",
    termId: "esqueumorfismo",
    desc: "Imita las texturas y la física de los objetos reales del mundo físico (como metal pulido, botones de plástico con volumen o cuero) para hacerlos intuitivos.",
    css: `background: linear-gradient(180deg, #374151 0%, #1f2937 100%);
border-top: 2px solid rgba(255, 255, 255, 0.15);
border-bottom: 2px solid rgba(0, 0, 0, 0.4);
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 
            inset 0 2px 4px rgba(255, 255, 255, 0.1);
border-radius: 12px;`,
    tailwind: "bg-gradient-to-b from-gray-700 to-gray-800 border-t-2 border-white/15 border-b-2 border-black/40 shadow-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] rounded-xl",
    prompt: "Diseña un control estilo Esqueumorfismo (Skeuomorphic). Utiliza gradientes lineales realistas verticales de oscuro a claro, sombras internas para dar la impresión de relieve físico en 3D, y bordes finos brillantes arriba (highlight) y sombras oscuras abajo para simular luz física real golpeando el botón.",
    previewBg: "linear-gradient(135deg, #111827 0%, #030712 100%)",
    renderStyle: {
      background: "linear-gradient(180deg, #4b5563 0%, #1f2937 100%)",
      borderTop: "2px solid rgba(255, 255, 255, 0.25)",
      borderBottom: "3px solid rgba(0, 0, 0, 0.6)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.15)",
      borderRadius: "12px",
      padding: "24px",
      color: "#e5e7eb"
    }
  },
  minimalism: {
    name: "Minimalismo (Minimalism)",
    tabLabel: "Minimalismo",
    termId: "autenticacion", // safe fallback
    desc: "Diseño elegante enfocado puramente en la tipografía, el contraste y la distribución de los espacios vacíos. Elimina cualquier adorno o decoración que no sea funcional.",
    css: `background: #000000;
border-bottom: 1px solid rgba(255, 255, 255, 0.2);
letter-spacing: 0.15em;
text-transform: uppercase;
font-family: serif;`,
    tailwind: "bg-black border-b border-white/20 tracking-widest uppercase font-serif",
    prompt: "Diseña un componente con estilo Minimalista. Usa un fondo negro o blanco puro, elimina bordes innecesarios, cajas y sombras. Dale prioridad a una tipografía Serif muy elegante con mucho espaciado entre letras (letter-spacing), márgenes generosos de espacio en blanco y texto en mayúsculas.",
    previewBg: "#050505",
    renderStyle: {
      background: "#000000",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      padding: "28px",
      color: "#ffffff",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      fontFamily: "Georgia, serif"
    }
  }
};

export default function EstilosUI() {
  const [activeTab, setActiveTab] = useState("glassmorphism");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const styleData = DESIGN_STYLES[activeTab];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(styleData.prompt).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(styleData.css).then(() => {
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    });
  };

  return (
    <NoteLayout
      title="Estilos de Interfaz de Usuario (UI)"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["UI/UX", "Diseño", "Estilos", "Glasmorfismo", "Brutalismo", "AI Prompts"]}
      previousNote={{ label: "Optimización de Imágenes", path: "/DesarrolloSoftware/OptimizacionImagenes" }}
      nextNote={{ label: "Convenciones de Nombres", path: "/DesarrolloSoftware/ConvencionesNombres" }}
    >
      <div className="callout">
        Conocer los <strong>Estilos de Interfaz de Usuario (UI)</strong> no solo es útil para los diseñadores. 
        En la era de la programación asistida por IA (como copilotos y agentes), dominar estos nombres técnicos permite a los 
        desarrolladores o <em>vicoders</em> escribir instrucciones precisas (prompts) para que la IA genere interfaces con 
        la estética premium deseada.
      </div>

      <h2>¿Por qué Importa Saber de Estilos de UI?</h2>
      <p>
        Cuando le pides a una IA: <em>"Haz un botón elegante"</em>, la IA tiene que adivinar qué significa "elegante" para ti. 
        Puede devolverte un botón plano azul convencional o un botón gris sin personalidad.
      </p>
      <p>
        En cambio, si le pides: <em>"Crea un botón usando <Term id="glasmorfismo">Glasmorfismo</Term>, con fondo blanco al 5% de opacidad, un blur de 10px y un borde sutil rosa"</em> o 
        <em>"Crea un botón estilo <Term id="brutalismo">Neobrutalista</Term> amarillo con borde grueso negro de 3px y sombra desplazada en 4px"</em>, 
        la IA sabrá **exactamente** qué código CSS o clases de Tailwind generar para obtener ese look moderno y premium.
      </p>

      <h2>Playground de Estilos de UI y Prompts</h2>
      <p>
        Haz clic en las pestañas para ver una representación real en vivo de cada estilo visual, inspeccionar su código CSS 
        y copiar un **Prompt de Ingeniería de Diseño** optimizado para pedirle interfaces de ese tipo a tu agente de IA.
      </p>

      {/* Showcase Card */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        
        {/* Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="text-pink-500 w-5 h-5" />
            <h3 className="font-bold text-white text-sm md:text-base font-sans m-0">Catálogo de Corrientes Estéticas Web</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono font-bold">
            Live Preview
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {Object.entries(DESIGN_STYLES).map(([key, value]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setCopiedPrompt(false);
                  setCopiedCss(false);
                }}
                className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                  isActive 
                    ? "border-pink-500 bg-white/[0.02] text-white" 
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {value.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-col lg:flex-row min-h-[480px] w-full">
          
          {/* Column 1: Live Interactive Preview (45%) */}
          <div 
            className="w-full lg:w-[45%] p-8 flex items-center justify-center relative overflow-hidden min-h-[260px] select-none"
            style={{ background: styleData.previewBg }}
          >
            {/* Background glowing decorations for Glassmorphism to pop */}
            {activeTab === "glassmorphism" && (
              <>
                <div className="absolute w-24 h-24 rounded-full bg-pink-500 blur-xl top-1/4 left-1/4 animate-pulse" />
                <div className="absolute w-32 h-32 rounded-full bg-cyan-500 blur-2xl bottom-1/4 right-1/4 animate-bounce" style={{ animationDuration: "8s" }} />
              </>
            )}

            {/* Aurora Liquid blobs for Liquid Glass */}
            {activeTab === "liquid_glass" && (
              <>
                <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 blur-xl top-1/3 left-1/3 animate-pulse" style={{ animationDuration: "4s" }} />
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 blur-xl bottom-1/3 right-1/3 animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 blur-lg top-1/4 right-1/4 animate-bounce" style={{ animationDuration: "6s" }} />
              </>
            )}

            {/* Glowing spot for claymorphism */}
            {activeTab === "claymorphism" && (
              <div className="absolute w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl" />
            )}

            {/* The Live Rendered Card */}
            <div style={styleData.renderStyle} className="w-full max-w-[280px] z-10 transition-all duration-300">
              
              {activeTab === "bento_grid" ? (
                /* Bento Grid Special Preview */
                <div className="grid grid-cols-3 gap-2 w-full text-[9px] font-sans font-bold text-white/90">
                  <div className="col-span-2 p-3 bg-white/10 rounded-xl border border-white/10 flex flex-col justify-between min-h-[60px] shadow-sm">
                    <span className="opacity-40 text-[7px] uppercase tracking-wider">Metas</span>
                    <span className="text-pink-400">col-span-2</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between min-h-[60px] text-center">
                    <span className="opacity-40 text-[7px] uppercase tracking-wider">LCP</span>
                    <span className="text-emerald-400 font-mono">1.2s</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between min-h-[60px] text-center">
                    <span className="opacity-40 text-[7px] uppercase tracking-wider">Status</span>
                    <span className="text-sky-400 font-mono">OK</span>
                  </div>
                  <div className="col-span-2 p-3 bg-white/10 rounded-xl border border-white/10 flex flex-col justify-between min-h-[60px] shadow-sm">
                    <span className="opacity-40 text-[7px] uppercase tracking-wider">Tráfico</span>
                    <span className="text-white/80">Rejilla Bento</span>
                  </div>
                </div>
              ) : (
                /* Standard Card */
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ 
                        backgroundColor: activeTab === "brutalism" ? "#000" : "var(--accent-color, #ec4899)",
                        boxShadow: activeTab === "brutalism" ? "none" : "0 0 8px var(--accent-color, #ec4899)" 
                      }} 
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {activeTab === "ui_espacial" ? "Spatial OS" : "UI Card"}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold mb-1 font-sans leading-snug">
                    {activeTab === "brutalism" ? "NEOBRUTAL CARD" : activeTab === "minimalism" ? "MINIMAL" : activeTab === "ui_espacial" ? "SPATIAL VIEW" : "Tarjeta Demo"}
                  </h4>
                  <p className="text-[11px] leading-relaxed opacity-75 mb-4">
                    {activeTab === "minimalism" 
                      ? "Elegance in spacing." 
                      : activeTab === "ui_espacial"
                      ? "Flota sobre tu entorno con refracciones dinámicas."
                      : "Este es un contenedor renderizado aplicando las sombras y efectos puros del estilo."}
                  </p>
                  <button 
                    style={activeTab === "brutalism" ? {
                      border: "2px solid #000",
                      background: "#fff",
                      boxShadow: "3px 3px 0 #000",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      padding: "4px 8px",
                      fontWeight: "bold"
                    } : activeTab === "claymorphism" ? {
                      background: "#fff",
                      color: "#4f46e5",
                      border: "none",
                      borderRadius: "15px",
                      boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1)",
                      fontSize: "10px",
                      padding: "6px 12px",
                      fontWeight: "bold"
                    } : activeTab === "skeuomorphism" ? {
                      background: "linear-gradient(180deg, #f3f4f6 0%, #d1d5db 100%)",
                      color: "#111827",
                      borderTop: "1px solid #fff",
                      borderBottom: "2px solid #9ca3af",
                      borderRadius: "6px",
                      fontSize: "10px",
                      padding: "5px 10px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    } : activeTab === "minimalism" ? {
                      border: "none",
                      background: "transparent",
                      color: "#fff",
                      borderBottom: "1px solid #fff",
                      fontSize: "9px",
                      padding: "2px 0",
                      letterSpacing: "0.1em"
                    } : activeTab === "ui_espacial" ? {
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1.5px solid rgba(255, 255, 255, 0.3)",
                      color: "#fff",
                      borderRadius: "20px",
                      fontSize: "10px",
                      padding: "6px 14px",
                      fontWeight: "semibold",
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2)"
                    } : {
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "10px",
                      padding: "5px 10px"
                    }}
                    className="cursor-pointer"
                  >
                    Acción
                  </button>
                </>
              )}

            </div>
          </div>

          {/* Column 2: Description & Prompts (55% width) */}
          <div className="flex-1 p-5 flex flex-col justify-between bg-black/20 gap-4">
            
            {/* Description */}
            <div>
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-1">
                {styleData.name}
              </span>
              <p className="text-xs text-white/70 leading-relaxed m-0">
                {styleData.desc}
              </p>
            </div>

            {/* CSS Variables Code */}
            <div className="relative">
              <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-1">
                Estilos CSS Crudos
              </span>
              <pre className="m-0 p-3 bg-neutral-900 border border-white/5 rounded-lg text-[10px] font-mono text-white/60 overflow-x-auto leading-relaxed">
                {styleData.css}
              </pre>
              <button
                onClick={handleCopyCss}
                className="absolute top-6 right-2.5 flex items-center gap-1 text-[9px] border border-white/10 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer transition-all text-white/60 hover:text-white"
              >
                {copiedCss ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                <span>{copiedCss ? "Copiado" : "Copiar"}</span>
              </button>
            </div>

            {/* AI Prompts Prompt */}
            <div className="relative p-3.5 rounded-xl border border-pink-500/10 bg-pink-500/[0.02]">
              <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest block mb-1.5">
                Prompt sugerido para tu Agente de IA
              </span>
              <p className="text-[11px] text-white/75 leading-relaxed m-0 pr-12">
                "{styleData.prompt}"
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

      <h2>Consejos de Prompting de Diseño para "Vicoders"</h2>
      <p>
        Para sacarle el máximo partido a tu agente programador cuando generes interfaces visuales, te recomendamos 
        seguir estas reglas estructuradas en tus solicitudes:
      </p>
      <ul>
        <li>
          <strong>Define el Ambiente (Atmosphere):</strong> Describe el color base y la vibra. Ej. <em>"Usa un ambiente oscuro elegante (dark mode first)"</em> o <em>"Usa un diseño limpio, diáfano y corporativo con fondo blanco"</em>.
        </li>
        <li>
          <strong>Define la Paleta (Palette):</strong> No uses colores genéricos como "azul" o "rojo". Proporciona los colores en formato Hexadecimal (Hex) o variables de estilo. Ej: <em>"Usa una paleta basada en rosa (#ec4899) y cian (#06b6d4) sobre fondo negro profundo (#050505)"</em>.
        </li>
        <li>
          <strong>Especifica el Estilo de UI (Design Style):</strong> Utiliza las palabras del catálogo anterior. Ej. <em>"Usa tarjetas con glasmorfismo sobre el fondo degradado y botones con esquinas redondeadas normales"</em>.
        </li>
        <li>
          <strong>Indica la Interactividad:</strong> Pide detalles sobre hovers y transiciones. Ej: <em>"Añade una transición suave y un efecto de escala al botón (scale-105) en hover"</em>.
        </li>
      </ul>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-4">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white/70 leading-relaxed m-0">
          <strong className="text-amber-400">Regla de oro:</strong> Una descripción estética rica en tu prompt (especificando formato, estilo y detalles de sombras) puede transformar un componente aburrido de "apariencia Bootstrap clásica" en un diseño increíble digno de portafolio profesional en una sola pasada.
        </p>
      </div>
    </NoteLayout>
  );
}
