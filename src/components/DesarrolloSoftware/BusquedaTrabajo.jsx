import React, { useState, useEffect } from "react";
import NoteLayout from "../NoteLayout.jsx";
import {
  Briefcase,
  CheckCircle,
  ExternalLink,
  Search,
  Award,
  Sparkles,
  Info,
  Globe,
  CheckSquare,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// ─── Data: Tools & Platforms ──────────────────────────────────────────────────
const TOOLS_DATA = [
  {
    name: "FlowCV",
    url: "https://app.flowcv.com/",
    category: "cv",
    cost: "Freemium",
    desc: "Crea currículums modernos, limpios y altamente personalizables de forma visual y rápida. Formatos optimizados para sistemas ATS.",
    tags: ["CV Builder", "Diseño Moderno", "Rápido"],
    recommended: true
  },
  {
    name: "Teal",
    url: "https://www.tealhq.com/",
    category: "cv",
    cost: "Freemium",
    desc: "Plataforma integral para buscar empleo. Incluye un creador de CV, optimizador de perfil de LinkedIn y un tracker para seguir tus postulaciones.",
    tags: ["CV Optimizer", "Job Tracker", "LinkedIn"],
    recommended: true
  },
  {
    name: "Freelancer.cl",
    url: "https://www.freelancer.cl/",
    category: "freelance",
    cost: "Comisión",
    desc: "Plataforma global para encontrar proyectos como desarrollador independiente en áreas de programación, diseño y redacción.",
    tags: ["Freelance", "Proyectos cortos", "Español"],
    recommended: true
  },
  {
    name: "Getonbrd",
    url: "https://www.getonbrd.com/",
    category: "jobs",
    cost: "Gratis",
    desc: "La bolsa de trabajo tech más importante de Latinoamérica. Ideal para encontrar roles de desarrollo, datos y producto, tanto remotos como presenciales.",
    tags: ["Empleo Tech", "LATAM", "Remoto/Híbrido"],
    recommended: true
  },
  {
    name: "Reactive Resume",
    url: "https://rxresu.me/",
    category: "cv",
    cost: "100% Gratis",
    desc: "Creador de currículum de código abierto, gratuito, respetuoso con la privacidad y sin publicidad. Soporta exportación en PDF y traducción.",
    tags: ["Open Source", "Gratis", "Privacidad"],
    recommended: false
  },
  {
    name: "JSON Resume",
    url: "https://jsonresume.org/",
    category: "cv",
    cost: "Gratis",
    desc: "Para desarrolladores: define tu currículum usando un estándar JSON estructurado y renderízalo con decenas de temas mediante línea de comandos.",
    tags: ["Developer-first", "JSON", "Código"],
    recommended: false
  },
  {
    name: "Wellfound (AngelList)",
    url: "https://wellfound.com/",
    category: "jobs",
    cost: "Gratis",
    desc: "La red de empleo número uno para startups. Excelente para conectar directamente con fundadores y CTOs, con rangos salariales transparentes.",
    tags: ["Startups", "Remoto", "Global"],
    recommended: false
  },
  {
    name: "We Work Remotely",
    url: "https://weworkremotely.com/",
    category: "jobs",
    cost: "Gratis",
    desc: "La comunidad de trabajo remoto más grande del mundo. Excelente para encontrar roles de desarrollo de software globales en empresas distribuidas.",
    tags: ["Remoto 100%", "Global", "Inglés"],
    recommended: false
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/",
    category: "freelance",
    cost: "Comisión",
    desc: "La mayor plataforma de freelance del mundo. Ideal para profesionales con experiencia que buscan contratos largos y tarifas por hora en dólares.",
    tags: ["Freelance", "Inglés", "Tarifa por hora"],
    recommended: false
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/",
    category: "prep",
    cost: "Freemium",
    desc: "El estándar de la industria para practicar algoritmos, estructuras de datos y preparación de entrevistas técnicas tipo FAANG.",
    tags: ["Algoritmos", "Estructuras de Datos", "Coding"],
    recommended: false
  },
  {
    name: "NeetCode",
    url: "https://neetcode.io/",
    category: "prep",
    cost: "Freemium",
    desc: "Un mapa de ruta interactivo y estructurado que agrupa y explica de forma excelente los problemas clave de LeetCode con soluciones en video.",
    tags: ["Guía interactiva", "LeetCode", "Explicaciones"],
    recommended: true
  },
  {
    name: "Tech Interview Handbook",
    url: "https://www.techinterviewhandbook.org/",
    category: "prep",
    cost: "Gratis",
    desc: "Guía de estudio open-source sumamente recomendada. Cubre desde cómo armar tu CV hasta cómo negociar ofertas y resolver algoritmos paso a paso.",
    tags: ["Guías gratuitas", "Comportamiento", "Negociación"],
    recommended: true
  },
  {
    name: "Pramp",
    url: "https://www.pramp.com/",
    category: "prep",
    cost: "Gratis (Créditos)",
    desc: "Plataforma de entrevistas técnicas simuladas uno a uno con otros desarrolladores del mundo. Te empareja de forma automática para ser entrevistador y entrevistado.",
    tags: ["Mock Interviews", "Peer-to-peer", "Inglés"],
    recommended: false
  },
  {
    name: "Frontend Mentor",
    url: "https://www.frontendmentor.io/",
    category: "prep",
    cost: "Freemium",
    desc: "Mejora tus habilidades de maquetación y desarrollo construyendo proyectos del mundo real a partir de diseños de Figma profesionales.",
    tags: ["Portafolio", "CSS/HTML/JS", "Figma"],
    recommended: false
  }
];

// ─── Data: Checklist items ─────────────────────────────────────────────────────
const CHECKLIST_ITEMS = [
  { id: "cv-ats", text: "CV optimizado para ATS: Letra legible, sin tablas complejas ni gráficos, secciones claras (Experiencia, Proyectos, Habilidades, Educación)." },
  { id: "cv-metrics", text: "CV con impacto cuantitativo: Enfocar los logros en base a métricas (ej: 'reduje el tiempo de carga en un 30%' en vez de 'hice mantención del sitio')." },
  { id: "linkedin-headline", text: "LinkedIn profesional: Headline claro indicando tu especialidad y stack principal (ej: 'Frontend Developer | React & TypeScript')." },
  { id: "linkedin-about", text: "Sección 'Acerca de' optimizada: Explicar brevemente tu trayectoria, lo que te apasiona resolver y las tecnologías en las que tienes experiencia." },
  { id: "portfolio-readme", text: "Portafolio o GitHub documentado: Al menos 2-3 proyectos destacados con un README detallado, enlace de demo online (deploy) y código limpio." },
  { id: "elevator-pitch", text: "Elevator Pitch (presentación corta): Saber responder en 2 minutos quién eres, qué stack dominas y qué tipo de proyectos te entusiasma desarrollar." },
  { id: "star-method", text: "Metodología STAR ensayada: Estructurar tus anécdotas de proyectos anteriores usando Situación, Tarea, Acción y Resultado." },
  { id: "salary-check", text: "Investigación salarial: Saber cuál es tu rango objetivo buscando en Levels.fyi o Getonbrd antes de la primera entrevista." }
];

// ─── Data: Flashcards (Interview Questions) ────────────────────────────────────
const INTERVIEW_QUESTIONS = [
  {
    q: "1. ¿Cómo responderías al clásico 'Háblame de ti'?",
    category: "Comportamiento",
    tip: "Usa el framework Presente-Pasado-Futuro.",
    answer: "• Presente: Explica tu rol actual o tu stack principal y en qué te especializas hoy (ej. React, Node.js).\n• Pasado: Menciona 1 o 2 hitos importantes de tu formación o proyectos anteriores que expliquen por qué tienes esa experiencia.\n• Futuro: Cierra explicando por qué te entusiasma esta oportunidad específica y cómo encaja con tus metas de crecimiento profesional.\n*Evita recitar tu currículum linealmente. Concéntrate en tus fortalezas clave y tu pasión.*"
  },
  {
    q: "2. ¿Cómo estructurarías la respuesta a 'Háblame de un error o conflicto técnico que hayas tenido'?",
    category: "Comportamiento / Metodología",
    tip: "Usa el método STAR (Situación, Tarea, Acción, Resultado).",
    answer: "• Situación: Describe brevemente el contexto (ej. 'En mi proyecto final, la carga inicial tardaba 6 segundos y el servidor colapsaba').\n• Tarea: Explica cuál era tu responsabilidad directa (ej. 'Mi tarea era identificar el cuello de botella y solucionarlo sin romper las APIs activas').\n• Acción: Detalla qué hiciste tú de forma proactiva (ej. 'Implementé lazy loading, comprimí imágenes con WebP y creé un índice en la base de datos SQL').\n• Resultado: Muestra el impacto medible y, sobre todo, qué aprendiste (ej. 'La carga bajó a 1.8 segundos y aprendí la importancia de optimizar consultas desde el día uno')."
  },
  {
    q: "3. ¿Qué haces cuando no sabes la respuesta a una pregunta técnica en plena entrevista?",
    category: "Habilidades blandas",
    tip: "Nunca inventes. Demuestra tu proceso de pensamiento.",
    answer: "• Sé honesto y mantén la calma: 'No he trabajado directamente con esa tecnología en particular / No conozco ese concepto específico...'\n• Ofrece una alternativa lógica: '...pero basado en lo que sé sobre [tecnología similar], imagino que funciona de esta manera...'\n• Muestra disposición al aprendizaje: 'Me suena a que sirve para resolver [problema]. Definitivamente lo voy a investigar y probar saliendo de aquí.'\n*Los entrevistadores valoran más la honestidad y tu capacidad de razonamiento que a un sabelotodo que inventa respuestas.*"
  },
  {
    q: "4. ¿Qué preguntas deberías hacerle tú al entrevistador al final?",
    category: "Estrategia",
    tip: "Demuestra interés real y evalúa si es una buena empresa para ti.",
    answer: "• Cultura técnica: '¿Cómo es el flujo de desarrollo de una funcionalidad desde que se planea hasta que se hace deploy?'\n• Equipo y crecimiento: '¿Cómo evalúan el éxito en este rol a los 3 y 6 meses?'\n• Desafíos actuales: '¿Cuál es el mayor desafío técnico que el equipo está tratando de resolver en este momento?'\n• Colaboración: '¿Cómo manejan la revisión de código y la toma de decisiones arquitectónicas en el día a día?'"
  }
];

export default function BusquedaTrabajo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [checklistState, setChecklistState] = useState({});
  const [revealedCards, setRevealedCards] = useState({});

  // Cargar checklist de localStorage al montar el componente
  useEffect(() => {
    try {
      const saved = localStorage.getItem("job_checklist_apuntes");
      if (saved) {
        setChecklistState(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error al cargar localStorage", e);
    }
  }, []);

  // Guardar checklist en localStorage cuando cambie
  const handleChecklistChange = (id) => {
    const newState = {
      ...checklistState,
      [id]: !checklistState[id]
    };
    setChecklistState(newState);
    try {
      localStorage.setItem("job_checklist_apuntes", JSON.stringify(newState));
    } catch (e) {
      console.error("Error al guardar localStorage", e);
    }
  };

  const handleResetChecklist = () => {
    setChecklistState({});
    try {
      localStorage.removeItem("job_checklist_apuntes");
    } catch (e) {
      console.error("Error al limpiar localStorage", e);
    }
  };

  const toggleCard = (index) => {
    setRevealedCards({
      ...revealedCards,
      [index]: !revealedCards[index]
    });
  };

  // Filtrado de herramientas
  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calcular porcentaje del checklist
  const totalItems = CHECKLIST_ITEMS.length;
  const completedItems = Object.values(checklistState).filter(Boolean).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <NoteLayout
      title="Búsqueda de Trabajo y Herramientas"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Empleabilidad", "CV", "LinkedIn", "Entrevistas", "Freelance", "Herramientas"]}
      previousNote={{ label: "Testing de Software", path: "/DesarrolloSoftware/Testing" }}
      icon={Briefcase}
    >
      <div className="callout">
        Conseguir tu primer empleo en tecnología o dar el salto a un rol de mayor nivel no depende únicamente de tus
        habilidades técnicas. Saber estructurar tu currículum, optimizar tu perfil profesional, buscar en las plataformas correctas
        y practicar entrevistas técnicas es el 50% de la ecuación para tener éxito.
      </div>

      <h2>1. El Ecosistema de Herramientas Tech</h2>
      <p>
        Para facilitarte el camino, hemos recopilado y categorizado herramientas esenciales para preparar tu CV,
        hacer un seguimiento de tus postulaciones, practicar código para pruebas técnicas o registrarte como freelance.
      </p>

      {/* Buscador y Filtros */}
      <div className="my-6 p-4 rounded-xl border border-white/8 bg-white/[0.02] flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Campo de búsqueda */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Buscar herramienta o skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
          />
        </div>

        {/* Botones de Categorías */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: "all", label: "Todas" },
            { id: "cv", label: "CV & LinkedIn" },
            { id: "jobs", label: "Bolsas de Trabajo" },
            { id: "freelance", label: "Freelance" },
            { id: "prep", label: "Entrevistas" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? "bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-[0_0_8px_var(--accent-glow)]"
                  : "border-white/8 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla de Herramientas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div
              key={tool.name}
              className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between ${
                tool.recommended
                  ? "border-[var(--accent-color)]/25 bg-[var(--accent-color)]/5 hover:border-[var(--accent-color)]/40 shadow-[0_4px_20px_var(--accent-glow)]"
                  : "border-white/8 bg-white/[0.02] hover:border-white/15"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-sm">{tool.name}</span>
                    {tool.recommended && (
                      <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full border border-[var(--accent-color)]/30 bg-[var(--accent-color)]/10 text-[var(--accent-text)] font-black">
                        <Sparkles size={9} /> Recomendado
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 bg-black/30 text-white/50">
                    {tool.cost}
                  </span>
                </div>
                <p className="text-xs text-white/65 leading-relaxed m-0 mb-3">{tool.desc}</p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 bg-white/5 text-white/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 hover:bg-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/30 text-white text-xs font-bold transition-all no-underline w-full"
                >
                  Visitar sitio
                  <ExternalLink size={11} className="text-white/70" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 py-10 text-center text-white/40 text-xs border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
            No se encontraron herramientas con esos criterios. Prueba otra búsqueda.
          </div>
        )}
      </div>

      <h2>2. Lista de Verificación para tus Postulaciones</h2>
      <p>
        Antes de postularte en frío a decenas de ofertas, asegúrate de cumplir con los estándares clave de la industria.
        Utiliza esta lista de verificación interactiva para preparar tus perfiles. Tu progreso se guardará automáticamente:
      </p>

      {/* Checklist Widget */}
      <div className="my-6 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckSquare size={18} className="text-[var(--accent-text)]" />
            <span className="font-black text-white text-sm">Estado de Preparación de Perfiles</span>
          </div>
          {completedItems > 0 && (
            <button
              onClick={handleResetChecklist}
              className="text-[10px] text-white/40 hover:text-[var(--accent-text)] font-bold transition-colors underline bg-transparent border-none cursor-pointer"
            >
              Reiniciar progreso
            </button>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-2.5 mb-5 overflow-hidden flex">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercent}%`,
              background: `linear-gradient(to right, var(--accent-color), var(--accent-text))`
            }}
          />
        </div>

        {/* Estadísticas de progreso */}
        <div className="flex items-center justify-between text-xs text-white/55 font-mono mb-4 border-b border-white/5 pb-2">
          <span>Tareas completadas: {completedItems} de {totalItems}</span>
          <span className="font-bold text-white">{progressPercent}%</span>
        </div>

        {/* Lista de elementos */}
        <div className="flex flex-col gap-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = !!checklistState[item.id];
            return (
              <div
                role="button"
                tabIndex={0}
                key={item.id}
                onClick={() => handleChecklistChange(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleChecklistChange(item.id);
                  }
                }}
                className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                  isChecked
                    ? "border-[var(--accent-color)]/25 bg-[var(--accent-color)]/5"
                    : "border-white/5 bg-black/20 hover:border-white/10"
                }`}
              >
                <div
                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? "bg-[var(--accent-color)] border-[var(--accent-color)] text-white"
                      : "border-white/30 text-transparent"
                  }`}
                >
                  <CheckCircle size={10} strokeWidth={3} className={isChecked ? "block" : "hidden"} />
                </div>
                <span className={`text-xs leading-relaxed transition-all ${isChecked ? "text-white/60 line-through" : "text-white/85"}`}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <h2>3. Simulador de Preguntas Frecuentes en Entrevistas</h2>
      <p>
        Las entrevistas técnicas y de comportamiento siguen ciertos patrones repetitivos. Practica estructurar tus
        respuestas haciendo clic en cada una de estas preguntas típicas para revelar el enfoque y la estructura recomendada.
      </p>

      {/* Simulador / Acordeón */}
      <div className="my-6 flex flex-col gap-3">
        {INTERVIEW_QUESTIONS.map((item, index) => {
          const isRevealed = !!revealedCards[index];
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isRevealed
                  ? "border-[var(--accent-color)]/30 bg-white/[0.03]"
                  : "border-white/8 bg-white/[0.01] hover:border-white/15"
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleCard(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(index);
                  }
                }}
                className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer bg-transparent border-none"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase opacity-40 font-mono">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-white/90 leading-snug">
                    {item.q}
                  </span>
                </div>
                <div className="shrink-0 text-white/40">
                  {isRevealed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {isRevealed && (
                <div className="px-4 pb-4 pt-1 border-t border-white/5 bg-black/40">
                  <div className="flex items-center gap-1.5 p-2 rounded border border-amber-500/15 bg-amber-500/5 mb-3 text-[10px] text-amber-300 font-bold">
                    <Info size={12} className="shrink-0" />
                    Consejo clave: {item.tip}
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed font-sans whitespace-pre-line">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h2>4. Consejos Esenciales para Destacar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center">
              <Award size={16} className="text-[var(--accent-text)]" />
            </div>
            <span className="font-bold text-white text-xs">Portafolio sobre Currículum</span>
          </div>
          <p className="text-[11px] text-white/60 leading-relaxed m-0">
            Un recruiter en tech valora enormemente ver código real. Construye una app útil de extremo a extremo, documenta
            su arquitectura en el README, incluye capturas de pantalla y añade un enlace donde se pueda probar.
            Es mil veces mejor tener 2 proyectos excepcionales que 10 copias de tutoriales de YouTube.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center">
              <Globe size={16} className="text-[var(--accent-text)]" />
            </div>
            <span className="font-bold text-white text-xs">El Idioma es un Multiplicador</span>
          </div>
          <p className="text-[11px] text-white/60 leading-relaxed m-0">
            El inglés técnico no solo duplica o triplica los salarios a los que puedes acceder mediante trabajo remoto global,
            sino que además te da acceso a más del 90% de la documentación, libros y comunidades. Invierte tiempo en
            mejorar tu inglés conversacional tanto como en aprender frameworks nuevos.
          </p>
        </div>
      </div>
    </NoteLayout>
  );
}
