import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import {
  Layers,
  Code,
  Server,
  Globe,
  Zap,
  BookOpen,
  ChevronRight,
  Check,
  X,
  Info,
  ArrowRight,
  Box,
  Layout,
  Database,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const TOOLS = [
  // Frontend Frameworks
  {
    id: "react",
    name: "React",
    type: "framework",
    area: "frontend",
    language: "JavaScript / TypeScript",
    creator: "Meta (Facebook)",
    year: 2013,
    paradigm: "Componentes / Declarativo",
    color: "sky",
    hex: "#61DAFB",
    description:
      "La librería/framework de UI más popular del mundo. Basado en componentes reutilizables y un Virtual DOM para actualizaciones eficientes. Ideal para SPAs complejas.",
    strengths: ["Ecosistema enorme", "Gran demanda laboral", "Flexible y componible"],
    weaknesses: ["Curva de aprendizaje media", "Requiere decisiones de arquitectura propias"],
    useCases: ["Dashboards", "SPAs", "Aplicaciones web complejas"],
    logo: "Re",
  },
  {
    id: "vue",
    name: "Vue.js",
    type: "framework",
    area: "frontend",
    language: "JavaScript / TypeScript",
    creator: "Evan You",
    year: 2014,
    paradigm: "Componentes / Progresivo",
    color: "emerald",
    hex: "#42b883",
    description:
      "Framework progresivo: se puede integrar en partes de una app existente o usarse para construir SPAs completas. Tiene una curva de aprendizaje suave y excelente documentación en español.",
    strengths: ["Curva suave", "Documentación excelente", "Progresivo e integrable"],
    weaknesses: ["Ecosistema menor que React", "Menor demanda laboral en LATAM"],
    useCases: ["Apps web medianas", "Integración en proyectos legados", "Prototipos rápidos"],
    logo: "V",
  },
  {
    id: "astro",
    name: "Astro",
    type: "framework",
    area: "frontend",
    language: "JavaScript / TypeScript",
    creator: "The Astro Technology Company",
    year: 2021,
    paradigm: "Islands Architecture / MPA",
    color: "orange",
    hex: "#ff5d01",
    description:
      "Framework moderno que genera HTML estático por defecto e hidrata selectivamente componentes interactivos. Perfecto para sitios de contenido, blogs y documentación.",
    strengths: ["Cero JS por defecto", "Rendimiento extremo", "Compatible con React/Vue/Svelte"],
    weaknesses: ["No ideal para SPAs muy dinámicas", "Ecosistema en maduración"],
    useCases: ["Sitios de contenido", "Blogs", "Portfolios", "Documentación"],
    logo: "As",
  },
  {
    id: "svelte",
    name: "Svelte",
    type: "framework",
    area: "frontend",
    language: "JavaScript / TypeScript",
    creator: "Rich Harris",
    year: 2016,
    paradigm: "Compilado / Sin Virtual DOM",
    color: "red",
    hex: "#ff3e00",
    description:
      "A diferencia de React/Vue, Svelte compila los componentes en JavaScript puro durante el build. No hay Virtual DOM en tiempo de ejecución, lo que resulta en bundles muy pequeños y alta performance.",
    strengths: ["Sintaxis limpia y simple", "Bundle muy pequeño", "Excelente rendimiento"],
    weaknesses: ["Ecosistema menor", "Menor adopción empresarial"],
    useCases: ["Apps de alto rendimiento", "Interfaces embebidas", "Proyectos personales"],
    logo: "Sv",
  },
  // Backend Frameworks
  {
    id: "express",
    name: "Express.js",
    type: "framework",
    area: "backend",
    language: "JavaScript / Node.js",
    creator: "TJ Holowaychuk",
    year: 2010,
    paradigm: "Minimalista / MVC",
    color: "neutral",
    hex: "#888888",
    description:
      "El framework web más popular para Node.js. Minimalista y sin opiniones, provee las herramientas básicas para crear servidores HTTP y APIs REST sin dictar la estructura del proyecto.",
    strengths: ["Simplicidad extrema", "Ecosistema npm enorme", "Gran comunidad"],
    weaknesses: ["Sin opinión propia (requiere decisiones)", "Fácil crear código desorganizado"],
    useCases: ["APIs REST", "Servidores HTTP", "Microservicios"],
    logo: "Ex",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    type: "framework",
    area: "backend",
    language: "Python",
    creator: "Sebastián Ramírez",
    year: 2018,
    paradigm: "Async / OpenAPI",
    color: "teal",
    hex: "#009688",
    description:
      "Framework Python moderno y de alto rendimiento para construir APIs. Genera documentación interactiva automática (Swagger/OpenAPI), valida datos con Pydantic y soporta programación asíncrona.",
    strengths: ["Auto-documentación OpenAPI", "Validación automática", "Muy rápido"],
    weaknesses: ["Solo para APIs (no full-stack)", "Requiere conocimientos de Python async"],
    useCases: ["APIs de datos / ML", "Microservicios Python", "Backends modernos"],
    logo: "FA",
  },
  {
    id: "django",
    name: "Django",
    type: "framework",
    area: "backend",
    language: "Python",
    creator: "Django Software Foundation",
    year: 2005,
    paradigm: "Baterías incluidas / MVC (MTV)",
    color: "green",
    hex: "#092e20",
    description:
      "Framework Python 'con baterías incluidas': trae ORM, sistema de autenticación, panel de administración y más listos para usar. Favorece la convención sobre la configuración.",
    strengths: ["ORM poderoso", "Admin panel automático", "Muy completo"],
    weaknesses: ["Puede ser pesado para proyectos simples", "Monolítico por naturaleza"],
    useCases: ["Aplicaciones web completas", "CMSs", "Plataformas con base de datos"],
    logo: "Dj",
  },
  {
    id: "nestjs",
    name: "NestJS",
    type: "framework",
    area: "backend",
    language: "TypeScript / Node.js",
    creator: "Kamil Mysliwiec",
    year: 2017,
    paradigm: "Modular / Decoradores / Angular-like",
    color: "red",
    hex: "#e0234e",
    description:
      "Framework Node.js con fuerte influencia de Angular. Usa decoradores, inyección de dependencias y módulos para construir APIs escalables y bien estructuradas en TypeScript.",
    strengths: ["Muy estructurado", "TypeScript nativo", "Escalable para equipos grandes"],
    weaknesses: ["Curva de aprendizaje alta", "Verboso para proyectos pequeños"],
    useCases: ["APIs empresariales", "Microservicios Node", "Proyectos TypeScript grandes"],
    logo: "Ne",
  },
  // Libraries
  {
    id: "axios",
    name: "Axios",
    type: "library",
    area: "frontend",
    language: "JavaScript / TypeScript",
    creator: "Matt Zabriskie",
    year: 2014,
    paradigm: "HTTP Client",
    color: "purple",
    hex: "#5a29e4",
    description:
      "Cliente HTTP basado en promesas para el navegador y Node.js. Simplifica las peticiones a APIs, maneja automáticamente la serialización de JSON y ofrece interceptores para modificar requests/responses.",
    strengths: ["API simple e intuitiva", "Interceptores potentes", "Manejo de errores claro"],
    weaknesses: ["Agrega peso al bundle", "fetch() nativo es suficiente para casos simples"],
    useCases: ["Consumo de APIs REST", "Subida de archivos", "Autenticación con tokens"],
    logo: "Ax",
  },
  {
    id: "lodash",
    name: "Lodash",
    type: "library",
    area: "frontend",
    language: "JavaScript",
    creator: "John-David Dalton",
    year: 2012,
    paradigm: "Utilidades / Funcional",
    color: "blue",
    hex: "#3492ff",
    description:
      "Colección de funciones de utilidad para JavaScript: manipulación de arrays, objetos, strings y más. Hace el código más legible y evita reinventar operaciones comunes.",
    strengths: ["Muy completo", "Bien documentado", "Inmutable y predecible"],
    weaknesses: ["Bundle grande si se importa completo", "JS moderno reemplaza muchas funciones"],
    useCases: ["Transformación de datos", "Manipulación de colecciones", "Clonado profundo"],
    logo: "Lo",
  },
  {
    id: "dayjs",
    name: "Day.js",
    type: "library",
    area: "frontend",
    language: "JavaScript / TypeScript",
    creator: "iamkun",
    year: 2018,
    paradigm: "Fechas y Tiempos",
    color: "yellow",
    hex: "#f6cc3d",
    description:
      "Librería de manejo de fechas ultraligera (2KB), compatible con la API de Moment.js pero sin el peso. Parsea, valida, manipula y formatea fechas de forma sencilla.",
    strengths: ["Solo 2KB", "API familiar (Moment.js)", "Extensible con plugins"],
    weaknesses: ["API inmutable requiere acostumbrarse", "Menos potente que Luxon para zonas horarias"],
    useCases: ["Formateo de fechas", "Cálculos de diferencias", "Calendarios y agendas"],
    logo: "Dj",
  },
  {
    id: "zod",
    name: "Zod",
    type: "library",
    area: "frontend",
    language: "TypeScript",
    creator: "Colin McDonnell",
    year: 2020,
    paradigm: "Validación / Schema",
    color: "indigo",
    hex: "#6366f1",
    description:
      "Librería de validación de esquemas orientada a TypeScript. Define la forma de tus datos una sola vez y obtén validación en runtime + tipos TypeScript inferidos automáticamente.",
    strengths: ["Tipos inferidos automáticamente", "API fluida y legible", "Cero dependencias"],
    weaknesses: ["Solo funciona bien con TypeScript", "Bundle relativamente grande para validación"],
    useCases: ["Validación de formularios", "Validación de respuestas de API", "Parseo de env vars"],
    logo: "Zo",
  },
];

const COLOR_MAP = {
  sky: { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400", badge: "bg-sky-500/15 text-sky-300" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", badge: "bg-emerald-500/15 text-emerald-300" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400", badge: "bg-orange-500/15 text-orange-300" },
  red: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", badge: "bg-red-500/15 text-red-300" },
  neutral: { bg: "bg-neutral-500/10", border: "border-neutral-500/20", text: "text-neutral-400", badge: "bg-neutral-500/15 text-neutral-300" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400", badge: "bg-teal-500/15 text-teal-300" },
  green: { bg: "bg-green-900/30", border: "border-green-700/30", text: "text-green-400", badge: "bg-green-900/40 text-green-300" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", badge: "bg-purple-500/15 text-purple-300" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", badge: "bg-blue-500/15 text-blue-300" },
  yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400", badge: "bg-yellow-500/15 text-yellow-300" },
  indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400", badge: "bg-indigo-500/15 text-indigo-300" },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ToolCard({ tool, onClick, isSelected }) {
  const c = COLOR_MAP[tool.color] || COLOR_MAP.neutral;
  const typeLabel = tool.type === "framework" ? "Framework" : "Librería";
  const areaLabel = tool.area === "frontend" ? "Frontend" : "Backend";

  return (
    <button
      onClick={() => onClick(tool)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-2
        ${isSelected
          ? `${c.border} ${c.bg} shadow-lg scale-[1.01]`
          : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
        }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
            <span className={`text-xs font-black font-mono ${c.text}`}>{tool.logo}</span>
          </div>
          <div>
            <span className="text-sm font-bold text-white block">{tool.name}</span>
            <span className="text-[10px] text-white/40">{tool.language}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${c.badge}`}>
            {typeLabel}
          </span>
          <span className="text-[9px] text-white/30 font-mono">{areaLabel} · {tool.year}</span>
        </div>
      </div>
      <p className="text-[11px] text-white/55 leading-relaxed line-clamp-2">{tool.description}</p>
    </button>
  );
}

function ToolDetail({ tool }) {
  const c = COLOR_MAP[tool.color] || COLOR_MAP.neutral;

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className={`p-5 rounded-xl border ${c.border} ${c.bg}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
            <span className={`text-lg font-black font-mono ${c.text}`}>{tool.logo}</span>
          </div>
          <div>
            <h3 className={`text-xl font-black m-0 ${c.text}`}>{tool.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-white/40">{tool.language}</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/40">creado en {tool.year}</span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/40">{tool.creator}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed m-0">{tool.description}</p>
      </div>

      {/* Paradigm + Area */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
          <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-1">Paradigma</span>
          <span className="text-xs text-white font-semibold">{tool.paradigm}</span>
        </div>
        <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
          <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-1">Area</span>
          <span className="text-xs text-white font-semibold capitalize">{tool.area === "frontend" ? "Frontend" : "Backend"}</span>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5">
          <span className="text-[9px] text-emerald-400 uppercase tracking-widest block mb-2 font-bold">Fortalezas</span>
          <ul className="space-y-1 m-0 p-0 list-none">
            {tool.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-white/70">
                <Check size={10} className="text-emerald-400 mt-0.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 rounded-lg border border-red-500/10 bg-red-500/5">
          <span className="text-[9px] text-red-400 uppercase tracking-widest block mb-2 font-bold">Limitaciones</span>
          <ul className="space-y-1 m-0 p-0 list-none">
            {tool.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-white/70">
                <X size={10} className="text-red-400 mt-0.5 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Use Cases */}
      <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
        <span className="text-[9px] text-white/30 uppercase tracking-widest block mb-2">Casos de uso ideales</span>
        <div className="flex flex-wrap gap-1.5">
          {tool.useCases.map((uc, i) => (
            <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full border ${c.border} ${c.badge} font-medium`}>
              {uc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Decision Tree ────────────────────────────────────────────────────────────

const DECISION_TREE = [
  {
    question: "¿Que tipo de app quieres construir?",
    options: [
      { label: "Sitio web / Blog / Portfolio", next: "static" },
      { label: "Aplicacion web interactiva (SPA)", next: "spa" },
      { label: "API / Servidor backend", next: "backend" },
    ],
  },
  {
    id: "static",
    question: "¿Necesitas mucho contenido dinamico en el cliente?",
    options: [
      { label: "No, el contenido es principalmente estatico", result: "Astro", resultColor: "orange" },
      { label: "Si, hay mucha interaccion del usuario", result: "Astro + React (Islands)", resultColor: "sky" },
    ],
  },
  {
    id: "spa",
    question: "¿Que tan grande sera el proyecto?",
    options: [
      { label: "Pequeno o mediano (solo o con un equipo chico)", next: "spa_size_small" },
      { label: "Grande (equipo grande, empresa)", result: "React o NestJS", resultColor: "sky" },
    ],
  },
  {
    id: "spa_size_small",
    question: "¿Con que lenguaje quieres trabajar?",
    options: [
      { label: "JavaScript (quiero algo facil de aprender)", result: "Vue.js", resultColor: "emerald" },
      { label: "TypeScript (prefiero tipado estricto)", result: "React con TypeScript", resultColor: "sky" },
      { label: "Quiero el bundle mas pequeno posible", result: "Svelte", resultColor: "red" },
    ],
  },
  {
    id: "backend",
    question: "¿Que lenguaje de backend prefieres?",
    options: [
      { label: "Python (sencillo, ciencia de datos)", next: "backend_python" },
      { label: "JavaScript/TypeScript (Node.js)", next: "backend_node" },
    ],
  },
  {
    id: "backend_python",
    question: "¿Que tipo de backend necesitas?",
    options: [
      { label: "Solo una API rapida (REST/JSON)", result: "FastAPI", resultColor: "teal" },
      { label: "Aplicacion web completa con base de datos", result: "Django", resultColor: "green" },
    ],
  },
  {
    id: "backend_node",
    question: "¿Cuanta estructura y convencion prefieres?",
    options: [
      { label: "Minima (decido yo como organizar todo)", result: "Express.js", resultColor: "neutral" },
      { label: "Mucha estructura (inyeccion de dependencias, modulos)", result: "NestJS", resultColor: "red" },
    ],
  },
];

function DecisionTree() {
  const [history, setHistory] = useState([DECISION_TREE[0]]);
  const [result, setResult] = useState(null);
  const [resultColor, setResultColor] = useState("sky");

  const handleOption = (option) => {
    if (option.result) {
      setResult(option.result);
      setResultColor(option.resultColor || "sky");
      return;
    }
    const next = DECISION_TREE.find((n) => n.id === option.next);
    if (next) setHistory((prev) => [...prev, next]);
  };

  const handleReset = () => {
    setHistory([DECISION_TREE[0]]);
    setResult(null);
  };

  const current = history[history.length - 1];
  const c = COLOR_MAP[resultColor] || COLOR_MAP.sky;

  return (
    <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-xl my-6">
      {/* Header */}
      <div className="bg-white/[0.03] border-b border-white/8 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={15} className="text-[var(--accent-text)]" />
          <span className="text-sm font-bold text-white">Arbol de Decision de Stack</span>
        </div>
        {(history.length > 1 || result) && (
          <button
            onClick={handleReset}
            className="text-[10px] text-white/40 hover:text-white/70 transition-colors cursor-pointer border border-white/10 px-2.5 py-1 rounded-lg"
          >
            Reiniciar
          </button>
        )}
      </div>

      <div className="p-5">
        {/* Breadcrumb */}
        {history.length > 1 && (
          <div className="flex items-center gap-1 flex-wrap mb-4">
            {history.map((step, i) => (
              <React.Fragment key={i}>
                <span className={`text-[10px] ${i === history.length - 1 ? "text-[var(--accent-text)]" : "text-white/30"}`}>
                  Pregunta {i + 1}
                </span>
                {i < history.length - 1 && <ChevronRight size={10} className="text-white/20" />}
              </React.Fragment>
            ))}
          </div>
        )}

        {result ? (
          <div className={`p-6 rounded-xl border ${c.border} ${c.bg} text-center`}>
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Recomendacion para tu proyecto</div>
            <div className={`text-2xl font-black ${c.text} mb-3`}>{result}</div>
            <div className="text-xs text-white/50">
              Esta es la herramienta mas adecuada segun tus respuestas. Recuerda que siempre puedes explorar otras opciones.
            </div>
            <button
              onClick={handleReset}
              className="mt-4 text-xs border border-white/10 hover:bg-white/5 transition-colors px-4 py-1.5 rounded-lg text-white/60 cursor-pointer"
            >
              Volver a empezar
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-white mb-4">{current.question}</p>
            <div className="flex flex-col gap-2">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt)}
                  className="text-left w-full p-3.5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-[var(--accent-color)]/40 hover:bg-[var(--accent-color)]/5 transition-all duration-150 cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">{opt.label}</span>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-[var(--accent-text)] transition-colors shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function FrameworksYLibrerias() {
  const [filterArea, setFilterArea] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedTool, setSelectedTool] = useState(TOOLS[0]);

  const filtered = TOOLS.filter((t) => {
    const areaOk = filterArea === "all" || t.area === filterArea;
    const typeOk = filterType === "all" || t.type === filterType;
    return areaOk && typeOk;
  });

  return (
    <NoteLayout
      title="Frameworks y Librerías"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["React", "Vue", "Express", "FastAPI", "Astro", "NestJS", "Frameworks", "Librerías"]}
      previousNote={{ label: "Programación Orientada a Objetos", path: "/DesarrolloSoftware/POO" }}
      nextNote={{ label: "SEO para Desarrollo Web", path: "/DesarrolloSoftware/SEO" }}
    >
      <div className="callout">
        Un <strong>framework</strong> es una estructura con reglas y convenciones que dicta cómo debe organizarse tu aplicación.
        Una <strong>librería</strong>, en cambio, es un conjunto de funciones que tu código llama cuando lo necesitas.
        La diferencia clave: con una librería tú tienes el control, con un framework, el framework tiene el control de tu flujo.
      </div>

      <h2>Framework vs. Librería: La Diferencia Fundamental</h2>
      <p>
        Esta distinción se conoce como el <strong>principio de inversión de control (IoC)</strong>. 
        Imagina que estás construyendo una casa:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {/* Framework analogy */}
        <div className="p-5 rounded-xl border border-[var(--accent-color)]/20 bg-[var(--accent-color)]/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center">
              <Layout size={16} className="text-[var(--accent-text)]" />
            </div>
            <span className="font-bold text-white text-sm">Framework</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed m-0">
            Es como comprar una casa prefabricada: ya viene con la estructura, la distribución de habitaciones 
            y las instalaciones. Tú solo eliges el color de las paredes y los muebles. El <strong>constructor (framework) 
            tiene el control</strong> del esqueleto. Ejemplos: React, Django, NestJS.
          </p>
        </div>

        {/* Library analogy */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Box size={16} className="text-white/60" />
            </div>
            <span className="font-bold text-white text-sm">Librería</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed m-0">
            Es como comprar herramientas de ferretería: tienes el martillo, el taladro y el nivel, 
            pero <strong>tú decides</strong> cuándo y cómo usarlos. Puedes construir lo que quieras sin restricciones. 
            Ejemplos: Axios, Lodash, Day.js.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-6">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white/70 leading-relaxed m-0">
          <strong className="text-amber-400">Nota importante:</strong> React se suele llamar "librería" 
          (es su definición técnica original), pero en la práctica, el ecosistema completo de React (con Router, 
          gestión de estado, etc.) funciona como un framework. Esta distinción a veces se vuelve borrosa en la industria.
        </p>
      </div>

      <h2>Comparador Interactivo</h2>
      <p>
        Explora las herramientas más usadas en la industria. Selecciona un filtro y haz clic en cualquier tarjeta 
        para ver sus detalles, fortalezas y limitaciones.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: "all", label: "Todos" },
          { key: "frontend", label: "Frontend" },
          { key: "backend", label: "Backend" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterArea(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              filterArea === f.key
                ? "bg-[var(--accent-color)] text-white shadow-[0_0_12px_var(--accent-glow)]"
                : "border border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="w-px bg-white/10 mx-1" />
        {[
          { key: "all", label: "Todos" },
          { key: "framework", label: "Solo Frameworks" },
          { key: "library", label: "Solo Librerias" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterType(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              filterType === f.key
                ? "bg-white/10 text-white border border-white/15"
                : "border border-white/10 bg-white/[0.02] text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Comparator Layout */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          {/* Left: Tool List */}
          <div className="border-r border-white/5 flex flex-col">
            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                {filtered.length} herramienta{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-sm text-white/30 italic">
                  No hay herramientas para estos filtros.
                </div>
              ) : (
                filtered.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onClick={setSelectedTool}
                    isSelected={selectedTool?.id === tool.id}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right: Tool Detail */}
          <div className="p-5 overflow-y-auto">
            {selectedTool ? (
              <ToolDetail tool={selectedTool} />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-white/30 italic text-center">
                Selecciona una herramienta de la lista para ver sus detalles.
              </div>
            )}
          </div>
        </div>
      </div>

      <h2>Arbol de Decision: Que Framework Elegir</h2>
      <p>
        No existe un framework "mejor" en términos absolutos. La elección depende del tipo de proyecto, 
        el equipo, el lenguaje preferido y los requisitos de rendimiento. Responde las preguntas para obtener una recomendacion:
      </p>

      <DecisionTree />

      <h2>El Ecosistema: Frameworks y Librerias Trabajan Juntos</h2>
      <p>
        En proyectos reales nunca usas una sola herramienta: combinás un framework principal con múltiples 
        librerías especializadas. Aquí algunos stacks típicos en la industria:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/5">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)] text-xs">Stack</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Frontend</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Backend</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Ideal para</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-bold text-sky-400">MERN</td>
              <td className="px-4 py-3 text-white/70">React</td>
              <td className="px-4 py-3 text-white/70">Express + MongoDB</td>
              <td className="px-4 py-3 text-white/50 text-xs">SPAs con Node.js, startups</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-bold text-teal-400">FastAPI + React</td>
              <td className="px-4 py-3 text-white/70">React / Next.js</td>
              <td className="px-4 py-3 text-white/70">FastAPI + PostgreSQL</td>
              <td className="px-4 py-3 text-white/50 text-xs">Proyectos con ML/IA en backend</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-bold text-orange-400">Jamstack</td>
              <td className="px-4 py-3 text-white/70">Astro / Next.js</td>
              <td className="px-4 py-3 text-white/70">APIs externas (headless CMS)</td>
              <td className="px-4 py-3 text-white/50 text-xs">Sitios de contenido y marketing</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-bold text-red-400">NestJS + Angular</td>
              <td className="px-4 py-3 text-white/70">Angular</td>
              <td className="px-4 py-3 text-white/70">NestJS + TypeORM</td>
              <td className="px-4 py-3 text-white/50 text-xs">Aplicaciones empresariales grandes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Principios al Elegir una Herramienta</h2>
      <ul>
        <li>
          <strong>No elijas por hype:</strong> la herramienta más popular no siempre es la correcta para tu caso. 
          Evalúa el tamaño del proyecto, el equipo y los requisitos reales.
        </li>
        <li>
          <strong>Lee la documentación oficial:</strong> una herramienta con buena documentación acelera el aprendizaje 
          y reduce la fricción en el equipo.
        </li>
        <li>
          <strong>Considera el ecosistema:</strong> ¿tiene plugins activos? ¿una comunidad que responda preguntas? 
          ¿mantenimiento continuo en GitHub?
        </li>
        <li>
          <strong>Evita el "framework fatigue":</strong> no necesitas aprender todos los frameworks al mismo tiempo. 
          Domina uno profundamente antes de explorar el siguiente.
        </li>
        <li>
          <strong>Los fundamentos son transferibles:</strong> los conceptos de componentes, rutas, estado, peticiones HTTP 
          y autenticación aplican en prácticamente todos los frameworks modernos. Aprende los conceptos, no la sintaxis.
        </li>
      </ul>
    </NoteLayout>
  );
}
