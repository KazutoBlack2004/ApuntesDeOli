import React from "react";
import NoteLayout from "../NoteLayout.jsx";
import Term from "../Term.jsx";

export default function ProtocolosDispositivos() {
  return (
    <NoteLayout
      title="Dispositivos y Protocolos de Red"
      category="Redes"
      categoryPath="/Redes"
      tags={["Dispositivos", "Switches", "Routers", "Protocolos", "Cisco CCNA"]}
      previousNote={{
        label: "Modelos de red",
        path: "/Redes/ModelosRedes",
      }}
      nextNote={{
        label: "Cálculo de redes",
        path: "/Redes/CalculoDeRedes",
      }}
    >
      <div className="callout">
        Una vez comprendido cómo se encapsulan los datos en capas, es momento de ver las piezas de hardware
        que procesan esa información (<Term id="switch">Switches</Term>, <Term id="router">Routers</Term>) y los lenguajes o reglas
        que utilizan para comunicarse (<Term id="tcp">TCP</Term>, <Term id="udp">UDP</Term>, <Term id="arp">ARP</Term>, etc.).
      </div>

      <h2>Dispositivos Inteligentes: Capa 2 vs Capa 3</h2>
      <p>
        En la currícula de Cisco CCNA, la distinción fundamental entre el tráfico local de Capa 2 (físico) y el de Capa 3 (lógico)
        se ilustra perfectamente a través de sus dispositivos estrella:
      </p>

      <h3>1. El Switch (Capa 2 - Enlace de Datos)</h3>
      <p>
        El <strong><Term id="switch">Switch</Term></strong> conecta múltiples dispositivos dentro de una misma red local (LAN).
        Es inteligente porque no envía los datos a ciegas; en su lugar:
      </p>
      <ul>
        <li><strong>Tabla de Direcciones MAC:</strong> El switch lee la trama de datos entrante, aprende la dirección <strong><Term id="mac">MAC</Term></strong> del emisor y la asocia al puerto físico por donde entró.</li>
        <li><strong>Reenvío Selectivo:</strong> Cuando llega tráfico destinado a una MAC específica, el switch consulta su tabla y lo envía <i>únicamente</i> al puerto correspondiente.</li>
        <li><strong>Dominios de Colisión:</strong> Cada puerto de un switch representa un <strong><Term id="collision">dominio de colisión</Term></strong> individual, lo que permite comunicaciones simultáneas sin choques de señal (Full-Duplex).</li>
      </ul>

      <h3>2. El Router (Capa 3 - Red)</h3>
      <p>
        El <strong><Term id="router">Router</Term></strong> conecta diferentes redes (por ejemplo, tu hogar con Internet, o la subred de Finanzas con la de Ingeniería).
      </p>
      <ul>
        <li><strong>Enrutamiento por IP:</strong> Toma decisiones basándose en direcciones <strong><Term id="ip">IP</Term></strong> lógicas de destino, no en direcciones MAC.</li>
        <li><strong>Tabla de Rutas:</strong> Mantiene un mapa de redes conocidas y decide cuál es el "próximo salto" ideal para cada paquete.</li>
        <li><strong>Dominios de Broadcast:</strong> Los routers <strong>detienen</strong> las tormentas de difusión. Cada puerto del router define la frontera física de un <strong><Term id="broadcast">dominio de broadcast</Term></strong>.</li>
      </ul>

      <h3>Comparación de Dispositivos</h3>
      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Dispositivo</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Capa OSI</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Dirección Utilizada</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Acción con Broadcast</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold"><Term id="hub">Hub (Legacy)</Term></td>
              <td className="px-4 py-2 border-b border-white/5">Capa 1 (Física)</td>
              <td className="px-4 py-2 border-b border-white/5">Ninguna (Repetidor de señal)</td>
              <td className="px-4 py-2 border-b border-white/5 text-red-400">Inunda todos los puertos</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold"><Term id="switch">Switch</Term></td>
              <td className="px-4 py-2 border-b border-white/5">Capa 2 (Enlace)</td>
              <td className="px-4 py-2 border-b border-white/5"><Term id="mac">MAC (Física)</Term></td>
              <td className="px-4 py-2 border-b border-white/5 text-amber-400">Inunda todos los puertos locales</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold"><Term id="router">Router</Term></td>
              <td className="px-4 py-2 border-b border-white/5">Capa 3 (Red)</td>
              <td className="px-4 py-2 border-b border-white/5"><Term id="ip">IP (Lógica)</Term></td>
              <td className="px-4 py-2 border-b border-white/5 text-green-400 font-semibold">Lo bloquea (Detiene la difusión)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Tipos de Transmisión: Unidifusión, Difusión y Multidifusión</h2>
      <p>
        En redes IP, la forma en que los paquetes viajan desde el origen hasta los receptores se divide en tres modalidades de transmisión fundamentales:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300 shadow-md">
          <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            Unidifusión (Unicast)
          </h4>
          <p className="text-[11px] text-white/80 leading-relaxed">
            Es la comunicación **uno a uno**. El emisor envía paquetes a un único receptor específico en la red.
          </p>
          <ul className="text-[10px] text-white/60 list-disc pl-4 mt-2 space-y-1">
            <li><strong>Direccionamiento:</strong> Utiliza una dirección IP y una dirección MAC individuales de destino.</li>
            <li><strong>Ejemplo:</strong> Cuando abres tu navegador y entras a tu cuenta de correo, o cuando haces una consulta a un servidor específico.</li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300 shadow-md">
          <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            Difusión (Broadcast)
          </h4>
          <p className="text-[11px] text-white/80 leading-relaxed">
            Es la comunicación **uno a todos**. El emisor envía un paquete a absolutamente **todos** los dispositivos de la misma red local.
          </p>
          <ul className="text-[10px] text-white/60 list-disc pl-4 mt-2 space-y-1">
            <li><strong>Direccionamiento:</strong> IP de broadcast especial (ej. <code>255.255.255.255</code>) y MAC <code>FF:FF:FF:FF:FF:FF</code>.</li>
            <li><strong>Ejemplo:</strong> La solicitud <Term id="arp">ARP</Term> ("¿Quién tiene esta IP?") o la solicitud de IP inicial de <Term id="dhcp">DHCP</Term>. Los switches la propagan y los routers la bloquean.</li>
          </ul>
        </div>

        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300 shadow-md">
          <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_4px_#d946ef]" />
            Multidifusión (Multicast)
          </h4>
          <p className="text-[11px] text-white/80 leading-relaxed">
            Es la comunicación **uno a muchos** (grupo específico). El emisor envía datos solo a los hosts suscritos a recibir ese tráfico.
          </p>
          <ul className="text-[10px] text-white/60 list-disc pl-4 mt-2 space-y-1">
            <li><strong>Direccionamiento:</strong> Utiliza el rango de IP Clase D (de <code>224.0.0.0</code> a <code>239.255.255.255</code>).</li>
            <li><strong>Ejemplo:</strong> Streaming de televisión digital (IPTV), videoconferencias masivas corporativas, o actualizaciones de routers mediante protocolos dinámicos como <Term id="ospf">OSPF</Term>.</li>
          </ul>
        </div>
      </div>

      <h2>Protocolos Core: El Idioma de la Red</h2>

      <h3>1. ARP: El Puente entre Capa 3 y Capa 2</h3>
      <p>
        El protocolo <strong><Term id="arp">ARP</Term></strong> (Address Resolution Protocol) resuelve el problema clásico:
        <i>"Conozco tu IP, pero no puedo enviarte datos si no conozco la dirección MAC física de tu tarjeta de red"</i>.
      </p>
      <ol>
        <li>Cuando un host quiere comunicarse con otro en la misma LAN, envía un **ARP Request** por <Term id="broadcast">broadcast</Term> ("¿Quién tiene la IP X.X.X.X?").</li>
        <li>El dispositivo con esa IP responde directamente con un **ARP Reply** de tipo unicast ("Yo la tengo, mi MAC es Y-Y-Y").</li>
        <li>El emisor guarda la respuesta en su **Tabla ARP (Caché)** para no repetir el proceso en el futuro inmediato.</li>
      </ol>

      <h3>2. TCP vs UDP: El Transporte de Datos</h3>
      <p>
        En la Capa 4 (Transporte), debemos elegir entre la confiabilidad absoluta o la velocidad sin demoras:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400">Característica</th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400"><Term id="tcp">TCP</Term></th>
              <th className="px-4 py-2 border-b border-white/10 text-left font-bold text-pink-400"><Term id="udp">UDP</Term></th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold">Orientado a conexión</td>
              <td className="px-4 py-2 border-b border-white/5 text-green-400">Sí (Establece canal previo)</td>
              <td className="px-4 py-2 border-b border-white/5 text-red-400">No (Envía sin avisar)</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold">Confiabilidad</td>
              <td className="px-4 py-2 border-b border-white/5">Alta (Garantiza entrega y orden)</td>
              <td className="px-4 py-2 border-b border-white/5">Nula (Pueden perderse datos)</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold">Velocidad / Latencia</td>
              <td className="px-4 py-2 border-b border-white/5">Baja (Mucha sobrecarga de cabecera)</td>
              <td className="px-4 py-2 border-b border-white/5 text-green-400 font-semibold">Alta (Ideal para tiempo real)</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold">Mecanismo clave</td>
              <td className="px-4 py-2 border-b border-white/5">Handshake de 3 vías (SYN, SYN-ACK, ACK)</td>
              <td className="px-4 py-2 border-b border-white/5">Flujo libre continuo de datagramas</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-2 border-b border-white/5 font-semibold">Uso común</td>
              <td className="px-4 py-2 border-b border-white/5">Web (HTTP), Email, Transferencia archivos</td>
              <td className="px-4 py-2 border-b border-white/5">Streaming de video, VoIP, Videojuegos online</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>3. Protocolos de Infraestructura Cruciales</h3>
      <ul>
        <li>
          <strong><Term id="dhcp">DHCP</Term>:</strong> Automatiza la vida de los administradores. Cuando un dispositivo se conecta
          a la red, DHCP le arrienda automáticamente una dirección IP, una máscara de subred, su <Term id="gateway">gateway</Term>
          y las IPs de sus servidores DNS.
        </li>
        <li>
          <strong><Term id="dns">DNS</Term>:</strong> La agenda telefónica de Internet. Traduce nombres humanos legibles
          (ej. <code>google.com</code>) a direcciones IP numéricas que los routers pueden entender.
        </li>
        <li>
          <strong><Term id="icmp">ICMP</Term>:</strong> El protocolo de diagnóstico. Utilizado por <strong><Term id="ping">ping</Term></strong>
          (para verificar si un host está vivo y medir latencia) y <strong><Term id="traceroute">traceroute</Term></strong>
          (para ver todas las paradas en routers intermedios que hace un paquete).
        </li>
      </ul>

      <h2>La Anatomía de una URL</h2>
      <p>
        El <strong><Term id="url">URL</Term></strong> (Uniform Resource Locator) es la dirección específica que se asigna a cada uno de los recursos disponibles en la red. Trabaja estrechamente con el <Term id="dns">DNS</Term> para llevarte a la página web correcta.
      </p>
      <p>
        Podemos desglosar una URL típica, por ejemplo <code>https://www.example.com/page</code>, en las siguientes partes:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-pink-500/30 transition-colors shadow-md">
          <span className="text-pink-400 font-bold block mb-1">https://</span>
          <span className="text-sm font-semibold block mb-2 text-white/90">Protocolo</span>
          <p className="text-[11px] text-white/70">
            Define cómo se transmiten los datos. Generalmente es <Term id="http">HTTP o HTTPS</Term> (cifrado y seguro).
          </p>
        </div>
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-blue-500/30 transition-colors shadow-md">
          <span className="text-blue-400 font-bold block mb-1">www.</span>
          <span className="text-sm font-semibold block mb-2 text-white/90">Subdominio</span>
          <p className="text-[11px] text-white/70">
            Una subdivisión del dominio principal, útil para separar servicios (ej. mail., blog., www.).
          </p>
        </div>
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-green-500/30 transition-colors shadow-md">
          <span className="text-green-400 font-bold block mb-1">example</span>
          <span className="text-sm font-semibold block mb-2 text-white/90">Nombre de Dominio</span>
          <p className="text-[11px] text-white/70">
            El nombre principal y único del sitio web, fácil de recordar para los humanos en vez de usar direcciones IP.
          </p>
        </div>
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-amber-500/30 transition-colors shadow-md">
          <span className="text-amber-400 font-bold block mb-1">.com</span>
          <span className="text-sm font-semibold block mb-2 text-white/90">Extensión / TLD</span>
          <p className="text-[11px] text-white/70">
            Dominio de nivel superior (Top-Level Domain). Indica el propósito (.com, .edu) o ubicación (.ar, .es).
          </p>
        </div>
        <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-purple-500/30 transition-colors shadow-md">
          <span className="text-purple-400 font-bold block mb-1">/page</span>
          <span className="text-sm font-semibold block mb-2 text-white/90">Ruta (Path)</span>
          <p className="text-[11px] text-white/70">
            La ubicación específica, carpeta o archivo dentro del servidor web al que quieres acceder.
          </p>
        </div>
      </div>

      <div className="callout">
        <strong>Curiosidad de examen Cisco:</strong> Cuando abres tu navegador y escribes <code>www.ejemplo.com</code> por primera vez,
        se desencadena una orquesta de protocolos en milisegundos: tu PC pide IP por <strong>DHCP</strong>, luego consulta al servidor <strong>DNS</strong> por UDP,
        luego resuelve la MAC de su gateway local por <strong>ARP</strong>, establece una conexión confiable con el servidor por <strong>TCP</strong>
        y finalmente descarga los datos mediante HTTP/HTTPS.
      </div>
    </NoteLayout>
  );
}
