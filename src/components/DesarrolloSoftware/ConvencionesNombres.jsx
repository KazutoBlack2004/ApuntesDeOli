import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Type, 
  Info, 
  Layers,
  ArrowRight,
  Code,
  CheckCircle
} from "lucide-react";

export default function ConvencionesNombres() {
  const [inputText, setInputText] = useState("usuario perfil datos");

  // Helper function to tokenize input (split by space, dash, underscore, camelCase transitions)
  const tokenize = (text) => {
    if (!text) return [];
    // Convert camelCase or PascalCase transitions to spaces first
    let cleaned = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    // Replace underscores and hyphens with spaces
    cleaned = cleaned.replace(/[_-]/g, " ");
    // Split by space and remove empty tokens
    return cleaned.trim().toLowerCase().split(/\s+/);
  };

  const tokens = tokenize(inputText);

  // Conversion methods
  const toCamelCase = (toks) => {
    if (toks.length === 0) return "";
    return toks[0] + toks.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  };

  const toPascalCase = (toks) => {
    return toks.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  };

  const toSnakeCase = (toks) => {
    return toks.join("_");
  };

  const toKebabCase = (toks) => {
    return toks.join("-");
  };

  const toScreamingSnakeCase = (toks) => {
    return toks.join("_").toUpperCase();
  };

  return (
    <NoteLayout
      title="Convenciones de Nombres en Código"
      category="Desarrollo de Software"
      categoryPath="/DesarrolloSoftware"
      tags={["Código Limpio", "Sintaxis", "camelCase", "PascalCase", "snake_case", "Buenas Prácticas"]}
      previousNote={{ label: "Paletas de Colores", path: "/DesarrolloSoftware/PaletasColores" }}
      nextNote={{ label: "Seguridad y Escalabilidad", path: "/DesarrolloSoftware/SeguridadYEscalabilidad" }}
    >
      <div className="callout">
        Las <strong>Convenciones de Nombres</strong> (Casing Conventions) son estándares que dictan cómo formatear 
        los nombres de variables, funciones, clases, archivos y bases de datos en programación. Seguir estas convenciones 
        es fundamental para la legibilidad del código y la colaboración en equipos.
      </div>

      <h2>¿Por qué son Cruciales las Convenciones?</h2>
      <p>
        Los ordenadores no distinguen entre <code>userprofile</code>, <code>user_profile</code> o <code>UserProfile</code>, 
        pero los humanos y los agentes de IA sí. Escribir con convenciones unificadas resuelve tres problemas:
      </p>
      <ul>
        <li>
          <strong>Evitar errores semánticos:</strong> En muchos lenguajes (como JavaScript o Python), es fácil confundir variables locales con clases o constantes si no siguen una estructura visual reconocible.
        </li>
        <li>
          <strong>Mejorar la indexación y búsqueda:</strong> Si trabajas en un proyecto con miles de archivos, poder predecir el nombre exacto de un archivo o clase basándote en su tipo acelera la navegación.
        </li>
        <li>
          <strong>Entendimiento con la IA:</strong> Al dar instrucciones a un agente para que genere un nuevo archivo, especificar el formato (ej. <em>"Crea la clase en PascalCase y el archivo en kebab-case"</em>) garantiza que se acople perfectamente a tu arquitectura actual.
        </li>
      </ul>

      <h2>Los 5 Estilos de Escritura (Casing Styles)</h2>
      <p>
        A continuación se muestran los estilos estándar más populares utilizados en la ingeniería de software:
      </p>

      {/* Converter Playground */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        
        {/* Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="text-sky-400 w-5 h-5" />
            <h3 className="font-bold text-white text-sm md:text-base font-sans m-0">Conversor Interactivo de Convenciones</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono font-bold">
            Escribe abajo
          </span>
        </div>

        {/* Input area */}
        <div className="p-5 border-b border-white/5 bg-black/20">
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
            Ingresa términos separados por espacios, guiones o camelCase:
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ej. calcular precio total"
            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Output list */}
        <div className="divide-y divide-white/5 font-sans">
          
          {/* camelCase */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex-1">
              <span className="text-xs font-bold text-sky-400 block mb-1">
                1. <Term id="camelcase">camelCase</Term> (Caso Camello)
              </span>
              <span className="text-[11px] text-white/60 leading-normal block">
                La primera letra es minúscula; las palabras siguientes inician con mayúscula.
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-mono text-sm font-bold text-white bg-white/5 px-3 py-1 rounded border border-white/8">
                {toCamelCase(tokens) || "esperando_entrada..."}
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                Variables y Funciones (JS/TS, C#)
              </span>
            </div>
          </div>

          {/* PascalCase */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex-1">
              <span className="text-xs font-bold text-emerald-400 block mb-1">
                2. <Term id="pascalcase">PascalCase</Term> (Caso Pascal)
              </span>
              <span className="text-[11px] text-white/60 leading-normal block">
                Todas las palabras inician con mayúscula. También llamado CapitalCamelCase.
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-mono text-sm font-bold text-white bg-white/5 px-3 py-1 rounded border border-white/8">
                {toPascalCase(tokens) || "esperando_entrada..."}
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Clases, Componentes React y Tipos
              </span>
            </div>
          </div>

          {/* snake_case */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex-1">
              <span className="text-xs font-bold text-yellow-400 block mb-1">
                3. <Term id="snakecase">snake_case</Term> (Caso Serpiente)
              </span>
              <span className="text-[11px] text-white/60 leading-normal block">
                Todas las palabras en minúsculas unidas por un guion bajo <code>_</code>.
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-mono text-sm font-bold text-white bg-white/5 px-3 py-1 rounded border border-white/8">
                {toSnakeCase(tokens) || "esperando_entrada..."}
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono">
                Variables (Python, Ruby) y Columnas de BD
              </span>
            </div>
          </div>

          {/* kebab-case */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex-1">
              <span className="text-xs font-bold text-pink-400 block mb-1">
                4. <Term id="kebabcase">kebab-case</Term> (Caso Kebab)
              </span>
              <span className="text-[11px] text-white/60 leading-normal block">
                Palabras en minúsculas separadas por un guion medio <code>-</code>.
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-mono text-sm font-bold text-white bg-white/5 px-3 py-1 rounded border border-white/8">
                {toKebabCase(tokens) || "esperando_entrada..."}
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-mono">
                Nombres de Archivos, URLs y Clases CSS
              </span>
            </div>
          </div>

          {/* SCREAMING_SNAKE_CASE */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex-1">
              <span className="text-xs font-bold text-rose-400 block mb-1">
                5. <Term id="screaming_snakecase">SCREAMING_SNAKE_CASE</Term>
              </span>
              <span className="text-[11px] text-white/60 leading-normal block">
                Todo en mayúsculas, separado por guiones bajos. Usado para destacar constantes fijas.
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-mono text-sm font-bold text-white bg-white/5 px-3 py-1 rounded border border-white/8">
                {toScreamingSnakeCase(tokens) || "esperando_entrada..."}
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                Variables de Entorno (.env) y Constantes
              </span>
            </div>
          </div>

        </div>

      </div>

      <h2>Uso Recomendado por Lenguaje y Capa</h2>
      <p>
        Dependiendo de la tecnología con la que trabajes, los estándares cambian. Esta es la guía rápida de referencia:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        
        {/* Frontend / Javascript / TS */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="text-sm font-bold text-white block mb-2">JavaScript / TypeScript & Web</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 m-0">
            <li><strong>camelCase:</strong> Para variables locales y funciones (<code>let userName</code>, <code>getUser()</code>).</li>
            <li><strong>PascalCase:</strong> Componentes React y Clases (<code>&lt;UserProfile /&gt;</code>, <code>class Database</code>).</li>
            <li><strong>kebab-case:</strong> Selectores de clases CSS (<code>.active-button</code>) y nombres de archivos (<code>user-profile.jsx</code>).</li>
            <li><strong>SCREAMING_SNAKE_CASE:</strong> Variables globales o exportadas (<code>const CONFIG_URL</code>).</li>
          </ul>
        </div>

        {/* Backend / Python / C# */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="text-sm font-bold text-white block mb-2">Python & Backend</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 m-0">
            <li><strong>snake_case:</strong> Para variables locales, funciones y métodos en Python (PEP 8) (<code>def calculate_price()</code>).</li>
            <li><strong>PascalCase:</strong> Clases tanto en Python como C# (<code>class PaymentService</code>).</li>
            <li><strong>PascalCase (C#):</strong> A diferencia de JS, C# usa PascalCase tanto en métodos públicos como propiedades (<code>public void GetUser()</code>).</li>
            <li><strong>snake_case:</strong> Nombres de archivos de script en Python (<code>main_service.py</code>).</li>
          </ul>
        </div>

        {/* Databases */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="text-sm font-bold text-white block mb-2">Bases de Datos (SQL)</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 m-0">
            <li><strong>snake_case:</strong> Prácticamente universal para nombres de tablas y columnas (<code>select user_id from active_users</code>).</li>
            <li><strong>UPPERCASE:</strong> Para palabras clave reservadas de SQL (<code>SELECT</code>, <code>JOIN</code>, <code>WHERE</code>), facilitando diferenciar el código SQL puro de los nombres de tus campos.</li>
          </ul>
        </div>

        {/* Git & Infrastructure */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="text-sm font-bold text-white block mb-2">Infraestructura y Git</span>
          <ul className="text-xs text-white/70 space-y-1 pl-4 m-0">
            <li><strong>kebab-case:</strong> Estándar en nombres de ramas de Git (<code>feature/add-login-form</code>) y rutas URL de servidores (<code>/api/v1/user-profile</code>).</li>
            <li><strong>SCREAMING_SNAKE_CASE:</strong> Configuración del entorno de Docker y archivos de variables (<code>DATABASE_PASSWORD</code>).</li>
          </ul>
        </div>

      </div>

      <h2>Buenas Prácticas Universales al Nombrar</h2>
      <p>
        Además del formato visual, la semántica del nombre (qué palabras eliges) es clave para tener un código limpio:
      </p>

      <div className="space-y-4 my-6">
        
        {/* verbs */}
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle size={16} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1">Las funciones deben ser verbos</span>
            <p className="text-xs text-white/60 m-0 leading-relaxed">
              Las funciones ejecutan acciones. Nómbralas empezando con un verbo que describa la acción.
              <br />
              <strong className="text-emerald-300">✓ Bien:</strong> <code>fetchUsers()</code>, <code>sendEmail()</code>, <code>validatePassword()</code>.
              <br />
              <strong className="text-rose-400">✗ Mal:</strong> <code>users()</code>, <code>emailSender()</code>, <code>password()</code>.
            </p>
          </div>
        </div>

        {/* nouns */}
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle size={16} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1">Las variables y clases deben ser sustantivos</span>
            <p className="text-xs text-white/60 m-0 leading-relaxed">
              Almacenan datos u objetos. Utiliza sustantivos descriptivos en singular o plural.
              <br />
              <strong className="text-emerald-300">✓ Bien:</strong> <code>class Invoice</code>, <code>const userToken = ""</code>, <code>let products = []</code>.
              <br />
              <strong className="text-rose-400">✗ Mal:</strong> <code>class PayInvoice</code>, <code>const readToken = ""</code>.
            </p>
          </div>
        </div>

        {/* booleans */}
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle size={16} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1">Booleanos autodescriptivos (Prefijos)</span>
            <p className="text-xs text-white/60 m-0 leading-relaxed">
              Usa prefijos como <code>is</code>, <code>has</code>, <code>should</code>, <code>can</code> para que la variable se lea como una pregunta de sí o no.
              <br />
              <strong className="text-emerald-300">✓ Bien:</strong> <code>isActive</code>, <code>hasPermission</code>, <code>shouldRedirect</code>.
              <br />
              <strong className="text-rose-400">✗ Mal:</strong> <code>active</code>, <code>permission</code>, <code>redirect</code> (pueden confundirse con objetos o funciones).
            </p>
          </div>
        </div>

        {/* avoid acronyms */}
        <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/5 flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Info size={16} className="text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 block mb-1">Evita abreviaciones y nombres de una sola letra</span>
            <p className="text-xs text-white/60 m-0 leading-relaxed">
              Nombres como <code>fn</code>, <code>temp</code>, <code>d</code> obligan al lector a adivinar el contexto. Escribe el nombre completo. 
              Reserva variables de una letra (<code>i</code>, <code>j</code>) únicamente para bucles o índices matemáticos cortos.
              <br />
              <strong className="text-emerald-300">✓ Bien:</strong> <code>averageTemperature</code>, <code>daysRemaining</code>, <code>callbackFunction</code>.
              <br />
              <strong className="text-rose-400">✗ Mal:</strong> <code>avgTemp</code>, <code>dRem</code>, <code>cbFn</code>.
            </p>
          </div>
        </div>

      </div>
    </NoteLayout>
  );
}
