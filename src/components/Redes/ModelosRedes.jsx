import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function ModelosRedes() {
  return (
    <NoteLayout
      title="Modelos de Red: OSI y TCP/IP"
      category="Redes"
      categoryPath="/Redes"
      tags={["Modelos de red", "OSI", "TCP/IP", "PDU", "Cisco CCNA"]}
      previousNote={{
        label: "Interfaces de red",
        path: "/Redes/InterfacesDeRed",
      }}
      nextNote={{
        label: "Dispositivos y Protocolos",
        path: "/Redes/ProtocolosDispositivos",
      }}
    >
      <div className="callout">
        Para que dos dispositivos puedan comunicarse en red, necesitan seguir reglas y estructuras comunes.
        Los modelos <strong><Term id="osi">OSI</Term></strong> y <strong>TCP/IP</strong> son marcos de referencia de capas
        que organizan y estandarizan estas funciones, permitiendo que hardware y software de diferentes fabricantes trabajen juntos en armonía.
      </div>

      <h2>Los Dos Modelos de Referencia</h2>
      <p>
        Históricamente, el modelo <strong><Term id="osi">OSI</Term></strong> (diseñado por la ISO) nació como una
        guía teórica ideal para la enseñanza y el diseño de protocolos. Por otro lado, el modelo <strong>TCP/IP</strong>
        es el modelo práctico que realmente gobierna la Internet de hoy en día.
      </p>

      <h3>Mapeo de Capas: OSI vs TCP/IP</h3>
      <p>
        El modelo OSI consta de <strong>7 capas</strong>, mientras que el modelo TCP/IP moderno agrupa estas funciones en <strong>4 capas</strong> principales:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Capa OSI</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Capa TCP/IP</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Unidad (PDU)</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Dispositivo / Protocolo Común</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">7. Aplicación</td>
              <td className="px-4 py-2 border-b border-white/5 rowspan-3 font-semibold text-pink-300" rowSpan="3">
                Aplicación
              </td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Datos</td>
              <td className="px-4 py-2 border-b border-white/5"><Term id="dns">DNS</Term>, <Term id="dhcp">DHCP</Term>, HTTP, HTTPS, SSH</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">6. Presentación</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Datos</td>
              <td className="px-4 py-2 border-b border-white/5">Cifrado SSL/TLS, Compresión JPEG/MP3</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">5. Sesión</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Datos</td>
              <td className="px-4 py-2 border-b border-white/5">Control de diálogos, APIs y sockets</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">4. Transporte</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-pink-300">Transporte</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Segmento</td>
              <td className="px-4 py-2 border-b border-white/5"><Term id="tcp">TCP</Term> (confiable), <Term id="udp">UDP</Term> (veloz)</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">3. Red</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-pink-300">Internet</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Paquete</td>
              <td className="px-4 py-2 border-b border-white/5"><Term id="router">Router</Term>, Dirección <Term id="ip">IP</Term>, <Term id="icmp">ICMP</Term> (Ping)</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">2. Enlace de Datos</td>
              <td className="px-4 py-2 border-b border-white/5 rowspan-2 font-semibold text-pink-300" rowSpan="2">
                Acceso a Red
              </td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Trama (Frame)</td>
              <td className="px-4 py-2 border-b border-white/5"><Term id="switch">Switch</Term>, Tarjeta <Term id="nic">NIC</Term>, Dirección <Term id="mac">MAC</Term>, <Term id="arp">ARP</Term></td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5">1. Física</td>
              <td className="px-4 py-2 border-b border-white/5 font-semibold text-fuchsia-400">Bits</td>
              <td className="px-4 py-2 border-b border-white/5">Cable UTP (<Term id="ethernet">Ethernet</Term>), Fibra Óptica, <Term id="hub">Hubs</Term></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>¿Qué ocurre en cada capa?</h2>

      <h3>1. Capa Física (OSI 1)</h3>
      <p>
        Define las características del medio físico que transmite la señal (cables, conectores, voltajes eléctricos, pulsos de luz u ondas de radio). Su unidad fundamental son los <strong><Term id="bit">bits</Term></strong> (0 y 1).
      </p>

      <h3>2. Capa de Enlace de Datos (OSI 2)</h3>
      <p>
        Agrupa los bits en <strong>tramas (frames)</strong>. Maneja el direccionamiento físico mediante la dirección <strong><Term id="mac">MAC</Term></strong> y realiza la detección de errores en el medio físico. Los <Term id="switch">switches</Term> operan en esta capa.
      </p>

      <h3>3. Capa de Red (OSI 3)</h3>
      <p>
        Responsable del enrutamiento lógico a través de diferentes redes interconectadas. Aquí se estructuran los <strong>paquetes</strong> y se utilizan las direcciones <strong><Term id="ip">IP</Term></strong>. El <Term id="router">router</Term> es el rey indiscutible de esta capa.
      </p>

      <h3>4. Capa de Transporte (OSI 4)</h3>
      <p>
        Asegura que los mensajes se entreguen de forma completa y ordenada. Divide los datos grandes en <strong>segmentos</strong> más pequeños y se encarga del control de flujo. Sus protocolos estrella son el <strong><Term id="tcp">TCP</Term></strong> (confiable orientado a conexión) y el <strong><Term id="udp">UDP</Term></strong> (rápido sin conexión).
      </p>

      <h3>5. Capas de Sesión, Presentación y Aplicación (OSI 5, 6, 7)</h3>
      <p>
        En el modelo TCP/IP, estas tres capas teóricas se consolidan en una única capa llamada <strong>Capa de Aplicación</strong>. 
        Manejan la codificación de datos, encriptación (TLS/SSL), traducción de formatos y la interfaz final con el usuario (como navegadores con HTTPS, consolas de comandos con <Term id="ssh">SSH</Term>, o resoluciones de nombres con <Term id="dns">DNS</Term>).
      </p>

      <h2>El Proceso de Comunicación: Encapsulado y Desencapsulado</h2>
      <p>
        Cuando envías un mensaje (por ejemplo, envías un mensaje de chat o cargas una página web), los datos viajan a través de la pila de protocolos en dos fases complementarias:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
          <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899]" />
            Encapsulación (Emisor)
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            El proceso se realiza **de arriba hacia abajo** (Capa 7 a Capa 1). A medida que los datos descienden, cada capa les añade una cabecera (Header) o cola (Trailer) con información de control indispensable para la red:
          </p>
          <ul className="text-xs text-white/70 list-decimal pl-4 mt-2 space-y-1">
            <li><strong>Datos:</strong> Creados por la aplicación (ej. una petición HTTP).</li>
            <li><strong>Segmento:</strong> Capa de Transporte añade cabecera <Term id="tcp">TCP</Term> (puertos de origen y destino).</li>
            <li><strong>Paquete:</strong> Capa de Red añade cabecera <Term id="ip">IP</Term> (dirección IP de origen y destino).</li>
            <li><strong>Trama:</strong> Capa de Enlace añade cabecera <Term id="mac">MAC</Term> (MAC de origen y destino) y cola de verificación de errores.</li>
            <li><strong>Bits:</strong> Convertidos en señales eléctricas o de luz para viajar por el cable.</li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-lg">
          <h4 className="text-fuchsia-400 font-bold mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_6px_#d946ef]" />
            Desencapsulación (Receptor)
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            El receptor realiza el proceso **de abajo hacia arriba** (Capa 1 a Capa 7). Cada capa analiza la cabecera correspondiente, valida que los datos sean correctos, "desenvuelve" la envoltura y pasa los datos limpios a la capa superior:
          </p>
          <ul className="text-xs text-white/70 list-decimal pl-4 mt-2 space-y-1">
            <li><strong>Física:</strong> Recibe los impulsos físicos y los agrupa en bits.</li>
            <li><strong>Enlace:</strong> Lee la cabecera Ethernet, verifica la <Term id="mac">MAC</Term> de destino y extrae la trama.</li>
            <li><strong>Red:</strong> Valida que la <Term id="ip">IP</Term> sea la suya y extrae el paquete.</li>
            <li><strong>Transporte:</strong> Identifica el puerto (<Term id="tcp">TCP</Term>/<Term id="udp">UDP</Term>) y reensambla el segmento.</li>
            <li><strong>Aplicación:</strong> Recibe los datos originales y los procesa (ej: muestra el sitio web).</li>
          </ul>
        </div>
      </div>

      <div className="callout">
        <strong>Regla del Troubleshooting de Cisco:</strong> Cuando algo falla en una red, siempre debes diagnosticar
        comenzando desde la Capa 1 (Física: <i>¿Está el cable conectado?, ¿tiene corriente el puerto?</i>), luego Capa 2 (<i>¿Veo la MAC de mi vecino?</i>),
        luego Capa 3 (<i>¿Tengo ping hacia mi gateway?</i>), y así sucesivamente. ¡Esto reduce un 90% el tiempo de resolución de fallas!
      </div>
    </NoteLayout>
  );
}
