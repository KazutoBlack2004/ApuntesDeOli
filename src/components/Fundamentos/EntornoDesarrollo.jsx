import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Laptop, 
  Settings, 
  Terminal, 
  CheckCircle,
  ExternalLink,
  Workflow
} from "lucide-react";

const WORKFLOW_PROFILES = {
  vicoder: {
    name: "Desarrollo con Agentes de IA (Vicoding / Low-Code)",
    description: "Para quienes crean SaaS, MVPs y aplicaciones web completas apoyándose fuertemente en agentes de inteligencia artificial y automatizaciones.",
    editor: "Cursor o VS Code + Antigravity",
    aiTools: "Agentes autónomos capaces de leer el workspace, ejecutar comandos en terminal y depurar de forma iterativa.",
    extensions: [
      "ESLint (Detección de errores del código de la IA en tiempo real)",
      "Prettier (Formateo automático de sintaxis para que el código quede prolijo)",
      "GitLens (Control de historial de cambios generados por la IA)"
    ],
    mcpServers: [
      "StitchMCP (Para diseñar y regenerar pantallas desde texto)",
      "TestSprite (Para crear suites de testing automáticas)",
      "GitHub MCP (Para empujar código a repositorios automáticamente)"
    ],
    proTip: "Los agentes son excelentes planificando, pero debes darles directrices estéticas (estilos de UI) y de seguridad (variables de entorno) para que el resultado final sea profesional."
  },
  frontend: {
    name: "Desarrollo Web Frontend",
    description: "Enfocado en crear interfaces visuales modernas, animaciones fluidas y experiencias de usuario interactivas (React, Astro, Vue, HTML/CSS).",
    editor: "VS Code (Visual Studio Code)",
    aiTools: "GitHub Copilot (para autocompletado en línea veloz) o Supermaven.",
    extensions: [
      "Tailwind CSS IntelliSense (Autocompletado de clases de diseño)",
      "Auto Rename Tag (Cambia etiquetas HTML de cierre al editar la de apertura)",
      "Color Highlight (Muestra el color real sobre los códigos Hex/RGB en el código)",
      "Live Server (Servidor de desarrollo local con recarga en vivo)"
    ],
    mcpServers: [
      "Hero-UI (Acceso rápido a componentes y documentación oficial de estilos)",
      "Chrome DevTools MCP (Inspección remota de la consola del navegador)"
    ],
    proTip: "Configura tu editor con una fuente monoespaciada con ligaduras como 'Fira Code' o 'JetBrains Mono' para leer combinaciones como '=>' o '===' de forma mucho más natural."
  },
  backend: {
    name: "Backend y Ciencia de Datos (Python / SQL)",
    description: "Diseño de servidores, APIs REST, bases de datos y scripts de procesamiento de datos.",
    editor: "VS Code o PyCharm / Datalore",
    aiTools: "Claude / ChatGPT en panel lateral para explicar algoritmos y optimizar consultas complejas.",
    extensions: [
      "Python extension bundle (Depurador y formateador de Python)",
      "Database Client (Para consultar PostgreSQL, MySQL o SQLite directo en el editor)",
      "Thunder Client o Postman (Para probar endpoints HTTP sin salir de la app)"
    ],
    mcpServers: [
      "Context7 (Para resolver dependencias y consultar librerías en tiempo de desarrollo)",
      "SQL Database MCP (Para explorar esquemas de bases de datos locales de forma segura)"
    ],
    proTip: "Al programar backend, mantén abierta una consola de logs con recarga activa (como nodemon o uvicorn) para detectar de inmediato errores de conexión o inyecciones de datos."
  }
};

export default function EntornoDesarrollo() {
  const [profile, setProfile] = useState("vicoder");

  const pData = WORKFLOW_PROFILES[profile];

  return (
    <NoteLayout
      title="Entorno de Desarrollo: Editores, IDEs y Agentes de IA"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["Editores", "IDE", "Model Context Protocol", "Agentes de IA", "VS Code", "Cursores"]}
      nextNote={{ label: "Unidades de información", path: "/Fundamentos/UnidadesDeInformacion" }}
    >
      <div className="callout">
        Un <strong>Entorno de Desarrollo</strong> es el conjunto de herramientas digitales estructuradas y configuradas 
        que permiten a un programador escribir, depurar, testear y desplegar código con comodidad y eficiencia.
      </div>

      <h2>1. Editores de Código vs. IDEs</h2>
      <p>
        Para programar, necesitas un software donde escribir las líneas de código. Se dividen en dos categorías principales:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        {/* Code Editor */}
        <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
          <span className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
            <Laptop size={16} />
            <Term id="editor_codigo">Editor de Código (Lightweight)</Term>
          </span>
          <p className="text-xs text-white/70 leading-relaxed m-0">
            Es un software ligero y extremadamente rápido. Inicia como un bloc de notas glorificado con resaltado de sintaxis, 
            pero se expande mediante un sistema de extensiones/plugins instalables. 
          </p>
          <div className="text-[11px] font-mono text-white/50 bg-black/30 p-2 rounded border border-white/5 mt-1">
            <strong>Ejemplo Rey:</strong> Visual Studio Code (VS Code), Sublime Text.
          </div>
        </div>

        {/* IDE */}
        <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <Settings size={16} />
            <Term id="ide">IDE (Integrated Development Environment)</Term>
          </span>
          <p className="text-xs text-white/70 leading-relaxed m-0">
            Es una suite gigante todo-en-uno que viene pre-configurada con compiladores, analizadores estáticos de código, 
            diseñadores visuales, gestores de bases de datos y herramientas de testing integradas para un ecosistema específico.
          </p>
          <div className="text-[11px] font-mono text-white/50 bg-black/30 p-2 rounded border border-white/5 mt-1">
            <strong>Ejemplos:</strong> IntelliJ (Java), PyCharm (Python), Xcode (iOS/Swift), Visual Studio (C#/.NET).
          </div>
        </div>
      </div>

      <h2>2. La Revolución de la Inteligencia Artificial</h2>
      <p>
        El entorno de desarrollo moderno ya no solo consta de autocompletado básico. Ahora se integra con inteligencia artificial, 
        dividida según su nivel de autonomía:
      </p>
      
      <ul>
        <li>
          <strong>Copilotos (Autocompletado Inline):</strong> Leen las líneas de código que estás escribiendo y predicen de forma instantánea 
          la siguiente línea o bloque de código en un color gris difuso. Se activan con la tecla <code>Tab</code>. 
          Ejemplos: <em>GitHub Copilot, Supermaven, Tabnine</em>.
        </li>
        <li>
          <strong><Term id="agente_ia">Agentes de IA (Agentes Autónomos)</Term>:</strong> Herramientas avanzadas que tienen acceso total a tu workspace, 
          pueden leer/escribir archivos, planificar tareas complejas y ejecutar comandos de terminal de forma independiente (siempre bajo tu supervisión y aprobación). 
          Ejemplos: <em>Cursor, Windsurf, y el Agente Antigravity de DeepMind</em>.
        </li>
      </ul>

      <h2>3. Model Context Protocol (MCP): El Estándar de Conectividad</h2>
      <p>
        Uno de los mayores avances para los agentes de IA es el <strong><Term id="mcp">Model Context Protocol (MCP)</Term></strong>. 
        Creado como un estándar abierto, permite conectar servidores de herramientas locales o en la nube directamente a la IA.
      </p>
      
      <div className="p-4 rounded-xl border border-pink-500/10 bg-pink-500/[0.02] flex gap-3.5 my-4">
        <Workflow className="text-pink-400 shrink-0 mt-0.5" size={18} />
        <div>
          <span className="text-xs font-bold text-pink-400 block mb-1">¿Cómo funciona el MCP?</span>
          <p className="text-xs text-white/60 leading-relaxed m-0">
            En lugar de que cada agente de IA tenga que escribir su propio código para conectarse con bases de datos SQL, con GitHub, 
            o con APIs específicas, un <strong>Servidor MCP</strong> expone un conjunto de "herramientas" (tools) bajo un protocolo común. 
            El Agente puede ver y llamar a estas herramientas para obtener datos o interactuar con servicios externos de manera segura.
          </p>
        </div>
      </div>

      <h2>4. Configura tu Entorno de Trabajo Ideal</h2>
      <p>
        Para programar con absoluta comodidad y maximizar tu velocidad, selecciona tu perfil de desarrollo abajo y 
        configura tu editor basándote en la combinación recomendada:
      </p>

      {/* Profile Selector Configurator */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        
        {/* Selector Tabs */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {Object.entries(WORKFLOW_PROFILES).map(([key, value]) => {
            const isActive = profile === key;
            return (
              <button
                key={key}
                onClick={() => setProfile(key)}
                className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                  isActive 
                    ? "border-pink-500 bg-white/[0.02] text-white" 
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {key === "vicoder" ? "Agentes e IA" : key === "frontend" ? "Frontend Web" : "Backend & Datos"}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className="p-6 flex flex-col gap-4 font-sans text-xs">
          
          <div>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-1">
              Perfil Seleccionado
            </span>
            <h3 className="font-extrabold text-white text-base m-0 mb-1">{pData.name}</h3>
            <p className="text-white/60 m-0 leading-relaxed">{pData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            
            {/* Left side settings */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-white/5">
                <span className="font-bold text-white block mb-1 text-[11px] uppercase tracking-wider text-sky-400">Editor Recomendado</span>
                <span className="text-white/80 font-semibold">{pData.editor}</span>
              </div>
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-white/5">
                <span className="font-bold text-white block mb-1 text-[11px] uppercase tracking-wider text-emerald-400">Herramientas e IA sugerida</span>
                <span className="text-white/75 leading-relaxed block">{pData.aiTools}</span>
              </div>
            </div>

            {/* Right side settings */}
            <div className="p-4 rounded-lg bg-neutral-900 border border-white/5 flex flex-col gap-2">
              <span className="font-bold text-white text-[11px] uppercase tracking-wider text-pink-400">Extensiones Clave</span>
              <ul className="list-disc pl-4 space-y-1 text-white/70 m-0">
                {pData.extensions.map((ext, idx) => (
                  <li key={idx}>{ext}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* MCP list if any */}
          <div className="p-4 rounded-xl border border-pink-500/10 bg-pink-500/[0.01]">
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block mb-2">Servidores MCP de Utilidad para este Perfil</span>
            <div className="flex flex-wrap gap-2">
              {pData.mcpServers.map((srv, idx) => (
                <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded border border-pink-500/15 bg-pink-500/5 text-pink-300">
                  {srv}
                </span>
              ))}
            </div>
          </div>

          {/* ProTip */}
          <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/10 flex gap-2">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-[9px] mt-0.5 shrink-0">Consejo Pro:</span>
            <span className="text-white/75 leading-relaxed text-[11px]">{pData.proTip}</span>
          </div>

        </div>

      </div>

      <h2>5. Checklist para Diseñar tu Entorno Cómodo</h2>
      <p>
        Para asegurar la máxima comodidad física y digital en tu día a día programando, cumple con estos requisitos:
      </p>
      <ul>
        <li>
          <strong>Tema Oscuro (Dark Mode):</strong> Evita la fatiga visual. Usa temas oscuros bien contrastados en tu editor (como One Dark Pro, Tokyo Night o GitHub Dark).
        </li>
        <li>
          <strong>Minimapa Desactivado o Compacto:</strong> Si tu pantalla es pequeña, ocultar el minimapa de código del editor te regala un 15% más de espacio para leer código horizontal.
        </li>
        <li>
          <strong>Format On Save (Guardar y Formatear):</strong> Activa esta opción en los ajustes de tu editor para que al guardar (Ctrl+S / Cmd+S), el plugin de Prettier alinee automáticamente corchetes, indentaciones y comillas.
        </li>
      </ul>
    </NoteLayout>
  );
}
