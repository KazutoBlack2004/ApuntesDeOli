import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Terminal as TerminalIcon, 
  FileCode, 
  Folder, 
  Play, 
  Plus, 
  Trash2,
  Server
} from "lucide-react";

const INITIAL_PACKAGE_JSON = {
  name: "mi-proyecto",
  version: "1.0.0",
  description: "Mi primer proyecto web",
  scripts: {
    dev: "astro dev",
    build: "astro build"
  },
  dependencies: {}
};

export default function QueEsNPM() {
  const [pkgJson, setPkgJson] = useState(INITIAL_PACKAGE_JSON);
  const [nodeModules, setNodeModules] = useState([]);
  const [logs, setLogs] = useState([
    "Microsoft Windows [Versión 10.0.22631]",
    "(c) Microsoft Corporation. Todos los derechos reservados.",
    "",
    "C:\\Users\\oli\\mi-proyecto> ",
  ]);
  const [loading, setLoading] = useState(false);
  const terminalBodyRef = React.useRef(null);

  // Auto scroll terminal logs (only internal container, does not scroll main page)
  React.useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const addLogLines = (newLines, delay = 0, onComplete = null) => {
    if (delay === 0) {
      setLogs(prev => {
        const withoutPrompt = prev.slice(0, -1);
        return [...withoutPrompt, ...newLines, "", "C:\\Users\\oli\\mi-proyecto> "];
      });
      if (onComplete) onComplete();
    } else {
      setLoading(true);
      newLines.forEach((line, index) => {
        setTimeout(() => {
          setLogs(prev => {
            const withoutPrompt = prev.slice(0, -1);
            return [...withoutPrompt, line, ...(index === newLines.length - 1 ? ["", "C:\\Users\\oli\\mi-proyecto> "] : [])];
          });
          if (index === newLines.length - 1) {
            setLoading(false);
            if (onComplete) onComplete();
          }
        }, delay * (index + 1));
      });
    }
  };

  const handleCommand = (cmd) => {
    if (loading) return;

    // Echo command first
    setLogs(prev => {
      const withoutPrompt = prev.slice(0, -1);
      return [...withoutPrompt, `C:\\Users\\oli\\mi-proyecto> ${cmd}`];
    });

    if (cmd === "npm init") {
      const initLogs = [
        "This utility will walk you through creating a package.json file.",
        "It only covers the most common items, and tries to guess sensible defaults.",
        "",
        "package name: (mi-proyecto)",
        "version: (1.0.0)",
        "description: Mi primer proyecto web",
        "entry point: (index.js)",
        "test command:",
        "git repository:",
        "keywords:",
        "author: Oli",
        "license: (ISC)",
        "About to write to C:\\Users\\oli\\mi-proyecto\\package.json:",
        "",
        JSON.stringify(pkgJson, null, 2),
        "",
        "Is this OK? (yes) OK"
      ];
      addLogLines(initLogs, 60);
    } 
    else if (cmd === "npm install lucide-react") {
      if (pkgJson.dependencies["lucide-react"]) {
        addLogLines(["npm WARN double-install lucide-react already exists in package.json", "up to date in 0.2s"], 100);
        return;
      }
      const installLogs = [
        "npm fetch metadata ...",
        "npm install: lucide-react ──> fetching tarball ...",
        "npm install: resolving dependencies ...",
        "⸨▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰⸩ ⠙ extract:lucide-react: tarball extraction completed",
        "+ lucide-react@0.454.0",
        "added 1 package from 1 contributor and audited 4 packages in 1.4s",
        "found 0 vulnerabilities"
      ];
      addLogLines(installLogs, 150, () => {
        setPkgJson(prev => ({
          ...prev,
          dependencies: {
            ...prev.dependencies,
            "lucide-react": "^0.454.0"
          }
        }));
        setNodeModules(prev => [...prev, "lucide-react", "lucide-react-icons"]);
      });
    } 
    else if (cmd === "npm install axios") {
      if (pkgJson.dependencies["axios"]) {
        addLogLines(["npm WARN double-install axios already exists in package.json", "up to date in 0.1s"], 100);
        return;
      }
      const installLogs = [
        "npm fetch metadata ...",
        "npm install: axios ──> fetching tarball ...",
        "npm install: resolving dependencies ...",
        "⸨▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰⸩ ⠹ extract:axios: tarball extraction completed",
        "+ axios@1.6.0",
        "added 1 package and audited 5 packages in 1.1s",
        "found 0 vulnerabilities"
      ];
      addLogLines(installLogs, 150, () => {
        setPkgJson(prev => ({
          ...prev,
          dependencies: {
            ...prev.dependencies,
            "axios": "^1.6.0"
          }
        }));
        setNodeModules(prev => [...prev, "axios", "follow-redirects"]);
      });
    } 
    else if (cmd === "npm run dev") {
      const runLogs = [
        `> ${pkgJson.name}@${pkgJson.version} dev`,
        `> ${pkgJson.scripts.dev}`,
        "",
        "15:10:42 [vite] Server started in 380ms",
        "  Local:   http://localhost:4321/",
        "  Network: use --host to expose",
        "15:10:43 [astro] watching for changes in src/..."
      ];
      addLogLines(runLogs, 100);
    } 
    else if (cmd === "npm uninstall lucide-react") {
      if (!pkgJson.dependencies["lucide-react"]) {
        addLogLines(["npm WARN uninstall lucide-react is not installed", "up to date in 0.1s"], 100);
        return;
      }
      const uninstallLogs = [
        "npm remove lucide-react ...",
        "removed 1 package and audited 3 packages in 0.8s"
      ];
      addLogLines(uninstallLogs, 150, () => {
        setPkgJson(prev => {
          const nextDeps = { ...prev.dependencies };
          delete nextDeps["lucide-react"];
          return { ...prev, dependencies: nextDeps };
        });
        setNodeModules(prev => prev.filter(item => item !== "lucide-react" && item !== "lucide-react-icons"));
      });
    }
    else if (cmd === "clear") {
      setLogs(["C:\\Users\\oli\\mi-proyecto> "]);
    }
    else {
      addLogLines([
        `'${cmd}' no se reconoce como un comando interno o externo,`,
        "programa o archivo por lotes ejecutable."
      ], 50);
    }
  };

  const handleResetWorkspace = () => {
    setPkgJson(INITIAL_PACKAGE_JSON);
    setNodeModules([]);
    setLogs([
      "Microsoft Windows [Versión 10.0.22631]",
      "(c) Microsoft Corporation. Todos los derechos reservados.",
      "",
      "C:\\Users\\oli\\mi-proyecto> ",
    ]);
  };

  return (
    <NoteLayout
      title="¿Qué es NPM?"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["NPM", "Node.js", "package.json", "Dependencias"]}
      previousNote={{
        label: "Formato JSON",
        path: "/Fundamentos/FormatoJSON",
      }}
      nextNote={{
        label: "Operaciones CRUD",
        path: "/Fundamentos/CrudOperaciones",
      }}
    >
      <div className="callout">
        <strong>NPM</strong> (Node Package Manager) es el gestor de paquetes oficial y predeterminado de Node.js. 
        Funciona como un almacén central de código abierto donde desarrolladores de todo el mundo comparten y descargan 
        librerías listas para usar.
      </div>

      <h2>Los Dos Componentes de NPM</h2>
      <p>
        El ecosistema de NPM se divide en dos partes principales que facilitan la administración de dependencias:
      </p>
      <ul>
        <li>
          <strong>El Registro Web (npmjs.com):</strong> Es una base de datos pública gigantesca que almacena millones de 
          paquetes de código (por ejemplo, librerías para crear interfaces de usuario, clientes de red como Axios, utilidades de fechas, etc.).
        </li>
        <li>
          <strong>La Herramienta de Línea de Comandos (NPM CLI):</strong> Es el programa de consola que instalas en tu ordenador 
          para descargar, actualizar y desinstalar paquetes del registro, además de ejecutar scripts de automatización en tu proyecto.
        </li>
      </ul>

      <h2>El Archivo package.json (El Manifiesto)</h2>
      <p>
        Cuando creas un proyecto que utiliza NPM, el primer paso es inicializar el archivo <strong><Term id="json">package.json</Term></strong>. 
        Este archivo estructurado en <Term id="json">JSON</Term> actúa como el manual o manifiesto de tu aplicación. Contiene:
      </p>
      <ul>
        <li><strong>Metadatos:</strong> Nombre del proyecto, versión, descripción y autor.</li>
        <li><strong>Scripts:</strong> Comandos abreviados para automatizar tareas (ej: <code>"dev": "astro dev"</code> para arrancar el servidor local).</li>
        <li><strong>Dependencies (Dependencias):</strong> Un listado de todas las librerías externas que tu aplicación necesita para funcionar, junto con sus versiones.</li>
      </ul>

      <h2>¿Qué es node_modules?</h2>
      <p>
        Cuando ejecutas <code>npm install</code>, NPM lee tu <code>package.json</code>, se conecta al registro en la web, descarga 
        el código de los paquetes correspondientes y los coloca físicamente dentro de una carpeta llamada <strong>node_modules/</strong> en 
        la raíz de tu proyecto. 
      </p>
      <p>
        <em>Nota:</em> Dado que los paquetes que descargas a menudo tienen sus propias dependencias, la carpeta <code>node_modules/</code> puede 
        llegar a contener miles de carpetas pequeñas y pesar cientos de megabytes en pocos segundos.
      </p>

      <h2>Entorno de Desarrollo Simulador</h2>
      <p>
        Utiliza la siguiente consola interactiva para experimentar cómo responde el sistema al ejecutar comandos de NPM. 
        Haz clic en las acciones de la barra de herramientas para ejecutar los comandos y observa en tiempo real cómo se alteran 
        los logs de la terminal, el archivo <code>package.json</code> y el listado de <code>node_modules/</code>.
      </p>

      {/* IDE Container */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/90 overflow-hidden shadow-2xl my-6 flex flex-col font-sans">
        
        {/* IDE Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <TerminalIcon className="text-cyan-400 animate-pulse" size={18} />
            <h3 className="font-bold text-white text-sm m-0">Oli IDE - Explorador de Proyecto</h3>
          </div>
          <button 
            onClick={handleResetWorkspace}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 transition-all cursor-pointer disabled:opacity-50"
          >
            Reiniciar Proyecto
          </button>
        </div>

        {/* IDE Top Half: Editor & Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/5 bg-black/10">
          
          {/* package.json Editor */}
          <div className="lg:col-span-8 p-5 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="flex items-center gap-2 mb-2.5">
              <FileCode className="text-cyan-400" size={15} />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                package.json
              </span>
            </div>
            <pre className="m-0 p-4 bg-neutral-900 border border-white/5 rounded-xl text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto h-[200px] shadow-inner">
              {JSON.stringify(pkgJson, null, 2)}
            </pre>
          </div>

          {/* node_modules Folder Tree */}
          <div className="lg:col-span-4 p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <Folder className="text-yellow-500" size={15} />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                node_modules/
              </span>
            </div>
            <div className="flex-1 p-3 bg-neutral-900 border border-white/5 rounded-xl overflow-y-auto h-[200px] flex flex-col gap-2 shadow-inner">
              {nodeModules.length === 0 ? (
                <span className="text-xs text-white/30 italic m-auto">Carpeta vacía (no hay dependencias)</span>
              ) : (
                nodeModules.map((folder) => (
                  <div key={folder} className="flex items-center gap-2 text-xs font-mono text-white/70 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg">
                    <Folder size={13} className="text-yellow-500 shrink-0" />
                    <span className="truncate">{folder}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>

        {/* IDE Toolbar: Commands list */}
        <div className="bg-black/25 px-6 py-4 border-b border-white/5">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-3 font-sans">
            Comandos NPM Disponibles (Haz clic para ejecutar)
          </span>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => handleCommand("npm init")}
              disabled={loading}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-cyan-400 font-mono">npm init</span>
            </button>
            
            <button
              onClick={() => handleCommand("npm install lucide-react")}
              disabled={loading}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={12} className="text-emerald-400" />
              <span className="font-mono text-white">npm install lucide-react</span>
            </button>

            <button
              onClick={() => handleCommand("npm install axios")}
              disabled={loading}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={12} className="text-emerald-400" />
              <span className="font-mono text-white">npm install axios</span>
            </button>

            <button
              onClick={() => handleCommand("npm run dev")}
              disabled={loading}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 text-white transition-all text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={12} className="text-sky-400" />
              <span className="font-mono text-white">npm run dev</span>
            </button>

            <button
              onClick={() => handleCommand("npm uninstall lucide-react")}
              disabled={loading}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 text-white/70 transition-all text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={12} className="text-rose-400" />
              <span className="font-mono text-white/60">npm uninstall lucide-react</span>
            </button>
          </div>
        </div>

        {/* IDE Bottom Half: Terminal Console (Full Width) */}
        <div className="bg-black/90 p-5 flex flex-col font-mono border-t border-white/5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-widest block">
              Consola: PowerShell (Astro Terminal)
            </span>
            {loading && (
              <span className="text-[10px] text-cyan-400 animate-pulse font-sans">
                Procesando...
              </span>
            )}
          </div>
          
          {/* Scrollable logs viewport */}
          <div 
            ref={terminalBodyRef}
            className="overflow-y-auto h-[180px] text-[11.5px] text-emerald-400 leading-relaxed scrollbar-thin"
          >
            <div className="space-y-1 pr-2">
              {logs.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <h2>Resumen de Comandos Principales de NPM</h2>
      <p>
        Para trabajar en proyectos cotidianamente, es útil recordar los siguientes comandos clave:
      </p>
      
      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04]">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)] w-[20%]">Comando</th>
              <th className="px-4 py-3 text-left font-bold text-white w-[30%]">Sintaxis Completa</th>
              <th className="px-4 py-3 text-left font-bold text-white w-[50%]">Qué hace exactamente</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">npm init</td>
              <td className="px-4 py-3 font-mono text-cyan-400">npm init -y</td>
              <td className="px-4 py-3 text-white/60">
                Inicializa un proyecto nuevo. El flag <code>-y</code> salta el cuestionario y usa los valores por defecto automáticamente.
              </td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">npm install</td>
              <td className="px-4 py-3 font-mono text-cyan-400">npm install [paquete]</td>
              <td className="px-4 py-3 text-white/60">
                Descarga librerías del registro web. Si ejecutas <code>npm install</code> sin especificar ningún paquete, leerá el manifiesto <code>package.json</code> y descargará de golpe todas las dependencias listadas en él (útil al clonar un repositorio de Github).
              </td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">npm run</td>
              <td className="px-4 py-3 font-mono text-cyan-400">npm run [script-name]</td>
              <td className="px-4 py-3 text-white/60">
                Ejecuta herramientas y scripts declarados en la sección <code>"scripts"</code> de tu <code>package.json</code> (como arrancar servidores locales o compilar bundles de producción).
              </td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">npm uninstall</td>
              <td className="px-4 py-3 font-mono text-cyan-400">npm uninstall [paquete]</td>
              <td className="px-4 py-3 text-white/60">
                Remueve una librería de la carpeta <code>node_modules/</code> y borra su registro del archivo <code>package.json</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteLayout>
  );
}
