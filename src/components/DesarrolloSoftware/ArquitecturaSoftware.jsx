import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Layers, 
  Server, 
  ArrowRight,
  Database,
  Shield,
  Network
} from "lucide-react";

const PROJECTS = {
  mvp_saas: {
    title: "SaaS MVP (1-3 Programadores)",
    architecture: "Monolito Tradicional",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    description: "Para un producto en validación con equipo mínimo. La prioridad absoluta es lanzar rápido y mantener los costos de infraestructura al mínimo sin sobrecargar la administración de servidores.",
    latency: "Cero latencia de red en llamadas internas (llamadas de funciones directas en memoria).",
    dbMode: "Base de datos única centralizada.",
    infraCost: "Bajo (un solo servidor básico en Vercel, Heroku o Render).",
    components: [
      { type: "user", label: "Clientes / Navegador" },
      { type: "monolith", label: "Servidor Unificado (Frontend + Auth + Pagos + BD)" },
      { type: "db", label: "Base de Datos Única" }
    ]
  },
  scale_ecommerce: {
    title: "E-Commerce en Crecimiento (5-15 Programadores)",
    architecture: "Monolito Modular",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "El negocio escala y el equipo crece. El código se divide en módulos con fronteras claras (módulo de inventario, pagos, usuarios) pero todo corre dentro del mismo servidor y base de datos para evitar llamadas de red lentas y mantener despliegues simples.",
    latency: "Cero latencia de red. Los módulos se comunican en memoria mediante interfaces de código.",
    dbMode: "Base de datos única, pero con esquemas/tablas agrupados lógicamente por módulo.",
    infraCost: "Bajo-Medio (fácil de escalar verticalmente agregando RAM/CPU al servidor único).",
    components: [
      { type: "user", label: "Clientes / Frontends separados" },
      { type: "monolith_mod", label: "Monolito Modular (Módulos de Pago, Inventario y Auth aislados en carpetas con APIs internas)" },
      { type: "db", label: "Base de Datos Unificada (Tablas separadas por módulo)" }
    ]
  },
  enterprise_platform: {
    title: "Gran Plataforma Financiera (50+ Programadores)",
    architecture: "Microservicios",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    description: "Para corporaciones masivas. Cada dominio del sistema (contabilidad, auditoría, alertas) es desarrollado por un equipo totalmente autónomo que despliega su código de forma independiente usando diferentes lenguajes si es necesario.",
    latency: "Latencia alta. Cada comunicación requiere llamadas de red por protocolo HTTP/gRPC o colas de mensajes.",
    dbMode: "Bases de datos distribuidas (cada microservicio tiene su base de datos propia; prohibido consultar la BD ajena directamente).",
    infraCost: "Alto (requiere clusters de Kubernetes, balanceadores de carga, redes virtuales y herramientas de monitoreo).",
    components: [
      { type: "user", label: "Clientes / Apps móviles" },
      { type: "gateway", label: "API Gateway (Enrutador de tráfico)" },
      { type: "services", label: "Servicio Auth, Servicio Inventario, Servicio Pagos (Independientes)" },
      { type: "dbs", label: "Bases de datos independientes por servicio" }
    ]
  }
};

export default function ArquitecturaSoftware() {
  const [selectedProject, setSelectedProject] = useState("mvp_saas");
  const pData = PROJECTS[selectedProject];

  return (
    <NoteLayout
      title="Arquitectura de Software: Monolitos y Microservicios"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Arquitectura", "Monolito", "Microservicios", "Modular Monolith", "Escalabilidad"]}
      previousNote={{ label: "Programación Orientada a Objetos", path: "/DesarrolloSoftware/POO" }}
      nextNote={{ label: "Frameworks y Librerías", path: "/DesarrolloSoftware/FrameworksYLibrerias" }}
    >
      <div className="callout">
        La <strong><Term id="arquitectura_software">Arquitectura de Software</Term></strong> define la estructura, componentes y 
        comunicaciones de un sistema. La elección inicial define si tu producto podrá escalar fluidamente o si colapsará 
        bajo el peso de su propia complejidad técnica.
      </div>

      <h2>1. El Monolito Tradicional</h2>
      <p>
        Un <Term id="monolito">Monolito</Term> es una arquitectura de software donde toda la lógica de negocio, 
        la autenticación, las conexiones a bases de datos y la interfaz de usuario se compilan y ejecutan juntas 
        como un único proceso unificado.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
          <span className="text-xs font-bold text-emerald-400 block mb-1">Cuándo y por qué usarlo</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 list-disc m-0">
            <li>Equipos pequeños (1 a 5 programadores).</li>
            <li>Productos mínimos viables (MVPs) que necesitan validar el mercado rápido.</li>
            <li>Facilidad de depuración: puedes seguir el flujo del código entero en tu máquina local.</li>
            <li>Simplicidad de despliegue: compilas un archivo y lo subes a un servidor único.</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.02]">
          <span className="text-xs font-bold text-red-400 block mb-1">Cuándo NO usarlo</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 list-disc m-0">
            <li>Organizaciones con múltiples equipos de desarrollo interfiriendo en el mismo repositorio de código.</li>
            <li>Si partes específicas del sistema tienen necesidades de escalado abismales (ej: procesamiento pesado de datos frente a un CRUD sencillo).</li>
            <li>Cuando un bug crítico en una parte secundaria (como el generador de PDFs) puede tirar abajo toda la tienda y las compras de los usuarios.</li>
          </ul>
        </div>
      </div>

      <h2>2. Microservicios</h2>
      <p>
        Los <Term id="microservicios">Microservicios</Term> descomponen la aplicación en servicios autónomos organizados por dominios de negocio. 
        Cada servicio tiene su propio ciclo de vida, su propia base de datos dedicada y se comunica con los demás a través de la red (APIs HTTP, gRPC o colas de mensajes).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
          <span className="text-xs font-bold text-emerald-400 block mb-1">Cuándo y por qué usarlo</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 list-disc m-0">
            <li>Empresas medianas o grandes con múltiples equipos independientes.</li>
            <li>Si deseas utilizar diferentes lenguajes o tecnologías en tu stack para tareas específicas (ej. Python para machine learning y Go para APIs rápidas).</li>
            <li>Escalado altamente granular: multiplicas los servidores del servicio de pagos sin afectar el servicio de blogs.</li>
            <li>Resiliencia técnica: si el microservicio de notificaciones por email falla, el resto de la aplicación (compras, catálogo) sigue activa.</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.02]">
          <span className="text-xs font-bold text-red-400 block mb-1">Cuándo NO usarlo</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 list-disc m-0">
            <li>En etapas tempranas de desarrollo (la latencia de red, la consistencia de datos y la administración de múltiples bases de datos ralentiza al equipo).</li>
            <li>Si el equipo carece de expertos en DevOps e infraestructura en la nube (Kubernetes, observabilidad, telemetría).</li>
            <li>Si las fronteras del negocio no están claras; definir mal los microservicios creará un monolito distribuido extremadamente difícil de mantener.</li>
          </ul>
        </div>
      </div>

      <h2>3. Monolito Modular: La Alternativa Híbrida</h2>
      <p>
        El <Term id="monolito_modular">Monolito Modular</Term> unifica todo el sistema en un solo despliegue físico y base de datos, 
        pero impone fronteras estrictas dentro del código. Cada dominio vive en su propia sección aislada y no puede importar 
        código de otros módulos de forma directa; se comunican mediante interfaces internas.
      </p>
      
      <div className="p-4 rounded-xl border border-pink-500/10 bg-pink-500/[0.02] flex gap-3.5 my-4">
        <Layers className="text-pink-400 shrink-0 mt-0.5" size={18} />
        <div>
          <span className="text-xs font-bold text-pink-400 block mb-1">¿Por qué es el punto de partida recomendado?</span>
          <p className="text-xs text-white/60 leading-relaxed m-0">
            Ofrece lo mejor de ambos mundos: mantienes la simplicidad en el despliegue del monolito tradicional y evitas 
            la latencia de llamadas por red, pero tu código está ordenado de forma tan limpia que si en el futuro necesitas 
            escalar un módulo a un microservicio independiente, puedes extraerlo en cuestión de horas sin tener que 
            rediseñar la base de datos completa.
          </p>
        </div>
      </div>

      <h2>Simulador de Diseño Arquitectónico</h2>
      <p>
        Selecciona las características de tu proyecto a continuación para auditar la recomendación arquitectónica, 
        conocer su diagrama conceptual de red y los costos asociados:
      </p>

      {/* Interactive Project Selector */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col font-sans">
        
        {/* Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="text-pink-500 w-5 h-5" />
            <h3 className="font-bold text-white text-sm m-0">Architecture Planner & Visualizer</h3>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono font-bold">
            Simulador de Sistemas
          </span>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {Object.entries(PROJECTS).map(([key, value]) => {
            const isActive = selectedProject === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedProject(key)}
                className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                  isActive 
                    ? "border-pink-500 bg-white/[0.02] text-white" 
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {value.title}
              </button>
            );
          })}
        </div>

        {/* Panel Content */}
        <div className="p-6 flex flex-col lg:flex-row gap-6 min-h-[380px]">
          
          {/* Rationale and metrics (50% width) */}
          <div className="w-full lg:w-[50%] flex flex-col gap-4">
            <div>
              <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-2 ${pData.badgeColor}`}>
                Estructura: {pData.architecture}
              </span>
              <p className="text-xs text-white/70 leading-relaxed m-0">
                {pData.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-xs">
                <span className="font-bold text-sky-400 block mb-0.5">Latencia entre componentes</span>
                <span className="text-white/60 leading-relaxed block">{pData.latency}</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-xs">
                <span className="font-bold text-emerald-400 block mb-0.5">Acceso a Base de Datos</span>
                <span className="text-white/60 leading-relaxed block">{pData.dbMode}</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-xs">
                <span className="font-bold text-pink-400 block mb-0.5">Costo de Operación e Infraestructura</span>
                <span className="text-white/60 leading-relaxed block">{pData.infraCost}</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Network Diagram (50% width) */}
          <div className="flex-1 p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between items-center relative overflow-hidden min-h-[300px]">
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest self-start">
              Diagrama Conceptual de Red
            </span>

            {/* Rendered Nodes based on architecture type */}
            <div className="flex flex-col items-center gap-5 w-full my-auto">
              
              {/* User Node */}
              <div className="px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white text-[11px] font-mono shadow-sm">
                Cliente / Dispositivo
              </div>

              <div className="text-white/30 font-mono text-[9px] flex flex-col items-center leading-none">
                <span>│</span>
                <span>▼</span>
              </div>

              {/* Middle Layer Nodes */}
              {selectedProject === "mvp_saas" && (
                <div className="px-5 py-4 rounded-xl border border-sky-500/20 bg-sky-500/5 text-center w-full max-w-[240px]">
                  <span className="text-sky-300 font-bold block text-xs">Servidor Monolito Único</span>
                  <span className="text-[10px] text-white/50 block mt-1">Auth · Pagos · Inventario</span>
                </div>
              )}

              {selectedProject === "scale_ecommerce" && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 w-full max-w-[260px] flex flex-col gap-2">
                  <span className="text-emerald-300 font-bold block text-xs text-center">Monolito Modular</span>
                  <div className="grid grid-cols-3 gap-1.5 text-[9px] font-mono text-center">
                    <span className="bg-neutral-900 border border-white/5 py-1 rounded text-white/60">Mod. Auth</span>
                    <span className="bg-neutral-900 border border-white/5 py-1 rounded text-white/60">Mod. Pagos</span>
                    <span className="bg-neutral-900 border border-white/5 py-1 rounded text-white/60">Mod. Inv</span>
                  </div>
                </div>
              )}

              {selectedProject === "enterprise_platform" && (
                <div className="w-full flex flex-col items-center gap-3">
                  {/* Gateway */}
                  <div className="px-4 py-1.5 rounded bg-pink-500/10 border border-pink-500/20 text-pink-300 text-[10px] font-mono font-bold">
                    API Gateway / Router
                  </div>
                  <div className="text-white/20 text-[8px] leading-none">│</div>
                  {/* Services Row */}
                  <div className="flex gap-2 justify-center w-full">
                    <span className="px-2.5 py-2 rounded bg-neutral-900 border border-white/5 text-[9px] text-white/60 text-center font-mono">
                      MS Auth
                    </span>
                    <span className="px-2.5 py-2 rounded bg-neutral-900 border border-white/5 text-[9px] text-white/60 text-center font-mono">
                      MS Pagos
                    </span>
                    <span className="px-2.5 py-2 rounded bg-neutral-900 border border-white/5 text-[9px] text-white/60 text-center font-mono">
                      MS Inv
                    </span>
                  </div>
                </div>
              )}

              <div className="text-white/30 font-mono text-[9px] flex flex-col items-center leading-none">
                <span>│</span>
                <span>▼</span>
              </div>

              {/* Database Layer Nodes */}
              {selectedProject !== "enterprise_platform" ? (
                <div className="px-4 py-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-[10px] font-mono flex items-center gap-1.5">
                  <Database size={11} />
                  Base de Datos Relacional Única
                </div>
              ) : (
                <div className="flex gap-2 justify-center w-full">
                  <span className="px-2 py-1 rounded bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 text-[8px] font-mono flex items-center gap-1">
                    <Database size={8} /> BD Auth
                  </span>
                  <span className="px-2 py-1 rounded bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 text-[8px] font-mono flex items-center gap-1">
                    <Database size={8} /> BD Pagos
                  </span>
                  <span className="px-2 py-1 rounded bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 text-[8px] font-mono flex items-center gap-1">
                    <Database size={8} /> BD Inv
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <h2>Matriz de Comparación Arquitectónica</h2>
      <p>
        Para tomar decisiones rápidas en la etapa de planeación de tu software, consulta la siguiente tabla de variables técnicas:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/5">
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Métrica</th>
              <th className="px-4 py-3 text-left font-bold text-sky-400 text-xs">Monolito Tradicional</th>
              <th className="px-4 py-3 text-left font-bold text-emerald-400 text-xs">Monolito Modular</th>
              <th className="px-4 py-3 text-left font-bold text-pink-400 text-xs">Microservicios</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Complejidad Operativa</td>
              <td className="px-4 py-3 text-white/70">Muy Baja</td>
              <td className="px-4 py-3 text-white/70">Baja</td>
              <td className="px-4 py-3 text-white/70 font-bold text-red-300">Muy Alta</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Costo de Servidores</td>
              <td className="px-4 py-3 text-white/70">Muy Bajo</td>
              <td className="px-4 py-3 text-white/70">Bajo</td>
              <td className="px-4 py-3 text-white/70 font-bold text-amber-300">Alto (Sistemas Distribuidos)</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Velocidad de Despliegue</td>
              <td className="px-4 py-3 text-white/70 font-bold text-emerald-300">Instantáneo (1 pipeline)</td>
              <td className="px-4 py-3 text-white/70 font-bold text-emerald-300">Rápido (1 pipeline)</td>
              <td className="px-4 py-3 text-white/70">Lento / Complejo (Multi pipelines)</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Consistencia de Datos</td>
              <td className="px-4 py-3 text-white/70">Fuerte (Transacciones SQL)</td>
              <td className="px-4 py-3 text-white/70">Fuerte (Transacciones SQL)</td>
              <td className="px-4 py-3 text-white/70">Eventual (Eventual Consistency)</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Aislamiento ante Fallos</td>
              <td className="px-4 py-3 text-white/70">Ninguno (Se cae toda la app)</td>
              <td className="px-4 py-3 text-white/70">Bajo (Se cae toda la app)</td>
              <td className="px-4 py-3 text-white/70 font-bold text-emerald-300">Alto (Servicios redundantes)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoteLayout>
  );
}
