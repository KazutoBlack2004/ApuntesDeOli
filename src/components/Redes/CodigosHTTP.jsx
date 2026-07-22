import React, { useState } from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";
import { 
  Info, 
  CheckCircle, 
  Compass, 
  Server
} from "lucide-react";

const STATUS_CODES = [
  // 2xx Success
  {
    code: 200,
    name: "OK",
    range: "2xx",
    severity: "success",
    def: "La petición ha tenido éxito y el servidor ha devuelto el recurso solicitado.",
    scenario: "Cargar la página de inicio de Google o leer tus apuntes. El servidor te envía el HTML/CSS sin inconvenientes.",
    analogy: "Pides un café en el mostrador y el barista te entrega tu taza caliente de inmediato con una sonrisa.",
    httpExample: `HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nContent-Length: 12543\nDate: ${new Date().toUTCString()}`
  },
  {
    code: 201,
    name: "Created (Creado)",
    range: "2xx",
    severity: "success",
    def: "La petición ha tenido éxito y, como resultado, se ha creado un nuevo recurso en el servidor.",
    scenario: "Registrar una nueva cuenta en una red social. El servidor crea tu usuario en la base de datos y te devuelve tu perfil recién creado.",
    analogy: "Rellenas un formulario de inscripción y te entregan tu nueva tarjeta de membresía física.",
    httpExample: `HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: /api/v1/usuarios/109\nDate: ${new Date().toUTCString()}`
  },
  {
    code: 204,
    name: "No Content (Sin Contenido)",
    range: "2xx",
    severity: "success",
    def: "La petición se ha completado con éxito, pero el servidor no necesita devolver ningún contenido en el cuerpo de la respuesta.",
    scenario: "Eliminar un archivo en la nube. La acción es exitosa y el servidor responde confirmando la acción, sin mandar datos adicionales.",
    analogy: "Pides tirar un papel a la papelera al recepcionista, él lo tira y te hace un gesto con la cabeza (confirmado, no hay nada más que hablar).",
    httpExample: `HTTP/1.1 204 No Content\nServer: CloudServer/1.5\nDate: ${new Date().toUTCString()}`
  },
  // 3xx Redirection
  {
    code: 301,
    name: "Moved Permanently (Movido Permanentemente)",
    range: "3xx",
    severity: "warning",
    def: "El recurso solicitado ha sido asignado de forma permanente a una nueva URL. Las futuras peticiones deben usar esa dirección.",
    scenario: "Una empresa cambia de dominio de 'miweb-vieja.com' a 'miweb-nueva.com'. El servidor redirige automáticamente a los usuarios.",
    analogy: "Llegas a tu tienda favorita y hay un cartel grande: 'Nos hemos mudado permanentemente a la Calle Mayor 45'. Te toca caminar hacia allá.",
    httpExample: `HTTP/1.1 301 Moved Permanently\nLocation: https://miweb-nueva.com/inicio\nContent-Length: 0\nDate: ${new Date().toUTCString()}`
  },
  {
    code: 304,
    name: "Not Modified (No Modificado)",
    range: "3xx",
    severity: "warning",
    def: "Indica al cliente (normalmente al navegador) que el recurso no ha cambiado desde la última petición. El cliente puede leer la versión que tiene guardada en su propia caché.",
    scenario: "Cargar una imagen pesada del logo de un sitio. El navegador pregunta si cambió; el servidor dice 'no', ahorrando ancho de banda al cargarla de la caché local.",
    analogy: "Preguntas en casa: '¿Ha cambiado la lista de la compra?'. Te responden 'No, sigue igual'. Usas la foto que ya le habías tomado con tu móvil.",
    httpExample: `HTTP/1.1 304 Not Modified\nCache-Control: public, max-age=31536000\nETag: "w/39281a8b"\nDate: ${new Date().toUTCString()}`
  },
  // 4xx Client Error
  {
    code: 400,
    name: "Bad Request (Petición Incorrecta)",
    range: "4xx",
    severity: "danger",
    def: "El servidor no puede o no procesará la petición debido a un error que parece ser del cliente (por ejemplo, formato de datos mal formado, sintaxis de petición inválida o enrutamiento engañoso).",
    scenario: "Enviar un formulario de registro con un formato JSON inválido o con caracteres rotos.",
    analogy: "Llegas a ventanilla y pides un boleto hablando al revés o usando un idioma inexistente; el cajero no te entiende nada y te pide que repitas.",
    httpExample: `HTTP/1.1 400 Bad Request\nContent-Type: application/json\nContent-Length: 52\nDate: ${new Date().toUTCString()}\n\n{ "error": "Sintaxis JSON inválida en el cuerpo." }`
  },
  {
    code: 401,
    name: "Unauthorized (No Autorizado)",
    range: "4xx",
    severity: "danger",
    def: "La petición requiere autenticación del usuario. El cliente debe identificarse primero para obtener la respuesta.",
    scenario: "Intentar acceder a la bandeja de entrada de tu correo sin haber iniciado sesión previamente.",
    analogy: "Intentas pasar a una zona VIP de una discoteca sin tu entrada ni credenciales. El guardia de seguridad te detiene y te pide identificación.",
    httpExample: `HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm="Acceso Privado"\nContent-Length: 42\nDate: ${new Date().toUTCString()}\n\n{ "error": "Se requieren credenciales." }`
  },
  {
    code: 403,
    name: "Forbidden (Prohibido)",
    range: "4xx",
    severity: "danger",
    def: "El servidor ha entendido la petición pero se niega a autorizarla. El cliente no tiene los privilegios necesarios para acceder al recurso (a diferencia de 401, aquí el servidor sí sabe quién eres).",
    scenario: "Un usuario común intentando entrar al panel de administración `/admin` de un sitio web. Aunque está logueado, su rol no es administrador.",
    analogy: "En la misma discoteca, muestras tu identificación de usuario regular, pero intentas entrar a la oficina del gerente. Tienes tu ID, pero no tienes permitido el paso.",
    httpExample: `HTTP/1.1 403 Forbidden\nContent-Type: application/json\nContent-Length: 61\nDate: ${new Date().toUTCString()}\n\n{ "error": "No tienes permisos de administrador." }`
  },
  {
    code: 404,
    name: "Not Found (No Encontrado)",
    range: "4xx",
    severity: "danger",
    def: "El servidor no puede encontrar el recurso solicitado. Es el código de error más famoso de la web.",
    scenario: "Escribir mal una URL (ej: `/contacto-nosotros-error`) o intentar buscar un artículo que ha sido borrado del servidor.",
    analogy: "Entras a una tienda buscando un modelo específico de zapatos, pero el vendedor busca en la bodega y te dice: 'Ese modelo no existe ni lo manejamos'.",
    httpExample: `HTTP/1.1 404 Not Found\nContent-Type: text/html; charset=utf-8\nContent-Length: 182\nDate: ${new Date().toUTCString()}\n\n<h1>404 - Página no encontrada</h1>`
  },
  {
    code: 429,
    name: "Too Many Requests (Demasiadas Peticiones)",
    range: "4xx",
    severity: "danger",
    def: "El usuario ha enviado demasiadas peticiones en un período de tiempo determinado (límite de velocidad / rate limit).",
    scenario: "Un bot intentando adivinar una contraseña enviando 1000 intentos por segundo, o pulsar el botón de recargar sin parar en un segundo.",
    analogy: "Intentas preguntarle cosas a tu profesor 50 veces por minuto sin dejarlo respirar; el profesor te frena y te dice 'Espera tu turno, no puedo responder tanto a la vez'.",
    httpExample: `HTTP/1.1 429 Too Many Requests\nRetry-After: 3600\nContent-Type: application/json\nDate: ${new Date().toUTCString()}\n\n{ "error": "Límite excedido. Espera 60 minutos." }`
  },
  // 5xx Server Error
  {
    code: 500,
    name: "Internal Server Error (Error Interno del Servidor)",
    range: "5xx",
    severity: "server",
    def: "El servidor se ha encontrado con una situación que no sabe cómo manejar. Es un error genérico del código backend.",
    scenario: "Un error de programación en el servidor (ej: intentar leer una variable nula o base de datos colapsada) interrumpe la ejecución del código.",
    analogy: "Vas a un restaurante y pides un plato. El camarero va a la cocina, pero a los cocineros se les rompe el horno o se les cae la comida al suelo. Te avisan que 'hubo un problema en cocina'.",
    httpExample: `HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\nContent-Length: 54\nDate: ${new Date().toUTCString()}\n\n{ "error": "Excepción inesperada en base de datos." }`
  },
  {
    code: 502,
    name: "Bad Gateway (Puerta de Enlace Incorrecta)",
    range: "5xx",
    severity: "server",
    def: "El servidor, mientras actuaba como puerta de enlace o proxy, recibió una respuesta inválida del servidor ascendente al que intentó acceder para completar la petición.",
    scenario: "Un balanceador de carga o proxy (ej: Nginx o Cloudflare) intenta conectar con el servidor de Node.js/Python, pero ese servidor backend responde de forma errática o inválida.",
    analogy: "Preguntas al recepcionista de un hotel por una habitación. El recepcionista llama por teléfono a la central de reservas, pero la central le da información corrupta o ruido. El recepcionista vuelve contigo y te dice: 'La central de datos está dando problemas'.",
    httpExample: `HTTP/1.1 502 Bad Gateway\nServer: cloudflare\nContent-Length: 150\nDate: ${new Date().toUTCString()}\n\nProxy Error: Servidor de origen envió datos corruptos.`
  },
  {
    code: 503,
    name: "Service Unavailable (Servicio No Disponible)",
    range: "5xx",
    severity: "server",
    def: "El servidor no está listo para manejar la petición. Las causas comunes son que el servidor está caído por mantenimiento o está sobrecargado.",
    scenario: "Intentar comprar entradas para un concierto masivo y la web está caída debido a millones de personas intentando entrar al mismo tiempo.",
    analogy: "Llegas a una tienda y tiene la persiana metálica bajada con un cartel que dice: 'Cerrado temporalmente por reformas' o 'Aforo completo, espere afuera'.",
    httpExample: `HTTP/1.1 503 Service Unavailable\nRetry-After: 120\nContent-Type: text/html\nDate: ${new Date().toUTCString()}\n\n<h1>Servidor en mantenimiento. Vuelva a intentar en 2 minutos.</h1>`
  }
];

const SEVERITY_THEMES = {
  success: {
    color: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    badge: "bg-emerald-500/10 text-emerald-400"
  },
  warning: {
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    badge: "bg-amber-500/10 text-amber-400"
  },
  danger: {
    color: "#ef4444",
    glow: "rgba(239,68,68,0.25)",
    border: "border-rose-500/20",
    bg: "bg-rose-500/5",
    badge: "bg-rose-500/10 text-rose-400"
  },
  server: {
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    badge: "bg-purple-500/10 text-purple-400"
  }
};

export default function CodigosHTTP() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedCode, setSelectedCode] = useState(STATUS_CODES[0]);

  const filteredCodes = activeFilter === "Todos" 
    ? STATUS_CODES 
    : STATUS_CODES.filter(item => item.range === activeFilter);

  const selectedTheme = SEVERITY_THEMES[selectedCode.severity] || SEVERITY_THEMES.success;

  return (
    <NoteLayout
      title="Códigos de estado HTTP"
      category="Redes"
      categoryPath="/Redes"
      tags={["HTTP Status", "APIs", "Protocolos", "Cliente-Servidor"]}
      previousNote={{
        label: "VLANs y enrutamiento básico",
        path: "/Redes/VlansEnrutamiento",
      }}
    >
      <div className="callout">
        Los <strong>códigos de estado de respuesta HTTP</strong> son números de 3 dígitos devueltos por un servidor web 
        para indicarle al navegador o cliente el resultado de su petición. Son indispensables para el diagnóstico de 
        redes y para la lógica interna de cualquier aplicación web.
      </div>

      <h2>Los 5 Rangos de la Familia HTTP</h2>
      <p>
        El primer dígito del código define la categoría de la respuesta. Existen cinco clases estandarizadas por la 
        IETF (Internet Engineering Task Force):
      </p>

      <div className="space-y-3.5 my-6">
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="shrink-0 flex items-center justify-center w-12 h-10 rounded-lg bg-sky-500/10 text-sky-400 font-mono font-bold text-sm">
            1xx
          </span>
          <div>
            <strong className="text-white block text-sm">Informativos (Petición en progreso)</strong>
            <span className="text-xs text-white/50 leading-relaxed block">
              El servidor ha recibido la petición y está procesando la información. Rara vez se ven directamente en el navegador (ej: <code>100 Continue</code>).
            </span>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="shrink-0 flex items-center justify-center w-12 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-sm">
            2xx
          </span>
          <div>
            <strong className="text-white block text-sm">Éxito / Success (Petición completada)</strong>
            <span className="text-xs text-white/50 leading-relaxed block">
              La acción solicitada por el cliente fue recibida, entendida, aceptada y procesada correctamente por el servidor (ej: <code>200 OK</code>).
            </span>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="shrink-0 flex items-center justify-center w-12 h-10 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-sm">
            3xx
          </span>
          <div>
            <strong className="text-white block text-sm">Redirección (Acción adicional requerida)</strong>
            <span className="text-xs text-white/50 leading-relaxed block">
              El cliente necesita realizar un paso adicional para completar la petición. Por lo general, implica que el recurso cambió de URL (ej: <code>301 Moved Permanently</code>).
            </span>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="shrink-0 flex items-center justify-center w-12 h-10 rounded-lg bg-rose-500/10 text-rose-400 font-mono font-bold text-sm">
            4xx
          </span>
          <div>
            <strong className="text-white block text-sm">Error del Cliente (Fallo del solicitante)</strong>
            <span className="text-xs text-white/50 leading-relaxed block">
              La petición contiene sintaxis incorrecta, falta de credenciales o solicita algo que no existe. El error reside en el lado del cliente (ej: <code>404 Not Found</code>).
            </span>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <span className="shrink-0 flex items-center justify-center w-12 h-10 rounded-lg bg-purple-500/10 text-purple-400 font-mono font-bold text-sm">
            5xx
          </span>
          <div>
            <strong className="text-white block text-sm">Error del Servidor (Fallo en el backend)</strong>
            <span className="text-xs text-white/50 leading-relaxed block">
              El servidor falló al intentar procesar una petición aparentemente válida por problemas internos del código o caídas de infraestructura (ej: <code>500 Internal Error</code>).
            </span>
          </div>
        </div>
      </div>

      <h2>Explorador Visual de Códigos Comunes</h2>
      <p>
        Utiliza el siguiente explorador dinámico para examinar los códigos de estado más comunes e importantes en el desarrollo web 
        y la administración de redes. Filtra por categoría y haz clic sobre un código para abrir su ficha técnica.
      </p>

      {/* Explorer Container */}
      <div className="border border-white/10 rounded-2xl bg-neutral-950/80 overflow-hidden shadow-2xl my-6 flex flex-col">
        
        {/* Filters bar */}
        <div className="flex border-b border-white/8 bg-white/[0.01] overflow-x-auto">
          {["Todos", "2xx", "3xx", "4xx", "5xx"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                // Auto-select first matching code
                const matches = filter === "Todos" ? STATUS_CODES : STATUS_CODES.filter(item => item.range === filter);
                if (matches.length > 0) setSelectedCode(matches[0]);
              }}
              className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                activeFilter === filter 
                  ? "border-pink-500 bg-pink-500/5 text-pink-400" 
                  : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.01]"
              }`}
            >
              {filter === "Todos" ? "Todos los códigos" : `${filter} (${
                filter === "2xx" ? "Éxito" :
                filter === "3xx" ? "Redirección" :
                filter === "4xx" ? "Error Cliente" : "Error Servidor"
              })`}
            </button>
          ))}
        </div>

        {/* Explorer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Left panel: Code list (40% width) */}
          <div className="lg:col-span-5 border-r border-white/5 overflow-y-auto max-h-[460px] bg-black/20 divide-y divide-white/5">
            {filteredCodes.map((item) => {
              const isSelected = selectedCode.code === item.code;
              const itemTheme = SEVERITY_THEMES[item.severity] || SEVERITY_THEMES.success;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedCode(item)}
                  className={`w-full text-left p-4 flex items-center justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-white/[0.03]" 
                      : "hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Visual dot with dynamic coloring */}
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: itemTheme.color,
                        boxShadow: `0 0 6px ${itemTheme.color}`
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-mono font-extrabold text-white">
                        {item.code}
                      </span>
                      <span className="text-[11px] text-white/50 truncate max-w-[170px]">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${itemTheme.badge}`}>
                    {item.range}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right panel: Details Card (60% width) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between transition-colors duration-300" style={{ background: selectedTheme.bg }}>
            
            {/* Upper Details block */}
            <div className="space-y-4">
              
              {/* Heading line with code & severity */}
              <div className="flex items-center justify-between">
                {/* Large Code Display with glowing shadow */}
                <h3 
                  className="text-5xl md:text-6xl font-mono font-black tracking-tighter m-0 select-none transition-all duration-300"
                  style={{ 
                    color: selectedTheme.color,
                    textShadow: `0 0 20px ${selectedTheme.glow}`
                  }}
                >
                  {selectedCode.code}
                </h3>
                <span className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-current font-bold ${selectedTheme.badge}`} style={{ borderColor: selectedTheme.color }}>
                  {selectedCode.range === "2xx" ? "Éxito" :
                   selectedCode.range === "3xx" ? "Redirección" :
                   selectedCode.range === "4xx" ? "Error Cliente" : "Error Servidor"}
                </span>
              </div>

              {/* Status Code Name */}
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white m-0 font-sans">{selectedCode.name}</h4>
                <div className="h-0.5 w-16 mt-2 rounded-full" style={{ backgroundColor: selectedTheme.color }} />
              </div>

              {/* Formal definition */}
              <div>
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest block mb-1">Definición</span>
                <p className="text-sm text-white/80 leading-relaxed font-normal m-0">{selectedCode.def}</p>
              </div>

              {/* Practical Scenario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl border border-white/5 bg-black/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block mb-1.5 flex items-center gap-1">
                    <Compass size={12} />
                    Escenario Web Real
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed m-0">{selectedCode.scenario}</p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-black/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1.5 flex items-center gap-1">
                    <Info size={12} />
                    Analogía de la Vida Real
                  </span>
                  <p className="text-xs text-white/60 leading-relaxed m-0 italic">"{selectedCode.analogy}"</p>
                </div>
              </div>

            </div>

            {/* Lower HTTP Raw representation block */}
            <div className="mt-6 border-t border-white/5 pt-4">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <Server size={12} />
                Cabecera de Respuesta HTTP que viaja por la Red
              </span>
              <pre className="m-0 p-3 bg-neutral-900 border border-white/8 rounded-xl text-[11px] font-mono text-white/70 overflow-x-auto leading-relaxed shadow-inner">
                {selectedCode.httpExample}
              </pre>
            </div>

          </div>

        </div>

      </div>

      <h2>¿Por qué son tan importantes en Redes?</h2>
      <p>
        Desde la perspectiva de la infraestructura de red y seguridad, los códigos HTTP nos permiten tomar decisiones 
        inteligentes de automatización y diagnóstico:
      </p>
      <ul>
        <li>
          <strong>Optimización de Ancho de Banda (Caché):</strong> El código <code>304 Not Modified</code> evita que el servidor 
          vuelva a enviar imágenes o scripts pesados a través del cable. El navegador sabe que puede cargar de forma 
          segura su propia copia local, reduciendo el tráfico y la latencia.
        </li>
        <li>
          <strong>Monitoreo y Alertas de Servidores:</strong> Si un balanceador de carga o router proxy detecta un incremento 
          en respuestas <code>5xx</code>, sabe de inmediato que el servidor de aplicación se ha caído o tiene bugs de base de datos, 
          pudiendo desviar el tráfico a servidores de respaldo de forma automática.
        </li>
        <li>
          <strong>Protección DDoS y Rate Limiting:</strong> Enrutar peticiones y lanzar un <code>429 Too Many Requests</code> permite 
          bloquear ataques automatizados de denegación de servicio o abusos en la red antes de sobrecargar la CPU del servidor.
        </li>
        <li>
          <strong>Auditoría de Seguridad:</strong> Un aluvión de códigos <code>401 Unauthorized</code> o <code>403 Forbidden</code> en los logs 
          de red delata ataques de fuerza bruta intentando adivinar credenciales de acceso.
        </li>
      </ul>
    </NoteLayout>
  );
}
