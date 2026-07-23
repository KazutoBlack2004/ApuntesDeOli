import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import {
  FlaskConical,
  Code,
  Eye,
  RefreshCw,
  ExternalLink,
  Terminal,
  Info,
} from "lucide-react";

// ─── Testing Pyramid Data ─────────────────────────────────────────────────────

const PYRAMID_LEVELS = [
  {
    id: "e2e",
    label: "E2E / Integración",
    count: "Pocos",
    cost: "Alto",
    speed: "Lento",
    color: "red",
    desc: "Simulan el flujo completo del usuario en el navegador real. Son los más lentos y costosos pero dan la mayor confianza.",
    examples: ["Playwright", "Cypress", "Selenium", "TestSprite"],
  },
  {
    id: "integration",
    label: "Integración",
    count: "Medios",
    cost: "Medio",
    speed: "Medio",
    color: "yellow",
    desc: "Prueban la interacción entre múltiples módulos o servicios. Verifican que las piezas funcionen bien juntas.",
    examples: ["Supertest", "Jest + DB", "Vitest"],
  },
  {
    id: "unit",
    label: "Unitarias",
    count: "Muchos",
    cost: "Bajo",
    speed: "Rapido",
    color: "emerald",
    desc: "Prueban una función o componente de forma aislada. Son las más rápidas y baratas. La base de toda estrategia de testing.",
    examples: ["Jest", "Vitest", "Testing Library", "Mocha"],
  },
];

const CMAP = {
  red: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", bar: "bg-red-500" },
  yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400", bar: "bg-yellow-500" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", bar: "bg-emerald-500" },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Testing() {
  const [activePyramid, setActivePyramid] = useState("unit");
  const active = PYRAMID_LEVELS.find((l) => l.id === activePyramid);
  const c = CMAP[active.color];

  return (
    <NoteLayout
      title="Testing de Software"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Testing", "Jest", "Vitest", "E2E", "Playwright", "TestSprite", "QA"]}
      previousNote={{ label: "SEO para Desarrollo Web", path: "/DesarrolloSoftware/SEO" }}
      icon={Code}
    >
      <div className="callout">
        El <strong>testing de software</strong> es el proceso de verificar que un programa funciona correctamente,
        encontrando errores antes de que lleguen a producción y a los usuarios reales.
        No es opcional: es parte esencial del desarrollo profesional.
      </div>

      <h2>Por que Testear tu Codigo</h2>
      <p>
        Los bugs en producción cuestan hasta <strong>100 veces más</strong> de corregir que los detectados durante el desarrollo.
        El testing automatizado permite:
      </p>
      <ul>
        <li><strong>Refactorizar con confianza:</strong> si los tests pasan, el comportamiento no cambió.</li>
        <li><strong>Documentar comportamiento esperado:</strong> los tests son la mejor documentación viva del código.</li>
        <li><strong>Detectar regresiones:</strong> cambios en una parte del sistema que rompen otra parte diferente.</li>
        <li><strong>Desplegar con seguridad:</strong> un pipeline de CI/CD que corre los tests antes de hacer deploy a producción.</li>
      </ul>

      <h2>La Piramide de Testing</h2>
      <p>
        La pirámide de testing define cuántos tests de cada tipo deberías tener.
        La base (unitarios) debe ser la más amplia: más cantidad, más velocidad, menor costo.
        Haz clic en cada nivel para más detalles:
      </p>

      {/* Pyramid Visual */}
      <div className="my-6 flex flex-col gap-3">
        {PYRAMID_LEVELS.map((level, i) => {
          const lc = CMAP[level.color];
          const widths = ["w-full", "w-4/5 mx-auto", "w-3/5 mx-auto"];
          const isActive = activePyramid === level.id;
          return (
            <button
              key={level.id}
              onClick={() => setActivePyramid(level.id)}
              className={`${widths[i]} flex flex-col items-center p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${isActive
                  ? `${lc.border} ${lc.bg} scale-[1.01]`
                  : "border-white/8 bg-white/[0.02] hover:border-white/15"
                }`}
            >
              <div className="flex items-center justify-between w-full gap-3">
                <span className={`text-sm font-bold ${isActive ? lc.text : "text-white/70"}`}>{level.label}</span>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
                  <span>Cantidad: <span className={isActive ? lc.text : "text-white/50"}>{level.count}</span></span>
                  <span>Velocidad: <span className={isActive ? lc.text : "text-white/50"}>{level.speed}</span></span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Level Detail */}
      <div className={`p-5 rounded-xl border ${c.border} ${c.bg} my-4`}>
        <h3 className={`text-sm font-bold ${c.text} m-0 mb-2`}>Tests {active.label}</h3>
        <p className="text-sm text-white/70 leading-relaxed m-0 mb-3">{active.desc}</p>
        <div className="flex flex-wrap gap-2">
          {active.examples.map((ex) => (
            <span key={ex} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.border} ${c.text} bg-white/5`}>{ex}</span>
          ))}
        </div>
      </div>



      <h2>Tipos de Tests mas Usados</h2>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/5">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)] text-xs">Tipo</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Que verifica</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Herramientas</th>
              <th className="px-4 py-3 text-left font-bold text-white text-xs">Velocidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { type: "Unitario", what: "Una funcion o componente en aislamiento", tools: "Jest, Vitest, Mocha", speed: "~1–10ms", color: "text-sky-400" },
              { type: "Integracion", what: "Modulos o servicios interactuando entre si", tools: "Supertest, Jest + DB", speed: "~50–500ms", color: "text-yellow-400" },
              { type: "E2E (End-to-End)", what: "El flujo completo del usuario en el navegador", tools: "Playwright, Cypress, TestSprite", speed: "~1–10s", color: "text-red-400" },
              { type: "API / Contract", what: "Endpoints HTTP: status, schema, headers", tools: "Supertest, Postman, Thunder Client", speed: "~100–500ms", color: "text-orange-400" },
              { type: "Visual / Regresion", what: "Que la UI no cambio visualmente de forma inesperada", tools: "Percy, Storybook, TestSprite", speed: "~1–5s", color: "text-purple-400" },
              { type: "Accesibilidad", what: "Cumplimiento de estandares WCAG (a11y)", tools: "axe-core, Lighthouse, TestSprite", speed: "~500ms–2s", color: "text-pink-400" },
            ].map((row) => (
              <tr key={row.type} className="hover:bg-white/[0.01]">
                <td className={`px-4 py-3 font-bold text-xs ${row.color}`}>{row.type}</td>
                <td className="px-4 py-3 text-white/65 text-xs">{row.what}</td>
                <td className="px-4 py-3 text-white/50 text-xs font-mono">{row.tools}</td>
                <td className="px-4 py-3 text-white/40 text-xs font-mono">{row.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>TestSprite: Testing Agentivo con IA</h2>
      <p>
        <strong>TestSprite</strong> es una plataforma de testing de nueva generación que usa
        inteligencia artificial para explorar tu aplicación como lo haría un usuario real.
        No requiere escribir código de tests manualmente: le pasas una URL y el agente crea el plan
        de pruebas, ejecuta los tests, detecta bugs y genera el reporte.
      </p>

      {/* TestSprite Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          {
            icon: Eye,
            title: "E2E Agentivo",
            desc: "El agente navega tu app como un usuario real, haciendo clics, llenando formularios y verificando que los flujos funcionen correctamente.",
            color: "purple",
          },
          {
            icon: Code,
            title: "API Testing",
            desc: "Analiza y testea automáticamente tus endpoints REST: status codes, schemas de respuesta, autenticación y casos de error.",
            color: "sky",
          },
          {
            icon: Eye,
            title: "Visual Regression",
            desc: "Detecta cambios visuales inesperados en la UI comparando screenshots entre versiones del sitio.",
            color: "orange",
          },
          {
            icon: RefreshCw,
            title: "Regression Testing",
            desc: "Ejecuta la suite de tests automáticamente en cada deploy para detectar si nuevos cambios rompieron funcionalidades existentes.",
            color: "emerald",
          },
        ].map((feat) => {
          const Icon = feat.icon;
          const fc = CMAP[feat.color] || CMAP.emerald;
          return (
            <div key={feat.title} className={`p-4 rounded-xl border ${fc.border} ${fc.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg ${fc.bg} border ${fc.border} flex items-center justify-center`}>
                  <Icon size={16} className={fc.text} />
                </div>
                <span className={`font-bold text-sm ${fc.text}`}>{feat.title}</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed m-0">{feat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* TestSprite CTA */}
      <div className="my-6 rounded-2xl border border-[var(--accent-color)]/25 bg-[var(--accent-color)]/5 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)]/15 border border-[var(--accent-color)]/25 flex items-center justify-center">
                  <FlaskConical size={16} className="text-[var(--accent-text)]" />
                </div>
                <span className="font-black text-white text-sm">TestSprite</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold">Gratis para empezar</span>
              </div>
              <p className="text-xs text-white/65 leading-relaxed m-0 mb-3">
                Pega la URL de tu sitio web y TestSprite explorará y testeará tu aplicación automáticamente.
                Sin instalación, sin configuración, primeros resultados en ~10 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="https://www.testsprite.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-color)] text-white text-xs font-bold no-underline hover:opacity-90 transition-opacity"
                >
                  Probar TestSprite gratis
                  <ExternalLink size={12} />
                </a>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-black/30 font-mono text-[11px] text-white/60">
                  <Terminal size={11} className="text-[var(--accent-text)]" />
                  npm i -g @testsprite/testsprite-cli
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 pb-4">
          <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold block mb-2">Tipos de test disponibles</span>
          <div className="flex flex-wrap gap-2">
            {["E2E", "API", "Visual", "Regresion", "Accesibilidad", "Correctness", "CLI", "IA Agentiva"].map((tag) => (
              <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded border border-white/8 text-white/50">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <h2>Buenas Practicas de Testing</h2>
      <ul>
        <li>
          <strong>Sigue el patron AAA:</strong> <em>Arrange</em> (prepara los datos),
          <em>Act</em> (ejecuta la acción) y <em>Assert</em> (verifica el resultado).
          Cada test debe tener una sola responsabilidad.
        </li>
        <li>
          <strong>Tests independientes:</strong> un test nunca debe depender del resultado de otro.
          Deben poder ejecutarse en cualquier orden y pasar siempre.
        </li>
        <li>
          <strong>Nombra los tests descriptivamente:</strong> el nombre debe explicar qué
          comportamiento verifica. Ej: <code>debe retornar error si el password tiene menos de 8 caracteres</code>.
        </li>
        <li>
          <strong>Mockea las dependencias externas:</strong> los tests unitarios no deben
          hacer llamadas reales a APIs, bases de datos ni servicios externos.
        </li>
        <li>
          <strong>Automatiza en CI/CD:</strong> los tests deben correr automáticamente
          en cada Pull Request antes de hacer merge. Si un test falla, el deploy se bloquea.
        </li>
        <li>
          <strong>No persigas el 100% de coverage:</strong> el coverage es una métrica útil
          pero no el objetivo. Prioriza testear el código crítico y los flujos principales del negocio.
        </li>
      </ul>

      <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3 my-4">
        <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white/70 leading-relaxed m-0">
          <strong className="text-amber-400">Regla de oro:</strong> escribe el test antes de escribir el
          código que lo hace pasar. Esta práctica se llama <strong>TDD (Test-Driven Development)</strong> y
          produce código más limpio, modular y con menos bugs desde el inicio.
        </p>
      </div>
    </NoteLayout>
  );
}
