import React, { useState, useEffect } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  FileCode, 
  CheckCircle, 
  AlertOctagon, 
  Terminal, 
  Sparkles,
  RefreshCw
} from "lucide-react";

const DEFAULT_JSON = `{
  "nombre": "Oli",
  "edad": 21,
  "esEstudiante": true,
  "materias": ["Redes", "Bases de Datos", "Algoritmos"],
  "direccion": {
    "ciudad": "Santiago",
    "pais": "Chile"
  },
  "beca": null
}`;

export default function FormatoJSON() {
  const [jsonText, setJsonText] = useState(DEFAULT_JSON);
  const [parsedData, setParsedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isValid, setIsValid] = useState(null); // null, true, false

  useEffect(() => {
    // Auto-parse on mount
    try {
      const parsed = JSON.parse(DEFAULT_JSON);
      setParsedData(parsed);
      setIsValid(true);
      setErrorMsg(null);
    } catch (e) {
      setIsValid(false);
      setErrorMsg(e.message);
    }
  }, []);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setParsedData(parsed);
      setIsValid(true);
      setErrorMsg(null);
    } catch (e) {
      setParsedData(null);
      setIsValid(false);
      setErrorMsg(e.message);
    }
  };

  const handleReset = () => {
    setJsonText(DEFAULT_JSON);
    try {
      const parsed = JSON.parse(DEFAULT_JSON);
      setParsedData(parsed);
      setIsValid(true);
      setErrorMsg(null);
    } catch (e) {
      setIsValid(false);
      setErrorMsg(e.message);
    }
  };

  const getDataType = (val) => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val; // "string", "number", "boolean", "object"
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "string": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "number": return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "boolean": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "array": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "object": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "null": return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
      default: return "bg-white/10 text-white/50 border-white/10";
    }
  };

  const renderValueRepresentation = (val) => {
    const type = getDataType(val);
    if (type === "null") return <span className="font-mono text-neutral-500">null</span>;
    if (type === "boolean") return <span className="font-mono font-bold text-emerald-400">{val ? "true" : "false"}</span>;
    if (type === "number") return <span className="font-mono text-sky-400">{val}</span>;
    if (type === "string") return <span className="font-mono text-yellow-400">"{val}"</span>;
    if (type === "array") {
      return (
        <span className="font-mono text-purple-400">
          [{val.map((item, i) => (
            <span key={i} className="text-white/80">
              {typeof item === "string" ? `"${item}"` : item}
              {i < val.length - 1 ? ", " : ""}
            </span>
          ))}]
        </span>
      );
    }
    if (type === "object") {
      return (
        <span className="font-mono text-indigo-400 text-xs">
          {`{ `}
          {Object.entries(val).map(([k, v], i, arr) => (
            <span key={k} className="text-white/70">
              <span className="text-indigo-300">"{k}"</span>: {typeof v === "string" ? `"${v}"` : String(v)}
              {i < arr.length - 1 ? ", " : ""}
            </span>
          ))}
          {` }`}
        </span>
      );
    }
    return String(val);
  };

  return (
    <NoteLayout
      title="Formato JSON"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["JSON", "Sintaxis", "Formatos", "Web Dev"]}
      previousNote={{
        label: "¿Qué es una API?",
        path: "/Fundamentos/QueEsUnaAPI",
      }}
      nextNote={{
        label: "Operaciones CRUD",
        path: "/Fundamentos/CrudOperaciones",
      }}
    >
      <div className="callout">
        <strong>JSON</strong> (JavaScript Object Notation) es un formato de texto ligero y estructurado para 
        el almacenamiento y el intercambio de datos. Es el lenguaje universal que utilizan las <Term id="api">APIs</Term> 
        para comunicar aplicaciones en la web moderna.
      </div>

      <h2>¿Qué es JSON y por qué se usa?</h2>
      <p>
        JSON nació de la necesidad de enviar datos entre navegadores web y servidores de forma rápida y sencilla. 
        A pesar de que sus siglas hacen referencia a JavaScript, JSON es <strong>completamente independiente del lenguaje</strong>: 
        casi todos los lenguajes de programación (Python, Java, C#, PHP, etc.) poseen herramientas nativas para leer y generar texto JSON.
      </p>

      <h2>Reglas de Sintaxis Esenciales</h2>
      <p>
        Para que un archivo JSON sea válido, debe cumplir con reglas estrictas de formato:
      </p>
      <ul>
        <li>
          <strong>Pares de Clave y Valor:</strong> La información se escribe en la estructura <code>"clave": valor</code>.
        </li>
        <li>
          <strong>Comillas Dobles Obligatorias:</strong> Tanto las claves (nombres de los campos) como los textos (strings) 
          deben escribirse obligatoriamente con <strong>comillas dobles <code>""</code></strong>. Las comillas simples <code>''</code> no son válidas.
        </li>
        <li>
          <strong>Separación por comas:</strong> Los pares de datos se separan mediante comas. <strong>No debe haber</strong> una coma 
          después del último elemento de un objeto o lista (coma final o <em>trailing comma</em>).
        </li>
        <li>
          <strong>Llaves y Corchetes:</strong> Las llaves <code>{"{}"}</code> representan <strong>objetos</strong> (grupos de datos), 
          mientras que los corchetes <code>[]</code> representan <strong>arreglos</strong> (listas ordenadas de datos).
        </li>
      </ul>

      <h2>Los 6 Tipos de Datos Soportados</h2>
      <p>
        JSON solo permite almacenar los siguientes seis tipos de datos básicos:
      </p>

      <div className="overflow-x-auto w-full border border-white/8 rounded-xl bg-white/[0.02] my-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04]">
              <th className="px-4 py-3 text-left font-bold text-[var(--accent-text)]">Tipo de Dato</th>
              <th className="px-4 py-3 text-left font-bold text-white">Sintaxis en JSON</th>
              <th className="px-4 py-3 text-left font-bold text-white">Ejemplo</th>
              <th className="px-4 py-3 text-left font-bold text-white">Descripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">String (Cadena)</td>
              <td className="px-4 py-3 font-mono text-yellow-400">"texto"</td>
              <td className="px-4 py-3 font-mono">"Oli"</td>
              <td className="px-4 py-3 text-white/60">Texto rodeado de comillas dobles.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Number (Número)</td>
              <td className="px-4 py-3 font-mono text-sky-400">entero o decimal</td>
              <td className="px-4 py-3 font-mono">21, 3.14</td>
              <td className="px-4 py-3 text-white/60">Valores numéricos sin comillas.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Boolean (Booleano)</td>
              <td className="px-4 py-3 font-mono text-emerald-400">true / false</td>
              <td className="px-4 py-3 font-mono">true</td>
              <td className="px-4 py-3 text-white/60">Estados de verdadero o falso sin comillas.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Array (Lista)</td>
              <td className="px-4 py-3 font-mono text-purple-400">[ val1, val2 ]</td>
              <td className="px-4 py-3 font-mono">["A", "B"]</td>
              <td className="px-4 py-3 text-white/60">Lista ordenada de valores entre corchetes.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Object (Objeto)</td>
              <td className="px-4 py-3 font-mono text-indigo-400">{"{ k: v }"}</td>
              <td className="px-4 py-3 font-mono">{"{\"id\": 1}"}</td>
              <td className="px-4 py-3 text-white/60">Colección de pares clave/valor entre llaves.</td>
            </tr>
            <tr className="hover:bg-white/[0.01]">
              <td className="px-4 py-3 font-semibold text-white">Null (Nulo)</td>
              <td className="px-4 py-3 font-mono text-neutral-400">null</td>
              <td className="px-4 py-3 font-mono">null</td>
              <td className="px-4 py-3 text-white/60">Representa un valor vacío o inexistente.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Consola Interactiva: Editor y Validador JSON</h2>
      <p>
        Edita el código JSON del panel izquierdo (puedes borrar comillas, olvidar comas, cambiar textos, números o booleanos) 
        y presiona <strong>"Analizar y Validar JSON"</strong> para ver cómo responde el intérprete en el panel derecho.
      </p>

      {/* Editor Container */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        {/* Console Header */}
        <div className="bg-white/[0.03] border-b border-white/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="text-cyan-400" size={18} />
            <h3 className="font-bold text-white text-sm font-sans m-0">JSON Parser & Visualizer</h3>
          </div>
          <button 
            onClick={handleReset} 
            className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 transition-all cursor-pointer font-sans"
            title="Restaurar JSON de ejemplo"
          >
            <RefreshCw size={12} />
            Restaurar
          </button>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
          
          {/* Left: Input Textarea */}
          <div className="p-5 border-r border-white/5 flex flex-col justify-between bg-black/10">
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2 font-sans">
                Código JSON Editable
              </span>
              <textarea 
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full flex-1 min-h-[280px] bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs text-white/90 leading-relaxed focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
                style={{ resize: "vertical" }}
                spellCheck="false"
              />
            </div>
            <button
              onClick={handleParse}
              className="w-full mt-4 cursor-pointer py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-[var(--accent-color)] text-white shadow-[0_0_15px_var(--accent-glow)] hover:scale-[1.01] active:scale-[0.99]"
            >
              Analizar y Validar JSON
            </button>
          </div>

          {/* Right: AST Visual Tree / Error Screen */}
          <div className="p-5 flex flex-col bg-black/25 overflow-y-auto max-h-[460px]">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-3 font-sans">
              Resultado de Validación
            </span>

            {isValid === true && parsedData && (
              <div className="space-y-4 flex-1 flex flex-col">
                {/* Success Banner */}
                <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center gap-2 text-xs font-semibold font-sans">
                  <CheckCircle size={16} />
                  Sintaxis JSON Válida. Objeto parseado con éxito.
                </div>

                {/* Parsed Visual Table */}
                <div className="border border-white/5 rounded-lg overflow-hidden bg-neutral-900/50 flex-1">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-black/35 text-white/40 border-b border-white/5 text-left text-[10px] uppercase tracking-wider">
                        <th className="p-3 font-bold">Clave (Key)</th>
                        <th className="p-3 font-bold">Tipo de Dato</th>
                        <th className="p-3 font-bold">Valor Parseado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {Object.entries(parsedData).map(([key, value]) => {
                        const type = getDataType(value);
                        return (
                          <tr key={key} className="hover:bg-white/[0.01] transition-colors">
                            <td className="p-3 font-mono font-bold text-white/80">"{key}"</td>
                            <td className="p-3">
                              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${getTypeBadgeClass(type)}`}>
                                {type}
                              </span>
                            </td>
                            <td className="p-3 truncate max-w-[200px]" title={JSON.stringify(value)}>
                              {renderValueRepresentation(value)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {isValid === false && (
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {/* Error Banner */}
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold font-sans">
                    <AlertOctagon size={18} />
                    Sintaxis JSON Inválida (Error de Parseo)
                  </div>
                  <p className="text-[11px] font-mono bg-black/40 border border-rose-500/10 rounded-lg p-3 text-rose-300 leading-normal m-0 whitespace-pre-wrap">
                    {errorMsg}
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-white/50 leading-relaxed">
                  <strong className="text-white/80 block mb-1 font-sans">Consejos para depurar:</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Verifica que todas las comas entre elementos estén puestas.</li>
                    <li>Asegúrate de no dejar una coma sobrante al final del último campo.</li>
                    <li>Comprueba que todas las claves y textos estén en comillas dobles (<code>""</code>).</li>
                    <li>Revisa que todas las llaves y corchetes abran y cierren correctamente.</li>
                  </ul>
                </div>
              </div>
            )}

            {isValid === null && (
              <div className="flex-1 flex items-center justify-center text-xs text-white/30 italic font-sans">
                Esperando análisis...
              </div>
            )}

          </div>

        </div>
      </div>

      <h2>JSON vs XML</h2>
      <p>
        Antes de la popularización de JSON, las aplicaciones web usaban mayoritariamente <strong>XML</strong> (eXtensible Markup Language) 
        para transferir información. A continuación, se compara cómo se ve la misma información en ambos formatos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2 font-sans">Formato JSON (Moderno, Ligero)</span>
          <pre className="m-0 p-4 bg-neutral-900/60 border border-white/5 rounded-xl text-xs font-mono text-yellow-400 overflow-x-auto leading-relaxed">
{`{
  "usuario": {
    "nombre": "Oli",
    "edad": 21
  }
}`}
          </pre>
        </div>
        <div>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2 font-sans">Formato XML (Clásico, Verboso)</span>
          <pre className="m-0 p-4 bg-neutral-900/60 border border-white/5 rounded-xl text-xs font-mono text-cyan-400 overflow-x-auto leading-relaxed">
{`<usuario>
  <nombre>Oli</nombre>
  <edad>21</edad>
</usuario>`}
          </pre>
        </div>
      </div>

      <p>
        <strong>Ventajas de JSON sobre XML:</strong>
        <ul>
          <li><strong>Ligereza:</strong> JSON no requiere etiquetas de cierre duplicadas (como <code>&lt;/nombre&gt;</code>), lo que reduce considerablemente el tamaño en bytes del archivo. Esto permite peticiones de red mucho más rápidas.</li>
          <li><strong>Parseo Directo:</strong> JSON se mapea de forma inmediata en objetos nativos de JavaScript usando <code>JSON.parse()</code>. En cambio, XML requiere lectores o árboles de procesamiento complejos (DOM parser) que consumen más CPU.</li>
          <li><strong>Legibilidad:</strong> Su sintaxis basada en colecciones de clave-valor resulta mucho más fácil de leer y escribir por los programadores.</li>
        </ul>
      </p>
    </NoteLayout>
  );
}
