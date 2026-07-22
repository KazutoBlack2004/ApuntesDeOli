import React, { useState, useEffect } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  GitCommit, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Check, 
  Info,
  Terminal,
  FolderOpen,
  RefreshCw
} from "lucide-react";

const COMMIT_TYPES = [
  { value: "feat", label: "feat", desc: "Nueva funcionalidad para el usuario" },
  { value: "fix", label: "fix", desc: "Resolución de un error (bug)" },
  { value: "docs", label: "docs", desc: "Cambios en la documentación" },
  { value: "style", label: "style", desc: "Formato, punto y coma, espacios (sin cambio de lógica)" },
  { value: "refactor", label: "refactor", desc: "Reestructuración de código (sin corregir bug ni añadir feat)" },
  { value: "test", label: "test", desc: "Añadir o corregir pruebas (tests)" },
  { value: "chore", label: "chore", desc: "Tareas de mantenimiento, actualizar dependencias" },
  { value: "perf", label: "perf", desc: "Cambios de código que mejoran el rendimiento" },
  { value: "ci", label: "ci", desc: "Configuración de CI/CD (GitHub Actions, scripts, etc.)" }
];

const PAST_TENSE_WORDS = [
  "agregue", "agregó", "agrego", "cree", "creo", "creó", "corregi", "corrigio", 
  "modifique", "modifico", "modificó", "actualice", "actualizo", "actualizó", 
  "borre", "borro", "borró", "elimine", "elimino", "eliminó", "arregle", 
  "arregló", "added", "fixed", "updated", "created", "deleted", "removed"
];

const GIT_COMMANDS = {
  conceptos: {
    title: "Las 3 Áreas de Git",
    desc: "Git gestiona tus archivos dividiendo el flujo en tres áreas de almacenamiento locales antes de subirlos a la nube (Repositorio Remoto):",
    cmdList: [
      {
        name: "1. Directorio de Trabajo (Working Directory)",
        summary: "Son los archivos físicos que ves y editas en tu editor (VS Code). Los cambios aquí están en estado 'Modificado' (Modified).",
        syntax: "Archivos locales listos para ser preparados."
      },
      {
        name: "2. Área de Preparación (Staging Area)",
        summary: "Un archivo temporal ('index') que actúa como borrador. Aquí seleccionas qué cambios irán en tu siguiente foto histórica. Estado: 'Preparado' (Staged).",
        syntax: "git add <archivo>"
      },
      {
        name: "3. Repositorio Local (.git)",
        summary: "La base de datos donde Git guarda las fotos históricas definitivas (commits) con su autor, fecha y mensaje descriptivo. Estado: 'Confirmado' (Committed).",
        syntax: "git commit -m \"mensaje\""
      }
    ]
  },
  inicializar: {
    title: "Iniciar y Clonar",
    desc: "Comandos para iniciar un repositorio desde cero o descargar uno existente desde plataformas como GitHub:",
    cmdList: [
      {
        name: "git init",
        summary: "Inicializa un repositorio Git local vacío en la carpeta actual. Crea la carpeta oculta `.git`.",
        syntax: "git init",
        mockLog: "Initialized empty Git repository in C:/mi-proyecto/.git/"
      },
      {
        name: "git clone <url>",
        summary: "Descarga un repositorio completo de la web (GitHub) a tu máquina local, incluyendo todas sus ramas y el historial de commits.",
        syntax: "git clone https://github.com/usuario/repo.git",
        mockLog: "Cloning into 'repo'...\nremote: Enumerating objects: 24, done.\nremote: Counting objects: 100% (24/24), done.\nUnpacking objects: 100% (24/24), 3.42 KiB | 205.00 KiB/s, done."
      }
    ]
  },
  guardar: {
    title: "Registrar y Guardar",
    desc: "Comandos diarios para preparar archivos en el borrador y confirmar los cambios en la historia:",
    cmdList: [
      {
        name: "git status",
        summary: "Muestra el estado de los archivos: cuáles han sido modificados, cuáles están listos en Staging y cuáles no están siendo rastreados (untracked).",
        syntax: "git status",
        mockLog: "On branch main\nChanges not staged for commit:\n  (use \"git add <file>...\" to update)\n\tmodified:   index.html\n\nno changes added to commit (use \"git add\")"
      },
      {
        name: "git add <archivo>",
        summary: "Mueve un archivo modificado del Directorio de Trabajo al Área de Preparación (Staging). Si usas `git add .` preparas TODOS los archivos modificados a la vez.",
        syntax: "git add index.html  # o git add .",
        mockLog: "# Archivos movidos a staging. Al ejecutar 'git status' aparecerán en verde."
      },
      {
        name: "git commit -m <mensaje>",
        summary: "Registra los cambios en el historial del repositorio local. El mensaje describe de manera corta qué hace el commit.",
        syntax: "git commit -m \"feat: agrega soporte para login\"",
        mockLog: "[main 4b7a2d1] feat: agrega soporte para login\n 1 file changed, 12 insertions(+)\n create mode 100644 index.html"
      }
    ]
  },
  ramas: {
    title: "Ramas y Fusión (Branches)",
    desc: "Las ramas te permiten bifurcar el código para experimentar o desarrollar funciones en paralelo sin alterar el código estable (producción):",
    cmdList: [
      {
        name: "git branch",
        summary: "Muestra la lista de ramas locales. La rama con un asterisco `*` y color verde es la rama activa.",
        syntax: "git branch  # o git branch <nombre-nueva-rama> para crear una",
        mockLog: "  desarrollo-login\n* main\n  refactor-ui"
      },
      {
        name: "git checkout <rama>",
        summary: "Cambia de la rama actual a la rama especificada. También puedes usar `git switch <rama>`.",
        syntax: "git checkout desarrollo-login",
        mockLog: "Switched to branch 'desarrollo-login'\nYour branch is up to date."
      },
      {
        name: "git merge <rama>",
        summary: "Fusiona los cambios de la rama especificada dentro de tu rama actual activa (generalmente te paras en `main` y traes cambios de otra rama).",
        syntax: "git merge desarrollo-login",
        mockLog: "Updating 4b7a2d1..8c92a10\nFast-forward\n index.html | 8 +++++++-\n 1 file changed, 7 insertions(+), 1 deletion(-)"
      }
    ]
  },
  sincronizar: {
    title: "Sincronización con Remoto",
    desc: "Comandos para enviar y recibir confirmaciones entre tu repositorio local en tu máquina y el servidor remoto (GitHub):",
    cmdList: [
      {
        name: "git push origin <rama>",
        summary: "Sube todos tus commits locales guardados en la rama seleccionada hacia el repositorio remoto (origin).",
        syntax: "git push origin main",
        mockLog: "Enumerating objects: 5, done.\nWriting objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.\nTo https://github.com/usuario/repo.git\n   4b7a2d1..8c92a10  main -> main"
      },
      {
        name: "git pull",
        summary: "Descarga los nuevos cambios del repositorio remoto y los fusiona directamente en tu rama local activa (mantiene tu código actualizado con tus compañeros).",
        syntax: "git pull",
        mockLog: "remote: Enumerating objects: 6, done.\nUnpacking objects: 100% (4/4), done.\nFrom https://github.com/usuario/repo.git\n   8c92a10..f32a11b  main       -> origin/main\nUpdating 8c92a10..f32a11b\nFast-forward"
      }
    ]
  }
};

export default function ConvencionesCommits() {
  const [gitTab, setGitTab] = useState("conceptos");
  
  // States for Commit Builder
  const [type, setType] = useState("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);
  const [breakingDescription, setBreakingDescription] = useState("");
  const [footer, setFooter] = useState("");
  const [copied, setCopied] = useState(false);

  const [warnings, setWarnings] = useState([]);
  const [commitMessage, setCommitMessage] = useState("");

  // Compile commit message and run validations
  useEffect(() => {
    let header = type;
    if (scope.trim()) {
      header += `(${scope.trim().toLowerCase()})`;
    }
    if (isBreaking) {
      header += "!";
    }
    header += `: ${description.trim()}`;

    let fullMessage = header;
    if (body.trim()) {
      fullMessage += `\n\n${body.trim()}`;
    }
    if (isBreaking && breakingDescription.trim()) {
      fullMessage += `\n\nBREAKING CHANGE: ${breakingDescription.trim()}`;
    }
    if (footer.trim()) {
      fullMessage += `\n\n${footer.trim()}`;
    }

    setCommitMessage(fullMessage);

    // Validations
    const newWarnings = [];
    if (!description.trim()) {
      newWarnings.push({ type: "error", msg: "La descripción corta es obligatoria." });
    } else {
      // 1. Header Length
      if (header.length > 50) {
        newWarnings.push({ 
          type: "warning", 
          msg: `La cabecera tiene ${header.length} caracteres. Se recomienda mantenerla bajo los 50 caracteres para evitar que se corte en interfaces de Git.` 
        });
      }
      
      // 2. Uppercase at start
      const firstChar = description.trim().charAt(0);
      if (firstChar === firstChar.toUpperCase() && /[a-zA-Z]/.test(firstChar)) {
        newWarnings.push({ 
          type: "tip", 
          msg: "En Conventional Commits, la descripción suele empezar con minúscula." 
        });
      }

      // 3. Ending dot
      if (description.trim().endsWith(".")) {
        newWarnings.push({ 
          type: "tip", 
          msg: "Evita colocar un punto final al final de la descripción corta." 
        });
      }

      // 4. Past tense verb check
      const firstWord = description.trim().split(" ")[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (PAST_TENSE_WORDS.includes(firstWord)) {
        newWarnings.push({
          type: "warning",
          msg: `Verbo en pasado detectado ('${description.trim().split(" ")[0]}'). Usa el tiempo imperativo presente (ej: 'agrega' en vez de 'agregué' o 'agregó').`
        });
      }
    }

    setWarnings(newWarnings);
  }, [type, scope, description, body, isBreaking, breakingDescription, footer]);

  const handleCopy = () => {
    navigator.clipboard.writeText(commitMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveTypeDetails = () => {
    return COMMIT_TYPES.find(t => t.value === type) || COMMIT_TYPES[0];
  };

  return (
    <NoteLayout
      title="Git y Convenciones de Commits"
      category="Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Git", "Control de Versiones", "Commits Semánticos", "Colaboración"]}
      nextNote={{ label: "Programación Orientada a Objetos", path: "/DesarrolloSoftware/POO" }}
    >
      <div className="callout" style={{ borderLeftColor: "#3b82f6", backgroundColor: "rgba(59,130,246,0.06)" }}>
        <strong>Git</strong> es el sistema de control de versiones distribuido más utilizado en la industria del software. 
        Permite registrar el historial de cambios del código, volver a estados anteriores y colaborar con otros desarrolladores sin pisarse el trabajo.
      </div>

      <h2>¿Qué es Git y cómo funciona?</h2>
      <p>
        A diferencia de guardar archivos manualmente como <em>"proyecto_final_v2_definitivo.zip"</em>, Git toma 
        <strong>instantáneas históricas (commits)</strong> de tu proyecto. Para entender cómo gestiona tus cambios localmente, 
        debemos estudiar las 3 áreas de trabajo.
      </p>

      {/* Git Area flow chart (Visually premium) */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 shadow-xl my-6 flex flex-col items-center">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-4 font-sans text-center">
          Flujo de Trabajo Local de Git
        </span>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full text-xs font-mono">
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-center min-w-[140px]">
            <span className="text-white block font-bold">Working Directory</span>
            <span className="text-white/40 text-[10px]">Archivos Modificados</span>
          </div>

          <div className="flex flex-col items-center text-cyan-400 text-[10px]">
            <span>git add .</span>
            <span>───►</span>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-500/10 bg-amber-500/5 text-center min-w-[140px]">
            <span className="text-amber-400 block font-bold">Staging Area</span>
            <span className="text-amber-400/40 text-[10px]">Borrador Preparado</span>
          </div>

          <div className="flex flex-col items-center text-emerald-400 text-[10px]">
            <span>git commit</span>
            <span>───►</span>
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-center min-w-[140px]">
            <span className="text-emerald-400 block font-bold">Local Repo (.git)</span>
            <span className="text-emerald-400/40 text-[10px]">Instantáneas Guardadas</span>
          </div>
        </div>
      </div>

      <h2>Explorador de Comandos Git</h2>
      <p>
        Selecciona una de las categorías para explorar los comandos fundamentales de Git, sus descripciones y 
        cómo se ven sus salidas reales en la terminal de comandos:
      </p>

      {/* Git Command Explorer Widget */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/90 overflow-hidden shadow-2xl my-6 flex flex-col font-sans">
        
        {/* Explorer Tabs Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-4 py-3 flex flex-wrap gap-2">
          {Object.entries(GIT_COMMANDS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setGitTab(key)}
              className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                gitTab === key
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {value.title}
            </button>
          ))}
        </div>

        {/* Explorer Content */}
        <div className="p-5 flex flex-col gap-4 min-h-[260px] bg-black/10">
          <div>
            <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5 m-0">
              <FolderOpen size={16} className="text-blue-400" />
              {GIT_COMMANDS[gitTab].title}
            </h3>
            <p className="text-xs text-white/60 leading-relaxed m-0">
              {GIT_COMMANDS[gitTab].desc}
            </p>
          </div>

          {/* Commands detailed list */}
          <div className="space-y-4">
            {GIT_COMMANDS[gitTab].cmdList.map((cmd, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/5 pb-2">
                  <strong className="text-xs font-mono text-cyan-400 bg-cyan-400/5 px-2 py-0.5 rounded-md border border-cyan-400/10">
                    {cmd.syntax}
                  </strong>
                  <span className="text-[11px] font-sans font-bold text-white/70">
                    {cmd.name}
                  </span>
                </div>
                <p className="text-xs text-white/60 m-0 leading-relaxed">
                  {cmd.summary}
                </p>

                {/* Mock logs Terminal box */}
                {cmd.mockLog && (
                  <div className="mt-2.5 rounded-lg overflow-hidden border border-white/5 shadow-inner">
                    <div className="bg-neutral-900 px-3 py-1.5 flex items-center justify-between border-b border-white/5 text-[9px] font-mono text-white/30">
                      <span>Terminal Output</span>
                    </div>
                    <pre className="m-0 p-3 bg-black/80 font-mono text-[10.5px] text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                      {cmd.mockLog}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <h2>Escribir Buenos Commits: Conventional Commits</h2>
      <p>
        Una vez que dominas el flujo de Git y sabes cómo preparar tus archivos (<code>git add</code>), llega el paso de 
        guardar el commit (<code>git commit</code>). Escribir un mensaje desestructurado como <em>"arreglado"</em> o 
        <em>"cambios"</em> hace que el historial sea inservible. Para resolver esto se creó el estándar **Conventional Commits**.
      </p>

      <h3>Estructura del Mensaje</h3>
      <pre className="m-0 p-4 bg-neutral-900 border border-white/5 rounded-xl text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto">
{`<tipo>(<alcance-opcional>): <descripción-corta-en-presente>

[cuerpo-de-explicacion-detallada-opcional]

[pie-de-pagina-opcional-con-referencias-a-issues]`}
      </pre>

      <p>
        <strong>Tipos de prefijos recomendados:</strong>
        <ul>
          <li><code>feat</code>: Para agregar nuevas características (ej: <code>feat(auth): agrega autenticacion google</code>).</li>
          <li><code>fix</code>: Para corregir errores o fallos en el código (ej: <code>fix(api): resuelve timeout de conexion</code>).</li>
          <li><code>docs</code>: Documentación exclusivamente (ej: <code>docs: actualiza instrucciones en readme</code>).</li>
          <li><code>style</code>: Formato de código, punto y coma, espacios (no cambia lógica).</li>
          <li><code>refactor</code>: Reestructurar código sin añadir funciones ni reparar bugs (ej: modularizar un archivo grande).</li>
          <li><code>test</code>: Añadir pruebas de testing que faltaban.</li>
          <li><code>chore</code>: Cambios en herramientas de construcción o dependencias de paquetes (ej: actualizar npm).</li>
        </ul>
      </p>

      <h2>Generador Interactivo de Commits Semánticos</h2>
      <p>
        Utiliza el siguiente editor visual para construir tus mensajes de commit de manera correcta. El validador 
        revisará en vivo las reglas de estilo (longitud, comas, minúsculas, verbos en pasado) y te dará sugerencias automáticas.
      </p>

      {/* Commit Generator Widget */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950 overflow-hidden shadow-2xl my-6 flex flex-col font-sans">
        
        {/* Widget Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GitCommit className="text-blue-500 animate-pulse" size={18} />
            <h3 className="font-bold text-white text-sm m-0">Generador de Commit Semántico</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold uppercase tracking-wider">
            Git Helper
          </span>
        </div>

        {/* Builder Layout */}
        <div className="flex flex-col lg:flex-row min-h-[460px] w-full">
          
          {/* Left panel: Form Controls (45% width on desktop) */}
          <div className="w-full lg:w-[45%] p-5 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/15 flex flex-col gap-4">
            
            {/* Input Row: Type & Scope */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                  Tipo de Commit
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {COMMIT_TYPES.map(t => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                  Alcance / Scope <span className="text-[8px] font-normal text-white/20">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="ej: auth, ui, api"
                  value={scope}
                  onChange={(e) => setScope(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Type helper box */}
            <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10.5px] text-blue-300 leading-normal flex items-start gap-1.5">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>
                <strong>{getActiveTypeDetails().label}:</strong> {getActiveTypeDetails().desc}.
              </span>
            </div>

            {/* Input: Description */}
            <div>
              <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                Descripción Corta <span className="text-[8px] font-normal text-white/25">(imperativo presente, ej: agrega login)</span>
              </label>
              <input
                type="text"
                placeholder="ej: agrega soporte para autenticacion oauth"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Checkbox: Breaking Change */}
            <label className="flex items-center gap-2 px-3 py-2 border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="accent-rose-500"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-rose-300">¿Es un Cambio Disruptivo (Breaking Change)?</span>
                <span className="text-[9px] text-rose-400/70">Rompe la compatibilidad hacia atrás e incrementa la versión mayor</span>
              </div>
            </label>

            {/* Input: Breaking Change Description */}
            {isBreaking && (
              <div>
                <label className="block text-[10px] text-rose-400 uppercase font-bold tracking-wider mb-1">
                  Explicación de Ruptura (Requerida en BREAKING CHANGE)
                </label>
                <input
                  type="text"
                  placeholder="ej: la firma del metodo cambio de login(u) a login(u, p)"
                  value={breakingDescription}
                  onChange={(e) => setBreakingDescription(e.target.value)}
                  className="w-full bg-neutral-900 border border-rose-500/20 rounded-lg px-2.5 py-1.5 text-xs text-rose-300 focus:outline-none focus:border-rose-500"
                />
              </div>
            )}

            {/* Input: Optional Body & Footer */}
            <div>
              <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                Cuerpo de Detalles <span className="text-[8px] font-normal text-white/20">(opcional)</span>
              </label>
              <textarea
                placeholder="Explicación detallada de por qué se hizo este cambio..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={2}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                style={{ resize: "none" }}
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">
                Pie de página / Footer <span className="text-[8px] font-normal text-white/20">(opcional, referencias a Jira o issues)</span>
              </label>
              <input
                type="text"
                placeholder="ej: Closes #123, Fixes #44"
                value={footer}
                onChange={(e) => setFooter(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

          </div>

          {/* Right panel: Live Message & Audits (55% width on desktop) */}
          <div className="flex-1 p-5 flex flex-col justify-between bg-black/25">
            
            {/* Live Message compiled code */}
            <div>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">
                Mensaje de Commit Generado
              </span>
              
              <div className="relative">
                <pre className="m-0 p-4 bg-neutral-950 border border-white/5 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto min-h-[140px] whitespace-pre-wrap leading-relaxed">
                  {commitMessage || "\n(Escribe una descripción corta para previsualizar el commit)"}
                </pre>
                
                {description.trim() && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-2.5 right-2.5 cursor-pointer p-2 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    title="Copiar mensaje al portapapeles"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            </div>

            {/* Audits Box */}
            <div className="mt-5 border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2.5">
                Auditoría Semántica del Formato
              </span>

              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {warnings.length === 0 ? (
                  <div className="p-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 text-emerald-400 flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle size={15} />
                    ¡Sintaxis impecable! Listo para el comando git commit.
                  </div>
                ) : (
                  warnings.map((warning, i) => (
                    <div 
                      key={i} 
                      className={`p-2.5 rounded-xl border flex items-start gap-2 text-[11px] leading-snug ${
                        warning.type === "error" 
                          ? "border-rose-500/20 bg-rose-500/5 text-rose-400" 
                          : warning.type === "warning"
                          ? "border-amber-500/20 bg-amber-500/5 text-amber-450"
                          : "border-blue-500/10 bg-blue-500/5 text-blue-300"
                      }`}
                    >
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{warning.msg}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      <h2>¿Cómo aplicar el commit en tu terminal?</h2>
      <p>
        Una vez copiado el mensaje de commit generado, puedes aplicarlo directamente en tu terminal:
      </p>
      <pre className="m-0 p-4 bg-neutral-900 border border-white/5 rounded-xl text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto">
git commit -m "{commitMessage.split('\n')[0]}"
      </pre>
      <p className="mt-2 text-xs text-white/50">
        <em>Nota:</em> Si tu commit contiene cuerpo de descripción largo o pies de página (varias líneas), se recomienda ejecutar simplemente <code>git commit</code>. Esto abrirá tu editor de texto predeterminado de consola (ej: VS Code o Vim), donde podrás pegar el mensaje de commit completo en varias líneas, guardar y cerrar el editor para procesar el commit.
      </p>
    </NoteLayout>
  );
}
