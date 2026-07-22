import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Server, 
  Send, 
  Globe, 
  Compass, 
  Coffee, 
  Sun, 
  Languages, 
  Sparkles,
  Heart,
  ExternalLink
} from "lucide-react";

const API_SERVICES = {
  clima: {
    name: "API de Clima (Weather)",
    endpoint: "GET https://api.servicios.com/v1/clima?ciudad=",
    defaultParam: "Santiago",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer api_key_clima_123xyz"
    },
    getResponse: (val) => ({
      ciudad: val || "Santiago",
      pais: val.toLowerCase() === "santiago" ? "Chile" : val.toLowerCase() === "madrid" ? "España" : "Desconocido",
      temperatura: val.toLowerCase() === "madrid" ? "34°C" : "19°C",
      condicion: val.toLowerCase() === "madrid" ? "Despejado y caluroso" : "Nubosidad parcial",
      viento: "14 km/h",
      humedad: "62%",
      cacheado: false
    })
  },
  traductor: {
    name: "API de Traducción (Translate)",
    endpoint: "GET https://api.servicios.com/v1/traductor?texto=",
    defaultParam: "Hello world",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer api_key_traductor_456abc"
    },
    getResponse: (val) => {
      const text = val || "Hello world";
      let translated = "Texto no soportado en la demo";
      if (text.toLowerCase() === "hello world") translated = "Hola mundo";
      else if (text.toLowerCase() === "how are you?") translated = "¿Cómo estás?";
      else if (text.toLowerCase() === "i love coding") translated = "Me encanta programar";

      return {
        texto_original: text,
        texto_traducido: translated,
        origen: "Inglés",
        destino: "Español",
        confiabilidad: "99.8%",
        motor: "NeuralOliTranslate/v3"
      };
    }
  },
  perritos: {
    name: "API de Perritos (Dog Data)",
    endpoint: "GET https://api.servicios.com/v1/perritos/aleatorio",
    defaultParam: "",
    headers: {
      "Accept": "application/json"
    },
    getResponse: () => ({
      status: "success",
      raza: "Golden Retriever",
      nombre: "Oli",
      edad_humana: "3 años",
      caracter: "Juguetón, cariñoso, le encanta comer calcetines y programar por las noches",
      imagen_avatar: "🐕"
    })
  }
};

export default function QueEsUnaAPI() {
  const [activeTab, setActiveTab] = useState("clima");
  const [inputValue, setInputValue] = useState(API_SERVICES.clima.defaultParam);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const currentService = API_SERVICES[activeTab];

  const handleTabChange = (key) => {
    setActiveTab(key);
    setInputValue(API_SERVICES[key].defaultParam);
    setResponse(null);
  };

  const handleFetch = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(currentService.getResponse(inputValue));
      setLoading(false);
    }, 800);
  };

  return (
    <NoteLayout
      title="¿Qué es una API?"
      category="Fundamentos"
      categoryPath="/Fundamentos"
      tags={["APIs", "Endpoints", "REST", "Arquitectura"]}
      previousNote={{
        label: "Unidades de información",
        path: "/Fundamentos/UnidadesDeInformacion",
      }}
      nextNote={{
        label: "Formato JSON",
        path: "/Fundamentos/FormatoJSON",
      }}
    >
      <div className="callout">
        Una <strong>API</strong> (Interfaz de Programación de Aplicaciones) es un conjunto de definiciones y reglas 
        que permite que dos aplicaciones de software se comuniquen entre sí para intercambiar datos, funcionalidades y servicios.
      </div>

      <h2>¿Para qué sirve una API?</h2>
      <p>
        En el desarrollo moderno, los programas no se construyen desde cero de forma aislada. En su lugar, se conectan con 
        otros sistemas especializados. Una API actúa como un <strong>puente o contrato</strong> seguro entre dos aplicaciones, 
        definiendo exactamente cómo solicitar información y qué formato se recibirá a cambio (usualmente <Term id="json">JSON</Term>).
      </p>

      <h2>La Famosa Analogía del Restaurante</h2>
      <p>
        Para entenderlo de forma sencilla, imagina que vas a comer a un restaurante:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
            <Compass size={18} />
            El Cliente (Comensal)
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Eres tú sentado en la mesa. Tienes hambre y quieres pedir un menú. En desarrollo, esto representa al 
            <strong> Navegador o Aplicación móvil</strong> (el frontend) que necesita obtener datos.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-light)] flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 text-[var(--accent-text)] font-bold text-sm">
            <Coffee size={18} />
            La API (El Mesero / Mozo)
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            El mesero te trae la carta, toma tu pedido estructurado, va a la cocina a solicitarlo y finalmente regresa 
            para servirte tu comida. <strong>Tú nunca entraste a la cocina</strong> ni tuviste que saber cocinar; solo hablaste 
            con el mesero.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col gap-2 relative">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Server size={18} />
            El Servidor (La Cocina)
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Es el lugar donde se preparan los platos, se guardan los ingredientes y ocurre la lógica compleja. 
            Representa a la <strong>Base de datos y al Servidor backend</strong> del sistema.
          </p>
        </div>
      </div>

      <h2>Componentes Esenciales de una API Web</h2>
      <p>
        Cuando programas o utilizas una <Term id="api">API</Term> a través de internet (API REST), te encontrarás con cuatro conceptos principales:
      </p>
      <ul>
        <li><strong>Endpoint (Punto de acceso):</strong> Es la URL específica a la que se envía la solicitud para interactuar con un recurso (ej: <code>https://api.tienda.com/productos</code>).</li>
        <li><strong>Método (Verbo HTTP):</strong> Define el tipo de acción que estás solicitando (GET para consultar, POST para crear, etc.).</li>
        <li><strong>Cabeceras (Headers):</strong> Metadatos adicionales para la comunicación, como indicar el tipo de formato de datos o proveer claves de seguridad (Tokens de acceso).</li>
        <li><strong>Cuerpo (Body):</strong> La información estructurada que envías al servidor (normalmente en JSON) cuando necesitas guardar o actualizar datos.</li>
      </ul>

      <h2>API Request Tester (Probador de Endpoints)</h2>
      <p>
        Practica cómo interactúan las aplicaciones. Selecciona un servicio de API de la barra de pestañas, 
        configura el parámetro de consulta y presiona "Consultar API" para observar el flujo real de red y su respuesta en <Term id="json">JSON</Term>.
      </p>

      {/* Simulator Container */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        
        {/* API Tab selector */}
        <div className="flex border-b border-white/5 bg-black/40 overflow-x-auto">
          {Object.keys(API_SERVICES).map((key) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  active 
                    ? "border-cyan-500 bg-white/[0.02] text-white" 
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {API_SERVICES[key].name}
              </button>
            )}
          )}
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          
          {/* Inputs Section (40% width) */}
          <div className="lg:col-span-5 p-5 border-r border-white/5 flex flex-col justify-between bg-black/10">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-white/40 flex items-center gap-1.5">
                <Globe size={13} />
                Petición del Cliente
              </span>

              {/* Endpoint Display */}
              <div className="flex items-center gap-1 bg-neutral-900 border border-white/8 rounded-lg p-2.5 font-mono text-xs overflow-x-auto">
                <span className="font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">GET</span>
                <span className="text-white/60 truncate" title={currentService.endpoint}>
                  {currentService.endpoint}
                  {currentService.defaultParam && (
                    <span className="text-cyan-400 font-bold">{inputValue}</span>
                  )}
                </span>
              </div>

              {/* URL Params input */}
              {currentService.defaultParam && (
                <div className="p-3.5 rounded-lg border border-white/5 bg-neutral-900/40 text-xs">
                  {activeTab === "clima" ? (
                    <div>
                      <label className="block text-[10px] text-white/40 mb-1">Parámetro de Ciudad (?ciudad=)</label>
                      <select 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Santiago">Santiago (Chile)</option>
                        <option value="Madrid">Madrid (España)</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] text-white/40 mb-1">Texto a traducir (?texto=)</label>
                      <select 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Hello world">Hello world</option>
                        <option value="How are you?">How are you?</option>
                        <option value="I love coding">I love coding</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Headers */}
              <div>
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest block mb-1">Cabeceras Enviadas (Headers)</span>
                <pre className="m-0 p-2.5 bg-neutral-900/50 rounded-lg border border-white/5 text-[11px] font-mono text-white/60">
                  {Object.entries(currentService.headers).map(([k, v]) => `${k}: ${v}`).join("\n")}
                </pre>
              </div>

            </div>

            {/* Fetch Button */}
            <div className="mt-4">
              <button
                onClick={handleFetch}
                disabled={loading}
                className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-[var(--accent-color)] text-white shadow-[0_0_15px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
              >
                <Send size={14} className={loading ? "animate-pulse" : ""} />
                {loading ? "Consultando..." : "Consultar API"}
              </button>
            </div>
          </div>

          {/* Outputs Section (60% width) */}
          <div className="lg:col-span-7 p-5 flex flex-col justify-between bg-black/20">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-white/40 block mb-3">
                Respuesta del Servidor
              </span>

              {response ? (
                <div className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-white/40">Status:</span>
                    <span className="px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-400">
                      200 OK
                    </span>
                  </div>

                  {/* Split output: Visual result on left, JSON raw on right */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* JSON Display */}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-1">JSON retornado</span>
                      <pre className="m-0 p-2.5 bg-neutral-900 border border-white/5 rounded-lg text-[10.5px] font-mono text-white/70 overflow-x-auto max-h-[160px] overflow-y-auto leading-relaxed">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>

                    {/* Rendering Widget result */}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold text-white/30 uppercase tracking-widest block mb-1">Visualización de la UI</span>
                      
                      {activeTab === "clima" && (
                        <div className="p-4 rounded-xl border border-cyan-500/10 bg-cyan-500/5 text-white flex flex-col items-center justify-center text-center gap-1 min-h-[140px]">
                          <Sun className="text-amber-400 animate-spin" style={{ animationDuration: "12s" }} size={32} />
                          <span className="text-2xl font-bold font-mono tracking-tight">{response.temperatura}</span>
                          <span className="text-[11px] font-semibold text-white">{response.ciudad}</span>
                          <span className="text-[10px] text-white/50">{response.condicion}</span>
                        </div>
                      )}

                      {activeTab === "traductor" && (
                        <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/5 text-white flex flex-col justify-center gap-1.5 min-h-[140px]">
                          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-indigo-400 font-bold">
                            <Languages size={12} />
                            Traducción Exitosa
                          </div>
                          <div>
                            <span className="text-[9.5px] text-white/40 block">Inglés:</span>
                            <span className="text-xs font-semibold">{response.texto_original}</span>
                          </div>
                          <div className="border-t border-white/5 pt-1.5">
                            <span className="text-[9.5px] text-white/40 block">Español:</span>
                            <span className="text-xs font-bold text-cyan-300">{response.texto_traducido}</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "perritos" && (
                        <div className="p-4 rounded-xl border border-pink-500/10 bg-pink-500/5 text-white flex flex-col items-center justify-center text-center gap-1.5 min-h-[140px]">
                          <span className="text-3xl select-none">{response.imagen_avatar}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-pink-300">{response.nombre}</span>
                            <Heart size={10} className="text-pink-500 fill-pink-500 animate-pulse" />
                          </div>
                          <span className="text-[10px] text-white/50">{response.raza} ({response.edad_humana})</span>
                          <span className="text-[9px] text-white/60 leading-normal max-w-[150px]">{response.caracter}</span>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              ) : (
                <div className="h-full min-h-[180px] flex items-center justify-center border border-dashed border-white/10 rounded-lg p-4 text-center text-xs text-white/30 italic">
                  {loading ? "Realizando llamada a la API..." : "Presiona 'Consultar API' para disparar la petición HTTP."}
                </div>
              )}
            </div>

            {/* API metadata footer */}
            <div className="text-[10px] text-white/35 text-right font-mono mt-4">
              {response && (
                <span>Response Time: 80ms | Server: Node/v18.2 | API-Status: Operational</span>
              )}
            </div>
          </div>

        </div>

      </div>

      <h2>Tipos de APIs más comunes</h2>
      <p>
        Las APIs se pueden categorizar por su ámbito de acceso y la forma en que se construyen:
      </p>
      <ul>
        <li>
          <strong>Por su acceso:</strong>
          <ul>
            <li><code>Públicas (Abiertas):</code> Disponibles para cualquier desarrollador (ej: la API de clima o mapas de Google). Algunas requieren registro y ofrecen planes gratuitos limitados.</li>
            <li><code>Privadas (Internas):</code> De uso exclusivo dentro de una empresa. Por ejemplo, la API que conecta la aplicación móvil de un banco con sus bases de datos internas.</li>
          </ul>
        </li>
        <li>
          <strong>Por su tecnología web:</strong>
          <ul>
            <li><code>REST (Representational State Transfer):</code> El estándar más común hoy en día. Se basa puramente en métodos HTTP y transfiere datos estructurados en formato JSON de forma muy liviana.</li>
            <li><code>GraphQL:</code> Una tecnología moderna que permite al cliente pedir exactamente las propiedades de los datos que necesita, evitando traer campos sobrantes en la respuesta.</li>
          </ul>
        </li>
      </ul>

      <h2>APIs Públicas Famosas para Practicar</h2>
      <p>
        La mejor forma de dominar el uso de APIs es experimentando con casos reales. Aquí tienes una lista de 
        las APIs gratuitas más populares e interesantes que no requieren configuraciones complejas para empezar, 
        junto con una vista previa de cómo se renderiza su información:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        
        {/* PokeAPI */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-between gap-3 hover:border-pink-500/20 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <strong className="text-white text-sm font-sans">PokéAPI</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-semibold font-sans">
                Diversión / Videojuegos
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              La API ideal para principiantes. Devuelve información masiva sobre el mundo Pokémon: habilidades, 
              estadísticas, tipos e imágenes oficiales de sprites.
            </p>
            
            {/* Visual representation of Ditto */}
            <div className="mt-3 p-3.5 rounded-xl border border-yellow-500/10 bg-yellow-500/5 flex items-center gap-3">
              <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">👾</span>
              <div>
                <span className="text-xs font-bold text-white block">Ditto <span className="text-[10px] text-yellow-400 font-normal">#132</span></span>
                <span className="text-[10px] text-white/70 block">Tipo: Normal | Altura: 0.3 m</span>
                <span className="text-[9px] text-white/50 block font-mono">Habilidades: flexbilidad, impostor</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-semibold pt-2">
            <a 
              href="https://pokeapi.co/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--accent-text)] hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Documentación
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://pokeapi.co/api/v2/pokemon/ditto" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Probar Endpoint
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* JSONPlaceholder */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-between gap-3 hover:border-pink-500/20 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <strong className="text-white text-sm font-sans">JSONPlaceholder</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold font-sans">
                Herramienta de Pruebas
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Un servicio REST simulado gratuito para pruebas y prototipado. Ideal para probar peticiones CRUD 
              completas de posts, comentarios y usuarios sin modificar nada real.
            </p>

            {/* Visual representation of post #1 */}
            <div className="mt-3 p-3.5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Post ID #1</span>
              </div>
              <span className="text-xs font-bold text-white block truncate">"sunt aut facere..."</span>
              <p className="text-[10px] text-white/60 leading-normal m-0 line-clamp-2">
                quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam...
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-semibold pt-2">
            <a 
              href="https://jsonplaceholder.typicode.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--accent-text)] hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Sitio Web
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://jsonplaceholder.typicode.com/posts/1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Probar Endpoint
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Rick and Morty API */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-between gap-3 hover:border-pink-500/20 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <strong className="text-white text-sm font-sans">Rick and Morty API</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold font-sans">
                Entretenimiento
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Provee datos completos de la serie de televisión: información detallada de los personajes 
              (con sus fotos de avatar), estados de vida, especies, planetas de origen y listas de episodios.
            </p>

            {/* Visual representation of Rick Sanchez */}
            <div className="mt-3 p-3.5 rounded-xl border border-indigo-500/10 bg-indigo-500/5 flex items-center gap-3">
              <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">🧪</span>
              <div>
                <span className="text-xs font-bold text-white block">Rick Sanchez</span>
                <span className="text-[10px] text-white/70 block">Especie: Humano | Origen: Tierra (C-137)</span>
                <span className="text-[9px] font-bold flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Vivo (Alive)
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-semibold pt-2">
            <a 
              href="https://rickandmortyapi.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--accent-text)] hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Documentación
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://rickandmortyapi.com/api/character/1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Probar Endpoint
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* The Dog API */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-between gap-3 hover:border-pink-500/20 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <strong className="text-white text-sm font-sans">The Dog API</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 font-semibold font-sans">
                Imágenes / Mascotas
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Retorna listados completos de las razas de perros oficiales del mundo, junto con urls a fotografías 
              aleatorias. Excelente para practicar la integración de imágenes en el desarrollo frontend.
            </p>

            {/* Visual representation of a Golden Retriever */}
            <div className="mt-3 p-3.5 rounded-xl border border-pink-500/10 bg-pink-500/5 flex items-center gap-3">
              <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">🐕</span>
              <div>
                <span className="text-xs font-bold text-white block">Golden Retriever</span>
                <span className="text-[10px] text-white/70 block">Temperamento: Amigable, Inteligente, Devoto</span>
                <span className="text-[9px] text-pink-400 block font-mono">Esperanza de Vida: 10-12 años</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-xs font-semibold pt-2">
            <a 
              href="https://dog.ceo/dog-api/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--accent-text)] hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Documentación
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://dog.ceo/api/breeds/image/random" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 no-underline"
            >
              Probar Endpoint
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>
    </NoteLayout>
  );
}
